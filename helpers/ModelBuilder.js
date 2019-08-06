const Sequelize = require('sequelize');

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
    params.forEach((param, idx) => {
      schema[attrNames[idx]] = param.sql;
    });

    // Inject IDs into the schema
    schema.id = {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    };

    return { tableName: name, schema };
  });

  return built;
};

module.exports = CreateModels;
