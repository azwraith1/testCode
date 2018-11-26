var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:11
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-06-29 16:51:03
 * @Description: 游戏内事件通知定义
 */
var game;
(function (game) {
    var EventNotify = (function () {
        function EventNotify() {
        }
        //浏览器窗口大小改变
        EventNotify.EVENT_RESIZE = "EVENT_RESIZE";
        EventNotify.EVENT_USER_LOGIN_SUC = "EVENT_USER_LOGIN_SUC";
        EventNotify.READY = "SysNotify_READY";
        //游戏开始
        EventNotify.START_GAME = "SysNotify_START_GAME";
        //发送表情
        EventNotify.SEND_EMOJI = "SysNotify_SEND_EMOJI";
        //玩家落子
        EventNotify.PLAYER_LUOZI = "SysNotify_PLAYER_LUOZI";
        //求和
        EventNotify.QIU_HE = "SysNotify_ANSWER_QIUHE";
        //游戏结束
        EventNotify.GAME_OVER = "EventNotify_GAME_OVER";
        //游戏结束
        EventNotify.RESTART_GAME = "EventNotify_RESTART_GAME";
        return EventNotify;
    }());
    game.EventNotify = EventNotify;
    __reflect(EventNotify.prototype, "game.EventNotify");
})(game || (game = {}));
//# sourceMappingURL=EventNotify.js.map