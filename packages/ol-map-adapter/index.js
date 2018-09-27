(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./node_modules/ol/source/ImageWMS.js'), require('./node_modules/ol/layer/Image.js'), require('./node_modules/ol/source/OSM.js'), require('./node_modules/ol/layer/Tile.js'), require('./node_modules/ol/geom/Point.js'), require('./node_modules/ol/Feature.js'), require('./node_modules/ol/proj.js'), require('./node_modules/ol/layer.js'), require('./node_modules/ol/source/Vector.js'), require('./node_modules/ol/Map.js'), require('./node_modules/ol/View.js')) :
    typeof define === 'function' && define.amd ? define(['exports', './node_modules/ol/source/ImageWMS.js', './node_modules/ol/layer/Image.js', './node_modules/ol/source/OSM.js', './node_modules/ol/layer/Tile.js', './node_modules/ol/geom/Point.js', './node_modules/ol/Feature.js', './node_modules/ol/proj.js', './node_modules/ol/layer.js', './node_modules/ol/source/Vector.js', './node_modules/ol/Map.js', './node_modules/ol/View.js'], factory) :
    (factory((global.OlMapAdapter = {}),global.ImageWMS,global.ImageLayer,global.OSM,global.TileLayer,global.Point,global.Feature,global.proj_js,global.layer_js,global.VectorSource,global.Map,global.View));
}(this, (function (exports,ImageWMS,ImageLayer,OSM,TileLayer,Point,Feature,proj_js,layer_js,VectorSource,Map,View) { 'use strict';

    ImageWMS = ImageWMS && ImageWMS.hasOwnProperty('default') ? ImageWMS['default'] : ImageWMS;
    ImageLayer = ImageLayer && ImageLayer.hasOwnProperty('default') ? ImageLayer['default'] : ImageLayer;
    OSM = OSM && OSM.hasOwnProperty('default') ? OSM['default'] : OSM;
    TileLayer = TileLayer && TileLayer.hasOwnProperty('default') ? TileLayer['default'] : TileLayer;
    Point = Point && Point.hasOwnProperty('default') ? Point['default'] : Point;
    Feature = Feature && Feature.hasOwnProperty('default') ? Feature['default'] : Feature;
    VectorSource = VectorSource && VectorSource.hasOwnProperty('default') ? VectorSource['default'] : VectorSource;
    Map = Map && Map.hasOwnProperty('default') ? Map['default'] : Map;
    View = View && View.hasOwnProperty('default') ? View['default'] : View;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var ID = 1;
    var ImageAdapter = /** @class */ (function () {
        function ImageAdapter() {
        }
        ImageAdapter.prototype.addLayer = function (options) {
            this.name = options.id || 'image-' + ID++;
            // const options = {
            //   maxResolution: item.maxResolution ? item.maxResolution : undefined,
            //   minResolution: item.minResolution ? item.minResolution : undefined,
            //   visible: item.visibility,
            //   opacity: item.transparency ? (1 - item.transparency / 100) : 1.0,
            // };
            var source = new ImageWMS({
                url: options.url,
                params: {
                    resource: options.layer_style_id,
                },
                ratio: 1,
                imageLoadFunction: function (image, src) {
                    var url = src.split('?')[0];
                    var query = src.split('?')[1];
                    var queryObject = queryToObject(query);
                    image.getImage().src = url
                        + '?resource=' + queryObject.resource
                        + '&extent=' + queryObject.BBOX
                        + '&size=' + queryObject.WIDTH + ',' + queryObject.HEIGHT
                        + '#' + Date.now(); // in-memory cache busting
                },
            });
            var layer = new ImageLayer({ source: source });
            return layer;
        };
        return ImageAdapter;
    }());
    // TODO: move to utils or rewrite with native js methods
    function queryToObject(str) {
        var dec = decodeURIComponent;
        var qp = str.split('&');
        var ret = {};
        var name;
        var val;
        for (var i = 0, l = qp.length, item = void 0; i < l; ++i) {
            item = qp[i];
            if (item.length) {
                var s = item.indexOf('=');
                if (s < 0) {
                    name = dec(item);
                    val = '';
                }
                else {
                    name = dec(item.slice(0, s));
                    val = dec(item.slice(s + 1));
                }
                if (typeof ret[name] === 'string') { // inline'd type check
                    ret[name] = [ret[name]];
                }
                if (Array.isArray(ret[name])) {
                    ret[name].push(val);
                }
                else {
                    ret[name] = val;
                }
            }
        }
        return ret; // Object
    }

    var domain;

    // This constructor is used to store event handlers. Instantiating this is
    // faster than explicitly calling `Object.create(null)` to get a "clean" empty
    // object (tested with v8 v4.9).
    function EventHandlers() {}
    EventHandlers.prototype = Object.create(null);

    function EventEmitter() {
      EventEmitter.init.call(this);
    }

    // nodejs oddity
    // require('events') === require('events').EventEmitter
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.usingDomains = false;

    EventEmitter.prototype.domain = undefined;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;

    EventEmitter.init = function() {
      this.domain = null;
      if (EventEmitter.usingDomains) {
        // if there is an active domain, then attach to it.
        if (domain.active && !(this instanceof domain.Domain)) ;
      }

      if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    };

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n;
      return this;
    };

    function $getMaxListeners(that) {
      if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };

    // These standalone emit* functions are used to optimize calling of event
    // handlers for fast cases because emit() itself often has a variable number of
    // arguments and can be deoptimized because of that. These functions always have
    // the same number of arguments and thus do not get deoptimized, so the code
    // inside them can execute faster.
    function emitNone(handler, isFn, self) {
      if (isFn)
        handler.call(self);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self);
      }
    }
    function emitOne(handler, isFn, self, arg1) {
      if (isFn)
        handler.call(self, arg1);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1);
      }
    }
    function emitTwo(handler, isFn, self, arg1, arg2) {
      if (isFn)
        handler.call(self, arg1, arg2);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2);
      }
    }
    function emitThree(handler, isFn, self, arg1, arg2, arg3) {
      if (isFn)
        handler.call(self, arg1, arg2, arg3);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2, arg3);
      }
    }

    function emitMany(handler, isFn, self, args) {
      if (isFn)
        handler.apply(self, args);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].apply(self, args);
      }
    }

    EventEmitter.prototype.emit = function emit(type) {
      var er, handler, len, args, i, events, domain;
      var doError = (type === 'error');

      events = this._events;
      if (events)
        doError = (doError && events.error == null);
      else if (!doError)
        return false;

      domain = this.domain;

      // If there is no 'error' event listener then throw.
      if (doError) {
        er = arguments[1];
        if (domain) {
          if (!er)
            er = new Error('Uncaught, unspecified "error" event');
          er.domainEmitter = this;
          er.domain = domain;
          er.domainThrown = false;
          domain.emit('error', er);
        } else if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
        return false;
      }

      handler = events[type];

      if (!handler)
        return false;

      var isFn = typeof handler === 'function';
      len = arguments.length;
      switch (len) {
        // fast cases
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        // slower
        default:
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }

      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = target._events;
      if (!events) {
        events = target._events = new EventHandlers();
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
          target.emit('newListener', type,
                      listener.listener ? listener.listener : listener);

          // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object
          events = target._events;
        }
        existing = events[type];
      }

      if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] = prepend ? [listener, existing] :
                                              [existing, listener];
        } else {
          // If we've already got an array, just append.
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        }

        // Check for listener leak
        if (!existing.warned) {
          m = $getMaxListeners(target);
          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            var w = new Error('Possible EventEmitter memory leak detected. ' +
                                existing.length + ' ' + type + ' listeners added. ' +
                                'Use emitter.setMaxListeners() to increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            emitWarning(w);
          }
        }
      }

      return target;
    }
    function emitWarning(e) {
      typeof console.warn === 'function' ? console.warn(e) : console.log(e);
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener =
        function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };

    function _onceWrap(target, type, listener) {
      var fired = false;
      function g() {
        target.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(target, arguments);
        }
      }
      g.listener = listener;
      return g;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener =
        function prependOnceListener(type, listener) {
          if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };

    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener =
        function removeListener(type, listener) {
          var list, events, position, i, originalListener;

          if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');

          events = this._events;
          if (!events)
            return this;

          list = events[type];
          if (!list)
            return this;

          if (list === listener || (list.listener && list.listener === listener)) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else {
              delete events[type];
              if (events.removeListener)
                this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length; i-- > 0;) {
              if (list[i] === listener ||
                  (list[i].listener && list[i].listener === listener)) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0)
              return this;

            if (list.length === 1) {
              list[0] = undefined;
              if (--this._eventsCount === 0) {
                this._events = new EventHandlers();
                return this;
              } else {
                delete events[type];
              }
            } else {
              spliceOne(list, position);
            }

            if (events.removeListener)
              this.emit('removeListener', type, originalListener || listener);
          }

          return this;
        };

    EventEmitter.prototype.removeAllListeners =
        function removeAllListeners(type) {
          var listeners, events;

          events = this._events;
          if (!events)
            return this;

          // not listening for removeListener, no need to emit
          if (!events.removeListener) {
            if (arguments.length === 0) {
              this._events = new EventHandlers();
              this._eventsCount = 0;
            } else if (events[type]) {
              if (--this._eventsCount === 0)
                this._events = new EventHandlers();
              else
                delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            for (var i = 0, key; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = new EventHandlers();
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners) {
            // LIFO order
            do {
              this.removeListener(type, listeners[listeners.length - 1]);
            } while (listeners[0]);
          }

          return this;
        };

    EventEmitter.prototype.listeners = function listeners(type) {
      var evlistener;
      var ret;
      var events = this._events;

      if (!events)
        ret = [];
      else {
        evlistener = events[type];
        if (!evlistener)
          ret = [];
        else if (typeof evlistener === 'function')
          ret = [evlistener.listener || evlistener];
        else
          ret = unwrapListeners(evlistener);
      }

      return ret;
    };

    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;

      if (events) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };

    // About 1.5x faster than the two-arg version of Array#splice().
    function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
      list.pop();
    }

    function arrayClone(arr, i) {
      var copy = new Array(i);
      while (i--)
        copy[i] = arr[i];
      return copy;
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }

    var OsmAdapter = /** @class */ (function () {
        function OsmAdapter() {
            this.name = 'osm';
        }
        OsmAdapter.prototype.addLayer = function (options) {
            var layer = new TileLayer({
                source: new OSM(),
            });
            return layer;
        };
        return OsmAdapter;
    }());

    var ID$1 = 1;
    var MarkerAdapter = /** @class */ (function () {
        function MarkerAdapter() {
        }
        MarkerAdapter.prototype.addLayer = function (options) {
            this.name = options.id || 'marker-' + ID$1++;
            var _a = options.latLng, lat = _a.lat, lng = _a.lng;
            var point = new Feature({
                geometry: new Point(proj_js.fromLonLat([lng, lat])),
            });
            console.log(point);
            // const icon = new Icon({
            //   color: '#4271AE',
            //   crossOrigin: 'anonymous',
            //   // src: 'data/dot.png'
            // });
            // point.setStyle(new Style({
            //   image: icon
            // }));
            var source = new VectorSource({
                features: [point]
            });
            var layer = new layer_js.Vector({
                source: source
            });
            return layer;
        };
        return MarkerAdapter;
    }());

    var OlMapAdapter = /** @class */ (function () {
        function OlMapAdapter() {
            this.displayProjection = 'EPSG:3857';
            this.lonlatProjection = 'EPSG:4326';
            this.emitter = new EventEmitter();
            this._layers = {};
            this._order = 0;
            this._length = 9999; // TODO: get real layers length count, after all registered
            this.DPI = 1000 / 39.37 / 0.28;
            this.IPM = 39.37;
        }
        // private _layers: {[name: string]: LayerMem} = {};
        // create(options: MapOptions = {target: 'map'}) {
        OlMapAdapter.prototype.create = function (options) {
            if (options === void 0) { options = { target: 'map' }; }
            this.options = Object.assign({}, options);
            var view = new View({
                center: [-9101767, 2822912],
                zoom: 14,
                projection: this.displayProjection,
            });
            var defOpt = {
                logo: false,
                controls: [],
                view: view,
                layers: [],
            };
            var mapInitOptions = __assign({}, defOpt, options);
            this.map = new Map(mapInitOptions);
            this._olView = this.map.getView();
            // olView.on('change:resolution', (evt) => {
            //   this.set('resolution', olView.getResolution());
            // });
            // olView.on('change:center', (evt) => {
            //   this.set('center', olView.getCenter());
            // });
            this._addMapListeners();
        };
        OlMapAdapter.prototype.getContainer = function () {
            return document.getElementById(this.options.target);
        };
        OlMapAdapter.prototype.onMapLoad = function (cb) {
            return new Promise(function (resolve) {
                resolve(cb && cb());
            });
        };
        OlMapAdapter.prototype.setCenter = function (latLng) {
            this._olView.setCenter(proj_js.fromLonLat(latLng));
        };
        OlMapAdapter.prototype.setZoom = function (zoom) {
            this._olView.setZoom(zoom);
        };
        OlMapAdapter.prototype.fit = function (e) {
            var extent = proj_js.transformExtent(e, this.lonlatProjection, this.displayProjection);
            this._olView.fit(extent);
        };
        OlMapAdapter.prototype.setRotation = function (angle) {
            this._olView.setRotation(angle);
        };
        OlMapAdapter.prototype.getLayerAdapter = function (name) {
            return OlMapAdapter.layerAdapters[name];
        };
        OlMapAdapter.prototype.getLayer = function (layerName) {
            return this._layers[layerName] !== undefined;
        };
        OlMapAdapter.prototype.getLayers = function () {
            return Object.keys(this._layers);
        };
        OlMapAdapter.prototype.isLayerOnTheMap = function (layerName) {
            var layerMem = this._layers[layerName];
            return layerMem.onMap;
        };
        OlMapAdapter.prototype.addLayer = function (adapterDef, options) {
            var adapterEngine;
            if (typeof adapterDef === 'string') {
                adapterEngine = this.getLayerAdapter(adapterDef);
            }
            if (adapterEngine) {
                var adapter = new adapterEngine(this.map, options);
                var layer = adapter.addLayer(options);
                var layerId = adapter.name;
                this._layers[layerId] = { layer: layer, order: options.order || this._order++, onMap: false };
                this._length++;
                return Promise.resolve(adapter);
            }
            return Promise.reject('No adapter');
        };
        OlMapAdapter.prototype.removeLayer = function (layerName) {
            // ignore
        };
        OlMapAdapter.prototype.showLayer = function (layerName) {
            this.toggleLayer(layerName, true);
        };
        OlMapAdapter.prototype.hideLayer = function (layerName) {
            this.toggleLayer(layerName, false);
        };
        OlMapAdapter.prototype.setLayerOpacity = function (layerName, value) {
            // ignore
        };
        OlMapAdapter.prototype.getScaleForResolution = function (res, mpu) {
            return parseFloat(res) * (mpu * this.IPM * this.DPI);
        };
        OlMapAdapter.prototype.getResolutionForScale = function (scale, mpu) {
            return parseFloat(scale) / (mpu * this.IPM * this.DPI);
        };
        OlMapAdapter.prototype.toggleLayer = function (layerName, status) {
            var _this = this;
            var action = function (source, l) {
                if (status) {
                    if (source instanceof Map) {
                        source.addLayer(l.layer);
                        l.layer.setZIndex(_this._length - l.order);
                    }
                }
                else {
                    source.removeLayer(l.layer);
                }
                l.onMap = status;
            };
            var layer = this._layers[layerName];
            if (layer && layer.onMap !== status) {
                action(this.map, layer);
            }
        };
        OlMapAdapter.prototype.addControl = function (controlDef, position) {
            // ignore
        };
        OlMapAdapter.prototype.onMapClick = function (evt) {
            var _a = proj_js.transform(evt.coordinate, this.displayProjection, this.lonlatProjection), lng = _a[0], lat = _a[1];
            var latLng = {
                lat: lat, lng: lng
            };
            this.emitter.emit('click', {
                latLng: latLng,
                pixel: { left: evt.pixel[0], top: evt.pixel[1] },
                source: evt
            });
        };
        OlMapAdapter.prototype._addMapListeners = function () {
            var _this = this;
            this.map.on('click', function (evt) {
                _this.onMapClick(evt);
            });
        };
        OlMapAdapter.layerAdapters = {
            IMAGE: ImageAdapter,
            // TILE: TileAdapter,
            // MVT: MvtAdapter,
            OSM: OsmAdapter,
            MARKER: MarkerAdapter
        };
        return OlMapAdapter;
    }());

    exports.OlMapAdapter = OlMapAdapter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
