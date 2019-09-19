/**
 * @module ngw-map
 */
import StrictEventEmitter from 'strict-event-emitter-types';
import { EventEmitter } from 'events';

import { fixUrlStr, deepmerge } from '@nextgis/utils';
import WebMap, {
  MapAdapter,
  ControlPositions,
  MapControls,
  WebMapEvents,
  LayerDef,
  MapClickEvent,
  LayerAdapter,
  PropertiesFilter
} from '@nextgis/webmap';
import NgwConnector, {
  ResourceItem,
  CancelablePromise,
  FeatureLayersIdentify
} from '@nextgis/ngw-connector';
import { QmsAdapterOptions } from '@nextgis/qms-kit';
import NgwKit, { NgwLayerOptions, ResourceAdapter, WebMapLayerItem } from '@nextgis/ngw-kit';
import { getIcon } from '@nextgis/icons';

import { onMapLoad } from './decorators';
import { appendNgwResources, prepareWebMapOptions, OPTIONS } from './utils';

import { NgwMapOptions, ControlOptions, NgwMapEvents, NgwLayers } from './interfaces';
import { Geometry, Feature, FeatureCollection } from 'geojson';

/**
 * Base class containing the logic of interaction WebMap with NextGIS services.
 *
 * @example
 * ```javascript
 * import NgwMap from '@nextgis/ngw-map';
 * import MapAdapter from '@nextgis/leaflet-map-adapter';
 * // styles are not included in the leaflet-map-adapter
 * import 'leaflet/dist/leaflet.css';
 *
 * const ngwMap = new NgwMap(new MapAdapter(), {
 *   target: 'map',
 *   qmsId: 487,
 *   baseUrl: 'https://demo.nextgis.com',
 *   webmapId: 3985
 * });
 * ```
 */
export class NgwMap<M = any, L = any, C = any, O = {}> extends WebMap<M, L, C, NgwMapEvents> {
  static utils = {
    ...WebMap.utils,
    ...NgwKit.utils,
    fixUrlStr,
    deepmerge
  };
  static decorators = { onMapLoad, ...WebMap.decorators };
  static getIcon = getIcon;

  readonly emitter: StrictEventEmitter<EventEmitter, NgwMapEvents> = new EventEmitter();

  options: NgwMapOptions<C> & O = {} as NgwMapOptions<C> & O;
  connector!: NgwConnector;

  protected _ngwLayers: NgwLayers = {};

  /**
   * @param mapAdapter #noapi
   * @param options
   */
  constructor(mapAdapter: MapAdapter, options: NgwMapOptions<C> & O) {
    super(prepareWebMapOptions(mapAdapter, options));
    if (options.connector) {
      this.connector = options.connector;
    }
    this.options = deepmerge(OPTIONS, options);
    this._createWebMap().then(() => {
      const container = this.getContainer();
      if (container) {
        container.classList.add('ngw-map-container');
      }
      this._addControls();
    });
  }

  /**
   * Pans and zooms the map to the initial position specified in the options
   */
  fit() {
    const { center, zoom, bounds } = this.options;
    if (center) {
      this.setCenter(center);
      if (zoom) {
        this.setZoom(zoom);
      }
    } else if (bounds) {
      this.fitBounds(bounds);
    }
  }

  /**
   * Organized addition to the map design and controls elements,
   * calling `control.onAdd(this.webMap.mapAdapter)`
   * @param control - object with onAdd and onRemove methods
   *                or a string value indicating the name of the control installed in the map adapter
   * @param position - position relative to the map angles
   * @param [options] - initialization parameters if the control is set as a string value
   *
   * @example
   * ```javascript
   * ngwMap.addControl(new CustomControl(), 'bottom-left');
   * ngwMap.addControl('ZOOM', 'top-right')
   * ```
   */
  @WebMap.decorators.onLoad<NgwMapEvents>('controls:create')
  async addControl<K extends keyof MapControls>(
    controlDef: K | C,
    position: ControlPositions,
    options?: MapControls[K]
  ) {
    return super.addControl(controlDef, position, options);
  }

