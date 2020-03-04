### vue基础组件

### ---------------------------------------

基于vue的底层组件UI框架，原生代码，无第三方库。

### ---------------------------------------

新添加了全局的css变量 vue3下面直接执行 vue add style-resources-loader 
配置 vue.config.js如下
```
const path = require("path");

module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/theme/css.less")] #自己的全局文件地址
        } 
    }
};
```
