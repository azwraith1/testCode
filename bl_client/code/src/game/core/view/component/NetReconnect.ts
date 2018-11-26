/*
 * @Author: li mengchan 
 * @Date: 2018-07-24 10:37:37 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-30 11:18:12
 * @Description: 断线重连
 */
module game {
	export class NetReconnect extends BaseComponent {
		public static _instance: NetReconnect;
		private tipImage: eui.Image;
		//5次计数如果没有打开则弹开面板
		private count: number = 5;
		public active: boolean = true;
		private connectInterval;
		public constructor() {
			super();
			this.skinName = new NetReConnectSkin();
		}

		public static get instance(): NetReconnect {
			if (!NetReconnect._instance) {
				NetReconnect._instance = new NetReconnect();
				NetReconnect._instance.name = "netReconnect";
				NetReconnect._instance.visible = false;
				GameLayerManager.gameLayer().maskLayer.addChild(NetReconnect._instance);
			}
			return NetReconnect._instance;
		}

		public createChildren() {
			super.createChildren();
		}

		public async hide() {
			this.visible = false;
			egret.Tween.removeTweens(this.tipImage);
			egret.clearInterval(this.connectInterval)
			this.connectInterval = null;
			PomeloManager.instance.lockResp = false;
		}

		public async show() {
			if (this.visible || !this.active) {
				return;
			}
			// if (this.active) {
			PomeloManager.instance.lockResp = true;
			LogUtils.logD("重新连接");
			egret.clearInterval(this.connectInterval);
			this.connectInterval = null;
			this.visible = true;
			egret.Tween.removeTweens(this.tipImage);
			egret.Tween.get(this.tipImage, { loop: true }).to({
				rotation: this.tipImage.rotation + 360
			}, 3000);
			let count = 0;
			this.connect();
			this.connectInterval = egret.setInterval(async () => {
				//重新连接
				count++;
				if (count >= 5) {
					egret.clearInterval(this.connectInterval)
					this.connectInterval = null;
					this.showReconnectFailTips();
					return;
				}
				this.connect();
			}, this, 2000);
			// }
		}


		private async connect() {
			await PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port);
			let resp: any = await PomeloManager.instance.request('connector.entryHandler.c_connect', {
				token: Global.playerProxy.token,
			});
			if (resp && !resp.error) {
				resp.error = {};
				resp.error.code = 0;
			}
			if (resp) {
				if (resp.error && resp.error.code != 0) {
					egret.clearInterval(this.connectInterval)
					this.connectInterval = null;
					return;
				}
				LogUtils.logD("请求重连");
				PomeloManager.instance.state = PomeloStateEnum.CONNECT;
				NetErrorTips.instance.hide();
				egret.clearInterval(this.connectInterval)
				this.connectInterval = null;
				EventManager.instance.dispatch(EventNotify.RECONNECT_SUC, {});
				game.NetReconnect.instance.hide();
			}
		}

		/**
		 * 重新连接失败
		 */
		public showReconnectFailTips() {
			this.hide();
			let text = GameConfig.GAME_CONFIG['long_config']['10005'].content || "连接失败，请检查网络后重试";
			Global.alertMediator.addAlert(text, () => {
				this.show();
			}, null, true);
		}
	}
}