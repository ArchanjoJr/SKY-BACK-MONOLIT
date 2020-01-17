const Table = require('cli-table');

const printRoutes = (baseUrl, routes) => {
  const table = new Table({ head: ['Path', 'Method'] });
  console.log(`\nAPI for ${baseUrl}`);
  console.log('\n********************************************');
  for (const key of routes) {
    const o = {};
    o[key.method] = key.endpoint;
    table.push(o);
  }
  console.log(table.toString());
  return table;
};

module.exports = {
  printRoutes,
};
