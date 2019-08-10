const Sequelize = require('sequelize');
const PropTypes = require('prop-types');

const Database = require('../database.js');
const Relations = require('../models/relations.js');

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

  const builtModels = {};

  vals.forEach((mdl, idx) => {
    const name = names[idx];
    const attrNames = Object.keys(mdl);

    // Expand SQL types if needed
    const params = attrNames.map((attName) => expandTypes(mdl[attName]));

    // Construct schema + react type shape
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

    // Update built objs
    builtModels[name] = { tableName: name, schema, reactType };
  });

  return builtModels;
};

const BuildDatabase = (models) => {
  // Define the models
  Object.values(models).forEach((model) => {
    model.m = Database.define(model.tableName, model.schema);
  });

  // Build model relations
  Relations.forEach((relation) => {
    const keys = Object.keys(relation);
    if (keys.includes('belongsTo')) {
      const a = models[relation.this].m;
      const b = models[relation.belongsTo].m;
      if (a && b) {
        a.belongsTo(b, { as: relation.as });
      }
    }

    if (keys.includes('belongsToMany')) {
      const a = models[relation.this].m;
      const b = models[relation.belongsToMany].m;
      if (a && b) {
        a.belongsToMany(b, { through: relation.as });
      }
    }
  });

  return { models, database: Database };
}

module.exports = (m) => BuildDatabase(CreateModels(m));
