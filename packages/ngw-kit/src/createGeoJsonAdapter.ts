import { NgwLayerOptions } from './interfaces';
import WebMap, {
  VectorLayerAdapter,
  Type,
  GeoJsonAdapterOptions,
  PropertiesFilter,
  FilterOptions
} from '@nextgis/webmap';
import NgwConnector, { CancelablePromise } from '@nextgis/ngw-connector';
import { GeoJsonObject } from 'geojson';
import { getNgwLayerFeatures } from './utils/featureLayerUtils';

export async function createGeoJsonAdapter(
  options: NgwLayerOptions,
  webMap: WebMap,
  connector: NgwConnector
) {
  const adapter = webMap.mapAdapter.layerAdapters.GEOJSON as Type<VectorLayerAdapter>;

  let _dataPromise: CancelablePromise<any> | undefined;
  const _fullDataLoad = false;

  const geoJsonAdapterCb = async (filters?: PropertiesFilter, opt?: FilterOptions) => {
    _dataPromise = getNgwLayerFeatures({
      resourceId: options.resourceId,
      filters,
      connector,
      ...opt
    });
    return await _dataPromise;
  };

  const abort = () => {
    if (_dataPromise) {
      _dataPromise.cancel();
      _dataPromise = undefined;
    }
  };

  const onLoad = (data: GeoJsonObject) => {
    const geoJsonOptions: GeoJsonAdapterOptions = {
      data
    };
    if (options.id) {
      geoJsonOptions.id = options.id;
    }
    return WebMap.utils.updateGeoJsonAdapterOptions(geoJsonOptions);
  };
  return class Adapter extends adapter {
    async addLayer(_opt: GeoJsonAdapterOptions) {
      let data = {} as GeoJsonObject;
      if (!_opt.data) {
        data = await geoJsonAdapterCb(_opt.propertiesFilter, { limit: _opt.limit });
      }
      const opt = onLoad(data);
      const addLayerOptions = { ..._opt, ...opt };
      if (addLayerOptions.data && Object.keys(addLayerOptions.data).length === 0) {
        addLayerOptions.data = undefined;
      }
      return super.addLayer(addLayerOptions);
    }

    beforeRemove() {
      abort();
    }

    async propertiesFilter(filters: PropertiesFilter, opt?: FilterOptions) {
      abort();
      if (this.filter && _fullDataLoad) {
        this.filter(e => {
          if (e.feature && e.feature.properties) {
            return WebMap.utils.propertiesFilter(e.feature.properties, filters);
          }
          return true;
        });
      } else if (this.setData) {
        if (this.clearLayer) {
          this.clearLayer();
        }
        const data = await geoJsonAdapterCb(filters, opt);
        this.setData(data);
      }
    }

    removeFilter() {
      this.propertiesFilter([]);
      if (this.filter) {
        this.filter(function() {
          return true;
        });
      }
    }
  };
}
