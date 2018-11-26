/*
 * @Author: He Bing 
 * @Date: 2018-07-04 16:16:13 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-07 15:12:03
 @Description:游戏玩法赋值
 */

module majiang {
	export class MajiangSelectRenderer extends game.BaseUI {
		private data;
		private gameType;
		public constructor(data, gameType) {
			super();
			this.data = data;
			this.gameType = gameType;
			this.skinName = new MajiangXcBarSkin();

		}
		private bar_img: eui.Image;
		private bar_cc: eui.Image;
		private bar_dz: eui.Image;
		private dizhu: eui.Label;
		private zhunru: eui.Label;
		private bar: eui.Group;
		private sceneId: number;
		private zuidiGold: number;
		private dzGroup: eui.Group;
		protected createChildren(): void {
			super.createChildren();
			let num = this.data;
			ImageUtils.showRes(this.bar_img, "mj_xc_" + num["icon"] + "_png");
			ImageUtils.showRes(this.bar_cc, "mj_xc_" + num["icon"] + "_" + num["icon"] + "_png");
			// this.bar_cc.source = RES.getRes("mj_xc_" + num["icon"] + "_" + num["icon"] + "_png");
			//	this.bar_dz.source = RES.getRes("mj_xcdz_" + num["icon"] + "_png");
			this.dizhu.text = this.data["bet_base"];
			this.dizhu.stroke = 2;
			//this.dizhu.textColor = this.showColor(num["icon"]);
			//this.dizhu.strokeColor = this.showColor1(num["icon"])
			//this.dizhu.textAlign = "center";
			this.dzGroup.horizontalCenter = 0;
			this.zuidiGold = this.data["gold_min"];
			this.zhunru.text = "准入:" + this.data["gold_min"];
			game.UIUtils.setAnchorPot(this);
			this.sceneId = num.id;
		}


		/**
		 * 底注，文字赋值不同的颜色
		 */
		private showColor(num) {
			switch (num) {
				case 1:
					return 0x9dff86;
				case 2:
					return 0xfcd743;
				case 3:
					return 0xffc1b9;
				case 4:
					return 0xfebaff;
			}
		}


		/**
		 *文字描边
		 */
		private showColor1(num) {
			switch (num) {
				case 1:
					return 0x216132;
				case 2:
					return 0x924700;
				case 3:
					return 0x810f00;
				case 4:
					return 0x760075;
			}
		}

		/**
		 * 检查回到界面
		 */
		private async checkReconnectScene() {
			let roomState = Global.gameProxy.roomState;
			let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, null);
			Global.gameProxy.roomState = resp;
			if (resp && resp.state == 1) {
				let text = GameConfig.GAME_CONFIG['long_config']['10004'].content
				Global.alertMediator.addAlert(text, () => {
					EventManager.instance.dispatch(EventNotify.ENTER_GOLD_SCENE, resp);
				});
			} else {
				EventManager.instance.dispatch(EventNotify.ENTER_GOLD_SCENE, { gameId: this.gameType, sceneId: this.sceneId, diFen: this.data["bet_base"] });
			}
		}

		private lock: boolean = false;
		protected onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			majiang.MajiangUtils.playClick();//管理声音的
			if (this.lock) {
				return;
			}
			this.lock = true;
			egret.setTimeout(function () {
				this.lock = false
			}, this, 1000);
			let playerGold = Global.playerProxy.playerData.gold;
			if (playerGold < this.zuidiGold) {
				let text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
				Global.alertMediator.addAlert(text, null, null, true);
				return;
			}
			this.checkReconnectScene();
			egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
		}
	}
}