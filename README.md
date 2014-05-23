Abee v0.6.5
============================

Abee is a meteor scaffolding application that allows you to use your own (or the build-in) design patterns to build a great meteor app in less time. In Version 0.6.3 it supports now Javascript and Coffeescript as scripting languages.

Abee

- creates your app and builds a "best practice" directory structure that you can choose from different configurations. 
- extends your existing meteor app.
- uses **Handlebars**, so you don't have to learn new stuff.
- adds/removes *customizable* views/templates to/from your app.
- adds/removes *template based* models/collections, client-subscriptions and server-publications.
- generates allow/deny stubs for your collections.
- adds routes.

**You can configure what is** a model or a view, so Abee produces what you think it should.

Why?
--------

I am to lazy to write the same stuff over and over again. Due to the structure of a meteor-app you have to do this stuff in multiple directories and/or multiple files. So i decided to let a bit of software do that work.

Installation
----------------
You'll need to have Node >= 0.10.0 installed on your system.

To install:

    $ npm install -g abee

To update:

    $ npm update -g abee

Usage
---------

Abee operates in your app-directory (the place where you call `meteor` to start your app). The only exception is `create`, because there is no app-directory before you call `create` ;-).

**usage: abee command [subcommand] [options]**

commands:

#### abeetize
Extends your meteor app with Abees scaffolding capabilities and generate the chosen directory structure in the choosen scripting language.

usage:

    abee abeetize [-p <design-pattern>] [-l <language>] [-d]
    
options:

    -p <design-pattern>: choose a design-pattern to build structure for
                         supported: mvc (Model-View-Controller)
                         default:   mvc
    -l <language>:       choose scripting language
                         supported: js (Javascript), coffee (Coffescript)
                         default:   js
    -d:                  delete meteor standard .html,.js,.css files 
                         and remove insecure und autopublish modules.
    
example:

Extend an App with mvc design-pattern (default). Use Coffeescript.

    abee abeetize -l coffee
    
Extend an App with mvc design-pattern (default). Use Javascript (default). Also delete standard meteor app files and remove insecure and autopublish modules.

    abee abeetize -d

#### collection     
Adds/removes a collection.
    
usage:

    abee collection add <collectionName1> [attr1,...,attrN] <collectionName2> ...
    abee collection remove <collectionName1> ... <collectionNameN>
    
example: 

Adds a collection 'person' with Attributes 'name', 'firstname' and age. Adds another collection 'car' without Attributes.

    abee collection add person [name,firstname,age] car 

Removes the collections 'person' and 'car'

    abee collection remove person car 
    
#### create   
Creates an app like meteor does, but extends it with Abees scaffolding capabilities and generate the chosen directory structure in the choosen scripting language.

usage:

    abee create <appName> [-p <design-pattern>] [-l <language>]
    
options:
    
    -p <design-pattern>: choose a design-pattern to build structure for
                         supported: mvc
                         default:   mvc
    -l <language>:       choose scripting language
                         supported: js (Javascript), coffee (Coffescript)
                         default:   js
    
example:

Create a meteor app called 'myNewApp' and abeetize that app with the mvc design-pattern the Coffeescript scripting language.

    abee create -p mvc -l coffee myNewApp
    

#### help 
Prints the help message. 

usage:

    abee help
    
 


#### template 
Creates a template in the clients template directory.

usage: 

    abee template add <templateName1> ... <templateNameN> [-g <templateGroup>]
    abee template remove <templateName1> ... <templateNameN> [-g <templateGroup>]
    
options:

    -g <templateGroup>: groups the added views in the directory <templateGroup>
                        or deletes the specified views in the directory <templateGroup>
    
example:

    abee template add student employee -g persons
    abee template add car 
    abee template remove student -g persons

#### route   
Creates a route.

usage: 
        
    abee route add [<name1>,]<path1>[,<template1>] ... [<nameN>,]<pathN>[,<templateN>]
    
example: 

    abee route add myHome,/home,firstPage
    abee route add /home
    
'abee route remove' is not supported at the moment.
 

