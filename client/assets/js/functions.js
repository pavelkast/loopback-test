
function getShopList(cb) {
  const url = 'http://localhost:3000/api/CoffeeShops';
  $.get(url, null, cb);
}

function toggleTopNavigation() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function populateAccountModal() {
  if (userData.fields.avatar_url) {
    $('#account-modal #avatar').attr('src', userData.fields.avatar_url)
  }

  $('#account-modal input[name="email"]').val(userData.fields.email);
}
