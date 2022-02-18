<p align="center">
    <img src=frontend/src/logo.svg altText="Logo" style="margin-bottom:30px">
</p>
<h1 align="center">
    Snacks in a Van app
<h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/7413316f-2cdd-4979-9018-b1d09dac8c17/deploy-status)](https://app.netlify.com/sites/snacks-in-a-van/deploys)

[Live site](https://snacks-in-a-van.netlify.app/)

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
 - Fully functional customer and vendor apps
 - Socket API for instant updates on orders
 - Theme created from scratch, no component library
 - Secure account creation and login using JWT tokens and React Router
 - Automatic login popup and redirection based on logged in status and current page
 - Demo accounts for easy trial of all site components
 - Responsive design
 - Google maps integration for finding closest van to customer


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
  - Navigate to `src/backend` folder
  - Run `npm start`

## Frontend
  - Navigate to `src/frontend`
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
 - NodeJs
 - Express
 - React
 - MongoDB
	
# Team Members
 - Will Mason
 - Kevin Russel
 - Cooper Marshall
 - Ethan Edge
 - Liam Wardlaw