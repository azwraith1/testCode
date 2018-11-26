// TypeScript file
module game{
    export class TipsPanelMediator extends BaseMediator{
        public static NAME: string = "TipsPanelMediator";
		public type: string = "panel";
		public constructor() {
			super(TipsPanelMediator.NAME);
		}

		public viewComponent: TipsPanel;
		public listNotificationInterests(): Array<any> {
			return [
				PanelNotify.OPEN_TIPS,
				PanelNotify.CLOSE_TIPS
			];
		}

		public onRegister() {
			super.onRegister();
			this.facade.registerMediator(new MainGameMediator());
			// this.facade.registerMediator(new majiang.MjiangSelectMediator());
			
		}

		public showViewComponent() {
			this.viewComponent = new TipsPanel();
			var sceneLayer = GameLayerManager.gameLayer().panelLayer;
			sceneLayer.addChild(this.viewComponent);
		}

		public handleNotification(notification: puremvc.INotification): void {
			switch (notification.getName()) {
				case PanelNotify.OPEN_TIPS:
					this.showViewComponent();
					break;
				case PanelNotify.CLOSE_TIPS:
					this.closeViewComponent(1);
					break;
			}
		}
    }
}