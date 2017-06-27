var api = '/api/v1';

module.exports = function (app){
  app.use(api, require('./login'));
}
