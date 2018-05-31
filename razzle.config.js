// const OfflinePlugin = require('offline-plugin')

module.exports = {
    modify: (config, { target, dev }, webpack) => {
        // if (target === 'web') {
        //     config.plugins.push(
        //         new OfflinePlugin({
        //             relativePaths: false,
        //             publicPath: '/',
        //             caches: 'all',
        //             externals: ['/'],
        //             ServiceWorker: {
        //                 output: './sw.js',
        //                 navigateFallbackURL: '/'
        //             }
        //         })
        //     )
        // }

        return config
    }
}
