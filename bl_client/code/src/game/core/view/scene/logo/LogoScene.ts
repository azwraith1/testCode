/*
  *  @Author:  Li  MengChan  
  *  @Date:  2018-07-02  15:04:51  
  *  @Descxription:  加载界面
  */
module game {
    export class LogoScene extends BaseComponent {
        // private tipLabel: eui.Label;
        private progressBar: eui.Image;
        private maxX: number = 668;
        private clientVersion: eui.Label;
        private resVersion: eui.Label;
        public constructor() {
            super();
            this.skinName = new LogoSceneSkin();
        }

        public createChildren() {
            super.createChildren();
            //是否是pc
            this.resVersion.text = "资源版本: " + GameConfig.RES_VERSION;
            this.clientVersion.text = "客户端版本:" + GameConfig.JS_VERSION;
            this.resGroup = "main";
            let node = document.getElementById("loadingDiv");
            node.parentNode.removeChild(node);
            // document.body.style.background = "#000000";
            this.beganLoadResGroup();
        }

        /**
          *  开始加载资源
          */
        private beganLoadResGroup() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.resGroup);
        }

        private onResourceLoadComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.onResourceLoadOver();
            }
        }

        /**
          *  preload资源组加载进度
          *  loading  process  of  preload  resource
          */
        private onResourceProgress(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
                this.progressBar.scaleX = rate / 100;
            }
        }


        public onAdded() {
            super.onAdded();
        }

        public onRemoved() {
            super.onRemoved();
        }

        /**
          *  用户登录成功
          */
        public async userLoginSuc() {
            let publicMsg = new PublicNoticeComponent();
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 100;
            GameLayerManager.gameLayer().loadLayer.addChild(publicMsg);
            let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
            //   Global.gameProxy.gameNums = resp;
            Global.gameProxy.roomState = resp;
            EventManager.instance.dispatch(ServerNotify.s_broadcast, Global.gameProxy.pMd)
            await Global.gameProxy.people();
            Global.gameProxy.startDs();//开启人数刷新。
            if (NativeApi.instance.isiOSDevice && NativeApi.instance.isChromeForIOS) {
                FrameUtils.postMessage("0");
            }

            HallForwardFac.redirectHall();
            AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOADING);

        }

        /**
         * 开发模式登陆
         */
        public async devLogin() {
            await this.auth({
                operatorId: 1,
                authData: {
                    username: ServerConfig.USER_NAME,
                    password: '123654',
                    figure_url: Math.floor(_.random(1, 6)),
                    sex: Math.floor(_.random(0, 1)),
                },
                devType: 2,
                devId: '12332'
                // inviter: 1,
            });
            await this.queryEntry();
            await this.connect();
            await this.getSceneConfigInfo({
                // gameId: ServerConfig.gid || "mjxlch"
            });
        }

        /**
         * 正式环境登陆
         */
        public async envLogin() {
            await this.loginByToken();
            await this.queryEntry();
            await this.connect();
            await this.getSceneConfigInfo({
                // gameId: ServerConfig.gid || "mjxlch"
            });
        }

        private timeout;
        private async loginByToken() {
            egret.clearTimeout(this.timeout);
            let gatePath = ServerConfig.PATH_CONFIG.http_header + ServerConfig.PATH_CONFIG.http_server + ":" + ServerConfig.PATH_CONFIG.http_port;
            let data = { token: Global.playerProxy.token };
            this.timeout = egret.setTimeout(function () {
                Global.alertMediator.addAlert("登陆超时，请刷新页面重新登陆!", () => {
                    FrameUtils.flushWindow();
                }, null, true);
            }, this, 60000);
            let time = Date.now();
            let resp: any = await Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/getPlayerInfo", data);
            egret.clearTimeout(this.timeout);
            return new Promise((resolve, reject) => {
                if (resp.error) {
                    // if()
                    Global.alertMediator.addAlert("游戏链接已失效，请由平台重新进入", () => {
                        FrameUtils.flushWindow();
                    }, null, true);
                    // reject();
                } else {
                    LogUtils.logD(resp);
                    Global.playerProxy.playerData = resp.data;
                    Global.playerProxy.token = data.token;
                    //  Global.playerProxy.playerData.figureUrl = resp.data.figure_url
                    resolve();
                }
            })

        }

        /**
         * 资源加载完毕
         */
        public async  onResourceLoadOver() {
            GameConfig.GAME_CONFIG = RES.getRes("client_json");
            if (!ServerConfig.PATH_CONFIG.token_login) {
                LogUtils.logD("测试环境登陆")
                this.devLogin();
            } else {
                LogUtils.logD("正式环境登陆")
                this.envLogin();
            }
        }
        /**
         * 服务器获取授权
         * @param  {} data
         */
        public async auth(data) {
            let gatePath = ServerConfig.PATH_CONFIG.http_header + ServerConfig.PATH_CONFIG.http_server + ":" + ServerConfig.PATH_CONFIG.http_port;
            egret.clearTimeout(this.timeout);
            this.timeout = egret.setTimeout(function () {
                Global.alertMediator.addAlert("连接服务器失败,请重试!", () => {
                    FrameUtils.flushWindow();
                }, null, true);
            }, this, 5000);
            let resp: any = await Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/auth", data);
            egret.clearTimeout(this.timeout);
            return new Promise((resolve, reject) => {
                if (resp.error) {
                    Global.alertMediator.addAlert("连接服务器失败,请检查网络!", () => {
                        FrameUtils.flushWindow();
                    }, null, true);
                } else {
                    Global.playerProxy.playerData = resp.data;
                    Global.playerProxy.token = resp.data.token;
                    //  Global.playerProxy.playerData.figureUrl = resp.data.figure_url
                    resolve();
                }
            });
        }


        /**
         * 获取socket服务器地址列表
         */
        public async queryEntry() {
            var req = { token: Global.playerProxy.token };
            return new Promise((resolve, reject) => {
                let gatePath = ServerConfig.PATH_CONFIG.http_header + ServerConfig.PATH_CONFIG.http_server + ":" + ServerConfig.PATH_CONFIG.http_port;
                Global.netProxy.sendRequest(gatePath + "/gate/clientApi/queryEntry", req, function (resp) {
                    if (resp.error) {
                        Global.alertMediator.addAlert("连接服务器失败,请检查网络!", () => {
                            FrameUtils.flushWindow();
                        }, null, true);
                    } else {
                        Global.gameProxy.connectorInfo = resp.data;
                        resolve();
                    }
                })
            });
        }



        /**
         * 使用token登陆
         */
        private chaoshi;
        public async connect() {
            try {
                egret.clearTimeout(this.chaoshi);
                //先握手
                this.chaoshi = egret.setTimeout(() => {
                    Global.alertMediator.addAlert("连接游戏服务器失败", () => {
                        FrameUtils.flushWindow();
                    }, null, true);
                }, this, 10000)
                await PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port);
                let resp: any = await PomeloManager.instance.request('connector.entryHandler.c_connect', {
                    token: Global.playerProxy.token
                });
                Global.gameProxy.pMd = resp.broadcast;
                egret.clearTimeout(this.chaoshi);
                this.chaoshi = null;
                return new Promise(function (resolve, reject) {
                    if (resp) {
                        if (resp.error && resp.error.code != 0) {
                            alert("登录失败")
                            return;
                        }
                        PomeloManager.instance.state = PomeloStateEnum.CONNECT;
                    }
                    resolve();
                })
                //登陆成功
            } catch (err) {
                PomeloManager.instance.state = PomeloStateEnum.DISCONNECT;
                egret.setTimeout(this.connect, this, 10000);
            }
        }

        //获取金币场场配置信息
        public async getSceneConfigInfo(data) {
            try {
                let resp: any = await PomeloManager.instance.request('hall.sceneHandler.c_getSceneConfigInfo', data);
                Global.gameProxy.gameNums = resp;
                this.userLoginSuc()
            } catch (err) {
                egret.error('********* 获取金币场场配置信息 err=', err);
            }

        }

    }
}