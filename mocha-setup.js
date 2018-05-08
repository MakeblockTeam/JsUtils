import requireHacker from 'require-hacker'
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

requireHacker.hook('png', () => 'module.exports = ""')
requireHacker.hook('css', () => 'module.exports = ""')
requireHacker.hook('svg', () => 'module.exports = ""')

const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.window.Object = {}