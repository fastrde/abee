exports.config = {
  structure : {
    'client':{                       // client only
      'css':{},                      // cascading stylesheets
      'js':{},                       // thirdparty libraries
      'lib':{                        // gets loaded first
        'helpers':{},                // client-side helper methods
        'meteor':{  
          'router.js': null,         // client-side routing
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
      'publish':{},                  // Individual files for the type of data
      'permissions':{},
    },
    'tests':{}
  },
  dirs: {
    subscriptions: 'client/lib/meteor/subscriptions',
    publications:  'server/publications',
    permission: 'server/permissions',
    models: 'lib/models'
  },
  files: {
    routes : 'client/lib/meteor/router.js',
  },
  view: {
    files: [
      { 
        'name': '{{filename}}.html',
        'dir' :'client/views',
        'template' : {
          'names': ["{{filename}}.html", "view.html"],
          'dir'  : ''
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
  } 
 
};
