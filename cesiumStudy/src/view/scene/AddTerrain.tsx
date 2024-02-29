import { useEffect } from "react";
import {CesiumTerrainProvider, Viewer as CesiumViewer} from 'cesium';
import { useCesium } from "resium";
// import { useAppDispatch } from "../../store";
export const AddTerrain: React.FC = (): JSX.Element | null => {
    const { viewer } = useCesium();
    // const dispatch = useAppDispatch();
    // const cesiumLogo = ImageryLayer.fromProviderAsync(
    //     SingleTileImageryProvider.fromUrl(
    //       "../images/Cesium_Logo_overlay.png",
    //       {
    //         rectangle: Cesium.Rectangle.fromDegrees(
    //           -75.0,
    //           28.0,
    //           -67.0,
    //           29.75
    //         ),
    //       }
    //     )
    //   );
    useEffect(() => {
        if(viewer){
            const addWorldTerrainAsync = async (viewer: CesiumViewer) => {
                try {    
                    const terrainProvider = await CesiumTerrainProvider.fromUrl(
                        'http://192.168.1.117:9003/terrain/ye8CubBJ' || ''
                    );
                    viewer.terrainProvider = terrainProvider;
                    // dispatch(setIsTerrain(true))
                  } catch (error) {
                    console.log(`Failed to add world imagery: ${error}`);
                  }
            };
            addWorldTerrainAsync(viewer)
         
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[viewer])
    return null;
}