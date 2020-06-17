const setupStore = require('../helpers/setupStore')
const server = require("@ui5/server/lib/server");
const path = require('path')
const open = require("open")
const fs = require('fs')

module.exports = (testGroup, cmd) => {

    const system = setupStore.getSystem(cmd.system)
    const systemConfig = system.config
    const group = system.groups[testGroup] || system.groups['all']
    if (!group) {
        throw new Error('Group ' + testGroup + ' not found on system ' + cmd.system)

    }

    writeGroupToMonitor(group);

    let monitorUi5Setup = getMonitorServeSetup(systemConfig);

    addBackendProxyMiddleware();
    server.serve(monitorUi5Setup, { port: '8080' }).then(({ h2, port: actualPort }) => {
        let index = `http://localhost:${actualPort}/index.html`
        open(index, { url: true });
    })


}

function writeGroupToMonitor(group) {
    setupStore.setupMonitoringGroup(group)
}

function addBackendProxyMiddleware() {
    const middlewareRepository = require("@ui5/server/lib/middleware/middlewareRepository");
    middlewareRepository.addMiddleware({
        specVersion: '',
        middlewarePath: path.join(require.resolve('ui5-middleware-route-proxy/lib/proxy')),
        name: 'ui5-middleware-route-proxy'
    });
}

function getMonitorServeSetup(systemConfig) {

    let monitorUi5Setup = {
        id: 'adash',
        version: '0.1.0',
        path: setupStore.getMonitorPath(),
        specVersion: '2.0',
        metadata: { name: 'adash', namespace: 'adash/ui/monitor' },
        type: 'application',
        dependencies: [],
        framework: {
            name: 'SAPUI5',
            version: '1.76.0',
            libraries: []
        },
        server: {
            customMiddleware: [
                {
                    name: 'ui5-middleware-route-proxy',
                    afterMiddleware: 'compression',
                    configuration: {
                        '/sap/opu/': {
                            target: systemConfig.host,
                            auth: {                                
                                user: systemConfig.username,
                                pass: systemConfig.password
                            }
                        }
                    }
                }
            ]
        },
        kind: 'project',
        resources: {
            configuration: {
                paths: {
                    webapp: '/'
                },
                propertiesFileSourceEncoding: 'UTF-8'
            },
            pathMappings: { '/': '/' }
        }
    };
    //for adash endpoint
    monitorUi5Setup.server.customMiddleware[0].configuration[systemConfig.adash] = {
        target: systemConfig.host,
        auth: {            
            user: systemConfig.username,
            pass: systemConfig.password
        }
    };

    return monitorUi5Setup;
}
