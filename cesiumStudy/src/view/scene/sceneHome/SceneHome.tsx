import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CesiumComponentRef, ImageryLayer, Viewer } from "resium";
import {
  Viewer as CesiumViewer,
  Ion,
} from "cesium";
import styles from "./index.module.scss";
import CesiumNavigation from "cesium-navigation-es6";
import { AddTerrain } from "../AddTerrain";
import { CameraManager } from "./CameraManger";
import { DummyCenter } from "./DummyCenter";
import { defultServer } from "../layoutMap";

interface Props {
  setViewer: Dispatch<SetStateAction<CesiumViewer | undefined>>;
}
export const SceneHome: React.FC<Props> = (props: Props): JSX.Element => {
  const { setViewer } = props;
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjE3MjcyMi05OTVhLTQzZjAtOTA1OS1hNzY0YThhOGU0OGYiLCJpZCI6MTM4NzQ0LCJpYXQiOjE2ODQxMzY0OTd9.aCmFE1Cu-YLtSayH2LeJsAoXpNUoqPFQy-WxxVJsGP4";

  useEffect(() => {
    if (ref.current?.cesiumElement) {
      new CesiumNavigation(ref.current.cesiumElement, {});
      setViewer(ref.current?.cesiumElement);
    }
  }, [setViewer]);

  return (
    <Viewer
      full
      ref={ref}
      className={styles["root"]}
      shouldAnimate={true}
      baseLayerPicker={false}
      requestRenderMode={true}
      timeline={true}
      animation={false}
      vrButton={false}
      homeButton={false}
      navigationHelpButton={false}
      geocoder={false}
      scene3DOnly={true}
      sceneModePicker={false}
      fullscreenButton={false}
      creditContainer={undefined}
      infoBox={false}
      selectionIndicator={false}
      orderIndependentTranslucency={false}
      // 初始化地图
      contextOptions={{
        // requestWebgl1: true,
        webgl: {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true,
        },
        allowTextureFilterAnisotropic: true,
      }}
    >
   <ImageryLayer imageryProvider={defultServer.xxx}/>
      <AddTerrain />
      <DummyCenter />
      <CameraManager />
    </Viewer>
  );
};
