export const encodeCategory = c => encodeURIComponent(c.replace(/\s/g, "-"));
export const encodeIngredient = c => encodeURIComponent(c.replace(/\s/g, "-"));

export function build(baseUrl, fields) {

  let { title, ingredients, categories } = fields;
  categories = categories && categories.length ? categories.map(encodeCategory) : undefined;
  ingredients = ingredients && ingredients.length ? ingredients.map(encodeIngredient) : undefined;

  const titleQuery = title ? `title=${title}` : undefined;
  const categoriesQuery = categories && categories.length ? `categories=${categories.join(',')}` : undefined;
  const ingredientsQuery = ingredients && ingredients.length ? `ingredients=${ingredients.join(',')}`: undefined;
  //const categories = category.map( val => `category=${val}`);
  //const ingredients = ingredient.map( val => `ingredient=${val}`);



  const params = [ titleQuery, categoriesQuery, ingredientsQuery ];

  let url = params.reduce(( prev, current, index ) => {
    if(!current) {
      return prev;
    }
    return prev === baseUrl ? `${prev}?${current}` : `${prev}&${current}`;
  },  baseUrl);

  return url;
}

export function jsToStringQuery(baseUrl, fields) {

  fields.ingredients = fields.ingredients ? fields.ingredients.split(',') : undefined;
  fields.categories = fields.categories ? fields.categories.split(',') : undefined;

  return build(baseUrl, fields)
}

export function formatQueryArray(fields) {

  fields.ingredients = fields.ingredients ? fields.ingredients.split(',') : [];
  fields.categories = fields.categories ? fields.categories.split(',') : [];

  return fields;
}


export function queryToAffirmation(query) {
  if(!query.title && !query.ingredients && !query.categories) {
    return 'showing all recipes'
  }
  query.ingredients = query.ingredients.constructor === Array ? query.ingredients.join(',') : query.ingredients;
  query.categories = query.categories.constructor === Array ? query.categories.join(',') : query.categories;

  const cat = query.categories ? query.categories.split(',').map(c => ` ${c}s`).join(',') : 'recipes';
  const ing = query.ingredients ? `containing ${query.ingredients}` : '';
  const title = query.title ? `with title \'${query.title}\'` : '';
  return `showing ${cat} ${ing} ${title}`;
}

