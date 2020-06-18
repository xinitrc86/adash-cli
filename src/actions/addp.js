const setupStore = require('../helpers/setupStore')
const api = require('../helpers/api')


module.exports = (testPackage, cmd) => {

	
	const connectionConfig = setupStore.getConnectionConfig(cmd)
	console.log('Adding package ' + testPackage + ' to ' + connectionConfig.host + '...' )

	api.addForMonitoring('devc',testPackage,connectionConfig)
	.then(
		ok=>(cmd.system && setupStore.addPackage(testPackage,cmd.system,cmd.group) ) 
	)
	.catch(error => {
		process.exit(1)
	})

};