inside Abee
-----------------
### Directory structure
the abee directory looks like this

    -- abee             
     |-- cmds               // commands that added here where automaticaly load by Abee
     | |-- collection.js   
     | |-- config.js       // NOT ACTIVE
     | |-- create.js
     | |-- page.js         // NOT ACTIVE 
     | |-- route.js
     | |-- template.js
     |
     |-- configs            // this folder holds the configurations for the design-patterns
     | |-- languages        // configs for scripting languages
     | | |-- coffee
     | | | |-- overwrites
     | | | | |-- <pattern-overwrites> 
     | | | |-- coffee.js      // coffeescript configuration
     | | |
     | | |-- js
     | |   |-- overwrites
     | |   | |-- <pattern-overwrites> 
     | |   |-- js.js          // jacascript configuration
     | |
     | |-- patterns         // design-patterns
     |   |-- mvc.js         // Model View Controller Pattern
     |   |-- osimvc.js      // NOT ACTIVE SUPPORTED AT THE MOMENT
     | 
     |-- lib                // core libaries and helper functions
     | |-- abee.js   
     | |-- cmdhelper.js
     | |-- colors.js
     | |-- config.js
     | |-- fshelper.js
     | |-- helper.js
     | |-- tplhelper.js
     |
     |-- templates           // here is the directory to store the templates for different 
     | |-- mvc               // design-patterns. First Abee looks for the templates specified 
     | | |-- coffee
     | | | |-- <template files>
     | | |  
     | | |-- js
     | |   |-- <template files>
     | |
     | |-- osimvc
     |   |-- coffee
     |   | |-- <template files>
     |   |      
     |   |-- js
     |     |-- <template files>
     |
     |-- abee                // the command-line interface
     |-- changelog.md        // 
     |-- LICENSE             // license file
     |-- package.json        // npm description
     |-- README.md           // this file
 
 
You can add a '.abee' folder to your home directory following the same structure the 'configs'-folder has.
The files created in this directory overlay the general config files. 
 

     
### Design pattern config


    pattern: 'mvc',                   // name of the configuration 
                                      // (same as filename without .js)
    language: '{{templateSubFolder}}' // get set via language configuraion
    structure:{                       // the file and directory structure
      'emptyDir':{},                  // empty directory
      'dir':{                         // directory
        'subdir':{},                  // empty subdirectory
        'emptyFile.{{ext}}': null.        // empty file
        'fromTpl.{{ext}}': 'template.{{ext}}' // generates fromTpl.ext with 
                                      // template.ext as template
      }
    },
    <command>:{                       // config section for the <command> (for example 'model')
      createFiles: [                  // this files will be generated when 
      {                               // '<command> add' is called
        'name': '\{{filename}}.html',  // name of the file
        'dir' :'client/views',        // directory to store file
        'template' : {          
          'names': ["\{{filename}}.html", "view.html"], // look for these templates in the template dir
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
          'names' : ["\{{name}}Route.js", "route.js"], //here are the snippets templates
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

### Language-specific overwrites
you can overwrite parts of the general design pattern by placing a file in the 'overwrites'-folder of the language with the name of the design-pattern.
For example, when you want to overwrite some parts in the design pattern when you the mvc pattern with the coffeescript language, then place a file named 'mvc.js' in the directory 'configs/languages/coffee/overwrites/'.
Basically the file looks the same a design pattern does.
The overwriting follow these rules:

- if the string/object not exist -> create
- if the string exists -> overwrite
- if the object exists -> merge attributes
- if the object exists and the object in the overwrite file has 'OVERWRITE' : 'yes' -> overwrite this object completly

#### An Example
The Design Pattern ...

    module.exports = {
      pattern: 'mvc',                       // name of the Design-Pattern
      language: '{{templateSubFolder}}', // Template-Directory  
      structure : {
        'client':{                       // client only
          'css':{},                      // cascading stylesheets
          'js':{},                       // thirdparty libraries
          'lib':{                        // gets loaded first
            'helpers':{},                // client-side helper methods
            'meteor':{  
              'router.{{ext}}': "router.{{ext}}",  // client-side routing
              'startup.{{ext}}': null,        // run on new client init
              'subscriptions': {},       // Subscribe to data
            }, 
          },
          'views':{                      // templates
            'index.html': "index.html"   // start-webpage / layout
          },                    
        },
        'lib':{                          // gets loaded first
          'helpers':{},                  // client AND server helpers
          'models':{                     // models  
          }
        }
      }
    }
    
... and the overwrite file ...

    module.exports = {
      myimportantchange: 'test',         // add new entry 
      structure : {
        'newfolder': {},                 // add new entry
        'client':{                      
          'lib':{
            'OVERWRITE' : 'yes',         // delete the lib section in original config and add this section
            'newfolder' : {}             
          },
          'views':{                      
            'index.html': "home.html"    // alter entry              
          }
        }
      }
    };

... get merged to

    module.exports = {
      pattern: 'mvc',                    
      myimportantchange: 'test',
      language: '{{templateSubFolder}}', 
      structure : {
        'newfolder': {},
        'client':{                       
          'css':{},                      
          'js':{},                       
          'lib':{                        
            'newfolder' : {} 
          },
          'views':{                      
            'index.html': "home.html"    
          },                    
        },
        'lib':{                          
          'helpers':{},                  
          'models':{                     
          }
        }
      }
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