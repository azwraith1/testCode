var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var jumpjump = (function (_super) {
    __extends(jumpjump, _super);
    function jumpjump() {
        var _this = _super.call(this) || this;
        _this.IG_HotDog = [];
        _this.i = 1;
        _this.skinName = "jumpjumpSkin";
        return _this;
    }
    jumpjump.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    jumpjump.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.jumpbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jump, this);
        this.init();
    };
    jumpjump.prototype.init = function () {
        this.IG_HotDog[0] = ObjectPool.getInstance().createObject(HotDogJumpPool);
        this.addChild(this.IG_HotDog[0].view);
        this.IG_HotDog[0].view.x = 720;
        this.IG_HotDog[0].view.y = 1021;
        egret.Tween.get(this.IG_HotDog[0].view).to({ x: -86 }, 8500);
        this.addChild(this.IG_HotDog[0].view);
        this.IG_WXZ = ObjectPool.getInstance().createObject(SCjumpPool);
        this.addChild(this.IG_WXZ.view);
        this._timer = new egret.Timer(1500, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.addHotDog, this);
        this._timer.start();
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    };
    jumpjump.prototype.addHotDog = function () {
        var k = Math.floor(Math.random() * 10);
        this.IG_HotDog[this.i] = ObjectPool.getInstance().createObject(HotDogJumpPool);
        this.addChild(this.IG_HotDog[this.i].view);
        this.IG_HotDog[this.i].view.x = 720;
        this.IG_HotDog[this.i].view.y = 1020;
        egret.Tween.get(this.IG_HotDog[this.i].view).to({ x: -86 }, 8500);
        if (k <= 5) {
            this.i++;
            this.IG_HotDog[this.i] = ObjectPool.getInstance().createObject(HotDogJumpPool);
            this.addChild(this.IG_HotDog[this.i].view);
            this.IG_HotDog[this.i].view.x = 720;
            this.IG_HotDog[this.i].view.y = 1020 - this.IG_HotDog[this.i].view.height;
            this.addChild(this.IG_HotDog[this.i].view);
            egret.Tween.get(this.IG_HotDog[this.i].view).to({ x: -86 }, 2500);
        }
        else {
            return;
        }
        ;
        this.i++;
    };
    jumpjump.prototype.jump = function (e) {
        this.IG_WXZ.view.y -= 90;
        egret.Tween.get(this.IG_WXZ.view).to({ y: this.IG_WXZ.view.y + 90 }, 1000);
    };
    jumpjump.prototype.onEnterFrame = function () {
        for (var j = 0; j < this.IG_HotDog.length; j++) {
            if (CONST.hitTest(this.IG_WXZ.view, this.IG_HotDog[j].view)) {
                egret.Tween.get(this.IG_WXZ.view, { loop: true })
                    .to({ rotation: 360 }, 2500)
                    .to({ alpha: 0 }, 2500);
            }
            else if (CONST.hitTest(this.IG_WXZ.view, this.wjl_img)) {
                var tips = new egret.TextField;
                tips.text = "逆子！！！";
                tips.x = 132;
                tips.y = 628;
                tips.size = 2;
                this.addChild(tips);
                egret.Tween.get(tips, { loop: true })
                    .to({ routation: 360 }, 2000)
                    .to({ size: 48 }, 5000);
            }
        }
    };
    return jumpjump;
}(eui.Component));
__reflect(jumpjump.prototype, "jumpjump", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=jumpjump.js.map