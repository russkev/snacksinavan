<p align="center">
    <img src=frontend/src/logo.svg altText="Logo" style="margin-bottom:30px">
</p>
<h1 align="center">
    Team Whelk - Snacks in a Van app
<h1>

# Welcome

This is a food van app designed as a group project for INFO30005 – Web Information Technologies


# Table of contents
* [Features](#features)
* [Getting Started](#getting-started)
* [Running Locally](#running-locally)
* [Debugging in vsCode](#debugging-in-vscode)
* [Style notes](#style-notes)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Testing](#testing)
* [Team Members](#team-members)



# Features
 - Users can access the snack menu and add to their cart before having to log in / sign up or select a van.
 - Once a user has logged in, they are taken back to the page they came from (if applicable).
 - Users can create an account from the sign in page.
 - Navigation buttons move from header bar to menu drawer when screen size is too small.
 - If a logged out user tries to access any page they should be logged in for, a login window pops up.
 - Navigation buttons automatically change depending on whether a user is logged in or not.
 - Most pages have a back button to take them back to the logical previous page.
 - Orders are updated live on both the customer and vendor apps. This allows vendors to see changes as they happen live and for customers to know exactly when their order is ready.
 - User can watch the expected progress of their order and see where the van they ordered from is located directly from the order details page.
 - A loading animation plays while a page is loading so users are aware that something is happening and they are not stuck.
 - The map has a search bar and "use my location" button to make it easy for the user to find the nearest vans.
 - The vendor app hides unnecessary information about an order until expanded.
 - Pagination is used on the customer's orders page so they can focus on recent orders.
 - Snackbar popup for success / failure information.


# Getting started
This app has been tested on Linux (Ubuntu) but should work fine on any operating system.
 - Clone the repository
 - Navigate to `src/frontend`
 - `npm install`
 - Navigate to `src/backend`
 - `npm install`

## MongoDB
 - Install MongoDB from the command line (for WSL2 use [this guide](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb))
 - Download Compass and install.
 - To see details of running database, type: `mongo --eval 'db.runCommand({ connectionStatus: 1 })'`
 - From there you can find the server. You can connect to it from Compass to get a GUI of the interface.


# Running locally
If everything is already set up, these are the commands you need to run the entire website locally (ensure you have appropriate environment variables)

## Database
 - `sudo service mongodb start`

## Backend
  - Navigate to `src` folder
  - Run `npm start`

## Frontend
  - Navigate to `src/client`
  - Run `npm start` to run the frontend website.

# Debugging in vsCode
  - Click the `Run and Debug` button on the left
  - Click `JavaScript Debug Terminal`
  - Set some break points
  - Run the command you would usually use to start the server (i.e. `npm run dev`) inside the debug terminal
  - `Debugger attached` will display in the terminal if successful

# Style notes
  - Use periods (i.e. '`.`') to separate words in file names
  - Variables etc. should be labelled with `lowerCamelCase`
  - `Prettier` with default settings should be used for formatting code
  - Tabs should be 2 spaces
		
# Technologies
* NodeJs
* Express
* React
	
# Team Members
 - Will Mason
 - Kevin Russel
 - Cooper Marshall
 - Ethan Edge
 - Liam Wardlaw

# API

## Routes

  - `api/auth/signup` POST signup information (username, password, etc.)
  - `api/auth/userCheck/:username` GET (check) whether user exists
  - `api/auth/info/:username` GET information about a specific user
  - `api/auth/info/update` POST Update the information about a specific user
  - `api/auth/login` POST the login information (email and password). Returns token if successful.
  - `api/auth/authenticate`POST (check) that an email and password are valid
  - `api/menu/` GET all menu items
  - `api/:name` GET the details of a specific menu item
  - `api/van/login` POST the login information for a van (vanName and password)
  - `api/van/authenticate` POST (check) that a specific van exists
  - `api/van/vanDetails` GET details about a specific van
  - `api/van/setStatus` POST the updated van information
  - `api/van/all` GET the list of all vans
  - `api/globals/` GET the list of all global variables (discount amount, etc.)

## Socket connections
Note: customer and van methods are in the same file here because they require the same io function to be able to interact with each other properly.
 - `ordersChanged` The main update method. Sends information about what was updated to all connected sockets. This allows the connected apps to choose whether to request an update of the data they are interested in. This will depend on whether they involve the appropriate van / user
 - `orderListVan` A list of all orders for a particular van
 - `createOrder` Send a new order
 - `fulfillOrder` Mark an order as fulfilled
 - `completeOrder` Mark an order as completed
 - `orderListCustomer` Get all orders for a specific customer
 - `getOrder` Get a specific order based on an ID
 - `orderModify` Update an existing order with new information. This will cause the `updatedAt` time to be updated which will in turn cause the related timers to be reset
 - `cancelOrder` Mark an order as cancelled (but keep it in the database)
 - `rateOrder` Send a rating and feedback message for a specific order