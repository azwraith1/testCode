var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NetErrorTips = (function (_super) {
    __extends(NetErrorTips, _super);
    function NetErrorTips() {
        return _super.call(this) || this;
        // if (GameConfig.CURRENT_ISSHU && AlertShuSkin) {
        // 	// this.skinName = new AlertShuSkin();
        // 	return;
        // }
        // // this.skinName = new AlertSkin();
    }
    Object.defineProperty(NetErrorTips, "instance", {
        get: function () {
            if (!NetErrorTips._instance) {
                NetErrorTips._instance = new NetErrorTips();
                NetErrorTips._instance.name = "NetErrorTips";
                NetErrorTips._instance.visible = false;
                GameLayerManager.gameLayer().maskLayer.addChild(NetErrorTips._instance);
            }
            return NetErrorTips._instance;
        },
        enumerable: true,
        configurable: true
    });
    NetErrorTips.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btnNo.visible = false;
        this.btnOk.horizontalCenter = 0;
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_END, this.btnOkTouch, this);
    };
    NetErrorTips.prototype.show = function (content) {
        this.labelTxt.text = content;
        this.visible = true;
    };
    NetErrorTips.prototype.hide = function () {
        this.visible = false;
    };
    NetErrorTips.prototype.btnOkTouch = function () {
        FrameUtils.flushWindow();
    };
    return NetErrorTips;
}(game.BaseComponent));
__reflect(NetErrorTips.prototype, "NetErrorTips");
//# sourceMappingURL=NetErrorTips.js.map