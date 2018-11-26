var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:56
 * @Last Modified by:   Li MengChan
 * @Last Modified time: 2018-06-25 14:24:56
 * @Description: 服务器的消息通知
 */
var SysNotify = (function () {
    function SysNotify() {
    }
    SysNotify.PLAYER_JOIN = "PLAYER_JOIN";
    /** 准备OK */
    SysNotify.NEXT_GAME = "SysNotify_NEXT_GAME";
    SysNotify.YOU_CHOOSE = "SysNotify_YOU_CHOOSE";
    SysNotify.PLAYER_SCORE = "SysNotify_PLAYER_SCORE";
    SysNotify.ASK_HUIQI = "SysNotify_ASK_HUIQI";
    SysNotify.ANSWER_HUIQI = "SysNotify_ANSWER_HUIQI";
    SysNotify.PLAYER_RENSHU = "SysNotify_PLAYER_RENSHU";
    SysNotify.MATCH_SUCCESS = "match_success";
    SysNotify.PIPEI_FAIL = "SysNotify_PIPEI_FAIL";
    SysNotify.ASK_QIUHE = "SysNotify_ASK_QIUHE";
    SysNotify.SHOW_RESULT = "SysNotify_SHOW_RESULT";
    SysNotify.RESULT_BACK = "SysNotify_RESULT_BACK";
    SysNotify.PLAYER_ZHUNBEI = "SysNotify_PLAYER_ZHUNBEI";
    SysNotify.CHANGE_PLAYER = "SysNotify_CHANGE_PLAYER";
    SysNotify.SYNC_DATA = "SysNotify_SYNC_DATA";
    SysNotify.SYNC_DATA_CALL = "SysNotify_SYNC_DATA_CALL";
    return SysNotify;
}());
__reflect(SysNotify.prototype, "SysNotify");
//# sourceMappingURL=SysNotify.js.map