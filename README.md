# Level 4 Task 35 -Capstone Project V: Authentication

## DEPLOYED

https://juanevacooltech.herokuapp.com/

## SPECIFICATIONS

Remember Cool Tech from your PHP Capstones? Well, they’ve grown orders of magnitude bigger since your last job for them. They now span multiple continents, languages and websites. They make use of multiple different WordPress sites as well as some custom ones. 

Managing all of them and their login details are becoming a very big hassle. One of the Cool Tech execs recommended you to solve their problem because of your great past work.

Build an internal web app for credential management. Credentials are login details (username & password) and can be for a variety of places — WP sites, servers, financial accounts, etc. 

Because of the value of the credentials to be stored in the app, it is of utmost importance that the app is authenticated airtight.

Your web app should have user login and registration, different user roles, and different resource access for each user. Cool Tech has the following five organisational units (OU):

● News management

● Software reviews

● Hardware reviews

● Opinion publishing

● New technology reviews

Each of these OUs has over 10 different divisions within them. Divisions take care of subtasks like finances, IT, writing, development, and so on. 

Each division has its own credential repository which contains a list of login details for various places. All employees of the division should have access to it.

Most employees are only part of one OU and one division with it, but there are some that are part of more than one OU and division. Furthermore, there should be different user roles for the employees.

● Normal users can read the credential repository, and add new credentials in.

● Management users can do the above plus update credentials.

● Admin users can do the above plus they can assign and unassign users from divisions and OUs. They can also change the user role of any user.

## Task 1

Either create two git repos (front and backend) or one repo with two folders in it. Set up a bare-bones React frontend and Express backend. Set up MongoDB and Mongoose for Express.

● Create the basic DB structure for modelling users, OUs, divisions, and credential repositories. Add some sample data — the OUs are named above, but you can make stuff up as you go.

● Create login and registration endpoints. Be sure to provide a JWT upon success. 

● By default, users register as normal users.

● Create a frontend for these endpoints. Focus on looks (sensible, well-aligned design) and feedback (perhaps a toast upon success).

## Task 2

● Create an endpoint for viewing a division’s credential repository. Be sure to verify the JWT and user permissions before providing access.

● Create an endpoint for adding a credential to a specific repo.

● Create an endpoint for updating a specific credential.

● Create frontend components for the above features.

## Task 3

● Create endpoints for assigning and designing users from divisions and OUs.

● Create an endpoint for changing a user’s role.

● Create frontend components for the above features.

## NOTE

I have loaded the following users on the database for testing purpose:

- You are welcome to register more users and give more user rights for testing.

## LOGIN

Please see images attached for access passwords to test my app out.