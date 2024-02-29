import React, { Component } from 'react';
import styles from './index.module.scss';

interface Props {
    children: React.ReactNode;
}
const formateDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return year + '年' + month + '月' + day + '日' + hour + ':' + minutes + ':' + seconds;
};

// 导出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onExport = (data: any) => {
    const element = document.createElement('a');
    const file = new Blob([data], {
        type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = '错误信息' + formateDate(new Date().getTime()) + '.json';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
};

let errorOccur = false;
export class ErrorBoundary extends Component<Props> {
    state = {
        hasError: false,
        error: '',
        errorInfo: '',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: '',
            errorInfo: '',
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDerivedStateFromError(error: any) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true, error: error.toString() };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentDidCatch(error: any) {
        /**
         * 暂时只记录第一次的错误,按照常理需要记录很多错误
         */
        if (errorOccur) {
            return;
        }
        errorOccur = true;

        // 你同样可以将错误日志上报给服务器 todo

        const element = document.createElement('p');
        const html = JSON.stringify(error.stack).replace(/"/g, '').replace(/\\n/g, '<br/>');
        element.innerHTML = html.replace(/at /g, '<span style="color:#bc621a">at </span>');
        document.getElementById('errCon')?.appendChild(element);
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <section className={styles['section-box']}>
                    <p className={styles['p']}>
                        &nbsp;系统遇到未知错误
                        <button
                            onClick={() => {
                                onExport(this.state.errorInfo);
                            }}
                        >
                            下载
                        </button>
                    </p>
                    <div className={styles['section-con']}>
                        <div id="errCon" className={styles['conbox']}>
                            <p style={{ color: '#B48EAD' }}>{this.state.errorInfo && this.state.errorInfo}</p>
                        </div>
                    </div>
                </section>
            );
        }

        return this.props.children;
    }
}
