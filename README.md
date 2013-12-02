Abee 
============================
a meteor scaffolding application that

- creates your app and build a *customizable* "best practice" directory structure
- adds/removes *customizable* views/templates to/from your app
- adds/removes *template based* models with proper collection, client-subscription and server-publish
- generates allow/deny stubs for your collections
- adds basic routes in the url -> view/template style

Abee is using **Handlebars** to manage the templates, so you doesn't have to learn something new when you already know meteor.

Installation
----------------
You'll need to have Node >= 0.10.0 installed on your system.

To install:

    $ npm install -g abee

To update:

    $ npm update -g abee

Why?
--------

I don't want to write the same stuff over and over again. Due to the structure of a meteor-app you have to do this stuff in multiple directories and/or multiple files. So i decided to let a bit of software do that work.

Usage
---------

**usage: abee command [subcommand] [options]**

commands:

**create**     
creates an app like meteor does, but extends it with a (configurable) "best practice" directory structure.

    $ abee create <YourAppName>

**help**  
prints help message.
                 
    $ abee help
 
**model**         
creates a model, adds a collection, client-side subscription, server-side publish and permissions.

    $ abee model add <modelName1> [attribute1,..attributeN] ... <modelNameN> [attribute1,..attributeN]
    $ abee model remove <modelName1> ... <modelNameN>
    $ abee model list

**template**  or **view**    
creates a template in the clients template directory.  
*hint:* insert a ```.``` as templateGroup to omit templateGroup.
    
    $ abee template add <templateName1> ... <templateNameN> <templateGroup>
    $ abee template remove <templateName1> ... <templateNameN> <templateGroup>
    $ abee template list

or

    $ abee view add <templateName1> ... <templateNameN> <templateGroup>
    $ abee view remove <templateName1> ... <templateNameN> <templateGroup>
    $ abee view list

 **route**         
creates a route (when meteor-router is used)

    $ abee route add <url1>[:<view1>] ... <urlN>[:<viewN>]
    $ abee route remove <url1>[:<view1>] ... <urlN>[:<viewN>]
 
Examples
------------
Create a new app named "someHotStuff" with "best practice" directory structure

    $ abee create someHotStuff

Create 3 views named login, logout and forgotPassword in group usermgr

    $ abee view add login logout forgotPassword usemgr

Create 2 views (foo and bar) directly in the view directory

    $ abee view add foo bar .

Create 2 models (user and post), 2 collection, 2 subscriptions and 2 publishs  
    
    $ abee model add user post 
 
Same as above but with attributes
    
    $ abee model add user [name,email,info] post [title,body,author]

Remove models user and post

    $ abee model remove user post

Directory Structure
---------------------------

    |-- client                // client only directory
    | |-- css                 // cascading stylesheets
    | |-- js                  // thirdparty libraries
    | |-- lib                 // gets loaded first
    | | |-- helpers           // client-side helper methods
    | | |-- meteor            // meteor specific client data
    | |   |-- subscriptions   // subscribe to data
    | |   |-- router.js       // client-side routing
    | |   |-- startup.js      // run on new client init
    | |
    | |-- views               // views / templates 
    |
    |-- lib                   // gets loaded first
    | |-- helpers             // client AND server helpers
    | |-- models              // models  
    |
    |-- packages              // smart packages from atmosphere 
    |-- private               // privates assets like email-templates
    |-- public                // public assets
    | |-- img
    | |-- fonts
    | |-- js
    |
    |-- server                // server only code
    | |-- api                 // REST API (optional)
    | |-- config
    | | |-- accounts.js       // Accounts.config(), etc.
    | | |-- users.js          // Accounts.onCreateUser(), etc.
    | |
    | |-- helpers             // server-side helper functions
    | |-- lib                 // what should get loaded first
    | | |-- settings.js       // load into Meteor.settings
    | | |-- packages.js       // instantiate your npm modules
    | | |-- startup.js        // run on server startup
    | |
    | |-- models              // server-only Meteor.methods
    | |-- publish             // individual files for the type of data
    | |-- permissions         // permissions for collections goes here
    |
    |-- tests                 // unittests, functiontests, etc
 
License
------
MIT
