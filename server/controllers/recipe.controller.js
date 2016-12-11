import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import { getSession, getByKey } from '../util/dbUtils';
import { formatQueryArray } from '../../client/util/queryBuilder';

const formatRecipeResponse = record => {
  return {
    ...record.get('recipe').properties,
    ingredients: record.get('ingredients'),
    categories: record.get('categories'),
    author: record.get('author'),
    interactions: record.get('interactions'),
    loves: record.get('loves')
  };
};

/**
 * Get a single recipes
 * @param req
 * @param res
 * @returns void
 */
export function getRecipe(req, res) {
  const params = {
    recipeCuid: req.params.cuid,
    beholderCuid: req.user ? req.user.cuid : null
  };
  getSession(req).run(`
    MATCH (recipe:Recipe {cuid: {recipeCuid}})
    WITH recipe
    MATCH (recipe)-[:IS]->(c:Category)
    WITH recipe, COLLECT({name: c.name}) as categories
    MATCH (recipe)-[a:CONTAINS]->(i:Ingredient)
    WITH recipe, categories, COLLECT({name: i.name, amount: a.amount}) as ingredients
    OPTIONAL MATCH (recipe)<-[reactions:REACTS {love: true}]-(:User)    
    OPTIONAL MATCH (recipe)<-[:AUTHORED]-(u:User)
    OPTIONAL MATCH (recipe)<-[reaction:REACTS]-(beholder:User {cuid: {beholderCuid}})
    RETURN recipe,
    {username: u.username, cuid: u.cuid} AS author,
    COUNT(reactions) AS loves,
    {love: reaction.love, favorite: reaction.favorite} AS interactions,
    ingredients,
    categories
  `, params).then(results => res.json({ recipe: results.records.map(formatRecipeResponse)[0]}));
}

export function searchRecipes(req, res) {
  const formattedQuery = formatQueryArray(req.query);
  const params = {
    ...formattedQuery,
    beholderCuid: req.user ? req.user.cuid : null
  };
  console.log(params);
  getSession(req).run(`
    MATCH (cat:Category) 
    WHERE cat.name IN {categories}
    WITH COLLECT(cat) as desiredCategories
    OPTIONAL MATCH (i:Ingredient)
    WHERE i.name IN {ingredients}
    WITH desiredCategories, COLLECT(i) as desiredIngredients
    MATCH (recipe:Recipe)
    WHERE ALL(
      category IN desiredCategories
      WHERE (recipe)-[:IS]->(category)
    )
    AND ALL(
      ingredient IN desiredIngredients
      WHERE (recipe)-[:CONTAINS]->(ingredient)
    )
    WITH recipe
    MATCH (recipe)-[:IS]->(c:Category)
    WITH recipe, COLLECT({name: c.name}) as categories
    MATCH (recipe)-[a:CONTAINS]->(i:Ingredient)
    WITH recipe, categories, COLLECT({name: i.name, amount: a.amount}) as ingredients
    OPTIONAL MATCH (recipe)<-[reactions:REACTS {love: true}]-(:User)
    OPTIONAL MATCH (recipe)<-[:AUTHORED]-(u:User)
    OPTIONAL MATCH (recipe)<-[reaction:REACTS]-(beholder:User {cuid: {beholderCuid}})
    RETURN recipe,
    {username: u.username, cuid: u.cuid} AS author,
    COUNT(reactions) AS loves,
    {love: reaction.love, favorite: reaction.favorite} AS interactions,
    ingredients,
    categories
    ORDER BY loves DESC
    LIMIT 15
  `, params).then(results => res.json({ recipes: results.records.map(formatRecipeResponse)}));
}

