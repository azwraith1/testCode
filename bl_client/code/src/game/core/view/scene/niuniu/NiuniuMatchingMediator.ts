module niuniu {
	export class NiuniuMatchingMediator extends BaseMediator {
		public static NAME: string = "NiuniuMatchingMediator";
		public type: string = "scene";
		public constructor() {
			super(NiuniuMatchingMediator.NAME);
		}

		public viweComponent: NiuniuMatchingScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUWAITE,
				SceneNotify.CLOSE_NIUNIUWAITE
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
			this.viewComponent = new NiuniuMatchingScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUWAITE:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_NIUNIUWAITE:
					game.UIUtils.changeResize(1);
					this.closeViewComponent(1);
					break;
			}

		}
	}
}