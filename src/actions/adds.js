const path = require("path")
const fs = require('fs')
const setupStore = require('../helpers/setupStore')

module.exports = (systemToAdd, cmd) => {

	const config = getConfig(cmd)	
	console.log('Adding system ' + systemToAdd + '...')
	setupStore.addSystem(systemToAdd,config)
	

};

function getConfig(options) {
	//several bash would translate /sap/zadash to <path_to_something>/sap/adash
	//requiring the entry to be sap/zadash
	let argAdashPath = options.adash
	if (argAdashPath && argAdashPath.charAt(0) !== '/'){
		argAdashPath = `/${argAdashPath}`
	}
	else if (!argAdashPath){
		argAdashPath = `/sap/zadash`
	}

	const systemOptions = {
		config:{			
			username: options.username || process.env.ADASH_USERNAME,
			password: options.password || process.env.ADASH_PASSWORD,
			host: options.host || process.env.ADASH_HOST,
			adash: argAdashPath || process.env.ADASH_PATH,			
			client: options.client || process.env.ADASH_CLIENT
		}
	};
	if (!systemOptions.config.host || !systemOptions.config.adash) {
		throw new Error('Please setup a host as https://your-server.com:8200');
	}

	return systemOptions;
}

