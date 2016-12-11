const config = {
  USERNAME: process.env.GRAPHENEDB_BOLT_USER || 'neo4j',
  PASSWORD: process.env.GRAPHENEDB_BOLT_PASSWORD || 'temp123',
  URL_LOCAL: process.env.GRAPHENEDB_BOLT_URL || 'bolt://localhost'
};

export default config;