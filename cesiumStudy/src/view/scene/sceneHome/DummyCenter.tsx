import {Cartesian3} from 'cesium';
import React, {useEffect} from 'react';
import {Entity, useCesium} from 'resium';
import {useAppSelector} from '../../../store';

export const DummyCenter: React.FC = (): JSX.Element => {
    const position = useAppSelector((state) => state.home.position);
    const viewer = useCesium()
    useEffect(() => {
        if (viewer) {
           console.log(viewer,'viewer');
           
        }
    }, [viewer]);
    return (
        <Entity
            id={'DummyCenter'}
            show={false}
            position={Cartesian3.fromDegrees(position.longitude, position.latitude, position.height)}
        />
    );
};
