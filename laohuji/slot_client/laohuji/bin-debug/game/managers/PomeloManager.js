var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-07-02 10:10:54
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-09 15:11:58
 * @Description: 服务器通讯类
 */
var game;
(function (game) {
    var PomeloManager = (function () {
        function PomeloManager() {
            this.state = PomeloStateEnum.INIT;
            this.pomeloFuncmap = new HashMap();
            this.lockReq = false;
            this.lockResp = false;
            this.isRunBack = false;
            if (PomeloManager._instance) {
                throw new Error("PomeloManager使用单例");
            }
        }
        Object.defineProperty(PomeloManager, "instance", {
            get: function () {
                if (!PomeloManager._instance) {
                    PomeloManager._instance = new PomeloManager();
                    PomeloManager._instance.pomelo = new PomeloForEgret.Pomelo();
                    PomeloManager._instance.listenOnAll();
                    Global.pomelo = PomeloManager._instance;
                    EventManager.instance.addEvent("disconnect", PomeloManager._instance.reConnect, this);
                    EventManager.instance.addEvent(PomeloForEgret.Pomelo.EVENT_IO_ERROR, PomeloManager._instance.onError, this);
                }
                return PomeloManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        PomeloManager.prototype.onClose = function () {
            // Global.pomelo.state = PomeloStateEnum.DISCONNECT;
        };
        PomeloManager.prototype.startRequestOutTime = function () {
            if (this.requestTimeout) {
                return;
            }
            this.requestTimeout = egret.setTimeout(function () {
                NetErrorTips.instance.show("网络错误,请求超时！");
                // Global.alertMediator.addAlert("您的网络似乎出现问题,请重新进入游戏", () => {
                // 	FrameUtils.flushWindow();
                // }, null, true);
            }, this, 5000);
        };
        PomeloManager.prototype.clearRequestOutTime = function () {
            egret.clearTimeout(this.requestTimeout);
            this.requestTimeout = null;
        };
        /**
         * 发送请求
         * @param  {string} roteName
         * @param  {any} param
         */
        PomeloManager.prototype.request = function (roteName, param) {
            var _this = this;
            if (!param) {
                param = {};
            }
            if (this.lockReq) {
                return;
            }
            param.token = Global.playerProxy.token;
            return new Promise(function (resolve, reject) {
                _this.startRequestOutTime();
                _this.pomelo.request(roteName, param, function (resp) {
                    _this.clearRequestOutTime();
                    console.log(roteName + "反悔 %j=", resp);
                    // LogUtils.logD(roteName + "反悔 %j=", resp);
                    if (resp && resp.code === 500 && roteName != ServerPostPath.game_roomHandler_c_queryRoomInfo) {
                        NetErrorTips.instance.show("与服务器断开连接，请重新进入游戏!");
                        // Global.alertMediator.addAlert("与服务器断开连接，请重新进入游戏！", () => {
                        // 	FrameUtils.flushWindow();
                        // }, null, true);
                        return;
                    }
                    if (roteName == ServerPostPath.hall_sceneHandler_c_leave) {
                        if (resp.error && resp.error.code != 0 && resp.error.code != -213) {
                            // Global.alertMediator.addAlert(resp.error.msg, () => {
                            // 	// FrameUtils.flushWindow();
                            // 	resolve(null);
                            // }, null, true);
                            return;
                        }
                    }
                    resolve(resp);
                });
            });
        };
        PomeloManager.prototype.listenOnAll = function () {
            var allNotify = _.extendOwn(ServerNotify);
            for (var key in allNotify) {
                this.pomelo.on(allNotify[key], function (event, resp) {
                    // LogUtils.logD(Date.now() + "," + event + "收到推送:  %j=", resp);
                    if (event == ServerNotify.s_robLogin) {
                        // NetReconnect.instance.active = false;
                        NetErrorTips.instance.show("您的账号在其他地方登陆,请重新登陆");
                        // Global.alertMediator.addAlert("您的账号在其他地方登陆,请重新登陆", () => {
                        // 	FrameUtils.flushWindow();
                        // }, null, true);
                        return;
                    }
                    if (event == ServerNotify.s_payGold) {
                        if (resp.ownGold) {
                            Global.playerProxy.playerData.count_gold = resp.ownGold;
                            EventManager.instance.dispatch(event, resp);
                            return;
                        }
                    }
                    // if (this.lockReq) {
                    // 	return;
                    // }
                    EventManager.instance.dispatch(event, resp);
                });
            }
        };
        PomeloManager.prototype.listenOn = function (funcName, callback) {
            this.pomelo.on(funcName, function (resp) {
            });
        };
        /**
         * 取消监听
         * @param  {string} funcName
         */
        PomeloManager.prototype.listenOff = function (funcName) {
            this.pomelo.off(funcName, null);
        };
        /**
         * 请求服务器，无返回
         * @param  {string} roteName
         * @param  {any} param
         * @param  {boolean} isShow?
         */
        PomeloManager.prototype.notify = function (roteName, param, isShow) {
            // if (!isShow) {
            // 	Global.showWaritPanel();
            // }
            this.pomelo.notify(roteName, param);
        };
        /**
         * 初始化服务器
         * @param  {} host
         * @param  {} port
         */
        PomeloManager.prototype.initServer = function (host, port) {
            var _this = this;
            host = ServerConfig.PATH_CONFIG.socket_path;
            port = port;
            return new Promise(function (resolve, reject) {
                _this.pomelo.init({
                    host: host,
                    port: port,
                    log: true
                }, function (socket) {
                    if (socket.code == 200) {
                        resolve();
                    }
                });
            });
        };
        PomeloManager.prototype.disConnect = function () {
            if (Global.pomelo.state != PomeloStateEnum.DISCONNECT) {
                Global.pomelo.state = PomeloStateEnum.DISCONNECT;
                this.pomelo.disconnect();
            }
        };
        PomeloManager.prototype.disConnectBySelf = function () {
            Global.pomelo.state = PomeloStateEnum.DISCONNECT;
            this.pomelo.disconnect();
        };
        PomeloManager.prototype.reConnect = function () {
            if (!PomeloManager.instance.isRunBack && Global.pomelo.state == PomeloStateEnum.DISCONNECT) {
                // NetReconnect.instance.show();
            }
            else {
                Global.pomelo.state = PomeloStateEnum.DISCONNECT;
            }
        };
        PomeloManager.prototype.onError = function () {
            Global.pomelo.state = PomeloStateEnum.DISCONNECT;
            NetErrorTips.instance.show("您的网络似乎出现问题,请重新进入游戏");
            // Global.alertMediator.addAlert("您的网络似乎出现问题,请重新进入游戏", () => {
            // 	FrameUtils.flushWindow();
            // }, null, true);
        };
        return PomeloManager;
    }());
    game.PomeloManager = PomeloManager;
    __reflect(PomeloManager.prototype, "game.PomeloManager");
})(game || (game = {}));
//# sourceMappingURL=PomeloManager.js.map