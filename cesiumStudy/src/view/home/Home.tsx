import { Viewer } from 'cesium';
import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './index.module.scss';
import { SceneHomeContext } from '../provider';
import { SceneHome } from '../scene/sceneHome/SceneHome';

type Props = RouteComponentProps;

export const Home: FunctionComponent<Props> = () => {
    
    const [viewer, setViewer] = useState<Viewer>();

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <div id="3d-container" className={styles.content}>
                    <MemoScene3D setViewer={setViewer} />
                    <SceneHomeContext.Provider value={{ viewer: viewer, dispatch: setViewer }}>
                        {/* 放组件 */}
                    </SceneHomeContext.Provider>
                </div>
            </div>
        </div>
    );
};
const MemoScene3D = React.memo(SceneHome, () => {
    return true;
});
export default Home;
