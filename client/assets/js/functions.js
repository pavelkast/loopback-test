
function getShopList(cb) {
  const url = 'http://localhost:3000/api/CoffeeShops';
  $.get(url, null, cb);
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
