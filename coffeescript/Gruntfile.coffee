module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    handlebars_path: 'templates/*.html'
    handlebars:
      compile:
        options:
          namespace: 'ib.Templates'
          processName: (filename) ->
            pieces = filename.split('/')
            pieces[pieces.length - 1]
        files:
          'source/js/Templates.min.js': ['<%= handlebars_path %>']
    sass_dir: 'sass'
    compass:
      build:
        options:
          sassDir: '<%= sass_dir %>'
          cssDir: 'source/css'
          environment: 'production'
          specify: 'sass/styles.min.sass'
          outputStyle: 'compressed'
    coffee:
      compile:
        files: [
          expand: true,
          cwd: 'source/coffee'
          src: ['**/*.coffee']
          dest: 'source/js'
          ext: '.js'
        ]
    watch:
      handlebars:
        files: ['<%= handlebars_path %>']
        tasks: 'handlebars'
      compass:
        files: ['<%= sass_dir %>/**/*.sass']
        tasks: 'compass'
      css:
        files: ['source/css/*.css']
        options:
          livereload: true
      coffee:
        files: ['source/coffee/**/*.coffee']
        tasks: 'coffee'
    concat:
      options:
        separator: ';'
      build:
        src: [
          'source/lib/console-polyfill/index.js'
          'source/lib/handlebars/handlebars.js'
          'source/lib/jquery.easing/jquery.easing.min.js'
          'source/lib/raf.js/raf.js'
          'source/js/Templates.min.js'
          'source/js/common/ComponentLoader.js'
          'source/js/controllers/Main.js'
          'source/js/components/ComponentExample.js'
          'source/js/Bootstrap.js'
        ]
        dest: 'source/js/scripts.js'
    uglify:
      options:
        preserveComments: 'some'
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      build:
        files:
          'source/js/scripts.min.js': ['<%= concat.build.dest %>']
    clean:
      build:
        src: ['<%= concat.build.dest %>']
      deploy:
        options:
          force: true
        src: ['deploy/**']
    copy:
      deploy:
        files: [
          expand: true
          cwd: 'source/'
          src: ['**']
          dest: 'deploy/'
        ]
    "string-replace":
      deploy:
        files:
          'deploy/index.html': 'deploy/index.html'
        options:
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
    bower:
      install:
        options:
          targetDir: 'source/lib'

  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-string-replace'
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-bower-task'

  grunt.registerTask('install', ['bower:install'])
  grunt.registerTask('default', ['install', 'compass', 'handlebars', 'coffee', 'concat', 'uglify', 'clean:build'])
  grunt.registerTask('deploy', ['default', 'clean:deploy', 'copy:deploy', 'string-replace'])
