'use strict';
let nextActivation;
module.exports = function (Schedule) {
  const loopback = require('loopback');
  // Schedule.on('attached',()=>console.log("bit"));
  Schedule.on('attached', scheduleNextPing);
  Schedule.on('set', scheduleNextPing);

  const ds = loopback.createDataSource({
    'baseURL': 'http://localhost:1880/',
    connector: require('loopback-connector-rest'),
    'operations': [
      {
        functions: {
          'setActive': ['date', 'active', 'object'],
        },
        'template': {
          'method': 'POST',
          'url': 'http://localhost:1880/{object:string}/activate',
          'body': {
            'active': '{active:boolean}',
            'date': '{date:string}',
          }
        }
      },
    ],
  });
  let nodeRed = ds.createModel('node');

  function scheduleNextPing() {
    clearTimeout(nextActivation);
    let Type = Schedule.app.models["Domotic-item-type"];
    Type.find(function (err, types) {
      for (let type in types) {
        Schedule.app.models["Domotic-item"].findOne({"where": {"typeId": types[type].id}},
          function (err, item) {
            Schedule.findOne(
              {
                "order": "start ASC",
                "where": {"itemId": item.id},
              },
              function (err, schedule) {
                setTimeout(() => activate(true, types[type].name, schedule.end), schedule.start.getTime() - Date.now());
                setTimeout(() => activate(false, types[type].name, null), schedule.end.getTime() - Date.now());
              }
            )
          });
      }
    });
  };
  Schedule.remoteMethod(
    'nextPing', {
      http: {path: '/next', verb: 'get'},
      returns: {arg: 'result', type: 'string'},
    });

  function activate(value, item, end) {
    nodeRed.setActive(end, value, item);
  }
};

