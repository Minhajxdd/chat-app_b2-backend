export default () => ({
  port: process.env.PORT || 3000,
  database: {
    connectionString: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  node_environment: {
    node_env: process.env.NODE_ENV,
  },
  domain: {
    domain_name: process.env.DOMAIN,
  },
  sockerCors: 'https://chat-app-b2-frontend.vercel.app',
  redisConfiguration: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
