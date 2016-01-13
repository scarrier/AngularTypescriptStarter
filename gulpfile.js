/// <binding AfterBuild='default' ProjectOpened='watch' />

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var config = require('./gulp.config')();
var tslint = require('gulp-tslint');
var protractor = require('gulp-angular-protractor');
var ts = require('gulp-typescript'); //required for tests
var KarmaServer = require('karma').Server;
var path = require('path');
var rework = require('rework');
var fs = require('fs');
var del = require('del');
var runSequence = require('run-sequence');
var replace = require('gulp-token-replace');
var xml2js = require('xml2js').parseString;

var argv = require('yargs').argv;
var env = argv.env;
env = (env || 'local').toLowerCase();
console.log('Building for environment ' + env);

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
   return gulp.src(config.input.ts)
             .pipe(tslint())
             .pipe(tslint.report('verbose', { emitError: false } )); // prose
});



gulp.task('sass', function () {
    return gulp.src(config.input.sass)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.output.css));
});


/**
 * External css files (i.e. those in node_modules) should be referenced in main.scss as import urls
 * This task will resolve those urls, copy the css files into the /dist/css/ folder and rewrite the import urls
*/
gulp.task('css', ['sass'], function () {
    var cssString = fs.readFileSync('./dist/css/main.css').toString();
    var srcFiles = [];
    cssString = rework(cssString).use(function(style) {
        var rules = style.rules || [];
        rules.forEach(function(rule) {
            if (rule.type === 'import') {
                var match = /url\(['"](.*)['"]\)/.exec(rule.import);
                if (match) {
                    var url = match[1];
                    srcFiles.push(path.resolve('./content/css', url));
                    rule.import = 'url("' + path.basename(url) + '")';
                }
            }
        });
    }).toString();
    fs.writeFileSync('./dist/css/main.css', cssString);

    return gulp.src(srcFiles).pipe(gulp.dest('./dist/css'));
});

gulp.task('images', function() {
    gulp.src('./content/images/**/*').pipe(gulp.dest('./dist/images'));
});

gulp.task('fonts', function () {
    return gulp.src(config.input.fonts)
      .pipe(gulp.dest(config.output.fonts));
});

gulp.task('clean', function() {
    return del('./dist/');
});

var browserifyOpts = {
    debug: env === 'local' || env === 'dev',
    entries: [config.input.js]
}

gulp.task('watch', function (done) {
    gulp.watch(config.input.sass, ['sass']);
    var opts = assign({delay:2000}, watchify.args, browserifyOpts);
    var watcher = watchify(browserify(opts));
    watcher.on('update', function () {
        gutil.log('Updating bundle');
        bundle(watcher);
    });
    bundle(watcher);
	
    new KarmaServer({
        configFile: config.karmaConfig,
        singleRun: false,
        autoWatch: true
	}, done).start();
});

gulp.task('scripts', function() {
    return bundle(browserify(browserifyOpts));
});

gulp.task('settings', function () {
    //If deploying locally, read web.config and substitute tokens for settings file
    //If deploying on the server, Octopus will do this for us
    if (env === 'local') {
        var tokens = {};
        xml2js(fs.readFileSync('./Web.config').toString(), function(err, result) {
            var webConfig = result.configuration.appSettings[0].add;
            for (var i in webConfig) {
                tokens[webConfig[i].$.key] = webConfig[i].$.value;
            }
            gulp.src(['./settings.js'])
                .pipe(replace({ tokens: tokens, prefix: '#{', suffix: '}' }))
                .pipe(gulp.dest('dist/js/'));
        });
    } else {
        console.log('copying settings');
        gulp.src(['./settings.js']).pipe(gulp.dest('dist/js/'));
    }
});

function bundle(bundler) {
    return bundler
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.output.js));
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                gutil.log(gutil.colors.blue(msg[item]));
            }
        }
    }
    else {
        gutil.log(gutil.colors.blue(msg));
    }

}

gulp.task('default', function() {
    runSequence('clean', ['settings','scripts', 'sass', 'fonts', 'images', 'css']);
});


/**
 * Protractor E2E tests
 */

gulp.task('clean-test-scripts', function() {
    return del(['./test/**/*.js']);
});

gulp.task('test-scripts', ['clean-test-scripts'], function () {
    return gulp.src(['./test/**/*.ts'], {base:'./'})
        .pipe(ts(
        {
            module: 'commonjs',
            target: 'ES5'
        }))
        .pipe(gulp.dest('./'));
});


var child_process = require('child_process');

gulp.task('e2e-test', ['default','test-scripts'], function (cb) {
    gulp.src([]).pipe(
        protractor({
        'configFile': 'protractor.config.js',
            'args': ['--baseUrl', 'http://localhost:8085'] //TODO Need to make this url consistent and configurable
        }));
});

/**
 * Karma unit tests
 */

gulp.task('unit-test', ['scripts', 'test-scripts'], function (cb) {
    return new KarmaServer({
        configFile: config.karmaConfig
    }, cb).start();
});

gulp.task('test', ['scripts', 'test-scripts', 'unit-test', 'e2e-test']);
