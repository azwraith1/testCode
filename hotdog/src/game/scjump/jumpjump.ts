class jumpjump extends eui.Component implements eui.UIComponent {
	private jumpbtn: eui.Button;
	private IG_WXZ: SCjumpPool;
	private IG_HotDog: HotDogJumpPool[] = [];
	private wjl_img: eui.Image;

	private _timer: egret.Timer;
	private i: number = 1;

	public constructor() {
		super();
		this.skinName = "jumpjumpSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.jumpbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jump, this)
		this.init();
	}

	private init() {
		this.IG_HotDog[0] = <HotDogJumpPool>ObjectPool.getInstance().createObject(HotDogJumpPool);
		this.addChild(this.IG_HotDog[0].view);
		this.IG_HotDog[0].view.x = 720;
		this.IG_HotDog[0].view.y = 1021;
		egret.Tween.get(this.IG_HotDog[0].view).to({ x: -86 }, 8500);
		this.addChild(this.IG_HotDog[0].view);
		this.IG_WXZ = <SCjumpPool>ObjectPool.getInstance().createObject(SCjumpPool);
		this.addChild(this.IG_WXZ.view);
		this._timer = new egret.Timer(1500, 0);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.addHotDog, this);
		this._timer.start();
		egret.Ticker.getInstance().register(this.onEnterFrame, this);

	}

	private addHotDog() {
		let k = Math.floor(Math.random() * 10);
		this.IG_HotDog[this.i] = <HotDogJumpPool>ObjectPool.getInstance().createObject(HotDogJumpPool);
		this.addChild(this.IG_HotDog[this.i].view);
		this.IG_HotDog[this.i].view.x = 720;
		this.IG_HotDog[this.i].view.y = 1020;
		egret.Tween.get(this.IG_HotDog[this.i].view).to({ x: -86 }, 8500);
		if (k <= 5) {
			this.i++;
			this.IG_HotDog[this.i] = <HotDogJumpPool>ObjectPool.getInstance().createObject(HotDogJumpPool);
			this.addChild(this.IG_HotDog[this.i].view);
			this.IG_HotDog[this.i].view.x = 720;
			this.IG_HotDog[this.i].view.y = 1020 - this.IG_HotDog[this.i].view.height;
			this.addChild(this.IG_HotDog[this.i].view);
			egret.Tween.get(this.IG_HotDog[this.i].view).to({ x: -86 }, 2500);
		}else{return};
		this.i++;
	}

	private jump(e: egret.TouchEvent) {
		this.IG_WXZ.view.y -= 90;
		egret.Tween.get(this.IG_WXZ.view).to({ y: this.IG_WXZ.view.y + 90 }, 1000);
	}

	private onEnterFrame() {
		for (let j = 0; j < this.IG_HotDog.length; j++) {
			if(CONST.hitTest(this.IG_WXZ.view,this.IG_HotDog[j].view)){
				egret.Tween.get(this.IG_WXZ.view,{loop:true})
				.to({rotation:360},2500)
				.to({alpha:0},2500);
			}else if(CONST.hitTest(this.IG_WXZ.view,this.wjl_img)){
				let tips: egret.TextField = new egret.TextField;
				tips.text = "逆子！！！";
				tips.x = 132;
				tips.y = 628;
				tips.size = 2;
				this.addChild(tips);
				egret.Tween.get(tips,{loop: true})
				.to({routation:360},2000)
				.to({size:48},5000);
			}
		}

	}

}