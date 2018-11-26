module niuniu {
	export class NiuniuJiesuanMediator extends BaseMediator {
		public static NAME: string = "NiuniuJiesuanMediator";
		public type: string = "scene";
		public constructor() {
			super(NiuniuJiesuanMediator.NAME);
		}

		public viweComponent: NiuniuJiesuanScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_NIUNIUJIESUAN,
				SceneNotify.CLOSE_NIUNIUJIESUAN
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
			this.viewComponent = new NiuniuJiesuanScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_NIUNIUJIESUAN:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_NIUNIUJIESUAN:
					this.closeViewComponent(1);
					break;
			}

		}
	}
}