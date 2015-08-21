/**
  Gulpfile for  Basic Web Service : example application
  Author : Ari Kekalainen <ari.kekalainen@gmail.com>

*/
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var sequence = require("run-sequence");
var jade = require("gulp-jade");
var run = require("gulp-run");

var tsProject = ts.createProject(tsConfig.compilerOptions);

// Backend
// - copy backend from node module to release for convenient reasons
var backend = "./node_modules/bas-web-ser-backend";

var backendCopyToRelease = "backend-copy-to-release";
gulp.task(backendCopyToRelease, function() {
  return gulp.src("node_modules/base-web-ser-backend/release/**/*.js")
      .pipe(gulp.dest('./release/backend'))
});

var backendCopyNodeModulesToRelease = "backend-copy-node-modules-to-release";
gulp.task(backendCopyNodeModulesToRelease, function() {
  return gulp.src("node_modules/base-web-ser-backend/node_modules/**/*.*")
      .pipe(gulp.dest('./release/backend/node_modules'))
});



// Example application
// - compile jade to html
// - copy css files to release

var exampleAppJadeToHtml = "example-app-jade-to-html";
gulp.task(exampleAppJadeToHtml, function() {
  return gulp.src("./jade/**/*.jade")
    .pipe(jade())
    .pipe(gulp.dest("./release/client"));
});

// Copy CSS files to release/client/style (TODO: Replace with LESS)
var exampleAppCopyCss = "example-app-copy-css";
gulp.task(exampleAppCopyCss, function() {
    return gulp.src("./style/**/*.css")
        .pipe(gulp.dest('./release/client/style'))
});


// Default task : do everything
gulp.task('default', function() {
  console.log("Gulp : Running default task : do everything !");

  sequence(
    exampleAppJadeToHtml,
    exampleAppCopyCss,
    backendCopyToRelease,
    backendCopyNodeModulesToRelease
  );
});
