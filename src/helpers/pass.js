const chalk = require('chalk');
const log = console.log;

module.exports = (data) => {
	log(chalk.bold.green(' PASS '));
	// @ToDo:  on verbose
	data.SUMARIES.map(test => {
		log(chalk.green('PASS: ') + test.NAME);
	});
};
