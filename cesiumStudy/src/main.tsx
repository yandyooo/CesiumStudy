import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
// 引入Ant Design中文语言包
import zhCN from "antd/locale/zh_CN";
// 全局样式
import "@/common/styles/frame.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
