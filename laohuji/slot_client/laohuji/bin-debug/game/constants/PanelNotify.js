var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:27
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-14 16:02:03
 * @Description: 面板弹出层的通知
 */
var PanelNotify = (function () {
    function PanelNotify() {
    }
    //游戲結束
    PanelNotify.OPEN_GAME_OVER = "OPEN_GAME_OVER";
    //關閉游戲結束
    PanelNotify.CLOSE_GAME_OVER = "CLOSE_GAME_OVER";
    /**
     * 展现当前结果
     */
    PanelNotify.SHOW_RESULT = "SHOW_RESULT";
    PanelNotify.CLOSE_RESULT = "CLOSE_RESULT";
    PanelNotify.OPEN_DESC = "OPEN_DESC";
    PanelNotify.CLOSE_DESC = "CLOSE_DESC";
    PanelNotify.OPEN_LOOK = "OPEN_LOOK";
    PanelNotify.CLOSE_LOOK = "CLOSE_LOOK";
    PanelNotify.OPEN_BONUS = "OPEN_BONUS";
    PanelNotify.CLOSE_BONUS = "CLOSE_BONUS";
    PanelNotify.OPEN_TIPS = "OPEN_TIPS";
    PanelNotify.CLOSE_TIPS = "CLOSE_TIPS";
    return PanelNotify;
}());
__reflect(PanelNotify.prototype, "PanelNotify");
//# sourceMappingURL=PanelNotify.js.map