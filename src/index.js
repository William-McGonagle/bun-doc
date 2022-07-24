#! /usr/bin/env node

import helpCommand, * as help from './commands/help.js';
import buildCommand, * as build from './commands/build.js';

const args = process.argv.slice(2);

const commandMap = {
    "help": { ...help, run: helpCommand },
    "build": { ...build, run: buildCommand }
};

if (args[0] === undefined) {
    
    commandMap["build"].run();

} else if (commandMap[args[0]] !== undefined) { 
    
    commandMap[args[0]].run();

} else {

    console.log(`Command "${args[0]}" not found. Perhaps try running "bun-doc help" to get a list of commands.`);

}