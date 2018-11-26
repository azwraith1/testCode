// TypeScript file
module game{
    export class BonusPanelMediator extends BaseMediator{
        public static NAME: string = "BonusPanelMediator";
		public type: string = "panel";
		public constructor() {
			super(BonusPanelMediator.NAME);
		}

		public viewComponent: BonusPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_BONUS,
				PanelNotify.CLOSE_BONUS
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new MainGameMediator());
			// this.facade.registerMediator(new majiang.MjiangSelectMediator());
			
		}

		public showViewComponent() {
			this.viewComponent = new BonusPanel();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_BONUS:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_BONUS:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}