export function addRecipe(req, res) {
  if (!req.user || !req.user.cuid) {
    return res.status(401).end();
  }

  const recipe = req.body.recipe;

  if (!recipe.title
    || (!recipe.ingredients && recipe.ingredients.length)
    || (!recipe.categories && recipe.categories.length)) {
    return res.status(403).end();
  }

  const instructionsHtmlConfig = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h1', 'h2' ])
  };

  const params = {
    title: sanitizeHtml(recipe.title),
    description: sanitizeHtml(recipe.description),
    instructions: sanitizeHtml(recipe.instructions, instructionsHtmlConfig),
    slug: slug(recipe.title.toLowerCase(), { lowercase: true }),
    cuid: cuid()
  };

  const ingredientsQuery = recipe.ingredients.map((ingredient, index) => `
    MERGE (i${index}:Ingredient { name:'${ingredient.name.toLowerCase()}'})
    MERGE (recipe)-[:CONTAINS {amount: '${ingredient.amount}'}]->(i${index})
  `).join('\n');

  const categoriesQuery = recipe.categories.map((category, index) => `
    MERGE (c${index}:Category { name:'${category.name.toLowerCase()}'})
    MERGE (recipe)-[:IS]->(c${index})
  `).join('\n');

  getSession(req).run(`
    MATCH (user:User {cuid: '${req.user.cuid}'})
    CREATE
      (recipe:Recipe {
        title: {title},
        description: {description},
        instructions: {instructions},
        slug: {slug},
        cuid: {cuid}
      }),
      (user)-[:AUTHORED]->(recipe)
    ${ingredientsQuery}
    ${categoriesQuery}
  `, params).then(results => res.json({ recipe: results }));
}

export function updateRecipe(req, res) {
  if (!req.user || !req.user.cuid) {
    return res.status(401).end();
  }

  const recipe = req.body.recipe;
  const recipeCuid = req.body.cuid;  

  if (!recipe.title
    || (!recipe.ingredients && recipe.ingredients.length)
    || (!recipe.categories && recipe.categories.length)) {
    return res.status(403).end();
  }

  const instructionsHtmlConfig = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h1', 'h2' ])
  };

  const params = {
    recipeCuid: recipeCuid,
    title: sanitizeHtml(recipe.title),
    ingredients: recipe.ingredients.map(i => ({amount: i.amount, name: i.name.toLowerCase().trim()})),
    categories: recipe.categories,
    description: sanitizeHtml(recipe.description),
    instructions: sanitizeHtml(recipe.instructions, instructionsHtmlConfig),
    slug: slug(recipe.title.toLowerCase(), { lowercase: true }),
  };

  const findAuthorQuery = `
    MATCH (recipe:Recipe {cuid: {recipeCuid}})<-[:AUTHORED]-(u:User)
    RETURN {cuid: u.cuid} AS author
  `;

  const updateRecipeQuery = `
    MATCH (recipe:Recipe {cuid: {recipeCuid}})
      SET recipe.title = {title}
      SET recipe.description = {description}
      SET recipe.instructions = {instructions}
    WITH recipe
    MATCH (recipe)-[rel]-(n)
    WHERE n:Category OR n:Ingredient
    DELETE rel
    FOREACH (i IN {ingredients}| 
      MERGE (ing:Ingredient {name: i.name})
      MERGE (recipe)-[:CONTAINS {amount: i.amount}]->(ing)
    )
    FOREACH (c IN {categories}| 
      MERGE (cat:Category {name: c.name})
      MERGE (recipe)-[:IS]->(cat)
    )
  `;

  getSession(req)
  .run(findAuthorQuery, { recipeCuid })
  .then(results => {
    if(getByKey(results, 'author').cuid !== req.user.cuid) {
      return res.status(401).end();
    }
    return  getSession(req).run(updateRecipeQuery, params);
  })
  .catch(err => console.log(err))
  .then( () => res.json({ message: 'recipe update successful' }));
}

export function deleteRecipe(req, res) {
  if (!req.user || !req.user.cuid) {
    return res.status(401).end();
  }

  const findAuthorQuery = `
    MATCH (recipe:Recipe {cuid: {recipeCuid}})<-[:AUTHORED]-(u:User)
    RETURN {cuid: u.cuid} AS author
  `;

  const deleteRecipeQuery = `
    MATCH (recipe:Recipe {cuid: {recipeCuid}})
    OPTIONAL MATCH (recipe)-[r]-()
    DELETE recipe, r
  `;

  const recipeCuid = req.body.cuid;

  getSession(req)
  .run(findAuthorQuery, { recipeCuid })
  .then(results => {
    if(getByKey(results, 'author').cuid !== req.user.cuid) {
      return res.status(401).end();
    }
    return  getSession(req).run(deleteRecipeQuery, { recipeCuid });
  })
  .then( () => res.json({ message: 'recipe remove successful' }));
}
