var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const MODE = "production"
let DEVTOOL = "";
if(MODE == "development") {
    DEVTOOL = "inline_source_map";
}

module.exports = [
    {
	mode: MODE,
	entry: {
	    popup:['./src/js/conohawp.js', './src/js/popup.js'],
	    content: ['./src/js/conohawp.js', './src/js/content.js'],
	    background:'./src/js/background.js',
	},
	output: {
	    path: path.join(__dirname, 'ext'),
	    filename: '[name].js',
	},
	devtool: DEVTOOL,
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
	},
	optimization: {
	    minimize: true,
	},
    },
    {
	mode: MODE,
	entry: {
	    popup:'./src/scss/popup.scss',
	},
	output: {
	    path: path.join(__dirname, 'ext'),
	    filename: '[name].css',
	},
	module:{
	    rules: [
		{
		    test: /\.scss$/,
		    use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [
			    {
				loader: 'css-loader',
				options: {
				    url: false,
				    minimize: true
				}
			    },
			    {
				loader: 'sass-loader'
			    },
			    {
				loader: 'postcss-loader',
				options: {
				    plugins: function () {
					return [
					    require('autoprefixer')
					];
				    }
				}
			    }			    
			]
		    })
		}
	    ]
	},
	plugins: [
	    new ExtractTextPlugin('[name].css')
	]	
    }
];
