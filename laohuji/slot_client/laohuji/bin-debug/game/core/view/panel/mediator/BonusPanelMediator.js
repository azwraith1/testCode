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
// TypeScript file
var game;
(function (game) {
    var BonusPanelMediator = (function (_super) {
        __extends(BonusPanelMediator, _super);
        function BonusPanelMediator() {
            var _this = _super.call(this, BonusPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        BonusPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_BONUS,
                PanelNotify.CLOSE_BONUS
            ];
        };
        BonusPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.MainGameMediator());
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        BonusPanelMediator.prototype.showViewComponent = function () {
            this.viewComponent = new game.BonusPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BonusPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_BONUS:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_BONUS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        BonusPanelMediator.NAME = "BonusPanelMediator";
        return BonusPanelMediator;
    }(BaseMediator));
    game.BonusPanelMediator = BonusPanelMediator;
    __reflect(BonusPanelMediator.prototype, "game.BonusPanelMediator");
})(game || (game = {}));
//# sourceMappingURL=BonusPanelMediator.js.map