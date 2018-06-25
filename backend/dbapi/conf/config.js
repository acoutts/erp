var config = {
  development: {
    //~ DB connection settings
    database: {
      host: '127.0.0.1',
      port: '5432',
      dbname: 'dbname',
      user: 'username',
      pass: 'password',
    },
    //~ Server details
    server: {
      host: '127.0.0.1',
      port: '8000'
    }
  },
  production: {
    database: {
      host: '127.0.0.1',
      port: '5432',
      dbname: 'dbname',
      user: 'username',
      pass: 'password',
    },
    //~ Server details
    server: {
      port: '8001'
    }
  }
};
module.exports = config;
