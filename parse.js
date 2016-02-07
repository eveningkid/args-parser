"use strict";

/*
	Straight-forward node.js arguments parser
	Author: eveningkid
	License: Apache-2.0
*/

function Parse (argv) {
	// Removing node/bin and called script name
	argv = argv.slice(2);

	// Returned object
	var args = {};

	// For each argument
	argv.forEach(function (arg, index) {
		// Seperate argument, for a key/value return
		arg = arg.split('=');

		// Retrieve the argument name
		var argName = arg[0];
		
		// Remove the two "--" in front of the argument
		if (argName.slice(0, 2) == "--") {
			argName = argName.slice(2);
		}

		// Or if it is a single hyphen
		if (argName.slice(0, 1) == '-') {
			argName = argName.slice(1);
		}

		// Associate defined value or initialize it to "true" state
		var argValue = (arg.length === 2) ? arg[1] : true;

		// Finally add the argument to the args set
		args[argName] = argValue;
	});

	return args;
}

module.exports = Parse;