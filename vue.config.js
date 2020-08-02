const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        .set('common',resolve('./src/common'))
        .set('assets',resolve('./src/assets'))
        .set('network',resolve('./src/network'))
        .set('views',resolve('./src/views'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //         'assets': '@/assets',
    //         'common': '@/common',
    //         'components': '@/components',
    //         'network': '@/network',
    //         'views': '@/views',
    //         }
    //     }
    // },
    
    /**打包时需要 运行serve时注掉 */
    // publicPath: './',
    // outputDir: "dist",
    // assetsDir: "assets",
}

// module.exports = {
//     // 公共路径(必须有的)
//     publicPath: "./",
//     // 输出文件目录
//     outputDir: "dist",
//     // 静态资源存放的文件夹(相对于ouputDir)
//     assetsDir: "assets",
//     // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
//     lintOnSave: false,
//     // 我用的only，打包后小些
//     // compiler: false,//有
//     productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
//     // css相关配置(我暂时没用到)
//     // css: {
//     // 是否使用css分离插件 ExtractTextPlugin
//     // extract: true,
//     // 开启 CSS source maps?
//     // sourceMap: false,
//     // css预设器配置项
//     // loaderOptions: {},
//     // 启用 CSS modules for all css / pre-processor files.
//     // modules: false
//     // },
//     // webpack-dev-server 相关配置
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'https://api.inews.qq.com/',
//                 ws: true,
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
//                 }
//             }
//         }
//         //open: true,  // npm run serve后自动打开页面
//         // host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
//         // port: 8080, // 开发服务器运行端口号
//         // proxy: null,
//         // 注：目前本项目暂时没有写后台接口，没有跨域问题，暂时不配置proxy
//     },
// }