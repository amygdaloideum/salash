import Post from './models/post';
import Recipe from './models/recipe';
import Ingredient from './models/ingredient';
import Category from './models/category';
import Comment from './models/comment';

export default function () {

  Recipe.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const tacos = new Recipe({
      title: 'Tacos!',
      description: 'Tasty raw vegan tacos made from raw stuff!',
      likes: 0,
      ingredients: ["57e2c93487fa172c985d82c2"],
      cuid: 'cikqgkv4q01ck7453ualdn3hf',
      slug: 'tacos'
    });
    const pizza = new Recipe({
      title: 'Pizza!',
      description: 'Tasty raw vegan pizza made from raw stuff!',
      cuid: 'cikqgkv4q01ck7453ualdn3hd',
      slug: 'pizza'
    });

    Recipe.create([tacos, pizza], (error) => {
      if (!error) {
        console.log('ready to go....');
      }
    });
  });
}
