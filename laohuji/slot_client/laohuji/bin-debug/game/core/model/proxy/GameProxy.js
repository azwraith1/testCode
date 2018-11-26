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
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:26:11
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-07-02 11:48:58
 * @Description: 游戏数据代理，所有游戏数据都从这里获取
 */
var game;
(function (game) {
    var GameProxy = (function (_super) {
        __extends(GameProxy, _super);
        function GameProxy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameProxy.prototype.init = function () {
            Global.gameProxy = this;
        };
        GameProxy.NAME = "GameProxy";
        return GameProxy;
    }(ResourceProxyBase));
    game.GameProxy = GameProxy;
    __reflect(GameProxy.prototype, "game.GameProxy");
})(game || (game = {}));
//# sourceMappingURL=GameProxy.js.map