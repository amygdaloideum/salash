export function build({ category = [], ingredient = []}) {
  if(category.constructor != Array){
    category = [category];
  }
  if(ingredient.constructor != Array){
    ingredient = [ingredient];
  }
  const baseUrl = 'recipes/search';
  const categories = category.map( val => `category=${val}`);
  const ingredients = ingredient.map( val => `ingredient=${val}`);

  const params = categories.concat(ingredients);

  let url = params.reduce(( prev, current, index ) => {
    return index === 0 ? `${prev}?${current}` : `${prev}&${current}`;
  },  baseUrl);

  return url;
}