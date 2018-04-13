'use strict';

module.exports = function (Person) {
  Person.getName = function (id, callback) {
    Person.findById(id, function (err, instance) {
      if (instance != null) {
        var response = instance.username;
        if (response == null) response = callback(null, "NoUserNameCONTACTADMIN_BLAME_THEOS");
        callback(null, response);
      }
      else {

        callback(null, null);
      }
    })
  };
  Person.remoteMethod(
    'getName', {
      http: {
        path: '/name',
        verb: 'get'
      },
      accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
      returns: {
        arg: 'name',
        type: 'string'
      }
    }
  )
};
