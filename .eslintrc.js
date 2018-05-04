module.exports = {
    "extends": [
        "plugin:react/recommended",
        "eslint:recommended"
    ],
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "radix": ["error", "as-needed"],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": false,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false
            }
        }]
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    }
};
