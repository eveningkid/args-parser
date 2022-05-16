'use strict';

/*
  Straight-forward node.js arguments parser
  Author: eveningkid
  License: Apache-2.0
*/

const ARGUMENT_SEPARATION_REGEX = /([^=\s]+)=?\s*(.*)/;

const Parse = (argv) => {
  // Removing node/bin and called script name
  argv = argv.slice(2);

  const parsedArgs = {};
  let argName, argValue;

  for (let arg of argv) {
    // Separate argument for a key/value return
    let beforeArg = arg;
    arg = arg.match(ARGUMENT_SEPARATION_REGEX);
    if (!arg) {
      throw new Error(`invalid syntax at "${beforeArg}" \nsyntax: node script.js careful -dangerous --tomatoes=3 --tonight --key=ek==\nfor more visit https://www.npmjs.com/package/args-parser`);
    }
    arg.splice(0, 1);

    // Retrieve the argument name
    argName = arg[0];

    // Remove "--" or "-"
    if (argName.indexOf('-') === 0) {
      argName = argName.slice(argName.slice(0, 2).lastIndexOf('-') + 1);
    }

    // Parse argument value or set it to `true` if empty
    argValue =
      arg[1] !== ''
        ? parseFloat(arg[1]).toString() === arg[1]
          ? +arg[1]
          : arg[1]
        : true;

    parsedArgs[argName] = argValue;
  };

  return parsedArgs;
}

module.exports = Parse;
