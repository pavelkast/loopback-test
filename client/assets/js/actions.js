$(document).ready(function() {
  
  if(userData.user_id) {
    $('#logout-btn').removeClass('hidden');
    $('#account-btn').removeClass('hidden');
    $('#login-btn').addClass('hidden');
  }

  getShopList(function(result) {
    const count = result.length;
    const html = result.map(function (item) {
      return '<div class="shop-item">' +
        '<div class="logo">' +
        '<img src="' + item.image_url + '">' +
        '</div>' +
        '<div class="name">' + item.name + '</div>' +
        '<div class="city">' + item.city + '</div>' +
        '</div>';
    });

    $('.my-slick')
      .html(html)
      .slick(slickSettings);
  });


  $('#login-modal input[type="submit"]').on('click', function (event) {
    event.preventDefault();
    const login = $('#login-modal input[name="user"]').val();
    const password = $('#login-modal input[name="pass"]').val();

    $.ajax({
      url: '/api/Users/login',
      dataType: 'json',
      type: 'POST',
      data: {
        username: login,
        password: password
      },
      success: function(result) {
        userData.access_token = result.id;
        userData.user_id = result.userId;

        $.get('/api/Users/' + userData.user_id  + '?access_token=' + userData.access_token, function(fields) {
          userData.fields = fields;
          localStorage.setItem('userData', JSON.stringify(userData));
          $('#login-modal').modal('hide');
          $('#logout-btn').removeClass('hidden');
          $('#account-btn').removeClass('hidden');
          $('#login-btn').addClass('hidden');
        });
      },
      error: function(result) {
        console.log(result);
      }
    })
  });

  $('#account-modal').on('show.bs.modal', populateAccountModal);

  $('#account-modal form').on('submit', function(event) {
    event.preventDefault();

    var file_data = $('#account-modal form input[type="file"]').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    $.ajax({
      url         : '/api/Files/upload?user_id=' + userData.user_id ,     // point to server-side PHP script
      dataType    : 'text',           // what to expect back from the PHP script, if anything
      cache       : false,
      contentType : false,
      processData : false,
      data        : form_data,
      type        : 'post',
      success     : function(output){
        var parsedJson = JSON.parse(output);

        userData.fields.avatar_url = parsedJson.url;
        localStorage.setItem('userData', JSON.stringify(userData));

        $('#account-modal').modal('hide');// display response from the PHP script, if any
      }
    });
    $('#avatar').val('');
  });

  $('#logout-btn').on('click', function (event) {
    event.preventDefault();

    $.ajax({
      url: '/api/Users/logout?access_token=' + userData.access_token,
      type: 'POST',
      success: function(result, content, response) {
        $('#logout-btn').addClass('hidden');
        $('#account-btn').addClass('hidden');
        $('#login-btn').removeClass('hidden');
        localStorage.removeItem('userData');
      },
      error: function(result) {
        $('#logout-btn').addClass('hidden');
        $('#account-btn').addClass('hidden');
        $('#login-btn').removeClass('hidden');
        localStorage.removeItem('userData');
      }
    })
  });
});
