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
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.view = new egret.Bitmap(RES.getRes("hotDog_1_png"));
        _this.view.x = CONST.stageWidth >> 1;
        _this.view.y = CONST.stageHeight - 100;
        _this.view.height = 100;
        _this.view.width = 105;
        return _this;
    }
    Hero.key = "hero";
    return Hero;
}(GameObject));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=SCPool.js.map