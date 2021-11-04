var path = require('path')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8083',
                ws: true,
                changeOrigin: true
            }
        }
    }
}