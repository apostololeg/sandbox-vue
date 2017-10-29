const {
    FuseBox,
    VueComponentPlugin,
    BabelPlugin,
    QuantumPlugin,
    StylusPlugin,
    CSSResourcePlugin,
    PostCSSPlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky } = require('fuse-box')
const autoprefixer = require('autoprefixer')
const favicons = require('favicons');

let fuse
let isProduction = false

Sparky.task('set-prod', () => isProduction = true)

Sparky.task('clean', () => {
    Sparky
        .src('./dist')
        .clean('dist/')
})

Sparky.task('watch-assets', () => {
    Sparky
        .watch('./assets', { base: './src' })
        .dest('./dist')
})

Sparky.task('copy-assets', () => {
    Sparky
        .src('./assets', { base: './src' })
        .dest('./dist')
})

Sparky.task('config', () => {
    fuse = FuseBox.init({
        homeDir: './src',
        hash: isProduction,
        output: 'dist/$name.js',
        sourceMaps: !isProduction,
        polyfillNonStandardDefaultUsage: true,
        plugins: [
            BabelPlugin(),
            VueComponentPlugin({
                script: BabelPlugin(),
                style: [
                    StylusPlugin(),
                    PostCSSPlugin([autoprefixer]),
                    CSSPlugin()
                ]
            }),
            WebIndexPlugin({
                template: './src/index.html'
            }),
            isProduction && QuantumPlugin({
                bakeApiIntoBundle: 'vendor',
                uglify: true,
                treeshake: true
            }),
        ]
    })

    if (!isProduction){
        fuse.dev({
            // open: true,
            port: 8081
        })
    }

    const app = fuse
        .bundle('build')
        .target('browser')
        .instructions('> index.js')

    if (!isProduction){
        app
            .watch()
            .hmr() // hot module reloading
    }
})

Sparky.task('favicons', () => {

})

Sparky.task('default',
    ['clean', 'watch-assets', 'config'],
    () => fuse.run())

Sparky.task('dist',
    ['clean', 'copy-assets', 'set-prod', 'config'],
    () => fuse.run())
