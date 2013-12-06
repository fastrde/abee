module.exports = {
	structure : {
		'client' : {
			'views' : {},
			'models' : {},
			'controllers' : {
				'helpers' : {},
				'core' : {}
			},
			'app.layout.html' : null,
			'app.router.js' : null,
			'app.startup.js' : null
		},
		'lib' : {
			'helpers' : {},
			'collections' : {},
			'schemas' : {}
		},
		'packages' : {},
		'private' : {},
		'public' : {
			'img' : {},
			'fonts' : {},
			'js' : {}
		},
		'server' : {
			'api' : {},
			'helpers' : {},
			'methods' : {},
			'publications' : {},
			'permissions' : {},
			'initialization' : {
				'accounts.js' : null,
				'users.js' : null
			},
			'config.accounts.js' : null,
			'config.users.js' : null,
			'app.settings.js' : null,
			'app.packages.js' : null,
			'app.startup.js' : null
		},
		'tests' : {}
	},
  view: {
    files: [
      { 
        'name': '{{filename}}.less',
        'dir' :'client/views',
        'template' : {
          'names': ["{{filename}}.less", "view.less"],
          'dir'  : ''
        },
      }
    ], 
  } 
};

