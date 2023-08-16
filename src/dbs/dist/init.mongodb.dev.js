'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mongoose = require('mongoose');

var connectionString = "mongodb://localhost:27017/shopDEV";

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);

    this.connect();
  } // connect


  _createClass(Database, [{
    key: "connect",
    value: function connect() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mongo';

      if (type === 'mongo') {
        mongoose.connect(connectionString).then(function (_) {
          return console.log("Connected Mongodb Success");
        })["catch"](function (err) {
          return console.log("Error Connect!");
        });
      } // dev


      if (1 === 1) {
        mongoose.set('debug', true);
        mongoose.set('debug', {
          color: true
        });
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!Database.instance) {
        Database.instance = new Database();
      }

      return Database.instance;
    }
  }]);

  return Database;
}();

var instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;