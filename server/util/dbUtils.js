import config from '../config/neo4j';

import { v1 as neo4j } from 'neo4j-driver';
const driver = neo4j.driver(config.URL_LOCAL, neo4j.auth.basic(config.USERNAME, config.PASSWORD));

export function getSession(context) {
  if(context.neo4jSession) {
    return context.neo4jSession;
  }
  else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
}

export const getByKey = (res, key) => res.records[0].get(key)

export const getAllByKey = (res, key) => res.records.map(record => record.get(key));
