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
var game;
(function (game) {
    var TipsPanel = (function (_super) {
        __extends(TipsPanel, _super);
        function TipsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new TipsPanelSkin();
            return _this;
        }
        TipsPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        TipsPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.shp_1 = new egret.Shape();
            this.shp_1.x = 600;
            this.shp_1.y = 680;
            this.shp_1.graphics.lineStyle(10, 0xdd7016);
            this.shp_1.graphics.beginFill(0xdd7016, 1);
            this.shp_1.graphics.drawCircle(0, 0, 10);
            this.shp_1.graphics.endFill();
            this.addChild(this.shp_1);
            this.shp_2 = new egret.Shape();
            this.shp_2.x = 640;
            this.shp_2.y = 680;
            this.shp_2.graphics.lineStyle(10, 0xffffff);
            this.shp_2.graphics.beginFill(0xffffff, 1);
            this.shp_2.graphics.drawCircle(0, 0, 10);
            this.shp_2.graphics.endFill();
            this.addChild(this.shp_2);
            this.shp_3 = new egret.Shape();
            this.shp_3.x = 680;
            this.shp_3.y = 680;
            this.shp_3.graphics.lineStyle(10, 0xffffff);
            this.shp_3.graphics.beginFill(0xffffff, 1);
            this.shp_3.graphics.drawCircle(0, 0, 10);
            this.shp_3.graphics.endFill();
            this.addChild(this.shp_3);
            this.tip_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.tip_group.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.tip_group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this.close_btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            this.close_btn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            this.close_btn_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        };
        TipsPanel.prototype.touchBegin = function (e) {
            this.beginX = e.stageX;
        };
        TipsPanel.prototype.touchMove = function (e) {
            // this.stage.x += this.beginX - this.endX;
        };
        TipsPanel.prototype.touchEnd = function (e) {
            var _this = this;
            this.endX = e.stageX;
            if (this.beginX - this.endX > 0 && this.tip_group.x > -2560) {
                egret.Tween.get(this.tip_group).to({ x: this.tip_group.x - 1280 }, 500, egret.Ease.sineIn).call(function () {
                    switch (_this.tip_group.x) {
                        case 0:
                            _this.removeChild(_this.shp_1);
                            _this.shp_1 = new egret.Shape();
                            _this.shp_1.x = 600;
                            _this.shp_1.y = 680;
                            _this.shp_1.graphics.lineStyle(10, 0xdd7016);
                            _this.shp_1.graphics.beginFill(0xdd7016, 1);
                            _this.shp_1.graphics.drawCircle(0, 0, 10);
                            _this.shp_1.graphics.endFill();
                            _this.addChild(_this.shp_1);
                            _this.removeChild(_this.shp_2);
                            _this.shp_2 = new egret.Shape();
                            _this.shp_2.x = 640;
                            _this.shp_2.y = 680;
                            _this.shp_2.graphics.lineStyle(10, 0xffffff);
                            _this.shp_2.graphics.beginFill(0xffffff, 1);
                            _this.shp_2.graphics.drawCircle(0, 0, 10);
                            _this.shp_2.graphics.endFill();
                            _this.addChild(_this.shp_2);
                            _this.removeChild(_this.shp_3);
                            _this.shp_3 = new egret.Shape();
                            _this.shp_3.x = 680;
                            _this.shp_3.y = 680;
                            _this.shp_3.graphics.lineStyle(10, 0xffffff);
                            _this.shp_3.graphics.beginFill(0xffffff, 1);
                            _this.shp_3.graphics.drawCircle(0, 0, 10);
                            _this.shp_3.graphics.endFill();
                            _this.addChild(_this.shp_3);
                            break;
                        case -1280:
                            _this.removeChild(_this.shp_1);
                            _this.shp_1 = new egret.Shape();
                            _this.shp_1.x = 600;
                            _this.shp_1.y = 680;
                            _this.shp_1.graphics.lineStyle(10, 0xffffff);
                            _this.shp_1.graphics.beginFill(0xffffff, 1);
                            _this.shp_1.graphics.drawCircle(0, 0, 10);
                            _this.shp_1.graphics.endFill();
                            _this.addChild(_this.shp_1);
                            _this.removeChild(_this.shp_2);
                            _this.shp_2 = new egret.Shape();
                            _this.shp_2.x = 640;
                            _this.shp_2.y = 680;
                            _this.shp_2.graphics.lineStyle(10, 0xdd7016);
                            _this.shp_2.graphics.beginFill(0xdd7016, 1);
                            _this.shp_2.graphics.drawCircle(0, 0, 10);
                            _this.shp_2.graphics.endFill();
                            _this.addChild(_this.shp_2);
                            _this.removeChild(_this.shp_3);
                            _this.shp_3 = new egret.Shape();
                            _this.shp_3.x = 680;
                            _this.shp_3.y = 680;
                            _this.shp_3.graphics.lineStyle(10, 0xffffff);
                            _this.shp_3.graphics.beginFill(0xffffff, 1);
                            _this.shp_3.graphics.drawCircle(0, 0, 10);
                            _this.shp_3.graphics.endFill();
                            _this.addChild(_this.shp_3);
                            break;
                        case -2560:
                            _this.removeChild(_this.shp_1);
                            _this.shp_1 = new egret.Shape();
                            _this.shp_1.x = 600;
                            _this.shp_1.y = 680;
                            _this.shp_1.graphics.lineStyle(10, 0xffffff);
                            _this.shp_1.graphics.beginFill(0xffffff, 1);
                            _this.shp_1.graphics.drawCircle(0, 0, 10);
                            _this.shp_1.graphics.endFill();
                            _this.addChild(_this.shp_1);
                            _this.removeChild(_this.shp_2);
                            _this.shp_2 = new egret.Shape();
                            _this.shp_2.x = 640;
                            _this.shp_2.y = 680;
                            _this.shp_2.graphics.lineStyle(10, 0xffffff);
                            _this.shp_2.graphics.beginFill(0xffffff, 1);
                            _this.shp_2.graphics.drawCircle(0, 0, 10);
                            _this.shp_2.graphics.endFill();
                            _this.addChild(_this.shp_2);
                            _this.removeChild(_this.shp_3);
                            _this.shp_3 = new egret.Shape();
                            _this.shp_3.x = 680;
                            _this.shp_3.y = 680;
                            _this.shp_3.graphics.lineStyle(10, 0xdd7016);
                            _this.shp_3.graphics.beginFill(0xdd7016, 1);
                            _this.shp_3.graphics.drawCircle(0, 0, 10);
                            _this.shp_3.graphics.endFill();
                            _this.addChild(_this.shp_3);
                            break;
                    }
                });
            }
            else if (this.beginX - this.endX < 0 && this.tip_group.x < -1) {
                egret.Tween.get(this.tip_group).to({ x: this.tip_group.x + 1280 }, 500, egret.Ease.sineIn).call(function () {
                    switch (_this.tip_group.x) {
                        case 0:
                            _this.removeChild(_this.shp_1);
                            _this.shp_1 = new egret.Shape();
                            _this.shp_1.x = 600;
                            _this.shp_1.y = 680;
                            _this.shp_1.graphics.lineStyle(10, 0xdd7016);
                            _this.shp_1.graphics.beginFill(0xdd7016, 1);
                            _this.shp_1.graphics.drawCircle(0, 0, 10);
                            _this.shp_1.graphics.endFill();
                            _this.addChild(_this.shp_1);
                            _this.removeChild(_this.shp_2);
                            _this.shp_2 = new egret.Shape();
                            _this.shp_2.x = 640;
                            _this.shp_2.y = 680;
                            _this.shp_2.graphics.lineStyle(10, 0xffffff);
                            _this.shp_2.graphics.beginFill(0xffffff, 1);
                            _this.shp_2.graphics.drawCircle(0, 0, 10);
                            _this.shp_2.graphics.endFill();
                            _this.addChild(_this.shp_2);
                            _this.removeChild(_this.shp_3);
                            _this.shp_3 = new egret.Shape();
                            _this.shp_3.x = 680;
                            _this.shp_3.y = 680;
                            _this.shp_3.graphics.lineStyle(10, 0xffffff);
                            _this.shp_3.graphics.beginFill(0xffffff, 1);
                            _this.shp_3.graphics.drawCircle(0, 0, 10);
                            _this.shp_3.graphics.endFill();
                            _this.addChild(_this.shp_3);
                            break;
                        case -1280:
                            _this.removeChild(_this.shp_1);
                            _this.shp_1 = new egret.Shape();
                            _this.shp_1.x = 600;
                            _this.shp_1.y = 680;
                            _this.shp_1.graphics.lineStyle(10, 0xffffff);
                            _this.shp_1.graphics.beginFill(0xffffff, 1);
                            _this.shp_1.graphics.drawCircle(0, 0, 10);
                            _this.shp_1.graphics.endFill();
                            _this.addChild(_this.shp_1);
                            _this.removeChild(_this.shp_2);
                            _this.shp_2 = new egret.Shape();
                            _this.shp_2.x = 640;
                            _this.shp_2.y = 680;
                            _this.shp_2.graphics.lineStyle(10, 0xdd7016);
                            _this.shp_2.graphics.beginFill(0xdd7016, 1);
                            _this.shp_2.graphics.drawCircle(0, 0, 10);
                            _this.shp_2.graphics.endFill();
                            _this.addChild(_this.shp_2);
                            _this.removeChild(_this.shp_3);
                            _this.shp_3 = new egret.Shape();
                            _this.shp_3.x = 680;
                            _this.shp_3.y = 680;
                            _this.shp_3.graphics.lineStyle(10, 0xffffff);
                            _this.shp_3.graphics.beginFill(0xffffff, 1);
                            _this.shp_3.graphics.drawCircle(0, 0, 10);
                            _this.shp_3.graphics.endFill();
                            _this.addChild(_this.shp_3);
                            break;
                        case -2560:
                            _this.removeChild(_this.shp_1);
                            _this.shp_1 = new egret.Shape();
                            _this.shp_1.x = 600;
                            _this.shp_1.y = 680;
                            _this.shp_1.graphics.lineStyle(10, 0xffffff);
                            _this.shp_1.graphics.beginFill(0xffffff, 1);
                            _this.shp_1.graphics.drawCircle(0, 0, 10);
                            _this.shp_1.graphics.endFill();
                            _this.addChild(_this.shp_1);
                            _this.removeChild(_this.shp_2);
                            _this.shp_2 = new egret.Shape();
                            _this.shp_2.x = 640;
                            _this.shp_2.y = 680;
                            _this.shp_2.graphics.lineStyle(10, 0xffffff);
                            _this.shp_2.graphics.beginFill(0xffffff, 1);
                            _this.shp_2.graphics.drawCircle(0, 0, 10);
                            _this.shp_2.graphics.endFill();
                            _this.addChild(_this.shp_2);
                            _this.removeChild(_this.shp_3);
                            _this.shp_3 = new egret.Shape();
                            _this.shp_3.x = 680;
                            _this.shp_3.y = 680;
                            _this.shp_3.graphics.lineStyle(10, 0xdd7016);
                            _this.shp_3.graphics.beginFill(0xdd7016, 1);
                            _this.shp_3.graphics.drawCircle(0, 0, 10);
                            _this.shp_3.graphics.endFill();
                            _this.addChild(_this.shp_3);
                            break;
                    }
                });
            }
        };
        TipsPanel.prototype.closePanel = function () {
            this.tip_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.tip_group.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.tip_group.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this.close_btn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            this.close_btn_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            this.close_btn_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_TIPS);
        };
        return TipsPanel;
    }(eui.Component));
    game.TipsPanel = TipsPanel;
    __reflect(TipsPanel.prototype, "game.TipsPanel", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=TipsPanel.js.map