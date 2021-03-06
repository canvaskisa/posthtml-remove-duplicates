'use strict';

var match = require('posthtml-match-helper');

module.exports = function plugin(selector) {
	selector = selector || [];

	return function parse(tree) {
		var nodes = [];

		tree.match(match(selector), function (node) {
			var stringified = JSON.stringify(node);

			if (nodes.indexOf(stringified) !== -1) {
				return {tag: false, content: ''};
			}

			nodes.push(stringified);

			return node;
		});

		return tree;
	};
};
