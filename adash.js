#!/usr/bin/env node

require('dotenv').config();

/**
 * This is the common way to import a package in NodeJS.
 * The CommonJS module system is used.
 */

const adash = require('commander');
const testPackage = require('./src/actions/testp');
const testGroup = require('./src/actions/testg');
const monitor = require('./src/actions/monitor');
const addSys = require('./src/actions/adds');
const addPackage = require('./src/actions/addp')
const {version} = require('./package');

/**
 * Without using `.command`, this works as the root command.
 */
adash
	.version(version, '-v, --version');
adash
	.command('testp')
	.alias('tp')
	.description('Tests a package in a system')
	.arguments('<package>')
	.option('-s, --system [system', 'Set up system for test to run')
	.option('-i, --insecure [insecure]', 'Bypass local SSL verification')
	.option('-u, --username [username]', 'User for endpoint')
	.option('-p, --password [password]', 'Password for endpoint')
  	.option('-h, --host [host]','Host & port Netweaver ')
  	.option('-a, --adash [adash]', 'Path to ADASH on host, default /sap/zadash')	

	.action(testPackage);
adash
	.command('testg')
	.alias('tg')
	.description('Tests group in a system')
	.arguments('<group>')
	.option('-s, --system [system]', 'Set up system for test to run')
	.option('-i, --insecure [insecure]', 'Bypass local SSL verification')
	.option('-u, --username [username]', 'User for endpoint')
	.option('-p, --password [password]', 'Password for endpoint')
  	.option('-h, --host [host]','Host & port Netweaver ')
  	.option('-a, --adash [adash]', 'Path to ADASH on host, default /sap/zadash')	
	.action(testGroup);  
adash
	.command('addsys')
	.alias('adds')
	.description('Adds a system with ADASH Services')
	.arguments('<system>')
	.option('-u, --username [username]', 'User for endpoint')
	.option('-p, --password <[password]', 'Password for endpoint')
    .option('-h, --host <host>', 'Host & port Netweaver ')
    .option('-a, --adash [adash]', 'Path to ADASH on host, default /sap/zadash')	
	.action(addSys);
 adash
	.command('addpackage')
	.alias('addp')
	.description('Adds a package to be monitored')
	.arguments('<package>')
	.option('-g, --group <group>', 'Test group for monitoring')
	.option('-s, --system <system>', 'System for the package to be monitored')
	.option('-i, --insecure [insecure]', 'Bypass local SSL verification')
	.option('-u, --username [username]', 'User for endpoint')
	.option('-p, --password [password]', 'Password for endpoint')
  	.option('-h, --host [host]','Host & port Netweaver ')
  	.option('-a, --adash [adash]', 'Path to ADASH on host, default /sap/zadash')	
	.action(addPackage);
adash
	.command('monitor')
	.alias('mon')
	.description('Display dashboard for the monitored tests')
	.arguments('[group]')
	.option('-s, --system <system>', 'System for monitoring')	
	.action(monitor);


/**
 * Other commands will be redirected to the help message.
 */
adash.command('*').action(() => adash.help());

adash.parse(process.argv);

if (adash.args.length === 0) {
	adash.help()
}
