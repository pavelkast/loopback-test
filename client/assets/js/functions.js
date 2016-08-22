
function getShopList(cb) {
  const url = 'http://localhost:3000/api/CoffeeShops';
  $.get(url, null, cb);
}
