const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const app = express();

const publicPath = path.join(__dirname, '..', 'public');
const buildPath = path.join(__dirname, '..', 'build');
const faviconPath = path.join(__dirname, '..', 'build', 'favicon.ico');
const rootPath = path.join(__dirname, '..');
const port = process.env.PORT || 3000;

app.use(favicon(faviconPath));
app.use(express.static(rootPath));
app.use(express.static(buildPath));



app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('App is running in production mode');
});