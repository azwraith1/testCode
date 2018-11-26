/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-25 14:08:44 
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-20 18:27:18
 * 主方法入口
 */
module game {
    export class Main extends eui.UILayer {
        /**
         * 加载进度界面
         * loading process interface
         */
        private loadingView: LoadingUI;

        private logoScene: LogoScene;
        private version: RES.VersionController;
        private version_num: string = "2.0.1";
        private use_oss: boolean = false;
        // private oss_path: string = "http://down.008sx.com/";
        protected createChildren(): void {
            super.createChildren();
            ServerConfig.PATH_CONFIG = PathConfigFac.getPathByType(ServerConfig.PATH_TYPE);
            GameConfig.JS_VERSION = window['jsVersion'];
            GameConfig.RES_VERSION = window['resVersion'];

            //检查资源版本
            this.checkVersion();
            // //检查运行环境
            this.checkRuntime();


            var assetAdapter = new AssetAdapter();
            this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
            this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);

            this.addChild(GameLayerManager.gameLayer());
            game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
            this.selectServerConfig();

            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        }


        /**
         * PC或者手机做出不同的适配
         */
        private checkRuntime() {
            this.checkIsHengShu();
            GameConfig.CURRENT_WIDTH = this.stage.stageWidth;
            GameConfig.CURRENT_HEIGHT = this.stage.stageHeight;
            GameConfig.WINSIZE_WIDTH = this.stage.stageWidth;
            GameConfig.WINSIZE_HEIGHT = this.stage.stageHeight;
            GameConfig.WINSIZE_BILI_WIDTH = GameConfig.WINSIZE_WIDTH / 1280;
            GameConfig.WINSIZE_BILI_HEIGHT = GameConfig.WINSIZE_HEIGHT / 720;
            this.stage.orientation = egret.OrientationMode.LANDSCAPE;
            if (!egret.Capabilities.isMobile) {
                this.stage.orientation = egret.OrientationMode.AUTO;
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            } else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            }
        }

        /**
         * 检查全屏
         */
        private checkVersion() {
             var self = this;
            //资源管理框架
            RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
                if (ServerConfig.PATH_CONFIG.use_oss) {
                    if (url.match(".json") && ServerConfig.PATH_CONFIG.json_path) {
                        url = ServerConfig.PATH_CONFIG.json_path + url + "?v=" + GameConfig.RES_VERSION;
                        return url;
                    }
                    url = ServerConfig.PATH_CONFIG.oss_path + url + "?v=" + GameConfig.RES_VERSION;
                    return url;
                }

                if (url.match("http")) {
                    return url;
                }
                url += "?v=" + GameConfig.RES_VERSION;
                return url;
            }
            this.version = new RES.VersionController();
            RES.registerVersionController(this.version);
        }
        private selectServerConfig() {
            let token = Utils.getURLQueryString("token");
            if (token) {
                Global.playerProxy.token = token;
            }
            ServerConfig.RECHARGE_URL = decodeURIComponent(Utils.getURLQueryString("op_pay_url"));
            ServerConfig.gid = Utils.getURLQueryString("gid");
            ServerConfig.USER_NAME = Utils.getURLQueryString("un") || "1001";
        }

        /**
         * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
         * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
         */
        private onConfigComplete(e: RES.ResourceEvent): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            var theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("preload");
        }

        private isThemeLoadEnd: boolean = false;

        /**
         * 主题文件加载完成,开始预加载
         * Loading of theme configuration file is complete, start to pre-load the
         */
        private onThemeLoadComplete(): void {
            this.isThemeLoadEnd = true;
            this.createScene();
        }

        private isResourceLoadEnd: boolean = false;

        /**
         * preload资源组加载完成
         * preload resource group is loaded
         */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                this.stage.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.isResourceLoadEnd = true;
                this.createScene();
            }
        }

        private createScene() {
            if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
                this.startCreateScene();
            }
        }

        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.onResourceLoadComplete(event);
        }

        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        private onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }

        private firstWidth;
        private firstHeight;
        private isFullScreen: boolean = false;
        private maxHengWidth: number;
        private maxShuWidth: number;
        private checkIsFull() {
            //只有ios移动端才会执行
            if (!NativeApi.instance.isiOSDevice || !NativeApi.instance.isChromeForIOS) {
                return;
            }
            if (NativeApi.instance.isIphoneX) {
                FrameUtils.iphoneXScreen(this.stage.stageWidth, this.stage.stageHeight);
                return
            }
            this.checkIsHengShu();
            //横屏
            if (GameConfig.CURRENT_WIDTH == this.stage.stageWidth && this.stage.stageHeight == GameConfig.CURRENT_HEIGHT) {
                return;
            }

            if (GameConfig.CURRENT_WIDTH == 1280) {
                if (this.stage.stageWidth != 1280) {

                } else {
                    //横屏的相互操作
                    if (this.stage.stageHeight > GameConfig.CURRENT_HEIGHT) {
                        this.isFullScreen = false;
                        FrameUtils.postMessage("0");
                    } else {
                        this.isFullScreen = true;
                        FrameUtils.postMessage("1");
                    }
                }
            }
            //如果当前是竖屏 转入横屏
            else if (GameConfig.CURRENT_HEIGHT == 720) {
                if (NativeApi.instance.getIphoneBanben()) {
                    this.isFullScreen = true;
                    FrameUtils.postMessage("1");
                    return;
                }
                if (this.stage.stageHeight != 720) {

                } else {
                    if (this.stage.stageWidth > GameConfig.CURRENT_WIDTH) {
                        this.isFullScreen = false;
                        FrameUtils.postMessage("0");
                    } else {
                        this.isFullScreen = true;
                        FrameUtils.postMessage("1");
                    }
                }
            }
        }

        private checkIsHengShu() {
            if (window.orientation === 180 || window.orientation === 0) {
                GameConfig.CURRENT_DIRECTION = "portrait";
            } else if (window.orientation === 90 || window.orientation === -90) {
                GameConfig.CURRENT_DIRECTION = "landscape";
            } else {
                GameConfig.CURRENT_DIRECTION = "running";
            }
        }

        /**
         * 创建场景界面
         * Create scene interface
        */
        private resetZise;
        protected startCreateScene(): void {
            //监听窗口大小的改变
            this.stage.addEventListener(egret.Event.RESIZE, function () {
                GameConfig.WINSIZE_WIDTH = this.stage.stageWidth;
                GameConfig.WINSIZE_HEIGHT = this.stage.stageHeight;
                var beforeData = { wBili: GameConfig.WINSIZE_BILI_WIDTH, hBili: GameConfig.WINSIZE_BILI_HEIGHT };
                GameConfig.WINSIZE_BILI_WIDTH = GameConfig.WINSIZE_WIDTH / 1280;
                GameConfig.WINSIZE_BILI_HEIGHT = GameConfig.WINSIZE_HEIGHT / 720;
                EventManager.instance.dispatch(EventNotify.EVENT_RESIZE, beforeData);
                if (this.resetZise) {
                    egret.clearTimeout(this.resetZise);
                    this.resetZise = null;
                }
                this.resetZise = egret.setTimeout(() => {
                    this.checkIsFull()
                    GameConfig.CURRENT_WIDTH = this.stage.stageWidth;
                    GameConfig.CURRENT_HEIGHT = this.stage.stageHeight;
                    this.resetZise = null;
                }, this, 500);
            }, this);

            // DateTimeManager.instance.run();
            // SocketManager.instance.createSocket;
            game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_LOADING);
        }
    }
}
