const https = require('https');
path = require('path')
const fs = require('fs');
let axios = require('axios');


async function testPackage(testPackage,systemConfig) {

    setInsecureIfRequested(systemConfig)
	
	const username = process.env.ADASH_USERNAME || systemConfig.username
	const password = process.env.ADASH_PASSWORD || systemConfig.password
	const host =  process.env.ADASH_HOST || systemConfig.host
	const path = process.env.ADASH_PATH || systemConfig.adash
	const baseURL = `${host}${path}`

	try {
		const response = await axios.get('/devc/' + testPackage + '/test', {
			baseURL: baseURL,
			auth: {
				username: username,
				password: password,
			}
		})
		//ABAP Swagger adds DATA, everything on upper		
		return response.data.DATA;
	} catch (error) {
		console.log(`Unable to reach ${baseURL}
		Error: ${error.code}` );		
		process.exitCode = 1;
	}
}

async function addForMonitoring(type,component,systemConfig) {
	
	const username = process.env.ADASH_USERNAME || systemConfig.username
	const password = process.env.ADASH_PASSWORD || systemConfig.password
	const host =  process.env.ADASH_HOST || systemConfig.host
	const path = process.env.ADASH_PATH || systemConfig.adash
	const baseURL = `${host}${path}`

	setInsecureIfRequested(systemConfig)

	try {
		const response = await axios.get(`/${type}/${component}/add`, {
			baseURL: baseURL,
			auth: {
				username: username,
				password: password,
			}
		})
		return true;
	} catch (error) {
		console.log(`Unable to reach ${baseURL}
		Error: ${error.code}` );		
		process.exitCode = 1;
	}
}

function setInsecureIfRequested(options) {
	if (options.insecure) {
		axios = axios.create({
			httpsAgent: new https.Agent({
				rejectUnauthorized: false
			})
		})
	}
}

async function downloadMonitor(monitorPath){
	const componentPreloadPath = path.join(monitorPath,'/Component-preload.js')
	const indexPath = path.join(monitorPath,'/index.html')

	if (!fs.existsSync(monitorPath)){
		fs.mkdirSync(monitorPath)
	}		

	const monitor = await axios.get('/xinitrc86/adash-monitor/master/Component-preload.js',{
		baseURL: 'https://raw.githubusercontent.com'
	})

	fs.writeFileSync(componentPreloadPath,monitor.data)

	const index = await axios.get('/xinitrc86/adash-monitor/master/index.html',{
		baseURL: 'https://raw.githubusercontent.com'
	})

	fs.writeFileSync(indexPath,index.data)

}


module.exports = {
	downloadMonitor,
	testPackage,
	addForMonitoring
}
