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
  Recipe.find().sort('-dateAdded').populate('ingredients.ingredient categories').exec((err, recipes) => {
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
  Recipe.findOne({ cuid: req.params.cuid }).populate('ingredients categories').exec((err, recipe) => {
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
    categories: { $all: categories },
    'ingredients.ingredient': { $all: ingredients }
  }).populate('ingredients.ingredient categories').exec((err, recipes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipes });
  });
}

export function addRecipe(req, res) {
  if (!req.user) {
    return res.status(401).end();
  }

  if (!req.body.recipe.title || !req.body.recipe.description) {
    return res.status(403).end();
  }

  const newRecipe = new Recipe(req.body.recipe);

  // Let's sanitize inputs
  newRecipe.title = sanitizeHtml(newRecipe.title);
  newRecipe.name = sanitizeHtml(newRecipe.description);

  newRecipe.slug = slug(newRecipe.title.toLowerCase(), { lowercase: true });
  newRecipe.cuid = cuid();
  newRecipe.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recipe: saved });
  });
}
