module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files:
          'lib/express-prefixr.js': ['src/express-prefixr.coffee']
          'lib/prefixr.js': ['src/prefixr.coffee']
          'lib/at-rules-prefixr.js': ['src/at-rules-prefixr.coffee']
          'lib/property-prefixr.js': ['src/property-prefixr.coffee']
          'lib/value-prefixr.js': ['src/value-prefixr.coffee']
          'public/application.js': ['public/src/application.coffee']
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default', ['coffee']
