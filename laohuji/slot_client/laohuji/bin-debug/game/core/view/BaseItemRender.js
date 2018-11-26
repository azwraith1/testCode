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
    var BaseItemRender = (function (_super) {
        __extends(BaseItemRender, _super);
        function BaseItemRender() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        /**
         * 当添加到舞台上
         */
        BaseItemRender.prototype.onAdded = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        };
        /**
         * 当添加到舞台上
         */
        BaseItemRender.prototype.onRemoved = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            game.UIUtils.removeButtonScaleEffects(this);
        };
        BaseItemRender.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.UIUtils.addButtonScaleEffects(this);
        };
        BaseItemRender.prototype.onTouchTap = function (e) {
        };
        return BaseItemRender;
    }(eui.ItemRenderer));
    game.BaseItemRender = BaseItemRender;
    __reflect(BaseItemRender.prototype, "game.BaseItemRender");
})(game || (game = {}));
//# sourceMappingURL=BaseItemRender.js.map