var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerPostPath = (function () {
    function ServerPostPath() {
    }
    //获取房间信息
    ServerPostPath.EnterGame = "EnterGame";
    //换三张选择手牌
    ServerPostPath.game_mjHandler_c_selectHSZ = "game.mjHandler.c_selectHSZ";
    //选择定缺花色
    ServerPostPath.game_mjHandler_c_selectColor = "game.mjHandler.c_selectColor";
    //玩家碰牌
    ServerPostPath.game_mjHandler_c_pengTask = "game.mjHandler.c_pengTask";
    //杠
    ServerPostPath.game_mjHandler_c_gangTask = "game.mjHandler.c_gangTask";
    //过
    ServerPostPath.game_mjHandler_c_passTask = "game.mjHandler.c_passTask";
    //胡
    ServerPostPath.game_mjHandler_c_huTask = "game.mjHandler.c_huTask";
    //
    ServerPostPath.game_roomHandler_c_queryRoomInfo = "game.roomHandler.c_queryRoomInfo";
    //玩家退出等待界面
    ServerPostPath.game_roomHandler_c_quitRoom = "game.roomHandler.c_quitRoom";
    //玩家取消托管操作
    ServerPostPath.game_mjHandler_c_cancelTrustee = "game.mjHandler.c_cancelTrustee";
    //玩家发文字表情
    ServerPostPath.game_mjHandler_c_chat = "game.roomHandler.c_chat";
    //查询用户是否在房间
    ServerPostPath.hall_sceneHandler_c_queryGameState = "hall.sceneHandler.c_queryGameState";
    //玩家流水记录
    ServerPostPath.hall_userHandler_c_getReportInfo = "hall.userHandler.c_getReportInfo";
    //在线人数
    ServerPostPath.hall_sceneHandler_c_getGameOnlineCountInfo = "hall.sceneHandler.c_getGameOnlineCountInfo";
    //退出房间
    ServerPostPath.hall_sceneHandler_c_leave = "hall.sceneHandler.c_leave";
    //GM工具
    ServerPostPath.game_mjHandler_c_setAIThinkTime = "game.mjHandler.c_setAIThinkTime";
    //----------------------------------------niuniu star
    ServerPostPath.game_nnHandler_c_robDealer = "game.blnnHandler.c_robDealer";
    ServerPostPath.game_nnHandler_c_addAnte = "game.blnnHandler.c_addAnte";
    ServerPostPath.game_nnHandle_rc_playCards = "game.blnnHandler.c_playCards";
    return ServerPostPath;
}());
__reflect(ServerPostPath.prototype, "ServerPostPath");
//# sourceMappingURL=ServerPostPath.js.map