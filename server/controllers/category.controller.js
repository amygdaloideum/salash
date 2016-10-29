import Category from '../models/category';
import cuid from 'cuid';
import slug from 'limax';

/**
 * Get all Categories
 * @param req
 * @param res
 * @returns void
 */
export function getCategories(req, res) {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ categories });
  });
}

export function getCategoriesByTitle(req, res) {
  Category.find({ "title": new RegExp(req.params.title, "i") }).exec((err, categories) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ categories });
  });
}
