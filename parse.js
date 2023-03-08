'use strict';

/*
	Straight-forward node.js arguments parser
	Author: eveningkid
	License: Apache-2.0
*/

const ARGUMENT_SEPARATION_REGEX = /^([^=\s]+)=?\s*(.*)/;

function Parse(argv) {
  
  const parsedArgs = {};
  // Removing node/bin and called script name by starting at index 2
  for(let i = 2; i < argv.length; i++){
    // Separate argument for a key/value return, ignoring full match
    let [_, argName, argValue] = argv[i].match(ARGUMENT_SEPARATION_REGEX);
    
    // Remove "--" or "-"
    if (argName[0] === '-') {
      argName = argName.slice(argName[1] === '-' ? 2 : 1);
    }
    
    // Parse argument value or set it to `true` if empty
    const numberValue = +argValue
    parsedArgs[argName] =
      argValue !== ''
        ? !Number.isNaN(numberValue) ? numberValue : argValue
        : true;
  }

  return parsedArgs;
}

module.exports = Parse;

// If process.argv is available, make parsed 
if(typeof process !== 'undefined') module.exports.parsedArgv = Parse(process.argv || [])
