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
    var BonusPanel = (function (_super) {
        __extends(BonusPanel, _super);
        function BonusPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new BonusPanelSkin();
            return _this;
        }
        BonusPanel.prototype.ontouchTap = function (e) {
            switch (e.target) {
                case this.close_btn:
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BONUS);
                    break;
            }
        };
        return BonusPanel;
    }(game.BaseComponent));
    game.BonusPanel = BonusPanel;
    __reflect(BonusPanel.prototype, "game.BonusPanel");
})(game || (game = {}));
//# sourceMappingURL=BonusPanel.js.map