class BankerRandom {
	private _bankers: string;
	private time: egret.Timer;
	private flag: number = 0;
	private array: Array<any> = new Array();
	private player1: eui.Group;
	private player2: eui.Group;
	private player3: eui.Group;
	private player4: eui.Group;
	private player5: eui.Group;
	private player6: eui.Group;
	//	private psm: PlayerSoundManager;
	/**
	 * @param  {eui.Group} p1
	 * @param  {eui.Group} p2
	 * @param  {eui.Group} p3
	 * @param  {eui.Group} p4
	 * @param  {eui.Group} p5
	 */
	public constructor(p1: eui.Group, p2: eui.Group, p3: eui.Group, p4: eui.Group, p5: eui.Group, p6: eui.Group) {
		//	this.psm = new PlayerSoundManager();
		this.player1 = p1;
		this.player2 = p2;
		this.player3 = p3;
		this.player4 = p4;
		this.player5 = p5;
		this.player6 = p6;
		if (this.time == null) {
			this.time = new egret.Timer(50, 0);
			this.time.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		}
	}
	private onTimer(): void {

		if (this.flag == this.array.length) {
			this.flag = 0;
		}
		//this.hideAll();
		//this.Zhuang(this.array[this.flag], true);
		//	this.psm.gameSound("Rand_Xuan_Zhuang_Sound");
		this.flag++;
	}
	public getArray(): void {
		this.array = this.bankers.split(",");
	}

	public startTime(): void {
		if (this.time == null) {
			this.time = new egret.Timer(50, 0);
			this.time.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		}
		this.flag = 0;
		this.time.start();
	}

	public stopTime(): void {
		if (this.time.running) {
			this.time.stop();
			this.time.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		}
		this.time = null;
		//this.hideAll();

	}
	/**
	 * @param  {number} seatNo
	 * @param  {boolean} isAppend
	 * @returns void
	 */
	private Zhuang(seatNo: number, isAppend: boolean): void {
		//	PlayerManager.InitLocalSeatNo();
		var localSeatNo: number = seatNo//PlayerManager.getLocalSeatNoForSeatNo(seatNo);
		var playerObj: eui.Group = null;

		//	if (localSeatNo < 1 || localSeatNo > 5) return;
		if (localSeatNo == 1) playerObj = this.player1;
		if (localSeatNo == 2) playerObj = this.player2;
		if (localSeatNo == 3) playerObj = this.player3;
		if (localSeatNo == 4) playerObj = this.player4;
		if (localSeatNo == 5) playerObj = this.player5;
		if (localSeatNo == 6) playerObj = this.player6;
		var banker: eui.Group = playerObj.getChildByName("zhuang") as eui.Group;

		banker.visible = isAppend;
	}

	private hideAll(): void {

		this.Zhuang(1, false);
		this.Zhuang(2, false);
		this.Zhuang(3, false);
		this.Zhuang(4, false);
		this.Zhuang(5, false);

	}

	public get bankers(): string {
		return this._bankers;
	}

	public set bankers(value: string) {

		this._bankers = value;
	}
}