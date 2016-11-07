import Recipe from '../models/recipe';
import Category from '../models/category';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all recipes
 * @param req
 * @param res
 * @returns void
 */
export function getRecipes(req, res) {
  Recipe.find().sort('-dateAdded').exec((err, recipes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipes });
  });
}

/**
 * Get a single recipes
 * @param req
 * @param res
 * @returns void
 */
export function getRecipe(req, res) {
  Recipe.findOne({ cuid: req.params.cuid }).populate('author').exec((err, recipe) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipe });
  });
}

export function getRecipesByTitle(req, res) {
  Recipe.find({ "title": new RegExp(req.params.title, "i") }).populate('ingredients categories').exec((err, recipes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipes });
  });
}

export function searchRecipes(req, res) {
  const categories = req.query.category.constructor === Array ? req.query.category : [req.query.category];
  const ingredients = req.query.ingredient.constructor === Array ? req.query.ingredient : [req.query.ingredient];
  Recipe.find({
    'categories': { $all: categories },
    'ingredients.ingredient': { $all: ingredients }
  }).populate('categories').exec((err, recipes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipes });
  });
}

export function addRecipe(req, res) {
  if (!req.user || !req.user._id) {
    return res.status(401).end();
  }

  const recipe = req.body.recipe;

  if (!recipe.title 
    || (!recipe.ingredients && recipe.ingredients.length)
    || (!recipe.categories && recipe.categories.length)) {
    return res.status(403).end();
  }

  const newRecipe = new Recipe(recipe);

  // Let's sanitize inputs
  newRecipe.title = sanitizeHtml(newRecipe.title);
  newRecipe.description = sanitizeHtml(newRecipe.description);
  newRecipe.instructions = sanitizeHtml(newRecipe.instructions);

  newRecipe.ingredients = newRecipe.ingredients.map( ({ingredient, amount}) => ({ingredient: slug(ingredient), amount: slug(amount)}));
  newRecipe.categories = newRecipe.categories.map( category => slug(category));

  newRecipe.slug = slug(newRecipe.title.toLowerCase(), { lowercase: true });
  newRecipe.cuid = cuid();
  newRecipe.author = req.user._id;
  newRecipe.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipe: saved });
  });
}
