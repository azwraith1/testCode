class HotDogJumpPool extends GameObject {
    public static key:string = "hotDogJump";

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("hotDog_2_png"));
    }

    public onCreate():void {

    }

    public onDestroy():void {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    public onEnterFrame(advancedTime:number):void {

        if (this.view.x <0) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }

    public onHit(gameObject:GameObject):void {
         if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
        CONST.goal += 1;
    }
}