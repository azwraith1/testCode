class GameObject extends egret.HashObject{

    public view:egret.DisplayObject;
    public key;

    constructor() {
        super();
    }

    public onCreate():void {

    }

    public onDestroy():void {

    }

    public onEnterFrame(advancedTime:number):void {

    }

    public onHit(gameObject:GameObject):void {

    }
}
class Bullet extends GameObject {
    public static key:string = "bullet";

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

        if (this.view.y >= 1280) {
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

