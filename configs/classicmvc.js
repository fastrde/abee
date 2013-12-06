module.exports = {
  name: 'classicmvc',                // name of the configuration
  structure : {
    'client':{                       // client only
      'css':{},                      // cascading stylesheets
      'js':{},                       // thirdparty libraries
      'lib':{                        // gets loaded first
        'helpers':{},                // client-side helper methods
        'meteor':{  
          'router.js': "router.js",  // client-side routing
          'startup.js': null,        // run on new client init
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
      },
    },
    'packages':{},                   // smart packages from atmosphere 
    'private':{},                    // privates assets like email-templates
    'public':{                       // public assets
      'img':{},
      'fonts':{},
      'js':{},
    },
    'server':{                       // serverside code
      'api':{},                      // REST API
      'config':{
        'accounts.js': null,         // Accounts.config(), etc.
        'users.js': null             // Accounts.onCreateUser(), etc.
      },  
      'helpers':{},                  // Server-side helper functions
      'lib':{                        // What should get loaded first
        'settings.js': null,         // Load into Meteor.settings
        'packages.js': null,         // Instantiate your NPM modules
        'startup.js': null           // Run on server startup
      },      
      'models':{},                   // Server-only Meteor.methods
      'publications':{},             // Individual files for the type of data
      'permissions':{},
    },
    'test':{}
  },
  view: {  
    createFiles: [
      { 
        'name': '{{filename}}.html',
        'dir' :'client/views',
        'template' : {
          'names': ["{{filename}}.html", "view.html"],
          'dir'  : 'views'
        },
      },
      {
        'name': '{{filename}}.js',
        'dir' :'client/views',
        'template' : {
          'names': ["{{filename}}.js", "view.js"],
          'dir'  : ''
        },        
      }
    ], 
  },
  collection: {
  	createFiles: [
      { 
        'name': '{{filename}}Model.js',
        'dir' :'lib/models',
        'template' : {
          'names': ["{{filename}}Model.js", "model.js"],
          'dir'  : ''
        },
      },
      { 
        'name': '{{filename}}Subscription.js',
        'dir' :'client/lib/meteor/subscriptions',
        'template' : {
          'names': ["{{filename}}Subscription.js", "subscription.js"],
          'dir'  : ''
        },
      },
      { 
        'name': '{{filename}}Publish.js',
        'dir' :'server/publications',
        'template' : {
          'names': ["{{filename}}Publish.js", "publish.js"],
          'dir'  : ''
        },
      },
      { 
        'name': '{{filename}}Permissions.js',
        'dir' :'server/permissions',
        'template' : {
          'names': ["{{filename}}Permissions.js", "permissions.js"],
          'dir'  : ''
        },
      },
  	]
  },
  route: { 
    addToFiles:[
      {
        'file' : 'router.js',
        'mark' : '//ABEE:ADDROUTE',
        'dir'  : 'client/lib/meteor',
        'template' : {
          'names' : ["{{name}}Route.js", "route.js"],
          'dir' : ''
        }
      }
    ]
  },
  make:{
    createFiles: [
      { 
        'name': '{{filename}}',
        'dir' :'',
        'template' : {
          'names': ["make{{filename}}.js", "make.js"],
          'dir'  : ''
        }
      }
    ]   
  }
};
