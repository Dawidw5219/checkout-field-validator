module.exports = function (grunt) {
  const pkg = grunt.file.readJSON("package.json");

  grunt.initConfig({
    pkg: pkg,
    projectName: pkg.name,
    destDir: grunt.option("output"),
    copy: {
      main: {
        expand: true,
        cwd: "src/",
        src: "**",
        dest: '<%= grunt.config.get("destDir") %>/<%= grunt.config.get("projectName") %>',
        flatten: false,
        filter: "isFile",
      },
    },
    compress: {
      main: {
        options: {
          archive: "dist/<%= grunt.config.get('projectName') %>.zip",
        },
        files: [
          {
            expand: true,
            cwd: "src/",
            src: ["**"],
            dest: "<%= grunt.config.get('projectName') %>/",
          },
        ],
      },
    },
    watch: {
      scripts: {
        files: ["src/**/*"],
        tasks: ["copy"],
        options: {
          spawn: false,
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", function () {
    if (grunt.config.get("destDir")) {
      grunt.task.run(["copy", "watch"]);
    } else {
      grunt.fail.fatal("Destination directory must be provided for the dev mode. Use --output=PATH");
    }
  });
  grunt.registerTask("build", ["compress"]);
};
