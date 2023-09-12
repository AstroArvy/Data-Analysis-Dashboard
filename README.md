# Data-Analysis-Dashboard
A simple minimalistic and static dashboard design for an ecommerce company.

## Requirements
Make sure you have installed mysql-connector-python library for python, and,
you have NodeJS installed for Javascript and cors, express and mysql installed for NodeJS.

## Initialization
This script uses a random database generated via python and loaded in a local server of MYSQL. To create this database, first edit the MYSQL.py file, change the username and password to your mysql local server's username and password.
Then run the python script through your terminal.

Once completed, make sure the database is uploaded on your MYSQL local server. 
Once the database is ready, edit the server.js file. Change the username and password to the MYSQL local server's username and password. Change the database name to the your database name in MYSQL. (most likely if you ran the python file as it is, the database name would be microtek)
After editing the server.js file, run it through terminal, using 'node server.js'.
Now you have a server running on your local machine that is being used as a fetchpoint for highcharts data and the MYSQL database.

With the server ready, you can run the webpage by opening Microtek.html file. You can use filters by selecting the required option and pressing the GO button. The results will update dynamically.

## Editing
In case you want to personalize this webpage, you can change the logo on the top by changing the logo.png file to your own logo. 
To use a different database, change the database name in server.js to your own database name on MYSQL server.
To change the filter options in the navigation menu of the webpage, edit the html file and change the dropdown options to your preferred names.
Remember to edit the Javascript.js file to update the dropdown menu options so that the filters can be updated.
