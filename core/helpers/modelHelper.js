export const initializeModelGroup = (modelGroup, sequelize) => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.entries(modelGroup).forEach(([key, value]) => {
    if (key.endsWith("Model") && typeof value.init === "function") {
      const fieldsKey = key.replace("Model", "Fields");
      const fields = modelGroup[fieldsKey] || {};

      if (!fields) {
        console.warn(`No fields found for model ${key}`);
        return;
      }

      try {
        value.init(fields, value.config(sequelize));
      } catch (error) {
        console.error(`Error inicializando ${key}:`, error);
      }
    }
  });
};
