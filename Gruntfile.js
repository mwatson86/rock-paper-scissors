module.exports = function(grunt) {

    require('time-grunt')(grunt);

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		meta: {
			dev: {
				sassDir: 'app/assets/scss',
				scriptsDir: 'app/assets/scripts',
			},
			prod: {
                imagesDir: 'public/assets/images',
				cssDir: 'public/assets/stylesheets', 
				scriptsDir: 'public/assets/scripts'
            }
		},
		
	    bowercopy: {
	        options: {
				clean:true
	        },
	        dist: {
				options: {
					destPrefix: '<%= meta.dev.scriptsDir %>/vendor'
				},
				files: {
					'jquery.js': 'bower_components/jquery/dist/jquery.js',
					'modernizr.js': 'bower_components/modernizr/modernizr.js',
				}
	        }
	    },
		
		jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: [
	    		'Gruntfile.js', 
	    		'<%= meta.dev.scriptsDir %>/**/*.js', 
	    		'!<%= meta.dev.scriptsDir %>/vendor/**/*.js'
	    	]
		},

        concat: {
          options: {
            separator: ';'
          },
          dist: {
            src: [
                '<%= meta.dev.scriptsDir %>/vendor/*.js',
                '<%= meta.dev.scriptsDir %>/*.js'
            ],
            dest: '<%= meta.prod.scriptsDir %>/script.js'
          }
        },

        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
          },
          dist: {
            files: { 
              '<%= meta.prod.scriptsDir %>/script.min.js': ['<%= meta.prod.scriptsDir %>/script.js'],
            }
          }
        },

		jasmine: {
		    dist: {
                src: '<%= meta.dev.scriptsDir %>/*.js',
                options: {
                    specs: '<%= meta.dev.scriptsDir %>/unit-tests/*.js',
                    vendor: '<%= meta.dev.scriptsDir %>/vendor/*.js'
                }
            }
		},

		compass: {
            options: {
                require: ['susy', 'breakpoint'],
                imagesDir: '<%= meta.prod.imagesDir %>',
                sassDir: '<%= meta.dev.sassDir %>',
                cssDir: '<%= meta.prod.cssDir %>',
                force: true
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: true
                }
            },
            prod: {
                options: {
                    outputStyle: 'compressed'
                }
            },
            clean: {
                options: {
                    clean: true
                }
            }
		},

		watch: {
			options: {
		      	livereload: true
		    },
			css: {
			 	files: ['<%= meta.dev.sassDir %>/**/*.scss'],
				tasks: ['styles']
			},
			scripts: {
				files: ['Gruntfile.js', '<%= meta.dev.scriptsDir %>/**/*.js'],
				tasks: ['javascript']
			}
		}
	});

	// Task to be run at the beginning of a project
	grunt.registerTask('start', [], function(){

        grunt.loadNpmTasks('grunt-bowercopy');

        grunt.task.run(
            'bowercopy:dist',
            'javascript',
            'styles'
        );
    });

    // Default watch task
	grunt.registerTask('default', [], function(){

        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.task.run(
            'watch'
        );
    });

    // Styles task
    grunt.registerTask('styles', [], function(){

        grunt.loadNpmTasks('grunt-contrib-compass');

        grunt.task.run(
            'compass:dev'
        );
    });

    // Javascript task
	grunt.registerTask('javascript', [], function(){

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');

        grunt.task.run(
            'jshint:dist',
            'jasmine:dist',
            'concat:dist',
            'uglify:dist'
        );
    });

    // Production task
	grunt.registerTask('production', [], function(){

        grunt.loadNpmTasks('grunt-contrib-compass');

        grunt.task.run(
            'compass:prod',
            'javascript'
        );
    });
};