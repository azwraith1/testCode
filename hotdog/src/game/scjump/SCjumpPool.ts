// TypeScript file
class SCjumpPool extends GameObject {
    public static key:string = "hero";
    private _time:number = 0;

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("sc_3_png"));
        this.view.x = 118.67;
        this.view.y = 1018.64;
        this.view.height = 121;
        this.view.width = 85;
    }

}