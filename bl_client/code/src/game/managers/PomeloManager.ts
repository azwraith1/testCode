/*
 * @Author: Li MengChan 
 * @Date: 2018-07-02 10:10:54 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-09 15:11:58
 * @Description: 服务器通讯类
 */
module game {
	export class PomeloManager {
		public pomelo: PomeloForEgret.Pomelo;
		private static _instance: PomeloManager;
		public state: PomeloStateEnum = PomeloStateEnum.INIT;
		private pomeloFuncmap: HashMap<string, string> = new HashMap<string, string>();
		public lockReq: boolean = false;
		public lockResp: boolean = false;
		public isRunBack: boolean = false;
		private requestTimeout;
		public constructor() {
			if (PomeloManager._instance) {
				throw new Error("PomeloManager使用单例");
			}
		}


		public static get instance(): PomeloManager {
			if (!PomeloManager._instance) {
				PomeloManager._instance = new PomeloManager();
				PomeloManager._instance.pomelo = new PomeloForEgret.Pomelo();
				PomeloManager._instance.listenOnAll();
				Global.pomelo = PomeloManager._instance;
				EventManager.instance.addEvent("disconnect", PomeloManager._instance.reConnect, this);
				EventManager.instance.addEvent(PomeloForEgret.Pomelo.EVENT_IO_ERROR, PomeloManager._instance.onError, this);
			}
			return PomeloManager._instance;
		}

		private onClose() {
			// Global.pomelo.state = PomeloStateEnum.DISCONNECT;
		}

		private startRequestOutTime() {
			if (this.requestTimeout) {
				return;
			}
			this.requestTimeout = egret.setTimeout(() => {
				NetErrorTips.instance.show("网络错误,请求超时！");
				// Global.alertMediator.addAlert("您的网络似乎出现问题,请重新进入游戏", () => {
				// 	FrameUtils.flushWindow();
				// }, null, true);
			}, this, 5000);
		}


		private clearRequestOutTime() {
			egret.clearTimeout(this.requestTimeout);
			this.requestTimeout = null;
		}
		/**
		 * 发送请求
		 * @param  {string} roteName
		 * @param  {any} param
		 */
		public request(roteName: string, param: any) {
			if (!param) {
				param = {};
			}
			if (this.lockReq) {
				return;
			}
			param.token = Global.playerProxy.token;
			return new Promise((resolve, reject) => {
				this.startRequestOutTime();
				this.pomelo.request(roteName, param, (resp) => {
					this.clearRequestOutTime();
					// console.log(roteName + "反悔 %j=", resp);
					LogUtils.logD(roteName + "反悔 %j=", resp);
					if (resp && resp.code === 500 && roteName != ServerPostPath.game_roomHandler_c_queryRoomInfo) {
						NetErrorTips.instance.show("与服务器断开连接，请重新进入游戏!");
						// Global.alertMediator.addAlert("与服务器断开连接，请重新进入游戏！", () => {
						// 	FrameUtils.flushWindow();
						// }, null, true);
						return;
					}
					if (roteName == ServerPostPath.hall_sceneHandler_c_enter) {
						if (resp.error && resp.error.code != 0 && resp.error.code != -213) {
							Global.alertMediator.addAlert(resp.error.msg, () => {
								// FrameUtils.flushWindow();
								resolve(null);
							}, null, true);
							return;
						}

					}
					resolve(resp);
				});
			})
		}

		public listenOnAll() {
			var allNotify = _.extendOwn(ServerNotify);
			for (var key in allNotify) {
				this.pomelo.on(allNotify[key], (event, resp) => {
					LogUtils.logD(Date.now() + "," + event + "收到推送:  %j=", resp);
					if (event == ServerNotify.s_robLogin) {
						NetReconnect.instance.active = false;
						NetErrorTips.instance.show("您的账号在其他地方登陆,请重新登陆");
						// Global.alertMediator.addAlert("您的账号在其他地方登陆,请重新登陆", () => {
						// 	FrameUtils.flushWindow();
						// }, null, true);
						return;
					}

					if (event == ServerNotify.s_payGold) {
						if (resp.ownGold) {
							Global.playerProxy.playerData.gold = resp.ownGold;
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
		}

		public listenOn(funcName: string, callback) {
			this.pomelo.on(funcName, (resp) => {

			})

		}

		/**
		 * 取消监听
		 * @param  {string} funcName
		 */
		public listenOff(funcName: string) {
			this.pomelo.off(funcName, null);
		}

		/**
		 * 请求服务器，无返回
		 * @param  {string} roteName
		 * @param  {any} param
		 * @param  {boolean} isShow?
		 */
		public notify(roteName: string, param: any, isShow?: boolean) {
			// if (!isShow) {
			// 	Global.showWaritPanel();
			// }
			this.pomelo.notify(roteName, param);
		}

		/**
		 * 初始化服务器
		 * @param  {} host
		 * @param  {} port
		 */
		public initServer(host, port) {
			host = ServerConfig.PATH_CONFIG.socket_path;
			port = port;
			return new Promise((resolve, reject) => {
				this.pomelo.init({
					host: host,
					port: port,
					log: true
				}, (socket) => {
					if (socket.code == 200) {
						resolve();
					}
				});
			});
		}

		public disConnect() {
			if (Global.pomelo.state != PomeloStateEnum.DISCONNECT) {
				Global.pomelo.state = PomeloStateEnum.DISCONNECT;
				this.pomelo.disconnect();
			}
		}


		public disConnectBySelf() {
			Global.pomelo.state = PomeloStateEnum.DISCONNECT;
			this.pomelo.disconnect();
		}


		public reConnect() {
			if (!PomeloManager.instance.isRunBack && Global.pomelo.state == PomeloStateEnum.DISCONNECT) {
				NetReconnect.instance.show();
			} else {
				Global.pomelo.state = PomeloStateEnum.DISCONNECT;
			}
		}


		public onError() {
			Global.pomelo.state = PomeloStateEnum.DISCONNECT;
			NetErrorTips.instance.show("您的网络似乎出现问题,请重新进入游戏");
			// Global.alertMediator.addAlert("您的网络似乎出现问题,请重新进入游戏", () => {
			// 	FrameUtils.flushWindow();
			// }, null, true);
		}
	}
}