module niuniu {
	export class NiuniuSGameMediator extends BaseMediator {
		public static NAME: string = "NiuniuSGameMediator";
		public type: string = "scene";
		public constructor() {
			super(NiuniuSGameMediator.NAME);
		}

		public viweComponent: NiuniuSGameScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUGAMES,
				SceneNotify.CLOSE_NIUNIUGAMES
			];

		}

		public onRegister() {
			super.onRegister();
		}


		/**
	 * 固有写法
	 */
		public showViewComponent() {
			if (this.viewComponent) {
				return;
			}
			game.UIUtils.changeResize(2);
			egret.MainContext.instance.stage.setContentSize(720, 1280);
			this.viewComponent = new NiuniuSGameScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUGAMES:
					LoadingScene.instance.load("niuniu_s", "majiang_bg_jpg", () => {
						// RES.loadGroup("niuniu_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_NIUNIUGAMES:
					game.UIUtils.changeResize(1);
					this.closeViewComponent(1);
					break;
			}

		}

	}
}