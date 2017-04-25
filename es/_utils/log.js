function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger(env, prefix) {
    _classCallCheck(this, Logger);

    this.env = env || Logger.DEBUG;
    this.prefix = prefix;
  }

  Logger.prototype.log = function log() {
    if (this.env === Logger.DEBUG) {
      var _console;

      for (var _len = arguments.length, argvs = Array(_len), _key = 0; _key < _len; _key++) {
        argvs[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, [this.prefix].concat(argvs));
    }
  };

  Logger.prototype.info = function info() {
    if (this.env === Logger.DEBUG) {
      var _console2;

      for (var _len2 = arguments.length, argvs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        argvs[_key2] = arguments[_key2];
      }

      (_console2 = console).info.apply(_console2, [this.prefix].concat(argvs));
    }
  };

  Logger.prototype.error = function error() {
    var _console3;

    for (var _len3 = arguments.length, argvs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      argvs[_key3] = arguments[_key3];
    }

    (_console3 = console).log.apply(_console3, [this.prefix].concat(argvs));
  };

  return Logger;
}();

Logger.DEBUG = 'DEBUG';
Logger.PROD = 'PROD';
Logger.DEV = 'DEV';
export default Logger;