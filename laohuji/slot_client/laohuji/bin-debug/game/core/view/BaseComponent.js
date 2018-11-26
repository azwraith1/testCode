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
/**
 * 面板基类
 */
var game;
(function (game) {
    var BaseComponent = (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            var _this = _super.call(this) || this;
            _this.width = GameConfig.curWidth();
            _this.height = GameConfig.curHeight();
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        BaseComponent.prototype.onAdded = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            // egret.Ticker.getInstance().register(this.onEnterFrame,this);
        };
        BaseComponent.prototype.onRemoved = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            // egret.Ticker.getInstance().unregister(this.onEnterFrame,this);
            this.destroy();
        };
        BaseComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this['init']) {
                this['init']();
            }
            game.UIUtils.addButtonScaleEffects(this);
            this.bindTouchEnded(this);
        };
        BaseComponent.prototype.onEnterFrame = function (delayTime) {
        };
        BaseComponent.prototype.destory = function (callFunc) {
            egret.Tween.get(this).to({
                alpha: 0
            }, 200).call(function () {
                if (callFunc) {
                    callFunc();
                }
            }, this);
        };
        /**
         *
         *
        * 显示动画完成后
        */
        BaseComponent.prototype.onShowAnimateOver = function () {
        };
        BaseComponent.prototype.onTouchTap = function (e) {
        };
        BaseComponent.prototype.bindTouchEnded = function (p) {
            if (!p)
                return;
            if (p.name && this[p.name + "TouchEnded"]) {
                p.addEventListener(egret.TouchEvent.TOUCH_END, this[p.name + "TouchEnded"], this);
            }
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch = p.getChildAt(i);
                this.bindTouchEnded(ch);
            }
        };
        /**
         * 销毁
         */
        BaseComponent.prototype.destroy = function () {
            if (this.resGroup) {
                // RES.destroyRes(this.resGroup);
            }
        };
        return BaseComponent;
    }(eui.Component));
    game.BaseComponent = BaseComponent;
    __reflect(BaseComponent.prototype, "game.BaseComponent");
})(game || (game = {}));
//# sourceMappingURL=BaseComponent.js.map