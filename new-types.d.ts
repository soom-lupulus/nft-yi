/// <reference types="@metamask/providers" />
// 在文件顶部添加
declare global {
    interface Window {
        ethereum?: import('@metamask/providers').MetaMaskInpageProvider;
    }
}

export { }