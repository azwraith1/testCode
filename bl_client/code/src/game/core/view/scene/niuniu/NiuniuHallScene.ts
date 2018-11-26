
module niuniu {
	export class NiuniuHallScene extends game.BaseComponent {
		private nnTypeGroup: eui.Group;
		private backBtn: eui.Button;
		private nnGirl: eui.Group;
		public static hallId: string = "blnn";
		public constructor() {
			super();
			this.skinName = new NiuniuHallSceneSkin();
		}

		public createChildren() {
			super.createChildren();
			this.checkReconnectScene();
			game.AudioManager.getInstance().playMajiangMusic("playingingame_mp3");
			// dragonBones.removeAllMovieGroup();
			this.showDB();
			this.gameList();
		}


		/**
		 * 检查回到界面
		 */
		private checkReconnectScene() {
			let roomState = Global.gameProxy.roomState;
			if (roomState && roomState.state == 1) {
				let text = GameConfig.GAME_CONFIG['long_config']['10004'].content
				Global.alertMediator.addAlert(text, () => {
					EventManager.instance.dispatch(EventNotify.ENTER_GOLD_SCENE, roomState);
				});
			}
		}

		public onAdded() {
			super.onAdded();
			EventManager.instance.addEvent(EventNotify.ENTER_GOLD_SCENE, this.enterScene, this);


		}

		public onRemoved() {
			super.onRemoved();
			EventManager.instance.removeEvent(EventNotify.ENTER_GOLD_SCENE, this.enterScene, this);
			ObjectPool.reclaim("nn_hall_npc_1", this.dh4);
			for (let i = 0; i < 6; i++) {
				ObjectPool.reclaim("db" + i, this.objects[i]);
			}
		}

		/**
		 * 获取对局信息
		 * @param  {egret.Event} e?
		 */
		private lock: boolean = false;
		private async enterScene(event?: egret.Event) {
			if (this.lock) {
				return;
			}
			this.lock = true;
			var data = event.data;
			Global.niuniuProxy.lastGameConfig = data;
			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			if (!resp) {
				this.lock = false;
				return;
			}
			try {
				console.info('********* enterScene resp=%j', resp);
				if (resp.reconnect) {
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUSELECT);
					HallForwardFac.redirectScene(resp, data);
				} else {
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUSELECT);

					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUWAITE, data);
				}
			} catch (e) {
				Global.alertMediator.addAlert("加入房间失败");
			} finally {
				this.lock = false;
			}
		}

		public onTouchTap(event: egret.TouchEvent) {
			event.stopPropagation();
			switch (event.target) {
				case this.backBtn://
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUSELECT);
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAIN_HALL);
					break;


			}
		}
		private objects = [];
		private gameList() {
			var nums = Global.gameProxy.gameNums["blnn"];
			let index = 0;
			var item: any;
			for (let i in nums) {
				item = ObjectPool.produce("db" + (parseInt(i) % 1000 - 1), NiuniuTypeBarRenderer) as NiuniuTypeBarRenderer;
				if (!item) {
					item = new NiuniuTypeBarRenderer(nums[i], i);
				}
				this.nnTypeGroup.addChild(item);
				if (index >= 3) {
					item.x = item.width / 2 + (index - 3) * (item.width + 70);
					item.y = item.width * 1.9;
				} else {
					item.x = item.width / 2 + index * (item.width + 70)
					item.y = 120;
				}
				index++;
				this.objects.push(item);
				item.alpha = 0;
				egret.Tween.get(item).to({ alpha: 0 }, 100).to({ alpha: 1 }, 200);
			}
		}

		private dh4: any;
		private showDB() {
			this.dh4 = ObjectPool.produce("nn_hall_npc_1", dragonBones.EgretArmatureDisplay) as dragonBones.EgretArmatureDisplay;
			if (!this.dh4) {
				this.dh4 = DBFactory.instance.getDB("nn_hall_npc_1_ske_json", "nn_hall_npc_1_tex_json", "nn_hall_npc_1_tex_png", "nn_hall_npc_1");
			}
			this.dh4.x = 150;
			this.dh4.y = 650;
			this.dh4.animation.play(null, 0);
			this.nnGirl.addChild(this.dh4);
		}
	}
}
