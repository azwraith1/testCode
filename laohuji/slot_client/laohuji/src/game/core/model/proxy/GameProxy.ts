/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:26:11 
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-07-02 11:48:58
 * @Description: 游戏数据代理，所有游戏数据都从这里获取
 */
module game {
	export class GameProxy extends ResourceProxyBase {
		public static NAME: string = "GameProxy";
		//socket服务器地址
		public connectorInfo : ConnectInfoBean;
		public playerInfo: PlayerInfoBean;
		public roomInfo: RoomInfoBean;
		private init() {
			Global.gameProxy = this;
		}
	}
}