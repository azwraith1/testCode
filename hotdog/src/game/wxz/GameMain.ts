class GameMain extends eui.Component implements eui.UIComponent {
	private scoreLabel: eui.Label;
	private IG_WXZ: Hero;
	private IG_HotDog: Bullet[] = [];

	private score: number = 0;
	private time: number = 0;
	private _timer: egret.Timer;
	private nandu: number = 1000;
	private startX: number;
	private endX: number;
	private startY: number;
	private endY: number;
	private i: number = 1;
	// private hotDog: eui.Image;
	public constructor() {
		super();
		this.skinName = "GameMainSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
	}

	private init() {
		this.score = 0;
		this.IG_WXZ = <Hero>ObjectPool.getInstance().createObject(Hero);
		this.addChild(this.IG_WXZ.view);
		this.IG_HotDog[0] = <Bullet>ObjectPool.getInstance().createObject(Bullet);
		this.addChild(this.IG_HotDog[0].view);
		this.IG_HotDog[0].view.x = Math.floor(Math.random() * 700);
		this.IG_HotDog[0].view.y = -54;
		egret.Tween.get(this.IG_HotDog[0].view).to({ y: 1280 }, this.nandu * 3, egret.Ease.sineIn);
		this._timer = new egret.Timer(300, 0);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerStart, this);
		this._timer.start();
		egret.Ticker.getInstance().register(this.onEnterFrame, this);

	}

	private timerStart() {
		this.IG_HotDog[this.i] = <Bullet>ObjectPool.getInstance().createObject(Bullet);
		this.addChild(this.IG_HotDog[this.i].view);
		this.IG_HotDog[this.i].view.x = Math.floor(Math.random() * 700);
		this.IG_HotDog[this.i].view.y = -54;
		egret.Tween.get(this.IG_HotDog[this.i].view).to({ y: 1280 }, this.nandu * 3, egret.Ease.sineIn);
		this.i++;
	}

	private onEnterFrame() {
		for (let i = 0; i < this.IG_HotDog.length; i++) {
			if (CONST.hitTest(this.IG_WXZ.view, this.IG_HotDog[i].view)) {
				if (this.IG_HotDog[i].view && this.IG_HotDog[i].view.parent) {
					this.IG_HotDog[i].view.parent.removeChild(this.IG_HotDog[i].view);
				}
				CONST.goal++;
				return;
			}
		}
		this.scoreLabel.text = CONST.goal + "";
	}

	private startMove(e: egret.TouchEvent) {
		this.startX = e.stageX;
		this.startY = e.stageY;
	}

	private touchEnd(e: egret.TouchEvent) {

	}

	private touchMove(e: egret.TouchEvent) {
		this.IG_WXZ.view.x += e.stageX - this.startX;
		this.IG_WXZ.view.y += e.stageY - this.startY;
		this.startX = e.stageX;
		this.startY = e.stageY;
	}
}