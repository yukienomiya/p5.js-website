const fs = require('fs');
const flat = require('flat');
const yaml = require('yaml');

// eslint-disable-next-line no-unused-vars
function updateJSON(originalJSONPath, translatedJSONPath) {
  const originalJSONFile = fs.readFileSync(originalJSONPath);
  const originalJSON = JSON.parse(originalJSONFile);
  const translJSONFile = fs.readFileSync(translatedJSONPath);

  let translJSON;
  try {
    translJSON = JSON.parse(translJSONFile);
  } catch (error) {
    translJSON = {};
  }

  let newJSON = updatei18nObj(
    flat.flatten(originalJSON),
    flat.flatten(translJSON)
  );

  fs.writeFileSync(
    translatedJSONPath,
    JSON.stringify(flat.unflatten(newJSON), undefined, 2)
  );
}

// eslint-disable-next-line no-unused-vars
function updateYAML(originalYAMLPath, translatedYAMLPath) {
  const originalYAMLFile = fs.readFileSync(originalYAMLPath, 'utf8');
  const originalYAML = yaml.parse(originalYAMLFile);
  const translYAMLFile = fs.readFileSync(translatedYAMLPath, 'utf8');
  const translYAML = yaml.parse(translYAMLFile);

  const newYAML = updatei18nObj(originalYAML, translYAML);

  fs.writeFileSync(translatedYAMLPath, yaml.stringify(newYAML));
}

// ** using the original English text as default value **
// merges the keys of the originalObj with the ones of the translatedObj,
// in order to keep the translatedObj updated
function updatei18nObj(originalObj, translatedObj) {
  // if the translated object is empty
  if (!translatedObj) {
    return originalObj;
  }
  const newTranslatedObj = {};
  for (var key in originalObj) {
    if (key in translatedObj) {
      newTranslatedObj[key] = translatedObj[key];
    } else {
      newTranslatedObj[key] = originalObj[key];
    }
  }
  return newTranslatedObj;
}

module.exports = {
  updateJSON,
  updateYAML
};
