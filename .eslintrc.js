module.exports = {
	"env": {
		"es6": true,
		"node": true,
		"jest/globals": true
	},
	"extends": ["airbnb-base", "prettier"],
	"plugins": ["prettier", "jest"],
	"rules": {
		"no-console": "off",
		"func-names": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
		"prettier/prettier": [
			"error",
			{ "singleQuote": true, "trailingComma": "es5" }
		]
	},
	"overrides": [{
		"files": "**/*.test.js",
		"rules": {
			"node/no-unpublished-require": 0,
      "node/no-missing-require": 0
		}
	}]

};