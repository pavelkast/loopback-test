// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-getting-started
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create([
      {name: 'Bel Cafe', city: 'Vancouver', image_url: '/assets/images/shop/1.jpg'},
      {name: 'Three Bees Coffee House', city: 'San Mateo', image_url: '/assets/images/shop/2.jpg'},
      {name: 'Caffe Artigiano', city: 'Vancouver', image_url: '/assets/images/shop/3.jpg'},
      {name: 'Hop Hey Lalaley', city: 'Berlin', image_url: '/assets/images/shop/4.png'},
      {name: 'Azaza', city: 'New York', image_url: '/assets/images/shop/5.jpg'},
      {name: 'Rumochnaya', city: 'Minsk', image_url: '/assets/images/shop/6.jpg'},
    ], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
