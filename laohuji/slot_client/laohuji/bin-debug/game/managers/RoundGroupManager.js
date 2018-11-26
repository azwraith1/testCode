var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var game;
(function (game) {
    var RoundGroupManager = (function () {
        function RoundGroupManager() {
            if (RoundGroupManager._instance) {
                throw new Error("DateTimer使用单例");
            }
        }
        RoundGroupManager.roundGroup = function () {
            if (!this._instance) {
                this._instance = new RoundGroupManager();
            }
            return this._instance;
        };
        RoundGroupManager.prototype.createGroup = function (i, imagSourceStr) {
            this._roundGroup = new eui.Group();
            var bitmap = new egret.Bitmap();
            for (var j = 1; j <= i; j++) {
                bitmap.texture = RES.getRes("icon_json." + 1 + "");
                bitmap.x = 0;
                bitmap.y = (j - 1) * bitmap.height;
                this._roundGroup.addChild(bitmap);
            }
            return this._roundGroup;
        };
        return RoundGroupManager;
    }());
    game.RoundGroupManager = RoundGroupManager;
    __reflect(RoundGroupManager.prototype, "game.RoundGroupManager");
})(game || (game = {}));
//# sourceMappingURL=RoundGroupManager.js.map