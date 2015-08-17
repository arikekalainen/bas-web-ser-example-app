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
// - executes npm install for backend
// - executes gulp-release for backend
// - copy backend to release
var backend = "bas-web-ser-backend";

var backendNpmInstall = "backend-npm-install";
gulp.task(backendNpmInstall, function() {
  return gulp.src(backend + "/package.json")
    .pipe(run("npm install", {cwd: backend}));
});

var backendCompileRelease = "backend-compile-release";
gulp.task(backendCompileRelease, function() {
  return gulp.src(backend + "/gulpfile.js")
    .pipe(run("gulp", {cwd: backend}));
});

var backendCopyToRelease = "backend-copy-to-release";
gulp.task(backendCopyToRelease, function() {
  return gulp.src("../bas-web-ser-backend/release/**/*.*")
      .pipe(gulp.dest('release/backend'))
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
        .pipe(gulp.dest('release/client/style'))
});


// Default task : do everything
gulp.task('default', function() {
  console.log("Gulp : Running default task : do everything !");

  sequence(
    exampleAppJadeToHtml,
    exampleAppCopyCss,
    backendNpmInstall,
    backendCompileRelease,
    backendCopyToRelease
  );
});
