Abee 
============================
a meteor scaffolding application that

- creates your app and build a *customizable* "best practice" directory structure
- extends your existing app.
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

Abee operates in your app-directory (the place where you call meteor to start your app). The two exceptions are `create` because there is no app-directory before you call `create` ;-) and `abeetize` with a parameter.

**usage: abee command [subcommand] [options]**

commands:

### abeetize

    $ abee abeetize                    #called IN app-directory
    $ abee abeetize <YourMeteorApp>    #called like create 
    
Extends your meteor app with the in section "Directory Structure" listed structure.

### create   

    $ abee create <YourAppName>  
    
Creates an app like meteor does, but extends it with a (configurable) "best practice" directory structure.
When you call `create` the `dirs.js` in the abee directory is parsed and the structure is created for you.

### help 
                 
    $ abee help
    
prints help message.
 
### model     
 
    $ abee model add <modelName1> [attribute1,..attributeN] ... <modelNameN> [attribute1,..attributeN]
    $ abee model remove <modelName1> ... <modelNameN>
    $ abee model list
    
creates a model, adds a collection, client-side subscription, server-side publish and permissions.

### view (or template)    
     
    $ abee view add <templateName1> ... <templateNameN> <templateGroup>
    $ abee view remove <templateName1> ... <templateNameN> <templateGroup>
    $ abee view list



    
creates a template in the clients template directory.  
*hint: insert a ```.``` as templateGroup to omit templateGroup.*

### route       


    $ abee route add <url1>[:<view1>] ... <urlN>[:<viewN>]
    $ abee route remove <url1>[:<view1>] ... <urlN>[:<viewN>]
    
creates a route (when meteor-router is used)
 
Usage Examples
--------------
Extends app "someHotStuff" with "best practice" directory structure

    $ abee abeetize someHotStuff

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

dirs.js
--------------------------
`dirs.js` describes the directory-structure that is build when you call `abee create`

    'dirName':{},  //creates an empty directory
    'dirName2' :{  //creates an directory with an subdirectory called subDir
      'subDir': {}
    },
    'fileName.ext': null, //creates an empty file
    'fileName2.ext': "templateName", //uses template 'templateName' for file


Templates
--------------------------
Abee creates files by handlebars-templates, so that's the same what you, as meteor developer, already know. 

- `abee create` parses the `dirs.js` file and generates files from templates when a templateName is specified.  
  Use `{{appName}}` in your templates to display yours app actual name.

- `abee model` uses a lot of templates.
  - For models it looks for a template named `<modelName>Model.js`.  The fallback is the standard template named `model.js`.  
    It provides the name of the model as `{{model}}`,  
    the capitalized name as `{{Model}}`   
    and all attributes given at the command-line in `{{attr}}`.  
    Each attribute has `{{name}}` as name and `{{Name}}` as capitalized name.

  - For subscriptions it looks for a template named  `<modelName>Subscription.js`. The fallback is `subscription.js`.   
    Only variable passed is `{{model}}`, the lowercase modelName.

  - For publish it looks for a template named `<modelName>Publish.js`. The fallback is `publish.js`.  
    It provides the lowercase modelName `{{model}}`  
    and the name of the collection in `{{collection}}`.

  - For permissions it looks for a template named `<modelName>Permissions.js`.  
    The fallback is named `permissions.js`.   
    The only variable provided is `{{collection}}`, the collections name.

- `abee view` uses two templates.
  
  - For the .js file it looks for a template named `<viewName>.js`. The fallback is the standard template named `view.js`.  
    Use `{{view}}` to get the views name.     
  - For the .html file it looks for a template named `<viewName>.html`. The fallback is the standard template named `view.html`.   
     Use `{{view}}` to get the views name.


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
    |   |-- index.html        // startpoint for your client templates
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
