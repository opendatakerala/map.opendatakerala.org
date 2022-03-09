(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // site/node_modules/leaflet/dist/leaflet-src.js
  var require_leaflet_src = __commonJS({
    "site/node_modules/leaflet/dist/leaflet-src.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.L = {});
      })(exports, function(exports2) {
        "use strict";
        var version = "1.7.1";
        function extend(dest) {
          var i, j, len, src;
          for (j = 1, len = arguments.length; j < len; j++) {
            src = arguments[j];
            for (i in src) {
              dest[i] = src[i];
            }
          }
          return dest;
        }
        var create = Object.create || function() {
          function F() {
          }
          return function(proto) {
            F.prototype = proto;
            return new F();
          };
        }();
        function bind(fn, obj) {
          var slice = Array.prototype.slice;
          if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
          }
          var args = slice.call(arguments, 2);
          return function() {
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
          };
        }
        var lastId = 0;
        function stamp(obj) {
          obj._leaflet_id = obj._leaflet_id || ++lastId;
          return obj._leaflet_id;
        }
        function throttle(fn, time, context) {
          var lock, args, wrapperFn, later;
          later = function() {
            lock = false;
            if (args) {
              wrapperFn.apply(context, args);
              args = false;
            }
          };
          wrapperFn = function() {
            if (lock) {
              args = arguments;
            } else {
              fn.apply(context, arguments);
              setTimeout(later, time);
              lock = true;
            }
          };
          return wrapperFn;
        }
        function wrapNum(x, range, includeMax) {
          var max = range[1], min = range[0], d = max - min;
          return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
        }
        function falseFn() {
          return false;
        }
        function formatNum(num, digits) {
          var pow = Math.pow(10, digits === void 0 ? 6 : digits);
          return Math.round(num * pow) / pow;
        }
        function trim(str) {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
        }
        function splitWords(str) {
          return trim(str).split(/\s+/);
        }
        function setOptions(obj, options) {
          if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
            obj.options = obj.options ? create(obj.options) : {};
          }
          for (var i in options) {
            obj.options[i] = options[i];
          }
          return obj.options;
        }
        function getParamString(obj, existingUrl, uppercase) {
          var params = [];
          for (var i in obj) {
            params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
          }
          return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
        }
        var templateRe = /\{ *([\w_-]+) *\}/g;
        function template(str, data) {
          return str.replace(templateRe, function(str2, key) {
            var value = data[key];
            if (value === void 0) {
              throw new Error("No value provided for variable " + str2);
            } else if (typeof value === "function") {
              value = value(data);
            }
            return value;
          });
        }
        var isArray = Array.isArray || function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        function indexOf(array, el) {
          for (var i = 0; i < array.length; i++) {
            if (array[i] === el) {
              return i;
            }
          }
          return -1;
        }
        var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        function getPrefixed(name) {
          return window["webkit" + name] || window["moz" + name] || window["ms" + name];
        }
        var lastTime = 0;
        function timeoutDefer(fn) {
          var time = +new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
          lastTime = time + timeToCall;
          return window.setTimeout(fn, timeToCall);
        }
        var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
        var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
          window.clearTimeout(id);
        };
        function requestAnimFrame(fn, context, immediate) {
          if (immediate && requestFn === timeoutDefer) {
            fn.call(context);
          } else {
            return requestFn.call(window, bind(fn, context));
          }
        }
        function cancelAnimFrame(id) {
          if (id) {
            cancelFn.call(window, id);
          }
        }
        var Util = {
          extend,
          create,
          bind,
          lastId,
          stamp,
          throttle,
          wrapNum,
          falseFn,
          formatNum,
          trim,
          splitWords,
          setOptions,
          getParamString,
          template,
          isArray,
          indexOf,
          emptyImageUrl,
          requestFn,
          cancelFn,
          requestAnimFrame,
          cancelAnimFrame
        };
        function Class() {
        }
        Class.extend = function(props) {
          var NewClass = function() {
            if (this.initialize) {
              this.initialize.apply(this, arguments);
            }
            this.callInitHooks();
          };
          var parentProto = NewClass.__super__ = this.prototype;
          var proto = create(parentProto);
          proto.constructor = NewClass;
          NewClass.prototype = proto;
          for (var i in this) {
            if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
              NewClass[i] = this[i];
            }
          }
          if (props.statics) {
            extend(NewClass, props.statics);
            delete props.statics;
          }
          if (props.includes) {
            checkDeprecatedMixinEvents(props.includes);
            extend.apply(null, [proto].concat(props.includes));
            delete props.includes;
          }
          if (proto.options) {
            props.options = extend(create(proto.options), props.options);
          }
          extend(proto, props);
          proto._initHooks = [];
          proto.callInitHooks = function() {
            if (this._initHooksCalled) {
              return;
            }
            if (parentProto.callInitHooks) {
              parentProto.callInitHooks.call(this);
            }
            this._initHooksCalled = true;
            for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
              proto._initHooks[i2].call(this);
            }
          };
          return NewClass;
        };
        Class.include = function(props) {
          extend(this.prototype, props);
          return this;
        };
        Class.mergeOptions = function(options) {
          extend(this.prototype.options, options);
          return this;
        };
        Class.addInitHook = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          var init = typeof fn === "function" ? fn : function() {
            this[fn].apply(this, args);
          };
          this.prototype._initHooks = this.prototype._initHooks || [];
          this.prototype._initHooks.push(init);
          return this;
        };
        function checkDeprecatedMixinEvents(includes) {
          if (typeof L === "undefined" || !L || !L.Mixin) {
            return;
          }
          includes = isArray(includes) ? includes : [includes];
          for (var i = 0; i < includes.length; i++) {
            if (includes[i] === L.Mixin.Events) {
              console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
            }
          }
        }
        var Events = {
          on: function(types, fn, context) {
            if (typeof types === "object") {
              for (var type in types) {
                this._on(type, types[type], fn);
              }
            } else {
              types = splitWords(types);
              for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context);
              }
            }
            return this;
          },
          off: function(types, fn, context) {
            if (!types) {
              delete this._events;
            } else if (typeof types === "object") {
              for (var type in types) {
                this._off(type, types[type], fn);
              }
            } else {
              types = splitWords(types);
              for (var i = 0, len = types.length; i < len; i++) {
                this._off(types[i], fn, context);
              }
            }
            return this;
          },
          _on: function(type, fn, context) {
            this._events = this._events || {};
            var typeListeners = this._events[type];
            if (!typeListeners) {
              typeListeners = [];
              this._events[type] = typeListeners;
            }
            if (context === this) {
              context = void 0;
            }
            var newListener = { fn, ctx: context }, listeners = typeListeners;
            for (var i = 0, len = listeners.length; i < len; i++) {
              if (listeners[i].fn === fn && listeners[i].ctx === context) {
                return;
              }
            }
            listeners.push(newListener);
          },
          _off: function(type, fn, context) {
            var listeners, i, len;
            if (!this._events) {
              return;
            }
            listeners = this._events[type];
            if (!listeners) {
              return;
            }
            if (!fn) {
              for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].fn = falseFn;
              }
              delete this._events[type];
              return;
            }
            if (context === this) {
              context = void 0;
            }
            if (listeners) {
              for (i = 0, len = listeners.length; i < len; i++) {
                var l = listeners[i];
                if (l.ctx !== context) {
                  continue;
                }
                if (l.fn === fn) {
                  l.fn = falseFn;
                  if (this._firingCount) {
                    this._events[type] = listeners = listeners.slice();
                  }
                  listeners.splice(i, 1);
                  return;
                }
              }
            }
          },
          fire: function(type, data, propagate) {
            if (!this.listens(type, propagate)) {
              return this;
            }
            var event = extend({}, data, {
              type,
              target: this,
              sourceTarget: data && data.sourceTarget || this
            });
            if (this._events) {
              var listeners = this._events[type];
              if (listeners) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var i = 0, len = listeners.length; i < len; i++) {
                  var l = listeners[i];
                  l.fn.call(l.ctx || this, event);
                }
                this._firingCount--;
              }
            }
            if (propagate) {
              this._propagateEvent(event);
            }
            return this;
          },
          listens: function(type, propagate) {
            var listeners = this._events && this._events[type];
            if (listeners && listeners.length) {
              return true;
            }
            if (propagate) {
              for (var id in this._eventParents) {
                if (this._eventParents[id].listens(type, propagate)) {
                  return true;
                }
              }
            }
            return false;
          },
          once: function(types, fn, context) {
            if (typeof types === "object") {
              for (var type in types) {
                this.once(type, types[type], fn);
              }
              return this;
            }
            var handler = bind(function() {
              this.off(types, fn, context).off(types, handler, context);
            }, this);
            return this.on(types, fn, context).on(types, handler, context);
          },
          addEventParent: function(obj) {
            this._eventParents = this._eventParents || {};
            this._eventParents[stamp(obj)] = obj;
            return this;
          },
          removeEventParent: function(obj) {
            if (this._eventParents) {
              delete this._eventParents[stamp(obj)];
            }
            return this;
          },
          _propagateEvent: function(e) {
            for (var id in this._eventParents) {
              this._eventParents[id].fire(e.type, extend({
                layer: e.target,
                propagatedFrom: e.target
              }, e), true);
            }
          }
        };
        Events.addEventListener = Events.on;
        Events.removeEventListener = Events.clearAllEventListeners = Events.off;
        Events.addOneTimeEventListener = Events.once;
        Events.fireEvent = Events.fire;
        Events.hasEventListeners = Events.listens;
        var Evented = Class.extend(Events);
        function Point(x, y, round) {
          this.x = round ? Math.round(x) : x;
          this.y = round ? Math.round(y) : y;
        }
        var trunc = Math.trunc || function(v) {
          return v > 0 ? Math.floor(v) : Math.ceil(v);
        };
        Point.prototype = {
          clone: function() {
            return new Point(this.x, this.y);
          },
          add: function(point) {
            return this.clone()._add(toPoint(point));
          },
          _add: function(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
          },
          subtract: function(point) {
            return this.clone()._subtract(toPoint(point));
          },
          _subtract: function(point) {
            this.x -= point.x;
            this.y -= point.y;
            return this;
          },
          divideBy: function(num) {
            return this.clone()._divideBy(num);
          },
          _divideBy: function(num) {
            this.x /= num;
            this.y /= num;
            return this;
          },
          multiplyBy: function(num) {
            return this.clone()._multiplyBy(num);
          },
          _multiplyBy: function(num) {
            this.x *= num;
            this.y *= num;
            return this;
          },
          scaleBy: function(point) {
            return new Point(this.x * point.x, this.y * point.y);
          },
          unscaleBy: function(point) {
            return new Point(this.x / point.x, this.y / point.y);
          },
          round: function() {
            return this.clone()._round();
          },
          _round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
          },
          floor: function() {
            return this.clone()._floor();
          },
          _floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
          },
          ceil: function() {
            return this.clone()._ceil();
          },
          _ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
          },
          trunc: function() {
            return this.clone()._trunc();
          },
          _trunc: function() {
            this.x = trunc(this.x);
            this.y = trunc(this.y);
            return this;
          },
          distanceTo: function(point) {
            point = toPoint(point);
            var x = point.x - this.x, y = point.y - this.y;
            return Math.sqrt(x * x + y * y);
          },
          equals: function(point) {
            point = toPoint(point);
            return point.x === this.x && point.y === this.y;
          },
          contains: function(point) {
            point = toPoint(point);
            return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
          },
          toString: function() {
            return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
          }
        };
        function toPoint(x, y, round) {
          if (x instanceof Point) {
            return x;
          }
          if (isArray(x)) {
            return new Point(x[0], x[1]);
          }
          if (x === void 0 || x === null) {
            return x;
          }
          if (typeof x === "object" && "x" in x && "y" in x) {
            return new Point(x.x, x.y);
          }
          return new Point(x, y, round);
        }
        function Bounds(a, b) {
          if (!a) {
            return;
          }
          var points = b ? [a, b] : a;
          for (var i = 0, len = points.length; i < len; i++) {
            this.extend(points[i]);
          }
        }
        Bounds.prototype = {
          extend: function(point) {
            point = toPoint(point);
            if (!this.min && !this.max) {
              this.min = point.clone();
              this.max = point.clone();
            } else {
              this.min.x = Math.min(point.x, this.min.x);
              this.max.x = Math.max(point.x, this.max.x);
              this.min.y = Math.min(point.y, this.min.y);
              this.max.y = Math.max(point.y, this.max.y);
            }
            return this;
          },
          getCenter: function(round) {
            return new Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, round);
          },
          getBottomLeft: function() {
            return new Point(this.min.x, this.max.y);
          },
          getTopRight: function() {
            return new Point(this.max.x, this.min.y);
          },
          getTopLeft: function() {
            return this.min;
          },
          getBottomRight: function() {
            return this.max;
          },
          getSize: function() {
            return this.max.subtract(this.min);
          },
          contains: function(obj) {
            var min, max;
            if (typeof obj[0] === "number" || obj instanceof Point) {
              obj = toPoint(obj);
            } else {
              obj = toBounds(obj);
            }
            if (obj instanceof Bounds) {
              min = obj.min;
              max = obj.max;
            } else {
              min = max = obj;
            }
            return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
          },
          intersects: function(bounds) {
            bounds = toBounds(bounds);
            var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
            return xIntersects && yIntersects;
          },
          overlaps: function(bounds) {
            bounds = toBounds(bounds);
            var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
            return xOverlaps && yOverlaps;
          },
          isValid: function() {
            return !!(this.min && this.max);
          }
        };
        function toBounds(a, b) {
          if (!a || a instanceof Bounds) {
            return a;
          }
          return new Bounds(a, b);
        }
        function LatLngBounds(corner1, corner2) {
          if (!corner1) {
            return;
          }
          var latlngs = corner2 ? [corner1, corner2] : corner1;
          for (var i = 0, len = latlngs.length; i < len; i++) {
            this.extend(latlngs[i]);
          }
        }
        LatLngBounds.prototype = {
          extend: function(obj) {
            var sw = this._southWest, ne = this._northEast, sw2, ne2;
            if (obj instanceof LatLng) {
              sw2 = obj;
              ne2 = obj;
            } else if (obj instanceof LatLngBounds) {
              sw2 = obj._southWest;
              ne2 = obj._northEast;
              if (!sw2 || !ne2) {
                return this;
              }
            } else {
              return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
            }
            if (!sw && !ne) {
              this._southWest = new LatLng(sw2.lat, sw2.lng);
              this._northEast = new LatLng(ne2.lat, ne2.lng);
            } else {
              sw.lat = Math.min(sw2.lat, sw.lat);
              sw.lng = Math.min(sw2.lng, sw.lng);
              ne.lat = Math.max(ne2.lat, ne.lat);
              ne.lng = Math.max(ne2.lng, ne.lng);
            }
            return this;
          },
          pad: function(bufferRatio) {
            var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
            return new LatLngBounds(new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer), new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
          },
          getCenter: function() {
            return new LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
          },
          getSouthWest: function() {
            return this._southWest;
          },
          getNorthEast: function() {
            return this._northEast;
          },
          getNorthWest: function() {
            return new LatLng(this.getNorth(), this.getWest());
          },
          getSouthEast: function() {
            return new LatLng(this.getSouth(), this.getEast());
          },
          getWest: function() {
            return this._southWest.lng;
          },
          getSouth: function() {
            return this._southWest.lat;
          },
          getEast: function() {
            return this._northEast.lng;
          },
          getNorth: function() {
            return this._northEast.lat;
          },
          contains: function(obj) {
            if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
              obj = toLatLng(obj);
            } else {
              obj = toLatLngBounds(obj);
            }
            var sw = this._southWest, ne = this._northEast, sw2, ne2;
            if (obj instanceof LatLngBounds) {
              sw2 = obj.getSouthWest();
              ne2 = obj.getNorthEast();
            } else {
              sw2 = ne2 = obj;
            }
            return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
          },
          intersects: function(bounds) {
            bounds = toLatLngBounds(bounds);
            var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
            return latIntersects && lngIntersects;
          },
          overlaps: function(bounds) {
            bounds = toLatLngBounds(bounds);
            var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
            return latOverlaps && lngOverlaps;
          },
          toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
          },
          equals: function(bounds, maxMargin) {
            if (!bounds) {
              return false;
            }
            bounds = toLatLngBounds(bounds);
            return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
          },
          isValid: function() {
            return !!(this._southWest && this._northEast);
          }
        };
        function toLatLngBounds(a, b) {
          if (a instanceof LatLngBounds) {
            return a;
          }
          return new LatLngBounds(a, b);
        }
        function LatLng(lat, lng, alt) {
          if (isNaN(lat) || isNaN(lng)) {
            throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
          }
          this.lat = +lat;
          this.lng = +lng;
          if (alt !== void 0) {
            this.alt = +alt;
          }
        }
        LatLng.prototype = {
          equals: function(obj, maxMargin) {
            if (!obj) {
              return false;
            }
            obj = toLatLng(obj);
            var margin = Math.max(Math.abs(this.lat - obj.lat), Math.abs(this.lng - obj.lng));
            return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
          },
          toString: function(precision) {
            return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
          },
          distanceTo: function(other) {
            return Earth.distance(this, toLatLng(other));
          },
          wrap: function() {
            return Earth.wrapLatLng(this);
          },
          toBounds: function(sizeInMeters) {
            var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
            return toLatLngBounds([this.lat - latAccuracy, this.lng - lngAccuracy], [this.lat + latAccuracy, this.lng + lngAccuracy]);
          },
          clone: function() {
            return new LatLng(this.lat, this.lng, this.alt);
          }
        };
        function toLatLng(a, b, c) {
          if (a instanceof LatLng) {
            return a;
          }
          if (isArray(a) && typeof a[0] !== "object") {
            if (a.length === 3) {
              return new LatLng(a[0], a[1], a[2]);
            }
            if (a.length === 2) {
              return new LatLng(a[0], a[1]);
            }
            return null;
          }
          if (a === void 0 || a === null) {
            return a;
          }
          if (typeof a === "object" && "lat" in a) {
            return new LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
          }
          if (b === void 0) {
            return null;
          }
          return new LatLng(a, b, c);
        }
        var CRS = {
          latLngToPoint: function(latlng, zoom2) {
            var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
            return this.transformation._transform(projectedPoint, scale2);
          },
          pointToLatLng: function(point, zoom2) {
            var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
            return this.projection.unproject(untransformedPoint);
          },
          project: function(latlng) {
            return this.projection.project(latlng);
          },
          unproject: function(point) {
            return this.projection.unproject(point);
          },
          scale: function(zoom2) {
            return 256 * Math.pow(2, zoom2);
          },
          zoom: function(scale2) {
            return Math.log(scale2 / 256) / Math.LN2;
          },
          getProjectedBounds: function(zoom2) {
            if (this.infinite) {
              return null;
            }
            var b = this.projection.bounds, s = this.scale(zoom2), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
            return new Bounds(min, max);
          },
          infinite: false,
          wrapLatLng: function(latlng) {
            var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
            return new LatLng(lat, lng, alt);
          },
          wrapLatLngBounds: function(bounds) {
            var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
            if (latShift === 0 && lngShift === 0) {
              return bounds;
            }
            var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
            return new LatLngBounds(newSw, newNe);
          }
        };
        var Earth = extend({}, CRS, {
          wrapLng: [-180, 180],
          R: 6371e3,
          distance: function(latlng1, latlng2) {
            var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return this.R * c;
          }
        });
        var earthRadius = 6378137;
        var SphericalMercator = {
          R: earthRadius,
          MAX_LATITUDE: 85.0511287798,
          project: function(latlng) {
            var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
            return new Point(this.R * latlng.lng * d, this.R * Math.log((1 + sin) / (1 - sin)) / 2);
          },
          unproject: function(point) {
            var d = 180 / Math.PI;
            return new LatLng((2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d, point.x * d / this.R);
          },
          bounds: function() {
            var d = earthRadius * Math.PI;
            return new Bounds([-d, -d], [d, d]);
          }()
        };
        function Transformation(a, b, c, d) {
          if (isArray(a)) {
            this._a = a[0];
            this._b = a[1];
            this._c = a[2];
            this._d = a[3];
            return;
          }
          this._a = a;
          this._b = b;
          this._c = c;
          this._d = d;
        }
        Transformation.prototype = {
          transform: function(point, scale2) {
            return this._transform(point.clone(), scale2);
          },
          _transform: function(point, scale2) {
            scale2 = scale2 || 1;
            point.x = scale2 * (this._a * point.x + this._b);
            point.y = scale2 * (this._c * point.y + this._d);
            return point;
          },
          untransform: function(point, scale2) {
            scale2 = scale2 || 1;
            return new Point((point.x / scale2 - this._b) / this._a, (point.y / scale2 - this._d) / this._c);
          }
        };
        function toTransformation(a, b, c, d) {
          return new Transformation(a, b, c, d);
        }
        var EPSG3857 = extend({}, Earth, {
          code: "EPSG:3857",
          projection: SphericalMercator,
          transformation: function() {
            var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
            return toTransformation(scale2, 0.5, -scale2, 0.5);
          }()
        });
        var EPSG900913 = extend({}, EPSG3857, {
          code: "EPSG:900913"
        });
        function svgCreate(name) {
          return document.createElementNS("http://www.w3.org/2000/svg", name);
        }
        function pointsToPath(rings, closed) {
          var str = "", i, j, len, len2, points, p;
          for (i = 0, len = rings.length; i < len; i++) {
            points = rings[i];
            for (j = 0, len2 = points.length; j < len2; j++) {
              p = points[j];
              str += (j ? "L" : "M") + p.x + " " + p.y;
            }
            str += closed ? svg ? "z" : "x" : "";
          }
          return str || "M0 0";
        }
        var style$1 = document.documentElement.style;
        var ie = "ActiveXObject" in window;
        var ielt9 = ie && !document.addEventListener;
        var edge = "msLaunchUri" in navigator && !("documentMode" in document);
        var webkit = userAgentContains("webkit");
        var android = userAgentContains("android");
        var android23 = userAgentContains("android 2") || userAgentContains("android 3");
        var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
        var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
        var opera = !!window.opera;
        var chrome = !edge && userAgentContains("chrome");
        var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
        var safari = !chrome && userAgentContains("safari");
        var phantom = userAgentContains("phantom");
        var opera12 = "OTransition" in style$1;
        var win = navigator.platform.indexOf("Win") === 0;
        var ie3d = ie && "transition" in style$1;
        var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
        var gecko3d = "MozPerspective" in style$1;
        var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
        var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
        var mobileWebkit = mobile && webkit;
        var mobileWebkit3d = mobile && webkit3d;
        var msPointer = !window.PointerEvent && window.MSPointerEvent;
        var pointer = !!(window.PointerEvent || msPointer);
        var touch = !window.L_NO_TOUCH && (pointer || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        var mobileOpera = mobile && opera;
        var mobileGecko = mobile && gecko;
        var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
        var passiveEvents = function() {
          var supportsPassiveOption = false;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function() {
                supportsPassiveOption = true;
              }
            });
            window.addEventListener("testPassiveEventSupport", falseFn, opts);
            window.removeEventListener("testPassiveEventSupport", falseFn, opts);
          } catch (e) {
          }
          return supportsPassiveOption;
        }();
        var canvas = function() {
          return !!document.createElement("canvas").getContext;
        }();
        var svg = !!(document.createElementNS && svgCreate("svg").createSVGRect);
        var vml = !svg && function() {
          try {
            var div = document.createElement("div");
            div.innerHTML = '<v:shape adj="1"/>';
            var shape = div.firstChild;
            shape.style.behavior = "url(#default#VML)";
            return shape && typeof shape.adj === "object";
          } catch (e) {
            return false;
          }
        }();
        function userAgentContains(str) {
          return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
        }
        var Browser = {
          ie,
          ielt9,
          edge,
          webkit,
          android,
          android23,
          androidStock,
          opera,
          chrome,
          gecko,
          safari,
          phantom,
          opera12,
          win,
          ie3d,
          webkit3d,
          gecko3d,
          any3d,
          mobile,
          mobileWebkit,
          mobileWebkit3d,
          msPointer,
          pointer,
          touch,
          mobileOpera,
          mobileGecko,
          retina,
          passiveEvents,
          canvas,
          svg,
          vml
        };
        var POINTER_DOWN = msPointer ? "MSPointerDown" : "pointerdown";
        var POINTER_MOVE = msPointer ? "MSPointerMove" : "pointermove";
        var POINTER_UP = msPointer ? "MSPointerUp" : "pointerup";
        var POINTER_CANCEL = msPointer ? "MSPointerCancel" : "pointercancel";
        var _pointers = {};
        var _pointerDocListener = false;
        function addPointerListener(obj, type, handler, id) {
          if (type === "touchstart") {
            _addPointerStart(obj, handler, id);
          } else if (type === "touchmove") {
            _addPointerMove(obj, handler, id);
          } else if (type === "touchend") {
            _addPointerEnd(obj, handler, id);
          }
          return this;
        }
        function removePointerListener(obj, type, id) {
          var handler = obj["_leaflet_" + type + id];
          if (type === "touchstart") {
            obj.removeEventListener(POINTER_DOWN, handler, false);
          } else if (type === "touchmove") {
            obj.removeEventListener(POINTER_MOVE, handler, false);
          } else if (type === "touchend") {
            obj.removeEventListener(POINTER_UP, handler, false);
            obj.removeEventListener(POINTER_CANCEL, handler, false);
          }
          return this;
        }
        function _addPointerStart(obj, handler, id) {
          var onDown = bind(function(e) {
            if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
              preventDefault(e);
            }
            _handlePointer(e, handler);
          });
          obj["_leaflet_touchstart" + id] = onDown;
          obj.addEventListener(POINTER_DOWN, onDown, false);
          if (!_pointerDocListener) {
            document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
            document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
            document.addEventListener(POINTER_UP, _globalPointerUp, true);
            document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
            _pointerDocListener = true;
          }
        }
        function _globalPointerDown(e) {
          _pointers[e.pointerId] = e;
        }
        function _globalPointerMove(e) {
          if (_pointers[e.pointerId]) {
            _pointers[e.pointerId] = e;
          }
        }
        function _globalPointerUp(e) {
          delete _pointers[e.pointerId];
        }
        function _handlePointer(e, handler) {
          e.touches = [];
          for (var i in _pointers) {
            e.touches.push(_pointers[i]);
          }
          e.changedTouches = [e];
          handler(e);
        }
        function _addPointerMove(obj, handler, id) {
          var onMove = function(e) {
            if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse") && e.buttons === 0) {
              return;
            }
            _handlePointer(e, handler);
          };
          obj["_leaflet_touchmove" + id] = onMove;
          obj.addEventListener(POINTER_MOVE, onMove, false);
        }
        function _addPointerEnd(obj, handler, id) {
          var onUp = function(e) {
            _handlePointer(e, handler);
          };
          obj["_leaflet_touchend" + id] = onUp;
          obj.addEventListener(POINTER_UP, onUp, false);
          obj.addEventListener(POINTER_CANCEL, onUp, false);
        }
        var _touchstart = msPointer ? "MSPointerDown" : pointer ? "pointerdown" : "touchstart";
        var _touchend = msPointer ? "MSPointerUp" : pointer ? "pointerup" : "touchend";
        var _pre = "_leaflet_";
        function addDoubleTapListener(obj, handler, id) {
          var last, touch$$1, doubleTap = false, delay = 250;
          function onTouchStart(e) {
            if (pointer) {
              if (!e.isPrimary) {
                return;
              }
              if (e.pointerType === "mouse") {
                return;
              }
            } else if (e.touches.length > 1) {
              return;
            }
            var now = Date.now(), delta = now - (last || now);
            touch$$1 = e.touches ? e.touches[0] : e;
            doubleTap = delta > 0 && delta <= delay;
            last = now;
          }
          function onTouchEnd(e) {
            if (doubleTap && !touch$$1.cancelBubble) {
              if (pointer) {
                if (e.pointerType === "mouse") {
                  return;
                }
                var newTouch = {}, prop, i;
                for (i in touch$$1) {
                  prop = touch$$1[i];
                  newTouch[i] = prop && prop.bind ? prop.bind(touch$$1) : prop;
                }
                touch$$1 = newTouch;
              }
              touch$$1.type = "dblclick";
              touch$$1.button = 0;
              handler(touch$$1);
              last = null;
            }
          }
          obj[_pre + _touchstart + id] = onTouchStart;
          obj[_pre + _touchend + id] = onTouchEnd;
          obj[_pre + "dblclick" + id] = handler;
          obj.addEventListener(_touchstart, onTouchStart, passiveEvents ? { passive: false } : false);
          obj.addEventListener(_touchend, onTouchEnd, passiveEvents ? { passive: false } : false);
          obj.addEventListener("dblclick", handler, false);
          return this;
        }
        function removeDoubleTapListener(obj, id) {
          var touchstart = obj[_pre + _touchstart + id], touchend = obj[_pre + _touchend + id], dblclick = obj[_pre + "dblclick" + id];
          obj.removeEventListener(_touchstart, touchstart, passiveEvents ? { passive: false } : false);
          obj.removeEventListener(_touchend, touchend, passiveEvents ? { passive: false } : false);
          obj.removeEventListener("dblclick", dblclick, false);
          return this;
        }
        var TRANSFORM = testProp(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]);
        var TRANSITION = testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
        var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
        function get(id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        }
        function getStyle(el, style) {
          var value = el.style[style] || el.currentStyle && el.currentStyle[style];
          if ((!value || value === "auto") && document.defaultView) {
            var css = document.defaultView.getComputedStyle(el, null);
            value = css ? css[style] : null;
          }
          return value === "auto" ? null : value;
        }
        function create$1(tagName, className, container) {
          var el = document.createElement(tagName);
          el.className = className || "";
          if (container) {
            container.appendChild(el);
          }
          return el;
        }
        function remove(el) {
          var parent = el.parentNode;
          if (parent) {
            parent.removeChild(el);
          }
        }
        function empty(el) {
          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
        }
        function toFront(el) {
          var parent = el.parentNode;
          if (parent && parent.lastChild !== el) {
            parent.appendChild(el);
          }
        }
        function toBack(el) {
          var parent = el.parentNode;
          if (parent && parent.firstChild !== el) {
            parent.insertBefore(el, parent.firstChild);
          }
        }
        function hasClass(el, name) {
          if (el.classList !== void 0) {
            return el.classList.contains(name);
          }
          var className = getClass(el);
          return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
        }
        function addClass(el, name) {
          if (el.classList !== void 0) {
            var classes = splitWords(name);
            for (var i = 0, len = classes.length; i < len; i++) {
              el.classList.add(classes[i]);
            }
          } else if (!hasClass(el, name)) {
            var className = getClass(el);
            setClass(el, (className ? className + " " : "") + name);
          }
        }
        function removeClass(el, name) {
          if (el.classList !== void 0) {
            el.classList.remove(name);
          } else {
            setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
          }
        }
        function setClass(el, name) {
          if (el.className.baseVal === void 0) {
            el.className = name;
          } else {
            el.className.baseVal = name;
          }
        }
        function getClass(el) {
          if (el.correspondingElement) {
            el = el.correspondingElement;
          }
          return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
        }
        function setOpacity(el, value) {
          if ("opacity" in el.style) {
            el.style.opacity = value;
          } else if ("filter" in el.style) {
            _setOpacityIE(el, value);
          }
        }
        function _setOpacityIE(el, value) {
          var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
          try {
            filter = el.filters.item(filterName);
          } catch (e) {
            if (value === 1) {
              return;
            }
          }
          value = Math.round(value * 100);
          if (filter) {
            filter.Enabled = value !== 100;
            filter.Opacity = value;
          } else {
            el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
          }
        }
        function testProp(props) {
          var style = document.documentElement.style;
          for (var i = 0; i < props.length; i++) {
            if (props[i] in style) {
              return props[i];
            }
          }
          return false;
        }
        function setTransform(el, offset, scale2) {
          var pos = offset || new Point(0, 0);
          el.style[TRANSFORM] = (ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
        }
        function setPosition(el, point) {
          el._leaflet_pos = point;
          if (any3d) {
            setTransform(el, point);
          } else {
            el.style.left = point.x + "px";
            el.style.top = point.y + "px";
          }
        }
        function getPosition(el) {
          return el._leaflet_pos || new Point(0, 0);
        }
        var disableTextSelection;
        var enableTextSelection;
        var _userSelect;
        if ("onselectstart" in document) {
          disableTextSelection = function() {
            on(window, "selectstart", preventDefault);
          };
          enableTextSelection = function() {
            off(window, "selectstart", preventDefault);
          };
        } else {
          var userSelectProperty = testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
          disableTextSelection = function() {
            if (userSelectProperty) {
              var style = document.documentElement.style;
              _userSelect = style[userSelectProperty];
              style[userSelectProperty] = "none";
            }
          };
          enableTextSelection = function() {
            if (userSelectProperty) {
              document.documentElement.style[userSelectProperty] = _userSelect;
              _userSelect = void 0;
            }
          };
        }
        function disableImageDrag() {
          on(window, "dragstart", preventDefault);
        }
        function enableImageDrag() {
          off(window, "dragstart", preventDefault);
        }
        var _outlineElement, _outlineStyle;
        function preventOutline(element) {
          while (element.tabIndex === -1) {
            element = element.parentNode;
          }
          if (!element.style) {
            return;
          }
          restoreOutline();
          _outlineElement = element;
          _outlineStyle = element.style.outline;
          element.style.outline = "none";
          on(window, "keydown", restoreOutline);
        }
        function restoreOutline() {
          if (!_outlineElement) {
            return;
          }
          _outlineElement.style.outline = _outlineStyle;
          _outlineElement = void 0;
          _outlineStyle = void 0;
          off(window, "keydown", restoreOutline);
        }
        function getSizedParentNode(element) {
          do {
            element = element.parentNode;
          } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
          return element;
        }
        function getScale(element) {
          var rect = element.getBoundingClientRect();
          return {
            x: rect.width / element.offsetWidth || 1,
            y: rect.height / element.offsetHeight || 1,
            boundingClientRect: rect
          };
        }
        var DomUtil = {
          TRANSFORM,
          TRANSITION,
          TRANSITION_END,
          get,
          getStyle,
          create: create$1,
          remove,
          empty,
          toFront,
          toBack,
          hasClass,
          addClass,
          removeClass,
          setClass,
          getClass,
          setOpacity,
          testProp,
          setTransform,
          setPosition,
          getPosition,
          disableTextSelection,
          enableTextSelection,
          disableImageDrag,
          enableImageDrag,
          preventOutline,
          restoreOutline,
          getSizedParentNode,
          getScale
        };
        function on(obj, types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              addOne(obj, type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              addOne(obj, types[i], fn, context);
            }
          }
          return this;
        }
        var eventsKey = "_leaflet_events";
        function off(obj, types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              removeOne(obj, type, types[type], fn);
            }
          } else if (types) {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              removeOne(obj, types[i], fn, context);
            }
          } else {
            for (var j in obj[eventsKey]) {
              removeOne(obj, j, obj[eventsKey][j]);
            }
            delete obj[eventsKey];
          }
          return this;
        }
        function browserFiresNativeDblClick() {
          if (pointer) {
            return !(edge || safari);
          }
        }
        var mouseSubst = {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          wheel: !("onwheel" in window) && "mousewheel"
        };
        function addOne(obj, type, fn, context) {
          var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
          if (obj[eventsKey] && obj[eventsKey][id]) {
            return this;
          }
          var handler = function(e) {
            return fn.call(context || obj, e || window.event);
          };
          var originalHandler = handler;
          if (pointer && type.indexOf("touch") === 0) {
            addPointerListener(obj, type, handler, id);
          } else if (touch && type === "dblclick" && !browserFiresNativeDblClick()) {
            addDoubleTapListener(obj, handler, id);
          } else if ("addEventListener" in obj) {
            if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
              obj.addEventListener(mouseSubst[type] || type, handler, passiveEvents ? { passive: false } : false);
            } else if (type === "mouseenter" || type === "mouseleave") {
              handler = function(e) {
                e = e || window.event;
                if (isExternalTarget(obj, e)) {
                  originalHandler(e);
                }
              };
              obj.addEventListener(mouseSubst[type], handler, false);
            } else {
              obj.addEventListener(type, originalHandler, false);
            }
          } else if ("attachEvent" in obj) {
            obj.attachEvent("on" + type, handler);
          }
          obj[eventsKey] = obj[eventsKey] || {};
          obj[eventsKey][id] = handler;
        }
        function removeOne(obj, type, fn, context) {
          var id = type + stamp(fn) + (context ? "_" + stamp(context) : ""), handler = obj[eventsKey] && obj[eventsKey][id];
          if (!handler) {
            return this;
          }
          if (pointer && type.indexOf("touch") === 0) {
            removePointerListener(obj, type, id);
          } else if (touch && type === "dblclick" && !browserFiresNativeDblClick()) {
            removeDoubleTapListener(obj, id);
          } else if ("removeEventListener" in obj) {
            obj.removeEventListener(mouseSubst[type] || type, handler, false);
          } else if ("detachEvent" in obj) {
            obj.detachEvent("on" + type, handler);
          }
          obj[eventsKey][id] = null;
        }
        function stopPropagation(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else if (e.originalEvent) {
            e.originalEvent._stopped = true;
          } else {
            e.cancelBubble = true;
          }
          skipped(e);
          return this;
        }
        function disableScrollPropagation(el) {
          addOne(el, "wheel", stopPropagation);
          return this;
        }
        function disableClickPropagation(el) {
          on(el, "mousedown touchstart dblclick", stopPropagation);
          addOne(el, "click", fakeStop);
          return this;
        }
        function preventDefault(e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
          return this;
        }
        function stop(e) {
          preventDefault(e);
          stopPropagation(e);
          return this;
        }
        function getMousePosition(e, container) {
          if (!container) {
            return new Point(e.clientX, e.clientY);
          }
          var scale2 = getScale(container), offset = scale2.boundingClientRect;
          return new Point((e.clientX - offset.left) / scale2.x - container.clientLeft, (e.clientY - offset.top) / scale2.y - container.clientTop);
        }
        var wheelPxFactor = win && chrome ? 2 * window.devicePixelRatio : gecko ? window.devicePixelRatio : 1;
        function getWheelDelta(e) {
          return edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
        }
        var skipEvents = {};
        function fakeStop(e) {
          skipEvents[e.type] = true;
        }
        function skipped(e) {
          var events = skipEvents[e.type];
          skipEvents[e.type] = false;
          return events;
        }
        function isExternalTarget(el, e) {
          var related = e.relatedTarget;
          if (!related) {
            return true;
          }
          try {
            while (related && related !== el) {
              related = related.parentNode;
            }
          } catch (err) {
            return false;
          }
          return related !== el;
        }
        var DomEvent = {
          on,
          off,
          stopPropagation,
          disableScrollPropagation,
          disableClickPropagation,
          preventDefault,
          stop,
          getMousePosition,
          getWheelDelta,
          fakeStop,
          skipped,
          isExternalTarget,
          addListener: on,
          removeListener: off
        };
        var PosAnimation = Evented.extend({
          run: function(el, newPos, duration, easeLinearity) {
            this.stop();
            this._el = el;
            this._inProgress = true;
            this._duration = duration || 0.25;
            this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
            this._startPos = getPosition(el);
            this._offset = newPos.subtract(this._startPos);
            this._startTime = +new Date();
            this.fire("start");
            this._animate();
          },
          stop: function() {
            if (!this._inProgress) {
              return;
            }
            this._step(true);
            this._complete();
          },
          _animate: function() {
            this._animId = requestAnimFrame(this._animate, this);
            this._step();
          },
          _step: function(round) {
            var elapsed = +new Date() - this._startTime, duration = this._duration * 1e3;
            if (elapsed < duration) {
              this._runFrame(this._easeOut(elapsed / duration), round);
            } else {
              this._runFrame(1);
              this._complete();
            }
          },
          _runFrame: function(progress, round) {
            var pos = this._startPos.add(this._offset.multiplyBy(progress));
            if (round) {
              pos._round();
            }
            setPosition(this._el, pos);
            this.fire("step");
          },
          _complete: function() {
            cancelAnimFrame(this._animId);
            this._inProgress = false;
            this.fire("end");
          },
          _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower);
          }
        });
        var Map = Evented.extend({
          options: {
            crs: EPSG3857,
            center: void 0,
            zoom: void 0,
            minZoom: void 0,
            maxZoom: void 0,
            layers: [],
            maxBounds: void 0,
            renderer: void 0,
            zoomAnimation: true,
            zoomAnimationThreshold: 4,
            fadeAnimation: true,
            markerZoomAnimation: true,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: true
          },
          initialize: function(id, options) {
            options = setOptions(this, options);
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._sizeChanged = true;
            this._initContainer(id);
            this._initLayout();
            this._onResize = bind(this._onResize, this);
            this._initEvents();
            if (options.maxBounds) {
              this.setMaxBounds(options.maxBounds);
            }
            if (options.zoom !== void 0) {
              this._zoom = this._limitZoom(options.zoom);
            }
            if (options.center && options.zoom !== void 0) {
              this.setView(toLatLng(options.center), options.zoom, { reset: true });
            }
            this.callInitHooks();
            this._zoomAnimated = TRANSITION && any3d && !mobileOpera && this.options.zoomAnimation;
            if (this._zoomAnimated) {
              this._createAnimProxy();
              on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
            }
            this._addLayers(this.options.layers);
          },
          setView: function(center, zoom2, options) {
            zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
            center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
            options = options || {};
            this._stop();
            if (this._loaded && !options.reset && options !== true) {
              if (options.animate !== void 0) {
                options.zoom = extend({ animate: options.animate }, options.zoom);
                options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
              }
              var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
              if (moved) {
                clearTimeout(this._sizeTimer);
                return this;
              }
            }
            this._resetView(center, zoom2);
            return this;
          },
          setZoom: function(zoom2, options) {
            if (!this._loaded) {
              this._zoom = zoom2;
              return this;
            }
            return this.setView(this.getCenter(), zoom2, { zoom: options });
          },
          zoomIn: function(delta, options) {
            delta = delta || (any3d ? this.options.zoomDelta : 1);
            return this.setZoom(this._zoom + delta, options);
          },
          zoomOut: function(delta, options) {
            delta = delta || (any3d ? this.options.zoomDelta : 1);
            return this.setZoom(this._zoom - delta, options);
          },
          setZoomAround: function(latlng, zoom2, options) {
            var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
            return this.setView(newCenter, zoom2, { zoom: options });
          },
          _getBoundsCenterZoom: function(bounds, options) {
            options = options || {};
            bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
            var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
            zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
            if (zoom2 === Infinity) {
              return {
                center: bounds.getCenter(),
                zoom: zoom2
              };
            }
            var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
            return {
              center,
              zoom: zoom2
            };
          },
          fitBounds: function(bounds, options) {
            bounds = toLatLngBounds(bounds);
            if (!bounds.isValid()) {
              throw new Error("Bounds are not valid.");
            }
            var target = this._getBoundsCenterZoom(bounds, options);
            return this.setView(target.center, target.zoom, options);
          },
          fitWorld: function(options) {
            return this.fitBounds([[-90, -180], [90, 180]], options);
          },
          panTo: function(center, options) {
            return this.setView(center, this._zoom, { pan: options });
          },
          panBy: function(offset, options) {
            offset = toPoint(offset).round();
            options = options || {};
            if (!offset.x && !offset.y) {
              return this.fire("moveend");
            }
            if (options.animate !== true && !this.getSize().contains(offset)) {
              this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
              return this;
            }
            if (!this._panAnim) {
              this._panAnim = new PosAnimation();
              this._panAnim.on({
                "step": this._onPanTransitionStep,
                "end": this._onPanTransitionEnd
              }, this);
            }
            if (!options.noMoveStart) {
              this.fire("movestart");
            }
            if (options.animate !== false) {
              addClass(this._mapPane, "leaflet-pan-anim");
              var newPos = this._getMapPanePos().subtract(offset).round();
              this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
            } else {
              this._rawPanBy(offset);
              this.fire("move").fire("moveend");
            }
            return this;
          },
          flyTo: function(targetCenter, targetZoom, options) {
            options = options || {};
            if (options.animate === false || !any3d) {
              return this.setView(targetCenter, targetZoom, options);
            }
            this._stop();
            var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
            targetCenter = toLatLng(targetCenter);
            targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
            var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
            function r(i) {
              var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
              var log = sq < 1e-9 ? -18 : Math.log(sq);
              return log;
            }
            function sinh(n) {
              return (Math.exp(n) - Math.exp(-n)) / 2;
            }
            function cosh(n) {
              return (Math.exp(n) + Math.exp(-n)) / 2;
            }
            function tanh(n) {
              return sinh(n) / cosh(n);
            }
            var r0 = r(0);
            function w(s) {
              return w0 * (cosh(r0) / cosh(r0 + rho * s));
            }
            function u(s) {
              return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
            }
            function easeOut(t) {
              return 1 - Math.pow(1 - t, 1.5);
            }
            var start = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
            function frame() {
              var t = (Date.now() - start) / duration, s = easeOut(t) * S;
              if (t <= 1) {
                this._flyToFrame = requestAnimFrame(frame, this);
                this._move(this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom), this.getScaleZoom(w0 / w(s), startZoom), { flyTo: true });
              } else {
                this._move(targetCenter, targetZoom)._moveEnd(true);
              }
            }
            this._moveStart(true, options.noMoveStart);
            frame.call(this);
            return this;
          },
          flyToBounds: function(bounds, options) {
            var target = this._getBoundsCenterZoom(bounds, options);
            return this.flyTo(target.center, target.zoom, options);
          },
          setMaxBounds: function(bounds) {
            bounds = toLatLngBounds(bounds);
            if (!bounds.isValid()) {
              this.options.maxBounds = null;
              return this.off("moveend", this._panInsideMaxBounds);
            } else if (this.options.maxBounds) {
              this.off("moveend", this._panInsideMaxBounds);
            }
            this.options.maxBounds = bounds;
            if (this._loaded) {
              this._panInsideMaxBounds();
            }
            return this.on("moveend", this._panInsideMaxBounds);
          },
          setMinZoom: function(zoom2) {
            var oldZoom = this.options.minZoom;
            this.options.minZoom = zoom2;
            if (this._loaded && oldZoom !== zoom2) {
              this.fire("zoomlevelschange");
              if (this.getZoom() < this.options.minZoom) {
                return this.setZoom(zoom2);
              }
            }
            return this;
          },
          setMaxZoom: function(zoom2) {
            var oldZoom = this.options.maxZoom;
            this.options.maxZoom = zoom2;
            if (this._loaded && oldZoom !== zoom2) {
              this.fire("zoomlevelschange");
              if (this.getZoom() > this.options.maxZoom) {
                return this.setZoom(zoom2);
              }
            }
            return this;
          },
          panInsideBounds: function(bounds, options) {
            this._enforcingBounds = true;
            var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
            if (!center.equals(newCenter)) {
              this.panTo(newCenter, options);
            }
            this._enforcingBounds = false;
            return this;
          },
          panInside: function(latlng, options) {
            options = options || {};
            var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), center = this.getCenter(), pixelCenter = this.project(center), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), halfPixelBounds = pixelBounds.getSize().divideBy(2), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]);
            if (!paddedBounds.contains(pixelPoint)) {
              this._enforcingBounds = true;
              var diff = pixelCenter.subtract(pixelPoint), newCenter = toPoint(pixelPoint.x + diff.x, pixelPoint.y + diff.y);
              if (pixelPoint.x < paddedBounds.min.x || pixelPoint.x > paddedBounds.max.x) {
                newCenter.x = pixelCenter.x - diff.x;
                if (diff.x > 0) {
                  newCenter.x += halfPixelBounds.x - paddingTL.x;
                } else {
                  newCenter.x -= halfPixelBounds.x - paddingBR.x;
                }
              }
              if (pixelPoint.y < paddedBounds.min.y || pixelPoint.y > paddedBounds.max.y) {
                newCenter.y = pixelCenter.y - diff.y;
                if (diff.y > 0) {
                  newCenter.y += halfPixelBounds.y - paddingTL.y;
                } else {
                  newCenter.y -= halfPixelBounds.y - paddingBR.y;
                }
              }
              this.panTo(this.unproject(newCenter), options);
              this._enforcingBounds = false;
            }
            return this;
          },
          invalidateSize: function(options) {
            if (!this._loaded) {
              return this;
            }
            options = extend({
              animate: false,
              pan: true
            }, options === true ? { animate: true } : options);
            var oldSize = this.getSize();
            this._sizeChanged = true;
            this._lastCenter = null;
            var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
            if (!offset.x && !offset.y) {
              return this;
            }
            if (options.animate && options.pan) {
              this.panBy(offset);
            } else {
              if (options.pan) {
                this._rawPanBy(offset);
              }
              this.fire("move");
              if (options.debounceMoveend) {
                clearTimeout(this._sizeTimer);
                this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
              } else {
                this.fire("moveend");
              }
            }
            return this.fire("resize", {
              oldSize,
              newSize
            });
          },
          stop: function() {
            this.setZoom(this._limitZoom(this._zoom));
            if (!this.options.zoomSnap) {
              this.fire("viewreset");
            }
            return this._stop();
          },
          locate: function(options) {
            options = this._locateOptions = extend({
              timeout: 1e4,
              watch: false
            }, options);
            if (!("geolocation" in navigator)) {
              this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
              });
              return this;
            }
            var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
            if (options.watch) {
              this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
            } else {
              navigator.geolocation.getCurrentPosition(onResponse, onError, options);
            }
            return this;
          },
          stopLocate: function() {
            if (navigator.geolocation && navigator.geolocation.clearWatch) {
              navigator.geolocation.clearWatch(this._locationWatchId);
            }
            if (this._locateOptions) {
              this._locateOptions.setView = false;
            }
            return this;
          },
          _handleGeolocationError: function(error) {
            var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
            if (this._locateOptions.setView && !this._loaded) {
              this.fitWorld();
            }
            this.fire("locationerror", {
              code: c,
              message: "Geolocation error: " + message + "."
            });
          },
          _handleGeolocationResponse: function(pos) {
            var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
            if (options.setView) {
              var zoom2 = this.getBoundsZoom(bounds);
              this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
            }
            var data = {
              latlng,
              bounds,
              timestamp: pos.timestamp
            };
            for (var i in pos.coords) {
              if (typeof pos.coords[i] === "number") {
                data[i] = pos.coords[i];
              }
            }
            this.fire("locationfound", data);
          },
          addHandler: function(name, HandlerClass) {
            if (!HandlerClass) {
              return this;
            }
            var handler = this[name] = new HandlerClass(this);
            this._handlers.push(handler);
            if (this.options[name]) {
              handler.enable();
            }
            return this;
          },
          remove: function() {
            this._initEvents(true);
            this.off("moveend", this._panInsideMaxBounds);
            if (this._containerId !== this._container._leaflet_id) {
              throw new Error("Map container is being reused by another instance");
            }
            try {
              delete this._container._leaflet_id;
              delete this._containerId;
            } catch (e) {
              this._container._leaflet_id = void 0;
              this._containerId = void 0;
            }
            if (this._locationWatchId !== void 0) {
              this.stopLocate();
            }
            this._stop();
            remove(this._mapPane);
            if (this._clearControlPos) {
              this._clearControlPos();
            }
            if (this._resizeRequest) {
              cancelAnimFrame(this._resizeRequest);
              this._resizeRequest = null;
            }
            this._clearHandlers();
            if (this._loaded) {
              this.fire("unload");
            }
            var i;
            for (i in this._layers) {
              this._layers[i].remove();
            }
            for (i in this._panes) {
              remove(this._panes[i]);
            }
            this._layers = [];
            this._panes = [];
            delete this._mapPane;
            delete this._renderer;
            return this;
          },
          createPane: function(name, container) {
            var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
            if (name) {
              this._panes[name] = pane;
            }
            return pane;
          },
          getCenter: function() {
            this._checkIfLoaded();
            if (this._lastCenter && !this._moved()) {
              return this._lastCenter;
            }
            return this.layerPointToLatLng(this._getCenterLayerPoint());
          },
          getZoom: function() {
            return this._zoom;
          },
          getBounds: function() {
            var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
            return new LatLngBounds(sw, ne);
          },
          getMinZoom: function() {
            return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
          },
          getMaxZoom: function() {
            return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
          },
          getBoundsZoom: function(bounds, inside, padding) {
            bounds = toLatLngBounds(bounds);
            padding = toPoint(padding || [0, 0]);
            var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
            zoom2 = this.getScaleZoom(scale2, zoom2);
            if (snap) {
              zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
              zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom2));
          },
          getSize: function() {
            if (!this._size || this._sizeChanged) {
              this._size = new Point(this._container.clientWidth || 0, this._container.clientHeight || 0);
              this._sizeChanged = false;
            }
            return this._size.clone();
          },
          getPixelBounds: function(center, zoom2) {
            var topLeftPoint = this._getTopLeftPoint(center, zoom2);
            return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
          },
          getPixelOrigin: function() {
            this._checkIfLoaded();
            return this._pixelOrigin;
          },
          getPixelWorldBounds: function(zoom2) {
            return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
          },
          getPane: function(pane) {
            return typeof pane === "string" ? this._panes[pane] : pane;
          },
          getPanes: function() {
            return this._panes;
          },
          getContainer: function() {
            return this._container;
          },
          getZoomScale: function(toZoom, fromZoom) {
            var crs = this.options.crs;
            fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
            return crs.scale(toZoom) / crs.scale(fromZoom);
          },
          getScaleZoom: function(scale2, fromZoom) {
            var crs = this.options.crs;
            fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
            var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
            return isNaN(zoom2) ? Infinity : zoom2;
          },
          project: function(latlng, zoom2) {
            zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
            return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
          },
          unproject: function(point, zoom2) {
            zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
            return this.options.crs.pointToLatLng(toPoint(point), zoom2);
          },
          layerPointToLatLng: function(point) {
            var projectedPoint = toPoint(point).add(this.getPixelOrigin());
            return this.unproject(projectedPoint);
          },
          latLngToLayerPoint: function(latlng) {
            var projectedPoint = this.project(toLatLng(latlng))._round();
            return projectedPoint._subtract(this.getPixelOrigin());
          },
          wrapLatLng: function(latlng) {
            return this.options.crs.wrapLatLng(toLatLng(latlng));
          },
          wrapLatLngBounds: function(latlng) {
            return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
          },
          distance: function(latlng1, latlng2) {
            return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
          },
          containerPointToLayerPoint: function(point) {
            return toPoint(point).subtract(this._getMapPanePos());
          },
          layerPointToContainerPoint: function(point) {
            return toPoint(point).add(this._getMapPanePos());
          },
          containerPointToLatLng: function(point) {
            var layerPoint = this.containerPointToLayerPoint(toPoint(point));
            return this.layerPointToLatLng(layerPoint);
          },
          latLngToContainerPoint: function(latlng) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
          },
          mouseEventToContainerPoint: function(e) {
            return getMousePosition(e, this._container);
          },
          mouseEventToLayerPoint: function(e) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
          },
          mouseEventToLatLng: function(e) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
          },
          _initContainer: function(id) {
            var container = this._container = get(id);
            if (!container) {
              throw new Error("Map container not found.");
            } else if (container._leaflet_id) {
              throw new Error("Map container is already initialized.");
            }
            on(container, "scroll", this._onScroll, this);
            this._containerId = stamp(container);
          },
          _initLayout: function() {
            var container = this._container;
            this._fadeAnimated = this.options.fadeAnimation && any3d;
            addClass(container, "leaflet-container" + (touch ? " leaflet-touch" : "") + (retina ? " leaflet-retina" : "") + (ielt9 ? " leaflet-oldie" : "") + (safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var position = getStyle(container, "position");
            if (position !== "absolute" && position !== "relative" && position !== "fixed") {
              container.style.position = "relative";
            }
            this._initPanes();
            if (this._initControlPos) {
              this._initControlPos();
            }
          },
          _initPanes: function() {
            var panes = this._panes = {};
            this._paneRenderers = {};
            this._mapPane = this.createPane("mapPane", this._container);
            setPosition(this._mapPane, new Point(0, 0));
            this.createPane("tilePane");
            this.createPane("shadowPane");
            this.createPane("overlayPane");
            this.createPane("markerPane");
            this.createPane("tooltipPane");
            this.createPane("popupPane");
            if (!this.options.markerZoomAnimation) {
              addClass(panes.markerPane, "leaflet-zoom-hide");
              addClass(panes.shadowPane, "leaflet-zoom-hide");
            }
          },
          _resetView: function(center, zoom2) {
            setPosition(this._mapPane, new Point(0, 0));
            var loading = !this._loaded;
            this._loaded = true;
            zoom2 = this._limitZoom(zoom2);
            this.fire("viewprereset");
            var zoomChanged = this._zoom !== zoom2;
            this._moveStart(zoomChanged, false)._move(center, zoom2)._moveEnd(zoomChanged);
            this.fire("viewreset");
            if (loading) {
              this.fire("load");
            }
          },
          _moveStart: function(zoomChanged, noMoveStart) {
            if (zoomChanged) {
              this.fire("zoomstart");
            }
            if (!noMoveStart) {
              this.fire("movestart");
            }
            return this;
          },
          _move: function(center, zoom2, data) {
            if (zoom2 === void 0) {
              zoom2 = this._zoom;
            }
            var zoomChanged = this._zoom !== zoom2;
            this._zoom = zoom2;
            this._lastCenter = center;
            this._pixelOrigin = this._getNewPixelOrigin(center);
            if (zoomChanged || data && data.pinch) {
              this.fire("zoom", data);
            }
            return this.fire("move", data);
          },
          _moveEnd: function(zoomChanged) {
            if (zoomChanged) {
              this.fire("zoomend");
            }
            return this.fire("moveend");
          },
          _stop: function() {
            cancelAnimFrame(this._flyToFrame);
            if (this._panAnim) {
              this._panAnim.stop();
            }
            return this;
          },
          _rawPanBy: function(offset) {
            setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
          },
          _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom();
          },
          _panInsideMaxBounds: function() {
            if (!this._enforcingBounds) {
              this.panInsideBounds(this.options.maxBounds);
            }
          },
          _checkIfLoaded: function() {
            if (!this._loaded) {
              throw new Error("Set map center and zoom first.");
            }
          },
          _initEvents: function(remove$$1) {
            this._targets = {};
            this._targets[stamp(this._container)] = this;
            var onOff = remove$$1 ? off : on;
            onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
            if (this.options.trackResize) {
              onOff(window, "resize", this._onResize, this);
            }
            if (any3d && this.options.transform3DLimit) {
              (remove$$1 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
            }
          },
          _onResize: function() {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = requestAnimFrame(function() {
              this.invalidateSize({ debounceMoveend: true });
            }, this);
          },
          _onScroll: function() {
            this._container.scrollTop = 0;
            this._container.scrollLeft = 0;
          },
          _onMoveEnd: function() {
            var pos = this._getMapPanePos();
            if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
              this._resetView(this.getCenter(), this.getZoom());
            }
          },
          _findEventTargets: function(e, type) {
            var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e.target || e.srcElement, dragging = false;
            while (src) {
              target = this._targets[stamp(src)];
              if (target && (type === "click" || type === "preclick") && !e._simulated && this._draggableMoved(target)) {
                dragging = true;
                break;
              }
              if (target && target.listens(type, true)) {
                if (isHover && !isExternalTarget(src, e)) {
                  break;
                }
                targets.push(target);
                if (isHover) {
                  break;
                }
              }
              if (src === this._container) {
                break;
              }
              src = src.parentNode;
            }
            if (!targets.length && !dragging && !isHover && isExternalTarget(src, e)) {
              targets = [this];
            }
            return targets;
          },
          _handleDOMEvent: function(e) {
            if (!this._loaded || skipped(e)) {
              return;
            }
            var type = e.type;
            if (type === "mousedown" || type === "keypress" || type === "keyup" || type === "keydown") {
              preventOutline(e.target || e.srcElement);
            }
            this._fireDOMEvent(e, type);
          },
          _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
          _fireDOMEvent: function(e, type, targets) {
            if (e.type === "click") {
              var synth = extend({}, e);
              synth.type = "preclick";
              this._fireDOMEvent(synth, synth.type, targets);
            }
            if (e._stopped) {
              return;
            }
            targets = (targets || []).concat(this._findEventTargets(e, type));
            if (!targets.length) {
              return;
            }
            var target = targets[0];
            if (type === "contextmenu" && target.listens(type, true)) {
              preventDefault(e);
            }
            var data = {
              originalEvent: e
            };
            if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
              var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
              data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
              data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
              data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
            }
            for (var i = 0; i < targets.length; i++) {
              targets[i].fire(type, data, true);
              if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) {
                return;
              }
            }
          },
          _draggableMoved: function(obj) {
            obj = obj.dragging && obj.dragging.enabled() ? obj : this;
            return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
          },
          _clearHandlers: function() {
            for (var i = 0, len = this._handlers.length; i < len; i++) {
              this._handlers[i].disable();
            }
          },
          whenReady: function(callback, context) {
            if (this._loaded) {
              callback.call(context || this, { target: this });
            } else {
              this.on("load", callback, context);
            }
            return this;
          },
          _getMapPanePos: function() {
            return getPosition(this._mapPane) || new Point(0, 0);
          },
          _moved: function() {
            var pos = this._getMapPanePos();
            return pos && !pos.equals([0, 0]);
          },
          _getTopLeftPoint: function(center, zoom2) {
            var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
            return pixelOrigin.subtract(this._getMapPanePos());
          },
          _getNewPixelOrigin: function(center, zoom2) {
            var viewHalf = this.getSize()._divideBy(2);
            return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
          },
          _latLngToNewLayerPoint: function(latlng, zoom2, center) {
            var topLeft = this._getNewPixelOrigin(center, zoom2);
            return this.project(latlng, zoom2)._subtract(topLeft);
          },
          _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
            var topLeft = this._getNewPixelOrigin(center, zoom2);
            return toBounds([
              this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
            ]);
          },
          _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
          },
          _getCenterOffset: function(latlng) {
            return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
          },
          _limitCenter: function(center, zoom2, bounds) {
            if (!bounds) {
              return center;
            }
            var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
            if (offset.round().equals([0, 0])) {
              return center;
            }
            return this.unproject(centerPoint.add(offset), zoom2);
          },
          _limitOffset: function(offset, bounds) {
            if (!bounds) {
              return offset;
            }
            var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
            return offset.add(this._getBoundsOffset(newBounds, bounds));
          },
          _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
            var projectedMaxBounds = toBounds(this.project(maxBounds.getNorthEast(), zoom2), this.project(maxBounds.getSouthWest(), zoom2)), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
            return new Point(dx, dy);
          },
          _rebound: function(left, right) {
            return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
          },
          _limitZoom: function(zoom2) {
            var min = this.getMinZoom(), max = this.getMaxZoom(), snap = any3d ? this.options.zoomSnap : 1;
            if (snap) {
              zoom2 = Math.round(zoom2 / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom2));
          },
          _onPanTransitionStep: function() {
            this.fire("move");
          },
          _onPanTransitionEnd: function() {
            removeClass(this._mapPane, "leaflet-pan-anim");
            this.fire("moveend");
          },
          _tryAnimatedPan: function(center, options) {
            var offset = this._getCenterOffset(center)._trunc();
            if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
              return false;
            }
            this.panBy(offset, options);
            return true;
          },
          _createAnimProxy: function() {
            var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(proxy);
            this.on("zoomanim", function(e) {
              var prop = TRANSFORM, transform = this._proxy.style[prop];
              setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
              if (transform === this._proxy.style[prop] && this._animatingZoom) {
                this._onZoomTransitionEnd();
              }
            }, this);
            this.on("load moveend", this._animMoveEnd, this);
            this._on("unload", this._destroyAnimProxy, this);
          },
          _destroyAnimProxy: function() {
            remove(this._proxy);
            this.off("load moveend", this._animMoveEnd, this);
            delete this._proxy;
          },
          _animMoveEnd: function() {
            var c = this.getCenter(), z = this.getZoom();
            setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
          },
          _catchTransitionEnd: function(e) {
            if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
              this._onZoomTransitionEnd();
            }
          },
          _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
          },
          _tryAnimatedZoom: function(center, zoom2, options) {
            if (this._animatingZoom) {
              return true;
            }
            options = options || {};
            if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
              return false;
            }
            var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
            if (options.animate !== true && !this.getSize().contains(offset)) {
              return false;
            }
            requestAnimFrame(function() {
              this._moveStart(true, false)._animateZoom(center, zoom2, true);
            }, this);
            return true;
          },
          _animateZoom: function(center, zoom2, startAnim, noUpdate) {
            if (!this._mapPane) {
              return;
            }
            if (startAnim) {
              this._animatingZoom = true;
              this._animateToCenter = center;
              this._animateToZoom = zoom2;
              addClass(this._mapPane, "leaflet-zoom-anim");
            }
            this.fire("zoomanim", {
              center,
              zoom: zoom2,
              noUpdate
            });
            setTimeout(bind(this._onZoomTransitionEnd, this), 250);
          },
          _onZoomTransitionEnd: function() {
            if (!this._animatingZoom) {
              return;
            }
            if (this._mapPane) {
              removeClass(this._mapPane, "leaflet-zoom-anim");
            }
            this._animatingZoom = false;
            this._move(this._animateToCenter, this._animateToZoom);
            requestAnimFrame(function() {
              this._moveEnd(true);
            }, this);
          }
        });
        function createMap(id, options) {
          return new Map(id, options);
        }
        var Control = Class.extend({
          options: {
            position: "topright"
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          getPosition: function() {
            return this.options.position;
          },
          setPosition: function(position) {
            var map = this._map;
            if (map) {
              map.removeControl(this);
            }
            this.options.position = position;
            if (map) {
              map.addControl(this);
            }
            return this;
          },
          getContainer: function() {
            return this._container;
          },
          addTo: function(map) {
            this.remove();
            this._map = map;
            var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
            addClass(container, "leaflet-control");
            if (pos.indexOf("bottom") !== -1) {
              corner.insertBefore(container, corner.firstChild);
            } else {
              corner.appendChild(container);
            }
            this._map.on("unload", this.remove, this);
            return this;
          },
          remove: function() {
            if (!this._map) {
              return this;
            }
            remove(this._container);
            if (this.onRemove) {
              this.onRemove(this._map);
            }
            this._map.off("unload", this.remove, this);
            this._map = null;
            return this;
          },
          _refocusOnMap: function(e) {
            if (this._map && e && e.screenX > 0 && e.screenY > 0) {
              this._map.getContainer().focus();
            }
          }
        });
        var control = function(options) {
          return new Control(options);
        };
        Map.include({
          addControl: function(control2) {
            control2.addTo(this);
            return this;
          },
          removeControl: function(control2) {
            control2.remove();
            return this;
          },
          _initControlPos: function() {
            var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
            function createCorner(vSide, hSide) {
              var className = l + vSide + " " + l + hSide;
              corners[vSide + hSide] = create$1("div", className, container);
            }
            createCorner("top", "left");
            createCorner("top", "right");
            createCorner("bottom", "left");
            createCorner("bottom", "right");
          },
          _clearControlPos: function() {
            for (var i in this._controlCorners) {
              remove(this._controlCorners[i]);
            }
            remove(this._controlContainer);
            delete this._controlCorners;
            delete this._controlContainer;
          }
        });
        var Layers = Control.extend({
          options: {
            collapsed: true,
            position: "topright",
            autoZIndex: true,
            hideSingleBase: false,
            sortLayers: false,
            sortFunction: function(layerA, layerB, nameA, nameB) {
              return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
            }
          },
          initialize: function(baseLayers, overlays, options) {
            setOptions(this, options);
            this._layerControlInputs = [];
            this._layers = [];
            this._lastZIndex = 0;
            this._handlingClick = false;
            for (var i in baseLayers) {
              this._addLayer(baseLayers[i], i);
            }
            for (i in overlays) {
              this._addLayer(overlays[i], i, true);
            }
          },
          onAdd: function(map) {
            this._initLayout();
            this._update();
            this._map = map;
            map.on("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) {
              this._layers[i].layer.on("add remove", this._onLayerChange, this);
            }
            return this._container;
          },
          addTo: function(map) {
            Control.prototype.addTo.call(this, map);
            return this._expandIfNotCollapsed();
          },
          onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) {
              this._layers[i].layer.off("add remove", this._onLayerChange, this);
            }
          },
          addBaseLayer: function(layer, name) {
            this._addLayer(layer, name);
            return this._map ? this._update() : this;
          },
          addOverlay: function(layer, name) {
            this._addLayer(layer, name, true);
            return this._map ? this._update() : this;
          },
          removeLayer: function(layer) {
            layer.off("add remove", this._onLayerChange, this);
            var obj = this._getLayer(stamp(layer));
            if (obj) {
              this._layers.splice(this._layers.indexOf(obj), 1);
            }
            return this._map ? this._update() : this;
          },
          expand: function() {
            addClass(this._container, "leaflet-control-layers-expanded");
            this._section.style.height = null;
            var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
            if (acceptableHeight < this._section.clientHeight) {
              addClass(this._section, "leaflet-control-layers-scrollbar");
              this._section.style.height = acceptableHeight + "px";
            } else {
              removeClass(this._section, "leaflet-control-layers-scrollbar");
            }
            this._checkDisabledLayers();
            return this;
          },
          collapse: function() {
            removeClass(this._container, "leaflet-control-layers-expanded");
            return this;
          },
          _initLayout: function() {
            var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
            container.setAttribute("aria-haspopup", true);
            disableClickPropagation(container);
            disableScrollPropagation(container);
            var section = this._section = create$1("section", className + "-list");
            if (collapsed) {
              this._map.on("click", this.collapse, this);
              if (!android) {
                on(container, {
                  mouseenter: this.expand,
                  mouseleave: this.collapse
                }, this);
              }
            }
            var link = this._layersLink = create$1("a", className + "-toggle", container);
            link.href = "#";
            link.title = "Layers";
            if (touch) {
              on(link, "click", stop);
              on(link, "click", this.expand, this);
            } else {
              on(link, "focus", this.expand, this);
            }
            if (!collapsed) {
              this.expand();
            }
            this._baseLayersList = create$1("div", className + "-base", section);
            this._separator = create$1("div", className + "-separator", section);
            this._overlaysList = create$1("div", className + "-overlays", section);
            container.appendChild(section);
          },
          _getLayer: function(id) {
            for (var i = 0; i < this._layers.length; i++) {
              if (this._layers[i] && stamp(this._layers[i].layer) === id) {
                return this._layers[i];
              }
            }
          },
          _addLayer: function(layer, name, overlay) {
            if (this._map) {
              layer.on("add remove", this._onLayerChange, this);
            }
            this._layers.push({
              layer,
              name,
              overlay
            });
            if (this.options.sortLayers) {
              this._layers.sort(bind(function(a, b) {
                return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
              }, this));
            }
            if (this.options.autoZIndex && layer.setZIndex) {
              this._lastZIndex++;
              layer.setZIndex(this._lastZIndex);
            }
            this._expandIfNotCollapsed();
          },
          _update: function() {
            if (!this._container) {
              return this;
            }
            empty(this._baseLayersList);
            empty(this._overlaysList);
            this._layerControlInputs = [];
            var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
            for (i = 0; i < this._layers.length; i++) {
              obj = this._layers[i];
              this._addItem(obj);
              overlaysPresent = overlaysPresent || obj.overlay;
              baseLayersPresent = baseLayersPresent || !obj.overlay;
              baseLayersCount += !obj.overlay ? 1 : 0;
            }
            if (this.options.hideSingleBase) {
              baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
              this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
            }
            this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
            return this;
          },
          _onLayerChange: function(e) {
            if (!this._handlingClick) {
              this._update();
            }
            var obj = this._getLayer(stamp(e.target));
            var type = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
            if (type) {
              this._map.fire(type, obj);
            }
          },
          _createRadioElement: function(name, checked) {
            var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
            var radioFragment = document.createElement("div");
            radioFragment.innerHTML = radioHtml;
            return radioFragment.firstChild;
          },
          _addItem: function(obj) {
            var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
            if (obj.overlay) {
              input = document.createElement("input");
              input.type = "checkbox";
              input.className = "leaflet-control-layers-selector";
              input.defaultChecked = checked;
            } else {
              input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
            }
            this._layerControlInputs.push(input);
            input.layerId = stamp(obj.layer);
            on(input, "click", this._onInputClick, this);
            var name = document.createElement("span");
            name.innerHTML = " " + obj.name;
            var holder = document.createElement("div");
            label.appendChild(holder);
            holder.appendChild(input);
            holder.appendChild(name);
            var container = obj.overlay ? this._overlaysList : this._baseLayersList;
            container.appendChild(label);
            this._checkDisabledLayers();
            return label;
          },
          _onInputClick: function() {
            var inputs = this._layerControlInputs, input, layer;
            var addedLayers = [], removedLayers = [];
            this._handlingClick = true;
            for (var i = inputs.length - 1; i >= 0; i--) {
              input = inputs[i];
              layer = this._getLayer(input.layerId).layer;
              if (input.checked) {
                addedLayers.push(layer);
              } else if (!input.checked) {
                removedLayers.push(layer);
              }
            }
            for (i = 0; i < removedLayers.length; i++) {
              if (this._map.hasLayer(removedLayers[i])) {
                this._map.removeLayer(removedLayers[i]);
              }
            }
            for (i = 0; i < addedLayers.length; i++) {
              if (!this._map.hasLayer(addedLayers[i])) {
                this._map.addLayer(addedLayers[i]);
              }
            }
            this._handlingClick = false;
            this._refocusOnMap();
          },
          _checkDisabledLayers: function() {
            var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
            for (var i = inputs.length - 1; i >= 0; i--) {
              input = inputs[i];
              layer = this._getLayer(input.layerId).layer;
              input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
            }
          },
          _expandIfNotCollapsed: function() {
            if (this._map && !this.options.collapsed) {
              this.expand();
            }
            return this;
          },
          _expand: function() {
            return this.expand();
          },
          _collapse: function() {
            return this.collapse();
          }
        });
        var layers = function(baseLayers, overlays, options) {
          return new Layers(baseLayers, overlays, options);
        };
        var Zoom = Control.extend({
          options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "&#x2212;",
            zoomOutTitle: "Zoom out"
          },
          onAdd: function(map) {
            var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
            this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle, zoomName + "-in", container, this._zoomIn);
            this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle, zoomName + "-out", container, this._zoomOut);
            this._updateDisabled();
            map.on("zoomend zoomlevelschange", this._updateDisabled, this);
            return container;
          },
          onRemove: function(map) {
            map.off("zoomend zoomlevelschange", this._updateDisabled, this);
          },
          disable: function() {
            this._disabled = true;
            this._updateDisabled();
            return this;
          },
          enable: function() {
            this._disabled = false;
            this._updateDisabled();
            return this;
          },
          _zoomIn: function(e) {
            if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
              this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            }
          },
          _zoomOut: function(e) {
            if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
              this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            }
          },
          _createButton: function(html, title, className, container, fn) {
            var link = create$1("a", className, container);
            link.innerHTML = html;
            link.href = "#";
            link.title = title;
            link.setAttribute("role", "button");
            link.setAttribute("aria-label", title);
            disableClickPropagation(link);
            on(link, "click", stop);
            on(link, "click", fn, this);
            on(link, "click", this._refocusOnMap, this);
            return link;
          },
          _updateDisabled: function() {
            var map = this._map, className = "leaflet-disabled";
            removeClass(this._zoomInButton, className);
            removeClass(this._zoomOutButton, className);
            if (this._disabled || map._zoom === map.getMinZoom()) {
              addClass(this._zoomOutButton, className);
            }
            if (this._disabled || map._zoom === map.getMaxZoom()) {
              addClass(this._zoomInButton, className);
            }
          }
        });
        Map.mergeOptions({
          zoomControl: true
        });
        Map.addInitHook(function() {
          if (this.options.zoomControl) {
            this.zoomControl = new Zoom();
            this.addControl(this.zoomControl);
          }
        });
        var zoom = function(options) {
          return new Zoom(options);
        };
        var Scale = Control.extend({
          options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: true,
            imperial: true
          },
          onAdd: function(map) {
            var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
            this._addScales(options, className + "-line", container);
            map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
            map.whenReady(this._update, this);
            return container;
          },
          onRemove: function(map) {
            map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
          },
          _addScales: function(options, className, container) {
            if (options.metric) {
              this._mScale = create$1("div", className, container);
            }
            if (options.imperial) {
              this._iScale = create$1("div", className, container);
            }
          },
          _update: function() {
            var map = this._map, y = map.getSize().y / 2;
            var maxMeters = map.distance(map.containerPointToLatLng([0, y]), map.containerPointToLatLng([this.options.maxWidth, y]));
            this._updateScales(maxMeters);
          },
          _updateScales: function(maxMeters) {
            if (this.options.metric && maxMeters) {
              this._updateMetric(maxMeters);
            }
            if (this.options.imperial && maxMeters) {
              this._updateImperial(maxMeters);
            }
          },
          _updateMetric: function(maxMeters) {
            var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
            this._updateScale(this._mScale, label, meters / maxMeters);
          },
          _updateImperial: function(maxMeters) {
            var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
            if (maxFeet > 5280) {
              maxMiles = maxFeet / 5280;
              miles = this._getRoundNum(maxMiles);
              this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
            } else {
              feet = this._getRoundNum(maxFeet);
              this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
            }
          },
          _updateScale: function(scale2, text, ratio) {
            scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
            scale2.innerHTML = text;
          },
          _getRoundNum: function(num) {
            var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
            d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
            return pow10 * d;
          }
        });
        var scale = function(options) {
          return new Scale(options);
        };
        var Attribution = Control.extend({
          options: {
            position: "bottomright",
            prefix: '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
          },
          initialize: function(options) {
            setOptions(this, options);
            this._attributions = {};
          },
          onAdd: function(map) {
            map.attributionControl = this;
            this._container = create$1("div", "leaflet-control-attribution");
            disableClickPropagation(this._container);
            for (var i in map._layers) {
              if (map._layers[i].getAttribution) {
                this.addAttribution(map._layers[i].getAttribution());
              }
            }
            this._update();
            return this._container;
          },
          setPrefix: function(prefix) {
            this.options.prefix = prefix;
            this._update();
            return this;
          },
          addAttribution: function(text) {
            if (!text) {
              return this;
            }
            if (!this._attributions[text]) {
              this._attributions[text] = 0;
            }
            this._attributions[text]++;
            this._update();
            return this;
          },
          removeAttribution: function(text) {
            if (!text) {
              return this;
            }
            if (this._attributions[text]) {
              this._attributions[text]--;
              this._update();
            }
            return this;
          },
          _update: function() {
            if (!this._map) {
              return;
            }
            var attribs = [];
            for (var i in this._attributions) {
              if (this._attributions[i]) {
                attribs.push(i);
              }
            }
            var prefixAndAttribs = [];
            if (this.options.prefix) {
              prefixAndAttribs.push(this.options.prefix);
            }
            if (attribs.length) {
              prefixAndAttribs.push(attribs.join(", "));
            }
            this._container.innerHTML = prefixAndAttribs.join(" | ");
          }
        });
        Map.mergeOptions({
          attributionControl: true
        });
        Map.addInitHook(function() {
          if (this.options.attributionControl) {
            new Attribution().addTo(this);
          }
        });
        var attribution = function(options) {
          return new Attribution(options);
        };
        Control.Layers = Layers;
        Control.Zoom = Zoom;
        Control.Scale = Scale;
        Control.Attribution = Attribution;
        control.layers = layers;
        control.zoom = zoom;
        control.scale = scale;
        control.attribution = attribution;
        var Handler = Class.extend({
          initialize: function(map) {
            this._map = map;
          },
          enable: function() {
            if (this._enabled) {
              return this;
            }
            this._enabled = true;
            this.addHooks();
            return this;
          },
          disable: function() {
            if (!this._enabled) {
              return this;
            }
            this._enabled = false;
            this.removeHooks();
            return this;
          },
          enabled: function() {
            return !!this._enabled;
          }
        });
        Handler.addTo = function(map, name) {
          map.addHandler(name, this);
          return this;
        };
        var Mixin = { Events };
        var START = touch ? "touchstart mousedown" : "mousedown";
        var END = {
          mousedown: "mouseup",
          touchstart: "touchend",
          pointerdown: "touchend",
          MSPointerDown: "touchend"
        };
        var MOVE = {
          mousedown: "mousemove",
          touchstart: "touchmove",
          pointerdown: "touchmove",
          MSPointerDown: "touchmove"
        };
        var Draggable = Evented.extend({
          options: {
            clickTolerance: 3
          },
          initialize: function(element, dragStartTarget, preventOutline$$1, options) {
            setOptions(this, options);
            this._element = element;
            this._dragStartTarget = dragStartTarget || element;
            this._preventOutline = preventOutline$$1;
          },
          enable: function() {
            if (this._enabled) {
              return;
            }
            on(this._dragStartTarget, START, this._onDown, this);
            this._enabled = true;
          },
          disable: function() {
            if (!this._enabled) {
              return;
            }
            if (Draggable._dragging === this) {
              this.finishDrag();
            }
            off(this._dragStartTarget, START, this._onDown, this);
            this._enabled = false;
            this._moved = false;
          },
          _onDown: function(e) {
            if (e._simulated || !this._enabled) {
              return;
            }
            this._moved = false;
            if (hasClass(this._element, "leaflet-zoom-anim")) {
              return;
            }
            if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
              return;
            }
            Draggable._dragging = this;
            if (this._preventOutline) {
              preventOutline(this._element);
            }
            disableImageDrag();
            disableTextSelection();
            if (this._moving) {
              return;
            }
            this.fire("down");
            var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
            this._startPoint = new Point(first.clientX, first.clientY);
            this._parentScale = getScale(sizedParent);
            on(document, MOVE[e.type], this._onMove, this);
            on(document, END[e.type], this._onUp, this);
          },
          _onMove: function(e) {
            if (e._simulated || !this._enabled) {
              return;
            }
            if (e.touches && e.touches.length > 1) {
              this._moved = true;
              return;
            }
            var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
            if (!offset.x && !offset.y) {
              return;
            }
            if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
              return;
            }
            offset.x /= this._parentScale.x;
            offset.y /= this._parentScale.y;
            preventDefault(e);
            if (!this._moved) {
              this.fire("dragstart");
              this._moved = true;
              this._startPos = getPosition(this._element).subtract(offset);
              addClass(document.body, "leaflet-dragging");
              this._lastTarget = e.target || e.srcElement;
              if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
                this._lastTarget = this._lastTarget.correspondingUseElement;
              }
              addClass(this._lastTarget, "leaflet-drag-target");
            }
            this._newPos = this._startPos.add(offset);
            this._moving = true;
            cancelAnimFrame(this._animRequest);
            this._lastEvent = e;
            this._animRequest = requestAnimFrame(this._updatePosition, this, true);
          },
          _updatePosition: function() {
            var e = { originalEvent: this._lastEvent };
            this.fire("predrag", e);
            setPosition(this._element, this._newPos);
            this.fire("drag", e);
          },
          _onUp: function(e) {
            if (e._simulated || !this._enabled) {
              return;
            }
            this.finishDrag();
          },
          finishDrag: function() {
            removeClass(document.body, "leaflet-dragging");
            if (this._lastTarget) {
              removeClass(this._lastTarget, "leaflet-drag-target");
              this._lastTarget = null;
            }
            for (var i in MOVE) {
              off(document, MOVE[i], this._onMove, this);
              off(document, END[i], this._onUp, this);
            }
            enableImageDrag();
            enableTextSelection();
            if (this._moved && this._moving) {
              cancelAnimFrame(this._animRequest);
              this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
              });
            }
            this._moving = false;
            Draggable._dragging = false;
          }
        });
        function simplify(points, tolerance) {
          if (!tolerance || !points.length) {
            return points.slice();
          }
          var sqTolerance = tolerance * tolerance;
          points = _reducePoints(points, sqTolerance);
          points = _simplifyDP(points, sqTolerance);
          return points;
        }
        function pointToSegmentDistance(p, p1, p2) {
          return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
        }
        function closestPointOnSegment(p, p1, p2) {
          return _sqClosestPointOnSegment(p, p1, p2);
        }
        function _simplifyDP(points, sqTolerance) {
          var len = points.length, ArrayConstructor = typeof Uint8Array !== void 0 + "" ? Uint8Array : Array, markers = new ArrayConstructor(len);
          markers[0] = markers[len - 1] = 1;
          _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
          var i, newPoints = [];
          for (i = 0; i < len; i++) {
            if (markers[i]) {
              newPoints.push(points[i]);
            }
          }
          return newPoints;
        }
        function _simplifyDPStep(points, markers, sqTolerance, first, last) {
          var maxSqDist = 0, index2, i, sqDist;
          for (i = first + 1; i <= last - 1; i++) {
            sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
            if (sqDist > maxSqDist) {
              index2 = i;
              maxSqDist = sqDist;
            }
          }
          if (maxSqDist > sqTolerance) {
            markers[index2] = 1;
            _simplifyDPStep(points, markers, sqTolerance, first, index2);
            _simplifyDPStep(points, markers, sqTolerance, index2, last);
          }
        }
        function _reducePoints(points, sqTolerance) {
          var reducedPoints = [points[0]];
          for (var i = 1, prev = 0, len = points.length; i < len; i++) {
            if (_sqDist(points[i], points[prev]) > sqTolerance) {
              reducedPoints.push(points[i]);
              prev = i;
            }
          }
          if (prev < len - 1) {
            reducedPoints.push(points[len - 1]);
          }
          return reducedPoints;
        }
        var _lastCode;
        function clipSegment(a, b, bounds, useLastCode, round) {
          var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
          _lastCode = codeB;
          while (true) {
            if (!(codeA | codeB)) {
              return [a, b];
            }
            if (codeA & codeB) {
              return false;
            }
            codeOut = codeA || codeB;
            p = _getEdgeIntersection(a, b, codeOut, bounds, round);
            newCode = _getBitCode(p, bounds);
            if (codeOut === codeA) {
              a = p;
              codeA = newCode;
            } else {
              b = p;
              codeB = newCode;
            }
          }
        }
        function _getEdgeIntersection(a, b, code, bounds, round) {
          var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x, y;
          if (code & 8) {
            x = a.x + dx * (max.y - a.y) / dy;
            y = max.y;
          } else if (code & 4) {
            x = a.x + dx * (min.y - a.y) / dy;
            y = min.y;
          } else if (code & 2) {
            x = max.x;
            y = a.y + dy * (max.x - a.x) / dx;
          } else if (code & 1) {
            x = min.x;
            y = a.y + dy * (min.x - a.x) / dx;
          }
          return new Point(x, y, round);
        }
        function _getBitCode(p, bounds) {
          var code = 0;
          if (p.x < bounds.min.x) {
            code |= 1;
          } else if (p.x > bounds.max.x) {
            code |= 2;
          }
          if (p.y < bounds.min.y) {
            code |= 4;
          } else if (p.y > bounds.max.y) {
            code |= 8;
          }
          return code;
        }
        function _sqDist(p1, p2) {
          var dx = p2.x - p1.x, dy = p2.y - p1.y;
          return dx * dx + dy * dy;
        }
        function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
          var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
          if (dot > 0) {
            t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
            if (t > 1) {
              x = p2.x;
              y = p2.y;
            } else if (t > 0) {
              x += dx * t;
              y += dy * t;
            }
          }
          dx = p.x - x;
          dy = p.y - y;
          return sqDist ? dx * dx + dy * dy : new Point(x, y);
        }
        function isFlat(latlngs) {
          return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
        }
        function _flat(latlngs) {
          console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
          return isFlat(latlngs);
        }
        var LineUtil = {
          simplify,
          pointToSegmentDistance,
          closestPointOnSegment,
          clipSegment,
          _getEdgeIntersection,
          _getBitCode,
          _sqClosestPointOnSegment,
          isFlat,
          _flat
        };
        function clipPolygon(points, bounds, round) {
          var clippedPoints, edges = [1, 4, 2, 8], i, j, k, a, b, len, edge2, p;
          for (i = 0, len = points.length; i < len; i++) {
            points[i]._code = _getBitCode(points[i], bounds);
          }
          for (k = 0; k < 4; k++) {
            edge2 = edges[k];
            clippedPoints = [];
            for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
              a = points[i];
              b = points[j];
              if (!(a._code & edge2)) {
                if (b._code & edge2) {
                  p = _getEdgeIntersection(b, a, edge2, bounds, round);
                  p._code = _getBitCode(p, bounds);
                  clippedPoints.push(p);
                }
                clippedPoints.push(a);
              } else if (!(b._code & edge2)) {
                p = _getEdgeIntersection(b, a, edge2, bounds, round);
                p._code = _getBitCode(p, bounds);
                clippedPoints.push(p);
              }
            }
            points = clippedPoints;
          }
          return points;
        }
        var PolyUtil = {
          clipPolygon
        };
        var LonLat = {
          project: function(latlng) {
            return new Point(latlng.lng, latlng.lat);
          },
          unproject: function(point) {
            return new LatLng(point.y, point.x);
          },
          bounds: new Bounds([-180, -90], [180, 90])
        };
        var Mercator = {
          R: 6378137,
          R_MINOR: 6356752314245179e-9,
          bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
          project: function(latlng) {
            var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
            var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
            y = -r * Math.log(Math.max(ts, 1e-10));
            return new Point(latlng.lng * d * r, y);
          },
          unproject: function(point) {
            var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
            for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
              con = e * Math.sin(phi);
              con = Math.pow((1 - con) / (1 + con), e / 2);
              dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
              phi += dphi;
            }
            return new LatLng(phi * d, point.x * d / r);
          }
        };
        var index = {
          LonLat,
          Mercator,
          SphericalMercator
        };
        var EPSG3395 = extend({}, Earth, {
          code: "EPSG:3395",
          projection: Mercator,
          transformation: function() {
            var scale2 = 0.5 / (Math.PI * Mercator.R);
            return toTransformation(scale2, 0.5, -scale2, 0.5);
          }()
        });
        var EPSG4326 = extend({}, Earth, {
          code: "EPSG:4326",
          projection: LonLat,
          transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
        });
        var Simple = extend({}, CRS, {
          projection: LonLat,
          transformation: toTransformation(1, 0, -1, 0),
          scale: function(zoom2) {
            return Math.pow(2, zoom2);
          },
          zoom: function(scale2) {
            return Math.log(scale2) / Math.LN2;
          },
          distance: function(latlng1, latlng2) {
            var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
            return Math.sqrt(dx * dx + dy * dy);
          },
          infinite: true
        });
        CRS.Earth = Earth;
        CRS.EPSG3395 = EPSG3395;
        CRS.EPSG3857 = EPSG3857;
        CRS.EPSG900913 = EPSG900913;
        CRS.EPSG4326 = EPSG4326;
        CRS.Simple = Simple;
        var Layer = Evented.extend({
          options: {
            pane: "overlayPane",
            attribution: null,
            bubblingMouseEvents: true
          },
          addTo: function(map) {
            map.addLayer(this);
            return this;
          },
          remove: function() {
            return this.removeFrom(this._map || this._mapToAdd);
          },
          removeFrom: function(obj) {
            if (obj) {
              obj.removeLayer(this);
            }
            return this;
          },
          getPane: function(name) {
            return this._map.getPane(name ? this.options[name] || name : this.options.pane);
          },
          addInteractiveTarget: function(targetEl) {
            this._map._targets[stamp(targetEl)] = this;
            return this;
          },
          removeInteractiveTarget: function(targetEl) {
            delete this._map._targets[stamp(targetEl)];
            return this;
          },
          getAttribution: function() {
            return this.options.attribution;
          },
          _layerAdd: function(e) {
            var map = e.target;
            if (!map.hasLayer(this)) {
              return;
            }
            this._map = map;
            this._zoomAnimated = map._zoomAnimated;
            if (this.getEvents) {
              var events = this.getEvents();
              map.on(events, this);
              this.once("remove", function() {
                map.off(events, this);
              }, this);
            }
            this.onAdd(map);
            if (this.getAttribution && map.attributionControl) {
              map.attributionControl.addAttribution(this.getAttribution());
            }
            this.fire("add");
            map.fire("layeradd", { layer: this });
          }
        });
        Map.include({
          addLayer: function(layer) {
            if (!layer._layerAdd) {
              throw new Error("The provided object is not a Layer.");
            }
            var id = stamp(layer);
            if (this._layers[id]) {
              return this;
            }
            this._layers[id] = layer;
            layer._mapToAdd = this;
            if (layer.beforeAdd) {
              layer.beforeAdd(this);
            }
            this.whenReady(layer._layerAdd, layer);
            return this;
          },
          removeLayer: function(layer) {
            var id = stamp(layer);
            if (!this._layers[id]) {
              return this;
            }
            if (this._loaded) {
              layer.onRemove(this);
            }
            if (layer.getAttribution && this.attributionControl) {
              this.attributionControl.removeAttribution(layer.getAttribution());
            }
            delete this._layers[id];
            if (this._loaded) {
              this.fire("layerremove", { layer });
              layer.fire("remove");
            }
            layer._map = layer._mapToAdd = null;
            return this;
          },
          hasLayer: function(layer) {
            return !!layer && stamp(layer) in this._layers;
          },
          eachLayer: function(method, context) {
            for (var i in this._layers) {
              method.call(context, this._layers[i]);
            }
            return this;
          },
          _addLayers: function(layers2) {
            layers2 = layers2 ? isArray(layers2) ? layers2 : [layers2] : [];
            for (var i = 0, len = layers2.length; i < len; i++) {
              this.addLayer(layers2[i]);
            }
          },
          _addZoomLimit: function(layer) {
            if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
              this._zoomBoundLayers[stamp(layer)] = layer;
              this._updateZoomLevels();
            }
          },
          _removeZoomLimit: function(layer) {
            var id = stamp(layer);
            if (this._zoomBoundLayers[id]) {
              delete this._zoomBoundLayers[id];
              this._updateZoomLevels();
            }
          },
          _updateZoomLevels: function() {
            var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
            for (var i in this._zoomBoundLayers) {
              var options = this._zoomBoundLayers[i].options;
              minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
              maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
            }
            this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
            this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
            if (oldZoomSpan !== this._getZoomSpan()) {
              this.fire("zoomlevelschange");
            }
            if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
              this.setZoom(this._layersMaxZoom);
            }
            if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
              this.setZoom(this._layersMinZoom);
            }
          }
        });
        var LayerGroup = Layer.extend({
          initialize: function(layers2, options) {
            setOptions(this, options);
            this._layers = {};
            var i, len;
            if (layers2) {
              for (i = 0, len = layers2.length; i < len; i++) {
                this.addLayer(layers2[i]);
              }
            }
          },
          addLayer: function(layer) {
            var id = this.getLayerId(layer);
            this._layers[id] = layer;
            if (this._map) {
              this._map.addLayer(layer);
            }
            return this;
          },
          removeLayer: function(layer) {
            var id = layer in this._layers ? layer : this.getLayerId(layer);
            if (this._map && this._layers[id]) {
              this._map.removeLayer(this._layers[id]);
            }
            delete this._layers[id];
            return this;
          },
          hasLayer: function(layer) {
            if (!layer) {
              return false;
            }
            var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
            return layerId in this._layers;
          },
          clearLayers: function() {
            return this.eachLayer(this.removeLayer, this);
          },
          invoke: function(methodName) {
            var args = Array.prototype.slice.call(arguments, 1), i, layer;
            for (i in this._layers) {
              layer = this._layers[i];
              if (layer[methodName]) {
                layer[methodName].apply(layer, args);
              }
            }
            return this;
          },
          onAdd: function(map) {
            this.eachLayer(map.addLayer, map);
          },
          onRemove: function(map) {
            this.eachLayer(map.removeLayer, map);
          },
          eachLayer: function(method, context) {
            for (var i in this._layers) {
              method.call(context, this._layers[i]);
            }
            return this;
          },
          getLayer: function(id) {
            return this._layers[id];
          },
          getLayers: function() {
            var layers2 = [];
            this.eachLayer(layers2.push, layers2);
            return layers2;
          },
          setZIndex: function(zIndex) {
            return this.invoke("setZIndex", zIndex);
          },
          getLayerId: function(layer) {
            return stamp(layer);
          }
        });
        var layerGroup = function(layers2, options) {
          return new LayerGroup(layers2, options);
        };
        var FeatureGroup = LayerGroup.extend({
          addLayer: function(layer) {
            if (this.hasLayer(layer)) {
              return this;
            }
            layer.addEventParent(this);
            LayerGroup.prototype.addLayer.call(this, layer);
            return this.fire("layeradd", { layer });
          },
          removeLayer: function(layer) {
            if (!this.hasLayer(layer)) {
              return this;
            }
            if (layer in this._layers) {
              layer = this._layers[layer];
            }
            layer.removeEventParent(this);
            LayerGroup.prototype.removeLayer.call(this, layer);
            return this.fire("layerremove", { layer });
          },
          setStyle: function(style) {
            return this.invoke("setStyle", style);
          },
          bringToFront: function() {
            return this.invoke("bringToFront");
          },
          bringToBack: function() {
            return this.invoke("bringToBack");
          },
          getBounds: function() {
            var bounds = new LatLngBounds();
            for (var id in this._layers) {
              var layer = this._layers[id];
              bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
            }
            return bounds;
          }
        });
        var featureGroup = function(layers2, options) {
          return new FeatureGroup(layers2, options);
        };
        var Icon = Class.extend({
          options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0]
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          createIcon: function(oldIcon) {
            return this._createIcon("icon", oldIcon);
          },
          createShadow: function(oldIcon) {
            return this._createIcon("shadow", oldIcon);
          },
          _createIcon: function(name, oldIcon) {
            var src = this._getIconUrl(name);
            if (!src) {
              if (name === "icon") {
                throw new Error("iconUrl not set in Icon options (see the docs).");
              }
              return null;
            }
            var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
            this._setIconStyles(img, name);
            return img;
          },
          _setIconStyles: function(img, name) {
            var options = this.options;
            var sizeOption = options[name + "Size"];
            if (typeof sizeOption === "number") {
              sizeOption = [sizeOption, sizeOption];
            }
            var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
            img.className = "leaflet-marker-" + name + " " + (options.className || "");
            if (anchor) {
              img.style.marginLeft = -anchor.x + "px";
              img.style.marginTop = -anchor.y + "px";
            }
            if (size) {
              img.style.width = size.x + "px";
              img.style.height = size.y + "px";
            }
          },
          _createImg: function(src, el) {
            el = el || document.createElement("img");
            el.src = src;
            return el;
          },
          _getIconUrl: function(name) {
            return retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
          }
        });
        function icon(options) {
          return new Icon(options);
        }
        var IconDefault = Icon.extend({
          options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          },
          _getIconUrl: function(name) {
            if (!IconDefault.imagePath) {
              IconDefault.imagePath = this._detectIconPath();
            }
            return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
          },
          _detectIconPath: function() {
            var el = create$1("div", "leaflet-default-icon-path", document.body);
            var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
            document.body.removeChild(el);
            if (path === null || path.indexOf("url") !== 0) {
              path = "";
            } else {
              path = path.replace(/^url\(["']?/, "").replace(/marker-icon\.png["']?\)$/, "");
            }
            return path;
          }
        });
        var MarkerDrag = Handler.extend({
          initialize: function(marker2) {
            this._marker = marker2;
          },
          addHooks: function() {
            var icon2 = this._marker._icon;
            if (!this._draggable) {
              this._draggable = new Draggable(icon2, icon2, true);
            }
            this._draggable.on({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).enable();
            addClass(icon2, "leaflet-marker-draggable");
          },
          removeHooks: function() {
            this._draggable.off({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).disable();
            if (this._marker._icon) {
              removeClass(this._marker._icon, "leaflet-marker-draggable");
            }
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          _adjustPan: function(e) {
            var marker2 = this._marker, map = marker2._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker2._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
            var panBounds = toBounds(bounds.min._subtract(origin).add(padding), bounds.max._subtract(origin).subtract(padding));
            if (!panBounds.contains(iconPos)) {
              var movement = toPoint((Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x), (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)).multiplyBy(speed);
              map.panBy(movement, { animate: false });
              this._draggable._newPos._add(movement);
              this._draggable._startPos._add(movement);
              setPosition(marker2._icon, this._draggable._newPos);
              this._onDrag(e);
              this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
            }
          },
          _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng();
            this._marker.closePopup && this._marker.closePopup();
            this._marker.fire("movestart").fire("dragstart");
          },
          _onPreDrag: function(e) {
            if (this._marker.options.autoPan) {
              cancelAnimFrame(this._panRequest);
              this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
            }
          },
          _onDrag: function(e) {
            var marker2 = this._marker, shadow = marker2._shadow, iconPos = getPosition(marker2._icon), latlng = marker2._map.layerPointToLatLng(iconPos);
            if (shadow) {
              setPosition(shadow, iconPos);
            }
            marker2._latlng = latlng;
            e.latlng = latlng;
            e.oldLatLng = this._oldLatLng;
            marker2.fire("move", e).fire("drag", e);
          },
          _onDragEnd: function(e) {
            cancelAnimFrame(this._panRequest);
            delete this._oldLatLng;
            this._marker.fire("moveend").fire("dragend", e);
          }
        });
        var Marker = Layer.extend({
          options: {
            icon: new IconDefault(),
            interactive: true,
            keyboard: true,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: false,
            riseOffset: 250,
            pane: "markerPane",
            shadowPane: "shadowPane",
            bubblingMouseEvents: false,
            draggable: false,
            autoPan: false,
            autoPanPadding: [50, 50],
            autoPanSpeed: 10
          },
          initialize: function(latlng, options) {
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
          },
          onAdd: function(map) {
            this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
            if (this._zoomAnimated) {
              map.on("zoomanim", this._animateZoom, this);
            }
            this._initIcon();
            this.update();
          },
          onRemove: function(map) {
            if (this.dragging && this.dragging.enabled()) {
              this.options.draggable = true;
              this.dragging.removeHooks();
            }
            delete this.dragging;
            if (this._zoomAnimated) {
              map.off("zoomanim", this._animateZoom, this);
            }
            this._removeIcon();
            this._removeShadow();
          },
          getEvents: function() {
            return {
              zoom: this.update,
              viewreset: this.update
            };
          },
          getLatLng: function() {
            return this._latlng;
          },
          setLatLng: function(latlng) {
            var oldLatLng = this._latlng;
            this._latlng = toLatLng(latlng);
            this.update();
            return this.fire("move", { oldLatLng, latlng: this._latlng });
          },
          setZIndexOffset: function(offset) {
            this.options.zIndexOffset = offset;
            return this.update();
          },
          getIcon: function() {
            return this.options.icon;
          },
          setIcon: function(icon2) {
            this.options.icon = icon2;
            if (this._map) {
              this._initIcon();
              this.update();
            }
            if (this._popup) {
              this.bindPopup(this._popup, this._popup.options);
            }
            return this;
          },
          getElement: function() {
            return this._icon;
          },
          update: function() {
            if (this._icon && this._map) {
              var pos = this._map.latLngToLayerPoint(this._latlng).round();
              this._setPos(pos);
            }
            return this;
          },
          _initIcon: function() {
            var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            var icon2 = options.icon.createIcon(this._icon), addIcon = false;
            if (icon2 !== this._icon) {
              if (this._icon) {
                this._removeIcon();
              }
              addIcon = true;
              if (options.title) {
                icon2.title = options.title;
              }
              if (icon2.tagName === "IMG") {
                icon2.alt = options.alt || "";
              }
            }
            addClass(icon2, classToAdd);
            if (options.keyboard) {
              icon2.tabIndex = "0";
            }
            this._icon = icon2;
            if (options.riseOnHover) {
              this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
              });
            }
            var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
            if (newShadow !== this._shadow) {
              this._removeShadow();
              addShadow = true;
            }
            if (newShadow) {
              addClass(newShadow, classToAdd);
              newShadow.alt = "";
            }
            this._shadow = newShadow;
            if (options.opacity < 1) {
              this._updateOpacity();
            }
            if (addIcon) {
              this.getPane().appendChild(this._icon);
            }
            this._initInteraction();
            if (newShadow && addShadow) {
              this.getPane(options.shadowPane).appendChild(this._shadow);
            }
          },
          _removeIcon: function() {
            if (this.options.riseOnHover) {
              this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
              });
            }
            remove(this._icon);
            this.removeInteractiveTarget(this._icon);
            this._icon = null;
          },
          _removeShadow: function() {
            if (this._shadow) {
              remove(this._shadow);
            }
            this._shadow = null;
          },
          _setPos: function(pos) {
            if (this._icon) {
              setPosition(this._icon, pos);
            }
            if (this._shadow) {
              setPosition(this._shadow, pos);
            }
            this._zIndex = pos.y + this.options.zIndexOffset;
            this._resetZIndex();
          },
          _updateZIndex: function(offset) {
            if (this._icon) {
              this._icon.style.zIndex = this._zIndex + offset;
            }
          },
          _animateZoom: function(opt) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
            this._setPos(pos);
          },
          _initInteraction: function() {
            if (!this.options.interactive) {
              return;
            }
            addClass(this._icon, "leaflet-interactive");
            this.addInteractiveTarget(this._icon);
            if (MarkerDrag) {
              var draggable = this.options.draggable;
              if (this.dragging) {
                draggable = this.dragging.enabled();
                this.dragging.disable();
              }
              this.dragging = new MarkerDrag(this);
              if (draggable) {
                this.dragging.enable();
              }
            }
          },
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._map) {
              this._updateOpacity();
            }
            return this;
          },
          _updateOpacity: function() {
            var opacity = this.options.opacity;
            if (this._icon) {
              setOpacity(this._icon, opacity);
            }
            if (this._shadow) {
              setOpacity(this._shadow, opacity);
            }
          },
          _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset);
          },
          _resetZIndex: function() {
            this._updateZIndex(0);
          },
          _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor;
          },
          _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor;
          }
        });
        function marker(latlng, options) {
          return new Marker(latlng, options);
        }
        var Path = Layer.extend({
          options: {
            stroke: true,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: false,
            fillColor: null,
            fillOpacity: 0.2,
            fillRule: "evenodd",
            interactive: true,
            bubblingMouseEvents: true
          },
          beforeAdd: function(map) {
            this._renderer = map.getRenderer(this);
          },
          onAdd: function() {
            this._renderer._initPath(this);
            this._reset();
            this._renderer._addPath(this);
          },
          onRemove: function() {
            this._renderer._removePath(this);
          },
          redraw: function() {
            if (this._map) {
              this._renderer._updatePath(this);
            }
            return this;
          },
          setStyle: function(style) {
            setOptions(this, style);
            if (this._renderer) {
              this._renderer._updateStyle(this);
              if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, "weight")) {
                this._updateBounds();
              }
            }
            return this;
          },
          bringToFront: function() {
            if (this._renderer) {
              this._renderer._bringToFront(this);
            }
            return this;
          },
          bringToBack: function() {
            if (this._renderer) {
              this._renderer._bringToBack(this);
            }
            return this;
          },
          getElement: function() {
            return this._path;
          },
          _reset: function() {
            this._project();
            this._update();
          },
          _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance;
          }
        });
        var CircleMarker = Path.extend({
          options: {
            fill: true,
            radius: 10
          },
          initialize: function(latlng, options) {
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
            this._radius = this.options.radius;
          },
          setLatLng: function(latlng) {
            var oldLatLng = this._latlng;
            this._latlng = toLatLng(latlng);
            this.redraw();
            return this.fire("move", { oldLatLng, latlng: this._latlng });
          },
          getLatLng: function() {
            return this._latlng;
          },
          setRadius: function(radius) {
            this.options.radius = this._radius = radius;
            return this.redraw();
          },
          getRadius: function() {
            return this._radius;
          },
          setStyle: function(options) {
            var radius = options && options.radius || this._radius;
            Path.prototype.setStyle.call(this, options);
            this.setRadius(radius);
            return this;
          },
          _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._updateBounds();
          },
          _updateBounds: function() {
            var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
            this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
          },
          _update: function() {
            if (this._map) {
              this._updatePath();
            }
          },
          _updatePath: function() {
            this._renderer._updateCircle(this);
          },
          _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
          },
          _containsPoint: function(p) {
            return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
          }
        });
        function circleMarker(latlng, options) {
          return new CircleMarker(latlng, options);
        }
        var Circle = CircleMarker.extend({
          initialize: function(latlng, options, legacyOptions) {
            if (typeof options === "number") {
              options = extend({}, legacyOptions, { radius: options });
            }
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
            if (isNaN(this.options.radius)) {
              throw new Error("Circle radius cannot be NaN");
            }
            this._mRadius = this.options.radius;
          },
          setRadius: function(radius) {
            this._mRadius = radius;
            return this.redraw();
          },
          getRadius: function() {
            return this._mRadius;
          },
          getBounds: function() {
            var half = [this._radius, this._radiusY || this._radius];
            return new LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(half)), this._map.layerPointToLatLng(this._point.add(half)));
          },
          setStyle: Path.prototype.setStyle,
          _project: function() {
            var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
            if (crs.distance === Earth.distance) {
              var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
              if (isNaN(lngR) || lngR === 0) {
                lngR = latR / Math.cos(Math.PI / 180 * lat);
              }
              this._point = p.subtract(map.getPixelOrigin());
              this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
              this._radiusY = p.y - top.y;
            } else {
              var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
              this._point = map.latLngToLayerPoint(this._latlng);
              this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
            }
            this._updateBounds();
          }
        });
        function circle(latlng, options, legacyOptions) {
          return new Circle(latlng, options, legacyOptions);
        }
        var Polyline = Path.extend({
          options: {
            smoothFactor: 1,
            noClip: false
          },
          initialize: function(latlngs, options) {
            setOptions(this, options);
            this._setLatLngs(latlngs);
          },
          getLatLngs: function() {
            return this._latlngs;
          },
          setLatLngs: function(latlngs) {
            this._setLatLngs(latlngs);
            return this.redraw();
          },
          isEmpty: function() {
            return !this._latlngs.length;
          },
          closestLayerPoint: function(p) {
            var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
            for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
              var points = this._parts[j];
              for (var i = 1, len = points.length; i < len; i++) {
                p1 = points[i - 1];
                p2 = points[i];
                var sqDist = closest(p, p1, p2, true);
                if (sqDist < minDistance) {
                  minDistance = sqDist;
                  minPoint = closest(p, p1, p2);
                }
              }
            }
            if (minPoint) {
              minPoint.distance = Math.sqrt(minDistance);
            }
            return minPoint;
          },
          getCenter: function() {
            if (!this._map) {
              throw new Error("Must add layer to map before using getCenter()");
            }
            var i, halfDist, segDist, dist, p1, p2, ratio, points = this._rings[0], len = points.length;
            if (!len) {
              return null;
            }
            for (i = 0, halfDist = 0; i < len - 1; i++) {
              halfDist += points[i].distanceTo(points[i + 1]) / 2;
            }
            if (halfDist === 0) {
              return this._map.layerPointToLatLng(points[0]);
            }
            for (i = 0, dist = 0; i < len - 1; i++) {
              p1 = points[i];
              p2 = points[i + 1];
              segDist = p1.distanceTo(p2);
              dist += segDist;
              if (dist > halfDist) {
                ratio = (dist - halfDist) / segDist;
                return this._map.layerPointToLatLng([
                  p2.x - ratio * (p2.x - p1.x),
                  p2.y - ratio * (p2.y - p1.y)
                ]);
              }
            }
          },
          getBounds: function() {
            return this._bounds;
          },
          addLatLng: function(latlng, latlngs) {
            latlngs = latlngs || this._defaultShape();
            latlng = toLatLng(latlng);
            latlngs.push(latlng);
            this._bounds.extend(latlng);
            return this.redraw();
          },
          _setLatLngs: function(latlngs) {
            this._bounds = new LatLngBounds();
            this._latlngs = this._convertLatLngs(latlngs);
          },
          _defaultShape: function() {
            return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
          },
          _convertLatLngs: function(latlngs) {
            var result = [], flat = isFlat(latlngs);
            for (var i = 0, len = latlngs.length; i < len; i++) {
              if (flat) {
                result[i] = toLatLng(latlngs[i]);
                this._bounds.extend(result[i]);
              } else {
                result[i] = this._convertLatLngs(latlngs[i]);
              }
            }
            return result;
          },
          _project: function() {
            var pxBounds = new Bounds();
            this._rings = [];
            this._projectLatlngs(this._latlngs, this._rings, pxBounds);
            if (this._bounds.isValid() && pxBounds.isValid()) {
              this._rawPxBounds = pxBounds;
              this._updateBounds();
            }
          },
          _updateBounds: function() {
            var w = this._clickTolerance(), p = new Point(w, w);
            this._pxBounds = new Bounds([
              this._rawPxBounds.min.subtract(p),
              this._rawPxBounds.max.add(p)
            ]);
          },
          _projectLatlngs: function(latlngs, result, projectedBounds) {
            var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i, ring;
            if (flat) {
              ring = [];
              for (i = 0; i < len; i++) {
                ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
                projectedBounds.extend(ring[i]);
              }
              result.push(ring);
            } else {
              for (i = 0; i < len; i++) {
                this._projectLatlngs(latlngs[i], result, projectedBounds);
              }
            }
          },
          _clipPoints: function() {
            var bounds = this._renderer._bounds;
            this._parts = [];
            if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
              return;
            }
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var parts = this._parts, i, j, k, len, len2, segment, points;
            for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
              points = this._rings[i];
              for (j = 0, len2 = points.length; j < len2 - 1; j++) {
                segment = clipSegment(points[j], points[j + 1], bounds, j, true);
                if (!segment) {
                  continue;
                }
                parts[k] = parts[k] || [];
                parts[k].push(segment[0]);
                if (segment[1] !== points[j + 1] || j === len2 - 2) {
                  parts[k].push(segment[1]);
                  k++;
                }
              }
            }
          },
          _simplifyPoints: function() {
            var parts = this._parts, tolerance = this.options.smoothFactor;
            for (var i = 0, len = parts.length; i < len; i++) {
              parts[i] = simplify(parts[i], tolerance);
            }
          },
          _update: function() {
            if (!this._map) {
              return;
            }
            this._clipPoints();
            this._simplifyPoints();
            this._updatePath();
          },
          _updatePath: function() {
            this._renderer._updatePoly(this);
          },
          _containsPoint: function(p, closed) {
            var i, j, k, len, len2, part, w = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(p)) {
              return false;
            }
            for (i = 0, len = this._parts.length; i < len; i++) {
              part = this._parts[i];
              for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
                if (!closed && j === 0) {
                  continue;
                }
                if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
                  return true;
                }
              }
            }
            return false;
          }
        });
        function polyline(latlngs, options) {
          return new Polyline(latlngs, options);
        }
        Polyline._flat = _flat;
        var Polygon = Polyline.extend({
          options: {
            fill: true
          },
          isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length;
          },
          getCenter: function() {
            if (!this._map) {
              throw new Error("Must add layer to map before using getCenter()");
            }
            var i, j, p1, p2, f, area, x, y, center, points = this._rings[0], len = points.length;
            if (!len) {
              return null;
            }
            area = x = y = 0;
            for (i = 0, j = len - 1; i < len; j = i++) {
              p1 = points[i];
              p2 = points[j];
              f = p1.y * p2.x - p2.y * p1.x;
              x += (p1.x + p2.x) * f;
              y += (p1.y + p2.y) * f;
              area += f * 3;
            }
            if (area === 0) {
              center = points[0];
            } else {
              center = [x / area, y / area];
            }
            return this._map.layerPointToLatLng(center);
          },
          _convertLatLngs: function(latlngs) {
            var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
            if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
              result.pop();
            }
            return result;
          },
          _setLatLngs: function(latlngs) {
            Polyline.prototype._setLatLngs.call(this, latlngs);
            if (isFlat(this._latlngs)) {
              this._latlngs = [this._latlngs];
            }
          },
          _defaultShape: function() {
            return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
          },
          _clipPoints: function() {
            var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
            bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
            this._parts = [];
            if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
              return;
            }
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
              clipped = clipPolygon(this._rings[i], bounds, true);
              if (clipped.length) {
                this._parts.push(clipped);
              }
            }
          },
          _updatePath: function() {
            this._renderer._updatePoly(this, true);
          },
          _containsPoint: function(p) {
            var inside = false, part, p1, p2, i, j, k, len, len2;
            if (!this._pxBounds || !this._pxBounds.contains(p)) {
              return false;
            }
            for (i = 0, len = this._parts.length; i < len; i++) {
              part = this._parts[i];
              for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
                p1 = part[j];
                p2 = part[k];
                if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
                  inside = !inside;
                }
              }
            }
            return inside || Polyline.prototype._containsPoint.call(this, p, true);
          }
        });
        function polygon(latlngs, options) {
          return new Polygon(latlngs, options);
        }
        var GeoJSON = FeatureGroup.extend({
          initialize: function(geojson, options) {
            setOptions(this, options);
            this._layers = {};
            if (geojson) {
              this.addData(geojson);
            }
          },
          addData: function(geojson) {
            var features = isArray(geojson) ? geojson : geojson.features, i, len, feature;
            if (features) {
              for (i = 0, len = features.length; i < len; i++) {
                feature = features[i];
                if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                  this.addData(feature);
                }
              }
              return this;
            }
            var options = this.options;
            if (options.filter && !options.filter(geojson)) {
              return this;
            }
            var layer = geometryToLayer(geojson, options);
            if (!layer) {
              return this;
            }
            layer.feature = asFeature(geojson);
            layer.defaultOptions = layer.options;
            this.resetStyle(layer);
            if (options.onEachFeature) {
              options.onEachFeature(geojson, layer);
            }
            return this.addLayer(layer);
          },
          resetStyle: function(layer) {
            if (layer === void 0) {
              return this.eachLayer(this.resetStyle, this);
            }
            layer.options = extend({}, layer.defaultOptions);
            this._setLayerStyle(layer, this.options.style);
            return this;
          },
          setStyle: function(style) {
            return this.eachLayer(function(layer) {
              this._setLayerStyle(layer, style);
            }, this);
          },
          _setLayerStyle: function(layer, style) {
            if (layer.setStyle) {
              if (typeof style === "function") {
                style = style(layer.feature);
              }
              layer.setStyle(style);
            }
          }
        });
        function geometryToLayer(geojson, options) {
          var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
          if (!coords && !geometry) {
            return null;
          }
          switch (geometry.type) {
            case "Point":
              latlng = _coordsToLatLng(coords);
              return _pointToLayer(pointToLayer, geojson, latlng, options);
            case "MultiPoint":
              for (i = 0, len = coords.length; i < len; i++) {
                latlng = _coordsToLatLng(coords[i]);
                layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
              }
              return new FeatureGroup(layers2);
            case "LineString":
            case "MultiLineString":
              latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
              return new Polyline(latlngs, options);
            case "Polygon":
            case "MultiPolygon":
              latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
              return new Polygon(latlngs, options);
            case "GeometryCollection":
              for (i = 0, len = geometry.geometries.length; i < len; i++) {
                var layer = geometryToLayer({
                  geometry: geometry.geometries[i],
                  type: "Feature",
                  properties: geojson.properties
                }, options);
                if (layer) {
                  layers2.push(layer);
                }
              }
              return new FeatureGroup(layers2);
            default:
              throw new Error("Invalid GeoJSON object.");
          }
        }
        function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
          return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
        }
        function coordsToLatLng(coords) {
          return new LatLng(coords[1], coords[0], coords[2]);
        }
        function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
          var latlngs = [];
          for (var i = 0, len = coords.length, latlng; i < len; i++) {
            latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
            latlngs.push(latlng);
          }
          return latlngs;
        }
        function latLngToCoords(latlng, precision) {
          precision = typeof precision === "number" ? precision : 6;
          return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
        }
        function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
          var coords = [];
          for (var i = 0, len = latlngs.length; i < len; i++) {
            coords.push(levelsDeep ? latLngsToCoords(latlngs[i], levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
          }
          if (!levelsDeep && closed) {
            coords.push(coords[0]);
          }
          return coords;
        }
        function getFeature(layer, newGeometry) {
          return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
        }
        function asFeature(geojson) {
          if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
            return geojson;
          }
          return {
            type: "Feature",
            properties: {},
            geometry: geojson
          };
        }
        var PointToGeoJSON = {
          toGeoJSON: function(precision) {
            return getFeature(this, {
              type: "Point",
              coordinates: latLngToCoords(this.getLatLng(), precision)
            });
          }
        };
        Marker.include(PointToGeoJSON);
        Circle.include(PointToGeoJSON);
        CircleMarker.include(PointToGeoJSON);
        Polyline.include({
          toGeoJSON: function(precision) {
            var multi = !isFlat(this._latlngs);
            var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
            return getFeature(this, {
              type: (multi ? "Multi" : "") + "LineString",
              coordinates: coords
            });
          }
        });
        Polygon.include({
          toGeoJSON: function(precision) {
            var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
            var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
            if (!holes) {
              coords = [coords];
            }
            return getFeature(this, {
              type: (multi ? "Multi" : "") + "Polygon",
              coordinates: coords
            });
          }
        });
        LayerGroup.include({
          toMultiPoint: function(precision) {
            var coords = [];
            this.eachLayer(function(layer) {
              coords.push(layer.toGeoJSON(precision).geometry.coordinates);
            });
            return getFeature(this, {
              type: "MultiPoint",
              coordinates: coords
            });
          },
          toGeoJSON: function(precision) {
            var type = this.feature && this.feature.geometry && this.feature.geometry.type;
            if (type === "MultiPoint") {
              return this.toMultiPoint(precision);
            }
            var isGeometryCollection = type === "GeometryCollection", jsons = [];
            this.eachLayer(function(layer) {
              if (layer.toGeoJSON) {
                var json = layer.toGeoJSON(precision);
                if (isGeometryCollection) {
                  jsons.push(json.geometry);
                } else {
                  var feature = asFeature(json);
                  if (feature.type === "FeatureCollection") {
                    jsons.push.apply(jsons, feature.features);
                  } else {
                    jsons.push(feature);
                  }
                }
              }
            });
            if (isGeometryCollection) {
              return getFeature(this, {
                geometries: jsons,
                type: "GeometryCollection"
              });
            }
            return {
              type: "FeatureCollection",
              features: jsons
            };
          }
        });
        function geoJSON(geojson, options) {
          return new GeoJSON(geojson, options);
        }
        var geoJson = geoJSON;
        var ImageOverlay = Layer.extend({
          options: {
            opacity: 1,
            alt: "",
            interactive: false,
            crossOrigin: false,
            errorOverlayUrl: "",
            zIndex: 1,
            className: ""
          },
          initialize: function(url, bounds, options) {
            this._url = url;
            this._bounds = toLatLngBounds(bounds);
            setOptions(this, options);
          },
          onAdd: function() {
            if (!this._image) {
              this._initImage();
              if (this.options.opacity < 1) {
                this._updateOpacity();
              }
            }
            if (this.options.interactive) {
              addClass(this._image, "leaflet-interactive");
              this.addInteractiveTarget(this._image);
            }
            this.getPane().appendChild(this._image);
            this._reset();
          },
          onRemove: function() {
            remove(this._image);
            if (this.options.interactive) {
              this.removeInteractiveTarget(this._image);
            }
          },
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._image) {
              this._updateOpacity();
            }
            return this;
          },
          setStyle: function(styleOpts) {
            if (styleOpts.opacity) {
              this.setOpacity(styleOpts.opacity);
            }
            return this;
          },
          bringToFront: function() {
            if (this._map) {
              toFront(this._image);
            }
            return this;
          },
          bringToBack: function() {
            if (this._map) {
              toBack(this._image);
            }
            return this;
          },
          setUrl: function(url) {
            this._url = url;
            if (this._image) {
              this._image.src = url;
            }
            return this;
          },
          setBounds: function(bounds) {
            this._bounds = toLatLngBounds(bounds);
            if (this._map) {
              this._reset();
            }
            return this;
          },
          getEvents: function() {
            var events = {
              zoom: this._reset,
              viewreset: this._reset
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          setZIndex: function(value) {
            this.options.zIndex = value;
            this._updateZIndex();
            return this;
          },
          getBounds: function() {
            return this._bounds;
          },
          getElement: function() {
            return this._image;
          },
          _initImage: function() {
            var wasElementSupplied = this._url.tagName === "IMG";
            var img = this._image = wasElementSupplied ? this._url : create$1("img");
            addClass(img, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(img, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(img, this.options.className);
            }
            img.onselectstart = falseFn;
            img.onmousemove = falseFn;
            img.onload = bind(this.fire, this, "load");
            img.onerror = bind(this._overlayOnError, this, "error");
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            if (this.options.zIndex) {
              this._updateZIndex();
            }
            if (wasElementSupplied) {
              this._url = img.src;
              return;
            }
            img.src = this._url;
            img.alt = this.options.alt;
          },
          _animateZoom: function(e) {
            var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
            setTransform(this._image, offset, scale2);
          },
          _reset: function() {
            var image = this._image, bounds = new Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), size = bounds.getSize();
            setPosition(image, bounds.min);
            image.style.width = size.x + "px";
            image.style.height = size.y + "px";
          },
          _updateOpacity: function() {
            setOpacity(this._image, this.options.opacity);
          },
          _updateZIndex: function() {
            if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
              this._image.style.zIndex = this.options.zIndex;
            }
          },
          _overlayOnError: function() {
            this.fire("error");
            var errorUrl = this.options.errorOverlayUrl;
            if (errorUrl && this._url !== errorUrl) {
              this._url = errorUrl;
              this._image.src = errorUrl;
            }
          }
        });
        var imageOverlay = function(url, bounds, options) {
          return new ImageOverlay(url, bounds, options);
        };
        var VideoOverlay = ImageOverlay.extend({
          options: {
            autoplay: true,
            loop: true,
            keepAspectRatio: true,
            muted: false
          },
          _initImage: function() {
            var wasElementSupplied = this._url.tagName === "VIDEO";
            var vid = this._image = wasElementSupplied ? this._url : create$1("video");
            addClass(vid, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(vid, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(vid, this.options.className);
            }
            vid.onselectstart = falseFn;
            vid.onmousemove = falseFn;
            vid.onloadeddata = bind(this.fire, this, "load");
            if (wasElementSupplied) {
              var sourceElements = vid.getElementsByTagName("source");
              var sources = [];
              for (var j = 0; j < sourceElements.length; j++) {
                sources.push(sourceElements[j].src);
              }
              this._url = sourceElements.length > 0 ? sources : [vid.src];
              return;
            }
            if (!isArray(this._url)) {
              this._url = [this._url];
            }
            if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
              vid.style["objectFit"] = "fill";
            }
            vid.autoplay = !!this.options.autoplay;
            vid.loop = !!this.options.loop;
            vid.muted = !!this.options.muted;
            for (var i = 0; i < this._url.length; i++) {
              var source = create$1("source");
              source.src = this._url[i];
              vid.appendChild(source);
            }
          }
        });
        function videoOverlay(video, bounds, options) {
          return new VideoOverlay(video, bounds, options);
        }
        var SVGOverlay = ImageOverlay.extend({
          _initImage: function() {
            var el = this._image = this._url;
            addClass(el, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(el, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(el, this.options.className);
            }
            el.onselectstart = falseFn;
            el.onmousemove = falseFn;
          }
        });
        function svgOverlay(el, bounds, options) {
          return new SVGOverlay(el, bounds, options);
        }
        var DivOverlay = Layer.extend({
          options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
          },
          initialize: function(options, source) {
            setOptions(this, options);
            this._source = source;
          },
          onAdd: function(map) {
            this._zoomAnimated = map._zoomAnimated;
            if (!this._container) {
              this._initLayout();
            }
            if (map._fadeAnimated) {
              setOpacity(this._container, 0);
            }
            clearTimeout(this._removeTimeout);
            this.getPane().appendChild(this._container);
            this.update();
            if (map._fadeAnimated) {
              setOpacity(this._container, 1);
            }
            this.bringToFront();
          },
          onRemove: function(map) {
            if (map._fadeAnimated) {
              setOpacity(this._container, 0);
              this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
            } else {
              remove(this._container);
            }
          },
          getLatLng: function() {
            return this._latlng;
          },
          setLatLng: function(latlng) {
            this._latlng = toLatLng(latlng);
            if (this._map) {
              this._updatePosition();
              this._adjustPan();
            }
            return this;
          },
          getContent: function() {
            return this._content;
          },
          setContent: function(content) {
            this._content = content;
            this.update();
            return this;
          },
          getElement: function() {
            return this._container;
          },
          update: function() {
            if (!this._map) {
              return;
            }
            this._container.style.visibility = "hidden";
            this._updateContent();
            this._updateLayout();
            this._updatePosition();
            this._container.style.visibility = "";
            this._adjustPan();
          },
          getEvents: function() {
            var events = {
              zoom: this._updatePosition,
              viewreset: this._updatePosition
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          isOpen: function() {
            return !!this._map && this._map.hasLayer(this);
          },
          bringToFront: function() {
            if (this._map) {
              toFront(this._container);
            }
            return this;
          },
          bringToBack: function() {
            if (this._map) {
              toBack(this._container);
            }
            return this;
          },
          _prepareOpen: function(parent, layer, latlng) {
            if (!(layer instanceof Layer)) {
              latlng = layer;
              layer = parent;
            }
            if (layer instanceof FeatureGroup) {
              for (var id in parent._layers) {
                layer = parent._layers[id];
                break;
              }
            }
            if (!latlng) {
              if (layer.getCenter) {
                latlng = layer.getCenter();
              } else if (layer.getLatLng) {
                latlng = layer.getLatLng();
              } else {
                throw new Error("Unable to get source layer LatLng.");
              }
            }
            this._source = layer;
            this.update();
            return latlng;
          },
          _updateContent: function() {
            if (!this._content) {
              return;
            }
            var node = this._contentNode;
            var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
            if (typeof content === "string") {
              node.innerHTML = content;
            } else {
              while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
              }
              node.appendChild(content);
            }
            this.fire("contentupdate");
          },
          _updatePosition: function() {
            if (!this._map) {
              return;
            }
            var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
            if (this._zoomAnimated) {
              setPosition(this._container, pos.add(anchor));
            } else {
              offset = offset.add(pos).add(anchor);
            }
            var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
            this._container.style.bottom = bottom + "px";
            this._container.style.left = left + "px";
          },
          _getAnchor: function() {
            return [0, 0];
          }
        });
        var Popup = DivOverlay.extend({
          options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: true,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: false,
            closeButton: true,
            autoClose: true,
            closeOnEscapeKey: true,
            className: ""
          },
          openOn: function(map) {
            map.openPopup(this);
            return this;
          },
          onAdd: function(map) {
            DivOverlay.prototype.onAdd.call(this, map);
            map.fire("popupopen", { popup: this });
            if (this._source) {
              this._source.fire("popupopen", { popup: this }, true);
              if (!(this._source instanceof Path)) {
                this._source.on("preclick", stopPropagation);
              }
            }
          },
          onRemove: function(map) {
            DivOverlay.prototype.onRemove.call(this, map);
            map.fire("popupclose", { popup: this });
            if (this._source) {
              this._source.fire("popupclose", { popup: this }, true);
              if (!(this._source instanceof Path)) {
                this._source.off("preclick", stopPropagation);
              }
            }
          },
          getEvents: function() {
            var events = DivOverlay.prototype.getEvents.call(this);
            if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
              events.preclick = this._close;
            }
            if (this.options.keepInView) {
              events.moveend = this._adjustPan;
            }
            return events;
          },
          _close: function() {
            if (this._map) {
              this._map.closePopup(this);
            }
          },
          _initLayout: function() {
            var prefix = "leaflet-popup", container = this._container = create$1("div", prefix + " " + (this.options.className || "") + " leaflet-zoom-animated");
            var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
            this._contentNode = create$1("div", prefix + "-content", wrapper);
            disableClickPropagation(container);
            disableScrollPropagation(this._contentNode);
            on(container, "contextmenu", stopPropagation);
            this._tipContainer = create$1("div", prefix + "-tip-container", container);
            this._tip = create$1("div", prefix + "-tip", this._tipContainer);
            if (this.options.closeButton) {
              var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
              closeButton.href = "#close";
              closeButton.innerHTML = "&#215;";
              on(closeButton, "click", this._onCloseButtonClick, this);
            }
          },
          _updateLayout: function() {
            var container = this._contentNode, style = container.style;
            style.width = "";
            style.whiteSpace = "nowrap";
            var width = container.offsetWidth;
            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);
            style.width = width + 1 + "px";
            style.whiteSpace = "";
            style.height = "";
            var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
            if (maxHeight && height > maxHeight) {
              style.height = maxHeight + "px";
              addClass(container, scrolledClass);
            } else {
              removeClass(container, scrolledClass);
            }
            this._containerWidth = this._container.offsetWidth;
          },
          _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
            setPosition(this._container, pos.add(anchor));
          },
          _adjustPan: function() {
            if (!this.options.autoPan) {
              return;
            }
            if (this._map._panAnim) {
              this._map._panAnim.stop();
            }
            var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
            layerPos._add(getPosition(this._container));
            var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map.getSize(), dx = 0, dy = 0;
            if (containerPos.x + containerWidth + paddingBR.x > size.x) {
              dx = containerPos.x + containerWidth - size.x + paddingBR.x;
            }
            if (containerPos.x - dx - paddingTL.x < 0) {
              dx = containerPos.x - paddingTL.x;
            }
            if (containerPos.y + containerHeight + paddingBR.y > size.y) {
              dy = containerPos.y + containerHeight - size.y + paddingBR.y;
            }
            if (containerPos.y - dy - paddingTL.y < 0) {
              dy = containerPos.y - paddingTL.y;
            }
            if (dx || dy) {
              map.fire("autopanstart").panBy([dx, dy]);
            }
          },
          _onCloseButtonClick: function(e) {
            this._close();
            stop(e);
          },
          _getAnchor: function() {
            return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
          }
        });
        var popup = function(options, source) {
          return new Popup(options, source);
        };
        Map.mergeOptions({
          closePopupOnClick: true
        });
        Map.include({
          openPopup: function(popup2, latlng, options) {
            if (!(popup2 instanceof Popup)) {
              popup2 = new Popup(options).setContent(popup2);
            }
            if (latlng) {
              popup2.setLatLng(latlng);
            }
            if (this.hasLayer(popup2)) {
              return this;
            }
            if (this._popup && this._popup.options.autoClose) {
              this.closePopup();
            }
            this._popup = popup2;
            return this.addLayer(popup2);
          },
          closePopup: function(popup2) {
            if (!popup2 || popup2 === this._popup) {
              popup2 = this._popup;
              this._popup = null;
            }
            if (popup2) {
              this.removeLayer(popup2);
            }
            return this;
          }
        });
        Layer.include({
          bindPopup: function(content, options) {
            if (content instanceof Popup) {
              setOptions(content, options);
              this._popup = content;
              content._source = this;
            } else {
              if (!this._popup || options) {
                this._popup = new Popup(options, this);
              }
              this._popup.setContent(content);
            }
            if (!this._popupHandlersAdded) {
              this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
              });
              this._popupHandlersAdded = true;
            }
            return this;
          },
          unbindPopup: function() {
            if (this._popup) {
              this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
              });
              this._popupHandlersAdded = false;
              this._popup = null;
            }
            return this;
          },
          openPopup: function(layer, latlng) {
            if (this._popup && this._map) {
              latlng = this._popup._prepareOpen(this, layer, latlng);
              this._map.openPopup(this._popup, latlng);
            }
            return this;
          },
          closePopup: function() {
            if (this._popup) {
              this._popup._close();
            }
            return this;
          },
          togglePopup: function(target) {
            if (this._popup) {
              if (this._popup._map) {
                this.closePopup();
              } else {
                this.openPopup(target);
              }
            }
            return this;
          },
          isPopupOpen: function() {
            return this._popup ? this._popup.isOpen() : false;
          },
          setPopupContent: function(content) {
            if (this._popup) {
              this._popup.setContent(content);
            }
            return this;
          },
          getPopup: function() {
            return this._popup;
          },
          _openPopup: function(e) {
            var layer = e.layer || e.target;
            if (!this._popup) {
              return;
            }
            if (!this._map) {
              return;
            }
            stop(e);
            if (layer instanceof Path) {
              this.openPopup(e.layer || e.target, e.latlng);
              return;
            }
            if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
              this.closePopup();
            } else {
              this.openPopup(layer, e.latlng);
            }
          },
          _movePopup: function(e) {
            this._popup.setLatLng(e.latlng);
          },
          _onKeyPress: function(e) {
            if (e.originalEvent.keyCode === 13) {
              this._openPopup(e);
            }
          }
        });
        var Tooltip = DivOverlay.extend({
          options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: false,
            sticky: false,
            interactive: false,
            opacity: 0.9
          },
          onAdd: function(map) {
            DivOverlay.prototype.onAdd.call(this, map);
            this.setOpacity(this.options.opacity);
            map.fire("tooltipopen", { tooltip: this });
            if (this._source) {
              this._source.fire("tooltipopen", { tooltip: this }, true);
            }
          },
          onRemove: function(map) {
            DivOverlay.prototype.onRemove.call(this, map);
            map.fire("tooltipclose", { tooltip: this });
            if (this._source) {
              this._source.fire("tooltipclose", { tooltip: this }, true);
            }
          },
          getEvents: function() {
            var events = DivOverlay.prototype.getEvents.call(this);
            if (touch && !this.options.permanent) {
              events.preclick = this._close;
            }
            return events;
          },
          _close: function() {
            if (this._map) {
              this._map.closeTooltip(this);
            }
          },
          _initLayout: function() {
            var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = create$1("div", className);
          },
          _updateLayout: function() {
          },
          _adjustPan: function() {
          },
          _setPosition: function(pos) {
            var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
            if (direction === "top") {
              subX = tooltipWidth / 2;
              subY = tooltipHeight;
            } else if (direction === "bottom") {
              subX = tooltipWidth / 2;
              subY = 0;
            } else if (direction === "center") {
              subX = tooltipWidth / 2;
              subY = tooltipHeight / 2;
            } else if (direction === "right") {
              subX = 0;
              subY = tooltipHeight / 2;
            } else if (direction === "left") {
              subX = tooltipWidth;
              subY = tooltipHeight / 2;
            } else if (tooltipPoint.x < centerPoint.x) {
              direction = "right";
              subX = 0;
              subY = tooltipHeight / 2;
            } else {
              direction = "left";
              subX = tooltipWidth + (offset.x + anchor.x) * 2;
              subY = tooltipHeight / 2;
            }
            pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
            removeClass(container, "leaflet-tooltip-right");
            removeClass(container, "leaflet-tooltip-left");
            removeClass(container, "leaflet-tooltip-top");
            removeClass(container, "leaflet-tooltip-bottom");
            addClass(container, "leaflet-tooltip-" + direction);
            setPosition(container, pos);
          },
          _updatePosition: function() {
            var pos = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(pos);
          },
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._container) {
              setOpacity(this._container, opacity);
            }
          },
          _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
            this._setPosition(pos);
          },
          _getAnchor: function() {
            return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
          }
        });
        var tooltip = function(options, source) {
          return new Tooltip(options, source);
        };
        Map.include({
          openTooltip: function(tooltip2, latlng, options) {
            if (!(tooltip2 instanceof Tooltip)) {
              tooltip2 = new Tooltip(options).setContent(tooltip2);
            }
            if (latlng) {
              tooltip2.setLatLng(latlng);
            }
            if (this.hasLayer(tooltip2)) {
              return this;
            }
            return this.addLayer(tooltip2);
          },
          closeTooltip: function(tooltip2) {
            if (tooltip2) {
              this.removeLayer(tooltip2);
            }
            return this;
          }
        });
        Layer.include({
          bindTooltip: function(content, options) {
            if (content instanceof Tooltip) {
              setOptions(content, options);
              this._tooltip = content;
              content._source = this;
            } else {
              if (!this._tooltip || options) {
                this._tooltip = new Tooltip(options, this);
              }
              this._tooltip.setContent(content);
            }
            this._initTooltipInteractions();
            if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
              this.openTooltip();
            }
            return this;
          },
          unbindTooltip: function() {
            if (this._tooltip) {
              this._initTooltipInteractions(true);
              this.closeTooltip();
              this._tooltip = null;
            }
            return this;
          },
          _initTooltipInteractions: function(remove$$1) {
            if (!remove$$1 && this._tooltipHandlersAdded) {
              return;
            }
            var onOff = remove$$1 ? "off" : "on", events = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            if (!this._tooltip.options.permanent) {
              events.mouseover = this._openTooltip;
              events.mouseout = this.closeTooltip;
              if (this._tooltip.options.sticky) {
                events.mousemove = this._moveTooltip;
              }
              if (touch) {
                events.click = this._openTooltip;
              }
            } else {
              events.add = this._openTooltip;
            }
            this[onOff](events);
            this._tooltipHandlersAdded = !remove$$1;
          },
          openTooltip: function(layer, latlng) {
            if (this._tooltip && this._map) {
              latlng = this._tooltip._prepareOpen(this, layer, latlng);
              this._map.openTooltip(this._tooltip, latlng);
              if (this._tooltip.options.interactive && this._tooltip._container) {
                addClass(this._tooltip._container, "leaflet-clickable");
                this.addInteractiveTarget(this._tooltip._container);
              }
            }
            return this;
          },
          closeTooltip: function() {
            if (this._tooltip) {
              this._tooltip._close();
              if (this._tooltip.options.interactive && this._tooltip._container) {
                removeClass(this._tooltip._container, "leaflet-clickable");
                this.removeInteractiveTarget(this._tooltip._container);
              }
            }
            return this;
          },
          toggleTooltip: function(target) {
            if (this._tooltip) {
              if (this._tooltip._map) {
                this.closeTooltip();
              } else {
                this.openTooltip(target);
              }
            }
            return this;
          },
          isTooltipOpen: function() {
            return this._tooltip.isOpen();
          },
          setTooltipContent: function(content) {
            if (this._tooltip) {
              this._tooltip.setContent(content);
            }
            return this;
          },
          getTooltip: function() {
            return this._tooltip;
          },
          _openTooltip: function(e) {
            var layer = e.layer || e.target;
            if (!this._tooltip || !this._map) {
              return;
            }
            this.openTooltip(layer, this._tooltip.options.sticky ? e.latlng : void 0);
          },
          _moveTooltip: function(e) {
            var latlng = e.latlng, containerPoint, layerPoint;
            if (this._tooltip.options.sticky && e.originalEvent) {
              containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
              layerPoint = this._map.containerPointToLayerPoint(containerPoint);
              latlng = this._map.layerPointToLatLng(layerPoint);
            }
            this._tooltip.setLatLng(latlng);
          }
        });
        var DivIcon = Icon.extend({
          options: {
            iconSize: [12, 12],
            html: false,
            bgPos: null,
            className: "leaflet-div-icon"
          },
          createIcon: function(oldIcon) {
            var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
            if (options.html instanceof Element) {
              empty(div);
              div.appendChild(options.html);
            } else {
              div.innerHTML = options.html !== false ? options.html : "";
            }
            if (options.bgPos) {
              var bgPos = toPoint(options.bgPos);
              div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
            }
            this._setIconStyles(div, "icon");
            return div;
          },
          createShadow: function() {
            return null;
          }
        });
        function divIcon(options) {
          return new DivIcon(options);
        }
        Icon.Default = IconDefault;
        var GridLayer = Layer.extend({
          options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: mobile,
            updateWhenZooming: true,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: void 0,
            maxNativeZoom: void 0,
            minNativeZoom: void 0,
            noWrap: false,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          onAdd: function() {
            this._initContainer();
            this._levels = {};
            this._tiles = {};
            this._resetView();
            this._update();
          },
          beforeAdd: function(map) {
            map._addZoomLimit(this);
          },
          onRemove: function(map) {
            this._removeAllTiles();
            remove(this._container);
            map._removeZoomLimit(this);
            this._container = null;
            this._tileZoom = void 0;
          },
          bringToFront: function() {
            if (this._map) {
              toFront(this._container);
              this._setAutoZIndex(Math.max);
            }
            return this;
          },
          bringToBack: function() {
            if (this._map) {
              toBack(this._container);
              this._setAutoZIndex(Math.min);
            }
            return this;
          },
          getContainer: function() {
            return this._container;
          },
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            this._updateOpacity();
            return this;
          },
          setZIndex: function(zIndex) {
            this.options.zIndex = zIndex;
            this._updateZIndex();
            return this;
          },
          isLoading: function() {
            return this._loading;
          },
          redraw: function() {
            if (this._map) {
              this._removeAllTiles();
              this._update();
            }
            return this;
          },
          getEvents: function() {
            var events = {
              viewprereset: this._invalidateAll,
              viewreset: this._resetView,
              zoom: this._resetView,
              moveend: this._onMoveEnd
            };
            if (!this.options.updateWhenIdle) {
              if (!this._onMove) {
                this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
              }
              events.move = this._onMove;
            }
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          createTile: function() {
            return document.createElement("div");
          },
          getTileSize: function() {
            var s = this.options.tileSize;
            return s instanceof Point ? s : new Point(s, s);
          },
          _updateZIndex: function() {
            if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
              this._container.style.zIndex = this.options.zIndex;
            }
          },
          _setAutoZIndex: function(compare) {
            var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
            for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
              zIndex = layers2[i].style.zIndex;
              if (layers2[i] !== this._container && zIndex) {
                edgeZIndex = compare(edgeZIndex, +zIndex);
              }
            }
            if (isFinite(edgeZIndex)) {
              this.options.zIndex = edgeZIndex + compare(-1, 1);
              this._updateZIndex();
            }
          },
          _updateOpacity: function() {
            if (!this._map) {
              return;
            }
            if (ielt9) {
              return;
            }
            setOpacity(this._container, this.options.opacity);
            var now = +new Date(), nextFrame = false, willPrune = false;
            for (var key in this._tiles) {
              var tile = this._tiles[key];
              if (!tile.current || !tile.loaded) {
                continue;
              }
              var fade = Math.min(1, (now - tile.loaded) / 200);
              setOpacity(tile.el, fade);
              if (fade < 1) {
                nextFrame = true;
              } else {
                if (tile.active) {
                  willPrune = true;
                } else {
                  this._onOpaqueTile(tile);
                }
                tile.active = true;
              }
            }
            if (willPrune && !this._noPrune) {
              this._pruneTiles();
            }
            if (nextFrame) {
              cancelAnimFrame(this._fadeFrame);
              this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
            }
          },
          _onOpaqueTile: falseFn,
          _initContainer: function() {
            if (this._container) {
              return;
            }
            this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
            this._updateZIndex();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
            this.getPane().appendChild(this._container);
          },
          _updateLevels: function() {
            var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
            if (zoom2 === void 0) {
              return void 0;
            }
            for (var z in this._levels) {
              z = Number(z);
              if (this._levels[z].el.children.length || z === zoom2) {
                this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
                this._onUpdateLevel(z);
              } else {
                remove(this._levels[z].el);
                this._removeTilesAtZoom(z);
                this._onRemoveLevel(z);
                delete this._levels[z];
              }
            }
            var level = this._levels[zoom2], map = this._map;
            if (!level) {
              level = this._levels[zoom2] = {};
              level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
              level.el.style.zIndex = maxZoom;
              level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom2).round();
              level.zoom = zoom2;
              this._setZoomTransform(level, map.getCenter(), map.getZoom());
              falseFn(level.el.offsetWidth);
              this._onCreateLevel(level);
            }
            this._level = level;
            return level;
          },
          _onUpdateLevel: falseFn,
          _onRemoveLevel: falseFn,
          _onCreateLevel: falseFn,
          _pruneTiles: function() {
            if (!this._map) {
              return;
            }
            var key, tile;
            var zoom2 = this._map.getZoom();
            if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (key in this._tiles) {
              tile = this._tiles[key];
              tile.retain = tile.current;
            }
            for (key in this._tiles) {
              tile = this._tiles[key];
              if (tile.current && !tile.active) {
                var coords = tile.coords;
                if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                  this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
              }
            }
            for (key in this._tiles) {
              if (!this._tiles[key].retain) {
                this._removeTile(key);
              }
            }
          },
          _removeTilesAtZoom: function(zoom2) {
            for (var key in this._tiles) {
              if (this._tiles[key].coords.z !== zoom2) {
                continue;
              }
              this._removeTile(key);
            }
          },
          _removeAllTiles: function() {
            for (var key in this._tiles) {
              this._removeTile(key);
            }
          },
          _invalidateAll: function() {
            for (var z in this._levels) {
              remove(this._levels[z].el);
              this._onRemoveLevel(Number(z));
              delete this._levels[z];
            }
            this._removeAllTiles();
            this._tileZoom = void 0;
          },
          _retainParent: function(x, y, z, minZoom) {
            var x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point(+x2, +y2);
            coords2.z = +z2;
            var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
            if (tile && tile.active) {
              tile.retain = true;
              return true;
            } else if (tile && tile.loaded) {
              tile.retain = true;
            }
            if (z2 > minZoom) {
              return this._retainParent(x2, y2, z2, minZoom);
            }
            return false;
          },
          _retainChildren: function(x, y, z, maxZoom) {
            for (var i = 2 * x; i < 2 * x + 2; i++) {
              for (var j = 2 * y; j < 2 * y + 2; j++) {
                var coords = new Point(i, j);
                coords.z = z + 1;
                var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
                if (tile && tile.active) {
                  tile.retain = true;
                  continue;
                } else if (tile && tile.loaded) {
                  tile.retain = true;
                }
                if (z + 1 < maxZoom) {
                  this._retainChildren(i, j, z + 1, maxZoom);
                }
              }
            }
          },
          _resetView: function(e) {
            var animating = e && (e.pinch || e.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
          },
          _animateZoom: function(e) {
            this._setView(e.center, e.zoom, true, e.noUpdate);
          },
          _clampZoom: function(zoom2) {
            var options = this.options;
            if (options.minNativeZoom !== void 0 && zoom2 < options.minNativeZoom) {
              return options.minNativeZoom;
            }
            if (options.maxNativeZoom !== void 0 && options.maxNativeZoom < zoom2) {
              return options.maxNativeZoom;
            }
            return zoom2;
          },
          _setView: function(center, zoom2, noPrune, noUpdate) {
            var tileZoom = Math.round(zoom2);
            if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
              tileZoom = void 0;
            } else {
              tileZoom = this._clampZoom(tileZoom);
            }
            var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
            if (!noUpdate || tileZoomChanged) {
              this._tileZoom = tileZoom;
              if (this._abortLoading) {
                this._abortLoading();
              }
              this._updateLevels();
              this._resetGrid();
              if (tileZoom !== void 0) {
                this._update(center);
              }
              if (!noPrune) {
                this._pruneTiles();
              }
              this._noPrune = !!noPrune;
            }
            this._setZoomTransforms(center, zoom2);
          },
          _setZoomTransforms: function(center, zoom2) {
            for (var i in this._levels) {
              this._setZoomTransform(this._levels[i], center, zoom2);
            }
          },
          _setZoomTransform: function(level, center, zoom2) {
            var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
            if (any3d) {
              setTransform(level.el, translate, scale2);
            } else {
              setPosition(level.el, translate);
            }
          },
          _resetGrid: function() {
            var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
            var bounds = this._map.getPixelWorldBounds(this._tileZoom);
            if (bounds) {
              this._globalTileRange = this._pxBoundsToTileRange(bounds);
            }
            this._wrapX = crs.wrapLng && !this.options.noWrap && [
              Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
              Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
            ];
            this._wrapY = crs.wrapLat && !this.options.noWrap && [
              Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
              Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
            ];
          },
          _onMoveEnd: function() {
            if (!this._map || this._map._animatingZoom) {
              return;
            }
            this._update();
          },
          _getTiledPixelBounds: function(center) {
            var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale2 = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale2 * 2);
            return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
          },
          _update: function(center) {
            var map = this._map;
            if (!map) {
              return;
            }
            var zoom2 = this._clampZoom(map.getZoom());
            if (center === void 0) {
              center = map.getCenter();
            }
            if (this._tileZoom === void 0) {
              return;
            }
            var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]), tileRange.getTopRight().add([margin, -margin]));
            if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
              throw new Error("Attempted to load an infinite number of tiles");
            }
            for (var key in this._tiles) {
              var c = this._tiles[key].coords;
              if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
                this._tiles[key].current = false;
              }
            }
            if (Math.abs(zoom2 - this._tileZoom) > 1) {
              this._setView(center, zoom2);
              return;
            }
            for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
              for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                var coords = new Point(i, j);
                coords.z = this._tileZoom;
                if (!this._isValidTile(coords)) {
                  continue;
                }
                var tile = this._tiles[this._tileCoordsToKey(coords)];
                if (tile) {
                  tile.current = true;
                } else {
                  queue.push(coords);
                }
              }
            }
            queue.sort(function(a, b) {
              return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
            });
            if (queue.length !== 0) {
              if (!this._loading) {
                this._loading = true;
                this.fire("loading");
              }
              var fragment = document.createDocumentFragment();
              for (i = 0; i < queue.length; i++) {
                this._addTile(queue[i], fragment);
              }
              this._level.el.appendChild(fragment);
            }
          },
          _isValidTile: function(coords) {
            var crs = this._map.options.crs;
            if (!crs.infinite) {
              var bounds = this._globalTileRange;
              if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
                return false;
              }
            }
            if (!this.options.bounds) {
              return true;
            }
            var tileBounds = this._tileCoordsToBounds(coords);
            return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
          },
          _keyToBounds: function(key) {
            return this._tileCoordsToBounds(this._keyToTileCoords(key));
          },
          _tileCoordsToNwSe: function(coords) {
            var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.unproject(nwPoint, coords.z), se = map.unproject(sePoint, coords.z);
            return [nw, se];
          },
          _tileCoordsToBounds: function(coords) {
            var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
            if (!this.options.noWrap) {
              bounds = this._map.wrapLatLngBounds(bounds);
            }
            return bounds;
          },
          _tileCoordsToKey: function(coords) {
            return coords.x + ":" + coords.y + ":" + coords.z;
          },
          _keyToTileCoords: function(key) {
            var k = key.split(":"), coords = new Point(+k[0], +k[1]);
            coords.z = +k[2];
            return coords;
          },
          _removeTile: function(key) {
            var tile = this._tiles[key];
            if (!tile) {
              return;
            }
            remove(tile.el);
            delete this._tiles[key];
            this.fire("tileunload", {
              tile: tile.el,
              coords: this._keyToTileCoords(key)
            });
          },
          _initTile: function(tile) {
            addClass(tile, "leaflet-tile");
            var tileSize = this.getTileSize();
            tile.style.width = tileSize.x + "px";
            tile.style.height = tileSize.y + "px";
            tile.onselectstart = falseFn;
            tile.onmousemove = falseFn;
            if (ielt9 && this.options.opacity < 1) {
              setOpacity(tile, this.options.opacity);
            }
            if (android && !android23) {
              tile.style.WebkitBackfaceVisibility = "hidden";
            }
          },
          _addTile: function(coords, container) {
            var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
            var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
            this._initTile(tile);
            if (this.createTile.length < 2) {
              requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
            }
            setPosition(tile, tilePos);
            this._tiles[key] = {
              el: tile,
              coords,
              current: true
            };
            container.appendChild(tile);
            this.fire("tileloadstart", {
              tile,
              coords
            });
          },
          _tileReady: function(coords, err, tile) {
            if (err) {
              this.fire("tileerror", {
                error: err,
                tile,
                coords
              });
            }
            var key = this._tileCoordsToKey(coords);
            tile = this._tiles[key];
            if (!tile) {
              return;
            }
            tile.loaded = +new Date();
            if (this._map._fadeAnimated) {
              setOpacity(tile.el, 0);
              cancelAnimFrame(this._fadeFrame);
              this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
            } else {
              tile.active = true;
              this._pruneTiles();
            }
            if (!err) {
              addClass(tile.el, "leaflet-tile-loaded");
              this.fire("tileload", {
                tile: tile.el,
                coords
              });
            }
            if (this._noTilesToLoad()) {
              this._loading = false;
              this.fire("load");
              if (ielt9 || !this._map._fadeAnimated) {
                requestAnimFrame(this._pruneTiles, this);
              } else {
                setTimeout(bind(this._pruneTiles, this), 250);
              }
            }
          },
          _getTilePos: function(coords) {
            return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
          },
          _wrapCoords: function(coords) {
            var newCoords = new Point(this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x, this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
            newCoords.z = coords.z;
            return newCoords;
          },
          _pxBoundsToTileRange: function(bounds) {
            var tileSize = this.getTileSize();
            return new Bounds(bounds.min.unscaleBy(tileSize).floor(), bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
          },
          _noTilesToLoad: function() {
            for (var key in this._tiles) {
              if (!this._tiles[key].loaded) {
                return false;
              }
            }
            return true;
          }
        });
        function gridLayer(options) {
          return new GridLayer(options);
        }
        var TileLayer = GridLayer.extend({
          options: {
            minZoom: 0,
            maxZoom: 18,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: false,
            zoomReverse: false,
            detectRetina: false,
            crossOrigin: false
          },
          initialize: function(url, options) {
            this._url = url;
            options = setOptions(this, options);
            if (options.detectRetina && retina && options.maxZoom > 0) {
              options.tileSize = Math.floor(options.tileSize / 2);
              if (!options.zoomReverse) {
                options.zoomOffset++;
                options.maxZoom--;
              } else {
                options.zoomOffset--;
                options.minZoom++;
              }
              options.minZoom = Math.max(0, options.minZoom);
            }
            if (typeof options.subdomains === "string") {
              options.subdomains = options.subdomains.split("");
            }
            if (!android) {
              this.on("tileunload", this._onTileRemove);
            }
          },
          setUrl: function(url, noRedraw) {
            if (this._url === url && noRedraw === void 0) {
              noRedraw = true;
            }
            this._url = url;
            if (!noRedraw) {
              this.redraw();
            }
            return this;
          },
          createTile: function(coords, done) {
            var tile = document.createElement("img");
            on(tile, "load", bind(this._tileOnLoad, this, done, tile));
            on(tile, "error", bind(this._tileOnError, this, done, tile));
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            tile.alt = "";
            tile.setAttribute("role", "presentation");
            tile.src = this.getTileUrl(coords);
            return tile;
          },
          getTileUrl: function(coords) {
            var data = {
              r: retina ? "@2x" : "",
              s: this._getSubdomain(coords),
              x: coords.x,
              y: coords.y,
              z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
              var invertedY = this._globalTileRange.max.y - coords.y;
              if (this.options.tms) {
                data["y"] = invertedY;
              }
              data["-y"] = invertedY;
            }
            return template(this._url, extend(data, this.options));
          },
          _tileOnLoad: function(done, tile) {
            if (ielt9) {
              setTimeout(bind(done, this, null, tile), 0);
            } else {
              done(null, tile);
            }
          },
          _tileOnError: function(done, tile, e) {
            var errorUrl = this.options.errorTileUrl;
            if (errorUrl && tile.getAttribute("src") !== errorUrl) {
              tile.src = errorUrl;
            }
            done(e, tile);
          },
          _onTileRemove: function(e) {
            e.tile.onload = null;
          },
          _getZoomForUrl: function() {
            var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
            if (zoomReverse) {
              zoom2 = maxZoom - zoom2;
            }
            return zoom2 + zoomOffset;
          },
          _getSubdomain: function(tilePoint) {
            var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
            return this.options.subdomains[index2];
          },
          _abortLoading: function() {
            var i, tile;
            for (i in this._tiles) {
              if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;
                tile.onload = falseFn;
                tile.onerror = falseFn;
                if (!tile.complete) {
                  tile.src = emptyImageUrl;
                  remove(tile);
                  delete this._tiles[i];
                }
              }
            }
          },
          _removeTile: function(key) {
            var tile = this._tiles[key];
            if (!tile) {
              return;
            }
            if (!androidStock) {
              tile.el.setAttribute("src", emptyImageUrl);
            }
            return GridLayer.prototype._removeTile.call(this, key);
          },
          _tileReady: function(coords, err, tile) {
            if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
              return;
            }
            return GridLayer.prototype._tileReady.call(this, coords, err, tile);
          }
        });
        function tileLayer(url, options) {
          return new TileLayer(url, options);
        }
        var TileLayerWMS = TileLayer.extend({
          defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: false,
            version: "1.1.1"
          },
          options: {
            crs: null,
            uppercase: false
          },
          initialize: function(url, options) {
            this._url = url;
            var wmsParams = extend({}, this.defaultWmsParams);
            for (var i in options) {
              if (!(i in this.options)) {
                wmsParams[i] = options[i];
              }
            }
            options = setOptions(this, options);
            var realRetina = options.detectRetina && retina ? 2 : 1;
            var tileSize = this.getTileSize();
            wmsParams.width = tileSize.x * realRetina;
            wmsParams.height = tileSize.y * realRetina;
            this.wmsParams = wmsParams;
          },
          onAdd: function(map) {
            this._crs = this.options.crs || map.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[projectionKey] = this._crs.code;
            TileLayer.prototype.onAdd.call(this, map);
          },
          getTileUrl: function(coords) {
            var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
            return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
          },
          setParams: function(params, noRedraw) {
            extend(this.wmsParams, params);
            if (!noRedraw) {
              this.redraw();
            }
            return this;
          }
        });
        function tileLayerWMS(url, options) {
          return new TileLayerWMS(url, options);
        }
        TileLayer.WMS = TileLayerWMS;
        tileLayer.wms = tileLayerWMS;
        var Renderer = Layer.extend({
          options: {
            padding: 0.1,
            tolerance: 0
          },
          initialize: function(options) {
            setOptions(this, options);
            stamp(this);
            this._layers = this._layers || {};
          },
          onAdd: function() {
            if (!this._container) {
              this._initContainer();
              if (this._zoomAnimated) {
                addClass(this._container, "leaflet-zoom-animated");
              }
            }
            this.getPane().appendChild(this._container);
            this._update();
            this.on("update", this._updatePaths, this);
          },
          onRemove: function() {
            this.off("update", this._updatePaths, this);
            this._destroyContainer();
          },
          getEvents: function() {
            var events = {
              viewreset: this._reset,
              zoom: this._onZoom,
              moveend: this._update,
              zoomend: this._onZoomEnd
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._onAnimZoom;
            }
            return events;
          },
          _onAnimZoom: function(ev) {
            this._updateTransform(ev.center, ev.zoom);
          },
          _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom());
          },
          _updateTransform: function(center, zoom2) {
            var scale2 = this._map.getZoomScale(zoom2, this._zoom), position = getPosition(this._container), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), destCenterPoint = this._map.project(center, zoom2), centerOffset = destCenterPoint.subtract(currentCenterPoint), topLeftOffset = viewHalf.multiplyBy(-scale2).add(position).add(viewHalf).subtract(centerOffset);
            if (any3d) {
              setTransform(this._container, topLeftOffset, scale2);
            } else {
              setPosition(this._container, topLeftOffset);
            }
          },
          _reset: function() {
            this._update();
            this._updateTransform(this._center, this._zoom);
            for (var id in this._layers) {
              this._layers[id]._reset();
            }
          },
          _onZoomEnd: function() {
            for (var id in this._layers) {
              this._layers[id]._project();
            }
          },
          _updatePaths: function() {
            for (var id in this._layers) {
              this._layers[id]._update();
            }
          },
          _update: function() {
            var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
            this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
            this._center = this._map.getCenter();
            this._zoom = this._map.getZoom();
          }
        });
        var Canvas = Renderer.extend({
          getEvents: function() {
            var events = Renderer.prototype.getEvents.call(this);
            events.viewprereset = this._onViewPreReset;
            return events;
          },
          _onViewPreReset: function() {
            this._postponeUpdatePaths = true;
          },
          onAdd: function() {
            Renderer.prototype.onAdd.call(this);
            this._draw();
          },
          _initContainer: function() {
            var container = this._container = document.createElement("canvas");
            on(container, "mousemove", this._onMouseMove, this);
            on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
            on(container, "mouseout", this._handleMouseOut, this);
            this._ctx = container.getContext("2d");
          },
          _destroyContainer: function() {
            cancelAnimFrame(this._redrawRequest);
            delete this._ctx;
            remove(this._container);
            off(this._container);
            delete this._container;
          },
          _updatePaths: function() {
            if (this._postponeUpdatePaths) {
              return;
            }
            var layer;
            this._redrawBounds = null;
            for (var id in this._layers) {
              layer = this._layers[id];
              layer._update();
            }
            this._redraw();
          },
          _update: function() {
            if (this._map._animatingZoom && this._bounds) {
              return;
            }
            Renderer.prototype._update.call(this);
            var b = this._bounds, container = this._container, size = b.getSize(), m = retina ? 2 : 1;
            setPosition(container, b.min);
            container.width = m * size.x;
            container.height = m * size.y;
            container.style.width = size.x + "px";
            container.style.height = size.y + "px";
            if (retina) {
              this._ctx.scale(2, 2);
            }
            this._ctx.translate(-b.min.x, -b.min.y);
            this.fire("update");
          },
          _reset: function() {
            Renderer.prototype._reset.call(this);
            if (this._postponeUpdatePaths) {
              this._postponeUpdatePaths = false;
              this._updatePaths();
            }
          },
          _initPath: function(layer) {
            this._updateDashArray(layer);
            this._layers[stamp(layer)] = layer;
            var order = layer._order = {
              layer,
              prev: this._drawLast,
              next: null
            };
            if (this._drawLast) {
              this._drawLast.next = order;
            }
            this._drawLast = order;
            this._drawFirst = this._drawFirst || this._drawLast;
          },
          _addPath: function(layer) {
            this._requestRedraw(layer);
          },
          _removePath: function(layer) {
            var order = layer._order;
            var next = order.next;
            var prev = order.prev;
            if (next) {
              next.prev = prev;
            } else {
              this._drawLast = prev;
            }
            if (prev) {
              prev.next = next;
            } else {
              this._drawFirst = next;
            }
            delete layer._order;
            delete this._layers[stamp(layer)];
            this._requestRedraw(layer);
          },
          _updatePath: function(layer) {
            this._extendRedrawBounds(layer);
            layer._project();
            layer._update();
            this._requestRedraw(layer);
          },
          _updateStyle: function(layer) {
            this._updateDashArray(layer);
            this._requestRedraw(layer);
          },
          _updateDashArray: function(layer) {
            if (typeof layer.options.dashArray === "string") {
              var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
              for (i = 0; i < parts.length; i++) {
                dashValue = Number(parts[i]);
                if (isNaN(dashValue)) {
                  return;
                }
                dashArray.push(dashValue);
              }
              layer.options._dashArray = dashArray;
            } else {
              layer.options._dashArray = layer.options.dashArray;
            }
          },
          _requestRedraw: function(layer) {
            if (!this._map) {
              return;
            }
            this._extendRedrawBounds(layer);
            this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
          },
          _extendRedrawBounds: function(layer) {
            if (layer._pxBounds) {
              var padding = (layer.options.weight || 0) + 1;
              this._redrawBounds = this._redrawBounds || new Bounds();
              this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
              this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
            }
          },
          _redraw: function() {
            this._redrawRequest = null;
            if (this._redrawBounds) {
              this._redrawBounds.min._floor();
              this._redrawBounds.max._ceil();
            }
            this._clear();
            this._draw();
            this._redrawBounds = null;
          },
          _clear: function() {
            var bounds = this._redrawBounds;
            if (bounds) {
              var size = bounds.getSize();
              this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
            } else {
              this._ctx.save();
              this._ctx.setTransform(1, 0, 0, 1, 0, 0);
              this._ctx.clearRect(0, 0, this._container.width, this._container.height);
              this._ctx.restore();
            }
          },
          _draw: function() {
            var layer, bounds = this._redrawBounds;
            this._ctx.save();
            if (bounds) {
              var size = bounds.getSize();
              this._ctx.beginPath();
              this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
              this._ctx.clip();
            }
            this._drawing = true;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
                layer._updatePath();
              }
            }
            this._drawing = false;
            this._ctx.restore();
          },
          _updatePoly: function(layer, closed) {
            if (!this._drawing) {
              return;
            }
            var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
            if (!len) {
              return;
            }
            ctx.beginPath();
            for (i = 0; i < len; i++) {
              for (j = 0, len2 = parts[i].length; j < len2; j++) {
                p = parts[i][j];
                ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
              }
              if (closed) {
                ctx.closePath();
              }
            }
            this._fillStroke(ctx, layer);
          },
          _updateCircle: function(layer) {
            if (!this._drawing || layer._empty()) {
              return;
            }
            var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
            if (s !== 1) {
              ctx.save();
              ctx.scale(1, s);
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
            if (s !== 1) {
              ctx.restore();
            }
            this._fillStroke(ctx, layer);
          },
          _fillStroke: function(ctx, layer) {
            var options = layer.options;
            if (options.fill) {
              ctx.globalAlpha = options.fillOpacity;
              ctx.fillStyle = options.fillColor || options.color;
              ctx.fill(options.fillRule || "evenodd");
            }
            if (options.stroke && options.weight !== 0) {
              if (ctx.setLineDash) {
                ctx.setLineDash(layer.options && layer.options._dashArray || []);
              }
              ctx.globalAlpha = options.opacity;
              ctx.lineWidth = options.weight;
              ctx.strokeStyle = options.color;
              ctx.lineCap = options.lineCap;
              ctx.lineJoin = options.lineJoin;
              ctx.stroke();
            }
          },
          _onClick: function(e) {
            var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (layer.options.interactive && layer._containsPoint(point)) {
                if (!(e.type === "click" || e.type !== "preclick") || !this._map._draggableMoved(layer)) {
                  clickedLayer = layer;
                }
              }
            }
            if (clickedLayer) {
              fakeStop(e);
              this._fireEvent([clickedLayer], e);
            }
          },
          _onMouseMove: function(e) {
            if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
              return;
            }
            var point = this._map.mouseEventToLayerPoint(e);
            this._handleMouseHover(e, point);
          },
          _handleMouseOut: function(e) {
            var layer = this._hoveredLayer;
            if (layer) {
              removeClass(this._container, "leaflet-interactive");
              this._fireEvent([layer], e, "mouseout");
              this._hoveredLayer = null;
              this._mouseHoverThrottled = false;
            }
          },
          _handleMouseHover: function(e, point) {
            if (this._mouseHoverThrottled) {
              return;
            }
            var layer, candidateHoveredLayer;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (layer.options.interactive && layer._containsPoint(point)) {
                candidateHoveredLayer = layer;
              }
            }
            if (candidateHoveredLayer !== this._hoveredLayer) {
              this._handleMouseOut(e);
              if (candidateHoveredLayer) {
                addClass(this._container, "leaflet-interactive");
                this._fireEvent([candidateHoveredLayer], e, "mouseover");
                this._hoveredLayer = candidateHoveredLayer;
              }
            }
            if (this._hoveredLayer) {
              this._fireEvent([this._hoveredLayer], e);
            }
            this._mouseHoverThrottled = true;
            setTimeout(bind(function() {
              this._mouseHoverThrottled = false;
            }, this), 32);
          },
          _fireEvent: function(layers2, e, type) {
            this._map._fireDOMEvent(e, type || e.type, layers2);
          },
          _bringToFront: function(layer) {
            var order = layer._order;
            if (!order) {
              return;
            }
            var next = order.next;
            var prev = order.prev;
            if (next) {
              next.prev = prev;
            } else {
              return;
            }
            if (prev) {
              prev.next = next;
            } else if (next) {
              this._drawFirst = next;
            }
            order.prev = this._drawLast;
            this._drawLast.next = order;
            order.next = null;
            this._drawLast = order;
            this._requestRedraw(layer);
          },
          _bringToBack: function(layer) {
            var order = layer._order;
            if (!order) {
              return;
            }
            var next = order.next;
            var prev = order.prev;
            if (prev) {
              prev.next = next;
            } else {
              return;
            }
            if (next) {
              next.prev = prev;
            } else if (prev) {
              this._drawLast = prev;
            }
            order.prev = null;
            order.next = this._drawFirst;
            this._drawFirst.prev = order;
            this._drawFirst = order;
            this._requestRedraw(layer);
          }
        });
        function canvas$1(options) {
          return canvas ? new Canvas(options) : null;
        }
        var vmlCreate = function() {
          try {
            document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
            return function(name) {
              return document.createElement("<lvml:" + name + ' class="lvml">');
            };
          } catch (e) {
            return function(name) {
              return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
            };
          }
        }();
        var vmlMixin = {
          _initContainer: function() {
            this._container = create$1("div", "leaflet-vml-container");
          },
          _update: function() {
            if (this._map._animatingZoom) {
              return;
            }
            Renderer.prototype._update.call(this);
            this.fire("update");
          },
          _initPath: function(layer) {
            var container = layer._container = vmlCreate("shape");
            addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
            container.coordsize = "1 1";
            layer._path = vmlCreate("path");
            container.appendChild(layer._path);
            this._updateStyle(layer);
            this._layers[stamp(layer)] = layer;
          },
          _addPath: function(layer) {
            var container = layer._container;
            this._container.appendChild(container);
            if (layer.options.interactive) {
              layer.addInteractiveTarget(container);
            }
          },
          _removePath: function(layer) {
            var container = layer._container;
            remove(container);
            layer.removeInteractiveTarget(container);
            delete this._layers[stamp(layer)];
          },
          _updateStyle: function(layer) {
            var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
            container.stroked = !!options.stroke;
            container.filled = !!options.fill;
            if (options.stroke) {
              if (!stroke) {
                stroke = layer._stroke = vmlCreate("stroke");
              }
              container.appendChild(stroke);
              stroke.weight = options.weight + "px";
              stroke.color = options.color;
              stroke.opacity = options.opacity;
              if (options.dashArray) {
                stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
              } else {
                stroke.dashStyle = "";
              }
              stroke.endcap = options.lineCap.replace("butt", "flat");
              stroke.joinstyle = options.lineJoin;
            } else if (stroke) {
              container.removeChild(stroke);
              layer._stroke = null;
            }
            if (options.fill) {
              if (!fill) {
                fill = layer._fill = vmlCreate("fill");
              }
              container.appendChild(fill);
              fill.color = options.fillColor || options.color;
              fill.opacity = options.fillOpacity;
            } else if (fill) {
              container.removeChild(fill);
              layer._fill = null;
            }
          },
          _updateCircle: function(layer) {
            var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
            this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
          },
          _setPath: function(layer, path) {
            layer._path.v = path;
          },
          _bringToFront: function(layer) {
            toFront(layer._container);
          },
          _bringToBack: function(layer) {
            toBack(layer._container);
          }
        };
        var create$2 = vml ? vmlCreate : svgCreate;
        var SVG = Renderer.extend({
          getEvents: function() {
            var events = Renderer.prototype.getEvents.call(this);
            events.zoomstart = this._onZoomStart;
            return events;
          },
          _initContainer: function() {
            this._container = create$2("svg");
            this._container.setAttribute("pointer-events", "none");
            this._rootGroup = create$2("g");
            this._container.appendChild(this._rootGroup);
          },
          _destroyContainer: function() {
            remove(this._container);
            off(this._container);
            delete this._container;
            delete this._rootGroup;
            delete this._svgSize;
          },
          _onZoomStart: function() {
            this._update();
          },
          _update: function() {
            if (this._map._animatingZoom && this._bounds) {
              return;
            }
            Renderer.prototype._update.call(this);
            var b = this._bounds, size = b.getSize(), container = this._container;
            if (!this._svgSize || !this._svgSize.equals(size)) {
              this._svgSize = size;
              container.setAttribute("width", size.x);
              container.setAttribute("height", size.y);
            }
            setPosition(container, b.min);
            container.setAttribute("viewBox", [b.min.x, b.min.y, size.x, size.y].join(" "));
            this.fire("update");
          },
          _initPath: function(layer) {
            var path = layer._path = create$2("path");
            if (layer.options.className) {
              addClass(path, layer.options.className);
            }
            if (layer.options.interactive) {
              addClass(path, "leaflet-interactive");
            }
            this._updateStyle(layer);
            this._layers[stamp(layer)] = layer;
          },
          _addPath: function(layer) {
            if (!this._rootGroup) {
              this._initContainer();
            }
            this._rootGroup.appendChild(layer._path);
            layer.addInteractiveTarget(layer._path);
          },
          _removePath: function(layer) {
            remove(layer._path);
            layer.removeInteractiveTarget(layer._path);
            delete this._layers[stamp(layer)];
          },
          _updatePath: function(layer) {
            layer._project();
            layer._update();
          },
          _updateStyle: function(layer) {
            var path = layer._path, options = layer.options;
            if (!path) {
              return;
            }
            if (options.stroke) {
              path.setAttribute("stroke", options.color);
              path.setAttribute("stroke-opacity", options.opacity);
              path.setAttribute("stroke-width", options.weight);
              path.setAttribute("stroke-linecap", options.lineCap);
              path.setAttribute("stroke-linejoin", options.lineJoin);
              if (options.dashArray) {
                path.setAttribute("stroke-dasharray", options.dashArray);
              } else {
                path.removeAttribute("stroke-dasharray");
              }
              if (options.dashOffset) {
                path.setAttribute("stroke-dashoffset", options.dashOffset);
              } else {
                path.removeAttribute("stroke-dashoffset");
              }
            } else {
              path.setAttribute("stroke", "none");
            }
            if (options.fill) {
              path.setAttribute("fill", options.fillColor || options.color);
              path.setAttribute("fill-opacity", options.fillOpacity);
              path.setAttribute("fill-rule", options.fillRule || "evenodd");
            } else {
              path.setAttribute("fill", "none");
            }
          },
          _updatePoly: function(layer, closed) {
            this._setPath(layer, pointsToPath(layer._parts, closed));
          },
          _updateCircle: function(layer) {
            var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
            var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
            this._setPath(layer, d);
          },
          _setPath: function(layer, path) {
            layer._path.setAttribute("d", path);
          },
          _bringToFront: function(layer) {
            toFront(layer._path);
          },
          _bringToBack: function(layer) {
            toBack(layer._path);
          }
        });
        if (vml) {
          SVG.include(vmlMixin);
        }
        function svg$1(options) {
          return svg || vml ? new SVG(options) : null;
        }
        Map.include({
          getRenderer: function(layer) {
            var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
            if (!renderer) {
              renderer = this._renderer = this._createRenderer();
            }
            if (!this.hasLayer(renderer)) {
              this.addLayer(renderer);
            }
            return renderer;
          },
          _getPaneRenderer: function(name) {
            if (name === "overlayPane" || name === void 0) {
              return false;
            }
            var renderer = this._paneRenderers[name];
            if (renderer === void 0) {
              renderer = this._createRenderer({ pane: name });
              this._paneRenderers[name] = renderer;
            }
            return renderer;
          },
          _createRenderer: function(options) {
            return this.options.preferCanvas && canvas$1(options) || svg$1(options);
          }
        });
        var Rectangle = Polygon.extend({
          initialize: function(latLngBounds, options) {
            Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
          },
          setBounds: function(latLngBounds) {
            return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
          },
          _boundsToLatLngs: function(latLngBounds) {
            latLngBounds = toLatLngBounds(latLngBounds);
            return [
              latLngBounds.getSouthWest(),
              latLngBounds.getNorthWest(),
              latLngBounds.getNorthEast(),
              latLngBounds.getSouthEast()
            ];
          }
        });
        function rectangle(latLngBounds, options) {
          return new Rectangle(latLngBounds, options);
        }
        SVG.create = create$2;
        SVG.pointsToPath = pointsToPath;
        GeoJSON.geometryToLayer = geometryToLayer;
        GeoJSON.coordsToLatLng = coordsToLatLng;
        GeoJSON.coordsToLatLngs = coordsToLatLngs;
        GeoJSON.latLngToCoords = latLngToCoords;
        GeoJSON.latLngsToCoords = latLngsToCoords;
        GeoJSON.getFeature = getFeature;
        GeoJSON.asFeature = asFeature;
        Map.mergeOptions({
          boxZoom: true
        });
        var BoxZoom = Handler.extend({
          initialize: function(map) {
            this._map = map;
            this._container = map._container;
            this._pane = map._panes.overlayPane;
            this._resetStateTimeout = 0;
            map.on("unload", this._destroy, this);
          },
          addHooks: function() {
            on(this._container, "mousedown", this._onMouseDown, this);
          },
          removeHooks: function() {
            off(this._container, "mousedown", this._onMouseDown, this);
          },
          moved: function() {
            return this._moved;
          },
          _destroy: function() {
            remove(this._pane);
            delete this._pane;
          },
          _resetState: function() {
            this._resetStateTimeout = 0;
            this._moved = false;
          },
          _clearDeferredResetState: function() {
            if (this._resetStateTimeout !== 0) {
              clearTimeout(this._resetStateTimeout);
              this._resetStateTimeout = 0;
            }
          },
          _onMouseDown: function(e) {
            if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
              return false;
            }
            this._clearDeferredResetState();
            this._resetState();
            disableTextSelection();
            disableImageDrag();
            this._startPoint = this._map.mouseEventToContainerPoint(e);
            on(document, {
              contextmenu: stop,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseMove: function(e) {
            if (!this._moved) {
              this._moved = true;
              this._box = create$1("div", "leaflet-zoom-box", this._container);
              addClass(this._container, "leaflet-crosshair");
              this._map.fire("boxzoomstart");
            }
            this._point = this._map.mouseEventToContainerPoint(e);
            var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
            setPosition(this._box, bounds.min);
            this._box.style.width = size.x + "px";
            this._box.style.height = size.y + "px";
          },
          _finish: function() {
            if (this._moved) {
              remove(this._box);
              removeClass(this._container, "leaflet-crosshair");
            }
            enableTextSelection();
            enableImageDrag();
            off(document, {
              contextmenu: stop,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseUp: function(e) {
            if (e.which !== 1 && e.button !== 1) {
              return;
            }
            this._finish();
            if (!this._moved) {
              return;
            }
            this._clearDeferredResetState();
            this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
            var bounds = new LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
            this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
          },
          _onKeyDown: function(e) {
            if (e.keyCode === 27) {
              this._finish();
            }
          }
        });
        Map.addInitHook("addHandler", "boxZoom", BoxZoom);
        Map.mergeOptions({
          doubleClickZoom: true
        });
        var DoubleClickZoom = Handler.extend({
          addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this);
          },
          removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this);
          },
          _onDoubleClick: function(e) {
            var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
            if (map.options.doubleClickZoom === "center") {
              map.setZoom(zoom2);
            } else {
              map.setZoomAround(e.containerPoint, zoom2);
            }
          }
        });
        Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
        Map.mergeOptions({
          dragging: true,
          inertia: !android23,
          inertiaDeceleration: 3400,
          inertiaMaxSpeed: Infinity,
          easeLinearity: 0.2,
          worldCopyJump: false,
          maxBoundsViscosity: 0
        });
        var Drag = Handler.extend({
          addHooks: function() {
            if (!this._draggable) {
              var map = this._map;
              this._draggable = new Draggable(map._mapPane, map._container);
              this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
              }, this);
              this._draggable.on("predrag", this._onPreDragLimit, this);
              if (map.options.worldCopyJump) {
                this._draggable.on("predrag", this._onPreDragWrap, this);
                map.on("zoomend", this._onZoomEnd, this);
                map.whenReady(this._onZoomEnd, this);
              }
            }
            addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
            this._draggable.enable();
            this._positions = [];
            this._times = [];
          },
          removeHooks: function() {
            removeClass(this._map._container, "leaflet-grab");
            removeClass(this._map._container, "leaflet-touch-drag");
            this._draggable.disable();
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          moving: function() {
            return this._draggable && this._draggable._moving;
          },
          _onDragStart: function() {
            var map = this._map;
            map._stop();
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
              var bounds = toLatLngBounds(this._map.options.maxBounds);
              this._offsetLimit = toBounds(this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize()));
              this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
            } else {
              this._offsetLimit = null;
            }
            map.fire("movestart").fire("dragstart");
            if (map.options.inertia) {
              this._positions = [];
              this._times = [];
            }
          },
          _onDrag: function(e) {
            if (this._map.options.inertia) {
              var time = this._lastTime = +new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
              this._positions.push(pos);
              this._times.push(time);
              this._prunePositions(time);
            }
            this._map.fire("move", e).fire("drag", e);
          },
          _prunePositions: function(time) {
            while (this._positions.length > 1 && time - this._times[0] > 50) {
              this._positions.shift();
              this._times.shift();
            }
          },
          _onZoomEnd: function() {
            var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
          },
          _viscousLimit: function(value, threshold) {
            return value - (value - threshold) * this._viscosity;
          },
          _onPreDragLimit: function() {
            if (!this._viscosity || !this._offsetLimit) {
              return;
            }
            var offset = this._draggable._newPos.subtract(this._draggable._startPos);
            var limit = this._offsetLimit;
            if (offset.x < limit.min.x) {
              offset.x = this._viscousLimit(offset.x, limit.min.x);
            }
            if (offset.y < limit.min.y) {
              offset.y = this._viscousLimit(offset.y, limit.min.y);
            }
            if (offset.x > limit.max.x) {
              offset.x = this._viscousLimit(offset.x, limit.max.x);
            }
            if (offset.y > limit.max.y) {
              offset.y = this._viscousLimit(offset.y, limit.max.y);
            }
            this._draggable._newPos = this._draggable._startPos.add(offset);
          },
          _onPreDragWrap: function() {
            var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
            this._draggable._absPos = this._draggable._newPos.clone();
            this._draggable._newPos.x = newX;
          },
          _onDragEnd: function(e) {
            var map = this._map, options = map.options, noInertia = !options.inertia || this._times.length < 2;
            map.fire("dragend", e);
            if (noInertia) {
              map.fire("moveend");
            } else {
              this._prunePositions(+new Date());
              var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
              if (!offset.x && !offset.y) {
                map.fire("moveend");
              } else {
                offset = map._limitOffset(offset, map.options.maxBounds);
                requestAnimFrame(function() {
                  map.panBy(offset, {
                    duration: decelerationDuration,
                    easeLinearity: ease,
                    noMoveStart: true,
                    animate: true
                  });
                });
              }
            }
          }
        });
        Map.addInitHook("addHandler", "dragging", Drag);
        Map.mergeOptions({
          keyboard: true,
          keyboardPanDelta: 80
        });
        var Keyboard = Handler.extend({
          keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
          },
          initialize: function(map) {
            this._map = map;
            this._setPanDelta(map.options.keyboardPanDelta);
            this._setZoomDelta(map.options.zoomDelta);
          },
          addHooks: function() {
            var container = this._map._container;
            if (container.tabIndex <= 0) {
              container.tabIndex = "0";
            }
            on(container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this);
            this._map.on({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          removeHooks: function() {
            this._removeHooks();
            off(this._map._container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this);
            this._map.off({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          _onMouseDown: function() {
            if (this._focused) {
              return;
            }
            var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
            this._map._container.focus();
            window.scrollTo(left, top);
          },
          _onFocus: function() {
            this._focused = true;
            this._map.fire("focus");
          },
          _onBlur: function() {
            this._focused = false;
            this._map.fire("blur");
          },
          _setPanDelta: function(panDelta) {
            var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
            for (i = 0, len = codes.left.length; i < len; i++) {
              keys[codes.left[i]] = [-1 * panDelta, 0];
            }
            for (i = 0, len = codes.right.length; i < len; i++) {
              keys[codes.right[i]] = [panDelta, 0];
            }
            for (i = 0, len = codes.down.length; i < len; i++) {
              keys[codes.down[i]] = [0, panDelta];
            }
            for (i = 0, len = codes.up.length; i < len; i++) {
              keys[codes.up[i]] = [0, -1 * panDelta];
            }
          },
          _setZoomDelta: function(zoomDelta) {
            var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
            for (i = 0, len = codes.zoomIn.length; i < len; i++) {
              keys[codes.zoomIn[i]] = zoomDelta;
            }
            for (i = 0, len = codes.zoomOut.length; i < len; i++) {
              keys[codes.zoomOut[i]] = -zoomDelta;
            }
          },
          _addHooks: function() {
            on(document, "keydown", this._onKeyDown, this);
          },
          _removeHooks: function() {
            off(document, "keydown", this._onKeyDown, this);
          },
          _onKeyDown: function(e) {
            if (e.altKey || e.ctrlKey || e.metaKey) {
              return;
            }
            var key = e.keyCode, map = this._map, offset;
            if (key in this._panKeys) {
              if (!map._panAnim || !map._panAnim._inProgress) {
                offset = this._panKeys[key];
                if (e.shiftKey) {
                  offset = toPoint(offset).multiplyBy(3);
                }
                map.panBy(offset);
                if (map.options.maxBounds) {
                  map.panInsideBounds(map.options.maxBounds);
                }
              }
            } else if (key in this._zoomKeys) {
              map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
            } else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
              map.closePopup();
            } else {
              return;
            }
            stop(e);
          }
        });
        Map.addInitHook("addHandler", "keyboard", Keyboard);
        Map.mergeOptions({
          scrollWheelZoom: true,
          wheelDebounceTime: 40,
          wheelPxPerZoomLevel: 60
        });
        var ScrollWheelZoom = Handler.extend({
          addHooks: function() {
            on(this._map._container, "wheel", this._onWheelScroll, this);
            this._delta = 0;
          },
          removeHooks: function() {
            off(this._map._container, "wheel", this._onWheelScroll, this);
          },
          _onWheelScroll: function(e) {
            var delta = getWheelDelta(e);
            var debounce = this._map.options.wheelDebounceTime;
            this._delta += delta;
            this._lastMousePos = this._map.mouseEventToContainerPoint(e);
            if (!this._startTime) {
              this._startTime = +new Date();
            }
            var left = Math.max(debounce - (+new Date() - this._startTime), 0);
            clearTimeout(this._timer);
            this._timer = setTimeout(bind(this._performZoom, this), left);
            stop(e);
          },
          _performZoom: function() {
            var map = this._map, zoom2 = map.getZoom(), snap = this._map.options.zoomSnap || 0;
            map._stop();
            var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
            this._delta = 0;
            this._startTime = null;
            if (!delta) {
              return;
            }
            if (map.options.scrollWheelZoom === "center") {
              map.setZoom(zoom2 + delta);
            } else {
              map.setZoomAround(this._lastMousePos, zoom2 + delta);
            }
          }
        });
        Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
        Map.mergeOptions({
          tap: true,
          tapTolerance: 15
        });
        var Tap = Handler.extend({
          addHooks: function() {
            on(this._map._container, "touchstart", this._onDown, this);
          },
          removeHooks: function() {
            off(this._map._container, "touchstart", this._onDown, this);
          },
          _onDown: function(e) {
            if (!e.touches) {
              return;
            }
            preventDefault(e);
            this._fireClick = true;
            if (e.touches.length > 1) {
              this._fireClick = false;
              clearTimeout(this._holdTimeout);
              return;
            }
            var first = e.touches[0], el = first.target;
            this._startPos = this._newPos = new Point(first.clientX, first.clientY);
            if (el.tagName && el.tagName.toLowerCase() === "a") {
              addClass(el, "leaflet-active");
            }
            this._holdTimeout = setTimeout(bind(function() {
              if (this._isTapValid()) {
                this._fireClick = false;
                this._onUp();
                this._simulateEvent("contextmenu", first);
              }
            }, this), 1e3);
            this._simulateEvent("mousedown", first);
            on(document, {
              touchmove: this._onMove,
              touchend: this._onUp
            }, this);
          },
          _onUp: function(e) {
            clearTimeout(this._holdTimeout);
            off(document, {
              touchmove: this._onMove,
              touchend: this._onUp
            }, this);
            if (this._fireClick && e && e.changedTouches) {
              var first = e.changedTouches[0], el = first.target;
              if (el && el.tagName && el.tagName.toLowerCase() === "a") {
                removeClass(el, "leaflet-active");
              }
              this._simulateEvent("mouseup", first);
              if (this._isTapValid()) {
                this._simulateEvent("click", first);
              }
            }
          },
          _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
          },
          _onMove: function(e) {
            var first = e.touches[0];
            this._newPos = new Point(first.clientX, first.clientY);
            this._simulateEvent("mousemove", first);
          },
          _simulateEvent: function(type, e) {
            var simulatedEvent = document.createEvent("MouseEvents");
            simulatedEvent._simulated = true;
            e.target._simulatedClick = true;
            simulatedEvent.initMouseEvent(type, true, true, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 0, null);
            e.target.dispatchEvent(simulatedEvent);
          }
        });
        if (touch && (!pointer || safari)) {
          Map.addInitHook("addHandler", "tap", Tap);
        }
        Map.mergeOptions({
          touchZoom: touch && !android23,
          bounceAtZoomLimits: true
        });
        var TouchZoom = Handler.extend({
          addHooks: function() {
            addClass(this._map._container, "leaflet-touch-zoom");
            on(this._map._container, "touchstart", this._onTouchStart, this);
          },
          removeHooks: function() {
            removeClass(this._map._container, "leaflet-touch-zoom");
            off(this._map._container, "touchstart", this._onTouchStart, this);
          },
          _onTouchStart: function(e) {
            var map = this._map;
            if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) {
              return;
            }
            var p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]);
            this._centerPoint = map.getSize()._divideBy(2);
            this._startLatLng = map.containerPointToLatLng(this._centerPoint);
            if (map.options.touchZoom !== "center") {
              this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
            }
            this._startDist = p1.distanceTo(p2);
            this._startZoom = map.getZoom();
            this._moved = false;
            this._zooming = true;
            map._stop();
            on(document, "touchmove", this._onTouchMove, this);
            on(document, "touchend", this._onTouchEnd, this);
            preventDefault(e);
          },
          _onTouchMove: function(e) {
            if (!e.touches || e.touches.length !== 2 || !this._zooming) {
              return;
            }
            var map = this._map, p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
            this._zoom = map.getScaleZoom(scale2, this._startZoom);
            if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale2 < 1 || this._zoom > map.getMaxZoom() && scale2 > 1)) {
              this._zoom = map._limitZoom(this._zoom);
            }
            if (map.options.touchZoom === "center") {
              this._center = this._startLatLng;
              if (scale2 === 1) {
                return;
              }
            } else {
              var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
              if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
                return;
              }
              this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
            }
            if (!this._moved) {
              map._moveStart(true, false);
              this._moved = true;
            }
            cancelAnimFrame(this._animRequest);
            var moveFn = bind(map._move, map, this._center, this._zoom, { pinch: true, round: false });
            this._animRequest = requestAnimFrame(moveFn, this, true);
            preventDefault(e);
          },
          _onTouchEnd: function() {
            if (!this._moved || !this._zooming) {
              this._zooming = false;
              return;
            }
            this._zooming = false;
            cancelAnimFrame(this._animRequest);
            off(document, "touchmove", this._onTouchMove, this);
            off(document, "touchend", this._onTouchEnd, this);
            if (this._map.options.zoomAnimation) {
              this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
            } else {
              this._map._resetView(this._center, this._map._limitZoom(this._zoom));
            }
          }
        });
        Map.addInitHook("addHandler", "touchZoom", TouchZoom);
        Map.BoxZoom = BoxZoom;
        Map.DoubleClickZoom = DoubleClickZoom;
        Map.Drag = Drag;
        Map.Keyboard = Keyboard;
        Map.ScrollWheelZoom = ScrollWheelZoom;
        Map.Tap = Tap;
        Map.TouchZoom = TouchZoom;
        exports2.version = version;
        exports2.Control = Control;
        exports2.control = control;
        exports2.Browser = Browser;
        exports2.Evented = Evented;
        exports2.Mixin = Mixin;
        exports2.Util = Util;
        exports2.Class = Class;
        exports2.Handler = Handler;
        exports2.extend = extend;
        exports2.bind = bind;
        exports2.stamp = stamp;
        exports2.setOptions = setOptions;
        exports2.DomEvent = DomEvent;
        exports2.DomUtil = DomUtil;
        exports2.PosAnimation = PosAnimation;
        exports2.Draggable = Draggable;
        exports2.LineUtil = LineUtil;
        exports2.PolyUtil = PolyUtil;
        exports2.Point = Point;
        exports2.point = toPoint;
        exports2.Bounds = Bounds;
        exports2.bounds = toBounds;
        exports2.Transformation = Transformation;
        exports2.transformation = toTransformation;
        exports2.Projection = index;
        exports2.LatLng = LatLng;
        exports2.latLng = toLatLng;
        exports2.LatLngBounds = LatLngBounds;
        exports2.latLngBounds = toLatLngBounds;
        exports2.CRS = CRS;
        exports2.GeoJSON = GeoJSON;
        exports2.geoJSON = geoJSON;
        exports2.geoJson = geoJson;
        exports2.Layer = Layer;
        exports2.LayerGroup = LayerGroup;
        exports2.layerGroup = layerGroup;
        exports2.FeatureGroup = FeatureGroup;
        exports2.featureGroup = featureGroup;
        exports2.ImageOverlay = ImageOverlay;
        exports2.imageOverlay = imageOverlay;
        exports2.VideoOverlay = VideoOverlay;
        exports2.videoOverlay = videoOverlay;
        exports2.SVGOverlay = SVGOverlay;
        exports2.svgOverlay = svgOverlay;
        exports2.DivOverlay = DivOverlay;
        exports2.Popup = Popup;
        exports2.popup = popup;
        exports2.Tooltip = Tooltip;
        exports2.tooltip = tooltip;
        exports2.Icon = Icon;
        exports2.icon = icon;
        exports2.DivIcon = DivIcon;
        exports2.divIcon = divIcon;
        exports2.Marker = Marker;
        exports2.marker = marker;
        exports2.TileLayer = TileLayer;
        exports2.tileLayer = tileLayer;
        exports2.GridLayer = GridLayer;
        exports2.gridLayer = gridLayer;
        exports2.SVG = SVG;
        exports2.svg = svg$1;
        exports2.Renderer = Renderer;
        exports2.Canvas = Canvas;
        exports2.canvas = canvas$1;
        exports2.Path = Path;
        exports2.CircleMarker = CircleMarker;
        exports2.circleMarker = circleMarker;
        exports2.Circle = Circle;
        exports2.circle = circle;
        exports2.Polyline = Polyline;
        exports2.polyline = polyline;
        exports2.Polygon = Polygon;
        exports2.polygon = polygon;
        exports2.Rectangle = Rectangle;
        exports2.rectangle = rectangle;
        exports2.Map = Map;
        exports2.map = createMap;
        var oldL = window.L;
        exports2.noConflict = function() {
          window.L = oldL;
          return this;
        };
        window.L = exports2;
      });
    }
  });

  // ns-hugo:/__w/map-kerala/map-kerala/site/assets/india-boundaries.js
  var require_india_boundaries = __commonJS({
    "ns-hugo:/__w/map-kerala/map-kerala/site/assets/india-boundaries.js"(exports, module) {
      var indiaBoundaryLines = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.7541731, 32.9466018],
                [73.8076029, 32.9423743],
                [73.8313682, 32.9287784]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.6713786, 33.2047351],
                [73.6755463, 33.1954493],
                [73.6629287, 33.1586631],
                [73.6375765, 33.1539475],
                [73.6300569, 33.1355147],
                [73.6355715, 33.1041905],
                [73.6553984, 33.0780875],
                [73.6997514, 33.0736643],
                [73.7346844, 33.064026]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.7511423, 33.0500452],
                [73.7452654, 33.0346563],
                [73.7608652, 33.0167016],
                [73.7602995, 32.9945073],
                [73.784266, 32.9666077],
                [73.7541731, 32.9466018]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.7346844, 33.064026],
                [73.7511423, 33.0500452]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.126488, 35.124629],
                [74.080276, 35.151099],
                [74.044984, 35.141381],
                [73.994706, 35.176384],
                [73.955261, 35.183326],
                [73.930268, 35.20305],
                [73.891099, 35.211663],
                [73.849716, 35.207772],
                [73.804703, 35.236106],
                [73.781098, 35.240546],
                [73.730545, 35.21971],
                [73.721374, 35.229431],
                [73.699706, 35.297219],
                [73.697206, 35.362769],
                [73.709426, 35.413605],
                [73.721923, 35.42749],
                [73.764436, 35.449433],
                [73.80304, 35.503052],
                [73.780273, 35.522491],
                [73.741653, 35.522218],
                [73.726379, 35.529716],
                [73.673035, 35.532768],
                [73.570832, 35.555267],
                [73.534715, 35.553321],
                [73.493043, 35.568603],
                [73.414429, 35.573325],
                [73.347488, 35.599435],
                [73.295823, 35.607498],
                [73.23027, 35.643883],
                [73.2061, 35.665268],
                [73.157212, 35.69027],
                [73.126084, 35.722763],
                [73.113038, 35.751107],
                [73.114989, 35.79222],
                [73.124696, 35.82888],
                [73.114989, 35.847772],
                [73.092483, 35.860275],
                [73.058868, 35.861107],
                [73.008332, 35.840827],
                [72.976379, 35.833878],
                [72.878312, 35.843605],
                [72.825272, 35.856102],
                [72.800537, 35.854714],
                [72.764435, 35.838883],
                [72.688583, 35.818603],
                [72.670822, 35.81833],
                [72.618867, 35.837769],
                [72.570267, 35.848601],
                [72.549148, 35.881104],
                [72.5107111, 35.8960973]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [72.7698226, 36.3078837],
                [72.8053899, 36.3432476],
                [72.8558265, 36.373232],
                [72.8756919, 36.3906618],
                [72.8671272, 36.4113425],
                [72.8785468, 36.4385255],
                [72.9047167, 36.4593849],
                [72.9264853, 36.4530703],
                [72.9474213, 36.4603416],
                [72.9728775, 36.4545054],
                [72.9862003, 36.4680906],
                [72.9747807, 36.4946799],
                [72.9798958, 36.5123692],
                [73.0511493, 36.5322529],
                [73.0586435, 36.5678969],
                [73.0764866, 36.5713362],
                [73.0802931, 36.5939744],
                [73.0969467, 36.6067712],
                [73.0760108, 36.6213798],
                [73.0689925, 36.6792141],
                [73.1086042, 36.6856057],
                [73.1568996, 36.7084011],
                [73.1739101, 36.7265182],
                [73.2377885, 36.707066],
                [73.3082094, 36.7030605],
                [73.3707793, 36.7334778],
                [73.4151493, 36.7326198],
                [73.4435793, 36.7211788],
                [73.4579728, 36.7360517],
                [73.5000826, 36.7134552],
                [73.5631283, 36.7162206],
                [73.579544, 36.7243253],
                [73.5948891, 36.6948582],
                [73.6398538, 36.6981011],
                [73.6900524, 36.6907567],
                [73.7090851, 36.713646],
                [73.7990145, 36.6997225],
                [73.8241139, 36.7115481],
                [73.8619413, 36.6994363],
                [73.8825204, 36.7033466],
                [73.8890629, 36.7282343],
                [73.8818066, 36.7692193],
                [73.8482616, 36.7917994],
                [73.8151923, 36.7991341],
                [73.7955648, 36.8196105],
                [73.7641609, 36.8146586],
                [73.7478642, 36.8272282],
                [73.7050407, 36.8351307],
                [73.654106, 36.908791]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.5862409, 33.4257503],
                [73.590003, 33.412472],
                [73.5663406, 33.3718378],
                [73.5724287, 33.3425105],
                [73.5956654, 33.3240186],
                [73.6103332, 33.2882871]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.6103332, 33.2882871],
                [73.6155971, 33.2479462]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.6155971, 33.2479462],
                [73.6366118, 33.210103],
                [73.6713786, 33.2047351]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.5733914, 33.6752806],
                [73.5670237, 33.6668826],
                [73.5839324, 33.6174785],
                [73.6054284, 33.5888159],
                [73.629182, 33.5695089],
                [73.6225731, 33.5438847],
                [73.6387736, 33.5337437],
                [73.6103298, 33.5117724],
                [73.6040033, 33.4938069]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.6212449, 33.4758396],
                [73.6314493, 33.4486554],
                [73.595894, 33.4380221],
                [73.5862409, 33.4257503]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.6040033, 33.4938069],
                [73.6212449, 33.4758396]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.575941, 33.9109027],
                [73.5939142, 33.8872066],
                [73.5596079, 33.7813447],
                [73.5985897, 33.747968]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.5986353, 33.7452151],
                [73.6067547, 33.7259531],
                [73.6010127, 33.7014501],
                [73.5733914, 33.6752806]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.5342636, 33.9691291],
                [73.5461669, 33.9407682],
                [73.575941, 33.9109027]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.5136885, 34.0013148],
                [73.5342636, 33.9691291]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.610535, 34.570831],
                [73.641098, 34.566941],
                [73.658034, 34.595824],
                [73.674423, 34.645828],
                [73.661102, 34.684159],
                [73.67276, 34.703324],
                [73.709153, 34.732208],
                [73.720535, 34.767213],
                [73.760269, 34.799438],
                [73.799423, 34.803604],
                [73.833879, 34.826942],
                [73.89833, 34.824716],
                [73.937194, 34.849433],
                [73.986373, 34.870544],
                [74.00444, 34.905265],
                [74.05165, 34.955552],
                [74.055816, 34.996102],
                [74.085265, 35.018326],
                [74.086655, 35.029159],
                [74.062196, 35.060547],
                [74.060256, 35.074714],
                [74.126488, 35.124629]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.3910239, 34.376181],
                [73.398331, 34.38234],
                [73.406937, 34.424438],
                [73.432206, 34.479158],
                [73.442749, 34.554994],
                [73.464707, 34.571937],
                [73.526093, 34.57361],
                [73.581665, 34.587768],
                [73.610535, 34.570831]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.3910239, 34.376181],
                [73.4029651, 34.3530396],
                [73.4433592, 34.3212751],
                [73.4594363, 34.2883684],
                [73.4856852, 34.2727067],
                [73.473291, 34.260812],
                [73.4800625, 34.233512],
                [73.4968165, 34.2088658],
                [73.4903309, 34.1830069],
                [73.4908513, 34.1264472],
                [73.5004697, 34.0946105]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.5136885, 34.0013148],
                [73.4986167, 34.0716161],
                [73.5004697, 34.0946105]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [72.5107111, 35.8960973],
                [72.5088281, 35.9160773],
                [72.523606, 35.926942],
                [72.566941, 36.007507],
                [72.559402, 36.033341],
                [72.521912, 36.072228],
                [72.522475, 36.106948],
                [72.544692, 36.15499],
                [72.540253, 36.202476],
                [72.567215, 36.248298],
                [72.614151, 36.267174],
                [72.663315, 36.2594],
                [72.686357, 36.273277],
                [72.7070145, 36.27311],
                [72.735088, 36.2990642],
                [72.7698226, 36.3078837]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.8313682, 32.9287784],
                [73.8924503, 32.9246253],
                [73.9303692, 32.933448],
                [73.9871521, 32.9323311],
                [74.0097625, 32.9426328],
                [74.0799088, 32.9101082],
                [74.1349048, 32.8991909],
                [74.183487, 32.865696],
                [74.2369804, 32.8475213],
                [74.253395, 32.846275],
                [74.314689, 32.8204231],
                [74.3275444, 32.7829551],
                [74.3564689, 32.7752404],
                [74.378952, 32.801624],
                [74.397241, 32.8009687],
                [74.408611, 32.771667],
                [74.4638194, 32.7766375]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.389758, 32.918015],
                [79.40078, 32.940565],
                [79.379557, 32.945744],
                [79.334741, 32.997603],
                [79.341835, 33.014705],
                [79.328358, 33.034464],
                [79.340579, 33.057364],
                [79.359082, 33.063018],
                [79.373109, 33.118749],
                [79.400529, 33.148002],
                [79.395886, 33.169414]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.4148053, 32.5422657],
                [79.46295, 32.606116],
                [79.502924, 32.643717]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.502924, 32.643717],
                [79.524636, 32.651546],
                [79.548375, 32.676552],
                [79.540843, 32.703226],
                [79.561282, 32.714367],
                [79.543609, 32.731088],
                [79.557271, 32.759179]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.557271, 32.759179],
                [79.5447607, 32.7730679],
                [79.505323, 32.783541],
                [79.4808, 32.800677]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.4808, 32.800677],
                [79.460914, 32.833437],
                [79.470847, 32.84268],
                [79.472568, 32.876263],
                [79.446354, 32.89098],
                [79.421025, 32.895212],
                [79.389758, 32.918015]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.9980541, 36.484496],
                [76.0258665, 36.4860462],
                [76.0692272, 36.4775464],
                [76.1251036, 36.4374592],
                [76.1731349, 36.390302],
                [76.1986356, 36.3874455],
                [76.2547611, 36.3477937],
                [76.2973903, 36.3504645],
                [76.3241353, 36.361788],
                [76.352408, 36.3598739],
                [76.4011526, 36.3215115],
                [76.432004, 36.308161],
                [76.4500366, 36.2694054],
                [76.4324252, 36.252071],
                [76.4560238, 36.2413969],
                [76.4817068, 36.2114093],
                [76.5448627, 36.192757],
                [76.5629732, 36.1730653],
                [76.6011647, 36.1655489],
                [76.6372798, 36.1849242],
                [76.6647957, 36.1580606],
                [76.6972733, 36.1358971],
                [76.7168607, 36.0872442],
                [76.7260034, 36.0784771],
                [76.8007285, 36.0489926],
                [76.8049865, 36.0168814],
                [76.7682293, 36.0080173],
                [76.7543408, 35.9826725],
                [76.7227707, 35.9534305],
                [76.7856816, 35.8899445],
                [76.8037794, 35.8504117],
                [76.8653581, 35.8264735],
                [76.8949429, 35.7997362],
                [76.9352244, 35.7840569],
                [77.004433, 35.7750916],
                [77.033321, 35.7764174],
                [77.081515, 35.7977912],
                [77.1195362, 35.796414],
                [77.1416322, 35.7714596],
                [77.1658828, 35.7586352],
                [77.1753165, 35.7317285],
                [77.2221123, 35.727116],
                [77.2245821, 35.714978],
                [77.2854571, 35.7110688],
                [77.3165673, 35.7000154],
                [77.327599, 35.7190901],
                [77.3584377, 35.71772],
                [77.3832012, 35.6931332],
                [77.4040978, 35.6611799],
                [77.4269413, 35.6593261],
                [77.4379117, 35.6410899],
                [77.4271369, 35.6105445],
                [77.4568505, 35.5936084],
                [77.4655989, 35.5733167],
                [77.4606132, 35.5477076],
                [77.4836923, 35.5363824],
                [77.4724145, 35.5211137],
                [77.4402307, 35.518059],
                [77.406699, 35.5298165],
                [77.3783943, 35.5503481],
                [77.3453946, 35.5468226],
                [77.3227022, 35.5367978]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.9526061, 36.5372951],
                [75.9874928, 36.502322],
                [75.9980541, 36.484496]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.9054981, 34.0051852],
                [78.9354793, 34.0204138],
                [78.9952038, 34.036832],
                [79.0189984, 34.0161307],
                [79.0520729, 34.0025678],
                [79.1087041, 33.9901946],
                [79.1472513, 33.9989986],
                [79.171046, 34.0218414],
                [79.1938888, 34.0249347],
                [79.2252977, 34.010658],
                [79.2488543, 34.0239829],
                [79.2969194, 34.0094682],
                [79.3161931, 34.014941],
                [79.3674407, 33.9946664],
                [79.3906702, 33.997095],
                [79.4101818, 34.0101821],
                [79.4044711, 34.0273142],
                [79.4294554, 34.0596749],
                [79.4161304, 34.1001257],
                [79.4382594, 34.116544],
                [79.4701442, 34.1160681],
                [79.4913214, 34.134152],
                [79.497508, 34.1741269],
                [79.4905886, 34.1908996],
                [79.5586601, 34.209343],
                [79.5898311, 34.2409898],
                [79.6073639, 34.2382215],
                [79.6100777, 34.2841617],
                [79.6013549, 34.3084887],
                [79.5732938, 34.3214156],
                [79.5590171, 34.3716222],
                [79.5347804, 34.4007544],
                [79.5305915, 34.4426436],
                [79.5091611, 34.4511975]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.0851428, 33.6195384],
                [79.0825254, 33.6492817],
                [79.0557405, 33.6653971],
                [79.0220871, 33.674266],
                [79.0079801, 33.6924626],
                [79.0096535, 33.7097317],
                [79.0282783, 33.7536762],
                [79.0004386, 33.7734257],
                [78.9933002, 33.7946029],
                [78.9652226, 33.8212529],
                [78.9371449, 33.9126242],
                [78.8871763, 33.9725866],
                [78.9054981, 34.0051852]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.395886, 33.169414],
                [79.412751, 33.176773],
                [79.38518, 33.201913],
                [79.362314, 33.19727],
                [79.33569, 33.204029],
                [79.323878, 33.190291],
                [79.255818, 33.215399],
                [79.238447, 33.233117],
                [79.216971, 33.237886],
                [79.204401, 33.20984],
                [79.182293, 33.212241],
                [79.151971, 33.181869]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.9366127, 33.3869223],
                [78.9273846, 33.440603],
                [78.9314297, 33.4867645],
                [78.9097505, 33.5654311],
                [78.8883614, 33.572663],
                [78.9077147, 33.621128]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.9077147, 33.621128],
                [78.9499895, 33.6176348],
                [79.0035273, 33.6074032],
                [79.0251804, 33.6190625],
                [79.0851428, 33.6195384]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.5091611, 34.4511975],
                [79.5381633, 34.4788814],
                [79.5631331, 34.457944],
                [79.604798, 34.4653105],
                [79.6233578, 34.449844],
                [79.6735645, 34.454603],
                [79.6849859, 34.4767319],
                [79.7033077, 34.4862498],
                [79.7216296, 34.4717351],
                [79.7526815, 34.4776837],
                [79.7655306, 34.4705453],
                [79.7967052, 34.4822221]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.9079287, 34.6946378],
                [79.9323937, 34.6918877],
                [79.9515387, 34.6737465],
                [79.9721896, 34.6997035],
                [80.0152838, 34.6936803],
                [80.0741464, 34.7058061],
                [80.0792055, 34.733439],
                [80.0669116, 34.7622563],
                [80.0989921, 34.7745363],
                [80.1204618, 34.837705],
                [80.1674635, 34.8800732],
                [80.1969966, 34.8871385],
                [80.2060403, 34.9114433],
                [80.1862573, 34.9464874],
                [80.1975165, 34.96062],
                [80.226635, 34.9724685],
                [80.2335754, 34.9895891],
                [80.2173653, 35.0025938],
                [80.1936721, 35.1184343]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.7967052, 34.4822221],
                [79.8107404, 34.5402635],
                [79.7882498, 34.5640188],
                [79.8018136, 34.5892643],
                [79.787018, 34.605969],
                [79.7865473, 34.6273539],
                [79.8297132, 34.6460687],
                [79.8452731, 34.6690141],
                [79.8984776, 34.69619],
                [79.9079287, 34.6946378]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.1571897, 35.5509472],
                [78.1297226, 35.5455394],
                [78.0766144, 35.5599648],
                [78.0482686, 35.5782463],
                [78.0224262, 35.5642328],
                [77.9978907, 35.5603415],
                [77.9672604, 35.5681972],
                [77.9378503, 35.559317],
                [77.9283455, 35.5412573],
                [77.9338061, 35.5224453],
                [77.9240974, 35.4972106]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.2510871, 35.7282772],
                [78.2401006, 35.7062087],
                [78.2093646, 35.6740077],
                [78.1817008, 35.6673563],
                [78.1960618, 35.6496696],
                [78.1617348, 35.5929304],
                [78.1571897, 35.5509472]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.8035393, 35.8770789],
                [78.8002418, 35.8698246],
                [78.7455044, 35.8594926],
                [78.7217629, 35.8630099],
                [78.6946747, 35.8496793],
                [78.676115, 35.8530106],
                [78.6566034, 35.8220776],
                [78.6075865, 35.8151771],
                [78.5767354, 35.7972152],
                [78.5587882, 35.7733295],
                [78.5225857, 35.7627436],
                [78.5053525, 35.771209],
                [78.462723, 35.7644065],
                [78.4405012, 35.7807327],
                [78.4211347, 35.767396],
                [78.4087559, 35.7306959],
                [78.3423159, 35.7199],
                [78.3195253, 35.7210563]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.3195253, 35.7210563],
                [78.2510871, 35.7282772]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.8558586, 35.9742433],
                [78.836074, 35.9419285],
                [78.8277205, 35.9085145],
                [78.8035393, 35.8770789]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.7042776, 35.6390451],
                [79.7004922, 35.6594497],
                [79.676768, 35.6778252],
                [79.6786294, 35.7002396],
                [79.6645914, 35.7185434],
                [79.6451242, 35.7238949],
                [79.6424872, 35.7501872],
                [79.6295668, 35.7782117],
                [79.5925417, 35.7888788],
                [79.56427, 35.8297913],
                [79.5883037, 35.877887],
                [79.5664131, 35.8982187]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.3664698, 35.5251075],
                [80.3294639, 35.534929],
                [80.3021734, 35.5340292],
                [80.2974544, 35.5560939],
                [80.2238609, 35.5550776],
                [80.2054132, 35.5751497],
                [80.1713024, 35.557166],
                [80.1659653, 35.5466079],
                [80.1825866, 35.5088458],
                [80.1419485, 35.4979942],
                [80.1271319, 35.4783793],
                [80.1099998, 35.4783793],
                [80.0884656, 35.4381664],
                [80.0722853, 35.4231758]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.1936721, 35.1184343],
                [80.2374457, 35.1543721],
                [80.2223395, 35.1780178],
                [80.2468013, 35.1856643],
                [80.2563285, 35.2041814],
                [80.2852472, 35.211262]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.2852472, 35.211262],
                [80.2942892, 35.2678932]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.0722853, 35.4231758],
                [80.0349278, 35.4386423],
                [80.0168439, 35.4657682],
                [80.0068501, 35.4962253],
                [79.994001, 35.5097882],
                [79.9645318, 35.5714719],
                [80.0010814, 35.5924701],
                [79.9545853, 35.6162313],
                [79.957585, 35.6328089]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.957585, 35.6328089],
                [79.9245878, 35.620652],
                [79.9209565, 35.604706],
                [79.8675304, 35.5974051],
                [79.8607658, 35.5766603],
                [79.8367138, 35.5862811],
                [79.8392693, 35.6016142],
                [79.816842, 35.6269739],
                [79.7714728, 35.6256662],
                [79.7340147, 35.642769],
                [79.7042776, 35.6390451]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.2925906, 35.3604184],
                [80.3467536, 35.3910228],
                [80.3769176, 35.3923438],
                [80.4119255, 35.4260306],
                [80.4208426, 35.4430942]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.2942892, 35.2678932],
                [80.2662115, 35.2964467],
                [80.2925906, 35.3604184]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [80.4208426, 35.4430942],
                [80.4115952, 35.4771112],
                [80.3894676, 35.4876797],
                [80.3660968, 35.5134914],
                [80.3664698, 35.5251075]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.5664131, 35.8982187],
                [79.5578387, 35.8803554],
                [79.5253079, 35.8657997],
                [79.5013308, 35.8465243],
                [79.4717125, 35.8586372],
                [79.4522501, 35.8827864],
                [79.468368, 35.9003393],
                [79.4563342, 35.9240926],
                [79.4396228, 35.9341975],
                [79.4369169, 35.9722297],
                [79.3920214, 35.9762218],
                [79.3434392, 35.9878727],
                [79.3383831, 35.9634717],
                [79.3131028, 35.9568768],
                [79.2695767, 35.9274197]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.2695767, 35.9274197],
                [79.1862615, 35.9331353],
                [79.1644984, 35.9447862],
                [79.077666, 35.9469845],
                [79.0572219, 35.9414888],
                [79.0257863, 35.9151093],
                [79.0114975, 35.9311568],
                [78.9635747, 35.9370922],
                [78.9547816, 35.9485233],
                [78.9264237, 35.9452259],
                [78.8558586, 35.9742433]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.841253, 36.925945],
                [73.827306, 36.899294],
                [73.799916, 36.890602],
                [73.7521, 36.912051],
                [73.734868, 36.903018],
                [73.69158, 36.915797],
                [73.654106, 36.908791]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.9999254, 36.9979211],
                [74.9189999, 36.978957],
                [74.931881, 36.945459],
                [74.9060629, 36.92974],
                [74.8837271, 36.936386],
                [74.8801829, 36.960527],
                [74.8402621, 37.019909],
                [74.836669, 37.058713],
                [74.805633, 37.053186],
                [74.794419, 37.031096],
                [74.7741229, 37.022023],
                [74.739209, 37.021655],
                [74.717482, 37.037366],
                [74.7214841, 37.05441],
                [74.7019699, 37.082359],
                [74.667951, 37.082416],
                [74.622406, 37.059823],
                [74.624373, 37.047285],
                [74.5801222, 37.030568],
                [74.564626, 37.030852]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.065299, 36.841091],
                [74.048114, 36.826411],
                [74.003385, 36.836827],
                [73.99436, 36.830229],
                [73.95743, 36.842518],
                [73.932234, 36.87474],
                [73.914651, 36.869367],
                [73.892046, 36.879803]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.892046, 36.879803],
                [73.90677, 36.900804],
                [73.890465, 36.912521],
                [73.841253, 36.925945]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.153365, 36.898165],
                [74.129893, 36.8637],
                [74.12079, 36.83822],
                [74.065299, 36.841091]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.315913, 36.938305],
                [74.309291, 36.918906],
                [74.237211, 36.894872],
                [74.223558, 36.896831]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.223558, 36.896831],
                [74.180747, 36.916499],
                [74.153365, 36.898165]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.534055, 36.957221],
                [74.506271, 36.966017],
                [74.491484, 36.988002],
                [74.426558, 37.01115]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.395311, 36.973441],
                [74.388036, 36.964049],
                [74.350169, 36.962302],
                [74.315913, 36.938305]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.426558, 37.01115],
                [74.413732, 36.975273],
                [74.395311, 36.973441]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.564626, 37.030852],
                [74.51893, 37.017367],
                [74.543524, 36.967085],
                [74.534055, 36.957221]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.19221, 36.974688],
                [75.2162911, 36.971826],
                [75.233421, 36.959055],
                [75.285346, 36.974495],
                [75.315789, 36.969826],
                [75.327187, 36.958537],
                [75.3589271, 36.956816],
                [75.3753049, 36.946841],
                [75.3995239, 36.955057],
                [75.4058632, 36.936584],
                [75.387195, 36.925916],
                [75.385606, 36.903406],
                [75.4202048, 36.889483],
                [75.4318285, 36.8301725],
                [75.419898, 36.7994229],
                [75.4195976, 36.7733706],
                [75.4435014, 36.7467937],
                [75.4514837, 36.7246105],
                [75.4694223, 36.7159075],
                [75.4992641, 36.739151],
                [75.5324539, 36.721379],
                [75.5339051, 36.771441],
                [75.5736412, 36.766664],
                [75.6373748, 36.770191],
                [75.673418, 36.764956],
                [75.6981101, 36.74689],
                [75.7195099, 36.752095],
                [75.7658138, 36.724879]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.19221, 36.974688],
                [75.1581259, 36.992952],
                [75.168135, 37.009677],
                [75.1376891, 37.026454],
                [75.1254728, 37.012544],
                [75.0480739, 37.00475],
                [75.0292459, 37.01624],
                [74.9999254, 36.9979211]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.7658138, 36.724879],
                [75.803792, 36.710235],
                [75.8487161, 36.673665],
                [75.864847, 36.669735],
                [75.888166, 36.639054],
                [75.911314, 36.629027],
                [75.9406328, 36.5928932],
                [75.9257841, 36.5730437],
                [75.9526061, 36.5372951]
              ]
            },
            properties: {
              boundary: "claimed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.9905304, 34.270513],
                [73.9457114, 34.275773],
                [73.9355039, 34.2832134],
                [73.9436386, 34.3087704],
                [73.9285029, 34.3184594],
                [73.939008, 34.336531],
                [73.902775, 34.3435091],
                [73.859152, 34.3240239],
                [73.7989322, 34.3380486],
                [73.7741744, 34.3323553],
                [73.7577291, 34.3453756],
                [73.7559108, 34.3808906]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.7559108, 34.3808906],
                [73.8028158, 34.4199405],
                [73.8408422, 34.4260503],
                [73.8767736, 34.4509386]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.0068582, 33.2196316],
                [74.0357634, 33.1968812],
                [74.0704198, 33.194053],
                [74.0863584, 33.1735885],
                [74.1095092, 33.1679721],
                [74.1538739, 33.1366972],
                [74.1598133, 33.11104],
                [74.1821322, 33.0891048],
                [74.1705642, 33.0737326],
                [74.2016087, 33.0667481],
                [74.2364609, 33.0508369]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.2364609, 33.0508369],
                [74.3135502, 33.0310221]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.3398618, 32.9533037],
                [74.312081, 32.9360384],
                [74.3261089, 32.9200999],
                [74.3492939, 32.9218382],
                [74.3918595, 32.9104138],
                [74.4202495, 32.8855143],
                [74.4143485, 32.8661322],
                [74.4193573, 32.840028],
                [74.4368055, 32.8246231],
                [74.4482712, 32.7935718],
                [74.4638194, 32.7766375]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.3200092, 33.0102828],
                [74.3398618, 32.9533037]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.3196175, 33.0221046],
                [74.3200092, 33.0102828]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.3135502, 33.0310221],
                [74.3247504, 33.0309118]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.3247504, 33.0309118],
                [74.3196175, 33.0221046]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.4148053, 32.5422657],
                [79.3993521, 32.5656677],
                [79.3988585, 32.6038733],
                [79.4402426, 32.6878901],
                [79.4607388, 32.7100065],
                [79.4397771, 32.7278151],
                [79.414725, 32.7369904],
                [79.4168006, 32.7543432],
                [79.4069967, 32.7854596],
                [79.3909108, 32.7919376],
                [79.3658191, 32.833506]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.3658191, 32.833506],
                [79.3226366, 32.8698925],
                [79.3028385, 32.8922381],
                [79.3062838, 32.9279279],
                [79.2851028, 32.9500552],
                [79.2372676, 32.974825],
                [79.2218542, 32.9636307]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.1612899, 33.0134858],
                [79.1693728, 32.9988535],
                [79.2218542, 32.9636307]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.162648, 33.167327],
                [79.1467094, 33.1467503],
                [79.1400575, 33.1057784],
                [79.1612899, 33.0134858]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.1284842, 33.3059388],
                [74.0785711, 33.2857249],
                [74.0179945, 33.2704972],
                [74.0004574, 33.236454],
                [74.0068582, 33.2196316]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.1712664, 33.3653323],
                [74.1662856, 33.3377332],
                [74.1284842, 33.3059388]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.0372165, 33.5765835],
                [74.0811754, 33.5847842],
                [74.0966297, 33.5710433],
                [74.1406958, 33.5577297],
                [74.1595483, 33.5321953],
                [74.1569727, 33.5123503],
                [74.1924993, 33.4787338],
                [74.1771336, 33.432665]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.1771336, 33.432665],
                [74.1789735, 33.412343]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.1789735, 33.412343],
                [74.1866703, 33.3848975],
                [74.1712664, 33.3653323]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.9777549, 33.7328969],
                [73.9614172, 33.7234751],
                [73.9813147, 33.7067968],
                [73.9857477, 33.6690023],
                [73.9811116, 33.6414466],
                [74.014145, 33.6071629]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.014145, 33.6071629],
                [74.0372165, 33.5765835]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.0464755, 33.8103853],
                [74.0099259, 33.7763602],
                [73.9996523, 33.7412981],
                [73.9777549, 33.7328969]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.2662591, 33.986617],
                [74.2707054, 33.9563714],
                [74.2820286, 33.935202],
                [74.2739231, 33.917668],
                [74.2812899, 33.9010507],
                [74.2336106, 33.8715024]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.2336106, 33.8715024],
                [74.1894755, 33.8389396],
                [74.1297257, 33.827057],
                [74.0602091, 33.8239262],
                [74.0464755, 33.8103853]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.2560584, 34.0049691],
                [74.2662591, 33.986617]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.8998363, 34.0501952],
                [73.9075201, 34.0826857],
                [73.904503, 34.1047418],
                [73.9255716, 34.1028872],
                [73.9268231, 34.1274427],
                [73.9536254, 34.1479357]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.0161109, 34.0396137],
                [74.0613719, 34.0348241],
                [74.1474396, 34.0419243]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.9536254, 34.1479357],
                [73.9580405, 34.1671387],
                [73.9897933, 34.1758194],
                [74.0037106, 34.1906613],
                [74.008404, 34.2212038],
                [73.9897633, 34.2590814]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.1468434, 34.6642175],
                [74.1577744, 34.688635],
                [74.2089801, 34.7170025],
                [74.2414768, 34.7270764],
                [74.309727, 34.7825041],
                [74.3604777, 34.7871414],
                [74.3956982, 34.7854894],
                [74.4361693, 34.7741331],
                [74.4484807, 34.7823207],
                [74.4786579, 34.7794668],
                [74.5229199, 34.7670789]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.8998363, 34.0501952],
                [73.9280878, 34.0228528]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.9490521, 34.0168724],
                [73.9868638, 34.0131164],
                [74.0161109, 34.0396137]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.9280878, 34.0228528],
                [73.9490521, 34.0168724]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.1474396, 34.0419243],
                [74.19725, 34.0167725],
                [74.233124, 34.0236777],
                [74.2560584, 34.0049691]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.9897633, 34.2590814],
                [73.9905304, 34.270513]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [73.8767736, 34.4509386],
                [73.8824438, 34.4837101],
                [73.9050294, 34.5279357],
                [73.9534937, 34.5605739],
                [73.9529139, 34.5977363],
                [73.9284562, 34.6030914],
                [73.9321485, 34.641444],
                [73.9688411, 34.6857401],
                [74.00919, 34.6845391],
                [74.0713441, 34.6693165],
                [74.0946106, 34.6704811],
                [74.1282496, 34.6589373],
                [74.1468434, 34.6642175]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.6039432, 34.7377535],
                [74.6508426, 34.7059418],
                [74.7305659, 34.6811952]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.5229199, 34.7670789],
                [74.5802199, 34.761681],
                [74.6039432, 34.7377535]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.7636011, 34.6782863],
                [74.8419039, 34.6733948],
                [74.9358366, 34.6727606],
                [75.0134107, 34.6394355],
                [75.0251756, 34.6289883]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [74.7305659, 34.6811952],
                [74.7636011, 34.6782863]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.0251756, 34.6289883],
                [75.0791934, 34.6470749],
                [75.1202606, 34.6475955],
                [75.1632344, 34.6565225],
                [75.2055085, 34.6438117]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.2055085, 34.6438117],
                [75.2667819, 34.6367344],
                [75.2477144, 34.6034982],
                [75.3009802, 34.5863107],
                [75.320012, 34.5648026],
                [75.3468414, 34.5602247],
                [75.3664001, 34.5380975]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.3664001, 34.5380975],
                [75.3956106, 34.5475573],
                [75.4248811, 34.546308],
                [75.4628233, 34.5347389]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.4933574, 34.5435476],
                [75.4628233, 34.5347389]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.5296134, 34.5446819],
                [75.5131896, 34.5559637],
                [75.4933574, 34.5435476]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.3378187, 34.7232677],
                [76.2823927, 34.7234544],
                [76.2584918, 34.7171679],
                [76.2700645, 34.6983829],
                [76.2502737, 34.6763435],
                [76.1939388, 34.6613902],
                [76.1633918, 34.6327333],
                [76.1159327, 34.6392682],
                [76.1007729, 34.6477744],
                [76.0631703, 34.687801],
                [76.0335806, 34.6856497],
                [75.9963681, 34.6503647],
                [75.9455708, 34.6255652],
                [75.8928994, 34.5823803],
                [75.8357186, 34.5560429],
                [75.7850992, 34.5136678],
                [75.6989704, 34.525826],
                [75.6801981, 34.5322645]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.6566505, 34.5396156],
                [75.6303429, 34.5371492],
                [75.5407928, 34.5390892]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.5407928, 34.5390892],
                [75.5296134, 34.5446819]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [75.6801981, 34.5322645],
                [75.6566505, 34.5396156]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.683033, 34.7448273],
                [76.6968004, 34.750538],
                [76.7017253, 34.7957801],
                [76.7369127, 34.8064789],
                [76.7465058, 34.8494028],
                [76.745396, 34.8883506],
                [76.7618673, 34.8996986],
                [76.7634058, 34.9307175],
                [76.7922396, 34.9538342],
                [76.8302945, 34.9548731],
                [76.8613212, 34.9482902],
                [76.8979006, 34.9259701],
                [76.9156655, 34.9458057],
                [76.9410488, 34.9947758],
                [76.9609328, 35.017621],
                [77.0058073, 35.023907]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.4429502, 34.7502095],
                [76.4577062, 34.7795521],
                [76.4865853, 34.796098],
                [76.5174837, 34.7831044],
                [76.5412148, 34.762017],
                [76.5781944, 34.759311],
                [76.6102058, 34.7455187],
                [76.6226954, 34.7615942],
                [76.6631745, 34.7399602]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.3378187, 34.7232677],
                [76.3603306, 34.7331887],
                [76.419387, 34.737644]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.419387, 34.737644],
                [76.4429502, 34.7502095]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.6631745, 34.7399602],
                [76.683033, 34.7448273]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [77.0058073, 35.023907],
                [77.0349455, 35.0372562],
                [77.0468109, 35.0514566],
                [77.1104407, 35.0488686],
                [77.1203914, 35.065026],
                [77.1113362, 35.0891261],
                [77.0823302, 35.0992247],
                [77.0853922, 35.1691654],
                [77.0432982, 35.1823895],
                [77.0174718, 35.1829928],
                [76.9906239, 35.2106346],
                [77.0043311, 35.2324902],
                [76.975079, 35.2513273],
                [76.999455, 35.283328]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [76.999455, 35.283328],
                [77.0066228, 35.2944771],
                [76.9779725, 35.3449705],
                [76.9587121, 35.3627163],
                [76.9478202, 35.3928716],
                [76.9191527, 35.4014004],
                [76.908484, 35.389611],
                [76.8627963, 35.389639],
                [76.8316741, 35.4207355],
                [76.8385577, 35.4428491],
                [76.8156409, 35.4609718],
                [76.7941146, 35.4911883],
                [76.7965436, 35.5169363],
                [76.7589841, 35.5183824],
                [76.7497487, 35.5550366],
                [76.793694, 35.5880725],
                [76.7551389, 35.6296273],
                [76.7821154, 35.6425254],
                [76.775992, 35.658059]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.7682083, 33.5276825],
                [78.8036905, 33.4892571],
                [78.8359291, 33.4266235],
                [78.8581479, 33.4160145],
                [78.891523, 33.4142358],
                [78.9366127, 33.3869223]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.7172226, 33.6242162],
                [78.7510081, 33.6278404],
                [78.7409785, 33.600818],
                [78.7400436, 33.55377],
                [78.7682083, 33.5276825]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.7281399, 33.9233065],
                [78.7623447, 33.9145308],
                [78.7512873, 33.8847988],
                [78.7653737, 33.8358769],
                [78.754213, 33.7842564],
                [78.7752406, 33.7378895],
                [78.763263, 33.7197886]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.696326, 33.6454463],
                [78.7172226, 33.6242162]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.7435819, 33.6778044],
                [78.7121701, 33.6629071],
                [78.696326, 33.6454463]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.7551349, 33.702452],
                [78.7435819, 33.6778044]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.763263, 33.7197886],
                [78.7551349, 33.702452]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.656517, 34.0318296],
                [78.6978699, 34.0259418],
                [78.7423297, 34.0000135],
                [78.7418471, 33.9769719],
                [78.7281399, 33.9233065]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.2142157, 34.8887954],
                [78.234592, 34.882224],
                [78.2340706, 34.84461],
                [78.2255444, 34.8111977],
                [78.2270274, 34.7723644],
                [78.2123326, 34.7688329],
                [78.2022153, 34.7354448],
                [78.2086386, 34.7207217],
                [78.2720418, 34.7013074],
                [78.2783929, 34.676011],
                [78.2625527, 34.6636588],
                [78.272983, 34.6297702],
                [78.2901044, 34.6151285],
                [78.3296214, 34.6113893],
                [78.3421378, 34.6026121],
                [78.3856301, 34.6065087],
                [78.4292343, 34.5906384],
                [78.4263976, 34.5606846],
                [78.4354847, 34.5419334]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.6696832, 34.0918755],
                [78.6574443, 34.0743787],
                [78.656517, 34.0318296]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.9061058, 34.1410958],
                [78.8620876, 34.1656239],
                [78.8537106, 34.14154],
                [78.8261029, 34.1246806],
                [78.791774, 34.1352605],
                [78.7851736, 34.120189],
                [78.742262, 34.0923607],
                [78.7077821, 34.0947465],
                [78.6811287, 34.0797156],
                [78.6696832, 34.0918755]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.7387265, 34.4593468],
                [78.764039, 34.4397896],
                [78.80594, 34.4355969],
                [78.8245858, 34.4179146],
                [78.8511482, 34.4152844],
                [78.8787246, 34.3908687]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.4354847, 34.5419334],
                [78.460294, 34.5691948],
                [78.4825069, 34.5782819],
                [78.5519156, 34.5715444],
                [78.5597608, 34.552972],
                [78.5636252, 34.5095782],
                [78.5799089, 34.5043863],
                [78.5915317, 34.5281629],
                [78.6342168, 34.5440664],
                [78.6844209, 34.5274222],
                [78.7097062, 34.5258831],
                [78.7152658, 34.5031106],
                [78.756696, 34.4844215],
                [78.7569296, 34.467628],
                [78.7387265, 34.4593468]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.151971, 33.181869],
                [79.162648, 33.167327]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [79.0366745, 34.3348429],
                [79.0286922, 34.3167147],
                [78.9855623, 34.3139853],
                [78.9853436, 34.2986856],
                [78.9648508, 34.2667734],
                [78.9616223, 34.236652],
                [78.9437825, 34.2250029],
                [78.9256764, 34.1544091],
                [78.9061058, 34.1410958]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.9308506, 34.3797259],
                [78.9471597, 34.3892683],
                [78.9819574, 34.3569708],
                [79.0366745, 34.3348429]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.8787246, 34.3908687],
                [78.9021272, 34.3810115],
                [78.9308506, 34.3797259]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.0032132, 35.2394089],
                [78.0114143, 35.302278],
                [78.0229214, 35.3589806],
                [78.0539886, 35.3996825],
                [78.1071934, 35.4391815]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.0032132, 35.2394089],
                [78.0157461, 35.215878],
                [78.052484, 35.1818492]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.1071934, 35.4391815],
                [78.1104294, 35.4700669],
                [78.1371688, 35.4924729],
                [78.0981158, 35.4995308],
                [78.039807, 35.4887695],
                [78.0249689, 35.4682598],
                [77.9947134, 35.4897179],
                [77.9682455, 35.494314],
                [77.9476781, 35.478626],
                [77.9240974, 35.4972106]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.2142157, 34.8887954],
                [78.1785251, 34.9285466],
                [78.202275, 34.9547865],
                [78.2014758, 34.9730838],
                [78.1764697, 34.9879059],
                [78.1579907, 34.9887481],
                [78.1427152, 35.0110978],
                [78.1145094, 35.0318238],
                [78.1396401, 35.0765309],
                [78.1275343, 35.1004602],
                [78.1125788, 35.1069586]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [78.052484, 35.1818492],
                [78.0582875, 35.1350631],
                [78.0492539, 35.1140027],
                [78.0836934, 35.102347],
                [78.1125788, 35.1069586]
              ]
            },
            properties: {
              boundary: "disputed"
            }
          }
        ]
      };
      var getBoundaryStyleFunction = (map) => (feature) => {
        const wt = map.getZoom() / 4;
        switch (feature.properties.boundary) {
          case "disputed":
            return {
              color: "#f2efea",
              weight: wt * 2
            };
          case "claimed":
            return {
              color: "#b9a8b9",
              weight: wt
            };
        }
      };
      function addIndiaBoundaries(map) {
        L.geoJSON(indiaBoundaryLines, {
          style: getBoundaryStyleFunction(map)
        }).addTo(map);
      }
      module.exports = addIndiaBoundaries;
    }
  });

  // ns-hugo:/__w/map-kerala/map-kerala/site/assets/constants.js
  var require_constants = __commonJS({
    "ns-hugo:/__w/map-kerala/map-kerala/site/assets/constants.js"(exports, module) {
      var OVERPASS_URL = "https://overpass-api.de/api/interpreter";
      var KERALA_BOUNDS = [
        [7.477, 78.234],
        [13.5806, 74.2676]
      ];
      var MIN_ZOOM = 7;
      var QUERIES = {
        "Government Offices": `"office"="government"`,
        Hospitals: `"amenity"="hospital"`,
        Power: `"power"`,
        "Police Stations": `"amenity"="police"`,
        "Fire Stations": `"amenity"="fire_station"`,
        "Waterways/Rivers": `"waterway"`,
        Ponds: `"water"="pond"`,
        Farmlands: `"landuse"="farmland"`,
        Roads: `"highway"`,
        Rails: `"railway"`,
        Taxi: `"amenity"="taxi"`,
        "Petrol Pumps": `"amenity"="fuel"`,
        Hotels: `"tourism"="hotel"`,
        Restaurants: `"amenity"="restaurant"`,
        Parking: `"amenity"="parking"`,
        Cinemas: `"amenity"="cinema"`,
        Toilets: `"amenity"="toilets"`,
        Religion: `"amenity"="place_of_worship"`,
        Schools: `"amenity"="school"`,
        Colleges: `"amenity"="college"`,
        Kindergartens: `"amenity"="kindergarten"`,
        "Community centres": `"amenity"="community_centre"`,
        Libraries: `"amenity"="library"`,
        "Ration shops": `"name"="Ration shop"`,
        Banks: `"amenity"="bank"`,
        ATMs: `"amenity"="atm"`,
        "Post Offices": `"amenity"="post_office"`,
        Shops: `"shop"="yes"`,
        Sports: `"sport"`,
        "Drinking Water": `"amenity"="drinking_water"`,
        "Free WiFi": `"wifi"`
      };
      module.exports = {
        KERALA_BOUNDS,
        MIN_ZOOM,
        OVERPASS_URL,
        QUERIES
      };
    }
  });

  // site/node_modules/osmtogeojson/lodash.custom.js
  var require_lodash_custom = __commonJS({
    "site/node_modules/osmtogeojson/lodash.custom.js"(exports, module) {
      (function() {
        var undefined2;
        var VERSION = "4.15.0";
        var LARGE_ARRAY_SIZE = 200;
        var FUNC_ERROR_TEXT = "Expected a function";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991;
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
        var reEscapeChar = /\\(\\)?/g;
        var reFlags = /\w*$/;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            return freeProcess && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function addMapEntry(map, pair) {
          map.set(pair[0], pair[1]);
          return map;
        }
        function addSetEntry(set, value) {
          set.add(value);
          return set;
        }
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayEach(array, iteratee2) {
          var index = -1, length = array ? array.length : 0;
          while (++index < length) {
            if (iteratee2(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee2, accumulator, initAccum) {
          var index = -1, length = array ? array.length : 0;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee2(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1, length = array ? array.length : 0;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined2 : object[key];
          };
        }
        function baseTimes(n, iteratee2) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee2(index);
          }
          return result;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        function isHostObject(value) {
          var result = false;
          if (value != null && typeof value.toString != "function") {
            try {
              result = !!(value + "");
            } catch (e) {
            }
          }
          return result;
        }
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
        var coreJsData = root["__core-js_shared__"];
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objectCtorString = funcToString.call(Object);
        var objectToString = objectProto.toString;
        var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        var Buffer2 = moduleExports ? root.Buffer : undefined2, Symbol = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
        var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max;
        var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
        var nonEnumShadows = !propertyIsEnumerable.call({ "valueOf": 1 }, "valueOf");
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol ? Symbol.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash() {
        }
        function Hash(entries) {
          var index = -1, length = entries ? entries.length : 0;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
        }
        function hashDelete(key) {
          return this.has(key) && delete this.__data__[key];
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined2 : result;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries ? entries.length : 0;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries ? entries.length : 0;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          return getMapData(this, key)["delete"](key);
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          getMapData(this, key).set(key, value);
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values) {
          var index = -1, length = values ? values.length : 0;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          this.__data__ = new ListCache(entries);
        }
        function stackClear() {
          this.__data__ = new ListCache();
        }
        function stackDelete(key) {
          return this.__data__["delete"](key);
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var cache = this.__data__;
          if (cache instanceof ListCache) {
            var pairs = cache.__data__;
            if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              return this;
            }
            cache = this.__data__ = new MapCache(pairs);
          }
          cache.set(key, value);
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
          var length = result.length, skipIndexes = !!length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
              result.push(key);
            }
          }
          return result;
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || typeof key == "number" && value === undefined2 && !(key in object)) {
            object[key] = value;
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            object[key] = value;
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
          var result;
          if (customizer) {
            result = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result !== undefined2) {
            return result;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              if (isHostObject(value)) {
                return object ? value : {};
              }
              result = initCloneObject(isFunc ? {} : value);
              if (!isDeep) {
                return copySymbols(value, baseAssign(result, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result = initCloneByTag(value, tag, baseClone, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result);
          if (!isArr) {
            var props = isFull ? getAllKeys(value) : keys(value);
          }
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
          });
          return result;
        }
        function baseCreate(proto) {
          return isObject(proto) ? objectCreate(proto) : {};
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseFor = createBaseFor();
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseGet(object, path) {
          path = isKey(path, object) ? [path] : castPath(path);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result = keysFunc(object);
          return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
        }
        function baseGetTag(value) {
          return objectToString.call(value);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object(object);
        }
        function baseIsEqual(value, other, customizer, bitmask, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
        }
        function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
          if (!objIsArr) {
            objTag = getTag(object);
            objTag = objTag == argsTag ? objectTag : objTag;
          }
          if (!othIsArr) {
            othTag = getTag(other);
            othTag = othTag == argsTag ? objectTag : othTag;
          }
          var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
          }
          if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result === undefined2 ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result = [];
          for (var key in Object(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result.push(key);
            }
          }
          return result;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          return result;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined2, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          if (!(isArray(source) || isTypedArray(source))) {
            var props = baseKeysIn(source);
          }
          arrayEach(props || source, function(srcValue, key) {
            if (props) {
              key = srcValue;
              srcValue = source[key];
            }
            if (isObject(srcValue)) {
              stack || (stack = new Stack());
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          });
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = object[key], srcValue = source[key], stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            newValue = srcValue;
            if (isArray(srcValue) || isTypedArray(srcValue)) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else {
                isCommon = false;
                newValue = baseClone(srcValue, true);
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
                isCommon = false;
                newValue = baseClone(srcValue, true);
              } else {
                newValue = objValue;
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function baseRest(func, start) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = array;
            return apply(func, this, otherArgs);
          };
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result = value + "";
          return result == "0" && 1 / value == -INFINITY ? "-0" : result;
        }
        function castPath(value) {
          return isArray(value) ? value : stringToPath(value);
        }
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var result = new buffer.constructor(buffer.length);
          buffer.copy(result);
          return result;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
          return result;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneMap(map, isDeep, cloneFunc) {
          var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
          return arrayReduce(array, addMapEntry, new map.constructor());
        }
        function cloneRegExp(regexp) {
          var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result.lastIndex = regexp.lastIndex;
          return result;
        }
        function cloneSet(set, isDeep, cloneFunc) {
          var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
          return arrayReduce(array, addSetEntry, new set.constructor());
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            assignValue(object, key, newValue === undefined2 ? source[key] : newValue);
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var stacked = stack.get(array);
          if (stacked && stack.get(other)) {
            return stacked == other;
          }
          var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!seen.has(othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, customizer, bitmask, stack))) {
                  return seen.add(othIndex);
                }
              })) {
                result = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              result = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result;
        }
        function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= UNORDERED_COMPARE_FLAG;
              stack.set(object, other);
              var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
              stack["delete"](object);
              return result;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var stacked = stack.get(object);
          if (stacked && stack.get(other)) {
            return stacked == other;
          }
          var result = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
              result = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result;
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getIteratee() {
          var result = lodash.iteratee || iteratee;
          result = result === iteratee ? baseIteratee : result;
          return arguments.length ? result(arguments[0], arguments[1]) : result;
        }
        function getMapData(map, key) {
          var data = map.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result = keys(object), length = result.length;
          while (length--) {
            var key = result[length], value = object[key];
            result[length] = [key, value, isStrictComparable(value)];
          }
          return result;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function(value) {
            var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : undefined2;
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result;
          };
        }
        function hasPath(object, path, hasFunc) {
          path = isKey(path, object) ? [path] : castPath(path);
          var result, index = -1, length = path.length;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result) {
            return result;
          }
          var length = object ? object.length : 0;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result = array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result.index = array.index;
            result.input = array.input;
          }
          return result;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, cloneFunc, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return cloneMap(object, isDeep, cloneFunc);
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return cloneSet(object, isDeep, cloneFunc);
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function isIndex(value, length) {
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object(object));
          };
        }
        function nativeKeysIn(object) {
          var result = [];
          if (object != null) {
            for (var key in Object(object)) {
              result.push(key);
            }
          }
          return result;
        }
        var stringToPath = memoize(function(string) {
          string = toString(string);
          var result = [];
          if (reLeadingDot.test(string)) {
            result.push("");
          }
          string.replace(rePropName, function(match, number, quote, string2) {
            result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
          });
          return result;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result = value + "";
          return result == "0" && 1 / value == -INFINITY ? "-0" : result;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function compact(array) {
          var index = -1, length = array ? array.length : 0, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver && typeof resolver != "function") {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result);
            return result;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function clone(value) {
          return baseClone(value, false, true);
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        function isArguments(value) {
          return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
        }
        var isArray = Array.isArray;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        function isEmpty(value) {
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (nonEnumShadows || isPrototype(value)) {
            return !nativeKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isFunction(value) {
          var tag = isObject(value) ? objectToString.call(value) : "";
          return tag == funcTag || tag == genTag;
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return !!value && typeof value == "object";
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        function get(object, path, defaultValue) {
          var result = object == null ? undefined2 : baseGet(object, path);
          return result === undefined2 ? defaultValue : result;
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, true));
        }
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        lodash.compact = compact;
        lodash.iteratee = iteratee;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.property = property;
        lodash.toPlainObject = toPlainObject;
        lodash.clone = clone;
        lodash.eq = eq;
        lodash.forEach = forEach;
        lodash.get = get;
        lodash.hasIn = hasIn;
        lodash.identity = identity;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBuffer = isBuffer;
        lodash.isEmpty = isEmpty;
        lodash.isFunction = isFunction;
        lodash.isLength = isLength;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.toString = toString;
        lodash.each = forEach;
        lodash.VERSION = VERSION;
        if (freeModule) {
          (freeModule.exports = lodash)._ = lodash;
          freeExports._ = lodash;
        }
      }).call(exports);
    }
  });

  // site/node_modules/wgs84/index.js
  var require_wgs84 = __commonJS({
    "site/node_modules/wgs84/index.js"(exports, module) {
      module.exports.RADIUS = 6378137;
      module.exports.FLATTENING = 1 / 298.257223563;
      module.exports.POLAR_RADIUS = 63567523142e-4;
    }
  });

  // site/node_modules/@mapbox/geojson-area/index.js
  var require_geojson_area = __commonJS({
    "site/node_modules/@mapbox/geojson-area/index.js"(exports, module) {
      var wgs84 = require_wgs84();
      module.exports.geometry = geometry;
      module.exports.ring = ringArea;
      function geometry(_) {
        var area = 0, i;
        switch (_.type) {
          case "Polygon":
            return polygonArea(_.coordinates);
          case "MultiPolygon":
            for (i = 0; i < _.coordinates.length; i++) {
              area += polygonArea(_.coordinates[i]);
            }
            return area;
          case "Point":
          case "MultiPoint":
          case "LineString":
          case "MultiLineString":
            return 0;
          case "GeometryCollection":
            for (i = 0; i < _.geometries.length; i++) {
              area += geometry(_.geometries[i]);
            }
            return area;
        }
      }
      function polygonArea(coords) {
        var area = 0;
        if (coords && coords.length > 0) {
          area += Math.abs(ringArea(coords[0]));
          for (var i = 1; i < coords.length; i++) {
            area -= Math.abs(ringArea(coords[i]));
          }
        }
        return area;
      }
      function ringArea(coords) {
        var p1, p2, p3, lowerIndex, middleIndex, upperIndex, i, area = 0, coordsLength = coords.length;
        if (coordsLength > 2) {
          for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {
              lowerIndex = coordsLength - 2;
              middleIndex = coordsLength - 1;
              upperIndex = 0;
            } else if (i === coordsLength - 1) {
              lowerIndex = coordsLength - 1;
              middleIndex = 0;
              upperIndex = 1;
            } else {
              lowerIndex = i;
              middleIndex = i + 1;
              upperIndex = i + 2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
          }
          area = area * wgs84.RADIUS * wgs84.RADIUS / 2;
        }
        return area;
      }
      function rad(_) {
        return _ * Math.PI / 180;
      }
    }
  });

  // site/node_modules/@mapbox/geojson-rewind/index.js
  var require_geojson_rewind = __commonJS({
    "site/node_modules/@mapbox/geojson-rewind/index.js"(exports, module) {
      var geojsonArea = require_geojson_area();
      module.exports = rewind;
      function rewind(gj, outer) {
        switch (gj && gj.type || null) {
          case "FeatureCollection":
            gj.features = gj.features.map(curryOuter(rewind, outer));
            return gj;
          case "GeometryCollection":
            gj.geometries = gj.geometries.map(curryOuter(rewind, outer));
            return gj;
          case "Feature":
            gj.geometry = rewind(gj.geometry, outer);
            return gj;
          case "Polygon":
          case "MultiPolygon":
            return correct(gj, outer);
          default:
            return gj;
        }
      }
      function curryOuter(a, b) {
        return function(_) {
          return a(_, b);
        };
      }
      function correct(_, outer) {
        if (_.type === "Polygon") {
          _.coordinates = correctRings(_.coordinates, outer);
        } else if (_.type === "MultiPolygon") {
          _.coordinates = _.coordinates.map(curryOuter(correctRings, outer));
        }
        return _;
      }
      function correctRings(_, outer) {
        outer = !!outer;
        _[0] = wind(_[0], outer);
        for (var i = 1; i < _.length; i++) {
          _[i] = wind(_[i], !outer);
        }
        return _;
      }
      function wind(_, dir) {
        return cw(_) === dir ? _ : _.reverse();
      }
      function cw(_) {
        return geojsonArea.ring(_) >= 0;
      }
    }
  });

  // site/node_modules/osm-polygon-features/polygon-features.json
  var require_polygon_features = __commonJS({
    "site/node_modules/osm-polygon-features/polygon-features.json"(exports, module) {
      module.exports = [
        {
          key: "building",
          polygon: "all"
        },
        {
          key: "highway",
          polygon: "whitelist",
          values: [
            "services",
            "rest_area",
            "escape",
            "elevator"
          ]
        },
        {
          key: "natural",
          polygon: "blacklist",
          values: [
            "coastline",
            "cliff",
            "ridge",
            "arete",
            "tree_row"
          ]
        },
        {
          key: "landuse",
          polygon: "all"
        },
        {
          key: "waterway",
          polygon: "whitelist",
          values: [
            "riverbank",
            "dock",
            "boatyard",
            "dam"
          ]
        },
        {
          key: "amenity",
          polygon: "all"
        },
        {
          key: "leisure",
          polygon: "all"
        },
        {
          key: "barrier",
          polygon: "whitelist",
          values: [
            "city_wall",
            "ditch",
            "hedge",
            "retaining_wall",
            "wall",
            "spikes"
          ]
        },
        {
          key: "railway",
          polygon: "whitelist",
          values: [
            "station",
            "turntable",
            "roundhouse",
            "platform"
          ]
        },
        {
          key: "area",
          polygon: "all"
        },
        {
          key: "boundary",
          polygon: "all"
        },
        {
          key: "man_made",
          polygon: "blacklist",
          values: [
            "cutline",
            "embankment",
            "pipeline"
          ]
        },
        {
          key: "power",
          polygon: "whitelist",
          values: [
            "plant",
            "substation",
            "generator",
            "transformer"
          ]
        },
        {
          key: "place",
          polygon: "all"
        },
        {
          key: "shop",
          polygon: "all"
        },
        {
          key: "aeroway",
          polygon: "blacklist",
          values: [
            "taxiway"
          ]
        },
        {
          key: "tourism",
          polygon: "all"
        },
        {
          key: "historic",
          polygon: "all"
        },
        {
          key: "public_transport",
          polygon: "all"
        },
        {
          key: "office",
          polygon: "all"
        },
        {
          key: "building:part",
          polygon: "all"
        },
        {
          key: "military",
          polygon: "all"
        },
        {
          key: "ruins",
          polygon: "all"
        },
        {
          key: "area:highway",
          polygon: "all"
        },
        {
          key: "craft",
          polygon: "all"
        },
        {
          key: "golf",
          polygon: "all"
        },
        {
          key: "indoor",
          polygon: "all"
        }
      ];
    }
  });

  // site/node_modules/osm-polygon-features/index.js
  var require_osm_polygon_features = __commonJS({
    "site/node_modules/osm-polygon-features/index.js"(exports, module) {
      module.exports = require_polygon_features();
    }
  });

  // site/node_modules/osmtogeojson/index.js
  var require_osmtogeojson = __commonJS({
    "site/node_modules/osmtogeojson/index.js"(exports, module) {
      var _ = require_lodash_custom();
      var rewind = require_geojson_rewind();
      var polygonFeatures = {};
      require_osm_polygon_features().forEach(function(tags) {
        if (tags.polygon === "all")
          polygonFeatures[tags.key] = true;
        else {
          var list = tags.polygon === "whitelist" ? "included_values" : "excluded_values", tagValuesObj = {};
          tags.values.forEach(function(value) {
            tagValuesObj[value] = true;
          });
          polygonFeatures[tags.key] = {};
          polygonFeatures[tags.key][list] = tagValuesObj;
        }
      });
      function default_deduplicator(objectA, objectB) {
        if ((objectA.version || objectB.version) && objectA.version !== objectB.version) {
          return (+objectA.version || 0) > (+objectB.version || 0) ? objectA : objectB;
        }
        return _.merge(objectA, objectB);
      }
      var osmtogeojson = {};
      osmtogeojson = function(data, options, featureCallback) {
        options = _.merge({
          verbose: false,
          flatProperties: true,
          uninterestingTags: {
            "source": true,
            "source_ref": true,
            "source:ref": true,
            "history": true,
            "attribution": true,
            "created_by": true,
            "tiger:county": true,
            "tiger:tlid": true,
            "tiger:upload_uuid": true
          },
          polygonFeatures,
          deduplicator: default_deduplicator
        }, options);
        var result;
        if (typeof XMLDocument !== "undefined" && data instanceof XMLDocument || typeof XMLDocument === "undefined" && data.childNodes)
          result = _osmXML2geoJSON(data);
        else
          result = _overpassJSON2geoJSON(data);
        return result;
        function _overpassJSON2geoJSON(json) {
          var nodes = new Array();
          var ways = new Array();
          var rels = new Array();
          function centerGeometry(object) {
            var pseudoNode = _.clone(object);
            pseudoNode.lat = object.center.lat;
            pseudoNode.lon = object.center.lon;
            pseudoNode.__is_center_placeholder = true;
            nodes.push(pseudoNode);
          }
          function boundsGeometry(object) {
            var pseudoWay = _.clone(object);
            pseudoWay.nodes = [];
            function addPseudoNode(lat, lon, i2) {
              var pseudoNode = {
                type: "node",
                id: "_" + pseudoWay.type + "/" + pseudoWay.id + "bounds" + i2,
                lat,
                lon
              };
              pseudoWay.nodes.push(pseudoNode.id);
              nodes.push(pseudoNode);
            }
            addPseudoNode(pseudoWay.bounds.minlat, pseudoWay.bounds.minlon, 1);
            addPseudoNode(pseudoWay.bounds.maxlat, pseudoWay.bounds.minlon, 2);
            addPseudoNode(pseudoWay.bounds.maxlat, pseudoWay.bounds.maxlon, 3);
            addPseudoNode(pseudoWay.bounds.minlat, pseudoWay.bounds.maxlon, 4);
            pseudoWay.nodes.push(pseudoWay.nodes[0]);
            pseudoWay.__is_bounds_placeholder = true;
            ways.push(pseudoWay);
          }
          function fullGeometryWay(way2) {
            function addFullGeometryNode(lat, lon, id) {
              var geometryNode = {
                type: "node",
                id,
                lat,
                lon
              };
              nodes.push(geometryNode);
            }
            if (!_.isArray(way2.nodes)) {
              way2.nodes = way2.geometry.map(function(nd) {
                if (nd !== null)
                  return "_anonymous@" + nd.lat + "/" + nd.lon;
                else
                  return "_anonymous@unknown_location";
              });
            }
            way2.geometry.forEach(function(nd, i2) {
              if (nd) {
                addFullGeometryNode(nd.lat, nd.lon, way2.nodes[i2]);
              }
            });
          }
          function fullGeometryRelation(rel2) {
            function addFullGeometryNode(lat, lon, id) {
              var geometryNode = {
                type: "node",
                id,
                lat,
                lon
              };
              nodes.push(geometryNode);
            }
            function addFullGeometryWay(geometry, id) {
              if (ways.some(function(way2) {
                return way2.type == "way" && way2.id == id;
              }))
                return;
              var geometryWay = {
                type: "way",
                id,
                nodes: []
              };
              function addFullGeometryWayPseudoNode(lat, lon) {
                var geometryPseudoNode = {
                  type: "node",
                  id: "_anonymous@" + lat + "/" + lon,
                  lat,
                  lon
                };
                geometryWay.nodes.push(geometryPseudoNode.id);
                nodes.push(geometryPseudoNode);
              }
              geometry.forEach(function(nd) {
                if (nd) {
                  addFullGeometryWayPseudoNode(nd.lat, nd.lon);
                } else {
                  geometryWay.nodes.push(void 0);
                }
              });
              ways.push(geometryWay);
            }
            rel2.members.forEach(function(member, i2) {
              if (member.type == "node") {
                if (member.lat) {
                  addFullGeometryNode(member.lat, member.lon, member.ref);
                }
              } else if (member.type == "way") {
                if (member.geometry) {
                  member.ref = "_fullGeom" + member.ref;
                  addFullGeometryWay(member.geometry, member.ref);
                }
              }
            });
          }
          for (var i = 0; i < json.elements.length; i++) {
            switch (json.elements[i].type) {
              case "node":
                var node = json.elements[i];
                nodes.push(node);
                break;
              case "way":
                var way = _.clone(json.elements[i]);
                way.nodes = _.clone(way.nodes);
                ways.push(way);
                if (way.center)
                  centerGeometry(way);
                if (way.geometry)
                  fullGeometryWay(way);
                else if (way.bounds)
                  boundsGeometry(way);
                break;
              case "relation":
                var rel = _.clone(json.elements[i]);
                rel.members = _.clone(rel.members);
                rels.push(rel);
                var has_full_geometry = rel.members && rel.members.some(function(member) {
                  return member.type == "node" && member.lat || member.type == "way" && member.geometry && member.geometry.length > 0;
                });
                if (rel.center)
                  centerGeometry(rel);
                if (has_full_geometry)
                  fullGeometryRelation(rel);
                else if (rel.bounds)
                  boundsGeometry(rel);
                break;
              default:
            }
          }
          return _convert2geoJSON(nodes, ways, rels);
        }
        function _osmXML2geoJSON(xml) {
          var nodes = new Array();
          var ways = new Array();
          var rels = new Array();
          function copy_attribute(x, o, attr) {
            if (x.hasAttribute(attr))
              o[attr] = x.getAttribute(attr);
          }
          function centerGeometry(object, centroid2) {
            var pseudoNode = _.clone(object);
            copy_attribute(centroid2, pseudoNode, "lat");
            copy_attribute(centroid2, pseudoNode, "lon");
            pseudoNode.__is_center_placeholder = true;
            nodes.push(pseudoNode);
          }
          function boundsGeometry(object, bounds2) {
            var pseudoWay = _.clone(object);
            pseudoWay.nodes = [];
            function addPseudoNode(lat, lon, i) {
              var pseudoNode = {
                type: "node",
                id: "_" + pseudoWay.type + "/" + pseudoWay.id + "bounds" + i,
                lat,
                lon
              };
              pseudoWay.nodes.push(pseudoNode.id);
              nodes.push(pseudoNode);
            }
            addPseudoNode(bounds2.getAttribute("minlat"), bounds2.getAttribute("minlon"), 1);
            addPseudoNode(bounds2.getAttribute("maxlat"), bounds2.getAttribute("minlon"), 2);
            addPseudoNode(bounds2.getAttribute("maxlat"), bounds2.getAttribute("maxlon"), 3);
            addPseudoNode(bounds2.getAttribute("minlat"), bounds2.getAttribute("maxlon"), 4);
            pseudoWay.nodes.push(pseudoWay.nodes[0]);
            pseudoWay.__is_bounds_placeholder = true;
            ways.push(pseudoWay);
          }
          function fullGeometryWay(way, nds) {
            function addFullGeometryNode(lat, lon, id) {
              var geometryNode = {
                type: "node",
                id,
                lat,
                lon
              };
              nodes.push(geometryNode);
              return geometryNode.id;
            }
            if (!_.isArray(way.nodes)) {
              way.nodes = [];
              _.each(nds, function(nd, i) {
                way.nodes.push("_anonymous@" + nd.getAttribute("lat") + "/" + nd.getAttribute("lon"));
              });
            }
            _.each(nds, function(nd, i) {
              if (nd.getAttribute("lat")) {
                addFullGeometryNode(nd.getAttribute("lat"), nd.getAttribute("lon"), way.nodes[i]);
              }
            });
          }
          function fullGeometryRelation(rel, members) {
            function addFullGeometryNode(lat, lon, id) {
              var geometryNode = {
                type: "node",
                id,
                lat,
                lon
              };
              nodes.push(geometryNode);
            }
            function addFullGeometryWay(nds, id) {
              if (ways.some(function(way) {
                return way.type == "way" && way.id == id;
              }))
                return;
              var geometryWay = {
                type: "way",
                id,
                nodes: []
              };
              function addFullGeometryWayPseudoNode(lat, lon) {
                var geometryPseudoNode = {
                  type: "node",
                  id: "_anonymous@" + lat + "/" + lon,
                  lat,
                  lon
                };
                geometryWay.nodes.push(geometryPseudoNode.id);
                nodes.push(geometryPseudoNode);
              }
              _.each(nds, function(nd) {
                if (nd.getAttribute("lat")) {
                  addFullGeometryWayPseudoNode(nd.getAttribute("lat"), nd.getAttribute("lon"));
                } else {
                  geometryWay.nodes.push(void 0);
                }
              });
              ways.push(geometryWay);
            }
            _.each(members, function(member, i) {
              if (rel.members[i].type == "node") {
                if (member.getAttribute("lat")) {
                  addFullGeometryNode(member.getAttribute("lat"), member.getAttribute("lon"), rel.members[i].ref);
                }
              } else if (rel.members[i].type == "way") {
                if (member.getElementsByTagName("nd").length > 0) {
                  rel.members[i].ref = "_fullGeom" + rel.members[i].ref;
                  addFullGeometryWay(member.getElementsByTagName("nd"), rel.members[i].ref);
                }
              }
            });
          }
          _.each(xml.getElementsByTagName("node"), function(node, i) {
            var tags = {};
            _.each(node.getElementsByTagName("tag"), function(tag) {
              tags[tag.getAttribute("k")] = tag.getAttribute("v");
            });
            var nodeObject = {
              "type": "node"
            };
            copy_attribute(node, nodeObject, "id");
            copy_attribute(node, nodeObject, "lat");
            copy_attribute(node, nodeObject, "lon");
            copy_attribute(node, nodeObject, "version");
            copy_attribute(node, nodeObject, "timestamp");
            copy_attribute(node, nodeObject, "changeset");
            copy_attribute(node, nodeObject, "uid");
            copy_attribute(node, nodeObject, "user");
            if (!_.isEmpty(tags))
              nodeObject.tags = tags;
            nodes.push(nodeObject);
          });
          var centroid, bounds;
          _.each(xml.getElementsByTagName("way"), function(way, i) {
            var tags = {};
            var wnodes = [];
            _.each(way.getElementsByTagName("tag"), function(tag) {
              tags[tag.getAttribute("k")] = tag.getAttribute("v");
            });
            var has_full_geometry = false;
            _.each(way.getElementsByTagName("nd"), function(nd, i2) {
              var id;
              if (id = nd.getAttribute("ref"))
                wnodes[i2] = id;
              if (!has_full_geometry && nd.getAttribute("lat"))
                has_full_geometry = true;
            });
            var wayObject = {
              "type": "way"
            };
            copy_attribute(way, wayObject, "id");
            copy_attribute(way, wayObject, "version");
            copy_attribute(way, wayObject, "timestamp");
            copy_attribute(way, wayObject, "changeset");
            copy_attribute(way, wayObject, "uid");
            copy_attribute(way, wayObject, "user");
            if (wnodes.length > 0)
              wayObject.nodes = wnodes;
            if (!_.isEmpty(tags))
              wayObject.tags = tags;
            if (centroid = way.getElementsByTagName("center")[0])
              centerGeometry(wayObject, centroid);
            if (has_full_geometry)
              fullGeometryWay(wayObject, way.getElementsByTagName("nd"));
            else if (bounds = way.getElementsByTagName("bounds")[0])
              boundsGeometry(wayObject, bounds);
            ways.push(wayObject);
          });
          _.each(xml.getElementsByTagName("relation"), function(relation, i) {
            var tags = {};
            var members = [];
            _.each(relation.getElementsByTagName("tag"), function(tag) {
              tags[tag.getAttribute("k")] = tag.getAttribute("v");
            });
            var has_full_geometry = false;
            _.each(relation.getElementsByTagName("member"), function(member, i2) {
              members[i2] = {};
              copy_attribute(member, members[i2], "ref");
              copy_attribute(member, members[i2], "role");
              copy_attribute(member, members[i2], "type");
              if (!has_full_geometry && (members[i2].type == "node" && member.getAttribute("lat")) || members[i2].type == "way" && member.getElementsByTagName("nd").length > 0)
                has_full_geometry = true;
            });
            var relObject = {
              "type": "relation"
            };
            copy_attribute(relation, relObject, "id");
            copy_attribute(relation, relObject, "version");
            copy_attribute(relation, relObject, "timestamp");
            copy_attribute(relation, relObject, "changeset");
            copy_attribute(relation, relObject, "uid");
            copy_attribute(relation, relObject, "user");
            if (members.length > 0)
              relObject.members = members;
            if (!_.isEmpty(tags))
              relObject.tags = tags;
            if (centroid = relation.getElementsByTagName("center")[0])
              centerGeometry(relObject, centroid);
            if (has_full_geometry)
              fullGeometryRelation(relObject, relation.getElementsByTagName("member"));
            else if (bounds = relation.getElementsByTagName("bounds")[0])
              boundsGeometry(relObject, bounds);
            rels.push(relObject);
          });
          return _convert2geoJSON(nodes, ways, rels);
        }
        function _convert2geoJSON(nodes, ways, rels) {
          function has_interesting_tags(t, ignore_tags) {
            if (typeof ignore_tags !== "object")
              ignore_tags = {};
            if (typeof options.uninterestingTags === "function")
              return !options.uninterestingTags(t, ignore_tags);
            for (var k in t)
              if (!(options.uninterestingTags[k] === true) && !(ignore_tags[k] === true || ignore_tags[k] === t[k]))
                return true;
            return false;
          }
          ;
          function build_meta_information(object) {
            var res = {
              "timestamp": object.timestamp,
              "version": object.version,
              "changeset": object.changeset,
              "user": object.user,
              "uid": object.uid
            };
            for (var k in res)
              if (res[k] === void 0)
                delete res[k];
            return res;
          }
          var nodeids = new Object();
          var poinids = new Object();
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (nodeids[node.id] !== void 0) {
              node = options.deduplicator(node, nodeids[node.id]);
            }
            nodeids[node.id] = node;
            if (typeof node.tags != "undefined" && has_interesting_tags(node.tags))
              poinids[node.id] = true;
          }
          for (var i = 0; i < rels.length; i++) {
            if (_.isArray(rels[i].members)) {
              for (var j = 0; j < rels[i].members.length; j++) {
                if (rels[i].members[j].type == "node")
                  poinids[rels[i].members[j].ref] = true;
              }
            }
          }
          var wayids = new Object();
          var waynids = new Object();
          for (var i = 0; i < ways.length; i++) {
            var way = ways[i];
            if (wayids[way.id]) {
              way = options.deduplicator(way, wayids[way.id]);
            }
            wayids[way.id] = way;
            if (_.isArray(way.nodes)) {
              for (var j = 0; j < way.nodes.length; j++) {
                if (typeof way.nodes[j] === "object")
                  continue;
                waynids[way.nodes[j]] = true;
                way.nodes[j] = nodeids[way.nodes[j]];
              }
            }
          }
          var pois = new Array();
          for (var id in nodeids) {
            var node = nodeids[id];
            if (!waynids[id] || poinids[id])
              pois.push(node);
          }
          var relids = new Array();
          for (var i = 0; i < rels.length; i++) {
            var rel = rels[i];
            if (relids[rel.id]) {
              rel = options.deduplicator(rel, relids[rel.id]);
            }
            relids[rel.id] = rel;
          }
          var relsmap = { node: {}, way: {}, relation: {} };
          for (var id in relids) {
            var rel = relids[id];
            if (!_.isArray(rel.members)) {
              if (options.verbose)
                console.warn("Relation", rel.type + "/" + rel.id, "ignored because it has no members");
              continue;
            }
            for (var j = 0; j < rel.members.length; j++) {
              var m_type = rel.members[j].type;
              var m_ref = rel.members[j].ref;
              if (typeof m_ref !== "number") {
                m_ref = m_ref.replace("_fullGeom", "");
              }
              if (!relsmap[m_type]) {
                if (options.verbose)
                  console.warn("Relation", rel.type + "/" + rel.id, "member", m_type + "/" + m_ref, "ignored because it has an invalid type");
                continue;
              }
              if (typeof relsmap[m_type][m_ref] === "undefined")
                relsmap[m_type][m_ref] = [];
              relsmap[m_type][m_ref].push({
                "role": rel.members[j].role,
                "rel": rel.id,
                "reltags": rel.tags
              });
            }
          }
          var geojson;
          var geojsonnodes = [];
          for (i = 0; i < pois.length; i++) {
            if (typeof pois[i].lon == "undefined" || typeof pois[i].lat == "undefined") {
              if (options.verbose)
                console.warn("POI", pois[i].type + "/" + pois[i].id, "ignored because it lacks coordinates");
              continue;
            }
            var feature = {
              "type": "Feature",
              "id": pois[i].type + "/" + pois[i].id,
              "properties": {
                "type": pois[i].type,
                "id": pois[i].id,
                "tags": pois[i].tags || {},
                "relations": relsmap["node"][pois[i].id] || [],
                "meta": build_meta_information(pois[i])
              },
              "geometry": {
                "type": "Point",
                "coordinates": [+pois[i].lon, +pois[i].lat]
              }
            };
            if (pois[i].__is_center_placeholder)
              feature.properties["geometry"] = "center";
            if (!featureCallback)
              geojsonnodes.push(feature);
            else
              featureCallback(feature);
          }
          var geojsonlines = [];
          var geojsonpolygons = [];
          for (var i = 0; i < rels.length; i++) {
            if (relids[rels[i].id] !== rels[i]) {
              continue;
            }
            if (typeof rels[i].tags != "undefined" && (rels[i].tags["type"] == "route" || rels[i].tags["type"] == "waterway")) {
              let construct_multilinestring2 = function(rel2) {
                var is_tainted = false;
                var members;
                members = rel2.members.filter(function(m) {
                  return m.type === "way";
                });
                members = members.map(function(m) {
                  var way2 = wayids[m.ref];
                  if (way2 === void 0 || way2.nodes === void 0) {
                    if (options.verbose)
                      console.warn("Route " + rel2.type + "/" + rel2.id, "tainted by a missing or incomplete  way", m.type + "/" + m.ref);
                    is_tainted = true;
                    return;
                  }
                  return {
                    id: m.ref,
                    role: m.role,
                    way: way2,
                    nodes: way2.nodes.filter(function(n) {
                      if (n !== void 0)
                        return true;
                      is_tainted = true;
                      if (options.verbose)
                        console.warn("Route", rel2.type + "/" + rel2.id, "tainted by a way", m.type + "/" + m.ref, "with a missing node");
                      return false;
                    })
                  };
                });
                members = _.compact(members);
                var linestrings;
                linestrings = join(members);
                var coords2 = [];
                coords2 = _.compact(linestrings.map(function(linestring) {
                  return _.compact(linestring.map(function(node2) {
                    return [+node2.lon, +node2.lat];
                  }));
                }));
                if (coords2.length == 0) {
                  if (options.verbose)
                    console.warn("Route", rel2.type + "/" + rel2.id, "contains no coordinates");
                  return false;
                }
                var feature2 = {
                  "type": "Feature",
                  "id": rel2.type + "/" + rel2.id,
                  "properties": {
                    "type": rel2.type,
                    "id": rel2.id,
                    "tags": rel2.tags || {},
                    "relations": relsmap[rel2.type][rel2.id] || [],
                    "meta": build_meta_information(rel2)
                  },
                  "geometry": {
                    "type": coords2.length === 1 ? "LineString" : "MultiLineString",
                    "coordinates": coords2.length === 1 ? coords2[0] : coords2
                  }
                };
                if (is_tainted) {
                  if (options.verbose)
                    console.warn("Route", rel2.type + "/" + rel2.id, "is tainted");
                  feature2.properties["tainted"] = true;
                }
                return feature2;
              };
              var construct_multilinestring = construct_multilinestring2;
              if (!_.isArray(rels[i].members)) {
                if (options.verbose)
                  console.warn("Route", rels[i].type + "/" + rels[i].id, "ignored because it has no members");
                continue;
              }
              rels[i].members.forEach(function(m) {
                if (wayids[m.ref] && !has_interesting_tags(wayids[m.ref].tags))
                  wayids[m.ref].is_skippablerelationmember = true;
              });
              feature = construct_multilinestring2(rels[i]);
              if (feature === false) {
                if (options.verbose)
                  console.warn("Route relation", rels[i].type + "/" + rels[i].id, "ignored because it has invalid geometry");
                continue;
              }
              if (!featureCallback)
                geojsonpolygons.push(feature);
              else
                featureCallback(rewind(feature));
            }
            if (typeof rels[i].tags != "undefined" && (rels[i].tags["type"] == "multipolygon" || rels[i].tags["type"] == "boundary")) {
              let construct_multipolygon2 = function(tag_object, rel2) {
                var is_tainted = false;
                var mp_geometry = simple_mp ? "way" : "relation", mp_id = typeof tag_object.id === "number" ? tag_object.id : +tag_object.id.replace("_fullGeom", "");
                var members;
                members = rel2.members.filter(function(m) {
                  return m.type === "way";
                });
                members = members.map(function(m) {
                  var way2 = wayids[m.ref];
                  if (way2 === void 0 || way2.nodes === void 0) {
                    if (options.verbose)
                      console.warn("Multipolygon", mp_geometry + "/" + mp_id, "tainted by a missing or incomplete way", m.type + "/" + m.ref);
                    is_tainted = true;
                    return;
                  }
                  return {
                    id: m.ref,
                    role: m.role || "outer",
                    way: way2,
                    nodes: way2.nodes.filter(function(n) {
                      if (n !== void 0)
                        return true;
                      is_tainted = true;
                      if (options.verbose)
                        console.warn("Multipolygon", mp_geometry + "/" + mp_id, "tainted by a way", m.type + "/" + m.ref, "with a missing node");
                      return false;
                    })
                  };
                });
                members = _.compact(members);
                var outers, inners;
                outers = join(members.filter(function(m) {
                  return m.role === "outer";
                }));
                inners = join(members.filter(function(m) {
                  return m.role === "inner";
                }));
                var mp;
                function findOuter(inner) {
                  var polygonIntersectsPolygon = function(outer2, inner2) {
                    for (var i2 = 0; i2 < inner2.length; i2++)
                      if (pointInPolygon(inner2[i2], outer2))
                        return true;
                    return false;
                  };
                  var mapCoordinates = function(from) {
                    return from.map(function(n) {
                      return [+n.lat, +n.lon];
                    });
                  };
                  var pointInPolygon = function(point, polygon) {
                    var x = point[0], y = point[1], inside = false;
                    for (var i2 = 0, j3 = polygon.length - 1; i2 < polygon.length; j3 = i2++) {
                      var xi = polygon[i2][0], yi = polygon[i2][1];
                      var xj = polygon[j3][0], yj = polygon[j3][1];
                      var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
                      if (intersect)
                        inside = !inside;
                    }
                    return inside;
                  };
                  var o2, outer;
                  inner = mapCoordinates(inner);
                  for (o2 = 0; o2 < outers.length; o2++) {
                    outer = mapCoordinates(outers[o2]);
                    if (polygonIntersectsPolygon(outer, inner))
                      return o2;
                  }
                }
                mp = outers.map(function(o2) {
                  return [o2];
                });
                for (var j2 = 0; j2 < inners.length; j2++) {
                  var o = findOuter(inners[j2]);
                  if (o !== void 0)
                    mp[o].push(inners[j2]);
                  else if (options.verbose)
                    console.warn("Multipolygon", mp_geometry + "/" + mp_id, "contains an inner ring with no containing outer");
                  ;
                }
                var mp_coords = [];
                mp_coords = _.compact(mp.map(function(cluster) {
                  var cl = _.compact(cluster.map(function(ring) {
                    if (ring.length < 4) {
                      if (options.verbose)
                        console.warn("Multipolygon", mp_geometry + "/" + mp_id, "contains a ring with less than four nodes");
                      return;
                    }
                    return _.compact(ring.map(function(node2) {
                      return [+node2.lon, +node2.lat];
                    }));
                  }));
                  if (cl.length == 0) {
                    if (options.verbose)
                      console.warn("Multipolygon", mp_geometry + "/" + mp_id, "contains an empty ring cluster");
                    return;
                  }
                  return cl;
                }));
                if (mp_coords.length == 0) {
                  if (options.verbose)
                    console.warn("Multipolygon", mp_geometry + "/" + mp_id, "contains no coordinates");
                  return false;
                }
                var mp_type = "MultiPolygon";
                if (mp_coords.length === 1) {
                  mp_type = "Polygon";
                  mp_coords = mp_coords[0];
                }
                var feature2 = {
                  "type": "Feature",
                  "id": tag_object.type + "/" + mp_id,
                  "properties": {
                    "type": tag_object.type,
                    "id": mp_id,
                    "tags": tag_object.tags || {},
                    "relations": relsmap[tag_object.type][tag_object.id] || [],
                    "meta": build_meta_information(tag_object)
                  },
                  "geometry": {
                    "type": mp_type,
                    "coordinates": mp_coords
                  }
                };
                if (is_tainted) {
                  if (options.verbose)
                    console.warn("Multipolygon", mp_geometry + "/" + mp_id, "is tainted");
                  feature2.properties["tainted"] = true;
                }
                return feature2;
              };
              var construct_multipolygon = construct_multipolygon2;
              if (!_.isArray(rels[i].members)) {
                if (options.verbose)
                  console.warn("Multipolygon", rels[i].type + "/" + rels[i].id, "ignored because it has no members");
                continue;
              }
              var outer_count = 0;
              for (var j = 0; j < rels[i].members.length; j++)
                if (rels[i].members[j].role == "outer")
                  outer_count++;
                else if (options.verbose && rels[i].members[j].role != "inner")
                  console.warn("Multipolygon", rels[i].type + "/" + rels[i].id, "member", rels[i].members[j].type + "/" + rels[i].members[j].ref, 'ignored because it has an invalid role: "' + rels[i].members[j].role + '"');
              rels[i].members.forEach(function(m) {
                if (wayids[m.ref]) {
                  if (m.role === "outer" && !has_interesting_tags(wayids[m.ref].tags, rels[i].tags))
                    wayids[m.ref].is_skippablerelationmember = true;
                  if (m.role === "inner" && !has_interesting_tags(wayids[m.ref].tags))
                    wayids[m.ref].is_skippablerelationmember = true;
                }
              });
              if (outer_count == 0) {
                if (options.verbose)
                  console.warn("Multipolygon relation", rels[i].type + "/" + rels[i].id, "ignored because it has no outer ways");
                continue;
              }
              var simple_mp = false;
              if (outer_count == 1 && !has_interesting_tags(rels[i].tags, { "type": true }))
                simple_mp = true;
              var feature = null;
              if (!simple_mp) {
                feature = construct_multipolygon2(rels[i], rels[i]);
              } else {
                var outer_way = rels[i].members.filter(function(m) {
                  return m.role === "outer";
                })[0];
                outer_way = wayids[outer_way.ref];
                if (outer_way === void 0) {
                  if (options.verbose)
                    console.warn("Multipolygon relation", rels[i].type + "/" + rels[i].id, "ignored because outer way", outer_way.type + "/" + outer_way.ref, "is missing");
                  continue;
                }
                outer_way.is_skippablerelationmember = true;
                feature = construct_multipolygon2(outer_way, rels[i]);
              }
              if (feature === false) {
                if (options.verbose)
                  console.warn("Multipolygon relation", rels[i].type + "/" + rels[i].id, "ignored because it has invalid geometry");
                continue;
              }
              if (!featureCallback)
                geojsonpolygons.push(feature);
              else
                featureCallback(rewind(feature));
            }
          }
          for (var i = 0; i < ways.length; i++) {
            if (wayids[ways[i].id] !== ways[i]) {
              continue;
            }
            if (!_.isArray(ways[i].nodes)) {
              if (options.verbose)
                console.warn("Way", ways[i].type + "/" + ways[i].id, "ignored because it has no nodes");
              continue;
            }
            if (ways[i].is_skippablerelationmember)
              continue;
            if (typeof ways[i].id !== "number") {
              ways[i].id = +ways[i].id.replace("_fullGeom", "");
            }
            ways[i].tainted = false;
            ways[i].hidden = false;
            var coords = new Array();
            for (j = 0; j < ways[i].nodes.length; j++) {
              if (typeof ways[i].nodes[j] == "object")
                coords.push([+ways[i].nodes[j].lon, +ways[i].nodes[j].lat]);
              else {
                if (options.verbose)
                  console.warn("Way", ways[i].type + "/" + ways[i].id, "is tainted by an invalid node");
                ways[i].tainted = true;
              }
            }
            if (coords.length <= 1) {
              if (options.verbose)
                console.warn("Way", ways[i].type + "/" + ways[i].id, "ignored because it contains too few nodes");
              continue;
            }
            var way_type = "LineString";
            if (typeof ways[i].nodes[0] != "undefined" && typeof ways[i].nodes[ways[i].nodes.length - 1] != "undefined" && ways[i].nodes[0].id === ways[i].nodes[ways[i].nodes.length - 1].id && (typeof ways[i].tags != "undefined" && _isPolygonFeature(ways[i].tags) || ways[i].__is_bounds_placeholder)) {
              way_type = "Polygon";
              coords = [coords];
            }
            var feature = {
              "type": "Feature",
              "id": ways[i].type + "/" + ways[i].id,
              "properties": {
                "type": ways[i].type,
                "id": ways[i].id,
                "tags": ways[i].tags || {},
                "relations": relsmap["way"][ways[i].id] || [],
                "meta": build_meta_information(ways[i])
              },
              "geometry": {
                "type": way_type,
                "coordinates": coords
              }
            };
            if (ways[i].tainted) {
              if (options.verbose)
                console.warn("Way", ways[i].type + "/" + ways[i].id, "is tainted");
              feature.properties["tainted"] = true;
            }
            if (ways[i].__is_bounds_placeholder)
              feature.properties["geometry"] = "bounds";
            if (!featureCallback) {
              if (way_type == "LineString")
                geojsonlines.push(feature);
              else
                geojsonpolygons.push(feature);
            } else {
              featureCallback(rewind(feature));
            }
          }
          if (featureCallback)
            return true;
          geojson = {
            "type": "FeatureCollection",
            "features": []
          };
          geojson.features = geojson.features.concat(geojsonpolygons);
          geojson.features = geojson.features.concat(geojsonlines);
          geojson.features = geojson.features.concat(geojsonnodes);
          if (options.flatProperties) {
            geojson.features.forEach(function(f) {
              f.properties = _.merge(f.properties.meta, f.properties.tags, { id: f.properties.type + "/" + f.properties.id });
            });
          }
          geojson = rewind(geojson);
          return geojson;
        }
        function _isPolygonFeature(tags) {
          var polygonFeatures2 = options.polygonFeatures;
          if (typeof polygonFeatures2 === "function")
            return polygonFeatures2(tags);
          if (tags["area"] === "no")
            return false;
          for (var key in tags) {
            var val = tags[key];
            var pfk = polygonFeatures2[key];
            if (typeof pfk === "undefined")
              continue;
            if (val === "no")
              continue;
            if (pfk === true)
              return true;
            if (pfk.included_values && pfk.included_values[val] === true)
              return true;
            if (pfk.excluded_values && pfk.excluded_values[val] !== true)
              return true;
          }
          return false;
        }
      };
      function join(ways) {
        var _first = function(arr) {
          return arr[0];
        };
        var _last = function(arr) {
          return arr[arr.length - 1];
        };
        var _fitTogether = function(n1, n2) {
          return n1 !== void 0 && n2 !== void 0 && n1.id === n2.id;
        };
        var joined = [], current, first, last, i, how, what;
        while (ways.length) {
          current = ways.pop().nodes.slice();
          joined.push(current);
          while (ways.length && !_fitTogether(_first(current), _last(current))) {
            first = _first(current);
            last = _last(current);
            for (i = 0; i < ways.length; i++) {
              what = ways[i].nodes;
              if (_fitTogether(last, _first(what))) {
                how = current.push;
                what = what.slice(1);
                break;
              } else if (_fitTogether(last, _last(what))) {
                how = current.push;
                what = what.slice(0, -1).reverse();
                break;
              } else if (_fitTogether(first, _last(what))) {
                how = current.unshift;
                what = what.slice(0, -1);
                break;
              } else if (_fitTogether(first, _first(what))) {
                how = current.unshift;
                what = what.slice(1).reverse();
                break;
              } else {
                what = how = null;
              }
            }
            if (!what)
              break;
            ways.splice(i, 1);
            how.apply(current, what);
          }
        }
        return joined;
      }
      osmtogeojson.toGeojson = osmtogeojson;
      module.exports = osmtogeojson;
    }
  });

  // ns-hugo:/__w/map-kerala/map-kerala/site/assets/utils.js
  var require_utils = __commonJS({
    "ns-hugo:/__w/map-kerala/map-kerala/site/assets/utils.js"(exports, module) {
      var fetchJSONWithUrlSearchParams = (url, objectWithData) => {
        const params = new URLSearchParams();
        Object.keys(objectWithData).forEach((key) => {
          params.append(key, objectWithData[key]);
        });
        return fetch(url, {
          method: "POST",
          body: params,
          cors: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }).then((res) => res.json());
      };
      var isEmptyObject = (obj) => Object.keys(obj).length === 0;
      module.exports = {
        fetchJSONWithUrlSearchParams,
        isEmptyObject
      };
    }
  });

  // ns-hugo:/__w/map-kerala/map-kerala/site/assets/map-utils.js
  var require_map_utils = __commonJS({
    "ns-hugo:/__w/map-kerala/map-kerala/site/assets/map-utils.js"(exports, module) {
      var osmtogeojson = require_osmtogeojson();
      var L2 = require_leaflet_src();
      var { QUERIES } = require_constants();
      var { OVERPASS_URL } = require_constants();
      var { fetchJSONWithUrlSearchParams, isEmptyObject } = require_utils();
      var mapDataStore = {};
      var getQuery = (qid, feature) => {
        if (feature === "Boundaries")
          return `[out:json] [timeout:500];
                 relation[wikidata=${qid}];
                 out geom;`;
        return `[out:json][timeout:500];
            (area["wikidata"="${qid}"];nwr(area)[${QUERIES[feature]}];);
            (._;>;);
            out geom;`;
      };
      var fetchAndStore = (qid, feature) => __async(exports, null, function* () {
        const query = getQuery(qid, feature);
        return fetchJSONWithUrlSearchParams(OVERPASS_URL, { data: query }).then((data) => {
          const geojson = osmtogeojson(data);
          const mapLayer = L2.geoJSON(geojson, { color: "blue" });
          if (isEmptyObject(mapLayer.getBounds())) {
            mapDataStore[`${qid}#${feature}`] = {
              geojson: "USELESS",
              mapLayer: "USELESS",
              location: "USELESS"
            };
          } else {
            const location = mapLayer.getBounds().getCenter();
            mapDataStore[`${qid}#${feature}`] = {
              geojson,
              mapLayer,
              location
            };
          }
        });
      });
      var expect = (qid, feature) => __async(exports, null, function* () {
        if (available(qid, feature)) {
          return true;
        } else {
          return fetchAndStore(qid, feature);
        }
      });
      var available = (qid, feature) => mapDataStore.hasOwnProperty(`${qid}#${feature}`);
      var expectSearch = () => __async(exports, null, function* () {
        if (mapDataStore.hasOwnProperty("overview"))
          return;
        return fetch("/data.json").then((res) => res.json()).then((data) => mapDataStore.overview = data).then(() => createOverview());
      });
      var createOverview = () => {
        if (mapDataStore.hasOwnProperty("byQid"))
          return;
        mapDataStore.byQid = {};
        for (const district of Object.keys(mapDataStore.overview)) {
          for (const el of mapDataStore.overview[district]) {
            mapDataStore.byQid[el.qid] = __spreadProps(__spreadValues({}, el), { district });
          }
        }
      };
      var getLayer = (qid, feature) => mapDataStore[`${qid}#${feature}`].mapLayer;
      var getGeojson = (qid, feature) => mapDataStore[`${qid}#${feature}`].geojson;
      var getOverview = (qid) => mapDataStore.byQid[qid];
      var getAllOverview = () => mapDataStore.byQid;
      var isValidQid = (maybeQid) => mapDataStore.byQid.hasOwnProperty(maybeQid);
      module.exports = {
        expect,
        available,
        getLayer,
        getOverview,
        getGeojson,
        getAllOverview,
        expectSearch,
        isValidQid
      };
    }
  });

  // ns-hugo:/__w/map-kerala/map-kerala/site/assets/wiki-utils.js
  var require_wiki_utils = __commonJS({
    "ns-hugo:/__w/map-kerala/map-kerala/site/assets/wiki-utils.js"(exports, module) {
      var wikiStore = {
        wd: {},
        wp: {}
      };
      var wikiReqHeaders = new Headers({
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json",
        "Api-User-Agent": "https://map.opendatakerala.org/about/",
        Origin: "*"
      });
      var WIKIDATA_API = "https://www.wikidata.org/w/api.php";
      var WIKIDATA_QUERY_BASE = [
        "action=wbgetentities",
        "format=json",
        "props=sitelinks",
        "sitefilter=enwiki|mlwiki",
        "origin=*"
      ].join("&");
      var EN_WIKI_API = "https://en.wikipedia.org/api/rest_v1";
      var ML_WIKI_API = "https://ml.wikipedia.org/api/rest_v1";
      var fetchWikipediaPageByQid = (qid) => {
        return fetch(`${WIKIDATA_API}?${WIKIDATA_QUERY_BASE}&ids=${qid}`, {
          headers: wikiReqHeaders
        }).then((res) => res.json()).then((data) => {
          wikiStore.wd[qid] = data;
        }).then(() => hydrateWiki(qid));
      };
      var getAPI = (wikiname) => ({ mlwiki: ML_WIKI_API, enwiki: EN_WIKI_API })[wikiname];
      var hydrateWiki = (qid) => __async(exports, null, function* () {
        const siteLinks = wikiStore.wd[qid].entities[qid].sitelinks;
        wikiStore.wp[qid] = {};
        const requests = [];
        ["mlwiki", "enwiki"].forEach((wiki) => {
          if (!siteLinks.hasOwnProperty(wiki))
            return;
          const req = fetch(`${getAPI(wiki)}/page/summary/${siteLinks[wiki].title}?origin=*`, { headers: wikiReqHeaders }).then((res) => res.json()).then((data) => {
            wikiStore.wp[qid][wiki] = data;
          });
          requests.push(req);
        });
        yield Promise.all(requests);
      });
      var retrieveWikiPage = (qid) => {
        return wikiStore.wp[qid];
      };
      module.exports = {
        fetchWikipediaPageByQid,
        retrieveWikiPage
      };
    }
  });

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports) {
      var L2 = require_leaflet_src();
      var addIndiaBoundaries = require_india_boundaries();
      var { KERALA_BOUNDS, MIN_ZOOM } = require_constants();
      var {
        expect,
        available,
        getLayer,
        getOverview,
        expectSearch,
        getAllOverview,
        isValidQid,
        getGeojson
      } = require_map_utils();
      var { fetchWikipediaPageByQid, retrieveWikiPage } = require_wiki_utils();
      var map = L2.map("map", {
        minZoom: MIN_ZOOM,
        maxBoundsViscosity: 0.9
      }).fitBounds(KERALA_BOUNDS);
      L2.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxBounds: KERALA_BOUNDS,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      addIndiaBoundaries(map);
      var state = {
        qid: document.querySelector("[data-mk-key=qid]").textContent.trim(),
        feature: "Boundaries",
        len: document.querySelector("[data-mk-key=len]").textContent.trim(),
        displayedLayers: [],
        searchSetup: false
      };
      var setQid = (qid) => {
        setQidExceptUrlChange(qid);
        urlChangeRequired();
      };
      var setQidExceptUrlChange = (qid) => {
        state.qid = qid;
        const { len, lml, urlpath, district } = getOverview(qid);
        state.len = len;
        state.lml = lml;
        state.district = district;
        state.urlpath = urlpath;
        mapChangeRequired();
        wikiChangeRequired();
        skeletonChangeRequired();
      };
      var setFeature = (feature) => {
        state.feature = feature;
        configureButton = document.getElementById("configuration");
        configureButton.textContent = feature;
        mapChangeRequired();
      };
      var startJSONDownload = (filename, data) => {
        const string = JSON.stringify(data);
        const bytes = new TextEncoder().encode(string);
        const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      };
      var downloadButton = document.querySelector("#download");
      downloadButton.addEventListener("click", () => {
        startJSONDownload(`${state.len} - ${state.feature}.geojson`, getGeojson(state.qid, state.feature));
      });
      var disableDownload = () => downloadButton.disabled = true;
      var enableDownload = () => downloadButton.disabled = false;
      var spinner = document.querySelector("[role=status]");
      var showSpinner = () => spinner.style.visibility = "visible";
      var hideSpinner = () => spinner.style.visibility = "hidden";
      var showUselessWarning = () => alert("Sorry, no data available for that.");
      var mapChangeRequired = () => __async(exports, null, function* () {
        showSpinner();
        state.displayedLayers.forEach((oldLayer) => map.removeLayer(oldLayer));
        disableDownload();
        yield expect(state.qid, state.feature);
        if (!available(state.qid, state.feature))
          return;
        const layer = getLayer(state.qid, state.feature);
        if (layer === "USELESS") {
          hideSpinner();
          showUselessWarning();
        } else {
          state.displayedLayers = [layer];
          map.addLayer(layer);
          map.flyTo(layer.getBounds().getCenter(), 12);
          hideSpinner();
          enableDownload();
        }
      });
      var changeAll = (selector, content) => document.querySelectorAll(selector).forEach((el) => el.textContent = content);
      var skeletonChangeRequired = () => {
        changeAll("[data-mk-key=qid]", state.qid);
        changeAll("[data-mk-key=len]", state.len);
        changeAll("[data-mk-key=lml]", state.lml);
        changeAll("[data-mk-key=district]", state.district);
        document.querySelector("#district-link").href = `/${state.district.toLowerCase()}/`;
        document.querySelector("#lsg-link").href = `/${state.urlpath}/`;
        document.querySelector("#wikidata-link").href = `https://www.wikidata.org/wiki/${state.qid}`;
      };
      var urlChangeRequired = () => {
        window.history.pushState({ qid: state.qid }, "", `/${state.urlpath}/`);
      };
      var messages = {
        enwiki: `Read more on wikipedia`,
        mlwiki: `\u0D35\u0D3F\u0D15\u0D4D\u0D15\u0D3F\u0D2A\u0D40\u0D21\u0D3F\u0D2F\u0D2F\u0D3F\u0D32\u0D4D\u200D \u0D15\u0D42\u0D1F\u0D41\u0D24\u0D32\u0D4D\u200D \u0D35\u0D3E\u0D2F\u0D3F\u0D15\u0D4D\u0D15\u0D3E\u0D02`
      };
      var wikiChangeRequired = () => __async(exports, null, function* () {
        yield fetchWikipediaPageByQid(state.qid);
        const wp = retrieveWikiPage(state.qid);
        if (!wp)
          return;
        const extracts = ["mlwiki", "enwiki"].map((wiki) => {
          var _a, _b, _c;
          if (!wp[wiki])
            return;
          return `${wp[wiki].extract_html}<a target="_blank" href=${(_c = (_b = (_a = wp[wiki]) == null ? void 0 : _a.content_urls) == null ? void 0 : _b.desktop) == null ? void 0 : _c.page}>${messages[wiki]}</a>`;
        });
        document.querySelector("#wikipedia").innerHTML = extracts.join("");
      });
      var featureSelectionButtons = document.querySelectorAll("[data-mk-feature]");
      featureSelectionButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const feature = e.target.getAttribute("data-mk-feature");
          setFeature(feature);
        });
      });
      mapChangeRequired();
      wikiChangeRequired();
      var setUpSearch = () => {
        if (state.searchSetup)
          return;
        expectSearch().then(() => {
          const datalist = document.querySelector("#search-datalist");
          const overview = getAllOverview();
          for (const qid of Object.keys(overview)) {
            const opt = document.createElement("option");
            opt.value = qid;
            opt.label = `${overview[qid].len} (${overview[qid].district}) | ${overview[qid].lml}`;
            datalist.appendChild(opt);
          }
          state.searchSetup = true;
        });
      };
      document.querySelector("#search").addEventListener("click", setUpSearch);
      document.querySelector("#search").addEventListener("input", (e) => {
        const maybeQid = e.target.value;
        if (!isValidQid(maybeQid))
          return;
        e.target.value = "";
        setQid(maybeQid);
      });
      window.history.replaceState({ qid: state.qid }, "", window.location.pathname);
      window.addEventListener("popstate", (event) => {
        setQidExceptUrlChange(event.state.qid);
      });
    }
  });
  require_stdin();
})();
/* @preserve
 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash exports="node" include="clone,merge,isEmpty,isArray,compact,each" -d`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
