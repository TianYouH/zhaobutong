module.exports = function (grunt) {

    // 注意：加载插件之前一定要先安装插件

    // 加载concat插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 加载uglify插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 加载watch插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 加载cssmin插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 加载htmlmin插件
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // 加载copy插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 加载clean插件
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 加载compress插件
    grunt.loadNpmTasks('grunt-contrib-compress');


    // 配置任务
    grunt.initConfig({

        // 获取配置信息对象
        pkg: grunt.file.readJSON('package.json'),

        // 连接文件任务
        concat: {
            // 连接文件的选项
            options: {
                // separator: '/*一堆分号*/',//会插入文件之间
                banner: '/*! <%= pkg.description %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },

            // 具体的连接动作
            dist: {
                // 要连接的文件列表
                src: ["jquery/jquery.js", "jquery/jquery.fullscreen.js", 'js/FullScreen.js', 'js/SecondManager.js', "js/Label.js", "js/Differences.js", "js/Scene.js", "js/StartScene.js", "js/GameScene.js", "js/TimeoutScene.js", "js/CompleteScene.js", "js/Audio.js", "js/Game.js", "js/GameSceneDatas.js", "js/main.js",],
                // 连接后生成的文件
                dest: 'dist/game.js',
            },
        },
        // 压缩js文件，也可以连接js文件
        uglify: {
            // 压缩文件的选项
            options: {
                // separator: '/*一堆分号*/',//会插入文件之间
                banner: '/* <%= pkg.description %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\r\n',
            },
            // 一个具体的压缩动作
            game: {
                // 配置压缩文件
                files: {
                    // 压缩后生成文件：待压缩文件，可以有多个
                    'dist/game.min.js': ['dist/game.js']
                }
            }
        },
        // 监视文件变化并自动执行任务
        watch: {
            // 一个具体的监视动作
            game: {
                // 要监视的js文件夹里的所有js文件
                files: ["js/*.js", "Gruntfile.js"],
                // 当文件变化时要执行的任务
                tasks: ["concat", "uglify"]
            },
            css: {
                files: ["index.css"],
                tasks: ["cssmin"]
            },
            html: {
                files: ["index.html"],
                tasks: ["htmlmin"]
            }
        },
        // 压缩css文件
        cssmin: {
            // 一个压缩动作
            target: {
                // 配置压缩文件
                files: {
                    // 压缩后生成的文件：待压缩列表
                    'dist/index.min.css': ['index.css']
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空白
            },
            index: {
                files: {
                    "dist/index.html": "index.html"
                }
            }
        },
        copy: {
            dist: {
                files: [
                    { expand: true, src: ['images/**', "mp3/**"], dest: "dist/", filter: 'isFile' }

                ]
            }
        },
        clean: {
            dist: ["dist/game.js"]
        },
        compress: {
            dist: {
                options: {
                    archive: "找不同.zip"
                },
                // 使用expand和cwd去掉压缩包中的dist文件夹
                // 将dist中的文件直接放入压缩包
                files: [{
                    expand: true, cwd: "dist/", src: ["**"]
                }]
            }
        }
    });

    grunt.registerTask("build", ["concat", "uglify", "clean", "cssmin", "htmlmin"]);
    // 添加注册只需使用grunt就会自动执行以下事件，最后开始监听
    grunt.registerTask("default", ["build", "watch"]);

    grunt.registerTask("dist", ["build", "copy", "compress"])
}

