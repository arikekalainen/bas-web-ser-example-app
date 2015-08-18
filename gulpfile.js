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

// Client components
// - This list must be updated when new components are added
// + Base-element
var baseElement = "../bas-web-ser-client-components/base-element"

var baseElementNpmInstall = "base-element-npm-install";
gulp.task(baseElementNpmInstall, function() {
  return gulp.src(baseElement + "/package.json")
    .pipe(run("npm install", {cwd: baseElement}));
});

var baseElementBowerInstall = "base-element-bower-install";
gulp.task(baseElementBowerInstall, function() {
  return gulp.src(baseElement + "/bower.json")
    .pipe(run("bower install", {cwd: baseElement}));
});

var baseElementCompileRelease = "base-element-compile-release";
gulp.task(baseElementCompileRelease, function() {
  return gulp.src(baseElement + "/gulpfile.js")
    .pipe(run("gulp", {cwd: baseElement}));
});

// + X-element
var xElement = "../bas-web-ser-client-components/x-element"

var xElementNpmInstall = "x-element-npm-install";
gulp.task(xElementNpmInstall, function() {
  return gulp.src(xElement + "/package.json")
    .pipe(run("npm install", {cwd: xElement}));
});

var xElementBowerInstall = "x-element-bower-install";
gulp.task(xElementBowerInstall, function() {
  return gulp.src(xElement + "/bower.json")
    .pipe(run("bower install", {cwd: xElement}));
});

var xElementCompileRelease = "x-element-compile-release";
gulp.task(xElementCompileRelease, function() {
  return gulp.src(xElement + "/gulpfile.js")
    .pipe(run("gulp", {cwd: xElement}));
});



// Backend
// - executes npm install for backend
// - executes gulp-release for backend
// - copy backend to release
var backend = "../bas-web-ser-backend";

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
// - execute bower install
// - compile jade to html
// - copy css files to release
var exampleAppBowerInstall = "example-app-bower-install";
gulp.task(exampleAppBowerInstall, function() {
  return gulp.src("./bower.json")
    .pipe(run("bower install", {cwd: "./"}));
});


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
    baseElementNpmInstall,
    baseElementBowerInstall,
    baseElementCompileRelease,
    xElementNpmInstall,
    xElementBowerInstall,
    xElementCompileRelease,
    exampleAppBowerInstall,
    exampleAppJadeToHtml,
    exampleAppCopyCss,
    backendNpmInstall,
    backendCompileRelease,
    backendCopyToRelease
  );
});
