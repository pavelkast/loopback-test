// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-getting-started
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  app.models.User.defineProperty('avatar_url', { type: 'string' });

  app.dataSources.mysqlDs.automigrate('File', function(err) {
    if (err) throw err;
  });

  app.dataSources.mysqlDs.automigrate('User', function(err) {
    if (err) throw err;

    app.models.User.create([
      {username: 'test', password: 'test', email: 'test@test.com'}
    ], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });

  app.dataSources.mysqlDs.automigrate('AccessToken', function(err) {
    if (err) throw err;
  });

  app.dataSources.mysqlDs.automigrate('ACL', function(err) {
    if (err) throw err;
  });

  app.dataSources.mysqlDs.automigrate('RoleMapping', function(err) {
    if (err) throw err;
  });

  app.dataSources.mysqlDs.automigrate('Role', function(err) {
    if (err) throw err;
  });
};
