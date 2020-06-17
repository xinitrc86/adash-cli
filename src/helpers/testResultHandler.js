const STATUS = {
    success: '1',
    fail: '1-'
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
    }
}