"use strict";

(function (globals) {
  "use strict";

  if (!('App' in globals)) {
    globals.App = {};
  }

  globals.App.init = function () {
    this.apiUrl = "http://localhost:3000/api";
    this.$main = $("main");
    this.whichMarker = "NbBikes";

    //set up event listeners
    $(".register").on("click", this.register.bind(this));
    $(".login").on("click", this.login.bind(this));
    $(".logout").on("click", this.logout.bind(this));
    $('.location').on('click', this.getCurrentLocation);
    $(".usersIndex").on("click", this.usersIndex.bind(this));
    $(".emptyMap").on("click", this.emptyMap.bind(this));
    $(".hideButton").on("click", this.hideButton);
    $(".switchButton1").on("click", this.showBikesMarkers.bind(this, $(".switchButton1")));
    $(".switchButton2").on("click", this.showBikesMarkers);

    this.$main.on("submit", "form", this.handleForm);

    if (this.getToken()) {
      this.loggedInState();
    } else {

      this.loggedOutState();
      $(".loginForm").hide();
      $(".registerForm").hide();
      $(".btn-group").hide();
    }
  };

  globals.App.loggedInState = function () {
    console.log("We are logged in now");
    $(".loggedOut").hide();
    $(".btn-group").show();
    $(".loggedIn").show();
    this.usersIndex();

    //draw bike markers when user logs in
    globals.App.getBikePoints();

    var username = window.localStorage.getItem("username");
    console.log("Current user is: " + username);
    $(".userName").html("Welcome " + username + "!");
    //window.localStorage.setItem("user", user);
    //this.getUser();
  };

  globals.App.emptyMap = function () {
    globals.App.mapSetup();
  };

  globals.App.hideButton = function () {
    $(".btn-group").hide();
  };

  globals.App.showBikesMarkers = function (button) {
    // $(".switchButton2").addClass("bikes");
    alert("Hello world");
  };

  globals.App.loggedOutState = function () {
    console.log("We are logged out now");
    $(".loggedIn").hide();
    $(".loggedOut").show();
    $(".loginForm").hide();
    $(".registerForm").hide();
    $(".card-deck-wrapper").hide();
    $(".userName").html("");
    //  this.register();
  };

  globals.App.register = function () {
    if (event) event.preventDefault();
    //added
    $(".loginForm").hide();
    $(".registerForm").show();
  };

  globals.App.login = function () {
    event.preventDefault();

    $(".registerForm").hide();
    $(".loginForm").show();
  };

  globals.App.logout = function () {
    event.preventDefault();
    this.removeToken();
    this.loggedOutState();
  };

  globals.App.usersIndex = function () {
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

  // globals.App.getUser = function(){
  //   let url = `${this.apiUrl}/users/` + this.getToken();
  //   return this.ajaxRequest(url, "get", null, (data) => {
  //     console.log(data);
  //   });
  // };


  globals.App.handleForm = function () {
    event.preventDefault();
    $('#myModal').modal('hide');
    $('#myModal2').modal('hide');

    var url = "" + globals.App.apiUrl + $(this).attr("action");
    var method = $(this).attr("method");
    var data = $(this).serialize();

    return globals.App.ajaxRequest(url, method, data, function (data) {
      if (data.token) globals.App.setToken(data.token);

      window.localStorage.setItem("username", data.user.username);

      globals.App.loggedInState();
    });
  };

  globals.App.ajaxRequest = function (url, method, data, callback) {
    return $.ajax({
      url: url,
      method: method,
      data: data,
      beforeSend: this.setRequestHeader.bind(this)
    }).done(callback).fail(function (data) {
      console.log(data);
    });
  };

  globals.App.setRequestHeader = function (xhr, settings) {
    return xhr.setRequestHeader("Authorization", "Bearer " + this.getToken());
  };

  globals.App.setToken = function (token) {
    return window.localStorage.setItem("token", token);
  };

  globals.App.getToken = function () {
    return window.localStorage.getItem("token");
  };

  globals.App.removeToken = function () {
    return window.localStorage.clear();
  };

  $(globals.App.init.bind(globals.App));
})(undefined);