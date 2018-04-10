module.exports = function (app) {
  var ds = app.dataSources.postgreDev;


  for (var i = 0; i < app.models.length; i++) {
    var model = app.models[i];
    console.log(app.models);
    console.log(model);

    ds.isActual(model, function (err, actual) {
      console.log(err);
      if (!actual) {
        ds.autoupdate(model, function () {
          console.log("Auto-migrated model " + model + " successfully.");
        });
      }
    });


  }
};
