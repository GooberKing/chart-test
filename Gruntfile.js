module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    concat: {
      dist: {
        src: [
          'app/services/services.module.js',
          'app/chart/chart.module.js',
          'app/app.module.js',
          'app/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      assets: {expand: true, src: ['**'], cwd: 'app/assets', dest: 'dist/assets'},
      index: {expand: true, src: ['index.html'], cwd: 'app/', dest: 'dist', options: {
          process: function(content) {
            var regEx = new RegExp('<script src="[^.][^]*"><\/script>', 'gm');
            return content.replace(regEx, '<script src="chart-test.min.js"></script>');
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy']);

};