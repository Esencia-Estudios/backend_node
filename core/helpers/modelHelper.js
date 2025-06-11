export const initializeModelGroup = (modelGroup, sequelize) => {
  Object.entries(modelGroup).forEach(([key, value]) => {
    if (key.endsWith("Model") && typeof value.init === "function") {
      const fieldsKey = key.replace("Model", "Fields");
      const fields = modelGroup[fieldsKey];

      if (!fields) {
        console.warn(
          `⚠️  No fields found for model ${key} (expected key: ${fieldsKey})`
        );
        return;
      }

      try {
        console.log(`✅ Initializing model: ${key}`);
        value.init(fields, value.config(sequelize));
      } catch (error) {
        console.error(`❌ Error initializing ${key}:`, error);
      }
    }
  });
};
