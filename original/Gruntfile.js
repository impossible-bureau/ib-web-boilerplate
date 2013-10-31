module.exports = function(grunt) {
  var scriptLinkWarning = '\n<!--\n***\nGenerated script links: You must edit the list in the Gruntfile or your changes will be overwritten.\n***\n-->';
  var concatenatedScriptSources = [
    'source/lib/console-polyfill/index.js',
    'source/lib/handlebars/handlebars.js',
    'source/lib/jquery.easing/jquery.easing.min.js',
    'source/lib/raf.js/raf.js',
    'source/js/Templates.min.js',
    'source/js/common/ComponentLoader.js',
    'source/js/controllers/Main.js',
    'source/js/components/ComponentExample.js',
    // Bootstrap must come last.
    'source/js/Bootstrap.js'
  ];
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars_path: 'templates/*.html',
    handlebars: {
      compile: {
        options: {
          namespace: 'ib.Templates',
          processName: function(filename) {
            var pieces = filename.split('/');
            return pieces[pieces.length - 1];
          }
        },
        files: {
          'source/js/Templates.min.js': ['<%= handlebars_path %>']
        }
      }
    },
    sass_dir: 'sass',
    compass: {
      build: {
        options: {
          sassDir: '<%= sass_dir %>',
          cssDir: 'source/css',
          environment: 'production',
          specify: 'sass/styles.min.sass',
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      handlebars: {
        files: ['<%= handlebars_path %>'],
        tasks: 'handlebars'
      },
      compass: {
        files: ['<%= sass_dir %>/**/*.sass'],
        tasks: 'compass'
      },
      css: {
          files: ['source/css/*.css'],
          options: {
              livereload: true
          }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: concatenatedScriptSources,
        dest: 'source/js/scripts.js'
      }
    },
    uglify: {
      options: {
        preserveComments: 'some',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: {
          'source/js/scripts.min.js': ['<%= concat.build.dest %>']
        }
      }
    },
    clean: {
      build: {
        src: ['<%= concat.build.dest %>']
      },
      deploy: {
        options: {
          force: true
        },
        src: ['deploy/**']
      }
    },
    copy: {
      deploy: {
        files: [
          {expand: true, cwd: 'source/', src: ['**'], dest: 'deploy/'}
        ]
      }
    },
    "string-replace": {
      build: {
        files: {
          'source/index.html': 'source/index.html'
        },
        options: {
          replacements: [
            {
              pattern: /<!-- DEV_ONLY -->[\s\S]*<!-- END_DEV_ONLY -->/,
              replacement: function() {
                var sources = '';
                var src = '';
                for (var i in concatenatedScriptSources) {
                  src = concatenatedScriptSources[i].replace('source', '');
                  sources += '\n  <script type="text/javascript" src="' + src + '"></script>';
                }
                return '<!-- DEV_ONLY -->' + scriptLinkWarning + sources + '\n  <!-- END_DEV_ONLY -->';
              }
            }
          ]
        }
      },
      deploy: {
        files: {
          'deploy/index.html': 'deploy/index.html'
        },
        options: {
          replacements: [
            {
              pattern: /<!-- DEV_ONLY -->[\s\S]*<!-- END_DEV_ONLY -->/,
              replacement: ''
            },
            {
              pattern: /<!-- PROD_ONLY --><!-- (.*) --><!-- END_PROD_ONLY -->/,
              replacement: '$1'
            }
          ]
        }
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'source/lib',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('install', ['bower:install']);
  grunt.registerTask('updatebase', ['string-replace:build']);
  grunt.registerTask('default', ['install', 'compass', 'handlebars', 'concat', 'uglify', 'clean:build', 'string-replace:build']);
  grunt.registerTask('deploy', ['default', 'clean:deploy', 'copy', 'string-replace:deploy']);
};
