import Category from '../models/category';
import { getSession } from '../util/dbUtils';

const formatCategories = records => records.map(record => record.get('category').properties);

/**
 * Get all Categories
 * @param req
 * @param res
 * @returns void
 */
export function getCategories(req, res) {
    getSession(req).run(`
      MATCH (category:Category) RETURN category
    `).then(response => res.json({ categories: formatCategories(response.records)}));
}

export function getCategoriesOld(req, res) {
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
