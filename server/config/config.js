const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/salash',
  port: process.env.PORT || 8000,
  secret: 'hehuhe'
};

export default config;
