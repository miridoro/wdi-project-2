(function(globals){
  "use strict";

  if (!('App' in globals)) { globals.App = {}; }

  globals.App.init = function() {
    this.apiUrl = "http://localhost:3000/api";
    this.$main  = $("main");


    //set up event listeners
    $(".register").on("click", this.register.bind(this));
    $(".login").on("click", this.login.bind(this));
    $(".logout").on("click", this.logout.bind(this));
    $('.location').on('click', this.getCurrentLocation);
    $(".usersIndex").on("click", this.usersIndex.bind(this));
    $(".emptyMap").on("click", this.emptyMap.bind(this));
    $(".hideButton").on("click", this.hideButton);


    this.$main.on("submit", "form", this.handleForm);

    if (this.getToken()) {
      this.loggedInState();
    } else {

     this.loggedOutState();
     $(".loginForm").hide();
     $(".registerForm").hide();
     $(".btn-group").hide();
     $("switchButton1").hide();
     $("switchButton2").hide();
    }
  };


  globals.App.loggedInState = function(){
    console.log("We are logged in now");
    $(".loggedOut").hide();
    $(".btn-group").show();
    $("switchButton1").show();
    $("switchButton2").show();
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

  globals.App.emptyMap = function() {
    globals.App.mapSetup();
  };

  globals.App.hideButton = function() {
    $("switchButton1").hide();
    $("switchButton2").hide();
    $(".btn-group").hide();
  };

  globals.App.loggedOutState = function(){
    console.log("We are logged out now");
    $(".loggedIn").hide();
    $(".loggedOut").show();
    $(".loginForm").hide();
    $(".registerForm").hide();
    $(".card-deck-wrapper").hide();
    $(".userName").html("");
  //  this.register();
  };


  globals.App.register = function() {
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



  globals.App.login = function() {
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




  globals.App.logout = function() {
    event.preventDefault();
    this.removeToken();
    this.loggedOutState();
  };




  // globals.App.usersIndex = function(){
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

  globals.App.usersIndex = function(){
    if (event) event.preventDefault();
    let url = `${this.apiUrl}/users`;
    console.log("********************************");

    return this.ajaxRequest(url, "get", null, (data) => {

      $.each(data.users, (i, user) => {
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


  globals.App.handleForm = function(){
    event.preventDefault();
    $('#myModal').modal('hide');
    $('#myModal2').modal('hide');

    let url    = `${globals.App.apiUrl}${$(this).attr("action")}`;
    let method = $(this).attr("method");
    let data   = $(this).serialize();

    return globals.App.ajaxRequest(url, method, data, (data) => {
      if (data.token) globals.App.setToken(data.token);

      window.localStorage.setItem("username", data.user.username);

      globals.App.loggedInState();
    });
  };



  globals.App.ajaxRequest = function(url, method, data, callback){
    return $.ajax({
      url,
      method,
      data,
      beforeSend: this.setRequestHeader.bind(this)
    })
    .done(callback)
    .fail(data => {
      console.log(data);
    });
  };

  globals.App.setRequestHeader = function(xhr, settings) {
    return xhr.setRequestHeader("Authorization", `Bearer ${this.getToken()}`);
  };

  globals.App.setToken = function(token){
    return window.localStorage.setItem("token", token);
  };

  globals.App.getToken = function(){
    return window.localStorage.getItem("token");
  };

  globals.App.removeToken = function(){
    return window.localStorage.clear();
  };

  $(globals.App.init.bind(globals.App));

}(this));
