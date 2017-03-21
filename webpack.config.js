var webpack_merge = require('webpack-merge');

var base_config = require("hybrid-app-base/webpack.config");

module.exports = function(env) {
    return config = webpack_merge(base_config(env), {

    });
};
