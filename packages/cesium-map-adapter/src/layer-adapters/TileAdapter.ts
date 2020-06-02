/**
 * @module cesium-map-adapter
 */
import { TileAdapterOptions } from '@nextgis/webmap';
import { Viewer, UrlTemplateImageryProvider, ImageryLayer } from 'cesium';

import { BaseAdapter } from './BaseAdapter';

type Layer = ImageryLayer;
type Map = Viewer;

export class TileAdapter extends BaseAdapter<TileAdapterOptions, Layer> {
  private _layer?: ImageryLayer;

  addLayer(opt: TileAdapterOptions) {
    this.options = { ...opt };
    const urlLayer = new UrlTemplateImageryProvider({
      url: opt.url,
      credit: opt.attribution,
      maximumLevel: opt.maxZoom,
      minimumLevel: opt.minZoom,
    });
    const layer = new ImageryLayer(urlLayer, { show: false });
    if (this.options.opacity !== undefined) {
      layer.alpha = this.options.opacity;
    }
    this._layer = layer;
    return layer;
  }

  showLayer(layer: ImageryLayer) {
    layer.show = true;
    const order = this.options.order ? this.options.order * 1000 : undefined;
    this.map.imageryLayers.add(layer, order);
    super.showLayer();
  }

  hideLayer(layer: ImageryLayer) {
    layer.show = false;
    this.map.imageryLayers.remove(layer, false);
    super.hideLayer();
  }

  beforeRemove() {
    if (this._layer) {
      this.map.imageryLayers.remove(this._layer, true);
    }
    super.beforeRemove();
  }
}
