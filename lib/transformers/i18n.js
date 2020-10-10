export default (rows) => {
  const result = {};
  const header = rows[0];

  for (let j = 1; j < header.length; j++) {
    result[header[j]] = result[header[j]] || {};

    for (let i = 1; i < rows.length; i++) {
      result[header[j]][rows[i][0]] = rows[i][j];
    }
  }

  return {
    files: result,
  };
};
