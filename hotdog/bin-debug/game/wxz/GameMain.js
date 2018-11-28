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
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    // private hotDog: eui.Image;
    function GameMain() {
        var _this = _super.call(this) || this;
        _this.IG_HotDog = [];
        _this.score = 0;
        _this.time = 0;
        _this.nandu = 1000;
        _this.i = 1;
        _this.skinName = "GameMainSkin";
        return _this;
    }
    GameMain.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameMain.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    GameMain.prototype.init = function () {
        this.score = 0;
        this.IG_WXZ = ObjectPool.getInstance().createObject(Hero);
        this.addChild(this.IG_WXZ.view);
        this.IG_HotDog[0] = ObjectPool.getInstance().createObject(Bullet);
        this.addChild(this.IG_HotDog[0].view);
        this.IG_HotDog[0].view.x = Math.floor(Math.random() * 700);
        this.IG_HotDog[0].view.y = -54;
        egret.Tween.get(this.IG_HotDog[0].view).to({ y: 1280 }, this.nandu * 3, egret.Ease.sineIn);
        this._timer = new egret.Timer(300, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerStart, this);
        this._timer.start();
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    };
    GameMain.prototype.timerStart = function () {
        this.IG_HotDog[this.i] = ObjectPool.getInstance().createObject(Bullet);
        this.addChild(this.IG_HotDog[this.i].view);
        this.IG_HotDog[this.i].view.x = Math.floor(Math.random() * 700);
        this.IG_HotDog[this.i].view.y = -54;
        egret.Tween.get(this.IG_HotDog[this.i].view).to({ y: 1280 }, this.nandu * 3, egret.Ease.sineIn);
        this.i++;
    };
    GameMain.prototype.onEnterFrame = function () {
        for (var i = 0; i < this.IG_HotDog.length; i++) {
            if (CONST.hitTest(this.IG_WXZ.view, this.IG_HotDog[i].view)) {
                if (this.IG_HotDog[i].view && this.IG_HotDog[i].view.parent) {
                    this.IG_HotDog[i].view.parent.removeChild(this.IG_HotDog[i].view);
                }
                CONST.goal++;
                return;
            }
        }
        this.scoreLabel.text = CONST.goal + "";
    };
    GameMain.prototype.startMove = function (e) {
        this.startX = e.stageX;
        this.startY = e.stageY;
    };
    GameMain.prototype.touchEnd = function (e) {
    };
    GameMain.prototype.touchMove = function (e) {
        this.IG_WXZ.view.x += e.stageX - this.startX;
        this.IG_WXZ.view.y += e.stageY - this.startY;
        this.startX = e.stageX;
        this.startY = e.stageY;
    };
    return GameMain;
}(eui.Component));
__reflect(GameMain.prototype, "GameMain", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameMain.js.map