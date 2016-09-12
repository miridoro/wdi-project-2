"use strict";

var App = {};

App.init = function () {
  this.apiUrl = "http://localhost:3000/api";
  this.$main = $("main");

  //set up event listeners
  $(".register").on("click", this.register.bind(this));
  $(".login").on("click", this.login.bind(this));
  $(".logout").on("click", this.logout.bind(this));
  $(".usersIndex").on("click", this.usersIndex.bind(this));
  $('.new').on('click', function () {
    e.preventDefault();
    console.log("Toggle Form");
    $('form').slideToggle();
  });
  this.$main.on("submit", "form", this.handleForm);

  App.toggleForm = function () {
    console.log("Toggle Form");
    $('form').slideToggle();
  };

  if (this.getToken()) {
    this.loggedInState();
  } else {

    this.loggedOutState();
    $(".loginForm").hide();
    $(".registerForm").hide();
  }
};

App.loggedInState = function () {
  $(".loggedOut").hide();
  $(".loggedIn").show();
  this.usersIndex();

  var username = window.localStorage.getItem("username");
  console.log("Current user is: " + username);
  $(".userName").html("Hello, " + username);
  //window.localStorage.setItem("user", user);
  //this.getUser();
};

App.loggedOutState = function () {
  $(".loggedIn").hide();
  $(".loggedOut").show();
  $(".loginForm").hide();
  $(".registerForm").hide();
  $(".card-deck-wrapper").hide();
  $(".userName").html("");
  //  this.register();
};

App.register = function () {
  if (event) event.preventDefault();
  //added
  $(".loginForm").hide();
  $(".registerForm").show();

  // this.$main.html(`
  //   <div class="loggedOut">
  //   <h2 >Register</h2>
  //   <form  method="post" action="/register">
  //     <div class="form-group">
  //       <input class="form-control" type="text" name="user[username]" placeholder="Username">
  //     </div>
  //     <div class="form-group">
  //       <input class="form-control" type="email" name="user[email]" placeholder="Email">
  //     </div>
  //     <div class="form-group">
  //       <input class="form-control" type="password" name="user[password]" placeholder="Password">
  //     </div>
  //     <div class="form-group">
  //       <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
  //     </div>
  //     <input class="btn btn-primary" type="submit" value="Register">
  //   </form>
  //   </div>
  //`);
};

App.login = function () {
  event.preventDefault();

  $(".registerForm").hide();
  $(".loginForm").show();

  // this.$main.html(`
  //   <div class="loggedOut">
  //   <h2>Login</h2>
  //   <form method="post" action="/login">
  //     <div class="form-group">
  //       <input class="form-control" type="email" name="email" placeholder="Email">
  //     </div>
  //     <div class="form-group">
  //       <input class="form-control" type="password" name="password" placeholder="Password">
  //     </div>
  //     <input class="btn btn-primary" type="submit" value="Login">
  //   </form>
  //   </div>
  // `);
};

App.logout = function () {
  event.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

// App.usersIndex = function(){
//   if (event) event.preventDefault();
//   let url = `${this.apiUrl}/users`;
//   return this.ajaxRequest(url, "get", null, (data) => {
//     this.$main.html(`
//       <div class="card-deck-wrapper">
//         <div class="card-deck">
//         </div>
//       </div>
//     `);
//     let $container = this.$main.find(".card-deck");
//     $.each(data.users, (i, user) => {
//       $container.append(`
//         <div class="card col-md-4">
//          <div class="card-block">
//            <h4 class="card-title">${user.username}</h4>
//          </div>
//        </div>`);
//     });
//   });
// };

App.usersIndex = function () {
  if (event) event.preventDefault();
  var url = this.apiUrl + "/users";
  return this.ajaxRequest(url, "get", null, function (data) {

    $.each(data.users, function (i, user) {
      // $(".userName").append(`<h4> ${user._id}</h4>`);

      // $(".userName").html(`${user.username}`);
      // $(".userName").html(`${user._id}`);
    });
  });
};

// App.getUser = function(){
//   let url = `${this.apiUrl}/users/` + this.getToken();
//   return this.ajaxRequest(url, "get", null, (data) => {
//     console.log(data);
//   });
// };


App.handleForm = function () {
  event.preventDefault();

  var url = "" + App.apiUrl + $(this).attr("action");
  var method = $(this).attr("method");
  var data = $(this).serialize();

  return App.ajaxRequest(url, method, data, function (data) {
    if (data.token) App.setToken(data.token);

    window.localStorage.setItem("username", data.user.username);

    App.loggedInState();
  });
};

App.ajaxRequest = function (url, method, data, callback) {
  return $.ajax({
    url: url,
    method: method,
    data: data,
    beforeSend: this.setRequestHeader.bind(this)
  }).done(callback).fail(function (data) {
    console.log(data);
  });
};

App.setRequestHeader = function (xhr, settings) {
  return xhr.setRequestHeader("Authorization", "Bearer " + this.getToken());
};

App.setToken = function (token) {
  return window.localStorage.setItem("token", token);
};

App.getToken = function () {
  return window.localStorage.getItem("token");
};

App.removeToken = function () {
  return window.localStorage.clear();
};

$(App.init.bind(App));