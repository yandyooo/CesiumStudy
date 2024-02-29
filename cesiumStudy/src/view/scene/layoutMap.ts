import {
    CesiumTerrainProvider,
    ImageryProvider,
    TerrainProvider,
    UrlTemplateImageryProvider,
    WebMapTileServiceImageryProvider,
} from 'cesium';
// import { YzhUrlTemplateImageryProvider } from 'yzhcesium/libs/YzhCesium';
type Server = {
    // imageryProvider: ImageryProvider;
    terrainProvider: TerrainProvider;
    biaozhu: ImageryProvider;
    xxx: ImageryProvider;
};

// 天地图影像
export const imageryViewModels = {
    // 高德在线街道图
    street: new UrlTemplateImageryProvider({
        url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    }),

    // arcgis在线影像图
    img: new WebMapTileServiceImageryProvider({
        // eslint-disable-next-line max-len
        url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS',
        layer: 'World_Imagery',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'default028mm',
        maximumLevel: 20,
    }),
};

// 默认卫星图

// const imageryProvider = new UrlTemplateImageryProvider({
//     url: `https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s,m&x={x}&y={y}&z={z}`,
//     minimumLevel: 0,
//     maximumLevel: 20,
// });

// const imageryProvider = YzhUrlTemplateImageryProvider.createTemplateImageryProvider({
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     url: window.TILEURLLine || '',
//     urlType: 'WGS84',
//     minimumLevel: 0,
//     maximumLevel: 10,
// });

const xxx = new UrlTemplateImageryProvider({
    url:'http://192.168.1.120/map/image/{z}/{x}/{y}.png' || '' ,
    minimumLevel: 0,
    maximumLevel: 10,
})
const terrainProvider = new CesiumTerrainProvider({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    url: window.DEMURL || '',
});

const biaozhu = new UrlTemplateImageryProvider({
    url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
});

// const terrainProvider = new ArcGISTiledElevationTerrainProvider({
//     // eslint-disable-next-line max-len
//     url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
// });

export const defultServer: Server = {
    // imageryProvider: imageryProvider,
    terrainProvider: terrainProvider,
    biaozhu: biaozhu,
    xxx:xxx,
};
