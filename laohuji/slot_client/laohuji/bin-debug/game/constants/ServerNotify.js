var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerNotify = (function () {
    function ServerNotify() {
    }
    //重连
    ServerNotify.s_robLogin = "s_robLogin";
    //玩家加入
    ServerNotify.s_playerEnter = "s_playerEnter";
    //玩家退出房间
    ServerNotify.s_playerQuitRoom = "s_playerQuitRoom";
    //玩家掉线
    ServerNotify.s_playerOffline = "s_playerOffline";
    //玩家状态变化
    ServerNotify.s_userStatusChanged = "s_userStatusChanged";
    //玩家重连
    ServerNotify.s_playerReconnect = "s_playerReconnect";
    //玩家准备
    ServerNotify.s_playerReady = "s_playerReady";
    //开始新局
    ServerNotify.s_startNewRound = "s_startNewRound";
    //发牌
    ServerNotify.s_initHandCards = "s_initHandCards";
    //匹配中途，退出匹配。
    ServerNotify.s_quitRoom = "s_quitRoom";
    //选择马牌
    ServerNotify.s_maCardSelected = "s_maCardSelected";
    //换三张
    ServerNotify.s_playerSelectHSZ = "s_playerSelectHSZ";
    //换三张完成
    ServerNotify.s_roomHSZFinished = "s_roomHSZFinished";
    //换三张
    ServerNotify.s_HSZCardExchanged = "s_HSZCardExchanged";
    //选择花色
    ServerNotify.s_playerSelectColor = "s_playerSelectColor";
    //选择花色
    ServerNotify.s_playerColorSelected = "s_playerColorSelected";
    //当前出牌玩家
    ServerNotify.s_curPlay = "s_curPlay";
    //摸排
    ServerNotify.s_newCard = "s_newCard";
    //出牌
    ServerNotify.s_playCard = "s_playCard";
    //公牌变化
    ServerNotify.s_publicCardChanged = "s_publicCardChanged";
    //挂起
    ServerNotify.s_hangupTask = "s_hangupTask";
    //碰
    ServerNotify.s_playerPengCard = "s_playerPengCard";
    //杠
    ServerNotify.s_playerGangCard = "s_playerGangCard";
    //胡
    ServerNotify.s_playerHu = "s_playerHu";
    //牌局结算
    ServerNotify.s_roundSettlement = "s_roundSettlement";
    //结束
    ServerNotify.s_roomFinished = "s_roomFinished";
    //请求解散房间
    ServerNotify.s_reqDestroyRoom = "s_reqDestroyRoom";
    //解散请求结果
    ServerNotify.s_respDestroyRoom = "s_respDestroyRoom";
    //庄家
    ServerNotify.s_dealerChanged = "s_dealerChanged";
    //聊天
    ServerNotify.s_roomChat = "s_roomChat";
    // 游戏金币同步
    ServerNotify.s_gameSyncCoins = "s_gameSyncCoins";
    // 游戏金币同步
    ServerNotify.s_syncGold = "s_syncGold";
    // 倒计时刷新
    ServerNotify.s_countdown = "s_countdown";
    // 倒计时清空
    ServerNotify.s_playerClearWaitTimeout = "s_playerClearWaitTimeout";
    // 托管
    ServerNotify.s_trustee = "s_trustee";
    //抢杠。
    ServerNotify.s_cancelGangForQG = "s_cancelGangForQG";
    //金币变化
    ServerNotify.s_payGold = "s_payGold";
    //跑马灯
    ServerNotify.s_broadcast = "s_broadcast";
    ServerNotify.s_enterResult = "s_enterResult";
    //------------------------------niuniu  star
    ServerNotify.s_startRobDealer = "s_startRobDealer"; //开始抢庄；
    ServerNotify.s_playerRobDealer = "s_playerRobDealer"; //抢庄
    ServerNotify.s_addAnteMulti = "s_addAnteMulti"; //押注倍数
    // public static s_dealerChanged: string = "s_dealerChanged";//庄家变化
    //  public static s_curPlay: string = "s_curPlay";//当前玩家
    ServerNotify.s_startAddAnte = "s_startAddAnte"; //开始押注
    ServerNotify.s_addAnteFinish = "s_addAnteFinish"; //押注完成
    // public static s_initHandCards: string = "s_initHandCards";//发牌
    ServerNotify.s_startPlayCards = "s_startPlayCards"; //开始选牌
    ServerNotify.s_playCards = "s_playCards"; //玩家选牌结果
    ServerNotify.s_playCardsFinish = "s_playCardsFinish"; //选牌完成
    ServerNotify.s_playerAddAnte = "s_playerAddAnte"; //玩家压注通知
    ServerNotify.s_playerAnteChange = "s_playerAnteChange"; //玩家押注变化
    ServerNotify.s_robDealerMulti = "s_robDealerMulti";
    return ServerNotify;
}());
__reflect(ServerNotify.prototype, "ServerNotify");
//# sourceMappingURL=ServerNotify.js.map