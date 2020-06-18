const path = require("path");
const api = require('./api')
const fs = require('fs')
const chalk = require('chalk')

const _adashFolder = path.join(require("os").homedir(), ".adash")
const _adashSystemsFile = path.join( _adashFolder, "systems.json")
const _adashMonitorPath = path.join(_adashFolder,'/monitor')

const getMonitorPath = ()=>{
    return _adashMonitorPath
}

const getFolderPath = () =>{
    return _adashFolder
}

const getSystems = () =>{

    let systems = {}

	try {
		let rawdata = fs.readFileSync(_adashSystemsFile);	
		systems = JSON.parse(rawdata);
		
		
	} catch (error) {
        systems = {};		
        if (!fs.existsSync(_adashFolder)){
            fs.mkdirSync(_adashFolder)		
        }
        fs.writeFileSync(_adashSystemsFile,JSON.stringify(systems))
    }
    
    return systems;


}


const getConnectionConfig = function(options) {
	//several bash would translate /sap/zadash to <path_to_something>/sap/adash
    //requiring the entry to be sap/zadash    

    let systemConfig = {}
    if (options.system){
        systemConfig = getSystem(options.system).config        
    }

	let argAdashPath = options.adash
	if (argAdashPath && argAdashPath.charAt(0) !== '/'){
		argAdashPath = `/${argAdashPath}`
	}
	else if (!argAdashPath){
		argAdashPath = `/sap/zadash`
	}

	const connectionConfig = {
        insecure: options.insecure,
        username: options.username || process.env.ADASH_USERNAME || systemConfig.username,
        password: options.password || process.env.ADASH_PASSWORD || systemConfig.password,
        host: options.host || process.env.ADASH_HOST || systemConfig.host,
        adash: argAdashPath || process.env.ADASH_PATH || systemConfig.adash,			
        client: options.client || process.env.ADASH_CLIENT || systemConfig.password
    };
    
	if (!connectionConfig.host || !connectionConfig.adash) {
        console.log(chalk.red('Please setup a host as https://your-server.com:8200'))
        console.log('By either adding a system, command options, environment variables or a combination!')
        process.exit(1)
    }
    
    if (!connectionConfig.username || !connectionConfig.password) {
        console.log(chalk.red('Please setup a user and name'))
        console.log('By either adding a system, command options, environment variables or a combination!')
        process.exit(1)
    }

	return connectionConfig;
}


const getSystem = (system) =>{

    const systems = getSystems();
    if (!systems[system]){
        throw new Error('System ' + system + ' is not set up.')
    }

    return systems[system];

}

const addSystem = (sysName,sysEntry) =>{

    let systems = getSystems();
    if (!systems[sysName]){
        systems[sysName] = sysEntry
    }else{
        systems[sysName] = {
            ...systems[sysName],
            ...sysEntry
        }
    }
    
    fs.writeFileSync(_adashSystemsFile,JSON.stringify(systems))
}

const addPackage = (testPackage,system,group) => {

    let systemConfig = getSystem(system)
    let systemGroups = systemConfig.groups || {}

    if (group) {
        let other = systemGroups[group] || []        
        if (!other.find( package => package === testPackage )){
            other.push(testPackage)
        }    
        systemGroups[group] = other;
    }

    systemConfig.groups = systemGroups    
    
    addSystem(system,systemConfig)

}


const setupMonitoringGroup = group =>{
    
    api.downloadMonitor(_adashMonitorPath)
    .then( dummy=>{
        let adashCliJSON = path.join(_adashMonitorPath, '/adash-cli.json');
        if (!group && fs.existsSync(adashCliJSON) ){
            fs.unlinkSync(adashCliJSON)
        }
        else if (group){}
            fs.writeFileSync(adashCliJSON, JSON.stringify(group));    
    })
}

const store = {
    getMonitorPath,
    setupMonitoringGroup,
    getFolderPath,
    getSystems,
    getSystem,
    getConnectionConfig,
    addSystem,
    addPackage
}

module.exports = store