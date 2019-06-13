import { WebMap, BaseLayerAdapter, LayerAdaptersOptions, Type, AdapterOptions } from '@nextgis/webmap';
import { QmsAdapterOptions, QmsBasemap, QmsLayerType, QmsAdapter as QA} from './interfaces';

const alias: { [key in QmsLayerType]: keyof LayerAdaptersOptions } = {
  tms: 'TILE',
};

export function createQmsAdapter(webMap: WebMap, url = 'https://qms.nextgis.com'): Type<BaseLayerAdapter> {

  class QmsAdapter implements BaseLayerAdapter, QA {
    qms?: QmsBasemap;

    constructor(public map: any, public options: QmsAdapterOptions) {
      this.options = options;
      this.options.baseLayer = true;
    }

    async addLayer(options: QmsAdapterOptions) {

      // qmsId for request, id for store
      if (!this.qms && options.qmsId) {
        this.qms = await loadJSON<QmsBasemap>(url + '/api/v1/geoservices/' + options.qmsId);
      }
      const qms = this.qms;
      if (qms) {
        const type = alias[qms.type || 'tms'];
        const webMapAdapter = webMap.mapAdapter.layerAdapters[type];
        if (webMapAdapter) {
          if (type === 'TILE') {

            options = {
              maxZoom: webMap.options.maxZoom,
              minZoom: webMap.options.minZoom,
              ...this.options,
              ...updateQmsOptions(qms)
            };
            this.options = options;
            const adapter = new webMapAdapter(this.map, options);
            return adapter.addLayer(options);
          }
        }
      }
    }
  }
  return QmsAdapter;
}

export function updateQmsOptions(qms: QmsBasemap): AdapterOptions & { url: string } {
  const protocol = (location.protocol === 'https:' ? 'https' : 'http') + '://';
  const serviceUrl = qms.url.replace(/^(https?|ftp):\/\//, protocol);
  return {
    url: serviceUrl,
    name: qms.name,
    attribution: qms.copyright_text,
    maxZoom: qms.z_max,
    minZoom: qms.z_min
  }
}

export function loadJSON<T = any>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        if (xmlHttp.responseText) {
          try {
            resolve(JSON.parse(xmlHttp.responseText));
          } catch (er) {
            reject(er);
          }
        }
      }
    };
    xmlHttp.open('GET', fixUrlStr(url), true); // true for asynchronous
    xmlHttp.send();
  });
}

export function fixUrlStr(url: string): string {
  // remove double slash
  return url.replace(/([^:]\/)\/+/g, '$1');
}
