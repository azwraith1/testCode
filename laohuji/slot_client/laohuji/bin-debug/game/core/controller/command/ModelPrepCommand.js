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
 * @Date: 2018-06-25 14:25:23
 * @Last Modified by:   Li MengChan
 * @Last Modified time: 2018-06-25 14:25:23
 * @Description: 提前注册代理对象类
 */
var game;
(function (game) {
    var ModelPrepCommand = (function (_super) {
        __extends(ModelPrepCommand, _super);
        function ModelPrepCommand() {
            return _super.call(this) || this;
        }
        ModelPrepCommand.prototype.execute = function (notification) {
            var proxys = [
                game.NetProxy,
                game.PlayerProxy,
                game.GameProxy,
                game.AudioProxy
            ];
            var self = this;
            _.forEach(proxys, function (proxy, index) {
                var proxyObj = new proxys[index]();
                self.facade.registerProxy(proxyObj);
                if (proxyObj && proxyObj.init) {
                    proxyObj.init();
                }
            });
            // this.facade.registerProxy(new NetProxy());
            // //游戏其他需要存储数据
            // this.facade.registerProxy(new PlayerProxy());
            // this.facade.registerProxy(new AudioProxy());
        };
        return ModelPrepCommand;
    }(puremvc.SimpleCommand));
    game.ModelPrepCommand = ModelPrepCommand;
    __reflect(ModelPrepCommand.prototype, "game.ModelPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=ModelPrepCommand.js.map