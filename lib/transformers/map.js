export default (rows) => {
  const result = {};
  const header = rows[0];

  for (let j = 0; j < header.length; j++) {
    for (let i = 1; i < rows.length; i++) {
      result[rows[i][0]] = result[rows[i][0]] || {};

      let value = rows[i][j] || "";
      if (typeof value === "string") {
        value = value.trim();
      }

      result[rows[i][0]][header[j]] = value;
    }
  }

  return {
    files: result,
  };
};
