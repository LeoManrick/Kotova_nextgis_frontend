import Item, { ItemOptions } from '@nextgis/item';

import WebMap, { LayerAdapters, LayerAdapter } from '@nextgis/webmap';
import { TreeGroup, TreeLayer } from './interfaces';

export class WebMapLayerItem extends Item<ItemOptions> {
  static options: ItemOptions = {
    properties: [
      {
        type: 'boolean',
        name: 'visibility',
        getProperty() {
          const item: WebMapLayerItem = this.item;
          if (item.item.item_type === 'group') {
            return true;
          } else if (item.item.item_type === 'layer') {
            return item.item.layer_enabled;
          } else if (item.item.item_type === 'root') {
            return true;
          }
          return false;
        },
        onSet(value: boolean) {
          const item: WebMapLayerItem = this.item;
          if (item.item.item_type === 'layer') {
            if (value) {
              item.webMap.showLayer(item.id);
            } else {
              item.webMap.hideLayer(item.id);
            }
            item.item.layer_enabled = value;
          }
        },
      },
    ],
  };

  item: TreeGroup | TreeLayer;
  adapter?: LayerAdapter;

  constructor(public webMap: WebMap, item: TreeGroup | TreeLayer, options?: ItemOptions, parent?: WebMapLayerItem) {

    super(Object.assign({}, WebMapLayerItem.options, options));

    this.item = item;
    if (parent) {
      this.tree.setParent(parent);
    }
    this.initProperties();
    this._init(item);
  }

  async initItem(item: TreeGroup | TreeLayer) {
    let newLayer = item._layer;
    if (item.item_type === 'group' || item.item_type === 'root') {
      if (item.children && item.children.length) {
        item.children.reverse().forEach((x) => {
          const children = new WebMapLayerItem(this.webMap, x, this.options, this);
          this.tree.addChildren(children);
        });
      }
    } else if (item.item_type === 'layer') {
      const adapter = (item.adapter || item.layer_adapter.toUpperCase()) as keyof LayerAdapters;
      item.id = Number(this.id);
      const options: any = { ...item, ...{ id: item.id } };
      newLayer = await this.webMap.addLayer(adapter, options);
    }
    if (newLayer) {
      item._layer = newLayer;
      this.adapter = newLayer;
      if (item.item_type === 'layer' && item.layer_enabled) {
        this.properties.property('visibility').set(true);
      }
    } else {
      // this.properties.get('visibility').set(true);
    }
  }

  // region layer control
  bringToFront() {
    //
  }

  fit(): void {
    if (this.item.item_type === 'layer') {
      console.log(this.item);
    }
  }
  //

  private async _init (item) {
    await this.initItem(item);
    this.emitter.emit('init');
  }

}