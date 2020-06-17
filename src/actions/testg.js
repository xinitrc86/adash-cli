const api = require('../helpers/api')
const setupStore = require('../helpers/setupStore')
const resultHandler = require('../helpers/testResultHandler')



module.exports = (testGroup, cmd) => {

	if (!cmd.system) {
		throw new Error('Please inform a sistem')
	}

	const system = setupStore.getSystem(cmd.system)
	const connectionConfig = setupStore.getConnectionConfig(cmd)

	const group = system.groups[testGroup]
	if (!group) {
		throw new Error('Group ' + testGroup + ' not found on system ' + cmd.system)
	}

	console.log('Testing group ' + testGroup + '...')

	Promise.all(
		group.map(package => {
			console.log('Testing package ' + package + '...')
			return api.testPackage(package,connectionConfig)
		})
	).then(responses => {
		let hasFails = false
		responses.map(data => {
			let hasFails = (data.STATUS === '1-')
			resultsHandler(data => {
				resultHandler(data)
			})
			if (hasFails)
				process.exit(1)

		})
	});
};

