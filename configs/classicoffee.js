module.exports = {
  name: 'classicoffee',                // name of the configuration
  structure : {
    'client':{                       // client only
      'css':{},                      // cascading stylesheets
      'js':{},                       // thirdparty libraries
      'lib':{                        // gets loaded first
        'helpers':{},                // client-side helper methods
        'meteor':{
          'router.coffee': "router.coffee",  // client-side routing
          'startup.coffee': null,        // run on new client init
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
        'accounts.coffee': null,         // Accounts.config(), etc.
        'users.coffee': null             // Accounts.onCreateUser(), etc.
      },
      'helpers':{},                  // Server-side helper functions
      'lib':{                        // What should get loaded first
        'settings.coffee': null,         // Load into Meteor.settings
        'packages.coffee': null,         // Instantiate your NPM modules
        'startup.coffee': null           // Run on server startup
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
        'name': '{{filename}}.coffee',
        'dir' :'client/views',
        'template' : {
          'names': ["{{filename}}.coffee", "view.coffee"],
          'dir'  : ''
        },
      }
    ],
  },
  collection: {
  	createFiles: [
      {
        'name': '{{filename}}Model.coffee',
        'dir' :'lib/models',
        'template' : {
          'names': ["{{filename}}Model.coffee", "model.coffee"],
          'dir'  : ''
        },
      },
      {
        'name': '{{filename}}Subscription.coffee',
        'dir' :'client/lib/meteor/subscriptions',
        'template' : {
          'names': ["{{filename}}Subscription.coffee", "subscription.coffee"],
          'dir'  : ''
        },
      },
      {
        'name': '{{filename}}Publish.coffee',
        'dir' :'server/publications',
        'template' : {
          'names': ["{{filename}}Publish.coffee", "publish.coffee"],
          'dir'  : ''
        },
      },
      {
        'name': '{{filename}}Permissions.coffee',
        'dir' :'server/permissions',
        'template' : {
          'names': ["{{filename}}Permissions.coffee", "permissions.coffee"],
          'dir'  : ''
        },
      },
  	]
  },
  route: {
    addToFiles:[
      {
        'file' : 'router.coffee',
        'mark' : '  #ABEE:ADDROUTE',
        'dir'  : 'client/lib/meteor',
        'template' : {
          'names' : ["{{name}}Route.coffee", "route.coffee"],
          'dir' : ''
        }
      }
    ]
  }
};
