module.exports = {
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "entry",
				"modules": false,
        "corejs": "3",
        "targets": {
          "esmodules": true,
        },
			}
		]
	]
}