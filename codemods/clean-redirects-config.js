const prettyPrint = require("./common/pretty-print");

const OBJECT_COMMENT_REGEX = /\} (\/\*[^\/\*]+\*\/)\,/g;

/**
 * clean up redirects that point to some other redirect and merge the 'from' field value
 * in order to avoid having multiple redirect requests and reduce them to a single one
 */
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const [redirects] = root.findVariableDeclarators('redirects').nodes();
  const configNodes = redirects.init.elements;
  root.find(j.ObjectExpression).forEach((toConfigNodePath) => {
    const toConfig = toConfigNodePath.value;
    const toNode = toConfig.properties.find((props) => props.key.name === 'to');
    // Find any 'to' field that is pointing to a 'from' field in some other config
    const found = configNodes.find((fromConfig) => {
      const fromNode = fromConfig.properties.find((props) => props.key.name === 'from');
      if(fromNode.value.type === 'ArrayExpression') {
        return fromNode.value.elements.some((fromElement) => fromElement.value === toNode.value.value);
      }
      // if not ArrayExpression it should be Literal
      return fromNode.value.value === toNode.value.value;
    });
    // If found merge the 'from' fields in the found item and delete the current redirection config
    if(found) {
      const allFroms = [];
      const foundFrom = found.properties.find((props) => props.key.name === 'from');
      const currentFrom = toConfig.properties.find((props) => props.key.name === 'from');
      if(foundFrom.value.type === 'ArrayExpression') {
        foundFrom.value.elements.forEach(({value}) => allFroms.push(value));
      } else {
        allFroms.push(foundFrom.value.value);
      }
      if(currentFrom.value.type === 'ArrayExpression') {
        currentFrom.value.elements.forEach(({value}) => allFroms.push(value));
      } else {
        allFroms.push(currentFrom.value.value);
      }
      const uniqueFroms = [...new Set(allFroms)];
      foundFrom.value = j.arrayExpression(uniqueFroms.map(val => j.literal(val)));
      j(toConfigNodePath).remove();
    }
  });
  const transformedSource = prettyPrint(root);
  // keep position and spaces for block comments within the redirect object
  return transformedSource.replace(OBJECT_COMMENT_REGEX, (match, group) => `},\n\n  ${group}`);
}