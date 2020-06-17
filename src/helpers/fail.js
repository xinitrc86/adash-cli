const chalk = require('chalk');
const log = console.log;

module.exports = (data) => {	
	log(chalk.bold.red('FAIL'));
	data.TESTS.map(test => {
		if (test.STATUS === '1-') {
			log('    ' + chalk.red('On: ') + test.NAME + chalk.yellow(' Test: ') + test.TEST_CLASS + '  ' + test.TEST_METHOD);
            log('    ' + chalk.red('Error: ') + chalk.white(test.FAILURE_HEADER));
            log('     ' + chalk.white(test.FAILURE_DETAILS));
            log('')
		}
	});		
};