  /**
   * Add any (style, vector, webmap) NGW layer by resource id.
   * @param options - set layer identification parameters and render method.
   * @param [adapterOptions] - parameters for the selected adapter
   *
   * @example
   * ```javascript
   * var ngwMap = new NgwMap({ baseUrl: 'https://demo.nextgis.com', target: 'map' });
   * // add raster layer resourceId is the style of 4004 layer
   * ngwMap.addNgwLayer({ resourceId: 4005 });
   * // add vector data from layer GEOJSON source
   * ngwMap.addNgwLayer({
   *   resourceId: 4038,
   *   adapter: 'GEOJSON',
   *   adapterOptions: { paint: { color: 'red' } }
   * });
   * ```
   */
  @onMapLoad()
  async addNgwLayer(options: NgwLayerOptions): Promise<ResourceAdapter | undefined> {
    if (!options.resourceId) {
      throw new Error('resourceId is required parameter to add NGW layer');
    }
    if (this.options.baseUrl) {
      try {
        const adapter = NgwKit.utils.addNgwLayer(
          options,
          this,
          this.options.baseUrl,
          this.connector
        );

        const layer = (await this.addLayer(adapter, {
          visibility: true,
          // TODO: all options into one object
          ...options,
          ...options.adapterOptions
        })) as ResourceAdapter;
        const id = layer && this.getLayerId(layer);
        if (layer && id) {
          this._ngwLayers[id] = { layer, resourceId: options.resourceId };

          if (layer.options.baseLayer) {
            const visibleLayerBaseLayer = this.getActiveBaseLayer();
            if (visibleLayerBaseLayer) {
              return layer;
            }
          }
        }

        return layer;
      } catch (er) {
        console.error("can't add ngw layer", er);
      }
    }
  }

  async getNgwLayerFeature<G extends Geometry | null = Geometry>(options: {
    resourceId: number;
    featureId: number;
  }): CancelablePromise<Feature<G>> {
    return NgwKit.utils.getNgwLayerFeature<G>({
      connector: this.connector,
      ...options
    });
  }

  async getNgwLayerFeatures<G extends Geometry | null = Geometry>(options: {
    resourceId: number;
    filter?: PropertiesFilter[];
  }): CancelablePromise<FeatureCollection<G>> {
    return NgwKit.utils.getNgwLayerFeatures({
      connector: this.connector,
      ...options
    });
  }

  async getIdentifyGeoJson(
    identify: FeatureLayersIdentify,
    multiple = false
  ): CancelablePromise<Feature | undefined> {
    return NgwKit.utils.getIdentifyGeoJson({
      identify,
      connector: this.connector,
      multiple
    });
  }

  async getNgwLayers(): Promise<NgwLayers> {
    await this.onLoad();
    return this._ngwLayers;
  }

  async getNgwLayerByResourceId(id: number): Promise<LayerAdapter | undefined> {
    for (const n in this._ngwLayers) {
      const mem = this._ngwLayers[n];
      if (mem.resourceId === id) {
        return mem && mem.layer;
      } else if (mem.layer.getIdentificationIds) {
        const ids = await mem.layer.getIdentificationIds();
        if (ids && ids.some(x => x === id)) {
          return mem.layer;
        }
      }
      if (mem.layer.getDependLayers) {
        const dependLayers = mem.layer.getDependLayers() as WebMapLayerItem[];
        const dependFit = dependLayers.find(x => {
          return x.item && x.item.parentId === id;
        });
        if (dependFit) {
          return dependFit.layer;
        }
      }
    }
  }

  /**
   * Move map to layer. If the layer is NGW resource, extent will be received from the server
   * @param layerDef
   *
   * @example
   * ```javascript
   * const ngwLayer = ngwMap.addNgwLayer({ id: 'ngw_layer_name', resourceId: 4005 });
   * ngwMap.zoomToLayer(ngwLayer);
   * ngwMap.zoomToLayer('ngw_layer_name');
   * ```
   */
  async zoomToLayer(layerDef: string | ResourceAdapter) {
    let id: string | undefined;
    if (typeof layerDef === 'string' || typeof layerDef === 'number') {
      id = String(id);
    } else {
      id = layerDef.id;
    }
    const ngwLayer = id && this._ngwLayers[id];
    if (ngwLayer) {
      if (ngwLayer.layer.getExtent) {
        const extent = await ngwLayer.layer.getExtent();
        if (extent) {
          this.fitBounds(extent);
        }
      } else {
        let item: ResourceItem;
        if (ngwLayer.layer.item) {
          item = ngwLayer.layer.item;
        } else {
          const resourceId = ngwLayer.resourceId;
          item = await this.connector.get('resource.item', null, { id: resourceId });
        }

        NgwKit.utils.getNgwResourceExtent(item, this.connector).then(extent => {
          if (extent) {
            this.fitBounds(extent);
          }
        });
      }
    }
  }

