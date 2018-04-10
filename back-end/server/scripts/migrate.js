module.exports = function (app) {
  var ds = app.dataSources.postgreDev;
  ds.automigrate();
};
