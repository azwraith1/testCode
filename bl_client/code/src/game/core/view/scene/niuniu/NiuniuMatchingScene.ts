module niuniu {
	export class NiuniuMatchingScene extends game.BaseComponent {
		private joinTimeout;
		private juhuaGroup: eui.Group;
		private rotationImage: eui.Image;
		private scenceId: number = 0;
		private backBtn: eui.Button
		public constructor() {
			super();
			this.skinName = new NiuniuSWaitSkin();
		}

		public async createChildren() {
			super.createChildren();
			egret.Tween.get(this.rotationImage, { loop: true }).to({
				rotation: 360
			}, 3000);
		}

		public onAdded() {
			super.onAdded();
			EventManager.instance.addEvent(ServerNotify.s_startNewRound, this.startNewRound, this);
			EventManager.instance.addEvent(ServerNotify.s_enterResult, this.enterResult, this);
			EventManager.instance.addEvent(ServerNotify.s_playerEnter, this.playerEnter, this);
		}

		public onRemoved() {
			super.onRemoved();
			EventManager.instance.removeEvent(ServerNotify.s_startNewRound, this.startNewRound, this);
			EventManager.instance.removeEvent(ServerNotify.s_enterResult, this.enterResult, this);
			EventManager.instance.removeEvent(ServerNotify.s_playerEnter, this.playerEnter, this);
		}

		private enterResult(e: egret.Event) {
			Global.niuniuProxy.setRoomInfo(e.data);
		}


		private playerEnter(e: egret.Event) {
			let data = e.data;
			Global.niuniuProxy.updatePlayer(data.playerIndex, data.player);
		}

		public startNewRound(e: egret.Event) {
			//await Global.gameProxy.req2updateRoom();
			game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUWAITE);
			game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUGAMES, this.scenceId);
		}

		public onTouchTap(event: egret.TouchEvent) {
			event.stopPropagation();
			switch (event.target) {
				case this.backBtn:
					this.backBtnTouch();
					break;
			}
		}

		private async backBtnTouch() {
			Global.gameProxy.clearRoomInfo();
			var handler = ServerPostPath.hall_sceneHandler_c_leave;
			let resp1: any = await game.PomeloManager.instance.request(handler, null);
			if (resp1 && resp1.error && resp1.error.code == 0) {
				game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUWAITE);
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUSELECT);
			} else {
				Global.alertMediator.addAlert("退出房间失败", null, null, true);
			}
		}

	}
}