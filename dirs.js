/*
 * directory structure for the meteor app
 */

exports.dirs = {
	'client':{											// client only
		'css':{}, 										// cascading stylesheets
		'js':{}, 											// thirdparty libraries
		'lib':{  											// gets loaded first
			'helpers':{},  							// client-side helper methods
			'meteor':{	
				'router.js': null,				// client-side routing
				'startup.js': null,				// run on new client init
				//'subscriptions.js': null,	// Subscribe to data
				'subscriptions': {},	// Subscribe to data
			}, 
		},
		'views':{}, 									// templates / filled with mts 
	},
	'lib':{													// gets loaded first
		'helpers':{},									// client AND server helpers
		'models':{										// models  
			//'init.js': null 						// instantiate collections
		},
	},
	'packages':{},									// smart packages from atmosphere 
	'private':{},										// privates assets like email-templates
	'public':{											// public assets
		'img':{},
		'fonts':{},
		'js':{},
	},
	'server':{											// serverside code
		'api':{},											// REST API
		'config':{
			'accounts.js': null, 				// Accounts.config(), etc.
			'users.js': null		 				// Accounts.onCreateUser(), etc.
		},	
		'helpers':{},									// Server-side helper functions
		'lib':{ 											// What should get loaded first
			'settings.js': null,				// Load into Meteor.settings
			'packages.js': null,				// Instantiate your NPM modules
			'startup.js': null					// Run on server startup
		},			
		'models':{},									// Server-only Meteor.methods
		'publish':{}, 								// Individual files for the type of data
		'permissions':{},
	},
	'tests':{}
};
/*
 * important directories and files 
 */
exports.views	 		    = 'client/views';
exports.routes			  = 'client/lib/meteor/router.js';
exports.subscriptions = 'client/lib/meteor/subscriptions';
exports.publish 		  = 'server/publish';
exports.permissions   = 'server/permissions';
exports.models			  = 'lib/models';

