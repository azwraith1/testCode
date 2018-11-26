module game {
	export class NiuniuProxy extends ResourceProxyBase {
		public static NAME: string = "NiuniuProxy";

		public roomInfo: NNRoomInfoBean;

		public playerInfo;
		//当前对局玩法
		public lastGameConfig: any = {};

		public currentSceneId: number;
		public reconnect: boolean = false;
		private init() {
			Global.niuniuProxy = this;
			this.listenOnCall();
		}

		public listenOnCall() {

		}

		public async req2updateRoom() {
			var handler = ServerPostPath.game_roomHandler_c_queryRoomInfo;
			let resp: EnterSceneResp = await game.PomeloManager.instance.request(handler, this.lastGameConfig) as EnterSceneResp;
			// LogUtils.logD("resp %j=", resp)
			return new Promise((resolve, reject) => {
				if (resp && resp.roomInfo) {
					if (!this.roomInfo) {
						this.setRoomInfo(resp);
					} else {
						this.playerInfo = resp.playerInfo;
						_.extendOwn(this.roomInfo, resp.roomInfo);
					}
					if (resp.roomInfo['serverTime']) {
						DateTimeManager.instance.updateServerTime(resp.roomInfo['serverTime']);
					}
					resolve();
				}
			});
		}

		/**
		 * 设置游戏房间数据
		 * @param  {} roomInfo
		 */
		public setRoomInfo(enterSceneResp: EnterSceneResp) {
			LogUtils.logDJ(enterSceneResp);
			Global.niuniuProxy.currentSceneId = enterSceneResp.roomInfo.sceneId;
			this.reconnect = enterSceneResp.reconnect;
			this.playerInfo = new GamePlayerInfoBean();
			_.extendOwn(this.playerInfo, enterSceneResp.playerInfo);
			if (this.roomInfo == null) {
				this.roomInfo = new NNRoomInfoBean();
				_.extendOwn(this.roomInfo, enterSceneResp.roomInfo);
			}
		}

		public updatePlayer(index, player) {
			if (!this.roomInfo) {
				return;
			}
			this.roomInfo.players[index] = player;

		}


		/**
		 * 得到游戏玩家
		 */
		public getPlayers() {
			if (!this.roomInfo) {
				return [];
			}
			return this.roomInfo.players;
		}

		public getPlayersLength() {
			return _.keys(this.roomInfo.players).length;
		}

		/**
		 * 获取玩家本人的index
		 */
		public getMineIndex() {
			if (!this.playerInfo) {
				return null;
			}
			return this.playerInfo.playerIndex;
		}


		/**
		 * 当前Index是否是我自己
		 * @param  {} index
		 */
		public checkIndexIsMe(index) {
			return game.Utils.valueEqual(index, this.playerInfo.playerIndex);
		}

		public getMineInfo() : NNPlayerGameBean{
			return this.roomInfo.players[this.playerInfo.playerIndex];
		}

		public getPlayerInfoByIndex(index) {
			return this.roomInfo.players[index];
		}

		public clearRoomInfo(){
			this.roomInfo = null;
			this.playerInfo = null;
			this.reconnect = false;
		}
	}
}