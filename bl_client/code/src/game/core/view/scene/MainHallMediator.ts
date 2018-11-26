class MainHallMediator extends BaseMediator {
	public static NAME: string = "MainHallMediator";
	public type: string = "scene";
	public constructor() {
		super(MainHallMediator.NAME);
	}

	public viewComponent: MainHallScene;
	public listNotificationInterests(): Array<any> {
		return [
			SceneNotify.OPEN_MAIN_HALL,
			SceneNotify.CLOSE_MAIN_HALL
		];

	}


	public onRegister() {
		super.onRegister();
		this.facade.registerMediator(new majiang.MjiangSelectMediator());
		this.facade.registerMediator(new niuniu.NiuniuHallMediator());
		this.facade.registerMediator(new HelpMediator());
		this.facade.registerMediator(new SettingMediator());
	}


	/**
	 * 固有写法
	 */
	public showViewComponent() {
		if (this.viewComponent) {
			return;
		}
		this.viewComponent = new MainHallScene();
		var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
		sceneLayer.addChild(this.viewComponent);
	}


	public handleNotification(notification: puremvc.INotification): void {
		switch (notification.getName()) {
			case SceneNotify.OPEN_MAIN_HALL:
				this.showViewComponent();
				break;
			case SceneNotify.CLOSE_MAIN_HALL:
				this.closeViewComponent(1);
				break;
		}

	}
}



