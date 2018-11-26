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
    var TipsPanelMediator = (function (_super) {
        __extends(TipsPanelMediator, _super);
        function TipsPanelMediator() {
            var _this = _super.call(this, TipsPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        TipsPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_TIPS,
                PanelNotify.CLOSE_TIPS
            ];
        };
        TipsPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.MainGameMediator());
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        TipsPanelMediator.prototype.showViewComponent = function () {
            this.viewComponent = new game.TipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        TipsPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_TIPS:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_TIPS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        TipsPanelMediator.NAME = "TipsPanelMediator";
        return TipsPanelMediator;
    }(BaseMediator));
    game.TipsPanelMediator = TipsPanelMediator;
    __reflect(TipsPanelMediator.prototype, "game.TipsPanelMediator");
})(game || (game = {}));
//# sourceMappingURL=TipsPanelMediator.js.map