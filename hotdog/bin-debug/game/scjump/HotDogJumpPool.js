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
var HotDogJumpPool = (function (_super) {
    __extends(HotDogJumpPool, _super);
    function HotDogJumpPool() {
        var _this = _super.call(this) || this;
        _this.view = new egret.Bitmap(RES.getRes("hotDog_2_png"));
        return _this;
    }
    HotDogJumpPool.prototype.onCreate = function () {
    };
    HotDogJumpPool.prototype.onDestroy = function () {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    };
    HotDogJumpPool.prototype.onEnterFrame = function (advancedTime) {
        if (this.view.x < 0) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    HotDogJumpPool.prototype.onHit = function (gameObject) {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
        CONST.goal += 1;
    };
    HotDogJumpPool.key = "hotDogJump";
    return HotDogJumpPool;
}(GameObject));
__reflect(HotDogJumpPool.prototype, "HotDogJumpPool");
//# sourceMappingURL=HotDogJumpPool.js.map