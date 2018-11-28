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
// TypeScript file
var SCjumpPool = (function (_super) {
    __extends(SCjumpPool, _super);
    function SCjumpPool() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.view = new egret.Bitmap(RES.getRes("sc_3_png"));
        _this.view.x = 118.67;
        _this.view.y = 1018.64;
        _this.view.height = 121;
        _this.view.width = 85;
        return _this;
    }
    SCjumpPool.key = "hero";
    return SCjumpPool;
}(GameObject));
__reflect(SCjumpPool.prototype, "SCjumpPool");
//# sourceMappingURL=SCjumpPool.js.map