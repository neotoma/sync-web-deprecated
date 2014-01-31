var libFiles = [
  'app/library/jquery-1.10.2.js',
  'app/library/handlebars-1.0.0.js',
  'app/library/ember-1.3.2+pre.25108e91.js',
  'app/library/ember-data-1.0.0-beta.6+canary.edbe6165.js',
  'app/library/*.js'
];

var appFiles = [
  'app/prototype.js',
  'app/app-config.js',
  'app/app.js',
  'app/data.js',
  'app/models/*.js', 
  'app/controllers/*.js', 
  'app/views/*.js', 
  'app/routes/*.js',
  'app/helpers/*.js',
  'app/simulations/**/*.js'
];

var styleFiles = [
  'app/styles/*'
];

var templateFiles = [
  'app/templates/*.hbs',
  'app/templates/components/*.hbs'
];

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    clean: {
      dev: [
        'dev/images/',
        'dev/*.css',
        'dev/*.js'
      ],
      deployPre: [
        'public/images/',
        'public/*.css',
        'public/*.js'
      ],
      deployPost: [
        'public/templates.js'
      ]
    },
    ember_handlebars: {
      options: {
        processName: function(fileName) {
          var arr = fileName.split("."),
            path = arr[arr.length - 2].split("/"),
            name = path[path.length - 1],
            isComponents = path.indexOf('components') > -1;
          if(isComponents) {
            return 'components/' + name;
          }
          else {
            return name;
          }
        }
      },
      dev: {
        files: {
          'dev/templates.js': templateFiles
        }
      },
      deploy: {
        files: {
          'public/templates.js': templateFiles
        }
      }
    },
    concat: {
      devLib: {
        src: libFiles,
        dest:'dev/lib.js'
      },
      devApp: {
        src: appFiles,
        dest:'dev/app.js'
      },
      devStyles: {
        src: styleFiles,
        dest: 'dev/app.css'
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**'],
          dest: 'dev/images/'
        }]
      },
      deploy: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**'],
          dest: 'public/images/'
        }]
      }
    },
    uglify: {
      deploy: {
        src: [
          libFiles, 
          appFiles, 
          'public/templates.js'
        ],
        dest: 'public/app.js'
      }
    },
    cssmin: {
      deploy: {
        files: {
          'public/app.css': styleFiles
        }
      }
    },
    connect: {
      dev: {
        options: {
          port: 9090,
          base: 'dev'
        }
      },
      deploy: {
        options: {
          port: 9091,
          base: 'public'
        }
      }
    },
    watch: {
      options: {
        debounceDelay: 100
      },
      scripts: {
        files: [
          appFiles,
          libFiles,
          styleFiles,
          templateFiles
        ],
        tasks: [
          'ember_handlebars:dev', 
          'concat:devLib',
          'concat:devApp',
          'concat:devStyles',
          'copy:dev'
        ]
      },
      images: {
        files: ['app/images/*'],
        tasks: ['clean:dev', 'copy:dev']
      },
      // Hack: doesn't do anything but keep connect server alive
      deploy: {
        files: ['app/images/*'],
        tasks: []
      }
    },
    githubPages: {
      deploy: {
        options: {
          commitMessage: 'Push'
        },
        src: 'public'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-github-pages');

  // Generate files for development
  grunt.registerTask('dev-dry', [
    'clean:dev',
    'ember_handlebars:dev',
    'concat:devLib',
    'concat:devApp',
    'concat:devStyles',
    'copy:dev'
  ]);

  // Run local web server for development
  grunt.registerTask('dev', [
    'dev-dry', 
    'connect:dev', 
    'watch'
  ]);

  // Generate files for deployment
  grunt.registerTask('deploy-dry', [
    'clean:deployPre', 
    'ember_handlebars:deploy',
    'copy:deploy',
    'uglify:deploy',
    'cssmin:deploy',
    'copy:deploy',
    'clean:deployPost'
  ]);

  // Run local web server for pre-deployment testing
  grunt.registerTask('deploy-test', [
    'deploy-dry',
    'connect:deploy',
    'watch:deploy'
  ]);

  // Deploy to GitHub Pages
  grunt.registerTask('deploy', [
    'deploy-dry',
    'githubPages:deploy'
  ]);
};