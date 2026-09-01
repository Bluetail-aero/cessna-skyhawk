const path = require('path');

// BT-9860: `baseUrl: "./src"` was dropped from jsconfig.json (baseUrl is deprecated
// in TypeScript 6.0 and removed in 7.0). CRA derived webpack's absolute-import
// resolution from that baseUrl, and CRA ignores tsconfig/jsconfig `paths`, so restore
// it explicitly here: add `src` to webpack's module search paths so bare specifiers
// (common/*, pages/*, router/*, navbar/*, login/*, app/*, documentation/*) still
// resolve. Appended after node_modules to preserve the original resolution order.
// Wired up via react-app-rewired (see the start/build/test scripts in package.json).
module.exports = function override(config) {
  // Append src after node_modules (mutate, not reassign — CRA always defines
  // resolve.modules as an array, and .push avoids the no-param-reassign lint rule).
  config.resolve.modules.push(path.resolve(__dirname, 'src'));
  return config;
};
