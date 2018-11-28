#!/usr/bin/env node

let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs') //fs already comes included with node.
let templates = require('./templates/templates.js')
let miscFiles = require('./templates/miscFiles.js');

let appName = process.argv[2]
let appDirectory = `${process.cwd()}/${appName}`
let templatePath = './templates';
function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

const createReactApp = () => {
    return new Promise(resolve => {
        if (appName) {
            shell.exec(`create-react-app ${appName} --scripts-version=react-scripts-ts`, () => {
                console.log("Created react app")
                resolve(true)
            })
        } else {
            console.log("\nNo app name was provided.".red)
            console.log("\nProvide an app name in the following format: ")
            console.log("\ncreate-react-savij-base-app ", "app-name\n".cyan)
            resolve(false)
        }
    })
}

const installDepsPackages = () => {
    return new Promise(resolve => {
        console.log("\nInstalling custom dependencies\n".cyan)
        shell.exec(`yarn add @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core @material-ui/core @material-ui/icons axios webfontloader @types/webfontloader classnames @types/classnames react-router react-dom react-router-dom @types/react-router-dom mobx mobx-react mobx-react-router query-string @types/query-string tslint-microsoft-contrib tslint-misc-rules`, () => {
            console.log("\nFinished installing packages\n".green)
            resolve()
        })
    })
}

const installDevDepsPackages = () => {
    return new Promise(resolve => {
        console.log("\nInstalling custom dev dependencies\n".cyan)
        shell.exec(`yarn add --dev @types/jest @types/node @types/react @types/react-dom`, () => {
            console.log("\nFinished installing packages\n".green)
            resolve()
        })
    })
}

const copyMiscFiles = () => {
    return new Promise(resolve => {
        let promises = [];
        miscFiles.forEach((fileName, i) => {
            promises[i] = new Promise(res => {
                readModuleFile(`./templates/${fileName}`, (err, content) => {
                    fs.writeFile(`${appDirectory}/${fileName}`, content, err => {
                        if (err) { return console.log(err); }
                        res();
                    });
                });
            });
            Promise.all(promises).then(() => { resolve() })
        })
    });
}

const updateTemplates = () => {
    let appPath = `${appDirectory}/src/`;
    return new Promise(resolve => {
        let promises = []
        Object.keys(templates).forEach((fileName, i) => {
            if (fileName.includes('/')) {
                const regex = /\/?([^\/]+)\//g;
                const pathParts = fileName.match(regex);
                for (let i = 0; i < pathParts.length; i++) {
                    let dirPart = pathParts[i];
                    const curDir = `${appPath}/${dirPart}`;
                    if (!fs.existsSync(curDir)) {
                        fs.mkdirSync(curDir);
                    }
                }
            }
            promises[i] = new Promise(res => {
                fs.writeFile(`${appDirectory}/src/${fileName}`, templates[fileName], function (err) {
                    if (err) { return console.log(err) }
                    res()
                })
            })
        })
        Promise.all(promises).then(() => { resolve() })
    })
}

const run = async () => {
    let success = await createReactApp()
    if (!success) {
        console.log('Something went wrong while trying to create a new React app using create-react-app'.red);
        return false;
    }
    await copyMiscFiles();
    shell.cd(appDirectory);
    await installDepsPackages();
    await installDevDepsPackages();
    await updateTemplates();
    console.log("We suggest that you begin by typing:");
    console.log(`\ncd ${appName}`);
    console.log("yarn start");
    console.log("\nHappy hacking!");
    console.log("Created Savij-Base react app");
}
run()