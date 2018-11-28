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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        return _super.call(this) || this;
    }
    GameObject.prototype.onCreate = function () {
    };
    GameObject.prototype.onDestroy = function () {
    };
    GameObject.prototype.onEnterFrame = function (advancedTime) {
    };
    GameObject.prototype.onHit = function (gameObject) {
    };
    return GameObject;
}(egret.HashObject));
__reflect(GameObject.prototype, "GameObject");
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this) || this;
        _this.view = new egret.Bitmap(RES.getRes("hotDog_2_png"));
        return _this;
    }
    Bullet.prototype.onCreate = function () {
    };
    Bullet.prototype.onDestroy = function () {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    };
    Bullet.prototype.onEnterFrame = function (advancedTime) {
        if (this.view.y >= 1280) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    Bullet.prototype.onHit = function (gameObject) {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
        CONST.goal += 1;
    };
    Bullet.key = "bullet";
    return Bullet;
}(GameObject));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=HotDogPool.js.map