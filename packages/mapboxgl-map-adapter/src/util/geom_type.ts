import { GeoJsonGeometryTypes, GeoJsonObject, FeatureCollection, Feature, GeometryCollection } from 'geojson';
import { VectorAdapterLayerType } from '@nextgis/webmap';

export const allowedParams: Array<[string, string] | string> = ['color', 'opacity'];
export const allowedByType = {
  circle: [
    ['fillColor', 'color'],
    ['fillOpacity', 'opacity'],
    ['strokeColor', 'stroke-color'],
    ['strokeOpacity', 'stroke-opacity'],
    ['weight', 'stroke-width'],
    'radius'
  ],
  line: [['strokeColor', 'color'], ['strokeOpacity', 'opacity'], ['weight', 'width']],
  fill: [['fillColor', 'color'], ['fillOpacity', 'opacity']],
  icon: allowedParams.concat([])
};

export const typeAlias: { [key in GeoJsonGeometryTypes]: VectorAdapterLayerType } = {
  'Point': 'circle',
  'LineString': 'line',
  'MultiPoint': 'circle',
  'Polygon': 'fill',
  'MultiLineString': 'line',
  'MultiPolygon': 'fill',
  'GeometryCollection': 'fill'
};

export const typeAliasForFilter: { [key in VectorAdapterLayerType]: GeoJsonGeometryTypes } = {
  circle: 'Point',
  line: 'LineString',
  fill: 'Polygon',
  icon: 'Point'
};

export const backAliases: { [key in VectorAdapterLayerType]?: GeoJsonGeometryTypes[] } = {
  'icon': ['Point']
};

for (const a in typeAlias) {
  if (typeAlias.hasOwnProperty(a)) {
    const layerType = typeAlias[a as GeoJsonGeometryTypes];
    const backAlias = backAliases[layerType] || [];
    backAlias.push(a as GeoJsonGeometryTypes);
    backAliases[layerType] = backAlias;
  }
}

export function findMostFrequentGeomType(arr: GeoJsonGeometryTypes[]): GeoJsonGeometryTypes {
  const counts: { [x: string]: number } = {};
  for (let fry = 0; fry < arr.length; fry++) {
    counts[arr[fry]] = 1 + (counts[arr[fry]] || 0);
  }
  let maxName: string = '';
  for (const c in counts) {
    if (counts.hasOwnProperty(c)) {
      const maxCount = maxName ? counts[maxName] : 0;
      if (counts[c] > maxCount) {
        maxName = c;
      }
    }
  }
  return maxName as GeoJsonGeometryTypes;
}

export function detectType(geojson: GeoJsonObject): GeoJsonGeometryTypes {
  let geometry: GeoJsonGeometryTypes;
  if (geojson.type === 'FeatureCollection') {
    const featuresTypes = (geojson as FeatureCollection).features.map((f) => f.geometry.type);
    geometry = findMostFrequentGeomType(featuresTypes);
  } else if (geojson.type === 'GeometryCollection') {
    const geometryTypes = (geojson as GeometryCollection).geometries.map((g) => g.type);
    geometry = findMostFrequentGeomType(geometryTypes);
  } else if (geojson.type === 'Feature') {
    geometry = (geojson as Feature).geometry.type;
  } else {
    geometry = geojson.type;
  }
  return geometry;
}