import path from 'path'
import Express from 'express'
import favicon from 'serve-favicon'
import httpProxy from 'http-proxy'
import compression from 'compression'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import config from '../config/config'
import fs from 'fs'

const app = new Express();
const port = config.port;

app.use('/api',(req,res)=>{
    proxy.web(req,res,{target:targetUrl})
});


app.use('/', connectHistoryApiFallback());
app.use('/',Express.static(path.join(__dirname,"..",'build')));
app.use('/',Express.static(path.join(__dirname,"..",'static')));

// targetUrl: http://127.0.0.1:3030
const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target:targetUrl
});

app.use(compression());
app.use(favicon(path.join(__dirname,'..','static','favicon.ico')));



//热更新
if(process.env.NODE_ENV!=='production'){
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.dev');

    const compiler = Webpack(webpackConfig);

    app.use(WebpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {colors: true},
        lazy: false
    }));
    app.use(WebpackHotMiddleware(compiler));
}

app.listen(port,(err)=>{
    fs.writeFile("/Users/user18/Desktop/test.md",JSON.stringify(process.env),(err)=>{
        if (err) {
            console.log('写入文件失败');
        } else {
            console.log('写入文件成功');
        }
    });
    if(err){
        console.error(err)
    }else{
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }
});