import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const ZoomDefaultMinimumLevel = 0;
export const MinimumZoomDistance = 20;
export const MaximumZoomDistance = 5000 * 10000;
export const ZoomDefaultMaximumLevel = Math.ceil(Math.log2(MaximumZoomDistance));
export interface PositionStateTask {
    longitude: number;
    latitude: number;
    height: number;
    rel: number;
}

export interface PositionState {
    longitude: number;
    latitude: number;
    height: number;
}


export const provincialAll = [
    {
        key: '0',
        title: '全国',
    },
    {
        key: '110000',
        title: '北京市',
    },
    {
        key: '120000',
        title: '天津市',
    },
    {
        key: '130000',
        title: '河北省',
    },
    {
        key: '140000',
        title: '山西省',
    },
    {
        key: '150000',
        title: '内蒙古自治区',
    },
    {
        key: '210000',
        title: '辽宁省',
    },
    {
        key: '220000',
        title: '吉林省',
    },
    {
        key: '230000',
        title: '黑龙江省',
    },
    {
        key: '310000',
        title: '上海市',
    },
    {
        key: '320000',
        title: '江苏省',
    },
    {
        key: '330000',
        title: '浙江省',
    },
    {
        key: '340000',
        title: '安徽省',
    },
    {
        key: '350000',
        title: '福建省',
    },
    {
        key: '360000',
        title: '江西省',
    },
    {
        key: '370000',
        title: '山东省',
    },
    {
        key: '410000',
        title: '河南省',
    },
    {
        key: '420000',
        title: '湖北省',
    },
    {
        key: '430000',
        title: '湖南省',
    },
    {
        key: '440000',
        title: '广东省',
    },
    {
        key: '450000',
        title: '广西壮族自治区',
    },
    {
        key: '460000',
        title: '海南省',
    },
    {
        key: '500000',
        title: '重庆市',
    },
    {
        key: '510000',
        title: '四川省',
    },
    {
        key: '520000',
        title: '贵州省',
    },
    {
        key: '530000',
        title: '云南省',
    },
    {
        key: '540000',
        title: '西藏自治区',
    },
    {
        key: '610000',
        title: '陕西省',
    },
    {
        key: '620000',
        title: '甘肃省',
    },
    {
        key: '630000',
        title: '青海省',
    },
    {
        key: '640000',
        title: '宁夏回族自治区',
    },
    {
        key: '650000',
        title: '新疆维吾尔自治区',
    },
    {
        key: '710000',
        title: '台湾省',
    },
    {
        key: '810000',
        title: '香港特别行政区',
    },
    {
        key: '820000',
        title: '澳门特别行政区',
    },
];
// 116.39, 39.91, 10000.0 北京市中心
// 106.278179, 38.46637, 10000.0 宁夏
export const chinaPosition = {
    longitude: 116.395645038,
    latitude: 39.9299857781,
    height: 7000000,
};

interface HomeState {
    position: PositionState; // 默认位置
}

const initialState: HomeState = {
    position: chinaPosition,
};

export const GlobalSlice = createSlice({
    name: 'Home',
    initialState,
    reducers: {
        updatePosition: (state, action: PayloadAction<PositionState>) => {
            if (action.payload !== undefined) {
                state.position = action.payload;
            }
        },
    },
});

export const {
    updatePosition,
} = GlobalSlice.actions;
export default GlobalSlice.reducer;
