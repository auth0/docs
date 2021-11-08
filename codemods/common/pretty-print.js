
   
let prettier;
try {
  prettier = require("prettier"); // eslint-disable-line
} catch (err) {
  prettier = null;
}

function prettyPrint(root) {
  const transformedSource = root.toSource({
    quote: "auto",
    tabWidth: 2,
  });

  return prettier ? prettier.format(transformedSource, prettier.resolveConfig.sync(__filename)) : transformedSource;
}

module.exports = prettyPrint;