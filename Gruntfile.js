module.exports = function(grunt) {

  // Modules
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('bootcamp');

  // Grunt Tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      dist: {
        src: [
          // Decoder
          'src/decode/helpers/_throw.scss',
          'src/decode/helpers/_consume.scss',
          'src/decode/helpers/_trim.scss',
          'src/decode/types/_string.scss',
          'src/decode/types/_bool.scss',
          'src/decode/types/_null.scss',
          'src/decode/types/_number.scss',
          'src/decode/helpers/_value.scss',
          'src/decode/types/_list.scss',
          'src/decode/types/_map.scss',
          'src/decode/api/_json.scss',

          // Encoder
          'src/encode/helpers/_quote.scss',
          'src/encode/types/_bool.scss',
          'src/encode/types/_color.scss',
          'src/encode/types/_list.scss',
          'src/encode/types/_map.scss',
          'src/encode/types/_number.scss',
          'src/encode/types/_string.scss',
          'src/encode/types/_null.scss',
          'src/encode/mixins/_json.scss',
          'src/encode/api/_json.scss'
        ],
        dest: 'dist/_<%= pkg.name %>.scss',
      },
    },

    // Sass
    sass: {
      test: {
        options: {
          style: 'expanded',
          quiet: 'true',
          loadPath: './node_modules/bootcamp/dist' // or './bower_components/bootcamp/dist'
        },
        files: {
          './tmp/results.css': './test/test.scss'
        }
      }
    },

    // Bootcamp
    bootcamp: {
      test: {
        files: {
          src: ['./tmp/results.css']
        }
      }
    },

    // Watch
    watch: {
      dist: {
        files: [
                './test/**/*.scss',
                './src/**/*.scss'
                ],
        tasks: ['test']
      }
    }
  });

  // Tasks
  grunt.registerTask('test', ['sass', 'bootcamp']);
  grunt.registerTask('dev', ['test', 'watch']);
  grunt.registerTask('build', ['test', 'concat']);
};