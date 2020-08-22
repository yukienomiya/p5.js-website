// This function generates the YAML version of the JSON files
// that contain text that gets displayed on the website.
// i.e. src/data/en.json (not to be mistaken with the files with the Reference text)

const fs = require('fs');
const yaml = require('js-yaml');

function yamlFromJson(jsonPath, yamlPath) {
  const JSONString = fs.readFileSync(jsonPath);
  const data = JSON.parse(JSONString);
  const yamlString = yaml.safeDump(data);
  fs.writeFileSync(yamlPath, yamlString);
}

module.exports = yamlFromJson;
