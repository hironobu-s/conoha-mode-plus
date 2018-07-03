var path = require('path');

module.exports = {
    mode: "development",
    entry: {
	popup:['./src/js/conohawp.js', './src/js/popup.js'],
	content: ['./src/js/conohawp.js', './src/js/content.js'],
	background:'./src/js/background.js'
    },
    output: {
	path: path.join(__dirname, 'ext'),
	filename: '[name].js',
    },
    devtool: "inline-source-map",
    module: {
	rules: [
	    { 
		test: /\.js$/, 
		exclude: /node_modules/, 
		loader: "babel-loader", 
		query:{
		    presets: ['es2015']
		}
	    }
	]
    }
};
