module.exports = function(grunt) {

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
        tasks: 'compass',
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
        src: [
          'source/js/libs/concatenated/*.js',
          'source/js/Templates.min.js',
          'source/js/common/*.js',
          'source/js/controllers/*.js',
          'source/js/components/*.js',
          'source/js/Bootstrap.js'
        ],
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

  grunt.registerTask('default', ['compass', 'handlebars', 'concat', 'uglify', 'clean:build']);
  grunt.registerTask('deploy', ['default', 'clean:deploy', 'copy', 'string-replace']);
};
