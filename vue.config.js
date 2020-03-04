// vue add style-resources-loader
const path = require("path");

module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/theme/css.less")]
        }
    }
};
