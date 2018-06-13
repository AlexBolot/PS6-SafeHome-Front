/* eslint-disable max-len */
'use strict';

module.exports = function(Item) {
  const loopback = require('loopback');

  const ds = loopback.createDataSource({
    'baseURL': 'http://localhost:1880/',
    connector: require('loopback-connector-rest'),
    'operations': [
      {
        'functions': {
          'TurnHeater': ['value'],
        },
        'template': {
          'method': 'POST',
          'url': 'http://localhost:1880/TurnHeater',
          'body': {'value': '{value:boolean}'},
        },
      },
    ],
  });

  let nodeRed = ds.createModel('nodeRed');

  Item.declareTemp = function(value, callback) {
    Item.findOne({'where': {'typeId': 2}, include: ['schedules']},
      function(err, item) {
        const Issue = Item.app.models.Issue;
        const Task = Item.app.models.Task;
        Issue.create(
          {
            'DateDone': null,
            'Title': 'Temperature trop basse',
            'Description': 'Le thermomètre a détecté une température de moins de 20 degrés',
            'Date': Date.now(),
            'DeclarationDate': Date.now(),
            'IDUrgency': 2,
            'categoryId': 3,
            'IDAuthor': 5,
            'IDStatus': 1,
            'IDLocation': 10,
            'homesId': -1,
            'Picture': '',
          }, function() {
          Issue.find({'where': {'IDAuthor': 5}},
              function(err, issues) {
                const lastIssue = issues[issues.length - 1];
                Task.create({
                  'Text': 'Allumer radiateur',
                  'IDIssue': lastIssue.id,
                  'IDAuthor': 5,
                  'IDAssignee': 2,
                  'done': false,
                });
              });
        });
        callback(null, item);
      });
  };

  Item.activateHeater = function(value, callback) {
    nodeRed.TurnHeater(value, function(err, result) {
      callback(null, err);
    });
  };

  Item.emptyBowl = function(state, callback) {
    let Issue = Item.app.models.Issue;
    let issue = Issue.create(
      {
        'DateDone': null,
        'Title': 'La Gamelle est vide',
        'Description': "Il n'y as plus assé de croquette dans la gamelle du chien",
        'Date': Date.now(),
        'DeclarationDate': Date.now(),
        'IDUrgency': 2,
        'categoryId': 3,
        'IDAuthor': 5,
        'IDStatus': 1,
        'IDLocation': 10,
        'homesId': -1,
        'statusName': 'À Faire',
      }, function() {
      Issue.find({'where': {'IDAuthor': 5}},
          function(err, issues) {
            const lastIssue = issues[issues.length - 1];
            Task.create({
              'Text': 'Remplir la gamelle du chien',
              'IDIssue': lastIssue.id,
              'IDAuthor': 5,
              'IDAssignee': 2,
              'done': false,
            });
          });
    }
    );
  };

  Item.remoteMethod(
    'declareTemp', {
      http: {path: '/thermometer/declare', verb: 'post'},
      accepts: {arg: 'value', type: 'string', http: {source: 'body'}},
      returns: {arg: 'result', type: 'string'},
    });
  Item.remoteMethod(
    'activateHeater', {
      http: {path: '/thermometer/activateHeater', verb: 'post'},
      accepts: {arg: 'value', type: 'string', http: {source: 'body'}},
      returns: {arg: 'result', type: 'boolean'},
    }
  );
  Item.remoteMethod(
    'emptyBowl', {
      http: {
        path: '/bowl/empty',
        verb: 'post',
      },
      accepts: {arg: 'state', type: 'string', http: {source: 'body'}},
      returns: {
        arg: 'result',
        type: 'string',
      },
    }
  );
};
