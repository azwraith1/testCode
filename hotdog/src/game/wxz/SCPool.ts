class Hero extends GameObject {
    public static key:string = "hero";
    private _time:number = 0;

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("hotDog_1_png"));
        this.view.x = CONST.stageWidth >> 1;
        this.view.y = CONST.stageHeight - 100;
        this.view.height = 100;
        this.view.width = 105;
    }

}