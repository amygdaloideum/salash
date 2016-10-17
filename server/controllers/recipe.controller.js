import Recipe from '../models/recipe';
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
  Recipe.find().sort('-dateAdded').populate('ingredients categories').exec((err, recipes) => {
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

export function addRecipe(req, res) {
  if (!req.body.recipe.title || !req.body.recipe.description) {
    res.status(403).end();
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
