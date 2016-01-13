module.exports = function () {

    var client = '';

    var config = {
        karmaConfig: __dirname + '/karma.config.js',
        input: {
            fonts: './node_modules/bootstrap/fonts/*',
            sass: './content/css/*.scss',
            js: './index.ts',
            ts: './app/**/*.ts',
            dts: './typings/**/*.d.ts'
        },
        output: {
            fonts: './dist/fonts',
            css: './dist/css',
            js: './dist/js'
        }

    };


    return config;
}