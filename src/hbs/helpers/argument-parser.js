'use strict';

function createFromContext(context) {
	return {
		name: context.hash.name.toLowerCase(),
		variant: context.hash.variant ? context.hash.variant.toLowerCase() : null
	}
}

function createFromArgs(args) {
	return {
		name: args[0].toLowerCase(),
		variant: args.length > 1 && typeof args[1] === 'string' ? args[1].toLowerCase() : null
	};
}

function createFromAll(args, context) {
	return {
		name: typeof args[0] === 'string' ? args[0].toLowerCase() : context.hash.name,
		variant: typeof args[1] === 'string' ? args[1].toLowerCase() : context.hash.variant
	};
}

function parseArguments(args) {
	var context = args[args.length - 1];
	delete args[args.length - 1];

	if (args.length === 1) {
		return createFromContext(context);
	} else if (Object.keys(context.hash).length > 0) {
		// Mixture from arguments and context
		return createFromAll(args, context);
	}

	return createFromArgs(args);
};

module.exports = parseArguments;