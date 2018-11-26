
module game {
	export class LogoMediator extends BaseMediator {
		public static NAME: string = "LogoMediator";
		public type: string = "scene";
		public constructor() {
			super(LogoMediator.NAME);
		}

		public viewComponent: LogoScene;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_LOADING,
				SceneNotify.CLOSE_LOADING
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new MainGameMediator());
			// this.facade.registerMediator(new MainGameMediator());
			
		}

		public showViewComponent() {
			this.viewComponent = new LogoScene();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_LOADING:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_LOADING:
					this.closeViewComponent(1);
					break;
			}
		}
	}
}