const Sequelize = require('sequelize');
const PropTypes = require('prop-types');

const expandTypes = (attr) => {
  let sqlType = {};
  // If we have an ENUM type we need to call a special function
  // to expand it properly
  if (attr.type.sql === Sequelize.ENUM) {
    if (!attr.values) {
      console.warn('Model using an ENUM type did not containt any "values"!');
    }
    sqlType.type = attr.type.sql(attr.values || []);
  } else {
    sqlType.type = attr.type.sql;
  }

  sqlType.unique = attr.unique || false;
  sqlType.allowNull = !attr.required;
  sqlType.defaultValue = attr.default || null;

  const propType = sqlType.required ? attr.type.react.isRequired : attr.type.react;

  return { sql: sqlType, propType: attr.type.react };
};

const CreateModels = (models) => {
  const vals = Object.values(models);
  const names = Object.keys(models);

  const built = vals.map((mdl, idx) => {
    const name = names[idx];
    const attrNames = Object.keys(mdl);

    // Expand SQL types if needed
    const params = attrNames.map((attName) => expandTypes(mdl[attName]));

    // Construct schema
    let schema = {};
    let reactShapeObj = {};
    params.forEach((param, idx) => {
      schema[attrNames[idx]] = param.sql;
      reactShapeObj[attrNames[idx]] = param.propType;
    });

    // Inject IDs into the schema
    schema.id = {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    };

    const reactType = PropTypes.exact(reactShapeObj);

    return { tableName: name, schema, reactType };
  });

  return built;
};

module.exports = CreateModels;
