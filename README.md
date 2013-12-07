Abee 
============================

Abee is a meteor scaffolding application that allows you to use your own (or the build-in) design patterns to build a great meteor app in less time.

Abee

- creates your app and build a "best practice" directory structure that you can choose from different configurations. 
- extends your existing meteor app.
- uses **Handlebars**, so you don't have to learn new stuff.
- adds/removes *customizable* views/templates to/from your app.
- adds/removes *template based* models/collections, client-subscriptions and server-publications.
- generates allow/deny stubs for your collections.
- adds routes.

**You can configure what is** a model or a view, so Abee produces what you think it should.

Why?
--------

I am to lazy to don't write the same stuff over and over again. Due to the structure of a meteor-app you have to do this stuff in multiple directories and/or multiple files. So i decided to let a bit of software do that work.

Installation
----------------
You'll need to have Node >= 0.10.0 installed on your system.

To install:

    $ npm install -g abee

To update:

    $ npm update -g abee

Usage
---------

Abee operates in your app-directory (the place where you call meteor to start your app). The only exception is `create` because there is no app-directory before you call `create` ;-).

**usage: abee command [subcommand] [options]**

commands:

#### abeetize

    $ abee abeetize <?design-pattern>
    
Extends your meteor app with Abees scaffolding capabilities and generate the chosen directory structure.

#### create   

    $ abee create <YourAppName> <?design-pattern>
    
Creates meteor app like meteor does, but abeetizes it.

#### help 
                 
    $ abee help
    
prints help message.
 
#### collection     
 
    $ abee collection add <collectionName1> [attributeForModel1,..,attributeForModelN] ... <collectionNameN> [attributeForModel1,..,attributeForModelN]
    $ abee collection remove <collectionName1> ... <collectionNameN>
    
creates a collection, (and in the standard configuration) adds a model, client-side subscriptions, server-side publications and permissions.

#### page

    $ abee page add <template> <pageName1> ... <pageNameN>
    $ abee page remove <template> <pageName1> ... <pageNameN>
    

#### template 
     
    $ abee template add <templateName1> ... <templateNameN> <templateGroup>
    $ abee template remove <templateName1> ... <templateNameN> <templateGroup>
   
creates a template in the clients template directory.  
*hint: insert a ```.``` as templateGroup or add only one template to omit templateGroup.*

#### route   
    
    $ abee route add <path1> ... <pathN>
    $ abee route add <path1>:<template1> ... <pathN>:<templateN>
    $ abee route add <name1>:<path1>:<template1> ... <nameN>:<pathN>:<viewN>
    
    $ abee route add <name1> ... <name273>:<path273>:<template273> ... <pathN>:<templateN>
        
creates a route.
 
### Usage Examples

Extends app "someHotStuff" with the classicmvc design-pattern

    $ abee abeetize someHotStuff classicmvc

Create a new app named "someHotStuff" with "best practice" directory structure

    $ abee create someHotStuff //default config is classicmvc so you don't have to write it

Create 3 templates named login, logout and forgotPassword in group usermgr

    $ abee templates add login logout forgotPassword usemgr

Create 2 templates (foo and bar) directly in the view directory

    $ abee templates add foo bar .

Create 2 models (user and post), 2 collection, 2 subscriptions and 2 publishs  
    
    $ abee model add user post 
 
Same as above but with attributes
    
    $ abee model add user [name,email,info] post [title,body,author]

Remove models user and post

    $ abee model remove user post

Creates a route with name 'name', path '/path' and template 'template' and another one with name1,/path1 and template1

    $ abee route add name:path:template  name1:path1:template1 

inside Abee
-----------------

