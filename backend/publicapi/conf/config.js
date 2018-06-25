var config = {
  development: {
    //~ Location of the DB API instance
    dbapi: {
      host: '127.0.0.1',
      port: '6999'
    },
    //~ Local server settings
    server: {
      host: '127.0.0.1',
      port: '8079'
    }
  },
  production: {
    //~ Location of the DB API instance
    dbapi: {
      host: '127.0.0.1',
      port: '7000'
    },
    //~ Local server settings
    server: {
      port: '8080'
    }
  }
};
module.exports = config;
