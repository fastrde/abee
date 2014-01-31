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
        'accounts.{{ext}}': null,         // Accounts.config(), etc.
        'users.{{ext}}': null             // Accounts.onCreateUser(), etc.
      },  
      'helpers':{},                  // Server-side helper functions
      'lib':{                        // What should get loaded first
        'settings.{{ext}}': null,         // Load into Meteor.settings
        'packages.{{ext}}': null,         // Instantiate your NPM modules
        'startup.{{ext}}': null           // Run on server startup
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
        'name': '\{{filename}}.html',
        'dir' :'client/views',
        'template' : {
          'names': ["\{{filename}}.html", "view.html"],
          'dir'  : 'views'
        },
      },
      {
        'name': '\{{filename}}.{{ext}}',
        'dir' :'client/views',
        'template' : {
          'names': ["\{{filename}}.{{ext}}", "view.{{ext}}"],
          'dir'  : ''
        },        
      }
    ], 
  },
  collection: {
  	createFiles: [
      { 
        'name': '\{{filename}}Model.{{ext}}',
        'dir' :'lib/models',
        'template' : {
          'names': ["\{{filename}}Model.{{ext}}", "model.{{ext}}"],
          'dir'  : ''
        },
      },
      { 
        'name': '\{{filename}}Subscription.{{ext}}',
        'dir' :'client/lib/meteor/subscriptions',
        'template' : {
          'names': ["\{{filename}}Subscription.{{ext}}", "subscription.{{ext}}"],
          'dir'  : ''
        },
      },
      { 
        'name': '\{{filename}}Publish.{{ext}}',
        'dir' :'server/publications',
        'template' : {
          'names': ["\{{filename}}Publish.{{ext}}", "publish.{{ext}}"],
          'dir'  : ''
        },
      },
      { 
        'name': '\{{filename}}Permissions.{{ext}}',
        'dir' :'server/permissions',
        'template' : {
          'names': ["\{{filename}}Permissions.{{ext}}", "permissions.{{ext}}"],
          'dir'  : ''
        },
      },
  	]
  },
  route: { 
    addToFiles:[
      {
        'file' : 'router.{{ext}}',
        'mark' : '{{comment}}ABEE:ADDROUTE',
        'dir'  : 'client/lib/meteor',
        'template' : {
          'names' : ["\{{name}}Route.{{ext}}", "route.{{ext}}"],
          'dir' : ''
        }
      }
    ]
  }
};
