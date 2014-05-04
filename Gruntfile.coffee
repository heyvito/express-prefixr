module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files:
          'lib/css_document.js': ['src/css_document.coffee']
          'lib/css_rule.js': ['src/css_rule.coffee']
          'lib/declaration.js': ['src/declaration.coffee']
          'lib/declaration_list.js': ['src/declaration_list.coffee']
          'lib/declaration_value.js': ['src/declaration_value.coffee']
          'lib/declaration_value_list.js': ['src/declaration_value_list.coffee']
          'lib/express_prefixr.js': ['src/express_prefixr.coffee']
          'lib/vendoring_rules.js': ['src/vendoring_rules.coffee']
          'lib/parsing_exception.js': ['src/parsing_exception.coffee']
          'public/application.js': ['public/src/application.coffee']
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default', ['coffee']
