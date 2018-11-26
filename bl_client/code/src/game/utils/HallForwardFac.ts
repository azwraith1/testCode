/*
 * @Author: li mengchan 
 * @Date: 2018-10-19 11:08:11 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-09 12:15:09
 * @Description: 统一界面跳转
 */
class HallForwardFac {
	public static redirectHall(){
		switch(ServerConfig.gid){
			case "mjxlch":
			case "mjxzdd":
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HOME);
				break;
			default:
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAIN_HALL);
				break;

		}
	}

	public static redirectScene(resp, data) {
		let roomInfo = resp.roomInfo;
		let gameId = roomInfo.gameId;
		Global.gameProxy.roomState = null;
		switch (gameId) {
			case "blnn":
				Global.niuniuProxy.currentSceneId = data.sceneId;
				Global.niuniuProxy.setRoomInfo(resp);
				Global.niuniuProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				// Global.niuniuProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				if (resp.reconnect && resp.roomInfo && resp.roomInfo.playing) {
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUGAMES);
				} else {
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUWAITE);
				}
				break;
			case "mjxlch":
			case "mjxzdd":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				if (resp.roomInfo && resp.roomInfo.playing) {
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAJIANG);
				} else {
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAJIANG_MATCH);
				}
				break;

		}
	}
}