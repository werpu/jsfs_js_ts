// Ensure @swc/register transpiles TS to CommonJS for mocha
// and respects tsconfig-paths (handled separately by tsconfig-paths/register)
require('@swc/register')({
  ignore: [/node_modules/],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  sourceMaps: 'inline',
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
      decorators: false
    },
    target: 'es2018',
    transform: {
      useDefineForClassFields: false
    }
  },
  module: {
    type: 'commonjs'
  }
});