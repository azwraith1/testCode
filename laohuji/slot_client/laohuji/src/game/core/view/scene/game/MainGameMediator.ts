// TypeScript file
module game{
    export class MainGameMediator extends BaseMediator{
        public static NAME: string = "MainGameMediator";
		public type: string = "scene";
		public constructor() {
			super(MainGameMediator.NAME);
		}

		public viewComponent: test;
		public listNotificationInterests(): Array<any> {
			return [
				SceneNotify.OPEN_GAME,
				SceneNotify.CLOSE_GAME
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new BonusPanelMediator());
			this.facade.registerMediator(new TipsPanelMediator());
			// this.facade.registerMediator(new majiang.MjiangSelectMediator());
			
		}

		public showViewComponent() {
			this.viewComponent = new test();
			var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case SceneNotify.OPEN_GAME:
					this.showViewComponent();
					break;
				case SceneNotify.CLOSE_GAME:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}