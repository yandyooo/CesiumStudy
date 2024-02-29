import { Viewer } from 'cesium';
import * as PIXI from 'pixi.js';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface PixiContextType {
    pixiApp?: PIXI.Application;
}

export const PixiContextProvider: PixiContextType = {
    pixiApp: undefined,
};

export const PixiContext = createContext<PixiContextType>(PixiContextProvider);
export const PixiContextPlan = createContext<PixiContextType>(PixiContextProvider);

export const usePixi = (): PixiContextType => useContext(PixiContext);
export const usePixiPlan = (): PixiContextType => useContext(PixiContextPlan);

// TODO
export interface SceneContextType {
    viewer?: Viewer;
    dispatch?: Dispatch<SetStateAction<Viewer | undefined>>;
}
export const SceneContextProviderInit: SceneContextType = {
    viewer: undefined,
    dispatch: undefined,
};

export const SceneHomeContext = createContext<SceneContextType>(SceneContextProviderInit);

// 首页
export const useFlySceneHome = (): SceneContextType => useContext(SceneHomeContext);
