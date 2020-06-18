const chalk = require('chalk')

const STATUS = {
    success: '1',
    fail: '1-',
    neutral: '0'
}
const pass = require('./pass');
const fail = require('./fail');

module.exports = (data,failOnError) => {
		
    switch (data.STATUS) {
        case STATUS.success:
            pass(data)
            return true
            
        case STATUS.fail:
            fail(data)
            if (failOnError)
                process.exit(1)            
        case STATUS.neutral:
            console.log(chalk.red('No tests executed.'))
            process.exit(1)            
        
    }
}