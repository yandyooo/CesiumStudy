import { Cartesian3, FeatureDetection, viewerCesiumInspectorMixin } from 'cesium';
import { useCallback, useEffect } from 'react';
import { useCesium } from 'resium';
import { MaximumZoomDistance, MinimumZoomDistance, useAppSelector } from '../../../store';

export const CameraManager: React.FC = (): JSX.Element | null => {
    const position = useAppSelector((state) => state.home.position);

    const { viewer } = useCesium();
    const isDev = (): boolean => {
        return process.env.NODE_ENV === 'development';
    };
    const initZoom = useCallback(() => {
        if (viewer) {
            viewer.scene.screenSpaceCameraController.maximumZoomDistance = MaximumZoomDistance;
            viewer.scene.screenSpaceCameraController.minimumZoomDistance = MinimumZoomDistance;
            // 禁用地下模式
            // viewer.scene.underground = false;
            // 禁用碰撞检测
            // viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
        }
    }, [viewer]);

    useEffect(() => {
        //  初始视角设置
        viewer?.camera.flyTo({
            destination: Cartesian3.fromDegrees(position.longitude, position.latitude, position.height),
            duration: 1,
            complete: () => {
                initZoom();
            },
        });
        // 视角自动锁定所有无人机
        // viewer?.zoomTo(viewer?.entities);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (isDev() && !(viewer as any).cesiumInspector) {
            viewer?.extend(viewerCesiumInspectorMixin);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (viewer as any)._cesiumWidget._creditContainer.style.display = 'none';

        console.log(viewer?.entities);
        if (viewer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((FeatureDetection as any).supportsImageRenderingPixelated()) {
                // 判断是否支持图像渲染像素化处理
                viewer.resolutionScale = window.devicePixelRatio;
            }
            viewer.scene.postProcessStages.fxaa.enabled = true;
            viewer.scene.screenSpaceCameraController.maximumZoomDistance = MaximumZoomDistance;
            viewer.scene.screenSpaceCameraController.minimumZoomDistance = MinimumZoomDistance;

            // 禁用地下模式
            // viewer.scene.underground = false;
            // 禁用碰撞检测
            // viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;

        }
    }, [initZoom, viewer, position]);

    return null;
};
