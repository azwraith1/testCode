module niuniu {
	export class NiuniuGameMediator extends BaseMediator {
		public static NAME: string = "NiuniuGameMediator";
		public type: string = "scene";
		public isShu: boolean = true;
		public constructor() {
			super(NiuniuGameMediator.NAME);
		}

		public viweComponent: NiuniuScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUGAME,
				SceneNotify.CLOSE_NIUNIUGAME
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
			this.viewComponent = new NiuniuScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUGAME:
					LoadingScene.instance.load("niuniu", "majiang_bg_jpg", () => {
						// RES.loadGroup("niuniu_back");
						this.showViewComponent();
					});
					break;
				case SceneNotify.CLOSE_NIUNIUGAME:
					this.closeViewComponent(1);
					break;
			}

		}

	}
}