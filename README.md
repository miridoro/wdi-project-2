# wdi-project-2
This is my second project from my GA course
#  Santander Bike App


#####[Try out the app here!](https://infinite-dusk-69771.herokuapp.com/)


####Approach / How it works

This is a simple Google Maps App that allows the User to display all Santander Bike Stations within the City of London. Bike Stations are represented by circles, where radius is proportional to number of bikes. The User may also view each station according to number of empty docks. In order to have access to this information the User will have to register with the website or be already registered and then log in. User information is stored in a local database.

####The build

* HTML 5, SCSS, Bootstrap, jQuery and JavaScript were used to style and animate the map/app.
* Data display: Google Maps API and Transport for London API was used to display Santander Bike Stations on London map.
* The app was built with the express framework.
* The app contains back-end and front-end components
* Transport for London API data is accessed from the server side
* User authentication has been included using bcrypt
* MongoDB is used to store individual user login information
* Gulp was used as the task manager

#### Problems & Challenges

A challenge was to initially start the project due to the large amount of files that had to be included. Another challenge was to decide on a topic that had good quality data and then to display it on the map. I immersed myself in these challenges over a two day period (the weekend) and was able to solve most issues. Finally, deciding on a style and using the correct styling syntax, in addition to customizing bootstrap 4.0 styling was another challenge. 