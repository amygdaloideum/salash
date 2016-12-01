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