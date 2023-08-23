# GreenTeamPROJECT
Green Team Semester Project Repository and Files

Project Name:

Goal of Project:

Team Members:
Software Engineer:  Andrew & Cara
Requirements Analysis:  Brian & Andrew
System Design:  Chris
Program Design: Brian, Cara
Program Development:  Brian, Chris, Andrew, Madison
Unit Testing: Cara, Madison
Integration Testing: Cara, Madison
System Testing: Everyone
Training and Documentation: Chris, Cara
Maintenance:  Andrew, Brian

Best practices for coding in this team:
   We will use great names for functions and variables, ie: nouns for variables, verbs for functions.
   No magic numbers, any constants are declared at the top of the file or the function.
   No god functions that contain all the code.
   Minimal but good comments, we don't want to spend forever rewriting comments.
   We will put our name in a comment on the first line of any function we create.
   We will use camel case and we will put the brace '{' directly after a function, not on the following line.  
   We will ask for help if we get stuck. (don't spend more than a day on a thing, ask!) 


API Modules

### Login / Signup Module
Login Form
   POST request to retrieve user
Signup Form
   POST request to create user
Forgot Password
   POST update user password
Confirm Email
   Click link sent to email that sends POST request to update user as a CONFIRMED USER
###  Practice Module
Interface to select list
   GET all admin lists
   GET user lists (if any)
Create List modal
   POST to create list
Edit List modal
   POST to update or delete list
### Account Settings Module
Purchase Subscription
   POST to Stripe API
Update User Info (change name, subscription status)
   POST to update user
### Admin Dashboard Module
Manage Lists
   GET Admin lists
   POST to create list
   POST to update or delete list
Manage Users
   GET all users

### Get From Database (API routes)
   GET users
   GET current user’s lists
   GET admin's lists
Update Database (API routes)
   POST to create user
   POST to create admin
   POST to create user’s list
   POST to create admin’s list
   POST to update user’s list (add terms to list)
   POST to update admin’s list (add terms to list)
   POST to delete user’s list
   POST to delete admin’s list
   POST to update user info
