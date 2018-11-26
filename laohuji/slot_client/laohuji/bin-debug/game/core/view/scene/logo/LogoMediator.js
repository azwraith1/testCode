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
    var LogoMediator = (function (_super) {
        __extends(LogoMediator, _super);
        function LogoMediator() {
            var _this = _super.call(this, LogoMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        LogoMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_LOADING,
                SceneNotify.CLOSE_LOADING
            ];
        };
        LogoMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.MainGameMediator());
            // this.facade.registerMediator(new MainGameMediator());
        };
        LogoMediator.prototype.showViewComponent = function () {
            this.viewComponent = new game.LogoScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        LogoMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_LOADING:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_LOADING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        LogoMediator.NAME = "LogoMediator";
        return LogoMediator;
    }(BaseMediator));
    game.LogoMediator = LogoMediator;
    __reflect(LogoMediator.prototype, "game.LogoMediator");
})(game || (game = {}));
//# sourceMappingURL=LogoMediator.js.map