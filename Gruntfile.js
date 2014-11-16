module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    index_file: 'app/index.html',
    lib_files: [
      'bower_components/*'
    ],
    app_source_files: [
      'app/**/*.js'
    ],
    app_build_files: [
      'build/lib.js',
      'build/**/*.js'
    ],
    style_source_files: [
      'app/styles/imports.less',
      'app/styles/reset.less',
      'app/styles/breakpoints.less',
      'app/styles/**/*'
    ],
    style_build_files: [
      'build/lib.css'
    ],
    template_files: [
      'app/templates/**/*.hbs'
    ],
    images_dir: 'app/images',
    image_files: [
      '<%= images_dir %>/**/*'
    ],
    watch_files: [
      '<%= index_file %>',
      '<%= lib_files %>',
      '<%= app_source_files %>',
      '<%= style_source_files %>',
      '<%= template_files %>',
      '<%= image_files %>'
    ],
    clean: {
      pre: [
        'public/*',
        '!.git'
      ],
      post: [
        'build'
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
          } else {
            return name;
          }
        }
      },
      all: {
        files: {
          'build/templates.js': '<%= template_files %>'
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'build/lib.js',
        cssDest: 'build/lib.css'
      }
    },
    'string-replace': {
      env_vars: {
        files: {
          'build/' : '<%= app_source_files %>' 
        },
        options: {
          replacements: [{
            pattern: /env\.(\w+)/g,
            replacement: function (match, p1) {
              var value = process.env[p1];

              if (!value) {
                return null;
              } else if (['true', 'false', 'null'].indexOf(value) != -1) {
                return value;
              } else {
                return "'" + value + "'";
              }
            }
          }]
        }
      }
    },
    concat: {
      dev: {
        src: '<%= app_build_files %>',
        dest: 'public/app.js'
      }
    },
    uglify: {
      prod: {
        src: '<%= app_build_files %>',
        dest: 'public/app.js'
      }
    },
    copy: {
      index: {
        files: [{
          src: '<%= index_file %>',
          dest: 'public/index.html'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= images_dir %>',
          src: ['**'],
          dest: 'public/images/'
        }]
      }
    },
    less: {
      dev: {
        files: {
          'public/app.css': [
            '<%= style_source_files %>',
            '<%= style_build_files %>'
          ]
        },
        options: {
          cleancss: false
        }
      },
      prod: {
        files: {
          'public/app.css': [
            '<%= style_source_files %>',
            '<%= style_build_files %>'
          ]
        },
        options: {
          cleancss: true,
          compress: true,
          strictImports: true,
          strictMath: true,
          strictUnits: true
        }
      }
    },
    connect: {
      all: {
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
      dev: {
        files: '<%= watch_files %>',
        tasks: ['dev-build']
      },
      prod: {
        files: '<%= watch_files %>',
        tasks: ['prod-build']
      }
    },
    githubPages: {
      deploy: {
        options: {
          commitMessage: 'Merge latest from master'
        },
        src: 'public'
      }
    }
  });

  require('load-grunt-tasks')(grunt)

  // Build app for development
  grunt.registerTask('dev-build', [
    'clean:pre',
    'bower_concat',
    'ember_handlebars',
    'string-replace',
    'concat:dev',
    'less:dev',
    'copy',
    'clean:post'
  ]);

  // Build app and run local web server for development
  grunt.registerTask('dev', [
    'dev-build', 
    'connect', 
    'watch:dev'
  ]);

  // Build app for production
  grunt.registerTask('prod-build', [
    'clean:pre', 
    'bower_concat',
    'ember_handlebars',
    'string-replace',
    'uglify:prod',
    'less:prod',
    'copy',
    'clean:post'
  ]);

  // Build app and run local web server for production
  grunt.registerTask('prod', [
    'prod-build',
    'connect',
    'watch:prod'
  ]);

  // Deploy production build to GitHub Pages
  grunt.registerTask('deploy', [
    'prod-build',
    'githubPages:deploy'
  ]);
};