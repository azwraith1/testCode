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
    var MainGameMediator = (function (_super) {
        __extends(MainGameMediator, _super);
        function MainGameMediator() {
            var _this = _super.call(this, MainGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        MainGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GAME,
                SceneNotify.CLOSE_GAME
            ];
        };
        MainGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.BonusPanelMediator());
            this.facade.registerMediator(new game.TipsPanelMediator());
            // this.facade.registerMediator(new majiang.MjiangSelectMediator());
        };
        MainGameMediator.prototype.showViewComponent = function () {
            this.viewComponent = new game.test();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        MainGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_GAME:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_GAME:
                    this.closeViewComponent(1);
                    break;
            }
        };
        MainGameMediator.NAME = "MainGameMediator";
        return MainGameMediator;
    }(BaseMediator));
    game.MainGameMediator = MainGameMediator;
    __reflect(MainGameMediator.prototype, "game.MainGameMediator");
})(game || (game = {}));
//# sourceMappingURL=MainGameMediator.js.map