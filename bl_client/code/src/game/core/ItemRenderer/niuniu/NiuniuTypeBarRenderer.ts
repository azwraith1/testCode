
/*
 * @Author: He Bing 
 * @Date: 2018-07-04 16:16:13 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-12 11:06:37
 @Description:游戏玩法赋值
 */

module niuniu {
	export class NiuniuTypeBarRenderer extends game.BaseUI {
		private data;
		private gameType;
		public constructor(data, gameType) {
			super();
			this.data = data;
			this.gameType = gameType;
			this.skinName = new NiuniuTypeBarSkin();

		}

		private dizhu: eui.Label;
		private zhunru: eui.Label;
		private sceneId: number;
		private zuidiGold: number;
		private dbgroup: eui.Group;
		protected createChildren(): void {
			super.createChildren();
			let num = this.data;
			this.dizhu.text = "底注：" + this.data["bet_base"];
			this.dizhu.stroke = 2;
			this.zuidiGold = this.data["gold_min"];
			this.zhunru.text = "准入:" + this.data["gold_min"];
			game.UIUtils.setAnchorPot(this);
			this.sceneId = num.id;
			this.showDB(this.gameType);
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
		private checkReconnectScene() {
			EventManager.instance.dispatch(EventNotify.ENTER_GOLD_SCENE, { gameId: 10003, sceneId: this.gameType, diFen: this.data["bet_base"]});
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

		private dh: any;
		private showDB(nums) {
			let num = (nums % 1000) - 1;
			this.dh = DBFactory.instance.getDB("nn_hall_icon_da_" + num + "_ske_json", "nn_hall_icon_da_" + num + "_tex_json", "nn_hall_icon_da_" + num + "_tex_png", "nn_hall_icon_da_" + num + "");
			this.dh.x = 110;
			this.dh.y = 180;
			this.dh.animation.play(null, 0);
			this.dbgroup.addChild(this.dh);
		}


	}
}