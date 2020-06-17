const setupStore = require('../helpers/setupStore')
const api = require('../helpers/api')
const resultHandler = require('../helpers/testResultHandler')

module.exports = (testPackage, cmd) => {

	const connectionConfig = setupStore.getConnectionConfig(cmd)
	console.log('Testing package ' + testPackage + '...')	

	const response = api.testPackage(testPackage, connectionConfig)
	response.then(data => {
		resultHandler(data,true)		
	});
};




