module.exports = {
  name: 'osimvc',
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
    createFiles: [
      {
        'name': '{{filename}}.less',
        'dir' :'client/views',
        'template' : {
          'names': ["{{filename}}.less", "view.less"],
          'dir'  : ''
        },
      }
    ],
  },
  collection: {
    createFiles: [
      {
        'name': '{{filename}}.html',
        'dir' :'client/models',
        'template' : {
          'names': ["page.{{template}}.{{filename}}.html", "{{template}}.page.html", "page.html"],
          'dir'  : ''
        }
      }
    ]
  },
  page: {
    createFiles: [
      {
        'name': 'page.{{filename}}.html',
        'dir' :'client/models',
        'template' : {
          'names': ["page.{{template}}.{{filename}}.html", "{{template}}.page.html", "page.html"],
          'dir'  : ''
        },
      },
      {
        'name': 'page.{{filename}}.js',
        'dir' :'client/controllers',
        'template' : {
          'names': ["page.{{template}}.{{filename}}.js", "{{template}}.page.js", "page.js"],
          'dir'  : ''
        },
      },
      {
        'name': 'page.{{filename}}.less',
        'dir' :'client/views',
        'template' : {
          'names': ["page.{{template}}.{{filename}}.less", "{{template}}.page.less", "page.less"],
          'dir'  : ''
        },
      },
    ],
  }
};
