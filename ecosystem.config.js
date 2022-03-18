module.exports = {
  apps: [
    {
      script: "./bin/www",
      watch: true,
      autorestart: true,
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
