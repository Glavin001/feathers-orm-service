'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        release: {},
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            lib: ['lib/**/*.js', 'Gruntfile.js'],
            test: 'test/**/*.js'
        },
        simplemocha: {
            all: {
                options: {
                    clearRequireCache: true
                },
                src: ['test/**/*.test.js']
            }
        },
        watch: {
            scripts: {
                files: ['lib/**.*.js', 'test/**/*.js', 'Gruntfile.js', '.jshintrc'],
                tasks: ['jshint', 'simplemocha'],
                options: {
                    spawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', 'simplemocha');
    grunt.registerTask('default', ['jshint', 'simplemocha', 'watch']);

};