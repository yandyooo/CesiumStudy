import { message } from 'antd';

export const formatToFixed = (value: string | number, digits = 4): string => {
    if (typeof value === 'string') {
        return value;
    }
    return value.toFixed(digits);
};

export const clamp = (min: number, value: number, max: number): number => {
    let v = Math.max(value, min);
    v = Math.min(v, max);
    return v;
};

export const toDegrees = (radius: number) => {
    return (radius / Math.PI) * 180;
};

export const toRadius = (deg: number) => {
    return (deg / 180) * Math.PI;
};

export const normalizeYaw = (yaw: number) => {
    const value = yaw % (2 * Math.PI);
    return value < 0 ? toDegrees(2 * Math.PI + value) : toDegrees(value);
};

export const normalizePitch = (pitch: number) => {
    const value = pitch % (2 * Math.PI);
    return toDegrees(value);
};

export const resolvePath = (path: string, index = -1): string[] | string | undefined => {
    const splits = path.split('/');
    if (index === -1) {
        return splits;
    }

    if (splits.length <= index + 1) {
        return splits[index];
    }

    return undefined;
};

/** 合并多个classNames */
export function linkClass(classnames: (string | boolean)[]): string {
    return classnames.filter(Boolean).join(' ');
}

export const isDev = (): boolean => {
    return process.env.NODE_ENV === 'development';
};
// eslint-disable-next-line
export const Log = (...objects: any): void => {
    if (isDev()) {
        console.log(...objects);
    }
};
// eslint-disable-next-line
export const Warn = (...objects: any): void => {
    if (isDev()) {
        console.warn(...objects);
        if (objects.status == 0) {
            message.success('成功');
        } else {
            message.warning(objects.message);
        }
    }
};

// eslint-disable-next-line
export const Error = (...objects: any): void => {
    if (isDev()) {
        console.error(...objects);
    }
};

/** 秒数格式化为分钟:秒数的格式, 12:01 */
export const secondFormat = (sec: number) => {
    const minute = Math.floor(sec / 60);
    const second = Math.floor(sec % 60);
    return minute.toString().padStart(2, '0') + ':' + second.toString().padStart(2, '0');
};

/** 时间戳格式化为日期, 1661329804862 -> 2022-08-24 16:30:4 */
export const timestampFormat = (timestamp: number) => {
    const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1).toString().padStart(2, '0');
    const D = date.getDate().toString().padStart(2, '0');
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
};

/** Date类型格式化为日期, Wed Sep 28 2022 17:38:37 GMT+0800 (中国标准时间) -> 2022-08-24 16:30:4 */
export const DateFormat = (date: Date) => {
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1).toString().padStart(2, '0');
    const D = date.getDate().toString().padStart(2, '0');
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
};

/** 数据容量单位转换(b, Kb, Mb, Gb) */
export const bytesToSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    const kb = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(kb));
    return (bytes / Math.pow(kb, i)).toFixed(2) + ' ' + units[i];
};

/**
 * 二分查找
 * @param list
 * @param value
 * @returns
 */
export const binarySearch = <T>(list: T[], value: T) => {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (list[mid] == value) {
            return mid;
        }
        if (list[mid] > value) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
};

/**
 * 返回最后一个比key小的数字的index
 * @param list
 * @param low
 * @param high
 * @param key
 * @param comparator  return t1-t2
 * @returns
 */
export const binaryUpBound = <T>(
    list: T[],
    low: number,
    high: number,
    key: number,
    comparator: (t1: T, t2: number) => number
): number => {
    while (low < high) {
        const mid = Math.ceil((low + high + 1) / 2);
        if (comparator(list[mid], key) > 0) {
            high = mid - 1;
        } else {
            low = mid;
        }
    }

    if (comparator(list[low], key) <= 0) {
        return low;
    } else {
        return -1;
    }
};
