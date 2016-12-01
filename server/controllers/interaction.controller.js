import { getSession, formatResponse } from '../util/dbUtils';

const isAllowedType = actionType => {
  const allowedTypes = ['love', 'favorite'];
  return allowedTypes.indexOf(actionType) !== -1;
};

export function createInteraction(req, res) {
  if (!req.user || !req.user.cuid) {
    return res.status(401).end();
  }

  if(!req.body.recipeCuid || !req.body.actionType || !isAllowedType(req.body.actionType)){
    return res.status(400).end();
  }

  const params = {
    userCuid: req.user.cuid,
    recipeCuid: req.body.recipeCuid
  };
  getSession(req).run(`
    MATCH (user:User {cuid: { userCuid }}), (recipe:Recipe {cuid: { recipeCuid }})
    MERGE (user)-[action:REACTS]->(recipe)
    SET action.${req.body.actionType} = true
    RETURN action
  `, params).then(result => res.json({ interactions: result.records[0].get('action').properties}));
}

export function deleteInteraction(req, res) {
  if (!req.user || !req.user.cuid) {
    return res.status(401).end();
  }

  if(!req.body.recipeCuid || !req.body.actionType || !isAllowedType(req.body.actionType)){
    return res.status(400).end();
  }

  const params = {
    userCuid: req.user.cuid,
    recipeCuid: req.body.recipeCuid
  };
  getSession(req).run(`
    OPTIONAL MATCH (:User {cuid: { userCuid }})-[action:REACTS]->(:Recipe {cuid: { recipeCuid }})
    WITH action, CASE WHEN action IS NULL THEN [] ELSE [1] END AS array
    FOREACH (x IN array |
      REMOVE action.${req.body.actionType}
    )
    RETURN action
  `, params).then(result => res.json({ interactions: result.records[0].get('action').properties}));
}