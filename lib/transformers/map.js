export default (rows) => {
  const result = {};
  const header = rows[0];

  for (let j = 1; j < header.length; j++) {
    for (let i = 1; i < rows.length; i++) {
      result[rows[i][0]] = result[rows[i][0]] || {};
      result[rows[i][0]][header[j]] = rows[i][j];
    }
  }

  return {
    files: result,
  };
};
