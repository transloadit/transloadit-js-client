"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../node_modules/namespace-emitter/index.js
  var require_namespace_emitter = __commonJS({
    "../node_modules/namespace-emitter/index.js"(exports, module) {
      module.exports = function createNamespaceEmitter() {
        var emitter = {};
        var _fns = emitter._fns = {};
        emitter.emit = function emit(event, arg1, arg2, arg3, arg4, arg5, arg6) {
          var toEmit = getListeners(event);
          if (toEmit.length) {
            emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6]);
          }
        };
        emitter.on = function on(event, fn) {
          if (!_fns[event]) {
            _fns[event] = [];
          }
          _fns[event].push(fn);
        };
        emitter.once = function once(event, fn) {
          function one() {
            fn.apply(this, arguments);
            emitter.off(event, one);
          }
          this.on(event, one);
        };
        emitter.off = function off(event, fn) {
          var keep = [];
          if (event && fn) {
            var fns = this._fns[event];
            var i2 = 0;
            var l2 = fns ? fns.length : 0;
            for (i2; i2 < l2; i2++) {
              if (fns[i2] !== fn) {
                keep.push(fns[i2]);
              }
            }
          }
          keep.length ? this._fns[event] = keep : delete this._fns[event];
        };
        function getListeners(e2) {
          var out = _fns[e2] ? _fns[e2] : [];
          var idx = e2.indexOf(":");
          var args = idx === -1 ? [e2] : [e2.substring(0, idx), e2.substring(idx + 1)];
          var keys = Object.keys(_fns);
          var i2 = 0;
          var l2 = keys.length;
          for (i2; i2 < l2; i2++) {
            var key = keys[i2];
            if (key === "*") {
              out = out.concat(_fns[key]);
            }
            if (args.length === 2 && args[0] === key) {
              out = out.concat(_fns[key]);
              break;
            }
          }
          return out;
        }
        function emitAll(e2, fns, args) {
          var i2 = 0;
          var l2 = fns.length;
          for (i2; i2 < l2; i2++) {
            if (!fns[i2])
              break;
            fns[i2].event = e2;
            fns[i2].apply(fns[i2], args);
          }
        }
        return emitter;
      };
    }
  });

  // ../node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "../node_modules/lodash.throttle/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce2(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle4(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce2(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = throttle4;
    }
  });

  // ../node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes = __commonJS({
    "../node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes3(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError(`Expected a number, got ${typeof num}`);
        }
        const neg = num < 0;
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return `${(neg ? "-" : "") + num} B`;
        }
        const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        const unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
        }
        return `${(neg ? "-" : "") + num.toFixed(1)} ${unit}`;
      };
    }
  });

  // ../node_modules/wildcard/index.js
  var require_wildcard = __commonJS({
    "../node_modules/wildcard/index.js"(exports, module) {
      "use strict";
      function WildcardMatcher(text, separator) {
        this.text = text = text || "";
        this.hasWild = ~text.indexOf("*");
        this.separator = separator;
        this.parts = text.split(separator);
      }
      WildcardMatcher.prototype.match = function(input) {
        var matches = true;
        var parts = this.parts;
        var ii;
        var partsCount = parts.length;
        var testParts;
        if (typeof input == "string" || input instanceof String) {
          if (!this.hasWild && this.text != input) {
            matches = false;
          } else {
            testParts = (input || "").split(this.separator);
            for (ii = 0; matches && ii < partsCount; ii++) {
              if (parts[ii] === "*") {
                continue;
              } else if (ii < testParts.length) {
                matches = parts[ii] === testParts[ii];
              } else {
                matches = false;
              }
            }
            matches = matches && testParts;
          }
        } else if (typeof input.splice == "function") {
          matches = [];
          for (ii = input.length; ii--; ) {
            if (this.match(input[ii])) {
              matches[matches.length] = input[ii];
            }
          }
        } else if (typeof input == "object") {
          matches = {};
          for (var key in input) {
            if (this.match(key)) {
              matches[key] = input[key];
            }
          }
        }
        return matches;
      };
      module.exports = function(text, test, separator) {
        var matcher = new WildcardMatcher(text, separator || /[\/\.]/);
        if (typeof test != "undefined") {
          return matcher.match(test);
        }
        return matcher;
      };
    }
  });

  // ../node_modules/mime-match/index.js
  var require_mime_match = __commonJS({
    "../node_modules/mime-match/index.js"(exports, module) {
      var wildcard = require_wildcard();
      var reMimePartSplit = /[\/\+\.]/;
      module.exports = function(target, pattern) {
        function test(pattern2) {
          var result = wildcard(pattern2, target, reMimePartSplit);
          return result && result.length >= 2;
        }
        return pattern ? test(pattern.split(";")[0]) : test;
      };
    }
  });

  // ../node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "../node_modules/classnames/index.js"(exports, module) {
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames3() {
          var classes = [];
          for (var i2 = 0; i2 < arguments.length; i2++) {
            var arg = arguments[i2];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames3.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
                  if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                  }
                }
              } else {
                classes.push(arg.toString());
              }
            }
          }
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames3.default = classNames3;
          module.exports = classNames3;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames3;
          });
        } else {
          window.classNames = classNames3;
        }
      })();
    }
  });

  // ../node_modules/requires-port/index.js
  var require_requires_port = __commonJS({
    "../node_modules/requires-port/index.js"(exports, module) {
      "use strict";
      module.exports = function required(port, protocol) {
        protocol = protocol.split(":")[0];
        port = +port;
        if (!port)
          return false;
        switch (protocol) {
          case "http":
          case "ws":
            return port !== 80;
          case "https":
          case "wss":
            return port !== 443;
          case "ftp":
            return port !== 21;
          case "gopher":
            return port !== 70;
          case "file":
            return false;
        }
        return port !== 0;
      };
    }
  });

  // ../node_modules/querystringify/index.js
  var require_querystringify = __commonJS({
    "../node_modules/querystringify/index.js"(exports) {
      "use strict";
      var has2 = Object.prototype.hasOwnProperty;
      var undef;
      function decode2(input) {
        try {
          return decodeURIComponent(input.replace(/\+/g, " "));
        } catch (e2) {
          return null;
        }
      }
      function encode2(input) {
        try {
          return encodeURIComponent(input);
        } catch (e2) {
          return null;
        }
      }
      function querystring(query) {
        var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
        while (part = parser.exec(query)) {
          var key = decode2(part[1]), value = decode2(part[2]);
          if (key === null || value === null || key in result)
            continue;
          result[key] = value;
        }
        return result;
      }
      function querystringify(obj, prefix) {
        prefix = prefix || "";
        var pairs = [], value, key;
        if ("string" !== typeof prefix)
          prefix = "?";
        for (key in obj) {
          if (has2.call(obj, key)) {
            value = obj[key];
            if (!value && (value === null || value === undef || isNaN(value))) {
              value = "";
            }
            key = encode2(key);
            value = encode2(value);
            if (key === null || value === null)
              continue;
            pairs.push(key + "=" + value);
          }
        }
        return pairs.length ? prefix + pairs.join("&") : "";
      }
      exports.stringify = querystringify;
      exports.parse = querystring;
    }
  });

  // ../node_modules/url-parse/index.js
  var require_url_parse = __commonJS({
    "../node_modules/url-parse/index.js"(exports, module) {
      "use strict";
      var required = require_requires_port();
      var qs = require_querystringify();
      var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
      var CRHTLF = /[\n\r\t]/g;
      var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
      var port = /:\d+$/;
      var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
      var windowsDriveLetter = /^[a-zA-Z]:/;
      function trimLeft(str) {
        return (str ? str : "").toString().replace(controlOrWhitespace, "");
      }
      var rules = [
        ["#", "hash"],
        ["?", "query"],
        function sanitize(address, url) {
          return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
        },
        ["/", "pathname"],
        ["@", "auth", 1],
        [NaN, "host", void 0, 1, 1],
        [/:(\d*)$/, "port", void 0, 1],
        [NaN, "hostname", void 0, 1, 1]
      ];
      var ignore = {
        hash: 1,
        query: 1
      };
      function lolcation(loc) {
        var globalVar;
        if (typeof window !== "undefined")
          globalVar = window;
        else if (typeof global !== "undefined")
          globalVar = global;
        else if (typeof self !== "undefined")
          globalVar = self;
        else
          globalVar = {};
        var location = globalVar.location || {};
        loc = loc || location;
        var finaldestination = {}, type = typeof loc, key;
        if ("blob:" === loc.protocol) {
          finaldestination = new Url(unescape(loc.pathname), {});
        } else if ("string" === type) {
          finaldestination = new Url(loc, {});
          for (key in ignore)
            delete finaldestination[key];
        } else if ("object" === type) {
          for (key in loc) {
            if (key in ignore)
              continue;
            finaldestination[key] = loc[key];
          }
          if (finaldestination.slashes === void 0) {
            finaldestination.slashes = slashes.test(loc.href);
          }
        }
        return finaldestination;
      }
      function isSpecial(scheme) {
        return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
      }
      function extractProtocol(address, location) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        location = location || {};
        var match2 = protocolre.exec(address);
        var protocol = match2[1] ? match2[1].toLowerCase() : "";
        var forwardSlashes = !!match2[2];
        var otherSlashes = !!match2[3];
        var slashesCount = 0;
        var rest;
        if (forwardSlashes) {
          if (otherSlashes) {
            rest = match2[2] + match2[3] + match2[4];
            slashesCount = match2[2].length + match2[3].length;
          } else {
            rest = match2[2] + match2[4];
            slashesCount = match2[2].length;
          }
        } else {
          if (otherSlashes) {
            rest = match2[3] + match2[4];
            slashesCount = match2[3].length;
          } else {
            rest = match2[4];
          }
        }
        if (protocol === "file:") {
          if (slashesCount >= 2) {
            rest = rest.slice(2);
          }
        } else if (isSpecial(protocol)) {
          rest = match2[4];
        } else if (protocol) {
          if (forwardSlashes) {
            rest = rest.slice(2);
          }
        } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
          rest = match2[4];
        }
        return {
          protocol,
          slashes: forwardSlashes || isSpecial(protocol),
          slashesCount,
          rest
        };
      }
      function resolve(relative, base) {
        if (relative === "")
          return base;
        var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i2 = path.length, last = path[i2 - 1], unshift = false, up = 0;
        while (i2--) {
          if (path[i2] === ".") {
            path.splice(i2, 1);
          } else if (path[i2] === "..") {
            path.splice(i2, 1);
            up++;
          } else if (up) {
            if (i2 === 0)
              unshift = true;
            path.splice(i2, 1);
            up--;
          }
        }
        if (unshift)
          path.unshift("");
        if (last === "." || last === "..")
          path.push("");
        return path.join("/");
      }
      function Url(address, location, parser) {
        address = trimLeft(address);
        address = address.replace(CRHTLF, "");
        if (!(this instanceof Url)) {
          return new Url(address, location, parser);
        }
        var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i2 = 0;
        if ("object" !== type && "string" !== type) {
          parser = location;
          location = null;
        }
        if (parser && "function" !== typeof parser)
          parser = qs.parse;
        location = lolcation(location);
        extracted = extractProtocol(address || "", location);
        relative = !extracted.protocol && !extracted.slashes;
        url.slashes = extracted.slashes || relative && location.slashes;
        url.protocol = extracted.protocol || location.protocol || "";
        address = extracted.rest;
        if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
          instructions[3] = [/(.*)/, "pathname"];
        }
        for (; i2 < instructions.length; i2++) {
          instruction = instructions[i2];
          if (typeof instruction === "function") {
            address = instruction(address, url);
            continue;
          }
          parse = instruction[0];
          key = instruction[1];
          if (parse !== parse) {
            url[key] = address;
          } else if ("string" === typeof parse) {
            index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
            if (~index) {
              if ("number" === typeof instruction[2]) {
                url[key] = address.slice(0, index);
                address = address.slice(index + instruction[2]);
              } else {
                url[key] = address.slice(index);
                address = address.slice(0, index);
              }
            }
          } else if (index = parse.exec(address)) {
            url[key] = index[1];
            address = address.slice(0, index.index);
          }
          url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
          if (instruction[4])
            url[key] = url[key].toLowerCase();
        }
        if (parser)
          url.query = parser(url.query);
        if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
          url.pathname = resolve(url.pathname, location.pathname);
        }
        if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
          url.pathname = "/" + url.pathname;
        }
        if (!required(url.port, url.protocol)) {
          url.host = url.hostname;
          url.port = "";
        }
        url.username = url.password = "";
        if (url.auth) {
          index = url.auth.indexOf(":");
          if (~index) {
            url.username = url.auth.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = url.auth.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(url.auth));
          }
          url.auth = url.password ? url.username + ":" + url.password : url.username;
        }
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
      }
      function set(part, value, fn) {
        var url = this;
        switch (part) {
          case "query":
            if ("string" === typeof value && value.length) {
              value = (fn || qs.parse)(value);
            }
            url[part] = value;
            break;
          case "port":
            url[part] = value;
            if (!required(value, url.protocol)) {
              url.host = url.hostname;
              url[part] = "";
            } else if (value) {
              url.host = url.hostname + ":" + value;
            }
            break;
          case "hostname":
            url[part] = value;
            if (url.port)
              value += ":" + url.port;
            url.host = value;
            break;
          case "host":
            url[part] = value;
            if (port.test(value)) {
              value = value.split(":");
              url.port = value.pop();
              url.hostname = value.join(":");
            } else {
              url.hostname = value;
              url.port = "";
            }
            break;
          case "protocol":
            url.protocol = value.toLowerCase();
            url.slashes = !fn;
            break;
          case "pathname":
          case "hash":
            if (value) {
              var char = part === "pathname" ? "/" : "#";
              url[part] = value.charAt(0) !== char ? char + value : value;
            } else {
              url[part] = value;
            }
            break;
          case "username":
          case "password":
            url[part] = encodeURIComponent(value);
            break;
          case "auth":
            var index = value.indexOf(":");
            if (~index) {
              url.username = value.slice(0, index);
              url.username = encodeURIComponent(decodeURIComponent(url.username));
              url.password = value.slice(index + 1);
              url.password = encodeURIComponent(decodeURIComponent(url.password));
            } else {
              url.username = encodeURIComponent(decodeURIComponent(value));
            }
        }
        for (var i2 = 0; i2 < rules.length; i2++) {
          var ins = rules[i2];
          if (ins[4])
            url[ins[1]] = url[ins[1]].toLowerCase();
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
        return url;
      }
      function toString(stringify) {
        if (!stringify || "function" !== typeof stringify)
          stringify = qs.stringify;
        var query, url = this, host = url.host, protocol = url.protocol;
        if (protocol && protocol.charAt(protocol.length - 1) !== ":")
          protocol += ":";
        var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
        if (url.username) {
          result += url.username;
          if (url.password)
            result += ":" + url.password;
          result += "@";
        } else if (url.password) {
          result += ":" + url.password;
          result += "@";
        } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
          result += "@";
        }
        if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
          host += ":";
        }
        result += host + url.pathname;
        query = "object" === typeof url.query ? stringify(url.query) : url.query;
        if (query)
          result += "?" !== query.charAt(0) ? "?" + query : query;
        if (url.hash)
          result += url.hash;
        return result;
      }
      Url.prototype = {
        set,
        toString
      };
      Url.extractProtocol = extractProtocol;
      Url.location = lolcation;
      Url.trimLeft = trimLeft;
      Url.qs = qs;
      module.exports = Url;
    }
  });

  // ../packages/@uppy/utils/lib/hasProperty.js
  function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  // ../packages/@uppy/utils/lib/Translator.js
  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id = 0;
  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }
  function insertReplacement(source, rx, replacement) {
    const newParts = [];
    source.forEach((chunk) => {
      if (typeof chunk !== "string") {
        return newParts.push(chunk);
      }
      return rx[Symbol.split](chunk).forEach((raw, i2, list) => {
        if (raw !== "") {
          newParts.push(raw);
        }
        if (i2 < list.length - 1) {
          newParts.push(replacement);
        }
      });
    });
    return newParts;
  }
  function interpolate(phrase, options) {
    const dollarRegex = /\$/g;
    const dollarBillsYall = "$$$$";
    let interpolated = [phrase];
    if (options == null)
      return interpolated;
    for (const arg of Object.keys(options)) {
      if (arg !== "_") {
        let replacement = options[arg];
        if (typeof replacement === "string") {
          replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
        }
        interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
      }
    }
    return interpolated;
  }
  var _apply = /* @__PURE__ */ _classPrivateFieldLooseKey("apply");
  var Translator = class {
    constructor(locales) {
      Object.defineProperty(this, _apply, {
        value: _apply2
      });
      this.locale = {
        strings: {},
        pluralize(n2) {
          if (n2 === 1) {
            return 0;
          }
          return 1;
        }
      };
      if (Array.isArray(locales)) {
        locales.forEach(_classPrivateFieldLooseBase(this, _apply)[_apply], this);
      } else {
        _classPrivateFieldLooseBase(this, _apply)[_apply](locales);
      }
    }
    translate(key, options) {
      return this.translateArray(key, options).join("");
    }
    translateArray(key, options) {
      if (!has(this.locale.strings, key)) {
        throw new Error(`missing string: ${key}`);
      }
      const string = this.locale.strings[key];
      const hasPluralForms = typeof string === "object";
      if (hasPluralForms) {
        if (options && typeof options.smart_count !== "undefined") {
          const plural = this.locale.pluralize(options.smart_count);
          return interpolate(string[plural], options);
        }
        throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
      }
      return interpolate(string, options);
    }
  };
  function _apply2(locale) {
    if (!(locale != null && locale.strings)) {
      return;
    }
    const prevLocale = this.locale;
    this.locale = {
      ...prevLocale,
      strings: {
        ...prevLocale.strings,
        ...locale.strings
      }
    };
    this.locale.pluralize = locale.pluralize || prevLocale.pluralize;
  }

  // ../packages/@uppy/core/lib/Uppy.js
  var import_namespace_emitter = __toESM(require_namespace_emitter(), 1);

  // ../node_modules/nanoid/non-secure/index.js
  var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  var nanoid = function(size) {
    if (size === void 0) {
      size = 21;
    }
    let id10 = "";
    let i2 = size;
    while (i2--) {
      id10 += urlAlphabet[Math.random() * 64 | 0];
    }
    return id10;
  };

  // ../packages/@uppy/core/lib/Uppy.js
  var import_lodash = __toESM(require_lodash(), 1);

  // ../packages/@uppy/store-default/lib/index.js
  function _classPrivateFieldLooseBase2(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id2 = 0;
  function _classPrivateFieldLooseKey2(name) {
    return "__private_" + id2++ + "_" + name;
  }
  var packageJson = {
    "version": "3.0.2"
  };
  var _callbacks = /* @__PURE__ */ _classPrivateFieldLooseKey2("callbacks");
  var _publish = /* @__PURE__ */ _classPrivateFieldLooseKey2("publish");
  var DefaultStore = class {
    constructor() {
      Object.defineProperty(this, _publish, {
        value: _publish2
      });
      Object.defineProperty(this, _callbacks, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      this.state = {};
    }
    getState() {
      return this.state;
    }
    setState(patch) {
      const prevState = {
        ...this.state
      };
      const nextState = {
        ...this.state,
        ...patch
      };
      this.state = nextState;
      _classPrivateFieldLooseBase2(this, _publish)[_publish](prevState, nextState, patch);
    }
    subscribe(listener) {
      _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].add(listener);
      return () => {
        _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].delete(listener);
      };
    }
  };
  function _publish2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].forEach((listener) => {
      listener(...args);
    });
  }
  DefaultStore.VERSION = packageJson.version;
  var lib_default = DefaultStore;

  // ../packages/@uppy/utils/lib/getFileNameAndExtension.js
  function getFileNameAndExtension(fullFileName) {
    const lastDot = fullFileName.lastIndexOf(".");
    if (lastDot === -1 || lastDot === fullFileName.length - 1) {
      return {
        name: fullFileName,
        extension: void 0
      };
    }
    return {
      name: fullFileName.slice(0, lastDot),
      extension: fullFileName.slice(lastDot + 1)
    };
  }

  // ../packages/@uppy/utils/lib/mimeTypes.js
  var mimeTypes_default = {
    md: "text/markdown",
    markdown: "text/markdown",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    svg: "image/svg+xml",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heif",
    yaml: "text/yaml",
    yml: "text/yaml",
    csv: "text/csv",
    tsv: "text/tab-separated-values",
    tab: "text/tab-separated-values",
    avi: "video/x-msvideo",
    mks: "video/x-matroska",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    dicom: "application/dicom",
    doc: "application/msword",
    docm: "application/vnd.ms-word.document.macroenabled.12",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    dot: "application/msword",
    dotm: "application/vnd.ms-word.template.macroenabled.12",
    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    xla: "application/vnd.ms-excel",
    xlam: "application/vnd.ms-excel.addin.macroenabled.12",
    xlc: "application/vnd.ms-excel",
    xlf: "application/x-xliff+xml",
    xlm: "application/vnd.ms-excel",
    xls: "application/vnd.ms-excel",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xlt: "application/vnd.ms-excel",
    xltm: "application/vnd.ms-excel.template.macroenabled.12",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    xlw: "application/vnd.ms-excel",
    txt: "text/plain",
    text: "text/plain",
    conf: "text/plain",
    log: "text/plain",
    pdf: "application/pdf",
    zip: "application/zip",
    "7z": "application/x-7z-compressed",
    rar: "application/x-rar-compressed",
    tar: "application/x-tar",
    gz: "application/gzip",
    dmg: "application/x-apple-diskimage"
  };

  // ../packages/@uppy/utils/lib/getFileType.js
  function getFileType(file) {
    var _getFileNameAndExtens;
    if (file.type)
      return file.type;
    const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
    if (fileExtension && fileExtension in mimeTypes_default) {
      return mimeTypes_default[fileExtension];
    }
    return "application/octet-stream";
  }

  // ../packages/@uppy/utils/lib/generateFileID.js
  function encodeCharacter(character) {
    return character.charCodeAt(0).toString(32);
  }
  function encodeFilename(name) {
    let suffix = "";
    return name.replace(/[^A-Z0-9]/ig, (character) => {
      suffix += `-${encodeCharacter(character)}`;
      return "/";
    }) + suffix;
  }
  function generateFileID(file) {
    let id10 = "uppy";
    if (typeof file.name === "string") {
      id10 += `-${encodeFilename(file.name.toLowerCase())}`;
    }
    if (file.type !== void 0) {
      id10 += `-${file.type}`;
    }
    if (file.meta && typeof file.meta.relativePath === "string") {
      id10 += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
    }
    if (file.data.size !== void 0) {
      id10 += `-${file.data.size}`;
    }
    if (file.data.lastModified !== void 0) {
      id10 += `-${file.data.lastModified}`;
    }
    return id10;
  }

  // ../packages/@uppy/core/lib/supportsUploadProgress.js
  function supportsUploadProgress(userAgent) {
    if (userAgent == null && typeof navigator !== "undefined") {
      userAgent = navigator.userAgent;
    }
    if (!userAgent)
      return true;
    const m2 = /Edge\/(\d+\.\d+)/.exec(userAgent);
    if (!m2)
      return true;
    const edgeVersion = m2[1];
    let [major, minor] = edgeVersion.split(".");
    major = parseInt(major, 10);
    minor = parseInt(minor, 10);
    if (major < 15 || major === 15 && minor < 15063) {
      return true;
    }
    if (major > 18 || major === 18 && minor >= 18218) {
      return true;
    }
    return false;
  }

  // ../packages/@uppy/core/lib/getFileName.js
  function getFileName(fileType, fileDescriptor) {
    if (fileDescriptor.name) {
      return fileDescriptor.name;
    }
    if (fileType.split("/")[0] === "image") {
      return `${fileType.split("/")[0]}.${fileType.split("/")[1]}`;
    }
    return "noname";
  }

  // ../packages/@uppy/utils/lib/getTimeStamp.js
  function pad(number) {
    return number < 10 ? `0${number}` : number.toString();
  }
  function getTimeStamp() {
    const date = new Date();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  // ../packages/@uppy/core/lib/loggers.js
  var justErrorsLogger = {
    debug: () => {
    },
    warn: () => {
    },
    error: function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
    }
  };
  var debugLogger = {
    debug: function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
    },
    warn: function() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
    },
    error: function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
    }
  };

  // ../packages/@uppy/core/lib/Restricter.js
  var import_prettier_bytes = __toESM(require_prettierBytes(), 1);
  var import_mime_match = __toESM(require_mime_match(), 1);
  var defaultOptions = {
    maxFileSize: null,
    minFileSize: null,
    maxTotalFileSize: null,
    maxNumberOfFiles: null,
    minNumberOfFiles: null,
    allowedFileTypes: null,
    requiredMetaFields: []
  };
  var RestrictionError = class extends Error {
    constructor() {
      super(...arguments);
      this.isRestriction = true;
    }
  };
  var Restricter = class {
    constructor(getOpts, i18n) {
      this.i18n = i18n;
      this.getOpts = () => {
        const opts = getOpts();
        if (opts.restrictions.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
          throw new TypeError("`restrictions.allowedFileTypes` must be an array");
        }
        return opts;
      };
    }
    validate(file, files) {
      const {
        maxFileSize,
        minFileSize,
        maxTotalFileSize,
        maxNumberOfFiles,
        allowedFileTypes
      } = this.getOpts().restrictions;
      if (maxNumberOfFiles) {
        const nonGhostFiles = files.filter((f2) => !f2.isGhost);
        if (nonGhostFiles.length + 1 > maxNumberOfFiles) {
          throw new RestrictionError(`${this.i18n("youCanOnlyUploadX", {
            smart_count: maxNumberOfFiles
          })}`);
        }
      }
      if (allowedFileTypes) {
        const isCorrectFileType = allowedFileTypes.some((type) => {
          if (type.includes("/")) {
            if (!file.type)
              return false;
            return (0, import_mime_match.default)(file.type.replace(/;.*?$/, ""), type);
          }
          if (type[0] === "." && file.extension) {
            return file.extension.toLowerCase() === type.slice(1).toLowerCase();
          }
          return false;
        });
        if (!isCorrectFileType) {
          const allowedFileTypesString = allowedFileTypes.join(", ");
          throw new RestrictionError(this.i18n("youCanOnlyUploadFileTypes", {
            types: allowedFileTypesString
          }));
        }
      }
      if (maxTotalFileSize && file.size != null) {
        const totalFilesSize = files.reduce((total, f2) => total + f2.size, file.size);
        if (totalFilesSize > maxTotalFileSize) {
          throw new RestrictionError(this.i18n("exceedsSize", {
            size: (0, import_prettier_bytes.default)(maxTotalFileSize),
            file: file.name
          }));
        }
      }
      if (maxFileSize && file.size != null && file.size > maxFileSize) {
        throw new RestrictionError(this.i18n("exceedsSize", {
          size: (0, import_prettier_bytes.default)(maxFileSize),
          file: file.name
        }));
      }
      if (minFileSize && file.size != null && file.size < minFileSize) {
        throw new RestrictionError(this.i18n("inferiorSize", {
          size: (0, import_prettier_bytes.default)(minFileSize)
        }));
      }
    }
    validateMinNumberOfFiles(files) {
      const {
        minNumberOfFiles
      } = this.getOpts().restrictions;
      if (Object.keys(files).length < minNumberOfFiles) {
        throw new RestrictionError(this.i18n("youHaveToAtLeastSelectX", {
          smart_count: minNumberOfFiles
        }));
      }
    }
    getMissingRequiredMetaFields(file) {
      const error = new RestrictionError(this.i18n("missingRequiredMetaFieldOnFile", {
        fileName: file.name
      }));
      const {
        requiredMetaFields
      } = this.getOpts().restrictions;
      const missingFields = [];
      for (const field of requiredMetaFields) {
        if (!Object.hasOwn(file.meta, field) || file.meta[field] === "") {
          missingFields.push(field);
        }
      }
      return {
        missingFields,
        error
      };
    }
  };

  // ../packages/@uppy/core/lib/locale.js
  var locale_default = {
    strings: {
      addBulkFilesFailed: {
        0: "Failed to add %{smart_count} file due to an internal error",
        1: "Failed to add %{smart_count} files due to internal errors"
      },
      youCanOnlyUploadX: {
        0: "You can only upload %{smart_count} file",
        1: "You can only upload %{smart_count} files"
      },
      youHaveToAtLeastSelectX: {
        0: "You have to select at least %{smart_count} file",
        1: "You have to select at least %{smart_count} files"
      },
      exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
      missingRequiredMetaField: "Missing required meta fields",
      missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
      inferiorSize: "This file is smaller than the allowed size of %{size}",
      youCanOnlyUploadFileTypes: "You can only upload: %{types}",
      noMoreFilesAllowed: "Cannot add more files",
      noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
      companionError: "Connection with Companion failed",
      authAborted: "Authentication aborted",
      companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
      failedToUpload: "Failed to upload %{file}",
      noInternetConnection: "No Internet connection",
      connectedToInternet: "Connected to the Internet",
      noFilesFound: "You have no files or folders here",
      selectX: {
        0: "Select %{smart_count}",
        1: "Select %{smart_count}"
      },
      allFilesFromFolderNamed: "All files from folder %{name}",
      openFolderNamed: "Open folder %{name}",
      cancel: "Cancel",
      logOut: "Log out",
      filter: "Filter",
      resetFilter: "Reset filter",
      loading: "Loading...",
      authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
      authenticateWith: "Connect to %{pluginName}",
      signInWithGoogle: "Sign in with Google",
      searchImages: "Search for images",
      enterTextToSearch: "Enter text to search for images",
      search: "Search",
      emptyFolderAdded: "No files were added from empty folder",
      folderAlreadyAdded: 'The folder "%{folder}" was already added',
      folderAdded: {
        0: "Added %{smart_count} file from %{folder}",
        1: "Added %{smart_count} files from %{folder}"
      }
    }
  };

  // ../packages/@uppy/core/lib/Uppy.js
  var _Symbol$for;
  var _Symbol$for2;
  function _classPrivateFieldLooseBase3(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id3 = 0;
  function _classPrivateFieldLooseKey3(name) {
    return "__private_" + id3++ + "_" + name;
  }
  var packageJson2 = {
    "version": "3.1.1"
  };
  var _plugins = /* @__PURE__ */ _classPrivateFieldLooseKey3("plugins");
  var _restricter = /* @__PURE__ */ _classPrivateFieldLooseKey3("restricter");
  var _storeUnsubscribe = /* @__PURE__ */ _classPrivateFieldLooseKey3("storeUnsubscribe");
  var _emitter = /* @__PURE__ */ _classPrivateFieldLooseKey3("emitter");
  var _preProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("preProcessors");
  var _uploaders = /* @__PURE__ */ _classPrivateFieldLooseKey3("uploaders");
  var _postProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("postProcessors");
  var _informAndEmit = /* @__PURE__ */ _classPrivateFieldLooseKey3("informAndEmit");
  var _checkRequiredMetaFieldsOnFile = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFieldsOnFile");
  var _checkRequiredMetaFields = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFields");
  var _assertNewUploadAllowed = /* @__PURE__ */ _classPrivateFieldLooseKey3("assertNewUploadAllowed");
  var _checkAndCreateFileStateObject = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkAndCreateFileStateObject");
  var _startIfAutoProceed = /* @__PURE__ */ _classPrivateFieldLooseKey3("startIfAutoProceed");
  var _addListeners = /* @__PURE__ */ _classPrivateFieldLooseKey3("addListeners");
  var _updateOnlineStatus = /* @__PURE__ */ _classPrivateFieldLooseKey3("updateOnlineStatus");
  var _createUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("createUpload");
  var _getUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("getUpload");
  var _removeUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("removeUpload");
  var _runUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("runUpload");
  _Symbol$for = Symbol.for("uppy test: getPlugins");
  _Symbol$for2 = Symbol.for("uppy test: createUpload");
  var Uppy = class {
    constructor(_opts) {
      Object.defineProperty(this, _runUpload, {
        value: _runUpload2
      });
      Object.defineProperty(this, _removeUpload, {
        value: _removeUpload2
      });
      Object.defineProperty(this, _getUpload, {
        value: _getUpload2
      });
      Object.defineProperty(this, _createUpload, {
        value: _createUpload2
      });
      Object.defineProperty(this, _addListeners, {
        value: _addListeners2
      });
      Object.defineProperty(this, _startIfAutoProceed, {
        value: _startIfAutoProceed2
      });
      Object.defineProperty(this, _checkAndCreateFileStateObject, {
        value: _checkAndCreateFileStateObject2
      });
      Object.defineProperty(this, _assertNewUploadAllowed, {
        value: _assertNewUploadAllowed2
      });
      Object.defineProperty(this, _checkRequiredMetaFields, {
        value: _checkRequiredMetaFields2
      });
      Object.defineProperty(this, _checkRequiredMetaFieldsOnFile, {
        value: _checkRequiredMetaFieldsOnFile2
      });
      Object.defineProperty(this, _informAndEmit, {
        value: _informAndEmit2
      });
      Object.defineProperty(this, _plugins, {
        writable: true,
        value: /* @__PURE__ */ Object.create(null)
      });
      Object.defineProperty(this, _restricter, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _storeUnsubscribe, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _emitter, {
        writable: true,
        value: (0, import_namespace_emitter.default)()
      });
      Object.defineProperty(this, _preProcessors, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      Object.defineProperty(this, _uploaders, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      Object.defineProperty(this, _postProcessors, {
        writable: true,
        value: /* @__PURE__ */ new Set()
      });
      Object.defineProperty(this, _updateOnlineStatus, {
        writable: true,
        value: this.updateOnlineStatus.bind(this)
      });
      this.defaultLocale = locale_default;
      const defaultOptions4 = {
        id: "uppy",
        autoProceed: false,
        allowMultipleUploadBatches: true,
        debug: false,
        restrictions: defaultOptions,
        meta: {},
        onBeforeFileAdded: (currentFile) => currentFile,
        onBeforeUpload: (files) => files,
        store: new lib_default(),
        logger: justErrorsLogger,
        infoTimeout: 5e3
      };
      this.opts = {
        ...defaultOptions4,
        ..._opts,
        restrictions: {
          ...defaultOptions4.restrictions,
          ..._opts && _opts.restrictions
        }
      };
      if (_opts && _opts.logger && _opts.debug) {
        this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning");
      } else if (_opts && _opts.debug) {
        this.opts.logger = debugLogger;
      }
      this.log(`Using Core v${this.constructor.VERSION}`);
      this.i18nInit();
      this.calculateProgress = (0, import_lodash.default)(this.calculateProgress.bind(this), 500, {
        leading: true,
        trailing: true
      });
      this.store = this.opts.store;
      this.setState({
        plugins: {},
        files: {},
        currentUploads: {},
        allowNewUpload: true,
        capabilities: {
          uploadProgress: supportsUploadProgress(),
          individualCancellation: true,
          resumableUploads: false
        },
        totalProgress: 0,
        meta: {
          ...this.opts.meta
        },
        info: [],
        recoveredState: null
      });
      _classPrivateFieldLooseBase3(this, _restricter)[_restricter] = new Restricter(() => this.opts, this.i18n);
      _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe] = this.store.subscribe((prevState, nextState, patch) => {
        this.emit("state-update", prevState, nextState, patch);
        this.updateAll(nextState);
      });
      if (this.opts.debug && typeof window !== "undefined") {
        window[this.opts.id] = this;
      }
      _classPrivateFieldLooseBase3(this, _addListeners)[_addListeners]();
    }
    emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].emit(event, ...args);
    }
    on(event, callback) {
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].on(event, callback);
      return this;
    }
    once(event, callback) {
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].once(event, callback);
      return this;
    }
    off(event, callback) {
      _classPrivateFieldLooseBase3(this, _emitter)[_emitter].off(event, callback);
      return this;
    }
    updateAll(state) {
      this.iteratePlugins((plugin) => {
        plugin.update(state);
      });
    }
    setState(patch) {
      this.store.setState(patch);
    }
    getState() {
      return this.store.getState();
    }
    setFileState(fileID, state) {
      if (!this.getState().files[fileID]) {
        throw new Error(`Can\u2019t set state for ${fileID} (the file could have been removed)`);
      }
      this.setState({
        files: {
          ...this.getState().files,
          [fileID]: {
            ...this.getState().files[fileID],
            ...state
          }
        }
      });
    }
    i18nInit() {
      const translator = new Translator([this.defaultLocale, this.opts.locale]);
      this.i18n = translator.translate.bind(translator);
      this.i18nArray = translator.translateArray.bind(translator);
      this.locale = translator.locale;
    }
    setOptions(newOpts) {
      this.opts = {
        ...this.opts,
        ...newOpts,
        restrictions: {
          ...this.opts.restrictions,
          ...newOpts && newOpts.restrictions
        }
      };
      if (newOpts.meta) {
        this.setMeta(newOpts.meta);
      }
      this.i18nInit();
      if (newOpts.locale) {
        this.iteratePlugins((plugin) => {
          plugin.setOptions();
        });
      }
      this.setState();
    }
    resetProgress() {
      const defaultProgress = {
        percentage: 0,
        bytesUploaded: 0,
        uploadComplete: false,
        uploadStarted: null
      };
      const files = {
        ...this.getState().files
      };
      const updatedFiles = {};
      Object.keys(files).forEach((fileID) => {
        updatedFiles[fileID] = {
          ...files[fileID],
          progress: {
            ...files[fileID].progress,
            ...defaultProgress
          }
        };
      });
      this.setState({
        files: updatedFiles,
        totalProgress: 0,
        allowNewUpload: true,
        error: null,
        recoveredState: null
      });
      this.emit("reset-progress");
    }
    addPreProcessor(fn) {
      _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].add(fn);
    }
    removePreProcessor(fn) {
      return _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].delete(fn);
    }
    addPostProcessor(fn) {
      _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].add(fn);
    }
    removePostProcessor(fn) {
      return _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].delete(fn);
    }
    addUploader(fn) {
      _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].add(fn);
    }
    removeUploader(fn) {
      return _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].delete(fn);
    }
    setMeta(data) {
      const updatedMeta = {
        ...this.getState().meta,
        ...data
      };
      const updatedFiles = {
        ...this.getState().files
      };
      Object.keys(updatedFiles).forEach((fileID) => {
        updatedFiles[fileID] = {
          ...updatedFiles[fileID],
          meta: {
            ...updatedFiles[fileID].meta,
            ...data
          }
        };
      });
      this.log("Adding metadata:");
      this.log(data);
      this.setState({
        meta: updatedMeta,
        files: updatedFiles
      });
    }
    setFileMeta(fileID, data) {
      const updatedFiles = {
        ...this.getState().files
      };
      if (!updatedFiles[fileID]) {
        this.log("Was trying to set metadata for a file that has been removed: ", fileID);
        return;
      }
      const newMeta = {
        ...updatedFiles[fileID].meta,
        ...data
      };
      updatedFiles[fileID] = {
        ...updatedFiles[fileID],
        meta: newMeta
      };
      this.setState({
        files: updatedFiles
      });
    }
    getFile(fileID) {
      return this.getState().files[fileID];
    }
    getFiles() {
      const {
        files
      } = this.getState();
      return Object.values(files);
    }
    getObjectOfFilesPerState() {
      const {
        files: filesObject,
        totalProgress,
        error
      } = this.getState();
      const files = Object.values(filesObject);
      const inProgressFiles = files.filter((_ref) => {
        let {
          progress
        } = _ref;
        return !progress.uploadComplete && progress.uploadStarted;
      });
      const newFiles = files.filter((file) => !file.progress.uploadStarted);
      const startedFiles = files.filter((file) => file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess);
      const uploadStartedFiles = files.filter((file) => file.progress.uploadStarted);
      const pausedFiles = files.filter((file) => file.isPaused);
      const completeFiles = files.filter((file) => file.progress.uploadComplete);
      const erroredFiles = files.filter((file) => file.error);
      const inProgressNotPausedFiles = inProgressFiles.filter((file) => !file.isPaused);
      const processingFiles = files.filter((file) => file.progress.preprocess || file.progress.postprocess);
      return {
        newFiles,
        startedFiles,
        uploadStartedFiles,
        pausedFiles,
        completeFiles,
        erroredFiles,
        inProgressFiles,
        inProgressNotPausedFiles,
        processingFiles,
        isUploadStarted: uploadStartedFiles.length > 0,
        isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
        isAllErrored: !!error && erroredFiles.length === files.length,
        isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
        isUploadInProgress: inProgressFiles.length > 0,
        isSomeGhost: files.some((file) => file.isGhost)
      };
    }
    validateRestrictions(file, files) {
      if (files === void 0) {
        files = this.getFiles();
      }
      try {
        _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(file, files);
      } catch (err) {
        return err;
      }
      return null;
    }
    checkIfFileAlreadyExists(fileID) {
      const {
        files
      } = this.getState();
      if (files[fileID] && !files[fileID].isGhost) {
        return true;
      }
      return false;
    }
    addFile(file) {
      _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed](file);
      const {
        files
      } = this.getState();
      let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, file);
      if (files[newFile.id] && files[newFile.id].isGhost) {
        newFile = {
          ...files[newFile.id],
          data: file.data,
          isGhost: false
        };
        this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
      }
      this.setState({
        files: {
          ...files,
          [newFile.id]: newFile
        }
      });
      this.emit("file-added", newFile);
      this.emit("files-added", [newFile]);
      this.log(`Added file: ${newFile.name}, ${newFile.id}, mime type: ${newFile.type}`);
      _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
      return newFile.id;
    }
    addFiles(fileDescriptors) {
      _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed]();
      const files = {
        ...this.getState().files
      };
      const newFiles = [];
      const errors = [];
      for (let i2 = 0; i2 < fileDescriptors.length; i2++) {
        try {
          let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, fileDescriptors[i2]);
          if (files[newFile.id] && files[newFile.id].isGhost) {
            newFile = {
              ...files[newFile.id],
              data: fileDescriptors[i2].data,
              isGhost: false
            };
            this.log(`Replaced blob in a ghost file: ${newFile.name}, ${newFile.id}`);
          }
          files[newFile.id] = newFile;
          newFiles.push(newFile);
        } catch (err) {
          if (!err.isRestriction) {
            errors.push(err);
          }
        }
      }
      this.setState({
        files
      });
      newFiles.forEach((newFile) => {
        this.emit("file-added", newFile);
      });
      this.emit("files-added", newFiles);
      if (newFiles.length > 5) {
        this.log(`Added batch of ${newFiles.length} files`);
      } else {
        Object.keys(newFiles).forEach((fileID) => {
          this.log(`Added file: ${newFiles[fileID].name}
 id: ${newFiles[fileID].id}
 type: ${newFiles[fileID].type}`);
        });
      }
      if (newFiles.length > 0) {
        _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
      }
      if (errors.length > 0) {
        let message = "Multiple errors occurred while adding files:\n";
        errors.forEach((subError) => {
          message += `
 * ${subError.message}`;
        });
        this.info({
          message: this.i18n("addBulkFilesFailed", {
            smart_count: errors.length
          }),
          details: message
        }, "error", this.opts.infoTimeout);
        if (typeof AggregateError === "function") {
          throw new AggregateError(errors, message);
        } else {
          const err = new Error(message);
          err.errors = errors;
          throw err;
        }
      }
    }
    removeFiles(fileIDs, reason) {
      const {
        files,
        currentUploads
      } = this.getState();
      const updatedFiles = {
        ...files
      };
      const updatedUploads = {
        ...currentUploads
      };
      const removedFiles = /* @__PURE__ */ Object.create(null);
      fileIDs.forEach((fileID) => {
        if (files[fileID]) {
          removedFiles[fileID] = files[fileID];
          delete updatedFiles[fileID];
        }
      });
      function fileIsNotRemoved(uploadFileID) {
        return removedFiles[uploadFileID] === void 0;
      }
      Object.keys(updatedUploads).forEach((uploadID) => {
        const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
        if (newFileIDs.length === 0) {
          delete updatedUploads[uploadID];
          return;
        }
        const {
          capabilities
        } = this.getState();
        if (newFileIDs.length !== currentUploads[uploadID].fileIDs.length && !capabilities.individualCancellation) {
          throw new Error("individualCancellation is disabled");
        }
        updatedUploads[uploadID] = {
          ...currentUploads[uploadID],
          fileIDs: newFileIDs
        };
      });
      const stateUpdate = {
        currentUploads: updatedUploads,
        files: updatedFiles
      };
      if (Object.keys(updatedFiles).length === 0) {
        stateUpdate.allowNewUpload = true;
        stateUpdate.error = null;
        stateUpdate.recoveredState = null;
      }
      this.setState(stateUpdate);
      this.calculateTotalProgress();
      const removedFileIDs = Object.keys(removedFiles);
      removedFileIDs.forEach((fileID) => {
        this.emit("file-removed", removedFiles[fileID], reason);
      });
      if (removedFileIDs.length > 5) {
        this.log(`Removed ${removedFileIDs.length} files`);
      } else {
        this.log(`Removed files: ${removedFileIDs.join(", ")}`);
      }
    }
    removeFile(fileID, reason) {
      if (reason === void 0) {
        reason = null;
      }
      this.removeFiles([fileID], reason);
    }
    pauseResume(fileID) {
      if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).uploadComplete) {
        return void 0;
      }
      const wasPaused = this.getFile(fileID).isPaused || false;
      const isPaused = !wasPaused;
      this.setFileState(fileID, {
        isPaused
      });
      this.emit("upload-pause", fileID, isPaused);
      return isPaused;
    }
    pauseAll() {
      const updatedFiles = {
        ...this.getState().files
      };
      const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
        return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
      });
      inProgressUpdatedFiles.forEach((file) => {
        const updatedFile = {
          ...updatedFiles[file],
          isPaused: true
        };
        updatedFiles[file] = updatedFile;
      });
      this.setState({
        files: updatedFiles
      });
      this.emit("pause-all");
    }
    resumeAll() {
      const updatedFiles = {
        ...this.getState().files
      };
      const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
        return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
      });
      inProgressUpdatedFiles.forEach((file) => {
        const updatedFile = {
          ...updatedFiles[file],
          isPaused: false,
          error: null
        };
        updatedFiles[file] = updatedFile;
      });
      this.setState({
        files: updatedFiles
      });
      this.emit("resume-all");
    }
    retryAll() {
      const updatedFiles = {
        ...this.getState().files
      };
      const filesToRetry = Object.keys(updatedFiles).filter((file) => {
        return updatedFiles[file].error;
      });
      filesToRetry.forEach((file) => {
        const updatedFile = {
          ...updatedFiles[file],
          isPaused: false,
          error: null
        };
        updatedFiles[file] = updatedFile;
      });
      this.setState({
        files: updatedFiles,
        error: null
      });
      this.emit("retry-all", filesToRetry);
      if (filesToRetry.length === 0) {
        return Promise.resolve({
          successful: [],
          failed: []
        });
      }
      const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](filesToRetry, {
        forceAllowNewUpload: true
      });
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }
    cancelAll(_temp) {
      let {
        reason = "user"
      } = _temp === void 0 ? {} : _temp;
      this.emit("cancel-all", {
        reason
      });
      if (reason === "user") {
        const {
          files
        } = this.getState();
        const fileIDs = Object.keys(files);
        if (fileIDs.length) {
          this.removeFiles(fileIDs, "cancel-all");
        }
        this.setState({
          totalProgress: 0,
          error: null,
          recoveredState: null
        });
      }
    }
    retryUpload(fileID) {
      this.setFileState(fileID, {
        error: null,
        isPaused: false
      });
      this.emit("upload-retry", fileID);
      const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload]([fileID], {
        forceAllowNewUpload: true
      });
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }
    logout() {
      this.iteratePlugins((plugin) => {
        if (plugin.provider && plugin.provider.logout) {
          plugin.provider.logout();
        }
      });
    }
    calculateProgress(file, data) {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const canHavePercentage = Number.isFinite(data.bytesTotal) && data.bytesTotal > 0;
      this.setFileState(file.id, {
        progress: {
          ...this.getFile(file.id).progress,
          bytesUploaded: data.bytesUploaded,
          bytesTotal: data.bytesTotal,
          percentage: canHavePercentage ? Math.round(data.bytesUploaded / data.bytesTotal * 100) : 0
        }
      });
      this.calculateTotalProgress();
    }
    calculateTotalProgress() {
      const files = this.getFiles();
      const inProgress = files.filter((file) => {
        return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
      });
      if (inProgress.length === 0) {
        this.emit("progress", 0);
        this.setState({
          totalProgress: 0
        });
        return;
      }
      const sizedFiles = inProgress.filter((file) => file.progress.bytesTotal != null);
      const unsizedFiles = inProgress.filter((file) => file.progress.bytesTotal == null);
      if (sizedFiles.length === 0) {
        const progressMax = inProgress.length * 100;
        const currentProgress = unsizedFiles.reduce((acc, file) => {
          return acc + file.progress.percentage;
        }, 0);
        const totalProgress2 = Math.round(currentProgress / progressMax * 100);
        this.setState({
          totalProgress: totalProgress2
        });
        return;
      }
      let totalSize = sizedFiles.reduce((acc, file) => {
        return acc + file.progress.bytesTotal;
      }, 0);
      const averageSize = totalSize / sizedFiles.length;
      totalSize += averageSize * unsizedFiles.length;
      let uploadedSize = 0;
      sizedFiles.forEach((file) => {
        uploadedSize += file.progress.bytesUploaded;
      });
      unsizedFiles.forEach((file) => {
        uploadedSize += averageSize * (file.progress.percentage || 0) / 100;
      });
      let totalProgress = totalSize === 0 ? 0 : Math.round(uploadedSize / totalSize * 100);
      if (totalProgress > 100) {
        totalProgress = 100;
      }
      this.setState({
        totalProgress
      });
      this.emit("progress", totalProgress);
    }
    updateOnlineStatus() {
      const online = typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true;
      if (!online) {
        this.emit("is-offline");
        this.info(this.i18n("noInternetConnection"), "error", 0);
        this.wasOffline = true;
      } else {
        this.emit("is-online");
        if (this.wasOffline) {
          this.emit("back-online");
          this.info(this.i18n("connectedToInternet"), "success", 3e3);
          this.wasOffline = false;
        }
      }
    }
    getID() {
      return this.opts.id;
    }
    use(Plugin, opts) {
      if (typeof Plugin !== "function") {
        const msg = `Expected a plugin class, but got ${Plugin === null ? "null" : typeof Plugin}. Please verify that the plugin was imported and spelled correctly.`;
        throw new TypeError(msg);
      }
      const plugin = new Plugin(this, opts);
      const pluginId = plugin.id;
      if (!pluginId) {
        throw new Error("Your plugin must have an id");
      }
      if (!plugin.type) {
        throw new Error("Your plugin must have a type");
      }
      const existsPluginAlready = this.getPlugin(pluginId);
      if (existsPluginAlready) {
        const msg = `Already found a plugin named '${existsPluginAlready.id}'. Tried to use: '${pluginId}'.
Uppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
        throw new Error(msg);
      }
      if (Plugin.VERSION) {
        this.log(`Using ${pluginId} v${Plugin.VERSION}`);
      }
      if (plugin.type in _classPrivateFieldLooseBase3(this, _plugins)[_plugins]) {
        _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type].push(plugin);
      } else {
        _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type] = [plugin];
      }
      plugin.install();
      return this;
    }
    getPlugin(id10) {
      for (const plugins of Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins])) {
        const foundPlugin = plugins.find((plugin) => plugin.id === id10);
        if (foundPlugin != null)
          return foundPlugin;
      }
      return void 0;
    }
    [_Symbol$for](type) {
      return _classPrivateFieldLooseBase3(this, _plugins)[_plugins][type];
    }
    iteratePlugins(method) {
      Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins]).flat(1).forEach(method);
    }
    removePlugin(instance) {
      this.log(`Removing plugin ${instance.id}`);
      this.emit("plugin-remove", instance);
      if (instance.uninstall) {
        instance.uninstall();
      }
      const list = _classPrivateFieldLooseBase3(this, _plugins)[_plugins][instance.type];
      const index = list.findIndex((item) => item.id === instance.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
      const state = this.getState();
      const updatedState = {
        plugins: {
          ...state.plugins,
          [instance.id]: void 0
        }
      };
      this.setState(updatedState);
    }
    close(_temp2) {
      let {
        reason
      } = _temp2 === void 0 ? {} : _temp2;
      this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
      this.cancelAll({
        reason
      });
      _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe]();
      this.iteratePlugins((plugin) => {
        this.removePlugin(plugin);
      });
      if (typeof window !== "undefined" && window.removeEventListener) {
        window.removeEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
        window.removeEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      }
    }
    hideInfo() {
      const {
        info
      } = this.getState();
      this.setState({
        info: info.slice(1)
      });
      this.emit("info-hidden");
    }
    info(message, type, duration) {
      if (type === void 0) {
        type = "info";
      }
      if (duration === void 0) {
        duration = 3e3;
      }
      const isComplexMessage = typeof message === "object";
      this.setState({
        info: [...this.getState().info, {
          type,
          message: isComplexMessage ? message.message : message,
          details: isComplexMessage ? message.details : null
        }]
      });
      setTimeout(() => this.hideInfo(), duration);
      this.emit("info-visible");
    }
    log(message, type) {
      const {
        logger
      } = this.opts;
      switch (type) {
        case "error":
          logger.error(message);
          break;
        case "warning":
          logger.warn(message);
          break;
        default:
          logger.debug(message);
          break;
      }
    }
    restore(uploadID) {
      this.log(`Core: attempting to restore upload "${uploadID}"`);
      if (!this.getState().currentUploads[uploadID]) {
        _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
        return Promise.reject(new Error("Nonexistent upload"));
      }
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }
    [_Symbol$for2]() {
      return _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](...arguments);
    }
    addResultData(uploadID, data) {
      if (!_classPrivateFieldLooseBase3(this, _getUpload)[_getUpload](uploadID)) {
        this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
        return;
      }
      const {
        currentUploads
      } = this.getState();
      const currentUpload = {
        ...currentUploads[uploadID],
        result: {
          ...currentUploads[uploadID].result,
          ...data
        }
      };
      this.setState({
        currentUploads: {
          ...currentUploads,
          [uploadID]: currentUpload
        }
      });
    }
    upload() {
      var _classPrivateFieldLoo;
      if (!((_classPrivateFieldLoo = _classPrivateFieldLooseBase3(this, _plugins)[_plugins].uploader) != null && _classPrivateFieldLoo.length)) {
        this.log("No uploader type plugins are used", "warning");
      }
      let {
        files
      } = this.getState();
      const onBeforeUploadResult = this.opts.onBeforeUpload(files);
      if (onBeforeUploadResult === false) {
        return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
      }
      if (onBeforeUploadResult && typeof onBeforeUploadResult === "object") {
        files = onBeforeUploadResult;
        this.setState({
          files
        });
      }
      return Promise.resolve().then(() => _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validateMinNumberOfFiles(files)).catch((err) => {
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err);
        throw err;
      }).then(() => {
        if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFields)[_checkRequiredMetaFields](files)) {
          throw new RestrictionError(this.i18n("missingRequiredMetaField"));
        }
      }).catch((err) => {
        throw err;
      }).then(() => {
        const {
          currentUploads
        } = this.getState();
        const currentlyUploadingFiles = Object.values(currentUploads).flatMap((curr) => curr.fileIDs);
        const waitingFileIDs = [];
        Object.keys(files).forEach((fileID) => {
          const file = this.getFile(fileID);
          if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
            waitingFileIDs.push(file.id);
          }
        });
        const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](waitingFileIDs);
        return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
      }).catch((err) => {
        this.emit("error", err);
        this.log(err, "error");
        throw err;
      });
    }
  };
  function _informAndEmit2(error, file) {
    const {
      message,
      details = ""
    } = error;
    if (error.isRestriction) {
      this.emit("restriction-failed", file, error);
    } else {
      this.emit("error", error);
    }
    this.info({
      message,
      details
    }, "error", this.opts.infoTimeout);
    this.log(error, "warning");
  }
  function _checkRequiredMetaFieldsOnFile2(file) {
    const {
      missingFields,
      error
    } = _classPrivateFieldLooseBase3(this, _restricter)[_restricter].getMissingRequiredMetaFields(file);
    if (missingFields.length > 0) {
      this.setFileState(file.id, {
        missingRequiredMetaFields: missingFields
      });
      this.log(error.message);
      this.emit("restriction-failed", file, error);
      return false;
    }
    return true;
  }
  function _checkRequiredMetaFields2(files) {
    let success = true;
    for (const file of Object.values(files)) {
      if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file)) {
        success = false;
      }
    }
    return success;
  }
  function _assertNewUploadAllowed2(file) {
    const {
      allowNewUpload
    } = this.getState();
    if (allowNewUpload === false) {
      const error = new RestrictionError(this.i18n("noMoreFilesAllowed"));
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, file);
      throw error;
    }
  }
  function _checkAndCreateFileStateObject2(files, fileDescriptor) {
    if (fileDescriptor instanceof File) {
      fileDescriptor = {
        name: fileDescriptor.name,
        type: fileDescriptor.type,
        size: fileDescriptor.size,
        data: fileDescriptor
      };
    }
    const fileType = getFileType(fileDescriptor);
    const fileName = getFileName(fileType, fileDescriptor);
    const fileExtension = getFileNameAndExtension(fileName).extension;
    const isRemote = Boolean(fileDescriptor.isRemote);
    const fileID = generateFileID({
      ...fileDescriptor,
      type: fileType
    });
    if (this.checkIfFileAlreadyExists(fileID)) {
      const error = new RestrictionError(this.i18n("noDuplicates", {
        fileName
      }));
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, fileDescriptor);
      throw error;
    }
    const meta = fileDescriptor.meta || {};
    meta.name = fileName;
    meta.type = fileType;
    const size = Number.isFinite(fileDescriptor.data.size) ? fileDescriptor.data.size : null;
    let newFile = {
      source: fileDescriptor.source || "",
      id: fileID,
      name: fileName,
      extension: fileExtension || "",
      meta: {
        ...this.getState().meta,
        ...meta
      },
      type: fileType,
      data: fileDescriptor.data,
      progress: {
        percentage: 0,
        bytesUploaded: 0,
        bytesTotal: size,
        uploadComplete: false,
        uploadStarted: null
      },
      size,
      isRemote,
      remote: fileDescriptor.remote || "",
      preview: fileDescriptor.preview
    };
    const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, files);
    if (onBeforeFileAddedResult === false) {
      const error = new RestrictionError("Cannot add the file because onBeforeFileAdded returned false.");
      this.emit("restriction-failed", fileDescriptor, error);
      throw error;
    } else if (typeof onBeforeFileAddedResult === "object" && onBeforeFileAddedResult !== null) {
      newFile = onBeforeFileAddedResult;
    }
    try {
      const filesArray = Object.keys(files).map((i2) => files[i2]);
      _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(newFile, filesArray);
    } catch (err) {
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err, newFile);
      throw err;
    }
    return newFile;
  }
  function _startIfAutoProceed2() {
    if (this.opts.autoProceed && !this.scheduledAutoProceed) {
      this.scheduledAutoProceed = setTimeout(() => {
        this.scheduledAutoProceed = null;
        this.upload().catch((err) => {
          if (!err.isRestriction) {
            this.log(err.stack || err.message || err);
          }
        });
      }, 4);
    }
  }
  function _addListeners2() {
    const errorHandler = (error, file, response) => {
      let errorMsg = error.message || "Unknown error";
      if (error.details) {
        errorMsg += ` ${error.details}`;
      }
      this.setState({
        error: errorMsg
      });
      if (file != null && file.id in this.getState().files) {
        this.setFileState(file.id, {
          error: errorMsg,
          response
        });
      }
    };
    this.on("error", errorHandler);
    this.on("upload-error", (file, error, response) => {
      errorHandler(error, file, response);
      if (typeof error === "object" && error.message) {
        const newError = new Error(error.message);
        newError.details = error.message;
        if (error.details) {
          newError.details += ` ${error.details}`;
        }
        newError.message = this.i18n("failedToUpload", {
          file: file == null ? void 0 : file.name
        });
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](newError);
      } else {
        _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error);
      }
    });
    let uploadStalledWarningRecentlyEmitted;
    this.on("upload-stalled", (error, files) => {
      const {
        message
      } = error;
      const details = files.map((file) => file.meta.name).join(", ");
      if (!uploadStalledWarningRecentlyEmitted) {
        this.info({
          message,
          details
        }, "warning", this.opts.infoTimeout);
        uploadStalledWarningRecentlyEmitted = setTimeout(() => {
          uploadStalledWarningRecentlyEmitted = null;
        }, this.opts.infoTimeout);
      }
      this.log(`${message} ${details}`.trim(), "warning");
    });
    this.on("upload", () => {
      this.setState({
        error: null
      });
    });
    this.on("upload-started", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          uploadStarted: Date.now(),
          uploadComplete: false,
          percentage: 0,
          bytesUploaded: 0,
          bytesTotal: file.size
        }
      });
    });
    this.on("upload-progress", this.calculateProgress);
    this.on("upload-success", (file, uploadResp) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const currentProgress = this.getFile(file.id).progress;
      this.setFileState(file.id, {
        progress: {
          ...currentProgress,
          postprocess: _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].size > 0 ? {
            mode: "indeterminate"
          } : null,
          uploadComplete: true,
          percentage: 100,
          bytesUploaded: currentProgress.bytesTotal
        },
        response: uploadResp,
        uploadURL: uploadResp.uploadURL,
        isPaused: false
      });
      if (file.size == null) {
        this.setFileState(file.id, {
          size: uploadResp.bytesUploaded || currentProgress.bytesTotal
        });
      }
      this.calculateTotalProgress();
    });
    this.on("preprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getFile(file.id).progress,
          preprocess: progress
        }
      });
    });
    this.on("preprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.preprocess;
      this.setState({
        files
      });
    });
    this.on("postprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getState().files[file.id].progress,
          postprocess: progress
        }
      });
    });
    this.on("postprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.postprocess;
      this.setState({
        files
      });
    });
    this.on("restored", () => {
      this.calculateTotalProgress();
    });
    this.on("dashboard:file-edit-complete", (file) => {
      if (file) {
        _classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file);
      }
    });
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      window.addEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      setTimeout(_classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus], 3e3);
    }
  }
  function _createUpload2(fileIDs, opts) {
    if (opts === void 0) {
      opts = {};
    }
    const {
      forceAllowNewUpload = false
    } = opts;
    const {
      allowNewUpload,
      currentUploads
    } = this.getState();
    if (!allowNewUpload && !forceAllowNewUpload) {
      throw new Error("Cannot create a new upload: already uploading.");
    }
    const uploadID = nanoid();
    this.emit("upload", {
      id: uploadID,
      fileIDs
    });
    this.setState({
      allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
      currentUploads: {
        ...currentUploads,
        [uploadID]: {
          fileIDs,
          step: 0,
          result: {}
        }
      }
    });
    return uploadID;
  }
  function _getUpload2(uploadID) {
    const {
      currentUploads
    } = this.getState();
    return currentUploads[uploadID];
  }
  function _removeUpload2(uploadID) {
    const currentUploads = {
      ...this.getState().currentUploads
    };
    delete currentUploads[uploadID];
    this.setState({
      currentUploads
    });
  }
  async function _runUpload2(uploadID) {
    let {
      currentUploads
    } = this.getState();
    let currentUpload = currentUploads[uploadID];
    const restoreStep = currentUpload.step || 0;
    const steps = [..._classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors], ..._classPrivateFieldLooseBase3(this, _uploaders)[_uploaders], ..._classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors]];
    try {
      for (let step = restoreStep; step < steps.length; step++) {
        if (!currentUpload) {
          break;
        }
        const fn = steps[step];
        const updatedUpload = {
          ...currentUpload,
          step
        };
        this.setState({
          currentUploads: {
            ...currentUploads,
            [uploadID]: updatedUpload
          }
        });
        await fn(updatedUpload.fileIDs, uploadID);
        currentUploads = this.getState().currentUploads;
        currentUpload = currentUploads[uploadID];
      }
    } catch (err) {
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
      throw err;
    }
    if (currentUpload) {
      currentUpload.fileIDs.forEach((fileID) => {
        const file = this.getFile(fileID);
        if (file && file.progress.postprocess) {
          this.emit("postprocess-complete", file);
        }
      });
      const files = currentUpload.fileIDs.map((fileID) => this.getFile(fileID));
      const successful = files.filter((file) => !file.error);
      const failed = files.filter((file) => file.error);
      await this.addResultData(uploadID, {
        successful,
        failed,
        uploadID
      });
      currentUploads = this.getState().currentUploads;
      currentUpload = currentUploads[uploadID];
    }
    let result;
    if (currentUpload) {
      result = currentUpload.result;
      this.emit("complete", result);
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
    }
    if (result == null) {
      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
    }
    return result;
  }
  Uppy.VERSION = packageJson2.version;
  var Uppy_default = Uppy;

  // ../node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f = {};
  var e = [];
  var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function s(n2, l2) {
    for (var u2 in l2)
      n2[u2] = l2[u2];
    return n2;
  }
  function a(n2) {
    var l2 = n2.parentNode;
    l2 && l2.removeChild(n2);
  }
  function h(l2, u2, i2) {
    var t2, o2, r2, f2 = {};
    for (r2 in u2)
      "key" == r2 ? t2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : f2[r2] = u2[r2];
    if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), "function" == typeof l2 && null != l2.defaultProps)
      for (r2 in l2.defaultProps)
        void 0 === f2[r2] && (f2[r2] = l2.defaultProps[r2]);
    return v(l2, f2, t2, o2, null);
  }
  function v(n2, i2, t2, o2, r2) {
    var f2 = {
      type: n2,
      props: i2,
      key: t2,
      ref: o2,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == r2 ? ++u : r2
    };
    return null == r2 && null != l.vnode && l.vnode(f2), f2;
  }
  function p(n2) {
    return n2.children;
  }
  function d(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function _(n2, l2) {
    if (null == l2)
      return n2.__ ? _(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++)
      if (null != (u2 = n2.__k[l2]) && null != u2.__e)
        return u2.__e;
    return "function" == typeof n2.type ? _(n2) : null;
  }
  function k(n2) {
    var l2, u2;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
        if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
          n2.__e = n2.__c.base = u2.__e;
          break;
        }
      return k(n2);
    }
  }
  function b(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l2) {
        return n3.__v.__b - l2.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l2, u2, i2, t2, o2, r2;
        n3.__d && (o2 = (t2 = (l2 = n3).__v).__e, (r2 = l2.__P) && (u2 = [], (i2 = s({}, t2)).__v = t2.__v + 1, j(r2, t2, i2, l2.__n, void 0 !== r2.ownerSVGElement, null != t2.__h ? [o2] : null, u2, null == o2 ? _(t2) : o2, t2.__h), z(u2, t2), t2.__e != o2 && k(t2)));
      });
  }
  function w(n2, l2, u2, i2, t2, o2, r2, c2, s2, a2) {
    var h2, y, d2, k2, b2, g2, w2, x = i2 && i2.__k || e, C2 = x.length;
    for (u2.__k = [], h2 = 0; h2 < l2.length; h2++)
      if (null != (k2 = u2.__k[h2] = null == (k2 = l2[h2]) || "boolean" == typeof k2 ? null : "string" == typeof k2 || "number" == typeof k2 || "bigint" == typeof k2 ? v(null, k2, null, null, k2) : Array.isArray(k2) ? v(p, {
        children: k2
      }, null, null, null) : k2.__b > 0 ? v(k2.type, k2.props, k2.key, null, k2.__v) : k2)) {
        if (k2.__ = u2, k2.__b = u2.__b + 1, null === (d2 = x[h2]) || d2 && k2.key == d2.key && k2.type === d2.type)
          x[h2] = void 0;
        else
          for (y = 0; y < C2; y++) {
            if ((d2 = x[y]) && k2.key == d2.key && k2.type === d2.type) {
              x[y] = void 0;
              break;
            }
            d2 = null;
          }
        j(n2, k2, d2 = d2 || f, t2, o2, r2, c2, s2, a2), b2 = k2.__e, (y = k2.ref) && d2.ref != y && (w2 || (w2 = []), d2.ref && w2.push(d2.ref, null, k2), w2.push(y, k2.__c || b2, k2)), null != b2 ? (null == g2 && (g2 = b2), "function" == typeof k2.type && k2.__k === d2.__k ? k2.__d = s2 = m(k2, s2, n2) : s2 = A(n2, k2, d2, x, b2, s2), "function" == typeof u2.type && (u2.__d = s2)) : s2 && d2.__e == s2 && s2.parentNode != n2 && (s2 = _(d2));
      }
    for (u2.__e = g2, h2 = C2; h2--; )
      null != x[h2] && ("function" == typeof u2.type && null != x[h2].__e && x[h2].__e == u2.__d && (u2.__d = _(i2, h2 + 1)), N(x[h2], x[h2]));
    if (w2)
      for (h2 = 0; h2 < w2.length; h2++)
        M(w2[h2], w2[++h2], w2[++h2]);
  }
  function m(n2, l2, u2) {
    for (var i2, t2 = n2.__k, o2 = 0; t2 && o2 < t2.length; o2++)
      (i2 = t2[o2]) && (i2.__ = n2, l2 = "function" == typeof i2.type ? m(i2, l2, u2) : A(u2, i2, i2, t2, i2.__e, l2));
    return l2;
  }
  function A(n2, l2, u2, i2, t2, o2) {
    var r2, f2, e2;
    if (void 0 !== l2.__d)
      r2 = l2.__d, l2.__d = void 0;
    else if (null == u2 || t2 != o2 || null == t2.parentNode)
      n:
        if (null == o2 || o2.parentNode !== n2)
          n2.appendChild(t2), r2 = null;
        else {
          for (f2 = o2, e2 = 0; (f2 = f2.nextSibling) && e2 < i2.length; e2 += 2)
            if (f2 == t2)
              break n;
          n2.insertBefore(t2, o2), r2 = o2;
        }
    return void 0 !== r2 ? r2 : t2.nextSibling;
  }
  function C(n2, l2, u2, i2, t2) {
    var o2;
    for (o2 in u2)
      "children" === o2 || "key" === o2 || o2 in l2 || H(n2, o2, null, u2[o2], i2);
    for (o2 in l2)
      t2 && "function" != typeof l2[o2] || "children" === o2 || "key" === o2 || "value" === o2 || "checked" === o2 || u2[o2] === l2[o2] || H(n2, o2, l2[o2], u2[o2], i2);
  }
  function $(n2, l2, u2) {
    "-" === l2[0] ? n2.setProperty(l2, u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || c.test(l2) ? u2 : u2 + "px";
  }
  function H(n2, l2, u2, i2, t2) {
    var o2;
    n:
      if ("style" === l2) {
        if ("string" == typeof u2)
          n2.style.cssText = u2;
        else {
          if ("string" == typeof i2 && (n2.style.cssText = i2 = ""), i2)
            for (l2 in i2)
              u2 && l2 in u2 || $(n2.style, l2, "");
          if (u2)
            for (l2 in u2)
              i2 && u2[l2] === i2[l2] || $(n2.style, l2, u2[l2]);
        }
      } else if ("o" === l2[0] && "n" === l2[1])
        o2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o2] = u2, u2 ? i2 || n2.addEventListener(l2, o2 ? T : I, o2) : n2.removeEventListener(l2, o2 ? T : I, o2);
      else if ("dangerouslySetInnerHTML" !== l2) {
        if (t2)
          l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l2 && "list" !== l2 && "form" !== l2 && "tabIndex" !== l2 && "download" !== l2 && l2 in n2)
          try {
            n2[l2] = null == u2 ? "" : u2;
            break n;
          } catch (n3) {
          }
        "function" == typeof u2 || (null != u2 && (false !== u2 || "a" === l2[0] && "r" === l2[1]) ? n2.setAttribute(l2, u2) : n2.removeAttribute(l2));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u2, i2, t2, o2, r2, f2, e2, c2) {
    var a2, h2, v2, y, _2, k2, b2, g2, m2, x, A2, C2, $2, H2 = u2.type;
    if (void 0 !== u2.constructor)
      return null;
    null != i2.__h && (c2 = i2.__h, e2 = u2.__e = i2.__e, u2.__h = null, r2 = [e2]), (a2 = l.__b) && a2(u2);
    try {
      n:
        if ("function" == typeof H2) {
          if (g2 = u2.props, m2 = (a2 = H2.contextType) && t2[a2.__c], x = a2 ? m2 ? m2.props.value : a2.__ : t2, i2.__c ? b2 = (h2 = u2.__c = i2.__c).__ = h2.__E : ("prototype" in H2 && H2.prototype.render ? u2.__c = h2 = new H2(g2, x) : (u2.__c = h2 = new d(g2, x), h2.constructor = H2, h2.render = O), m2 && m2.sub(h2), h2.props = g2, h2.state || (h2.state = {}), h2.context = x, h2.__n = t2, v2 = h2.__d = true, h2.__h = []), null == h2.__s && (h2.__s = h2.state), null != H2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = s({}, h2.__s)), s(h2.__s, H2.getDerivedStateFromProps(g2, h2.__s))), y = h2.props, _2 = h2.state, v2)
            null == H2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
          else {
            if (null == H2.getDerivedStateFromProps && g2 !== y && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(g2, x), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(g2, h2.__s, x) || u2.__v === i2.__v) {
              h2.props = g2, h2.state = h2.__s, u2.__v !== i2.__v && (h2.__d = false), h2.__v = u2, u2.__e = i2.__e, u2.__k = i2.__k, u2.__k.forEach(function(n3) {
                n3 && (n3.__ = u2);
              }), h2.__h.length && f2.push(h2);
              break n;
            }
            null != h2.componentWillUpdate && h2.componentWillUpdate(g2, h2.__s, x), null != h2.componentDidUpdate && h2.__h.push(function() {
              h2.componentDidUpdate(y, _2, k2);
            });
          }
          if (h2.context = x, h2.props = g2, h2.__v = u2, h2.__P = n2, A2 = l.__r, C2 = 0, "prototype" in H2 && H2.prototype.render)
            h2.state = h2.__s, h2.__d = false, A2 && A2(u2), a2 = h2.render(h2.props, h2.state, h2.context);
          else
            do {
              h2.__d = false, A2 && A2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
            } while (h2.__d && ++C2 < 25);
          h2.state = h2.__s, null != h2.getChildContext && (t2 = s(s({}, t2), h2.getChildContext())), v2 || null == h2.getSnapshotBeforeUpdate || (k2 = h2.getSnapshotBeforeUpdate(y, _2)), $2 = null != a2 && a2.type === p && null == a2.key ? a2.props.children : a2, w(n2, Array.isArray($2) ? $2 : [$2], u2, i2, t2, o2, r2, f2, e2, c2), h2.base = u2.__e, u2.__h = null, h2.__h.length && f2.push(h2), b2 && (h2.__E = h2.__ = null), h2.__e = false;
        } else
          null == r2 && u2.__v === i2.__v ? (u2.__k = i2.__k, u2.__e = i2.__e) : u2.__e = L(i2.__e, u2, i2, t2, o2, r2, f2, c2);
      (a2 = l.diffed) && a2(u2);
    } catch (n3) {
      u2.__v = null, (c2 || null != r2) && (u2.__e = e2, u2.__h = !!c2, r2[r2.indexOf(e2)] = null), l.__e(n3, u2, i2);
    }
  }
  function z(n2, u2) {
    l.__c && l.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l.__e(n3, u3.__v);
      }
    });
  }
  function L(l2, u2, i2, t2, o2, r2, e2, c2) {
    var s2, h2, v2, y = i2.props, p2 = u2.props, d2 = u2.type, k2 = 0;
    if ("svg" === d2 && (o2 = true), null != r2) {
      for (; k2 < r2.length; k2++)
        if ((s2 = r2[k2]) && "setAttribute" in s2 == !!d2 && (d2 ? s2.localName === d2 : 3 === s2.nodeType)) {
          l2 = s2, r2[k2] = null;
          break;
        }
    }
    if (null == l2) {
      if (null === d2)
        return document.createTextNode(p2);
      l2 = o2 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p2.is && p2), r2 = null, c2 = false;
    }
    if (null === d2)
      y === p2 || c2 && l2.data === p2 || (l2.data = p2);
    else {
      if (r2 = r2 && n.call(l2.childNodes), h2 = (y = i2.props || f).dangerouslySetInnerHTML, v2 = p2.dangerouslySetInnerHTML, !c2) {
        if (null != r2)
          for (y = {}, k2 = 0; k2 < l2.attributes.length; k2++)
            y[l2.attributes[k2].name] = l2.attributes[k2].value;
        (v2 || h2) && (v2 && (h2 && v2.__html == h2.__html || v2.__html === l2.innerHTML) || (l2.innerHTML = v2 && v2.__html || ""));
      }
      if (C(l2, p2, y, o2, c2), v2)
        u2.__k = [];
      else if (k2 = u2.props.children, w(l2, Array.isArray(k2) ? k2 : [k2], u2, i2, t2, o2 && "foreignObject" !== d2, r2, e2, r2 ? r2[0] : i2.__k && _(i2, 0), c2), null != r2)
        for (k2 = r2.length; k2--; )
          null != r2[k2] && a(r2[k2]);
      c2 || ("value" in p2 && void 0 !== (k2 = p2.value) && (k2 !== l2.value || "progress" === d2 && !k2 || "option" === d2 && k2 !== y.value) && H(l2, "value", k2, y.value, false), "checked" in p2 && void 0 !== (k2 = p2.checked) && k2 !== l2.checked && H(l2, "checked", k2, y.checked, false));
    }
    return l2;
  }
  function M(n2, u2, i2) {
    try {
      "function" == typeof n2 ? n2(u2) : n2.current = u2;
    } catch (n3) {
      l.__e(n3, i2);
    }
  }
  function N(n2, u2, i2) {
    var t2, o2;
    if (l.unmount && l.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || M(t2, null, u2)), null != (t2 = n2.__c)) {
      if (t2.componentWillUnmount)
        try {
          t2.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u2);
        }
      t2.base = t2.__P = null;
    }
    if (t2 = n2.__k)
      for (o2 = 0; o2 < t2.length; o2++)
        t2[o2] && N(t2[o2], u2, "function" != typeof n2.type);
    i2 || null == n2.__e || a(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function P(u2, i2, t2) {
    var o2, r2, e2;
    l.__ && l.__(u2, i2), r2 = (o2 = "function" == typeof t2) ? null : t2 && t2.__k || i2.__k, e2 = [], j(i2, u2 = (!o2 && t2 || i2).__k = h(p, null, [u2]), r2 || f, f, void 0 !== i2.ownerSVGElement, !o2 && t2 ? [t2] : r2 ? null : i2.firstChild ? n.call(i2.childNodes) : null, e2, !o2 && t2 ? t2 : r2 ? r2.__e : i2.firstChild, o2), z(e2, u2);
  }
  n = e.slice, l = {
    __e: function(n2, l2, u2, i2) {
      for (var t2, o2, r2; l2 = l2.__; )
        if ((t2 = l2.__c) && !t2.__)
          try {
            if ((o2 = t2.constructor) && null != o2.getDerivedStateFromError && (t2.setState(o2.getDerivedStateFromError(n2)), r2 = t2.__d), null != t2.componentDidCatch && (t2.componentDidCatch(n2, i2 || {}), r2 = t2.__d), r2)
              return t2.__E = t2;
          } catch (l3) {
            n2 = l3;
          }
      throw n2;
    }
  }, u = 0, i = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, d.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n2 && (n2 = n2(s({}, u2), this.props)), n2 && s(u2, n2), null != n2 && this.__v && (l2 && this.__h.push(l2), b(this));
  }, d.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), b(this));
  }, d.prototype.render = p, t = [], g.__r = 0, r = 0;

  // ../packages/@uppy/utils/lib/isDOMElement.js
  function isDOMElement(obj) {
    return (obj == null ? void 0 : obj.nodeType) === Node.ELEMENT_NODE;
  }

  // ../packages/@uppy/utils/lib/findDOMElement.js
  function findDOMElement(element, context) {
    if (context === void 0) {
      context = document;
    }
    if (typeof element === "string") {
      return context.querySelector(element);
    }
    if (isDOMElement(element)) {
      return element;
    }
    return null;
  }

  // ../packages/@uppy/utils/lib/getTextDirection.js
  function getTextDirection(element) {
    var _element;
    while (element && !element.dir) {
      element = element.parentNode;
    }
    return (_element = element) == null ? void 0 : _element.dir;
  }
  var getTextDirection_default = getTextDirection;

  // ../packages/@uppy/core/lib/BasePlugin.js
  var BasePlugin = class {
    constructor(uppy, opts) {
      if (opts === void 0) {
        opts = {};
      }
      this.uppy = uppy;
      this.opts = opts;
    }
    getPluginState() {
      const {
        plugins
      } = this.uppy.getState();
      return plugins[this.id] || {};
    }
    setPluginState(update) {
      const {
        plugins
      } = this.uppy.getState();
      this.uppy.setState({
        plugins: {
          ...plugins,
          [this.id]: {
            ...plugins[this.id],
            ...update
          }
        }
      });
    }
    setOptions(newOpts) {
      this.opts = {
        ...this.opts,
        ...newOpts
      };
      this.setPluginState();
      this.i18nInit();
    }
    i18nInit() {
      const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
      this.i18n = translator.translate.bind(translator);
      this.i18nArray = translator.translateArray.bind(translator);
      this.setPluginState();
    }
    addTarget() {
      throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
    }
    install() {
    }
    uninstall() {
    }
    render() {
      throw new Error("Extend the render method to add your plugin to a DOM element");
    }
    update() {
    }
    afterUpdate() {
    }
  };

  // ../packages/@uppy/core/lib/UIPlugin.js
  function _classPrivateFieldLooseBase4(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id4 = 0;
  function _classPrivateFieldLooseKey4(name) {
    return "__private_" + id4++ + "_" + name;
  }
  function debounce(fn) {
    let calling = null;
    let latestArgs = null;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      latestArgs = args;
      if (!calling) {
        calling = Promise.resolve().then(() => {
          calling = null;
          return fn(...latestArgs);
        });
      }
      return calling;
    };
  }
  var _updateUI = /* @__PURE__ */ _classPrivateFieldLooseKey4("updateUI");
  var UIPlugin = class extends BasePlugin {
    constructor() {
      super(...arguments);
      Object.defineProperty(this, _updateUI, {
        writable: true,
        value: void 0
      });
    }
    getTargetPlugin(target) {
      let targetPlugin;
      if (typeof target === "object" && target instanceof UIPlugin) {
        targetPlugin = target;
      } else if (typeof target === "function") {
        const Target = target;
        this.uppy.iteratePlugins((p2) => {
          if (p2 instanceof Target) {
            targetPlugin = p2;
          }
        });
      }
      return targetPlugin;
    }
    mount(target, plugin) {
      const callerPluginName = plugin.id;
      const targetElement = findDOMElement(target);
      if (targetElement) {
        this.isTargetDOMEl = true;
        const uppyRootElement = document.createElement("div");
        uppyRootElement.classList.add("uppy-Root");
        _classPrivateFieldLooseBase4(this, _updateUI)[_updateUI] = debounce((state) => {
          if (!this.uppy.getPlugin(this.id))
            return;
          P(this.render(state), uppyRootElement);
          this.afterUpdate();
        });
        this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
        if (this.opts.replaceTargetContent) {
          targetElement.innerHTML = "";
        }
        P(this.render(this.uppy.getState()), uppyRootElement);
        this.el = uppyRootElement;
        targetElement.appendChild(uppyRootElement);
        uppyRootElement.dir = this.opts.direction || getTextDirection_default(uppyRootElement) || "ltr";
        this.onMount();
        return this.el;
      }
      const targetPlugin = this.getTargetPlugin(target);
      if (targetPlugin) {
        this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
        this.parent = targetPlugin;
        this.el = targetPlugin.addTarget(plugin);
        this.onMount();
        return this.el;
      }
      this.uppy.log(`Not installing ${callerPluginName}`);
      let message = `Invalid target option given to ${callerPluginName}.`;
      if (typeof target === "function") {
        message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
      } else {
        message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
      }
      throw new Error(message);
    }
    update(state) {
      if (this.el != null) {
        var _classPrivateFieldLoo, _classPrivateFieldLoo2;
        (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase4(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
      }
    }
    unmount() {
      if (this.isTargetDOMEl) {
        var _this$el;
        (_this$el = this.el) == null ? void 0 : _this$el.remove();
      }
      this.onUnmount();
    }
    onMount() {
    }
    onUnmount() {
    }
  };
  var UIPlugin_default = UIPlugin;

  // ../packages/@uppy/utils/lib/toArray.js
  var toArray_default = Array.from;

  // ../packages/@uppy/file-input/lib/locale.js
  var locale_default2 = {
    strings: {
      chooseFiles: "Choose files"
    }
  };

  // ../packages/@uppy/file-input/lib/FileInput.js
  var packageJson3 = {
    "version": "3.0.1"
  };
  var FileInput = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.opts.id || "FileInput";
      this.title = "File Input";
      this.type = "acquirer";
      this.defaultLocale = locale_default2;
      const defaultOptions4 = {
        target: null,
        pretty: true,
        inputName: "files[]"
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      this.render = this.render.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    addFiles(files) {
      const descriptors = files.map((file) => ({
        source: this.id,
        name: file.name,
        type: file.type,
        data: file
      }));
      try {
        this.uppy.addFiles(descriptors);
      } catch (err) {
        this.uppy.log(err);
      }
    }
    handleInputChange(event) {
      this.uppy.log("[FileInput] Something selected through input...");
      const files = toArray_default(event.target.files);
      this.addFiles(files);
      event.target.value = null;
    }
    handleClick() {
      this.input.click();
    }
    render() {
      const hiddenInputStyle = {
        width: "0.1px",
        height: "0.1px",
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        zIndex: -1
      };
      const {
        restrictions
      } = this.uppy.opts;
      const accept = restrictions.allowedFileTypes ? restrictions.allowedFileTypes.join(",") : null;
      return h("div", {
        className: "uppy-FileInput-container"
      }, h("input", {
        className: "uppy-FileInput-input",
        style: this.opts.pretty && hiddenInputStyle,
        type: "file",
        name: this.opts.inputName,
        onChange: this.handleInputChange,
        multiple: restrictions.maxNumberOfFiles !== 1,
        accept,
        ref: (input) => {
          this.input = input;
        }
      }), this.opts.pretty && h("button", {
        className: "uppy-FileInput-btn",
        type: "button",
        onClick: this.handleClick
      }, this.i18n("chooseFiles")));
    }
    install() {
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.unmount();
    }
  };
  FileInput.VERSION = packageJson3.version;

  // ../packages/@uppy/utils/lib/getSpeed.js
  function getSpeed(fileProgress) {
    if (!fileProgress.bytesUploaded)
      return 0;
    const timeElapsed = Date.now() - fileProgress.uploadStarted;
    const uploadSpeed = fileProgress.bytesUploaded / (timeElapsed / 1e3);
    return uploadSpeed;
  }

  // ../packages/@uppy/utils/lib/getBytesRemaining.js
  function getBytesRemaining(fileProgress) {
    return fileProgress.bytesTotal - fileProgress.bytesUploaded;
  }

  // ../packages/@uppy/status-bar/lib/StatusBarStates.js
  var StatusBarStates_default = {
    STATE_ERROR: "error",
    STATE_WAITING: "waiting",
    STATE_PREPROCESSING: "preprocessing",
    STATE_UPLOADING: "uploading",
    STATE_POSTPROCESSING: "postprocessing",
    STATE_COMPLETE: "complete"
  };

  // ../packages/@uppy/status-bar/lib/StatusBarUI.js
  var import_classnames2 = __toESM(require_classnames(), 1);

  // ../packages/@uppy/status-bar/lib/calculateProcessingProgress.js
  function calculateProcessingProgress(files) {
    const values = [];
    let mode;
    let message;
    for (const {
      progress
    } of Object.values(files)) {
      const {
        preprocess,
        postprocess
      } = progress;
      if (message == null && (preprocess || postprocess)) {
        ({
          mode,
          message
        } = preprocess || postprocess);
      }
      if ((preprocess == null ? void 0 : preprocess.mode) === "determinate")
        values.push(preprocess.value);
      if ((postprocess == null ? void 0 : postprocess.mode) === "determinate")
        values.push(postprocess.value);
    }
    const value = values.reduce((total, progressValue) => {
      return total + progressValue / values.length;
    }, 0);
    return {
      mode,
      message,
      value
    };
  }

  // ../packages/@uppy/status-bar/lib/Components.js
  var import_classnames = __toESM(require_classnames(), 1);
  var import_lodash2 = __toESM(require_lodash(), 1);
  var import_prettier_bytes2 = __toESM(require_prettierBytes(), 1);

  // ../packages/@uppy/utils/lib/secondsToTime.js
  function secondsToTime(rawSeconds) {
    const hours = Math.floor(rawSeconds / 3600) % 24;
    const minutes = Math.floor(rawSeconds / 60) % 60;
    const seconds = Math.floor(rawSeconds % 60);
    return {
      hours,
      minutes,
      seconds
    };
  }

  // ../packages/@uppy/utils/lib/prettyETA.js
  function prettyETA(seconds) {
    const time = secondsToTime(seconds);
    const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
    const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
    const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
    return `${hoursStr}${minutesStr}${secondsStr}`;
  }

  // ../packages/@uppy/status-bar/lib/Components.js
  var DOT = `\xB7`;
  var renderDot = () => ` ${DOT} `;
  function UploadBtn(props) {
    const {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      uploadState,
      isSomeGhost,
      startUpload
    } = props;
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
      "uppy-c-btn-primary": uploadState === StatusBarStates_default.STATE_WAITING
    }, {
      "uppy-StatusBar-actionBtn--disabled": isSomeGhost
    });
    const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", {
      smart_count: newFiles
    }) : i18n("uploadXFiles", {
      smart_count: newFiles
    });
    return h("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload,
      disabled: isSomeGhost,
      "data-uppy-super-focusable": true
    }, uploadBtnText);
  }
  function RetryBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
      "aria-label": i18n("retryUpload"),
      onClick: () => uppy.retryAll(),
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "8",
      height: "10",
      viewBox: "0 0 8 10"
    }, h("path", {
      d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
    })), i18n("retry"));
  }
  function CancelBtn(props) {
    const {
      i18n,
      uppy
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      title: i18n("cancel"),
      "aria-label": i18n("cancel"),
      onClick: () => uppy.cancelAll(),
      "data-cy": "cancel",
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), h("path", {
      fill: "#FFF",
      d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
    }))));
  }
  function PauseResumeButton(props) {
    const {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    } = props;
    const title = isAllPaused ? i18n("resume") : i18n("pause");
    function togglePauseResume() {
      if (isAllComplete)
        return null;
      if (!resumableUploads) {
        return uppy.cancelAll();
      }
      if (isAllPaused) {
        return uppy.resumeAll();
      }
      return uppy.pauseAll();
    }
    return h("button", {
      title,
      "aria-label": title,
      className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
      type: "button",
      onClick: togglePauseResume,
      "data-uppy-super-focusable": true
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, h("g", {
      fill: "none",
      fillRule: "evenodd"
    }, h("circle", {
      fill: "#888",
      cx: "8",
      cy: "8",
      r: "8"
    }), h("path", {
      fill: "#FFF",
      d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
    }))));
  }
  function DoneBtn(props) {
    const {
      i18n,
      doneButtonHandler
    } = props;
    return h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
      onClick: doneButtonHandler,
      "data-uppy-super-focusable": true
    }, i18n("done"));
  }
  function LoadingSpinner() {
    return h("svg", {
      className: "uppy-StatusBar-spinner",
      "aria-hidden": "true",
      focusable: "false",
      width: "14",
      height: "14"
    }, h("path", {
      d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
      fillRule: "evenodd"
    }));
  }
  function ProgressBarProcessing(props) {
    const {
      progress
    } = props;
    const {
      value,
      mode,
      message
    } = progress;
    const roundedValue = Math.round(value * 100);
    const dot = `\xB7`;
    return h("div", {
      className: "uppy-StatusBar-content"
    }, h(LoadingSpinner, null), mode === "determinate" ? `${roundedValue}% ${dot} ` : "", message);
  }
  function ProgressDetails(props) {
    const {
      numUploads,
      complete,
      totalUploadedSize,
      totalSize,
      totalETA,
      i18n
    } = props;
    const ifShowFilesUploadedOfTotal = numUploads > 1;
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }), h("span", {
      className: "uppy-StatusBar-additionalInfo"
    }, ifShowFilesUploadedOfTotal && renderDot(), i18n("dataUploadedOfTotal", {
      complete: (0, import_prettier_bytes2.default)(totalUploadedSize),
      total: (0, import_prettier_bytes2.default)(totalSize)
    }), renderDot(), i18n("xTimeLeft", {
      time: prettyETA(totalETA)
    })));
  }
  function FileUploadCount(props) {
    const {
      i18n,
      complete,
      numUploads
    } = props;
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, i18n("filesUploadedOfTotal", {
      complete,
      smart_count: numUploads
    }));
  }
  function UploadNewlyAddedFiles(props) {
    const {
      i18n,
      newFiles,
      startUpload
    } = props;
    const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
    return h("div", {
      className: "uppy-StatusBar-statusSecondary"
    }, h("div", {
      className: "uppy-StatusBar-statusSecondaryHint"
    }, i18n("xMoreFilesAdded", {
      smart_count: newFiles
    })), h("button", {
      type: "button",
      className: uploadBtnClassNames,
      "aria-label": i18n("uploadXFiles", {
        smart_count: newFiles
      }),
      onClick: startUpload
    }, i18n("upload")));
  }
  var ThrottledProgressDetails = (0, import_lodash2.default)(ProgressDetails, 500, {
    leading: true,
    trailing: true
  });
  function ProgressBarUploading(props) {
    const {
      i18n,
      supportsUploadProgress: supportsUploadProgress2,
      totalProgress,
      showProgressDetails,
      isUploadStarted,
      isAllComplete,
      isAllPaused,
      newFiles,
      numUploads,
      complete,
      totalUploadedSize,
      totalSize,
      totalETA,
      startUpload
    } = props;
    const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
    if (!isUploadStarted || isAllComplete) {
      return null;
    }
    const title = isAllPaused ? i18n("paused") : i18n("uploading");
    function renderProgressDetails() {
      if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
        if (supportsUploadProgress2) {
          return h(ThrottledProgressDetails, {
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            i18n
          });
        }
        return h(FileUploadCount, {
          i18n,
          complete,
          numUploads
        });
      }
      return null;
    }
    return h("div", {
      className: "uppy-StatusBar-content",
      "aria-label": title,
      title
    }, !isAllPaused ? h(LoadingSpinner, null) : null, h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, supportsUploadProgress2 ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? h(UploadNewlyAddedFiles, {
      i18n,
      newFiles,
      startUpload
    }) : null));
  }
  function ProgressBarComplete(props) {
    const {
      i18n
    } = props;
    return h("div", {
      className: "uppy-StatusBar-content",
      role: "status",
      title: i18n("complete")
    }, h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "15",
      height: "11",
      viewBox: "0 0 15 11"
    }, h("path", {
      d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
    })), i18n("complete"))));
  }
  function ProgressBarError(props) {
    const {
      error,
      i18n,
      complete,
      numUploads
    } = props;
    function displayErrorAlert() {
      const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
      alert(errorMessage);
    }
    return h("div", {
      className: "uppy-StatusBar-content",
      title: i18n("uploadFailed")
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-StatusBar-statusIndicator uppy-c-icon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, h("path", {
      d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
    })), h("div", {
      className: "uppy-StatusBar-status"
    }, h("div", {
      className: "uppy-StatusBar-statusPrimary"
    }, i18n("uploadFailed"), h("button", {
      className: "uppy-u-reset uppy-StatusBar-details",
      "aria-label": i18n("showErrorDetails"),
      "data-microtip-position": "top-right",
      "data-microtip-size": "medium",
      onClick: displayErrorAlert,
      type: "button"
    }, "?")), h(FileUploadCount, {
      i18n,
      complete,
      numUploads
    })));
  }

  // ../packages/@uppy/status-bar/lib/StatusBarUI.js
  var {
    STATE_ERROR,
    STATE_WAITING,
    STATE_PREPROCESSING,
    STATE_UPLOADING,
    STATE_POSTPROCESSING,
    STATE_COMPLETE
  } = StatusBarStates_default;
  function StatusBar(props) {
    const {
      newFiles,
      allowNewUpload,
      isUploadInProgress,
      isAllPaused,
      resumableUploads,
      error,
      hideUploadButton,
      hidePauseResumeButton,
      hideCancelButton,
      hideRetryButton,
      recoveredState,
      uploadState,
      totalProgress,
      files,
      supportsUploadProgress: supportsUploadProgress2,
      hideAfterFinish,
      isSomeGhost,
      doneButtonHandler,
      isUploadStarted,
      i18n,
      startUpload,
      uppy,
      isAllComplete,
      showProgressDetails,
      numUploads,
      complete,
      totalSize,
      totalETA,
      totalUploadedSize
    } = props;
    function getProgressValue() {
      switch (uploadState) {
        case STATE_POSTPROCESSING:
        case STATE_PREPROCESSING: {
          const progress = calculateProcessingProgress(files);
          if (progress.mode === "determinate") {
            return progress.value * 100;
          }
          return totalProgress;
        }
        case STATE_ERROR: {
          return null;
        }
        case STATE_UPLOADING: {
          if (!supportsUploadProgress2) {
            return null;
          }
          return totalProgress;
        }
        default:
          return totalProgress;
      }
    }
    function getIsIndeterminate() {
      switch (uploadState) {
        case STATE_POSTPROCESSING:
        case STATE_PREPROCESSING: {
          const {
            mode
          } = calculateProcessingProgress(files);
          return mode === "indeterminate";
        }
        case STATE_UPLOADING: {
          if (!supportsUploadProgress2) {
            return true;
          }
          return false;
        }
        default:
          return false;
      }
    }
    function getIsHidden() {
      if (recoveredState) {
        return false;
      }
      switch (uploadState) {
        case STATE_WAITING:
          return hideUploadButton || newFiles === 0;
        case STATE_COMPLETE:
          return hideAfterFinish;
        default:
          return false;
      }
    }
    const progressValue = getProgressValue();
    const isHidden = getIsHidden();
    const width = progressValue != null ? progressValue : 100;
    const showUploadBtn = !error && newFiles && !isUploadInProgress && !isAllPaused && allowNewUpload && !hideUploadButton;
    const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
    const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
    const showRetryBtn = error && !isAllComplete && !hideRetryButton;
    const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
    const progressClassNames = (0, import_classnames2.default)("uppy-StatusBar-progress", {
      "is-indeterminate": getIsIndeterminate()
    });
    const statusBarClassNames = (0, import_classnames2.default)("uppy-StatusBar", `is-${uploadState}`, {
      "has-ghosts": isSomeGhost
    });
    return h("div", {
      className: statusBarClassNames,
      "aria-hidden": isHidden
    }, h("div", {
      className: progressClassNames,
      style: {
        width: `${width}%`
      },
      role: "progressbar",
      "aria-label": `${width}%`,
      "aria-valuetext": `${width}%`,
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": progressValue
    }), (() => {
      switch (uploadState) {
        case STATE_PREPROCESSING:
        case STATE_POSTPROCESSING:
          return h(ProgressBarProcessing, {
            progress: calculateProcessingProgress(files)
          });
        case STATE_COMPLETE:
          return h(ProgressBarComplete, {
            i18n
          });
        case STATE_ERROR:
          return h(ProgressBarError, {
            error,
            i18n,
            numUploads,
            complete
          });
        case STATE_UPLOADING:
          return h(ProgressBarUploading, {
            i18n,
            supportsUploadProgress: supportsUploadProgress2,
            totalProgress,
            showProgressDetails,
            isUploadStarted,
            isAllComplete,
            isAllPaused,
            newFiles,
            numUploads,
            complete,
            totalUploadedSize,
            totalSize,
            totalETA,
            startUpload
          });
        default:
          return null;
      }
    })(), h("div", {
      className: "uppy-StatusBar-actions"
    }, recoveredState || showUploadBtn ? h(UploadBtn, {
      newFiles,
      isUploadStarted,
      recoveredState,
      i18n,
      isSomeGhost,
      startUpload,
      uploadState
    }) : null, showRetryBtn ? h(RetryBtn, {
      i18n,
      uppy
    }) : null, showPauseResumeBtn ? h(PauseResumeButton, {
      isAllPaused,
      i18n,
      isAllComplete,
      resumableUploads,
      uppy
    }) : null, showCancelBtn ? h(CancelBtn, {
      i18n,
      uppy
    }) : null, showDoneBtn ? h(DoneBtn, {
      i18n,
      doneButtonHandler
    }) : null));
  }

  // ../packages/@uppy/status-bar/lib/locale.js
  var locale_default3 = {
    strings: {
      uploading: "Uploading",
      complete: "Complete",
      uploadFailed: "Upload failed",
      paused: "Paused",
      retry: "Retry",
      cancel: "Cancel",
      pause: "Pause",
      resume: "Resume",
      done: "Done",
      filesUploadedOfTotal: {
        0: "%{complete} of %{smart_count} file uploaded",
        1: "%{complete} of %{smart_count} files uploaded"
      },
      dataUploadedOfTotal: "%{complete} of %{total}",
      xTimeLeft: "%{time} left",
      uploadXFiles: {
        0: "Upload %{smart_count} file",
        1: "Upload %{smart_count} files"
      },
      uploadXNewFiles: {
        0: "Upload +%{smart_count} file",
        1: "Upload +%{smart_count} files"
      },
      upload: "Upload",
      retryUpload: "Retry upload",
      xMoreFilesAdded: {
        0: "%{smart_count} more file added",
        1: "%{smart_count} more files added"
      },
      showErrorDetails: "Show error details"
    }
  };

  // ../packages/@uppy/status-bar/lib/StatusBar.js
  var packageJson4 = {
    "version": "3.0.1"
  };
  function getTotalSpeed(files) {
    let totalSpeed = 0;
    files.forEach((file) => {
      totalSpeed += getSpeed(file.progress);
    });
    return totalSpeed;
  }
  function getTotalETA(files) {
    const totalSpeed = getTotalSpeed(files);
    if (totalSpeed === 0) {
      return 0;
    }
    const totalBytesRemaining = files.reduce((total, file) => {
      return total + getBytesRemaining(file.progress);
    }, 0);
    return Math.round(totalBytesRemaining / totalSpeed * 10) / 10;
  }
  function getUploadingState(error, isAllComplete, recoveredState, files) {
    if (error && !isAllComplete) {
      return StatusBarStates_default.STATE_ERROR;
    }
    if (isAllComplete) {
      return StatusBarStates_default.STATE_COMPLETE;
    }
    if (recoveredState) {
      return StatusBarStates_default.STATE_WAITING;
    }
    let state = StatusBarStates_default.STATE_WAITING;
    const fileIDs = Object.keys(files);
    for (let i2 = 0; i2 < fileIDs.length; i2++) {
      const {
        progress
      } = files[fileIDs[i2]];
      if (progress.uploadStarted && !progress.uploadComplete) {
        return StatusBarStates_default.STATE_UPLOADING;
      }
      if (progress.preprocess && state !== StatusBarStates_default.STATE_UPLOADING) {
        state = StatusBarStates_default.STATE_PREPROCESSING;
      }
      if (progress.postprocess && state !== StatusBarStates_default.STATE_UPLOADING && state !== StatusBarStates_default.STATE_PREPROCESSING) {
        state = StatusBarStates_default.STATE_POSTPROCESSING;
      }
    }
    return state;
  }
  var StatusBar2 = class extends UIPlugin_default {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.startUpload = () => {
        const {
          recoveredState
        } = this.uppy.getState();
        if (recoveredState) {
          this.uppy.emit("restore-confirmed");
          return void 0;
        }
        return this.uppy.upload().catch(() => {
        });
      };
      this.id = this.opts.id || "StatusBar";
      this.title = "StatusBar";
      this.type = "progressindicator";
      this.defaultLocale = locale_default3;
      const defaultOptions4 = {
        target: "body",
        hideUploadButton: false,
        hideRetryButton: false,
        hidePauseResumeButton: false,
        hideCancelButton: false,
        showProgressDetails: false,
        hideAfterFinish: true,
        doneButtonHandler: null
      };
      this.opts = {
        ...defaultOptions4,
        ...opts
      };
      this.i18nInit();
      this.render = this.render.bind(this);
      this.install = this.install.bind(this);
    }
    render(state) {
      const {
        capabilities,
        files,
        allowNewUpload,
        totalProgress,
        error,
        recoveredState
      } = state;
      const {
        newFiles,
        startedFiles,
        completeFiles,
        inProgressNotPausedFiles,
        isUploadStarted,
        isAllComplete,
        isAllErrored,
        isAllPaused,
        isUploadInProgress,
        isSomeGhost
      } = this.uppy.getObjectOfFilesPerState();
      const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
      const totalETA = getTotalETA(inProgressNotPausedFiles);
      const resumableUploads = !!capabilities.resumableUploads;
      const supportsUploadProgress2 = capabilities.uploadProgress !== false;
      let totalSize = 0;
      let totalUploadedSize = 0;
      startedFiles.forEach((file) => {
        totalSize += file.progress.bytesTotal || 0;
        totalUploadedSize += file.progress.bytesUploaded || 0;
      });
      return StatusBar({
        error,
        uploadState: getUploadingState(error, isAllComplete, recoveredState, state.files || {}),
        allowNewUpload,
        totalProgress,
        totalSize,
        totalUploadedSize,
        isAllComplete: false,
        isAllPaused,
        isAllErrored,
        isUploadStarted,
        isUploadInProgress,
        isSomeGhost,
        recoveredState,
        complete: completeFiles.length,
        newFiles: newFilesOrRecovered.length,
        numUploads: startedFiles.length,
        totalETA,
        files,
        i18n: this.i18n,
        uppy: this.uppy,
        startUpload: this.startUpload,
        doneButtonHandler: this.opts.doneButtonHandler,
        resumableUploads,
        supportsUploadProgress: supportsUploadProgress2,
        showProgressDetails: this.opts.showProgressDetails,
        hideUploadButton: this.opts.hideUploadButton,
        hideRetryButton: this.opts.hideRetryButton,
        hidePauseResumeButton: this.opts.hidePauseResumeButton,
        hideCancelButton: this.opts.hideCancelButton,
        hideAfterFinish: this.opts.hideAfterFinish,
        isTargetDOMEl: this.isTargetDOMEl
      });
    }
    onMount() {
      const element = this.el;
      const direction = getTextDirection_default(element);
      if (!direction) {
        element.dir = "ltr";
      }
    }
    install() {
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
    }
    uninstall() {
      this.unmount();
    }
  };
  StatusBar2.VERSION = packageJson4.version;

  // ../node_modules/js-base64/base64.mjs
  var version = "3.7.2";
  var VERSION = version;
  var _hasatob = typeof atob === "function";
  var _hasbtoa = typeof btoa === "function";
  var _hasBuffer = typeof Buffer === "function";
  var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
  var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var b64chs = Array.prototype.slice.call(b64ch);
  var b64tab = ((a2) => {
    let tab = {};
    a2.forEach((c2, i2) => tab[c2] = i2);
    return tab;
  })(b64chs);
  var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  var _fromCC = String.fromCharCode.bind(String);
  var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
  var _tidyB64 = (s2) => s2.replace(/[^A-Za-z0-9\+\/]/g, "");
  var btoaPolyfill = (bin) => {
    let u32, c0, c1, c2, asc = "";
    const pad2 = bin.length % 3;
    for (let i2 = 0; i2 < bin.length; ) {
      if ((c0 = bin.charCodeAt(i2++)) > 255 || (c1 = bin.charCodeAt(i2++)) > 255 || (c2 = bin.charCodeAt(i2++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad2 ? asc.slice(0, pad2 - 3) + "===".substring(pad2) : asc;
  };
  var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
  var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i2 = 0, l2 = u8a.length; i2 < l2; i2 += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i2, i2 + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
  var cb_utob = (c2) => {
    if (c2.length < 2) {
      var cc = c2.charCodeAt(0);
      return cc < 128 ? c2 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    } else {
      var cc = 65536 + (c2.charCodeAt(0) - 55296) * 1024 + (c2.charCodeAt(1) - 56320);
      return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = (u2) => u2.replace(re_utob, cb_utob);
  var _encode = _hasBuffer ? (s2) => Buffer.from(s2, "utf8").toString("base64") : _TE ? (s2) => _fromUint8Array(_TE.encode(s2)) : (s2) => _btoa(utob(s2));
  var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
  var encodeURI = (src) => encode(src, true);
  var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  var cb_btou = (cccc) => {
    switch (cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
        return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
      case 3:
        return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
    }
  };
  var btou = (b2) => b2.replace(re_btou, cb_btou);
  var atobPolyfill = (asc) => {
    asc = asc.replace(/\s+/g, "");
    if (!b64re.test(asc))
      throw new TypeError("malformed base64.");
    asc += "==".slice(2 - (asc.length & 3));
    let u24, bin = "", r1, r2;
    for (let i2 = 0; i2 < asc.length; ) {
      u24 = b64tab[asc.charAt(i2++)] << 18 | b64tab[asc.charAt(i2++)] << 12 | (r1 = b64tab[asc.charAt(i2++)]) << 6 | (r2 = b64tab[asc.charAt(i2++)]);
      bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
  };
  var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
  var _toUint8Array = _hasBuffer ? (a2) => _U8Afrom(Buffer.from(a2, "base64")) : (a2) => _U8Afrom(_atob(a2), (c2) => c2.charCodeAt(0));
  var toUint8Array = (a2) => _toUint8Array(_unURI(a2));
  var _decode = _hasBuffer ? (a2) => Buffer.from(a2, "base64").toString("utf8") : _TD ? (a2) => _TD.decode(_toUint8Array(a2)) : (a2) => btou(_atob(a2));
  var _unURI = (a2) => _tidyB64(a2.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
  var decode = (src) => _decode(_unURI(src));
  var isValid = (src) => {
    if (typeof src !== "string")
      return false;
    const s2 = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
    return !/[^\s0-9a-zA-Z\+/]/.test(s2) || !/[^\s0-9a-zA-Z\-_]/.test(s2);
  };
  var _noEnum = (v2) => {
    return {
      value: v2,
      enumerable: false,
      writable: true,
      configurable: true
    };
  };
  var extendString = function() {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add("fromBase64", function() {
      return decode(this);
    });
    _add("toBase64", function(urlsafe) {
      return encode(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return encode(this, true);
    });
    _add("toBase64URL", function() {
      return encode(this, true);
    });
    _add("toUint8Array", function() {
      return toUint8Array(this);
    });
  };
  var extendUint8Array = function() {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add("toBase64", function(urlsafe) {
      return fromUint8Array(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return fromUint8Array(this, true);
    });
    _add("toBase64URL", function() {
      return fromUint8Array(this, true);
    });
  };
  var extendBuiltins = () => {
    extendString();
    extendUint8Array();
  };
  var gBase64 = {
    version,
    VERSION,
    atob: _atob,
    atobPolyfill,
    btoa: _btoa,
    btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode,
    encodeURI,
    encodeURL: encodeURI,
    utob,
    btou,
    decode,
    isValid,
    fromUint8Array,
    toUint8Array,
    extendString,
    extendUint8Array,
    extendBuiltins
  };

  // ../node_modules/tus-js-client/lib.esm/upload.js
  var import_url_parse = __toESM(require_url_parse());

  // ../node_modules/tus-js-client/lib.esm/error.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self2);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a2 = [null];
        a2.push.apply(a2, args2);
        var Constructor = Function.bind.apply(Parent2, a2);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e2) {
      return false;
    }
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf(o2, p2) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o3, p3) {
      o3.__proto__ = p3;
      return o3;
    };
    return _setPrototypeOf(o2, p2);
  }
  function _getPrototypeOf(o2) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o3) {
      return o3.__proto__ || Object.getPrototypeOf(o3);
    };
    return _getPrototypeOf(o2);
  }
  var DetailedError = /* @__PURE__ */ function(_Error) {
    _inherits(DetailedError2, _Error);
    var _super = _createSuper(DetailedError2);
    function DetailedError2(message) {
      var _this;
      var causingErr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var req = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      var res = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      _classCallCheck(this, DetailedError2);
      _this = _super.call(this, message);
      _this.originalRequest = req;
      _this.originalResponse = res;
      _this.causingError = causingErr;
      if (causingErr != null) {
        message += ", caused by ".concat(causingErr.toString());
      }
      if (req != null) {
        var requestId = req.getHeader("X-Request-ID") || "n/a";
        var method = req.getMethod();
        var url = req.getURL();
        var status = res ? res.getStatus() : "n/a";
        var body = res ? res.getBody() || "" : "n/a";
        message += ", originated from request (method: ".concat(method, ", url: ").concat(url, ", response code: ").concat(status, ", response text: ").concat(body, ", request id: ").concat(requestId, ")");
      }
      _this.message = message;
      return _this;
    }
    return _createClass(DetailedError2);
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  var error_default = DetailedError;

  // ../node_modules/tus-js-client/lib.esm/logger.js
  var isEnabled = false;
  function log(msg) {
    if (!isEnabled)
      return;
    console.log(msg);
  }

  // ../node_modules/tus-js-client/lib.esm/uuid.js
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c2) {
      var r2 = Math.random() * 16 | 0;
      var v2 = c2 === "x" ? r2 : r2 & 3 | 8;
      return v2.toString(16);
    });
  }

  // ../node_modules/tus-js-client/lib.esm/upload.js
  function _slicedToArray(arr, i2) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o2, minLen) {
    if (!o2)
      return;
    if (typeof o2 === "string")
      return _arrayLikeToArray(o2, minLen);
    var n2 = Object.prototype.toString.call(o2).slice(8, -1);
    if (n2 === "Object" && o2.constructor)
      n2 = o2.constructor.name;
    if (n2 === "Map" || n2 === "Set")
      return Array.from(o2);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return _arrayLikeToArray(o2, minLen);
  }
  function _arrayLikeToArray(arr, len2) {
    if (len2 == null || len2 > arr.length)
      len2 = arr.length;
    for (var i2 = 0, arr2 = new Array(len2); i2 < len2; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i2) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = null != arguments[i2] ? arguments[i2] : {};
      i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var defaultOptions2 = {
    endpoint: null,
    uploadUrl: null,
    metadata: {},
    fingerprint: null,
    uploadSize: null,
    onProgress: null,
    onChunkComplete: null,
    onSuccess: null,
    onError: null,
    _onUploadUrlAvailable: null,
    overridePatchMethod: false,
    headers: {},
    addRequestId: false,
    onBeforeRequest: null,
    onAfterResponse: null,
    onShouldRetry: null,
    chunkSize: Infinity,
    retryDelays: [0, 1e3, 3e3, 5e3],
    parallelUploads: 1,
    parallelUploadBoundaries: null,
    storeFingerprintForResuming: true,
    removeFingerprintOnSuccess: false,
    uploadLengthDeferred: false,
    uploadDataDuringCreation: false,
    urlStorage: null,
    fileReader: null,
    httpStack: null
  };
  var BaseUpload = /* @__PURE__ */ function() {
    function BaseUpload2(file, options) {
      _classCallCheck2(this, BaseUpload2);
      if ("resume" in options) {
        console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead.");
      }
      this.options = options;
      this.options.chunkSize = Number(this.options.chunkSize);
      this._urlStorage = this.options.urlStorage;
      this.file = file;
      this.url = null;
      this._req = null;
      this._fingerprint = null;
      this._urlStorageKey = null;
      this._offset = null;
      this._aborted = false;
      this._size = null;
      this._source = null;
      this._retryAttempt = 0;
      this._retryTimeout = null;
      this._offsetBeforeRetry = 0;
      this._parallelUploads = null;
      this._parallelUploadUrls = null;
    }
    _createClass2(BaseUpload2, [{
      key: "findPreviousUploads",
      value: function findPreviousUploads() {
        var _this = this;
        return this.options.fingerprint(this.file, this.options).then(function(fingerprint2) {
          return _this._urlStorage.findUploadsByFingerprint(fingerprint2);
        });
      }
    }, {
      key: "resumeFromPreviousUpload",
      value: function resumeFromPreviousUpload(previousUpload) {
        this.url = previousUpload.uploadUrl || null;
        this._parallelUploadUrls = previousUpload.parallelUploadUrls || null;
        this._urlStorageKey = previousUpload.urlStorageKey;
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        var file = this.file;
        if (!file) {
          this._emitError(new Error("tus: no file or stream to upload provided"));
          return;
        }
        if (!this.options.endpoint && !this.options.uploadUrl && !this.url) {
          this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
          return;
        }
        var retryDelays = this.options.retryDelays;
        if (retryDelays != null && Object.prototype.toString.call(retryDelays) !== "[object Array]") {
          this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
          return;
        }
        if (this.options.parallelUploads > 1) {
          for (var _i = 0, _arr = ["uploadUrl", "uploadSize", "uploadLengthDeferred"]; _i < _arr.length; _i++) {
            var optionName = _arr[_i];
            if (this.options[optionName]) {
              this._emitError(new Error("tus: cannot use the ".concat(optionName, " option when parallelUploads is enabled")));
              return;
            }
          }
        }
        if (this.options.parallelUploadBoundaries) {
          if (this.options.parallelUploads <= 1) {
            this._emitError(new Error("tus: cannot use the `parallelUploadBoundaries` option when `parallelUploads` is disabled"));
            return;
          }
          if (this.options.parallelUploads !== this.options.parallelUploadBoundaries.length) {
            this._emitError(new Error("tus: the `parallelUploadBoundaries` must have the same length as the value of `parallelUploads`"));
            return;
          }
        }
        this.options.fingerprint(file, this.options).then(function(fingerprint2) {
          if (fingerprint2 == null) {
            log("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.");
          } else {
            log("Calculated fingerprint: ".concat(fingerprint2));
          }
          _this2._fingerprint = fingerprint2;
          if (_this2._source) {
            return _this2._source;
          }
          return _this2.options.fileReader.openFile(file, _this2.options.chunkSize);
        }).then(function(source) {
          _this2._source = source;
          if (_this2.options.uploadLengthDeferred) {
            _this2._size = null;
          } else if (_this2.options.uploadSize != null) {
            _this2._size = Number(_this2.options.uploadSize);
            if (Number.isNaN(_this2._size)) {
              _this2._emitError(new Error("tus: cannot convert `uploadSize` option into a number"));
              return;
            }
          } else {
            _this2._size = _this2._source.size;
            if (_this2._size == null) {
              _this2._emitError(new Error("tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"));
              return;
            }
          }
          if (_this2.options.parallelUploads > 1 || _this2._parallelUploadUrls != null) {
            _this2._startParallelUpload();
          } else {
            _this2._startSingleUpload();
          }
        })["catch"](function(err) {
          _this2._emitError(err);
        });
      }
    }, {
      key: "_startParallelUpload",
      value: function _startParallelUpload() {
        var _this$options$paralle, _this3 = this;
        var totalSize = this._size;
        var totalProgress = 0;
        this._parallelUploads = [];
        var partCount = this._parallelUploadUrls != null ? this._parallelUploadUrls.length : this.options.parallelUploads;
        var parts = (_this$options$paralle = this.options.parallelUploadBoundaries) !== null && _this$options$paralle !== void 0 ? _this$options$paralle : splitSizeIntoParts(this._source.size, partCount);
        if (this._parallelUploadUrls) {
          parts.forEach(function(part, index) {
            part.uploadUrl = _this3._parallelUploadUrls[index] || null;
          });
        }
        this._parallelUploadUrls = new Array(parts.length);
        var uploads = parts.map(function(part, index) {
          var lastPartProgress = 0;
          return _this3._source.slice(part.start, part.end).then(function(_ref) {
            var value = _ref.value;
            return new Promise(function(resolve, reject) {
              var options = _objectSpread(_objectSpread({}, _this3.options), {}, {
                uploadUrl: part.uploadUrl || null,
                storeFingerprintForResuming: false,
                removeFingerprintOnSuccess: false,
                parallelUploads: 1,
                parallelUploadBoundaries: null,
                metadata: {},
                headers: _objectSpread(_objectSpread({}, _this3.options.headers), {}, {
                  "Upload-Concat": "partial"
                }),
                onSuccess: resolve,
                onError: reject,
                onProgress: function onProgress(newPartProgress) {
                  totalProgress = totalProgress - lastPartProgress + newPartProgress;
                  lastPartProgress = newPartProgress;
                  _this3._emitProgress(totalProgress, totalSize);
                },
                _onUploadUrlAvailable: function _onUploadUrlAvailable() {
                  _this3._parallelUploadUrls[index] = upload.url;
                  if (_this3._parallelUploadUrls.filter(function(u2) {
                    return Boolean(u2);
                  }).length === parts.length) {
                    _this3._saveUploadInUrlStorage();
                  }
                }
              });
              var upload = new BaseUpload2(value, options);
              upload.start();
              _this3._parallelUploads.push(upload);
            });
          });
        });
        var req;
        Promise.all(uploads).then(function() {
          req = _this3._openRequest("POST", _this3.options.endpoint);
          req.setHeader("Upload-Concat", "final;".concat(_this3._parallelUploadUrls.join(" ")));
          var metadata = encodeMetadata(_this3.options.metadata);
          if (metadata !== "") {
            req.setHeader("Upload-Metadata", metadata);
          }
          return _this3._sendRequest(req, null);
        }).then(function(res) {
          if (!inStatusCategory(res.getStatus(), 200)) {
            _this3._emitHttpError(req, res, "tus: unexpected response while creating upload");
            return;
          }
          var location = res.getHeader("Location");
          if (location == null) {
            _this3._emitHttpError(req, res, "tus: invalid or missing Location header");
            return;
          }
          _this3.url = resolveUrl(_this3.options.endpoint, location);
          log("Created upload at ".concat(_this3.url));
          _this3._emitSuccess();
        })["catch"](function(err) {
          _this3._emitError(err);
        });
      }
    }, {
      key: "_startSingleUpload",
      value: function _startSingleUpload() {
        this._aborted = false;
        if (this.url != null) {
          log("Resuming upload from previous URL: ".concat(this.url));
          this._resumeUpload();
          return;
        }
        if (this.options.uploadUrl != null) {
          log("Resuming upload from provided URL: ".concat(this.options.uploadUrl));
          this.url = this.options.uploadUrl;
          this._resumeUpload();
          return;
        }
        log("Creating a new upload");
        this._createUpload();
      }
    }, {
      key: "abort",
      value: function abort(shouldTerminate) {
        var _this4 = this;
        if (this._parallelUploads != null) {
          this._parallelUploads.forEach(function(upload) {
            upload.abort(shouldTerminate);
          });
        }
        if (this._req !== null) {
          this._req.abort();
        }
        this._aborted = true;
        if (this._retryTimeout != null) {
          clearTimeout(this._retryTimeout);
          this._retryTimeout = null;
        }
        if (!shouldTerminate || this.url == null) {
          return Promise.resolve();
        }
        return BaseUpload2.terminate(this.url, this.options).then(function() {
          return _this4._removeFromUrlStorage();
        });
      }
    }, {
      key: "_emitHttpError",
      value: function _emitHttpError(req, res, message, causingErr) {
        this._emitError(new error_default(message, causingErr, req, res));
      }
    }, {
      key: "_emitError",
      value: function _emitError(err) {
        var _this5 = this;
        if (this._aborted)
          return;
        if (this.options.retryDelays != null) {
          var shouldResetDelays = this._offset != null && this._offset > this._offsetBeforeRetry;
          if (shouldResetDelays) {
            this._retryAttempt = 0;
          }
          if (shouldRetry(err, this._retryAttempt, this.options)) {
            var delay = this.options.retryDelays[this._retryAttempt++];
            this._offsetBeforeRetry = this._offset;
            this._retryTimeout = setTimeout(function() {
              _this5.start();
            }, delay);
            return;
          }
        }
        if (typeof this.options.onError === "function") {
          this.options.onError(err);
        } else {
          throw err;
        }
      }
    }, {
      key: "_emitSuccess",
      value: function _emitSuccess() {
        if (this.options.removeFingerprintOnSuccess) {
          this._removeFromUrlStorage();
        }
        if (typeof this.options.onSuccess === "function") {
          this.options.onSuccess();
        }
      }
    }, {
      key: "_emitProgress",
      value: function _emitProgress(bytesSent, bytesTotal) {
        if (typeof this.options.onProgress === "function") {
          this.options.onProgress(bytesSent, bytesTotal);
        }
      }
    }, {
      key: "_emitChunkComplete",
      value: function _emitChunkComplete(chunkSize, bytesAccepted, bytesTotal) {
        if (typeof this.options.onChunkComplete === "function") {
          this.options.onChunkComplete(chunkSize, bytesAccepted, bytesTotal);
        }
      }
    }, {
      key: "_createUpload",
      value: function _createUpload3() {
        var _this6 = this;
        if (!this.options.endpoint) {
          this._emitError(new Error("tus: unable to create upload because no endpoint is provided"));
          return;
        }
        var req = this._openRequest("POST", this.options.endpoint);
        if (this.options.uploadLengthDeferred) {
          req.setHeader("Upload-Defer-Length", 1);
        } else {
          req.setHeader("Upload-Length", this._size);
        }
        var metadata = encodeMetadata(this.options.metadata);
        if (metadata !== "") {
          req.setHeader("Upload-Metadata", metadata);
        }
        var promise;
        if (this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred) {
          this._offset = 0;
          promise = this._addChunkToRequest(req);
        } else {
          promise = this._sendRequest(req, null);
        }
        promise.then(function(res) {
          if (!inStatusCategory(res.getStatus(), 200)) {
            _this6._emitHttpError(req, res, "tus: unexpected response while creating upload");
            return;
          }
          var location = res.getHeader("Location");
          if (location == null) {
            _this6._emitHttpError(req, res, "tus: invalid or missing Location header");
            return;
          }
          _this6.url = resolveUrl(_this6.options.endpoint, location);
          log("Created upload at ".concat(_this6.url));
          if (typeof _this6.options._onUploadUrlAvailable === "function") {
            _this6.options._onUploadUrlAvailable();
          }
          if (_this6._size === 0) {
            _this6._emitSuccess();
            _this6._source.close();
            return;
          }
          _this6._saveUploadInUrlStorage().then(function() {
            if (_this6.options.uploadDataDuringCreation) {
              _this6._handleUploadResponse(req, res);
            } else {
              _this6._offset = 0;
              _this6._performUpload();
            }
          });
        })["catch"](function(err) {
          _this6._emitHttpError(req, null, "tus: failed to create upload", err);
        });
      }
    }, {
      key: "_resumeUpload",
      value: function _resumeUpload() {
        var _this7 = this;
        var req = this._openRequest("HEAD", this.url);
        var promise = this._sendRequest(req, null);
        promise.then(function(res) {
          var status = res.getStatus();
          if (!inStatusCategory(status, 200)) {
            if (status === 423) {
              _this7._emitHttpError(req, res, "tus: upload is currently locked; retry later");
              return;
            }
            if (inStatusCategory(status, 400)) {
              _this7._removeFromUrlStorage();
            }
            if (!_this7.options.endpoint) {
              _this7._emitHttpError(req, res, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
              return;
            }
            _this7.url = null;
            _this7._createUpload();
            return;
          }
          var offset = parseInt(res.getHeader("Upload-Offset"), 10);
          if (Number.isNaN(offset)) {
            _this7._emitHttpError(req, res, "tus: invalid or missing offset value");
            return;
          }
          var length = parseInt(res.getHeader("Upload-Length"), 10);
          if (Number.isNaN(length) && !_this7.options.uploadLengthDeferred) {
            _this7._emitHttpError(req, res, "tus: invalid or missing length value");
            return;
          }
          if (typeof _this7.options._onUploadUrlAvailable === "function") {
            _this7.options._onUploadUrlAvailable();
          }
          _this7._saveUploadInUrlStorage().then(function() {
            if (offset === length) {
              _this7._emitProgress(length, length);
              _this7._emitSuccess();
              return;
            }
            _this7._offset = offset;
            _this7._performUpload();
          });
        })["catch"](function(err) {
          _this7._emitHttpError(req, null, "tus: failed to resume upload", err);
        });
      }
    }, {
      key: "_performUpload",
      value: function _performUpload() {
        var _this8 = this;
        if (this._aborted) {
          return;
        }
        var req;
        if (this.options.overridePatchMethod) {
          req = this._openRequest("POST", this.url);
          req.setHeader("X-HTTP-Method-Override", "PATCH");
        } else {
          req = this._openRequest("PATCH", this.url);
        }
        req.setHeader("Upload-Offset", this._offset);
        var promise = this._addChunkToRequest(req);
        promise.then(function(res) {
          if (!inStatusCategory(res.getStatus(), 200)) {
            _this8._emitHttpError(req, res, "tus: unexpected response while uploading chunk");
            return;
          }
          _this8._handleUploadResponse(req, res);
        })["catch"](function(err) {
          if (_this8._aborted) {
            return;
          }
          _this8._emitHttpError(req, null, "tus: failed to upload chunk at offset ".concat(_this8._offset), err);
        });
      }
    }, {
      key: "_addChunkToRequest",
      value: function _addChunkToRequest(req) {
        var _this9 = this;
        var start = this._offset;
        var end = this._offset + this.options.chunkSize;
        req.setProgressHandler(function(bytesSent) {
          _this9._emitProgress(start + bytesSent, _this9._size);
        });
        req.setHeader("Content-Type", "application/offset+octet-stream");
        if ((end === Infinity || end > this._size) && !this.options.uploadLengthDeferred) {
          end = this._size;
        }
        return this._source.slice(start, end).then(function(_ref2) {
          var value = _ref2.value, done = _ref2.done;
          if (_this9.options.uploadLengthDeferred && done) {
            _this9._size = _this9._offset + (value && value.size ? value.size : 0);
            req.setHeader("Upload-Length", _this9._size);
          }
          if (value === null) {
            return _this9._sendRequest(req);
          }
          _this9._emitProgress(_this9._offset, _this9._size);
          return _this9._sendRequest(req, value);
        });
      }
    }, {
      key: "_handleUploadResponse",
      value: function _handleUploadResponse(req, res) {
        var offset = parseInt(res.getHeader("Upload-Offset"), 10);
        if (Number.isNaN(offset)) {
          this._emitHttpError(req, res, "tus: invalid or missing offset value");
          return;
        }
        this._emitProgress(offset, this._size);
        this._emitChunkComplete(offset - this._offset, offset, this._size);
        this._offset = offset;
        if (offset === this._size) {
          this._emitSuccess();
          this._source.close();
          return;
        }
        this._performUpload();
      }
    }, {
      key: "_openRequest",
      value: function _openRequest(method, url) {
        var req = openRequest(method, url, this.options);
        this._req = req;
        return req;
      }
    }, {
      key: "_removeFromUrlStorage",
      value: function _removeFromUrlStorage() {
        var _this10 = this;
        if (!this._urlStorageKey)
          return;
        this._urlStorage.removeUpload(this._urlStorageKey)["catch"](function(err) {
          _this10._emitError(err);
        });
        this._urlStorageKey = null;
      }
    }, {
      key: "_saveUploadInUrlStorage",
      value: function _saveUploadInUrlStorage() {
        var _this11 = this;
        if (!this.options.storeFingerprintForResuming || !this._fingerprint || this._urlStorageKey !== null) {
          return Promise.resolve();
        }
        var storedUpload = {
          size: this._size,
          metadata: this.options.metadata,
          creationTime: new Date().toString()
        };
        if (this._parallelUploads) {
          storedUpload.parallelUploadUrls = this._parallelUploadUrls;
        } else {
          storedUpload.uploadUrl = this.url;
        }
        return this._urlStorage.addUpload(this._fingerprint, storedUpload).then(function(urlStorageKey) {
          _this11._urlStorageKey = urlStorageKey;
        });
      }
    }, {
      key: "_sendRequest",
      value: function _sendRequest(req) {
        var body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return sendRequest(req, body, this.options);
      }
    }], [{
      key: "terminate",
      value: function terminate(url) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var req = openRequest("DELETE", url, options);
        return sendRequest(req, null, options).then(function(res) {
          if (res.getStatus() === 204) {
            return;
          }
          throw new error_default("tus: unexpected response while terminating upload", null, req, res);
        })["catch"](function(err) {
          if (!(err instanceof error_default)) {
            err = new error_default("tus: failed to terminate upload", err, req, null);
          }
          if (!shouldRetry(err, 0, options)) {
            throw err;
          }
          var delay = options.retryDelays[0];
          var remainingDelays = options.retryDelays.slice(1);
          var newOptions = _objectSpread(_objectSpread({}, options), {}, {
            retryDelays: remainingDelays
          });
          return new Promise(function(resolve) {
            return setTimeout(resolve, delay);
          }).then(function() {
            return BaseUpload2.terminate(url, newOptions);
          });
        });
      }
    }]);
    return BaseUpload2;
  }();
  function encodeMetadata(metadata) {
    return Object.entries(metadata).map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value = _ref4[1];
      return "".concat(key, " ").concat(gBase64.encode(String(value)));
    }).join(",");
  }
  function inStatusCategory(status, category) {
    return status >= category && status < category + 100;
  }
  function openRequest(method, url, options) {
    var req = options.httpStack.createRequest(method, url);
    req.setHeader("Tus-Resumable", "1.0.0");
    var headers = options.headers || {};
    Object.entries(headers).forEach(function(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2), name = _ref6[0], value = _ref6[1];
      req.setHeader(name, value);
    });
    if (options.addRequestId) {
      var requestId = uuid();
      req.setHeader("X-Request-ID", requestId);
    }
    return req;
  }
  function sendRequest(req, body, options) {
    var onBeforeRequestPromise = typeof options.onBeforeRequest === "function" ? Promise.resolve(options.onBeforeRequest(req)) : Promise.resolve();
    return onBeforeRequestPromise.then(function() {
      return req.send(body).then(function(res) {
        var onAfterResponsePromise = typeof options.onAfterResponse === "function" ? Promise.resolve(options.onAfterResponse(req, res)) : Promise.resolve();
        return onAfterResponsePromise.then(function() {
          return res;
        });
      });
    });
  }
  function isOnline() {
    var online = true;
    if (typeof window !== "undefined" && "navigator" in window && window.navigator.onLine === false) {
      online = false;
    }
    return online;
  }
  function shouldRetry(err, retryAttempt, options) {
    if (options.retryDelays == null || retryAttempt >= options.retryDelays.length || err.originalRequest == null) {
      return false;
    }
    if (options && typeof options.onShouldRetry === "function") {
      return options.onShouldRetry(err, retryAttempt, options);
    }
    var status = err.originalResponse ? err.originalResponse.getStatus() : 0;
    return (!inStatusCategory(status, 400) || status === 409 || status === 423) && isOnline();
  }
  function resolveUrl(origin, link) {
    return new import_url_parse.default(link, origin).toString();
  }
  function splitSizeIntoParts(totalSize, partCount) {
    var partSize = Math.floor(totalSize / partCount);
    var parts = [];
    for (var i2 = 0; i2 < partCount; i2++) {
      parts.push({
        start: partSize * i2,
        end: partSize * (i2 + 1)
      });
    }
    parts[partCount - 1].end = totalSize;
    return parts;
  }
  BaseUpload.defaultOptions = defaultOptions2;
  var upload_default = BaseUpload;

  // ../node_modules/tus-js-client/lib.esm/noopUrlStorage.js
  function _classCallCheck3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties3(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass3(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties3(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties3(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var NoopUrlStorage = /* @__PURE__ */ function() {
    function NoopUrlStorage2() {
      _classCallCheck3(this, NoopUrlStorage2);
    }
    _createClass3(NoopUrlStorage2, [{
      key: "listAllUploads",
      value: function listAllUploads() {
        return Promise.resolve([]);
      }
    }, {
      key: "findUploadsByFingerprint",
      value: function findUploadsByFingerprint(fingerprint2) {
        return Promise.resolve([]);
      }
    }, {
      key: "removeUpload",
      value: function removeUpload(urlStorageKey) {
        return Promise.resolve();
      }
    }, {
      key: "addUpload",
      value: function addUpload(fingerprint2, upload) {
        return Promise.resolve(null);
      }
    }]);
    return NoopUrlStorage2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/urlStorage.js
  function _classCallCheck4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties4(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass4(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties4(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties4(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var hasStorage = false;
  try {
    hasStorage = "localStorage" in window;
    key = "tusSupport";
    localStorage.setItem(key, localStorage.getItem(key));
  } catch (e2) {
    if (e2.code === e2.SECURITY_ERR || e2.code === e2.QUOTA_EXCEEDED_ERR) {
      hasStorage = false;
    } else {
      throw e2;
    }
  }
  var key;
  var canStoreURLs = hasStorage;
  var WebStorageUrlStorage = /* @__PURE__ */ function() {
    function WebStorageUrlStorage2() {
      _classCallCheck4(this, WebStorageUrlStorage2);
    }
    _createClass4(WebStorageUrlStorage2, [{
      key: "findAllUploads",
      value: function findAllUploads() {
        var results = this._findEntries("tus::");
        return Promise.resolve(results);
      }
    }, {
      key: "findUploadsByFingerprint",
      value: function findUploadsByFingerprint(fingerprint2) {
        var results = this._findEntries("tus::".concat(fingerprint2, "::"));
        return Promise.resolve(results);
      }
    }, {
      key: "removeUpload",
      value: function removeUpload(urlStorageKey) {
        localStorage.removeItem(urlStorageKey);
        return Promise.resolve();
      }
    }, {
      key: "addUpload",
      value: function addUpload(fingerprint2, upload) {
        var id10 = Math.round(Math.random() * 1e12);
        var key = "tus::".concat(fingerprint2, "::").concat(id10);
        localStorage.setItem(key, JSON.stringify(upload));
        return Promise.resolve(key);
      }
    }, {
      key: "_findEntries",
      value: function _findEntries(prefix) {
        var results = [];
        for (var i2 = 0; i2 < localStorage.length; i2++) {
          var _key = localStorage.key(i2);
          if (_key.indexOf(prefix) !== 0)
            continue;
          try {
            var upload = JSON.parse(localStorage.getItem(_key));
            upload.urlStorageKey = _key;
            results.push(upload);
          } catch (e2) {
          }
        }
        return results;
      }
    }]);
    return WebStorageUrlStorage2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/httpStack.js
  function _classCallCheck5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties5(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass5(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties5(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties5(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var XHRHttpStack = /* @__PURE__ */ function() {
    function XHRHttpStack2() {
      _classCallCheck5(this, XHRHttpStack2);
    }
    _createClass5(XHRHttpStack2, [{
      key: "createRequest",
      value: function createRequest(method, url) {
        return new Request(method, url);
      }
    }, {
      key: "getName",
      value: function getName2() {
        return "XHRHttpStack";
      }
    }]);
    return XHRHttpStack2;
  }();
  var Request = /* @__PURE__ */ function() {
    function Request2(method, url) {
      _classCallCheck5(this, Request2);
      this._xhr = new XMLHttpRequest();
      this._xhr.open(method, url, true);
      this._method = method;
      this._url = url;
      this._headers = {};
    }
    _createClass5(Request2, [{
      key: "getMethod",
      value: function getMethod() {
        return this._method;
      }
    }, {
      key: "getURL",
      value: function getURL() {
        return this._url;
      }
    }, {
      key: "setHeader",
      value: function setHeader(header, value) {
        this._xhr.setRequestHeader(header, value);
        this._headers[header] = value;
      }
    }, {
      key: "getHeader",
      value: function getHeader(header) {
        return this._headers[header];
      }
    }, {
      key: "setProgressHandler",
      value: function setProgressHandler(progressHandler) {
        if (!("upload" in this._xhr)) {
          return;
        }
        this._xhr.upload.onprogress = function(e2) {
          if (!e2.lengthComputable) {
            return;
          }
          progressHandler(e2.loaded);
        };
      }
    }, {
      key: "send",
      value: function send() {
        var _this = this;
        var body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        return new Promise(function(resolve, reject) {
          _this._xhr.onload = function() {
            resolve(new Response(_this._xhr));
          };
          _this._xhr.onerror = function(err) {
            reject(err);
          };
          _this._xhr.send(body);
        });
      }
    }, {
      key: "abort",
      value: function abort() {
        this._xhr.abort();
        return Promise.resolve();
      }
    }, {
      key: "getUnderlyingObject",
      value: function getUnderlyingObject() {
        return this._xhr;
      }
    }]);
    return Request2;
  }();
  var Response = /* @__PURE__ */ function() {
    function Response2(xhr) {
      _classCallCheck5(this, Response2);
      this._xhr = xhr;
    }
    _createClass5(Response2, [{
      key: "getStatus",
      value: function getStatus() {
        return this._xhr.status;
      }
    }, {
      key: "getHeader",
      value: function getHeader(header) {
        return this._xhr.getResponseHeader(header);
      }
    }, {
      key: "getBody",
      value: function getBody() {
        return this._xhr.responseText;
      }
    }, {
      key: "getUnderlyingObject",
      value: function getUnderlyingObject() {
        return this._xhr;
      }
    }]);
    return Response2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/isReactNative.js
  var isReactNative = function isReactNative2() {
    return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  };
  var isReactNative_default = isReactNative;

  // ../node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
  function uriToBlob(uri) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function() {
        var blob = xhr.response;
        resolve(blob);
      };
      xhr.onerror = function(err) {
        reject(err);
      };
      xhr.open("GET", uri);
      xhr.send();
    });
  }

  // ../node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js
  var isCordova = function isCordova2() {
    return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
  };
  var isCordova_default = isCordova;

  // ../node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
  function readAsByteArray(chunk) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() {
        var value = new Uint8Array(reader.result);
        resolve({
          value
        });
      };
      reader.onerror = function(err) {
        reject(err);
      };
      reader.readAsArrayBuffer(chunk);
    });
  }

  // ../node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
  function _classCallCheck6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties6(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass6(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties6(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties6(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var FileSource = /* @__PURE__ */ function() {
    function FileSource2(file) {
      _classCallCheck6(this, FileSource2);
      this._file = file;
      this.size = file.size;
    }
    _createClass6(FileSource2, [{
      key: "slice",
      value: function slice(start, end) {
        if (isCordova_default()) {
          return readAsByteArray(this._file.slice(start, end));
        }
        var value = this._file.slice(start, end);
        return Promise.resolve({
          value
        });
      }
    }, {
      key: "close",
      value: function close() {
      }
    }]);
    return FileSource2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
  function _classCallCheck7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties7(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass7(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties7(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties7(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function len(blobOrArray) {
    if (blobOrArray === void 0)
      return 0;
    if (blobOrArray.size !== void 0)
      return blobOrArray.size;
    return blobOrArray.length;
  }
  function concat(a2, b2) {
    if (a2.concat) {
      return a2.concat(b2);
    }
    if (a2 instanceof Blob) {
      return new Blob([a2, b2], {
        type: a2.type
      });
    }
    if (a2.set) {
      var c2 = new a2.constructor(a2.length + b2.length);
      c2.set(a2);
      c2.set(b2, a2.length);
      return c2;
    }
    throw new Error("Unknown data type");
  }
  var StreamSource = /* @__PURE__ */ function() {
    function StreamSource2(reader) {
      _classCallCheck7(this, StreamSource2);
      this._buffer = void 0;
      this._bufferOffset = 0;
      this._reader = reader;
      this._done = false;
    }
    _createClass7(StreamSource2, [{
      key: "slice",
      value: function slice(start, end) {
        if (start < this._bufferOffset) {
          return Promise.reject(new Error("Requested data is before the reader's current offset"));
        }
        return this._readUntilEnoughDataOrDone(start, end);
      }
    }, {
      key: "_readUntilEnoughDataOrDone",
      value: function _readUntilEnoughDataOrDone(start, end) {
        var _this = this;
        var hasEnoughData = end <= this._bufferOffset + len(this._buffer);
        if (this._done || hasEnoughData) {
          var value = this._getDataFromBuffer(start, end);
          var done = value == null ? this._done : false;
          return Promise.resolve({
            value,
            done
          });
        }
        return this._reader.read().then(function(_ref) {
          var value2 = _ref.value, done2 = _ref.done;
          if (done2) {
            _this._done = true;
          } else if (_this._buffer === void 0) {
            _this._buffer = value2;
          } else {
            _this._buffer = concat(_this._buffer, value2);
          }
          return _this._readUntilEnoughDataOrDone(start, end);
        });
      }
    }, {
      key: "_getDataFromBuffer",
      value: function _getDataFromBuffer(start, end) {
        if (start > this._bufferOffset) {
          this._buffer = this._buffer.slice(start - this._bufferOffset);
          this._bufferOffset = start;
        }
        var hasAllDataBeenRead = len(this._buffer) === 0;
        if (this._done && hasAllDataBeenRead) {
          return null;
        }
        return this._buffer.slice(0, end - start);
      }
    }, {
      key: "close",
      value: function close() {
        if (this._reader.cancel) {
          this._reader.cancel();
        }
      }
    }]);
    return StreamSource2;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/fileReader.js
  function _classCallCheck8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties8(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass8(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties8(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties8(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  var FileReader2 = /* @__PURE__ */ function() {
    function FileReader3() {
      _classCallCheck8(this, FileReader3);
    }
    _createClass8(FileReader3, [{
      key: "openFile",
      value: function openFile(input, chunkSize) {
        if (isReactNative_default() && input && typeof input.uri !== "undefined") {
          return uriToBlob(input.uri).then(function(blob) {
            return new FileSource(blob);
          })["catch"](function(err) {
            throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(err));
          });
        }
        if (typeof input.slice === "function" && typeof input.size !== "undefined") {
          return Promise.resolve(new FileSource(input));
        }
        if (typeof input.read === "function") {
          chunkSize = Number(chunkSize);
          if (!Number.isFinite(chunkSize)) {
            return Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"));
          }
          return Promise.resolve(new StreamSource(input, chunkSize));
        }
        return Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
      }
    }]);
    return FileReader3;
  }();

  // ../node_modules/tus-js-client/lib.esm/browser/fileSignature.js
  function fingerprint(file, options) {
    if (isReactNative_default()) {
      return Promise.resolve(reactNativeFingerprint(file, options));
    }
    return Promise.resolve(["tus-br", file.name, file.type, file.size, file.lastModified, options.endpoint].join("-"));
  }
  function reactNativeFingerprint(file, options) {
    var exifHash = file.exif ? hashCode(JSON.stringify(file.exif)) : "noexif";
    return ["tus-rn", file.name || "noname", file.size || "nosize", exifHash, options.endpoint].join("/");
  }
  function hashCode(str) {
    var hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (var i2 = 0; i2 < str.length; i2++) {
      var _char = str.charCodeAt(i2);
      hash = (hash << 5) - hash + _char;
      hash &= hash;
    }
    return hash;
  }

  // ../node_modules/tus-js-client/lib.esm/browser/index.js
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  function _classCallCheck9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties9(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass9(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties9(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties9(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf2(subClass, superClass);
  }
  function _setPrototypeOf2(o2, p2) {
    _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o3, p3) {
      o3.__proto__ = p3;
      return o3;
    };
    return _setPrototypeOf2(o2, p2);
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf2(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf2(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn2(this, result);
    };
  }
  function _possibleConstructorReturn2(self2, call) {
    if (call && (_typeof2(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized2(self2);
  }
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e2) {
      return false;
    }
  }
  function _getPrototypeOf2(o2) {
    _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o3) {
      return o3.__proto__ || Object.getPrototypeOf(o3);
    };
    return _getPrototypeOf2(o2);
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = null != arguments[i2] ? arguments[i2] : {};
      i2 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var defaultOptions3 = _objectSpread2(_objectSpread2({}, upload_default.defaultOptions), {}, {
    httpStack: new XHRHttpStack(),
    fileReader: new FileReader2(),
    urlStorage: canStoreURLs ? new WebStorageUrlStorage() : new NoopUrlStorage(),
    fingerprint
  });
  var Upload = /* @__PURE__ */ function(_BaseUpload) {
    _inherits2(Upload2, _BaseUpload);
    var _super = _createSuper2(Upload2);
    function Upload2() {
      var file = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck9(this, Upload2);
      options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
      return _super.call(this, file, options);
    }
    _createClass9(Upload2, null, [{
      key: "terminate",
      value: function terminate(url, options, cb) {
        options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
        return upload_default.terminate(url, options, cb);
      }
    }]);
    return Upload2;
  }(upload_default);
  var _window = window;
  var XMLHttpRequest2 = _window.XMLHttpRequest;
  var Blob2 = _window.Blob;
  var isSupported = XMLHttpRequest2 && Blob2 && typeof Blob2.prototype.slice === "function";

  // ../packages/@uppy/utils/lib/NetworkError.js
  var NetworkError = class extends Error {
    constructor(error, xhr) {
      if (xhr === void 0) {
        xhr = null;
      }
      super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
      this.cause = error;
      this.isNetworkError = true;
      this.request = xhr;
    }
  };
  var NetworkError_default = NetworkError;

  // ../packages/@uppy/utils/lib/fetchWithNetworkError.js
  function fetchWithNetworkError() {
    return fetch(...arguments).catch((err) => {
      if (err.name === "AbortError") {
        throw err;
      } else {
        throw new NetworkError_default(err);
      }
    });
  }

  // ../packages/@uppy/utils/lib/ErrorWithCause.js
  var ErrorWithCause = class extends Error {
    constructor(message, options) {
      if (options === void 0) {
        options = {};
      }
      super(message);
      this.cause = options.cause;
      if (this.cause && has(this.cause, "isNetworkError")) {
        this.isNetworkError = this.cause.isNetworkError;
      }
    }
  };
  var ErrorWithCause_default = ErrorWithCause;

  // ../packages/@uppy/companion-client/lib/AuthError.js
  var AuthError = class extends Error {
    constructor() {
      super("Authorization required");
      this.name = "AuthError";
      this.isAuthError = true;
    }
  };
  var AuthError_default = AuthError;

  // ../packages/@uppy/companion-client/lib/RequestClient.js
  var _Symbol$for3;
  function _classPrivateFieldLooseBase5(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id5 = 0;
  function _classPrivateFieldLooseKey5(name) {
    return "__private_" + id5++ + "_" + name;
  }
  var packageJson5 = {
    "version": "3.1.1"
  };
  function stripSlash(url) {
    return url.replace(/\/$/, "");
  }
  async function handleJSONResponse(res) {
    if (res.status === 401) {
      throw new AuthError_default();
    }
    const jsonPromise = res.json();
    if (res.ok) {
      return jsonPromise;
    }
    let errMsg = `Failed request with status: ${res.status}. ${res.statusText}`;
    try {
      const errData = await jsonPromise;
      errMsg = errData.message ? `${errMsg} message: ${errData.message}` : errMsg;
      errMsg = errData.requestId ? `${errMsg} request-Id: ${errData.requestId}` : errMsg;
    } catch {
    }
    throw new Error(errMsg);
  }
  var allowedHeadersCache = /* @__PURE__ */ new Map();
  var _companionHeaders = /* @__PURE__ */ _classPrivateFieldLooseKey5("companionHeaders");
  var _getUrl = /* @__PURE__ */ _classPrivateFieldLooseKey5("getUrl");
  var _request = /* @__PURE__ */ _classPrivateFieldLooseKey5("request");
  _Symbol$for3 = Symbol.for("uppy test: getCompanionHeaders");
  var RequestClient = class {
    constructor(uppy, opts) {
      Object.defineProperty(this, _request, {
        value: _request2
      });
      Object.defineProperty(this, _getUrl, {
        value: _getUrl2
      });
      Object.defineProperty(this, _companionHeaders, {
        writable: true,
        value: void 0
      });
      this.uppy = uppy;
      this.opts = opts;
      this.onReceiveResponse = this.onReceiveResponse.bind(this);
      _classPrivateFieldLooseBase5(this, _companionHeaders)[_companionHeaders] = opts == null ? void 0 : opts.companionHeaders;
    }
    setCompanionHeaders(headers) {
      _classPrivateFieldLooseBase5(this, _companionHeaders)[_companionHeaders] = headers;
    }
    [_Symbol$for3]() {
      return _classPrivateFieldLooseBase5(this, _companionHeaders)[_companionHeaders];
    }
    get hostname() {
      const {
        companion
      } = this.uppy.getState();
      const host = this.opts.companionUrl;
      return stripSlash(companion && companion[host] ? companion[host] : host);
    }
    async headers() {
      const defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Uppy-Versions": `@uppy/companion-client=${RequestClient.VERSION}`
      };
      return {
        ...defaultHeaders,
        ..._classPrivateFieldLooseBase5(this, _companionHeaders)[_companionHeaders]
      };
    }
    onReceiveResponse(_ref) {
      let {
        headers
      } = _ref;
      const state = this.uppy.getState();
      const companion = state.companion || {};
      const host = this.opts.companionUrl;
      if (headers.has("i-am") && headers.get("i-am") !== companion[host]) {
        this.uppy.setState({
          companion: {
            ...companion,
            [host]: headers.get("i-am")
          }
        });
      }
    }
    async preflight(path) {
      const allowedHeadersCached = allowedHeadersCache.get(this.hostname);
      if (allowedHeadersCached != null)
        return allowedHeadersCached;
      const fallbackAllowedHeaders = ["accept", "content-type", "uppy-auth-token"];
      const promise = (async () => {
        try {
          const response = await fetch(_classPrivateFieldLooseBase5(this, _getUrl)[_getUrl](path), {
            method: "OPTIONS"
          });
          const header = response.headers.get("access-control-allow-headers");
          if (header == null || header === "*") {
            allowedHeadersCache.set(this.hostname, fallbackAllowedHeaders);
            return fallbackAllowedHeaders;
          }
          this.uppy.log(`[CompanionClient] adding allowed preflight headers to companion cache: ${this.hostname} ${header}`);
          const allowedHeaders = header.split(",").map((headerName) => headerName.trim().toLowerCase());
          allowedHeadersCache.set(this.hostname, allowedHeaders);
          return allowedHeaders;
        } catch (err) {
          this.uppy.log(`[CompanionClient] unable to make preflight request ${err}`, "warning");
          allowedHeadersCache.delete(this.hostname);
          return fallbackAllowedHeaders;
        }
      })();
      allowedHeadersCache.set(this.hostname, promise);
      return promise;
    }
    async preflightAndHeaders(path) {
      const [allowedHeaders, headers] = await Promise.all([this.preflight(path), this.headers()]);
      return Object.fromEntries(Object.entries(headers).filter((_ref2) => {
        let [header] = _ref2;
        if (!allowedHeaders.includes(header.toLowerCase())) {
          this.uppy.log(`[CompanionClient] excluding disallowed header ${header}`);
          return false;
        }
        return true;
      }));
    }
    async get(path, options) {
      if (options === void 0) {
        options = void 0;
      }
      if (typeof options === "boolean")
        options = {
          skipPostResponse: options
        };
      return _classPrivateFieldLooseBase5(this, _request)[_request]({
        ...options,
        path
      });
    }
    async post(path, data, options) {
      if (options === void 0) {
        options = void 0;
      }
      if (typeof options === "boolean")
        options = {
          skipPostResponse: options
        };
      return _classPrivateFieldLooseBase5(this, _request)[_request]({
        ...options,
        path,
        method: "POST",
        data
      });
    }
    async delete(path, data, options) {
      if (data === void 0) {
        data = void 0;
      }
      if (typeof options === "boolean")
        options = {
          skipPostResponse: options
        };
      return _classPrivateFieldLooseBase5(this, _request)[_request]({
        ...options,
        path,
        method: "DELETE",
        data
      });
    }
  };
  function _getUrl2(url) {
    if (/^(https?:|)\/\//.test(url)) {
      return url;
    }
    return `${this.hostname}/${url}`;
  }
  async function _request2(_ref3) {
    let {
      path,
      method = "GET",
      data,
      skipPostResponse,
      signal
    } = _ref3;
    try {
      const headers = await this.preflightAndHeaders(path);
      const response = await fetchWithNetworkError(_classPrivateFieldLooseBase5(this, _getUrl)[_getUrl](path), {
        method,
        signal,
        headers,
        credentials: this.opts.companionCookiesRule || "same-origin",
        body: data ? JSON.stringify(data) : null
      });
      if (!skipPostResponse)
        this.onReceiveResponse(response);
      return handleJSONResponse(response);
    } catch (err) {
      if (err != null && err.isAuthError)
        throw err;
      throw new ErrorWithCause_default(`Could not ${method} ${_classPrivateFieldLooseBase5(this, _getUrl)[_getUrl](path)}`, {
        cause: err
      });
    }
  }
  RequestClient.VERSION = packageJson5.version;

  // ../packages/@uppy/companion-client/lib/tokenStorage.js
  var tokenStorage_exports = {};
  __export(tokenStorage_exports, {
    getItem: () => getItem,
    removeItem: () => removeItem,
    setItem: () => setItem
  });
  function setItem(key, value) {
    return new Promise((resolve) => {
      localStorage.setItem(key, value);
      resolve();
    });
  }
  function getItem(key) {
    return Promise.resolve(localStorage.getItem(key));
  }
  function removeItem(key) {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  }

  // ../packages/@uppy/companion-client/lib/Provider.js
  var getName = (id10) => {
    return id10.split("-").map((s2) => s2.charAt(0).toUpperCase() + s2.slice(1)).join(" ");
  };
  var Provider = class extends RequestClient {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.provider = opts.provider;
      this.id = this.provider;
      this.name = this.opts.name || getName(this.id);
      this.pluginId = this.opts.pluginId;
      this.tokenKey = `companion-${this.pluginId}-auth-token`;
      this.companionKeysParams = this.opts.companionKeysParams;
      this.preAuthToken = null;
    }
    async headers() {
      const [headers, token] = await Promise.all([super.headers(), this.getAuthToken()]);
      const authHeaders = {};
      if (token) {
        authHeaders["uppy-auth-token"] = token;
      }
      if (this.companionKeysParams) {
        authHeaders["uppy-credentials-params"] = btoa(JSON.stringify({
          params: this.companionKeysParams
        }));
      }
      return {
        ...headers,
        ...authHeaders
      };
    }
    onReceiveResponse(response) {
      super.onReceiveResponse(response);
      const plugin = this.uppy.getPlugin(this.pluginId);
      const oldAuthenticated = plugin.getPluginState().authenticated;
      const authenticated = oldAuthenticated ? response.status !== 401 : response.status < 400;
      plugin.setPluginState({
        authenticated
      });
      return response;
    }
    setAuthToken(token) {
      return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, token);
    }
    getAuthToken() {
      return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey);
    }
    async ensurePreAuth() {
      if (this.companionKeysParams && !this.preAuthToken) {
        await this.fetchPreAuthToken();
        if (!this.preAuthToken) {
          throw new Error("Could not load authentication data required for third-party login. Please try again later.");
        }
      }
    }
    authUrl(queries) {
      if (queries === void 0) {
        queries = {};
      }
      const params = new URLSearchParams(queries);
      if (this.preAuthToken) {
        params.set("uppyPreAuthToken", this.preAuthToken);
      }
      return `${this.hostname}/${this.id}/connect?${params}`;
    }
    fileUrl(id10) {
      return `${this.hostname}/${this.id}/get/${id10}`;
    }
    async fetchPreAuthToken() {
      if (!this.companionKeysParams) {
        return;
      }
      try {
        const res = await this.post(`${this.id}/preauth/`, {
          params: this.companionKeysParams
        });
        this.preAuthToken = res.token;
      } catch (err) {
        this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${err}`, "warning");
      }
    }
    list(directory) {
      return this.get(`${this.id}/list/${directory || ""}`);
    }
    logout() {
      return this.get(`${this.id}/logout`).then((response) => Promise.all([response, this.uppy.getPlugin(this.pluginId).storage.removeItem(this.tokenKey)])).then((_ref) => {
        let [response] = _ref;
        return response;
      });
    }
    static initPlugin(plugin, opts, defaultOpts) {
      plugin.type = "acquirer";
      plugin.files = [];
      if (defaultOpts) {
        plugin.opts = {
          ...defaultOpts,
          ...opts
        };
      }
      if (opts.serverUrl || opts.serverPattern) {
        throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
      }
      if (opts.companionAllowedHosts) {
        const pattern = opts.companionAllowedHosts;
        if (typeof pattern !== "string" && !Array.isArray(pattern) && !(pattern instanceof RegExp)) {
          throw new TypeError(`${plugin.id}: the option "companionAllowedHosts" must be one of string, Array, RegExp`);
        }
        plugin.opts.companionAllowedHosts = pattern;
      } else if (/^(?!https?:\/\/).*$/i.test(opts.companionUrl)) {
        plugin.opts.companionAllowedHosts = `https://${opts.companionUrl.replace(/^\/\//, "")}`;
      } else {
        plugin.opts.companionAllowedHosts = new URL(opts.companionUrl).origin;
      }
      plugin.storage = plugin.opts.storage || tokenStorage_exports;
    }
  };

  // ../packages/@uppy/companion-client/lib/Socket.js
  var import_namespace_emitter2 = __toESM(require_namespace_emitter(), 1);
  var _Symbol$for4;
  var _Symbol$for22;
  function _classPrivateFieldLooseBase6(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id6 = 0;
  function _classPrivateFieldLooseKey6(name) {
    return "__private_" + id6++ + "_" + name;
  }
  var _queued = /* @__PURE__ */ _classPrivateFieldLooseKey6("queued");
  var _emitter2 = /* @__PURE__ */ _classPrivateFieldLooseKey6("emitter");
  var _isOpen = /* @__PURE__ */ _classPrivateFieldLooseKey6("isOpen");
  var _socket = /* @__PURE__ */ _classPrivateFieldLooseKey6("socket");
  var _handleMessage = /* @__PURE__ */ _classPrivateFieldLooseKey6("handleMessage");
  _Symbol$for4 = Symbol.for("uppy test: getSocket");
  _Symbol$for22 = Symbol.for("uppy test: getQueued");
  var UppySocket = class {
    constructor(opts) {
      Object.defineProperty(this, _queued, {
        writable: true,
        value: []
      });
      Object.defineProperty(this, _emitter2, {
        writable: true,
        value: (0, import_namespace_emitter2.default)()
      });
      Object.defineProperty(this, _isOpen, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _socket, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _handleMessage, {
        writable: true,
        value: (e2) => {
          try {
            const message = JSON.parse(e2.data);
            this.emit(message.action, message.payload);
          } catch (err) {
            console.log(err);
          }
        }
      });
      this.opts = opts;
      if (!opts || opts.autoOpen !== false) {
        this.open();
      }
    }
    get isOpen() {
      return _classPrivateFieldLooseBase6(this, _isOpen)[_isOpen];
    }
    [_Symbol$for4]() {
      return _classPrivateFieldLooseBase6(this, _socket)[_socket];
    }
    [_Symbol$for22]() {
      return _classPrivateFieldLooseBase6(this, _queued)[_queued];
    }
    open() {
      if (_classPrivateFieldLooseBase6(this, _socket)[_socket] != null)
        return;
      _classPrivateFieldLooseBase6(this, _socket)[_socket] = new WebSocket(this.opts.target);
      _classPrivateFieldLooseBase6(this, _socket)[_socket].onopen = () => {
        _classPrivateFieldLooseBase6(this, _isOpen)[_isOpen] = true;
        while (_classPrivateFieldLooseBase6(this, _queued)[_queued].length > 0 && _classPrivateFieldLooseBase6(this, _isOpen)[_isOpen]) {
          const first = _classPrivateFieldLooseBase6(this, _queued)[_queued].shift();
          this.send(first.action, first.payload);
        }
      };
      _classPrivateFieldLooseBase6(this, _socket)[_socket].onclose = () => {
        _classPrivateFieldLooseBase6(this, _isOpen)[_isOpen] = false;
        _classPrivateFieldLooseBase6(this, _socket)[_socket] = null;
      };
      _classPrivateFieldLooseBase6(this, _socket)[_socket].onmessage = _classPrivateFieldLooseBase6(this, _handleMessage)[_handleMessage];
    }
    close() {
      var _classPrivateFieldLoo;
      (_classPrivateFieldLoo = _classPrivateFieldLooseBase6(this, _socket)[_socket]) == null ? void 0 : _classPrivateFieldLoo.close();
    }
    send(action, payload) {
      if (!_classPrivateFieldLooseBase6(this, _isOpen)[_isOpen]) {
        _classPrivateFieldLooseBase6(this, _queued)[_queued].push({
          action,
          payload
        });
        return;
      }
      _classPrivateFieldLooseBase6(this, _socket)[_socket].send(JSON.stringify({
        action,
        payload
      }));
    }
    on(action, handler) {
      _classPrivateFieldLooseBase6(this, _emitter2)[_emitter2].on(action, handler);
    }
    emit(action, payload) {
      _classPrivateFieldLooseBase6(this, _emitter2)[_emitter2].emit(action, payload);
    }
    once(action, handler) {
      _classPrivateFieldLooseBase6(this, _emitter2)[_emitter2].once(action, handler);
    }
  };

  // ../packages/@uppy/utils/lib/emitSocketProgress.js
  var import_lodash3 = __toESM(require_lodash(), 1);
  function emitSocketProgress(uploader, progressData, file) {
    const {
      progress,
      bytesUploaded,
      bytesTotal
    } = progressData;
    if (progress) {
      uploader.uppy.log(`Upload progress: ${progress}`);
      uploader.uppy.emit("upload-progress", file, {
        uploader,
        bytesUploaded,
        bytesTotal
      });
    }
  }
  var emitSocketProgress_default = (0, import_lodash3.default)(emitSocketProgress, 300, {
    leading: true,
    trailing: true
  });

  // ../packages/@uppy/utils/lib/getSocketHost.js
  function getSocketHost(url) {
    const regex = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i;
    const host = regex.exec(url)[1];
    const socketProtocol = /^http:\/\//i.test(url) ? "ws" : "wss";
    return `${socketProtocol}://${host}`;
  }

  // ../packages/@uppy/utils/lib/settle.js
  function settle(promises) {
    const resolutions = [];
    const rejections = [];
    function resolved(value) {
      resolutions.push(value);
    }
    function rejected(error) {
      rejections.push(error);
    }
    const wait = Promise.all(promises.map((promise) => promise.then(resolved, rejected)));
    return wait.then(() => {
      return {
        successful: resolutions,
        failed: rejections
      };
    });
  }

  // ../packages/@uppy/utils/lib/EventTracker.js
  function _classPrivateFieldLooseBase7(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id7 = 0;
  function _classPrivateFieldLooseKey7(name) {
    return "__private_" + id7++ + "_" + name;
  }
  var _emitter3 = /* @__PURE__ */ _classPrivateFieldLooseKey7("emitter");
  var _events = /* @__PURE__ */ _classPrivateFieldLooseKey7("events");
  var EventTracker = class {
    constructor(emitter) {
      Object.defineProperty(this, _emitter3, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _events, {
        writable: true,
        value: []
      });
      _classPrivateFieldLooseBase7(this, _emitter3)[_emitter3] = emitter;
    }
    on(event, fn) {
      _classPrivateFieldLooseBase7(this, _events)[_events].push([event, fn]);
      return _classPrivateFieldLooseBase7(this, _emitter3)[_emitter3].on(event, fn);
    }
    remove() {
      for (const [event, fn] of _classPrivateFieldLooseBase7(this, _events)[_events].splice(0)) {
        _classPrivateFieldLooseBase7(this, _emitter3)[_emitter3].off(event, fn);
      }
    }
  };

  // ../packages/@uppy/utils/lib/isNetworkError.js
  function isNetworkError(xhr) {
    if (!xhr) {
      return false;
    }
    return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
  }
  var isNetworkError_default = isNetworkError;

  // ../packages/@uppy/utils/lib/RateLimitedQueue.js
  function _classPrivateFieldLooseBase8(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id8 = 0;
  function _classPrivateFieldLooseKey8(name) {
    return "__private_" + id8++ + "_" + name;
  }
  function createCancelError(cause) {
    return new Error("Cancelled", {
      cause
    });
  }
  function abortOn(signal) {
    if (signal != null) {
      const abortPromise = () => this.abort(signal.reason);
      signal.addEventListener("abort", abortPromise, {
        once: true
      });
      const removeAbortListener = () => {
        signal.removeEventListener("abort", abortPromise);
      };
      this.then(removeAbortListener, removeAbortListener);
    }
    return this;
  }
  var _activeRequests = /* @__PURE__ */ _classPrivateFieldLooseKey8("activeRequests");
  var _queuedHandlers = /* @__PURE__ */ _classPrivateFieldLooseKey8("queuedHandlers");
  var _paused = /* @__PURE__ */ _classPrivateFieldLooseKey8("paused");
  var _pauseTimer = /* @__PURE__ */ _classPrivateFieldLooseKey8("pauseTimer");
  var _downLimit = /* @__PURE__ */ _classPrivateFieldLooseKey8("downLimit");
  var _upperLimit = /* @__PURE__ */ _classPrivateFieldLooseKey8("upperLimit");
  var _rateLimitingTimer = /* @__PURE__ */ _classPrivateFieldLooseKey8("rateLimitingTimer");
  var _call = /* @__PURE__ */ _classPrivateFieldLooseKey8("call");
  var _queueNext = /* @__PURE__ */ _classPrivateFieldLooseKey8("queueNext");
  var _next = /* @__PURE__ */ _classPrivateFieldLooseKey8("next");
  var _queue = /* @__PURE__ */ _classPrivateFieldLooseKey8("queue");
  var _dequeue = /* @__PURE__ */ _classPrivateFieldLooseKey8("dequeue");
  var _resume = /* @__PURE__ */ _classPrivateFieldLooseKey8("resume");
  var _increaseLimit = /* @__PURE__ */ _classPrivateFieldLooseKey8("increaseLimit");
  var RateLimitedQueue = class {
    constructor(limit) {
      Object.defineProperty(this, _dequeue, {
        value: _dequeue2
      });
      Object.defineProperty(this, _queue, {
        value: _queue2
      });
      Object.defineProperty(this, _next, {
        value: _next2
      });
      Object.defineProperty(this, _queueNext, {
        value: _queueNext2
      });
      Object.defineProperty(this, _call, {
        value: _call2
      });
      Object.defineProperty(this, _activeRequests, {
        writable: true,
        value: 0
      });
      Object.defineProperty(this, _queuedHandlers, {
        writable: true,
        value: []
      });
      Object.defineProperty(this, _paused, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _pauseTimer, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _downLimit, {
        writable: true,
        value: 1
      });
      Object.defineProperty(this, _upperLimit, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _rateLimitingTimer, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _resume, {
        writable: true,
        value: () => this.resume()
      });
      Object.defineProperty(this, _increaseLimit, {
        writable: true,
        value: () => {
          if (_classPrivateFieldLooseBase8(this, _paused)[_paused]) {
            _classPrivateFieldLooseBase8(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase8(this, _increaseLimit)[_increaseLimit], 0);
            return;
          }
          _classPrivateFieldLooseBase8(this, _downLimit)[_downLimit] = this.limit;
          this.limit = Math.ceil((_classPrivateFieldLooseBase8(this, _upperLimit)[_upperLimit] + _classPrivateFieldLooseBase8(this, _downLimit)[_downLimit]) / 2);
          for (let i2 = _classPrivateFieldLooseBase8(this, _downLimit)[_downLimit]; i2 <= this.limit; i2++) {
            _classPrivateFieldLooseBase8(this, _queueNext)[_queueNext]();
          }
          if (_classPrivateFieldLooseBase8(this, _upperLimit)[_upperLimit] - _classPrivateFieldLooseBase8(this, _downLimit)[_downLimit] > 3) {
            _classPrivateFieldLooseBase8(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase8(this, _increaseLimit)[_increaseLimit], 2e3);
          } else {
            _classPrivateFieldLooseBase8(this, _downLimit)[_downLimit] = Math.floor(_classPrivateFieldLooseBase8(this, _downLimit)[_downLimit] / 2);
          }
        }
      });
      if (typeof limit !== "number" || limit === 0) {
        this.limit = Infinity;
      } else {
        this.limit = limit;
      }
    }
    run(fn, queueOptions) {
      if (!_classPrivateFieldLooseBase8(this, _paused)[_paused] && _classPrivateFieldLooseBase8(this, _activeRequests)[_activeRequests] < this.limit) {
        return _classPrivateFieldLooseBase8(this, _call)[_call](fn);
      }
      return _classPrivateFieldLooseBase8(this, _queue)[_queue](fn, queueOptions);
    }
    wrapPromiseFunction(fn, queueOptions) {
      var _this = this;
      return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        let queuedRequest;
        const outerPromise = new Promise((resolve, reject) => {
          queuedRequest = _this.run(() => {
            let cancelError;
            let innerPromise;
            try {
              innerPromise = Promise.resolve(fn(...args));
            } catch (err) {
              innerPromise = Promise.reject(err);
            }
            innerPromise.then((result) => {
              if (cancelError) {
                reject(cancelError);
              } else {
                queuedRequest.done();
                resolve(result);
              }
            }, (err) => {
              if (cancelError) {
                reject(cancelError);
              } else {
                queuedRequest.done();
                reject(err);
              }
            });
            return (cause) => {
              cancelError = createCancelError(cause);
            };
          }, queueOptions);
        });
        outerPromise.abort = (cause) => {
          queuedRequest.abort(cause);
        };
        outerPromise.abortOn = abortOn;
        return outerPromise;
      };
    }
    resume() {
      _classPrivateFieldLooseBase8(this, _paused)[_paused] = false;
      clearTimeout(_classPrivateFieldLooseBase8(this, _pauseTimer)[_pauseTimer]);
      for (let i2 = 0; i2 < this.limit; i2++) {
        _classPrivateFieldLooseBase8(this, _queueNext)[_queueNext]();
      }
    }
    pause(duration) {
      if (duration === void 0) {
        duration = null;
      }
      _classPrivateFieldLooseBase8(this, _paused)[_paused] = true;
      clearTimeout(_classPrivateFieldLooseBase8(this, _pauseTimer)[_pauseTimer]);
      if (duration != null) {
        _classPrivateFieldLooseBase8(this, _pauseTimer)[_pauseTimer] = setTimeout(_classPrivateFieldLooseBase8(this, _resume)[_resume], duration);
      }
    }
    rateLimit(duration) {
      clearTimeout(_classPrivateFieldLooseBase8(this, _rateLimitingTimer)[_rateLimitingTimer]);
      this.pause(duration);
      if (this.limit > 1 && Number.isFinite(this.limit)) {
        _classPrivateFieldLooseBase8(this, _upperLimit)[_upperLimit] = this.limit - 1;
        this.limit = _classPrivateFieldLooseBase8(this, _downLimit)[_downLimit];
        _classPrivateFieldLooseBase8(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase8(this, _increaseLimit)[_increaseLimit], duration);
      }
    }
    get isPaused() {
      return _classPrivateFieldLooseBase8(this, _paused)[_paused];
    }
  };
  function _call2(fn) {
    _classPrivateFieldLooseBase8(this, _activeRequests)[_activeRequests] += 1;
    let done = false;
    let cancelActive;
    try {
      cancelActive = fn();
    } catch (err) {
      _classPrivateFieldLooseBase8(this, _activeRequests)[_activeRequests] -= 1;
      throw err;
    }
    return {
      abort: (cause) => {
        if (done)
          return;
        done = true;
        _classPrivateFieldLooseBase8(this, _activeRequests)[_activeRequests] -= 1;
        cancelActive(cause);
        _classPrivateFieldLooseBase8(this, _queueNext)[_queueNext]();
      },
      done: () => {
        if (done)
          return;
        done = true;
        _classPrivateFieldLooseBase8(this, _activeRequests)[_activeRequests] -= 1;
        _classPrivateFieldLooseBase8(this, _queueNext)[_queueNext]();
      }
    };
  }
  function _queueNext2() {
    queueMicrotask(() => _classPrivateFieldLooseBase8(this, _next)[_next]());
  }
  function _next2() {
    if (_classPrivateFieldLooseBase8(this, _paused)[_paused] || _classPrivateFieldLooseBase8(this, _activeRequests)[_activeRequests] >= this.limit) {
      return;
    }
    if (_classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].length === 0) {
      return;
    }
    const next = _classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].shift();
    const handler = _classPrivateFieldLooseBase8(this, _call)[_call](next.fn);
    next.abort = handler.abort;
    next.done = handler.done;
  }
  function _queue2(fn, options) {
    if (options === void 0) {
      options = {};
    }
    const handler = {
      fn,
      priority: options.priority || 0,
      abort: () => {
        _classPrivateFieldLooseBase8(this, _dequeue)[_dequeue](handler);
      },
      done: () => {
        throw new Error("Cannot mark a queued request as done: this indicates a bug");
      }
    };
    const index = _classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].findIndex((other) => {
      return handler.priority > other.priority;
    });
    if (index === -1) {
      _classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].push(handler);
    } else {
      _classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].splice(index, 0, handler);
    }
    return handler;
  }
  function _dequeue2(handler) {
    const index = _classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].indexOf(handler);
    if (index !== -1) {
      _classPrivateFieldLooseBase8(this, _queuedHandlers)[_queuedHandlers].splice(index, 1);
    }
  }
  var internalRateLimitedQueue = Symbol("__queue");

  // ../packages/@uppy/tus/lib/getFingerprint.js
  function isCordova3() {
    return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
  }
  function isReactNative3() {
    return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  }
  function getFingerprint(uppyFileObj) {
    return (file, options) => {
      if (isCordova3() || isReactNative3()) {
        return defaultOptions3.fingerprint(file, options);
      }
      const uppyFingerprint = ["tus", uppyFileObj.id, options.endpoint].join("-");
      return Promise.resolve(uppyFingerprint);
    };
  }

  // ../packages/@uppy/tus/lib/index.js
  function _classPrivateFieldLooseBase9(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
  var id9 = 0;
  function _classPrivateFieldLooseKey9(name) {
    return "__private_" + id9++ + "_" + name;
  }
  var packageJson6 = {
    "version": "3.0.5"
  };
  var tusDefaultOptions = {
    endpoint: "",
    uploadUrl: null,
    metadata: {},
    uploadSize: null,
    onProgress: null,
    onChunkComplete: null,
    onSuccess: null,
    onError: null,
    overridePatchMethod: false,
    headers: {},
    addRequestId: false,
    chunkSize: Infinity,
    retryDelays: [100, 1e3, 3e3, 5e3],
    parallelUploads: 1,
    removeFingerprintOnSuccess: false,
    uploadLengthDeferred: false,
    uploadDataDuringCreation: false
  };
  var _retryDelayIterator = /* @__PURE__ */ _classPrivateFieldLooseKey9("retryDelayIterator");
  var _queueRequestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey9("queueRequestSocketToken");
  var _requestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey9("requestSocketToken");
  var Tus = class extends BasePlugin {
    constructor(uppy, _opts) {
      var _this$opts$rateLimite, _this$opts$retryDelay;
      super(uppy, _opts);
      Object.defineProperty(this, _retryDelayIterator, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _queueRequestSocketToken, {
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, _requestSocketToken, {
        writable: true,
        value: async (file) => {
          const Client = file.remote.providerOptions.provider ? Provider : RequestClient;
          const client = new Client(this.uppy, file.remote.providerOptions);
          const opts = {
            ...this.opts
          };
          if (file.tus) {
            Object.assign(opts, file.tus);
          }
          const res = await client.post(file.remote.url, {
            ...file.remote.body,
            endpoint: opts.endpoint,
            uploadUrl: opts.uploadUrl,
            protocol: "tus",
            size: file.data.size,
            headers: opts.headers,
            metadata: file.meta
          });
          return res.token;
        }
      });
      this.type = "uploader";
      this.id = this.opts.id || "Tus";
      this.title = "Tus";
      const defaultOptions4 = {
        useFastRemoteRetry: true,
        limit: 20,
        retryDelays: tusDefaultOptions.retryDelays,
        withCredentials: false
      };
      this.opts = {
        ...defaultOptions4,
        ..._opts
      };
      if ((_opts == null ? void 0 : _opts.allowedMetaFields) === void 0 && "metaFields" in this.opts) {
        throw new Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
      }
      if ("autoRetry" in _opts) {
        throw new Error("The `autoRetry` option was deprecated and has been removed.");
      }
      this.requests = (_this$opts$rateLimite = this.opts.rateLimitedQueue) != null ? _this$opts$rateLimite : new RateLimitedQueue(this.opts.limit);
      _classPrivateFieldLooseBase9(this, _retryDelayIterator)[_retryDelayIterator] = (_this$opts$retryDelay = this.opts.retryDelays) == null ? void 0 : _this$opts$retryDelay.values();
      this.uploaders = /* @__PURE__ */ Object.create(null);
      this.uploaderEvents = /* @__PURE__ */ Object.create(null);
      this.uploaderSockets = /* @__PURE__ */ Object.create(null);
      this.handleResetProgress = this.handleResetProgress.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      _classPrivateFieldLooseBase9(this, _queueRequestSocketToken)[_queueRequestSocketToken] = this.requests.wrapPromiseFunction(_classPrivateFieldLooseBase9(this, _requestSocketToken)[_requestSocketToken], {
        priority: -1
      });
    }
    handleResetProgress() {
      const files = {
        ...this.uppy.getState().files
      };
      Object.keys(files).forEach((fileID) => {
        if (files[fileID].tus && files[fileID].tus.uploadUrl) {
          const tusState = {
            ...files[fileID].tus
          };
          delete tusState.uploadUrl;
          files[fileID] = {
            ...files[fileID],
            tus: tusState
          };
        }
      });
      this.uppy.setState({
        files
      });
    }
    resetUploaderReferences(fileID, opts) {
      if (opts === void 0) {
        opts = {};
      }
      if (this.uploaders[fileID]) {
        const uploader = this.uploaders[fileID];
        uploader.abort();
        if (opts.abort) {
          uploader.abort(true);
        }
        this.uploaders[fileID] = null;
      }
      if (this.uploaderEvents[fileID]) {
        this.uploaderEvents[fileID].remove();
        this.uploaderEvents[fileID] = null;
      }
      if (this.uploaderSockets[fileID]) {
        this.uploaderSockets[fileID].close();
        this.uploaderSockets[fileID] = null;
      }
    }
    upload(file) {
      var _this = this;
      this.resetUploaderReferences(file.id);
      return new Promise((resolve, reject) => {
        let queuedRequest;
        let qRequest;
        let upload;
        this.uppy.emit("upload-started", file);
        const opts = {
          ...this.opts,
          ...file.tus || {}
        };
        if (typeof opts.headers === "function") {
          opts.headers = opts.headers(file);
        }
        const uploadOptions = {
          ...tusDefaultOptions,
          ...opts
        };
        uploadOptions.fingerprint = getFingerprint(file);
        uploadOptions.onBeforeRequest = (req) => {
          const xhr = req.getUnderlyingObject();
          xhr.withCredentials = !!opts.withCredentials;
          let userProvidedPromise;
          if (typeof opts.onBeforeRequest === "function") {
            userProvidedPromise = opts.onBeforeRequest(req, file);
          }
          if (has(queuedRequest, "shouldBeRequeued")) {
            if (!queuedRequest.shouldBeRequeued)
              return Promise.reject();
            let done;
            const p2 = new Promise((res) => {
              done = res;
            });
            queuedRequest = this.requests.run(() => {
              if (file.isPaused) {
                queuedRequest.abort();
              }
              done();
              return () => {
              };
            });
            return Promise.all([p2, userProvidedPromise]);
          }
          return userProvidedPromise;
        };
        uploadOptions.onError = (err) => {
          var _queuedRequest;
          this.uppy.log(err);
          const xhr = err.originalRequest ? err.originalRequest.getUnderlyingObject() : null;
          if (isNetworkError_default(xhr)) {
            err = new NetworkError_default(err, xhr);
          }
          this.resetUploaderReferences(file.id);
          (_queuedRequest = queuedRequest) == null ? void 0 : _queuedRequest.abort();
          this.uppy.emit("upload-error", file, err);
          reject(err);
        };
        uploadOptions.onProgress = (bytesUploaded, bytesTotal) => {
          this.onReceiveUploadUrl(file, upload.url);
          this.uppy.emit("upload-progress", file, {
            uploader: this,
            bytesUploaded,
            bytesTotal
          });
        };
        uploadOptions.onSuccess = () => {
          const uploadResp = {
            uploadURL: upload.url
          };
          this.resetUploaderReferences(file.id);
          queuedRequest.done();
          this.uppy.emit("upload-success", file, uploadResp);
          if (upload.url) {
            this.uppy.log(`Download ${upload.file.name} from ${upload.url}`);
          }
          resolve(upload);
        };
        const defaultOnShouldRetry = (err) => {
          var _err$originalResponse;
          const status = err == null ? void 0 : (_err$originalResponse = err.originalResponse) == null ? void 0 : _err$originalResponse.getStatus();
          if (status === 429) {
            if (!this.requests.isPaused) {
              var _classPrivateFieldLoo;
              const next = (_classPrivateFieldLoo = _classPrivateFieldLooseBase9(this, _retryDelayIterator)[_retryDelayIterator]) == null ? void 0 : _classPrivateFieldLoo.next();
              if (next == null || next.done) {
                return false;
              }
              this.requests.rateLimit(next.value);
            }
          } else if (status > 400 && status < 500 && status !== 409) {
            return false;
          } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
            if (!this.requests.isPaused) {
              this.requests.pause();
              window.addEventListener("online", () => {
                this.requests.resume();
              }, {
                once: true
              });
            }
          }
          queuedRequest.abort();
          queuedRequest = {
            shouldBeRequeued: true,
            abort() {
              this.shouldBeRequeued = false;
            },
            done() {
              throw new Error("Cannot mark a queued request as done: this indicates a bug");
            },
            fn() {
              throw new Error("Cannot run a queued request: this indicates a bug");
            }
          };
          return true;
        };
        if (opts.onShouldRetry != null) {
          uploadOptions.onShouldRetry = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return opts.onShouldRetry(...args, defaultOnShouldRetry);
          };
        } else {
          uploadOptions.onShouldRetry = defaultOnShouldRetry;
        }
        const copyProp = (obj, srcProp, destProp) => {
          if (has(obj, srcProp) && !has(obj, destProp)) {
            obj[destProp] = obj[srcProp];
          }
        };
        const meta = {};
        const allowedMetaFields = Array.isArray(opts.allowedMetaFields) ? opts.allowedMetaFields : Object.keys(file.meta);
        allowedMetaFields.forEach((item) => {
          meta[item] = file.meta[item];
        });
        copyProp(meta, "type", "filetype");
        copyProp(meta, "name", "filename");
        uploadOptions.metadata = meta;
        upload = new Upload(file.data, uploadOptions);
        this.uploaders[file.id] = upload;
        this.uploaderEvents[file.id] = new EventTracker(this.uppy);
        qRequest = () => {
          if (!file.isPaused) {
            upload.start();
          }
          return () => {
          };
        };
        upload.findPreviousUploads().then((previousUploads) => {
          const previousUpload = previousUploads[0];
          if (previousUpload) {
            this.uppy.log(`[Tus] Resuming upload of ${file.id} started at ${previousUpload.creationTime}`);
            upload.resumeFromPreviousUpload(previousUpload);
          }
        });
        queuedRequest = this.requests.run(qRequest);
        this.onFileRemove(file.id, (targetFileID) => {
          queuedRequest.abort();
          this.resetUploaderReferences(file.id, {
            abort: !!upload.url
          });
          resolve(`upload ${targetFileID} was removed`);
        });
        this.onPause(file.id, (isPaused) => {
          queuedRequest.abort();
          if (isPaused) {
            upload.abort();
          } else {
            queuedRequest = this.requests.run(qRequest);
          }
        });
        this.onPauseAll(file.id, () => {
          queuedRequest.abort();
          upload.abort();
        });
        this.onCancelAll(file.id, function(_temp) {
          let {
            reason
          } = _temp === void 0 ? {} : _temp;
          if (reason === "user") {
            queuedRequest.abort();
            _this.resetUploaderReferences(file.id, {
              abort: !!upload.url
            });
          }
          resolve(`upload ${file.id} was canceled`);
        });
        this.onResumeAll(file.id, () => {
          queuedRequest.abort();
          if (file.error) {
            upload.abort();
          }
          queuedRequest = this.requests.run(qRequest);
        });
      }).catch((err) => {
        this.uppy.emit("upload-error", file, err);
        throw err;
      });
    }
    async uploadRemote(file) {
      this.resetUploaderReferences(file.id);
      if (!file.progress.uploadStarted || !file.isRestored) {
        this.uppy.emit("upload-started", file);
      }
      try {
        if (file.serverToken) {
          return this.connectToServerSocket(file);
        }
        const serverToken = await _classPrivateFieldLooseBase9(this, _queueRequestSocketToken)[_queueRequestSocketToken](file);
        if (!this.uppy.getState().files[file.id])
          return void 0;
        this.uppy.setFileState(file.id, {
          serverToken
        });
        return this.connectToServerSocket(this.uppy.getFile(file.id));
      } catch (err) {
        this.uppy.emit("upload-error", file, err);
        throw err;
      }
    }
    connectToServerSocket(file) {
      var _this2 = this;
      return new Promise((resolve, reject) => {
        const token = file.serverToken;
        const host = getSocketHost(file.remote.companionUrl);
        const socket = new UppySocket({
          target: `${host}/api/${token}`,
          autoOpen: false
        });
        this.uploaderSockets[file.id] = socket;
        this.uploaderEvents[file.id] = new EventTracker(this.uppy);
        let queuedRequest;
        this.onFileRemove(file.id, () => {
          queuedRequest.abort();
          socket.send("cancel", {});
          this.resetUploaderReferences(file.id);
          resolve(`upload ${file.id} was removed`);
        });
        this.onPause(file.id, (isPaused) => {
          if (isPaused) {
            queuedRequest.abort();
            socket.send("pause", {});
          } else {
            queuedRequest.abort();
            queuedRequest = this.requests.run(() => {
              socket.open();
              socket.send("resume", {});
              return () => socket.close();
            });
          }
        });
        this.onPauseAll(file.id, () => {
          queuedRequest.abort();
          socket.send("pause", {});
        });
        this.onCancelAll(file.id, function(_temp2) {
          let {
            reason
          } = _temp2 === void 0 ? {} : _temp2;
          if (reason === "user") {
            queuedRequest.abort();
            socket.send("cancel", {});
            _this2.resetUploaderReferences(file.id);
          }
          resolve(`upload ${file.id} was canceled`);
        });
        this.onResumeAll(file.id, () => {
          queuedRequest.abort();
          if (file.error) {
            socket.send("pause", {});
          }
          queuedRequest = this.requests.run(() => {
            socket.open();
            socket.send("resume", {});
            return () => socket.close();
          });
        });
        this.onRetry(file.id, () => {
          if (socket.isOpen) {
            socket.send("pause", {});
            socket.send("resume", {});
          }
        });
        this.onRetryAll(file.id, () => {
          if (socket.isOpen) {
            socket.send("pause", {});
            socket.send("resume", {});
          }
        });
        socket.on("progress", (progressData) => emitSocketProgress_default(this, progressData, file));
        socket.on("error", (errData) => {
          const {
            message
          } = errData.error;
          const error = Object.assign(new Error(message), {
            cause: errData.error
          });
          if (!this.opts.useFastRemoteRetry) {
            this.resetUploaderReferences(file.id);
            this.uppy.setFileState(file.id, {
              serverToken: null
            });
          } else {
            socket.close();
          }
          this.uppy.emit("upload-error", file, error);
          queuedRequest.done();
          reject(error);
        });
        socket.on("success", (data) => {
          const uploadResp = {
            uploadURL: data.url
          };
          this.uppy.emit("upload-success", file, uploadResp);
          this.resetUploaderReferences(file.id);
          queuedRequest.done();
          resolve();
        });
        queuedRequest = this.requests.run(() => {
          if (file.isPaused) {
            socket.send("pause", {});
          } else {
            socket.open();
          }
          return () => socket.close();
        });
      });
    }
    onReceiveUploadUrl(file, uploadURL) {
      const currentFile = this.uppy.getFile(file.id);
      if (!currentFile)
        return;
      if (!currentFile.tus || currentFile.tus.uploadUrl !== uploadURL) {
        this.uppy.log("[Tus] Storing upload url");
        this.uppy.setFileState(currentFile.id, {
          tus: {
            ...currentFile.tus,
            uploadUrl: uploadURL
          }
        });
      }
    }
    onFileRemove(fileID, cb) {
      this.uploaderEvents[fileID].on("file-removed", (file) => {
        if (fileID === file.id)
          cb(file.id);
      });
    }
    onPause(fileID, cb) {
      this.uploaderEvents[fileID].on("upload-pause", (targetFileID, isPaused) => {
        if (fileID === targetFileID) {
          cb(isPaused);
        }
      });
    }
    onRetry(fileID, cb) {
      this.uploaderEvents[fileID].on("upload-retry", (targetFileID) => {
        if (fileID === targetFileID) {
          cb();
        }
      });
    }
    onRetryAll(fileID, cb) {
      this.uploaderEvents[fileID].on("retry-all", () => {
        if (!this.uppy.getFile(fileID))
          return;
        cb();
      });
    }
    onPauseAll(fileID, cb) {
      this.uploaderEvents[fileID].on("pause-all", () => {
        if (!this.uppy.getFile(fileID))
          return;
        cb();
      });
    }
    onCancelAll(fileID, eventHandler) {
      var _this3 = this;
      this.uploaderEvents[fileID].on("cancel-all", function() {
        if (!_this3.uppy.getFile(fileID))
          return;
        eventHandler(...arguments);
      });
    }
    onResumeAll(fileID, cb) {
      this.uploaderEvents[fileID].on("resume-all", () => {
        if (!this.uppy.getFile(fileID))
          return;
        cb();
      });
    }
    uploadFiles(files) {
      const promises = files.map((file, i2) => {
        const current = i2 + 1;
        const total = files.length;
        if ("error" in file && file.error) {
          return Promise.reject(new Error(file.error));
        }
        if (file.isRemote) {
          if (!file.progress.uploadStarted || !file.isRestored) {
            this.uppy.emit("upload-started", file);
          }
          return this.uploadRemote(file, current, total);
        }
        if (!file.progress.uploadStarted || !file.isRestored) {
          this.uppy.emit("upload-started", file);
        }
        return this.upload(file, current, total);
      });
      return settle(promises);
    }
    handleUpload(fileIDs) {
      if (fileIDs.length === 0) {
        this.uppy.log("[Tus] No files to upload");
        return Promise.resolve();
      }
      if (this.opts.limit === 0) {
        this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning");
      }
      this.uppy.log("[Tus] Uploading...");
      const filesToUpload = fileIDs.map((fileID) => this.uppy.getFile(fileID));
      return this.uploadFiles(filesToUpload).then(() => null);
    }
    install() {
      this.uppy.setState({
        capabilities: {
          ...this.uppy.getState().capabilities,
          resumableUploads: true
        }
      });
      this.uppy.addUploader(this.handleUpload);
      this.uppy.on("reset-progress", this.handleResetProgress);
    }
    uninstall() {
      this.uppy.setState({
        capabilities: {
          ...this.uppy.getState().capabilities,
          resumableUploads: false
        }
      });
      this.uppy.removeUploader(this.handleUpload);
    }
  };
  Tus.VERSION = packageJson6.version;

  // src/examples/statusbar/app.es6
  var uppyOne = new Uppy_default({
    debug: true,
    autoProceed: true
  });
  uppyOne.use(FileInput, {
    target: ".UppyInput",
    pretty: false
  }).use(Tus, {
    endpoint: "https://tusd.tusdemo.net/files/"
  }).use(StatusBar2, {
    target: ".UppyInput-Progress",
    hideUploadButton: true,
    hideAfterFinish: false
  });
})();
//# sourceMappingURL=app.js.map
