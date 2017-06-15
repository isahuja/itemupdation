module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        sass: {
            dist: {
                files: {
                    'dist/css/style.css': 'src/css/style.scss'
                }
            }
        },
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //     },
        //     dist: {
        //         files: {
        //             'dist/js/tasks.min.js': 'src/js/tasks.js'
        //         }
        //     }
        // },

        watch: {
            options: {
                livereload: true,
            },
            scss: {
                files: ['src/css/**/*.scss']
            },
            js: {
                files: ['src/js/**/*.js'],
            },
            html: {
                files: ['*.html'],
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: '0.0.0.0',
                    protocol: 'http',
                    livereload: true,
                    open: true,
                }
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', [ 'sass', 'connect', 'watch']);

};