### Directory structure
the abee directory looks like this

    -- abee             
     |-- cmds               // commands that added here where automaticaly load by Abee
     | |-- create.js
     | |-- model.js
     | |-- route.js
     | |-- template.js
     |
     |-- configs            // this folder holds the configurations for the design-patterns
     | |-- classicmvc.js    // classical MVC configuration like ruby on rails
     | 
     |-- lib                // core libaries and helper functions
     | |-- abee.js          
     | |-- colors.js
     | |-- config.js
     | |-- fshelper.js
     | |-- helper.js
     | |-- tplhelper.js
     |
     |-- templates          // here is the directory to store the templates for different 
     | |-- classicmvc       // design-patterns. First Abee looks for the templates specified 
     |   |-- index.html     // in the config in the subfolder of the same name as the config.
     |   |-- model.js       // After that Abee searchs in the main templates folder.
     |   |-- permissions.js
     |   |-- publish.js
     |   |-- route.js
     |   |-- router.js
     |   |-- subscription.js
     |   |-- view.html
     |   |-- view.js
     |
     |-- abee                // the command-line interface
     |-- LICENSE             // license file
     |-- package.json        // npm description
     |-- README.md           // this file
     
### Design pattern config

    name: 'classicmvc',               // name of the configuration 
                                      // (same as filename without .js)
    structure:{                       // the file and directory structure
      'emptyDir':{},                  // empty directory
      'dir':{                         // directory
        'subdir':{},                  // empty subdirectory
        'emptyFile.ext': null.         // empty file
        'fromTpl.ext': 'template.ext' // generates fromTpl.ext with 
                                      // template.ext as template
      }
    },
    <command>:{                       // config section for the <command> (for example 'model')
      createFiles: [                  // this files will be generated when 
      {                               // '<command> add' is called
        'name': '{{filename}}.html',  // name of the file
        'dir' :'client/views',        // directory to store file
        'template' : {          
          'names': ["{{filename}}.html", "view.html"], // look for these templates in the template dir
                                                       // pick the first that matchs
          'dir'  : ''                 // subdirectory in template dir (not implemented yet)!
        },
      },
      {
       ... (nextFile)
      }],
      addToFiles:[                    // this adds code snippets to 
      {
        'file' : 'router.js',         // this file
        'dir'  : 'client/lib/meteor', // in this directory
        'mark' : '//ABEE:ADDROUTE',   // above this mark 
        'template' : {
          'names' : ["{{name}}Route.js", "route.js"], //here are the snippets templates
          'dir' : ''                  // subdirectory in template dir (not implemented yet)!
        }
      },
      {
        ... (nextSnippet)
      }]
    },
    <nextcommand>:{
      ...
    }

Templates
---------
*hint: when you create an handlebars template for meteor with handlebars in 
Abee you have to escape the handlebars variables in the template like this*

    \{{meteorVariable}}  => {{meteorVariable}}
    \{{meteor{{abeeVariable}}Variable}} => {{meteorHEREABEEINSERTEDVariable}}
    
<table>
<tr><th>command</th><th colspan="2">config vars</th><th colspan="2">template vars</th></tr>
<tr>
 <th>create</th>
 <td></td><td></td>
 <td>{{appName}}</td><td>name of your app</td>
</tr>

<tr>
 <th rowspan="4">model</th>
 <td rowspan="4">{{filename}}</td><td rowspan="4">name of the model</td>
 <td>{{Model}}</td><td>capitalized name of your model</td>
 </td>
</tr>
<tr><td>{{model}}</td><td>name of your model in lowercase</td></tr>
<tr><td>{{attr}}</td><td>attributes of the model <br>{{name}} (lowercase) and <br>{{Name}} (capitalized) available</td></tr>
<tr><td>{{collection}}</td><td>name of the collection <br>(equal to '{{Model}}Collection')</td></tr>

<tr>
 <th rowspan="3">route</th>
 <td rowspan="3">{{name}}</td><td rowspan="3">name of the route</td>
 <td>{{name}}</td><td>name of the route</td>
 </td>
</tr>
<tr><td>{{path}}</td><td>path that is routed</td></tr>
<tr><td>{{template}}</td><td>template to render</td></tr>

<tr>
 <th rowspan="2">template</th>
 <td>{{filename}}</td><td>name of the template</td>
 <td rowspan="2">{{view}}</td><td rowspan="2">name of the view</td>
</tr>
<tr><td>{{group}}</td><td>group for the views (when delivered)</td></tr>
</table>

License
------
MIT