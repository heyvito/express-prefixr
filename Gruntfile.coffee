module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files:
          'lib/express-prefixr.js': ['src/express-prefixr.coffee']
          'lib/prefixr.js': ['src/prefixr.coffee']
          'public/application.js': ['public/src/application.coffee']
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default', ['coffee']
