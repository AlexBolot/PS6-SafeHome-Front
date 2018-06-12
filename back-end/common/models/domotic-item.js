'use strict';

module.exports = function (Item) {
  Item.declareTemp = function (value, callback) {
    Item.findOne({"where": {"typeId": 2}, include: ["schedules"]},
      function (err, item) {
        var Issue = Item.app.models.Issue;
        var issue = Issue.create(
          {
            "DateDone": null,
            "Title": "Temperature Trop Basse",
            "Description": "Le thermomètre a detecter une température de moins de 20 degrée",
            "Date": Date.now(),
            "DeclarationDate": Date.now(),
            "IDUrgency": 2,
            "categoryId": 3,
            "IDAuthor": 2,
            "IDStatus": 1,
            "IDLocation": 10,
            "homesId": -1,
            "statusName": "À Faire"
          }
        );
        callback(null, item);

      });
  };
  Item.remoteMethod(
    'declareTemp', {
      http: {
        path: '/thermometer/declare',
        verb: 'post'
      },
      accepts: {arg: 'value', type: 'string', http: {source: 'body'}},
      returns: {
        arg: 'result',
        type: 'string'
      }
    }
  )
};