  onLoad(event: keyof NgwMapEvents = 'ngw-map:create'): Promise<this> {
    return super.onLoad(event as keyof WebMapEvents);
  }

  removeLayer(layerDef: LayerDef) {
    const layer = this.getLayer(layerDef);
    if (layer) {
      const layerId = this.getLayerId(layer);
      if (layerId) {
        delete this._ngwLayers[layerId];
      }
      super.removeLayer(layer);
    }
  }

  private async _createWebMap() {
    await this.create({ ...this.options });
    if (this.options.qmsId) {
      let qmsId: number;
      let qmsLayerName: string | undefined;
      if (Array.isArray(this.options.qmsId)) {
        qmsId = this.options.qmsId[0];
        qmsLayerName = this.options.qmsId[1];
      } else {
        qmsId = Number(this.options.qmsId);
      }
      const qmsLayerOptions: QmsAdapterOptions = {
        qmsId
      };
      if (qmsLayerName) {
        qmsLayerOptions.id = qmsLayerName;
      }

      await this.addBaseLayer('QMS', qmsLayerOptions).then(layer => {
        this.showLayer(layer);
      });
    }

    const resources: NgwLayerOptions[] = [];
    if (this.options.webmapId) {
      appendNgwResources(resources, this.options.webmapId, { fit: true });
    }
    if (this.options.resources && Array.isArray(this.options.resources)) {
      this.options.resources.forEach(x => {
        appendNgwResources(resources, x);
      });
    }

    for (const r of resources) {
      await this.addNgwLayer(r);
    }

    // this.fit();
    this._emitStatusEvent('ngw-map:create', this);

    this.emitter.on('click', (ev: MapClickEvent) => this._selectFromNgw(ev));
  }

  private _addControls() {
    if (this.options.controls) {
      this.options.controls.forEach(x => {
        let controlAdapterName = x;
        let controlOptions: ControlOptions = {};
        if (typeof x === 'string' && this.options.controlsOptions) {
          if (this.options.controlsOptions[x]) {
            controlOptions = this.options.controlsOptions[x];
            if (controlOptions.control !== undefined) {
              controlAdapterName = controlOptions.control;
            }
          }
        }
        const { position, ...options } = controlOptions;
        this.addControl(controlAdapterName, position || 'top-left', options);
      });
    }
    this._emitStatusEvent('controls:create');
  }

  private async _selectFromNgw(ev: MapClickEvent) {
    const promises: Promise<number[] | undefined>[] = [];
    for (const nl in this._ngwLayers) {
      const layer = this._ngwLayers[nl].layer;
      if (layer.getIdentificationIds && layer.options.selectable) {
        promises.push(layer.getIdentificationIds());
      }
    }
    const getIds = await Promise.all(promises);
    const ids: number[] = [];
    getIds.forEach(x => {
      if (x) {
        x.forEach(y => ids.push(y));
      }
    });
    if (ids.length) {
      const pixelRadius = this.options.pixelRadius || 10;
      const center = this.getCenter();
      const zoom = this.getZoom();
      if (center && zoom) {
        const metresPerPixel =
          (40075016.686 * Math.abs(Math.cos((center[1] * 180) / Math.PI))) / Math.pow(2, zoom + 8);
        // FIXME: understand the circle creation function
        const radius = pixelRadius * metresPerPixel * 0.0005;
        return NgwKit.utils
          .sendIdentifyRequest(ev, {
            layers: ids,
            connector: this.connector,
            radius
          })
          .then(resp => {
            this._emitStatusEvent('ngw:select', { ...resp, resources: ids });
            return resp;
          });
      }
    }
  }
}
