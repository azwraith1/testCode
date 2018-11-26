/*
 * @Author: li mengchan 
 * @Date: 2018-10-18 15:14:14 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-08 19:34:37
 * @Description: 牛牛游戏界面
 */
module niuniu {
	export class NiuniuScene extends game.BaseComponent {
		//头像组 1 - 6
		private player1: eui.Group;

		//头像 1 - 6
		private header1: NiuniuHeader;
		//自己的牌组
		private cards1: NiuniuCardList2;
		//其他玩家的牌组
		private cards2: NiuniuCardList1;
		//自己小牌
		private cards1_1: NiuniuCardList1;
		//抢庄的条
		private qzBar: NiuniuQZBar;

		private yzBar: NiuniuYZBar;
		//计算器
		private caculator: NiuniuCaculatorBar;
		//倒计时
		private timeBar: NiuniuTimeDirectionBar;

		private ynBtn: eui.Button;

		private wnBtn: eui.Button;

		private exitBtn: eui.Button;
		//座位号
		private directions: any
		//选出来的牛牌。
		private nplist = [];

		private randoms: BankerRandom;
		//每个玩家占位1-6
		private pl1: eui.Image;
		private effectGroup: eui.Group;

		private niuniuTipsData = {};

		private status: number;
		public constructor() {
			super();
			this.skinName = new NiuniuSceneSkin();
		}

		public async createChildren() {
			super.createChildren();
			
			this.restartBtn.visible = false;
			game.UIUtils.setAnchorPot(this.ynBtn);
			game.UIUtils.setAnchorPot(this.wnBtn);
			this.niuniuTipsData = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6" };
			game.AudioManager.getInstance().playMajiangMusic("playingingame_mp3");
			this.qzBar.setRoot(this);
			this.yzBar.setRoot(this);
			// this.test();
			// return;
			this.timeBar.startTime(this);
			this.timeBar.visible = true;
			let length = _.values(Global.niuniuProxy.getPlayers()).length;
			this.directions = NiuniuUtils.getDirectionByMine(Global.niuniuProxy.getMineIndex(), length);
			this.showHeaders();
			//交换一下位子 适配一下
			if (length == 4) {
				this.changePlayerGroup(3, 4);
				this.changePlayerGroup(4, 6);
			} else if (length == 3) {
				this.changePlayerGroup(3, 4);
			}
			for (let i = 1; i <= length; i++) {
				this['header' + this.directions[i]].setIndex(i);
			}
			if (Global.niuniuProxy.reconnect) {
				// await Global.niuniuProxy.req2updateRoom();
				let roomInfo = Global.niuniuProxy.roomInfo;
				this.showRunTimeByStep(roomInfo.roundStatus);
				//主动拉取房间数据，这里是麻将的，改成牛牛。
			}
			this.listenEvent();
		}

		/**
		 * 根据坐标找到头像
		 * @param  {} index
		 */
		private getHeaderByIndex(index) {
			for (let i = 1; i <= 6; i++) {
				if (this['header' + i].index == index) {
					return this['header' + i];
				}
			}
			return null;
		}


		/**
		 * 有牛BTN点击
		 */
		private async ynBtnTouchEnd() {
			if (!this.nplist || this.nplist.length != 3) {
				TipsCompoment.instance.show("请选牌");
				return;
			}
			let sum = NiuniuUtils.getNumberSum(this.nplist);
			if (sum % 10 != 0) {
				TipsCompoment.instance.show("选牌错误");
				return;
			}
			this.ynBtn.visible = false;
			this.wnBtn.visible = false;
			this.cards1.visible = false;
			this.cards1_1.visible = true;
			this.caculator.visible = false;
			var handler = ServerPostPath.game_nnHandle_rc_playCards;
			let cardss = { cards: this.nplist };
			let resp: any = await game.PomeloManager.instance.request(handler, cardss);
			if (resp && resp.error && resp.error.code == 0) {
				// 	this.caculator.visible = false;
				// } else {
				// 	this.ynBtn.visible = true;
				// 	this.wnBtn.visible = true;
				// 	this.cards1_1.visible = false;
				// 	this.cards1.visible = true;
			}
		}

		/**
		 * 无牛按钮点击
		 */
		private async wxBtnTouchEnd() {
			let player = Global.niuniuProxy.getMineInfo();
			if (player.roundPattern > 0) {
				TipsCompoment.instance.show("你再看看，可能有牛哦");
				return;
			}
			var handler = ServerPostPath.game_nnHandle_rc_playCards;
			let cardss = { cards: [] };
			this.ynBtn.visible = false;
			this.wnBtn.visible = false;
			this.cards1_1.visible = true;
			this.cards1.visible = false;
			this.caculator.visible = false;
			let resp1: any = await game.PomeloManager.instance.request(handler, cardss);
			if (resp1.error.code == 0) {
				// 	this.caculator.visible = false;
				// } else {
				// 	this.ynBtn.visible = true;
				// 	this.wnBtn.visible = true;
				// 	this.cards1_1.visible = false;
				// 	this.cards1.visible = true;
			}
		}

		/**
		 * 自带监听
		 */
		public async onTouchTap(e: egret.TouchEvent) {
			let sum = 0;
			e.stopPropagation();
			switch (e.target) {
				case this.ynBtn:
					this.ynBtnTouchEnd();
					break;
				case this.wnBtn:
					this.wxBtnTouchEnd();
					break;
				case this.restartBtn:
					this.restartBtnTouch();
					break;
				case this.exitBtn:
					this.exitBtnTouch();
					break;
			}
		}
		private listenEvent() {
			EventManager.instance.addEvent(ServerNotify.s_robDealerMulti, this.robDealerMulti, this);
			EventManager.instance.addEvent(ServerNotify.s_startRobDealer, this.startRobDealer, this);
			EventManager.instance.addEvent(ServerNotify.s_playerRobDealer, this.playerRobDealer, this);
			EventManager.instance.addEvent(ServerNotify.s_startAddAnte, this.startAddAnte, this);
			EventManager.instance.addEvent(ServerNotify.s_addAnteFinish, this.addAnteFinish, this);
			EventManager.instance.addEvent(ServerNotify.s_startPlayCards, this.startPlayCards, this);
			EventManager.instance.addEvent(ServerNotify.s_playCards, this.playCards, this);
			EventManager.instance.addEvent(ServerNotify.s_playCardsFinish, this.playCardsFinish, this);
			EventManager.instance.addEvent(ServerNotify.s_playerAddAnte, this.playerAddAnte, this);
			EventManager.instance.addEvent(ServerNotify.s_playerAnteChange, this.playerAnteChange, this);
			EventManager.instance.addEvent(ServerNotify.s_roundSettlement, this.roundSettlement, this);
			EventManager.instance.addEvent(ServerNotify.s_dealerChanged, this.dealerChanged, this);
			EventManager.instance.addEvent(ServerNotify.s_initHandCards, this.initHandCards, this);
			EventManager.instance.addEvent(ServerNotify.s_addAnteMulti, this.addAnteMulti, this);
			EventManager.instance.addEvent(ServerNotify.s_roomFinished, this.roomFinished, this);
			EventManager.instance.addEvent(ServerNotify.s_countdown, this.countdown, this);
			EventManager.instance.addEvent(EventNotify.CACULATOR_VALUE, this.touchList, this);
			EventManager.instance.addEvent(EventNotify.RECONNECT_SUC, this.reconnectSuc, this);
		}

		private listenOffEvent() {
			EventManager.instance.removeEvent(ServerNotify.s_robDealerMulti, this.robDealerMulti, this);
			EventManager.instance.removeEvent(ServerNotify.s_startRobDealer, this.startRobDealer, this);
			EventManager.instance.removeEvent(ServerNotify.s_playerRobDealer, this.playerRobDealer, this);
			EventManager.instance.removeEvent(ServerNotify.s_startAddAnte, this.startAddAnte, this);
			EventManager.instance.removeEvent(ServerNotify.s_addAnteFinish, this.addAnteFinish, this);
			EventManager.instance.removeEvent(ServerNotify.s_startPlayCards, this.startPlayCards, this);
			EventManager.instance.removeEvent(ServerNotify.s_playCards, this.playCards, this);
			EventManager.instance.removeEvent(ServerNotify.s_playCardsFinish, this.playCardsFinish, this);
			EventManager.instance.removeEvent(ServerNotify.s_playerAddAnte, this.playerAddAnte, this);
			EventManager.instance.removeEvent(ServerNotify.s_playerAnteChange, this.playerAnteChange, this);
			EventManager.instance.removeEvent(ServerNotify.s_roundSettlement, this.roundSettlement, this);
			EventManager.instance.removeEvent(ServerNotify.s_dealerChanged, this.dealerChanged, this);
			EventManager.instance.removeEvent(ServerNotify.s_initHandCards, this.initHandCards, this);
			EventManager.instance.removeEvent(EventNotify.CACULATOR_VALUE, this.touchList, this);
			EventManager.instance.removeEvent(ServerNotify.s_addAnteMulti, this.addAnteMulti, this);
			EventManager.instance.removeEvent(ServerNotify.s_roomFinished, this.roomFinished, this);
			EventManager.instance.removeEvent(ServerNotify.s_countdown, this.countdown, this);
			EventManager.instance.removeEvent(EventNotify.RECONNECT_SUC, this.reconnectSuc, this);
		}

		public onRemoved() {
			super.onRemoved();
			this.listenOffEvent();
		}


		public countdown(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			if (!roomInfo.countdown) {
				roomInfo.countdown = {};
			}
			roomInfo.countdown.start = data.start;
			roomInfo.countdown.end = data.end;
		}

		//抢庄START
		/**
	 	 * 抢庄step流程
		 */
		private runQzStep() {
			TipsCompoment.instance.show("开始抢庄");
			let roomInfo = Global.niuniuProxy.roomInfo;
			let players = roomInfo.players;
			for (let index in players) {
				let player = players[index];
				if (player.robDealerAnte == -1) {
					//如果是我 没有抢庄状态 就显示抢庄条
					if (Global.niuniuProxy.checkIndexIsMe(index)) {
						this.qzBar.show(player.robDealerMulti);
					}
				} else {
					let header = this.getHeaderByIndex(index) as NiuniuHeader;
					header.showBeishu(player.robDealerAnte);
				}
			}
		}

		/**
		 * 接收服务器开始抢庄消息
		 */
		private startRobDealer(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			roomInfo.roundStatus = NiuniuStep.QIANG_ZHUANG;
			if (!roomInfo.countdown) roomInfo.countdown = {};
			roomInfo.countdown.end = data.countdownMS + data.serverTimeStampMS;
			game.DateTimeManager.instance.updateServerTime(data.serverTimeStampMS);
		}

		/**
		 * 开始抢庄显示抢庄条
		 */
		private robDealerMulti(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.niuniuProxy.roomInfo;
			let mine = Global.niuniuProxy.getMineInfo();
			mine.robDealerMulti = data;
			this.showRunTimeByStep(roomInfo.roundStatus);
		}


		/**
		 * 发送抢庄信息
		 */
		public async sendQZReq(multi) {
			//抢庄完成后发个事件给服务器  
			let serverPath = ServerPostPath.game_nnHandler_c_robDealer;
			let data = { multi: multi };
			this.qzBar.visible = false;
			let resp: any = await Global.pomelo.request(serverPath, data);
			if (resp && resp.error && resp.error.code != 0) {
				if (Global.niuniuProxy.roomInfo.roundStatus == NiuniuStep.QIANG_ZHUANG) {
					this.qzBar.visible = true;
				}
			}
		}

		/**
		* 收到某个玩家抢庄
		*
 		*/
		private playerRobDealer(e: egret.Event) {
			let data = e.data;
			if (data.playerIndex == Global.niuniuProxy.getMineIndex()) {
				this.qzBar.visible = false;
			}
			let player = Global.niuniuProxy.getPlayerInfoByIndex(data.playerIndex);
			player.qzMulti = data.multi;
			let header = this.getHeaderByIndex(data.playerIndex) as NiuniuHeader;
			header.showBeishu(data.multi);
			//展示每个玩家抢庄分数
		}

		/**
		 * 抢庄结果
		 */
		private dealerChanged(e: egret.Event) {
			let data = e.data;
			let room = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			room.dealer = data.dealer;
			room.dealer = data.dealer;
			room.randomDealers = data.randomDealers
			//除了庄家的其他玩家倍数全部空
			for (let i = 1; i <= 6; i++) {
				let header = this['header' + i] as NiuniuHeader;
				if (header.index != room.dealer) {
					header.hideBeishu();
				}
			}
			Global.niuniuProxy.roomInfo.countdown = null;
			this.timeBar.visible = false;
			this.randomEstates();
			this.releaseQZUI();
		}

		/**
		 * 回收抢庄UI
		 */
		private releaseQZUI() {
			this.qzBar.visible = false;
		}

		private releaseKPUI() {
			this.caculator.visible = false;
			this.ynBtn.visible = false;
			this.wnBtn.visible = false;
			this.cards1.visible = false;
			this.releaseQZUI();
		}

		//抢庄END

		//押注流程start

		/**
		 * 进入押注流程 等待addAnteMulti
		 */
		private startAddAnte(e: egret.Event) {
			this.releaseQZUI();
			//给服务器发事件 game_nnHandler_c_addAnte
			let data = e.data;
			let room = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			room.roundStatus = NiuniuStep.ADDANTE;
			if (!room.countdown) room.countdown = {};
			room.countdown.end = data.countdownMS + data.serverTimeStampMS;
			game.DateTimeManager.instance.updateServerTime(data.serverTimeStampMS);
			//如果是庄家就显示等待

		}

		/**
		 * 闲家显示押注条 开始发送闲家押注请求
		 * @param  {egret.TouchEvent} e
		 * 
		 */
		private addAnteMulti(e: egret.TouchEvent) {
			let data = e.data;
			let roomInfo = Global.niuniuProxy.roomInfo;
			let mine = Global.niuniuProxy.getMineInfo();
			mine.addAnteMulti = data;
			Global.niuniuProxy.roomInfo.roundStatus = NiuniuStep.ADDANTE;
			let time = 1000;
			if (this.qzLength > 1) {
				time = (this.qzLength) * 300;
			}
			egret.setTimeout(() => {
				this.showRunTimeByStep(roomInfo.roundStatus);
			}, this, time);
		}

		/**
		 * 闲家的押注UI流程
		 */
		private runAddanteStep() {
			TipsCompoment.instance.show("闲家开始押注");
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			let players = roomInfo.players;
			for (let index in players) {
				let player = players[index];
				if (player.addAnte == -1) {
					//我不是庄家就显示
					if (Global.niuniuProxy.checkIndexIsMe(index) && roomInfo.dealer + "" != index) {
						// egret.setTimeout(() => {
						this.yzBar.show(player.addAnteMulti);
						// }, this, 1800);
					}
				} else {
					let header = this.getHeaderByIndex(index) as NiuniuHeader;
					header.showBeishu(player.addAnte);
				}
			}
		}

		/**
		 * 闲家押注
		 */
		public async sendYZReq(value) {
			let serverPath = ServerPostPath.game_nnHandler_c_addAnte;
			let data = { multi: value };
			this.yzBar.visible = false;
			let resp: any = await Global.pomelo.request(serverPath, data);
			if (resp && resp.error && resp.error.code != 0) {
				if (Global.niuniuProxy.roomInfo.roundStatus == NiuniuStep.ADDANTE) {
					this.yzBar.visible = true;
				}
			}
		}

		/**
		 * 同playerAnteChange
		 * 玩家押注通知
		 */
		private playerAddAnte(e: egret.Event) {
			//	展示每个压住玩家的分数  game_nnHandler_c_addAnte
			this.playerAnteChange(e);
		}

		/**
		 * 玩家押注通知
		 */
		private playerAnteChange(e: egret.Event) {
			let data = e.data;
			if (data.playerIndex == Global.niuniuProxy.getMineIndex()) {
				this.yzBar.visible = false;
			}
			let player = Global.niuniuProxy.getPlayerInfoByIndex(data.playerIndex) as NNPlayerGameBean;
			player.addAnte = data.multi;
			let header = this.getHeaderByIndex(data.playerIndex) as NiuniuHeader;
			header.showBeishu(data.multi);
		}

		/**
		 * 押注完成 
		 */
		private addAnteFinish(e: egret.Event) {
			//服务器会告诉,相当于清除押注的UI，开始发牌的相关UI
			let room = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			room.roundStatus = NiuniuStep.EMPTY;
			Global.niuniuProxy.roomInfo.countdown = null;
			this.timeBar.visible = false;
			this.releaseYZUI();
		}


		private releaseYZUI() {
			this.releaseQZUI();
			this.yzBar.visible = false;
		}

		//押注end

		//发牌开始

		/**
		 * 开始发牌
		 */
		private initHandCards(e: egret.Event) {
			this.releaseYZUI();
			let data = e.data;
			let cards = data.cards;
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			roomInfo.roundStatus = NiuniuStep.FAPAI;
			this.createPokers();
			let players = roomInfo.players;
			for (let key in players) {
				let player = players[key];
				let index = this.directions[key];
				if (Global.niuniuProxy.checkIndexIsMe(key)) {
					player.handCards = cards;
					player.roundPattern = data.roundPattern;
					this.cards1.renderByList(cards);
				} else {
					player.cardLength = data.cardLength;
					this['player' + index].visible = true;
					let cards = this['cards' + index] as NiuniuCardList1;
					cards.renderByList(player.cardLength);
				}
			}
			this.startMove();
			//动画过后展现
			// egret.setTimeout(() => {
			//进入看牌流程
			// roomInfo.roundStatus = NiuniuStep.XUANPAI;

			// }, this, 3500);
		}

		/**
		 * 选牌  7
		 */
		private startPlayCards(e: egret.Event) {
			let data = e.data;
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			if (!roomInfo.countdown) roomInfo.countdown = {};
			roomInfo.countdown.end = data.countdownMS + data.serverTimeStampMS;
			game.DateTimeManager.instance.updateServerTime(data.serverTimeStampMS);

		}

		private lockTouch: boolean = false;
		private hideTouch() {
			this.caculator.visible = false;
			this.ynBtn.visible = false;
			this.wnBtn.visible = false;
			this.lockTouch = true;
		}

		/**
		 * 服务器推送什么牌型  8
		 */
		private playCards(e: egret.Event) {
			//展示有牛没牛，但是不给其他玩家展示
			let data = e.data;
			let cards = data.handCards;
			let roundPattern = data.roundPattern;
			let selectCards = data.selectedCards;
			let index = data.playerIndex;
			let player = Global.niuniuProxy.getPlayerInfoByIndex(index);
			player.handCards = cards;
			player.roundPattern = roundPattern;
			player.selectCards = selectCards;
			if (Global.niuniuProxy.checkIndexIsMe(index)) {
				//是我
				this.hideTouch();
				this.cards1.delTouch();
				this.cards1.visible = false;
				this.cards1_1.visible = true;
			}
		}

		private sortShoupai(cards, selectCards) {
			if (!selectCards) {
				return cards;
			}
			let copyCard = selectCards.concat(cards);
			return _.uniq(copyCard);
		}

		/**
		 * 玩家选牌结果 9
		 */
		private playCardsFinish(e: egret.Event) {
			//玩家选牌完成，展示所有玩家的牌面。
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			roomInfo.roundStatus = NiuniuStep.EMPTY;
			Global.niuniuProxy.roomInfo.countdown = null;
			this.timeBar.visible = false;
			this.releaseKPUI();
		}


		/**
		 * 飞金币效果
		 */
		private showGold2Header(index1, index2) {
			let header1 = this['header' + index1] as NiuniuHeader;//this.getHeaderByIndex(index1) as NiuniuHeader;
			let header2 = this['header' + index2] as NiuniuHeader;//this.getHeaderByIndex(index2) as NiuniuHeader;
			let arr = [];
			for (let i = 0; i < 8; i++) {
				arr.push(i);
			}
			async.eachSeries(arr, (num, callback) => {
				let image = ObjectPool.produce("nn_coin_img", eui.Image) as eui.Image;
				if (!image) {
					image = new eui.Image("nn_coin_png");
					image.scaleX = image.scaleY = 0.8;
				}
				image.x = header1.localToGlobal().x + 30 + _.random(-20, 20) //+ header2.width / 2;
				image.y = header1.localToGlobal().y + 45 + _.random(-20, 20)//+ header2.height / 2;
				this.effectGroup.addChild(image);
				game.UIUtils.setAnchorPot(image);
				let length = Math.floor(game.Utils.ggdl(
					header1.localToGlobal().x
					, header2.localToGlobal().x, header1.localToGlobal().y, header2.localToGlobal().y));
				egret.Tween.get(image).wait(15 * (num / 2)).call(() => {
					callback();
				}).to({
					x: header2.localToGlobal().x + 53 + _.random(-20, 20),// + header2.width / 2,
					y: header2.localToGlobal().y + 77 + _.random(-20, 20)// + header2.height / 2
				}, length, egret.Ease.cubicInOut).call(() => {
					game.UIUtils.removeSelf(image);
					ObjectPool.reclaim("nn_coin_img", image);
				});
			});

			egret.Tween.get(Image).to({}, )
		}

		private updateZhuangjiaLiushui(gold) {
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			let player = roomInfo.players[roomInfo.dealer];
			let header = this['header' + roomInfo.dealer];
			if (Global.niuniuProxy.checkIndexIsMe(roomInfo.dealer)) {
				Global.playerProxy.playerData.gold += gold;
			}
			header.showLiushuiLabel(gold);
		}

		/**
		 * 结算
		 */
		private roundSettlement(e: egret.Event) {
			//调用展示牌
			this.releaseKPUI();
			let data = e.data;
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			let keys = NiuniuUtils.getNNSort(roomInfo.dealer, Global.niuniuProxy.getPlayersLength());
			async.eachSeries(keys, (key, callback) => {
				let player = Global.niuniuProxy.getPlayerInfoByIndex(key);
				let ptn = player.roundPattern;
				let dir = this.directions[key];
				if (!Global.niuniuProxy.checkIndexIsMe(key)) {
					let resultCards = this.sortShoupai(player.handCards, player.selectCards);
					let list1 = this['cards' + dir] as NiuniuCardList1;
					list1.renderByList(resultCards);
				} else {
					let resultCards = this.sortShoupai(player.handCards, player.selectCards);
					let list1 = this['cards' + dir + "_" + dir] as NiuniuCardList1;
					list1.renderByList(resultCards);
				}
				egret.setTimeout(() => {
					this.showNiu(ptn, dir);
				}, this, 100)
				egret.setTimeout(() => {
					callback();
				}, this, 1000);
			}, () => {
				this.goldAni(data);
			});
		}

		/**
		 * 金币过滤。
		 */
		private goldAni(records) {
			let xian2zhuangRecords = [];
			let zhuang2xianRecords = [];
			let dealerRecords;
			let roomInfo = Global.niuniuProxy.roomInfo as NNRoomInfoBean;
			//把庄家流水过滤出来
			for (let key in records) {
				let record = records[key];
				if (key != roomInfo.dealer + "") {
					if (record[0].info.gainGold > 0) {
						zhuang2xianRecords.push(record[0]);
					} else {
						xian2zhuangRecords.push(record[0]);
					}
					record[0].index = key;
				} else {
					dealerRecords = record;
				}
			}
			let showRecord2GoldAni = (record) => {
				let player = roomInfo.players[record.index];
				let dirIndex = this.directions[record.index];
				let header = this.getHeaderByIndex(record.index) as NiuniuHeader;
				let sum = record.info.gainGold;
				player.gold += sum;
				if (Global.niuniuProxy.checkIndexIsMe(record.index)) {
					Global.playerProxy.playerData.gold += sum;
				}
				if (sum > 0) {
					this.showGold2Header(this.directions[roomInfo.dealer], dirIndex);
				} else {
					this.showGold2Header(dirIndex, this.directions[roomInfo.dealer]);
				}
			}

			async.waterfall([
				(callback) => {
					//闲家飞庄家
					if (xian2zhuangRecords.length == 0) {
						callback();
						return;
					}
					for (let i = 0; i < xian2zhuangRecords.length; i++) {
						showRecord2GoldAni(xian2zhuangRecords[i]);
					}
					egret.setTimeout(callback, this, 1500);
				},
				(callback) => {
					//庄家飞闲家
					if (zhuang2xianRecords.length == 0) {
						callback();
						return;
					}
					for (let i = 0; i < zhuang2xianRecords.length; i++) {
						showRecord2GoldAni(zhuang2xianRecords[i]);
					}
					egret.setTimeout(callback, this, 1000);
				}
			], (data, callback) => {
				//庄家飞闲家				
				for (let key in records) {
					let player = roomInfo.players[key];
					let header = this.getHeaderByIndex(key) as NiuniuHeader;
					let lishuis = records[key];
					//先统计总数
					let sum = 0;
					for (let i = 0; i < lishuis.length; i++) {
						let liushui = lishuis[i];
						sum += liushui.info.gainGold;
					}
					if (key == roomInfo.dealer + "") {
						player.gold += sum;
						if (Global.niuniuProxy.checkIndexIsMe(key)) {
							Global.playerProxy.playerData.gold += sum;
						}
					}
					header.showLiushuiLabel(sum);
				}
				egret.setTimeout(() => {
					this.restartBtn.visible = true;
				}, this, 2000);
			});
		}



		private test() {
			this.showHeaders_test();
			// this.restartBtn.visible = true;
			let card = [201, 202, 203, 204, 205];
			this.cards1.renderByList(card);
			this.cards1.visible = true;
			// egret.setTimeout(() => {
			// this.turnOutPoker(card);
			// }, this, 2000)
		}

		/**
	     * 展现玩家头像
	     */
		private showHeaders() {
			let players = Global.niuniuProxy.getPlayers();
			let zhuangId = Global.niuniuProxy.roomInfo.dealer;//换到抢庄的地方去。
			for (let key in players) {
				let dir = this.directions[key];
				let player = this['player' + dir] as eui.Group;
				let header = this['header' + dir] as NiuniuHeader;
				if (Global.niuniuProxy.checkIndexIsMe(key)) {
					let cards = this['cards' + dir] as NiuniuCardList2;
					//cards.visible = false;
				} else {
					let cards = this['cards' + dir] as NiuniuCardList1;
					cards.visible = false;
				}
				header.initWithPlayer(players[key]);
				header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
				player.visible = true;
				header.visible = true;
			}
			this['header2'].change2Left();
		}

		private runFapaiStep() {

		}

		private runXuanpaiStep() {
			let players = Global.niuniuProxy.getPlayers();
			this.cards1.addTouch();
			for (let key in players) {
				let player = players[key] as NNPlayerGameBean;
				let dirIndex = this.directions[key];
				let header = this.getHeaderByIndex(key) as NiuniuHeader;
				header.showBeishu(player.addAnte);
				if (Global.niuniuProxy.checkIndexIsMe(key)) {
					if (player.isPlayCards) {
						//选择了牌
						this.cards1_1.visible = true;
					} else {
						this.caculator.visible = true;
						this.ynBtn.visible = true;
						this.wnBtn.visible = true;
						this.cards1.visible = true;
						this.cards1.renderByList(player.handCards);
					}
				} else {
					let cards = this['cards' + this.directions[key]] as NiuniuCardList1;
					cards.renderByList(5);
					cards.visible = true;
				}
			}
		}

		/**
		 * 展示不同时间节点状态
		 */
		private showRunTimeByStep(step) {
			switch (step) {
				case NiuniuStep.QIANG_ZHUANG:
					this.timeBar.visible = true;
					this.runQzStep();
					break;
				case NiuniuStep.FAPAI:
					this.timeBar.visible = false;
					this.runFapaiStep();
					break;
				case NiuniuStep.KAIPAI:
				case NiuniuStep.XUANPAI:
					this.timeBar.visible = true;
					this.runXuanpaiStep();
					break;
				case NiuniuStep.ADDANTE:
					this.timeBar.visible = true;
					this.runAddanteStep();
					break;
			}
		}

		/**
		 * 翻牌效果，就是把扣下的牌翻过来。
		 */
		private turnOutPoker(card) {
			let players = Global.niuniuProxy.getPlayers();
			for (let key in players) {
				let dir = this.directions[key];
				if (Global.niuniuProxy.checkIndexIsMe(key)) {
					let cards = this['cards' + dir] as NiuniuCardList2;
					cards.turnOutPoker_me(card);
				} else {
					let cards = this['cards' + dir] as NiuniuCardList1;
					cards.turnOutPoker_others();
				}
			}
		}

		private touchList(e: egret.Event) {
			this.nplist = [];
			let nums = e.data;
			if (nums.length < 3) {

			} else {
				for (let i = 0; i < nums.length; i++) {
					let value = nums[i]["value"];
					let color = nums[i]["color"];
					let cardValue = color * 100 + value;
					this.nplist.push(cardValue);
				}
			}
		}

		/**
		 * 游戏结束
		 * @param  {egret.TouchEvent} e
		 */
		private restartBtn: eui.Button;
		private roomFinished(e: egret.TouchEvent) {
			// this.restartBtn.visible = true;
			let roomInfo = Global.niuniuProxy.roomInfo;
			roomInfo.roundStatus = NiuniuStep.CLOSE;
			this.status = NiuniuStatus.close;
			this.timeBar.visible = false;
			this.timeBar.removeTimer();
			// this.showRunTimeByStep
		}

		/**
		 * 重新匹配
		 */
		private async restartBtnTouch() {
			Global.niuniuProxy.clearRoomInfo();
			var handler = ServerPostPath.hall_sceneHandler_c_enter;
			delete Global.niuniuProxy.lastGameConfig['roomId'];
			let data = _.clone(Global.niuniuProxy.lastGameConfig);
			data['isContinue'] = true;
			let resp: any = await game.PomeloManager.instance.request(handler, data);
			if (resp && resp.error && resp.error.code == 0) {
				game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUGAME);
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUWAITE, data);
			}
		}

		/**
			 * 展现玩家头像
			 */
		private showHeaders_test() {
			let players = Global.niuniuProxy.getPlayers().length || [1, 2, 3, 4, 5, 6];
			//let zhuangId = Global.niuniuProxy.roomInfo.dealer;//换到抢庄的地方去。
			for (let key = 1; key <= 6; key++) {
				//	let dir = this.directions[key];
				let player = this['player' + key] as eui.Group;
				let header = this['header' + key] as NiuniuHeader;
				if (key == 2) {
					let cards = this['cards' + key] as NiuniuCardList2;
					cards.visible = false;
				} else {
					let cards = this['cards' + key] as NiuniuCardList1;
					cards.visible = false;
				}
				//header.initWithPlayer(players[key]);
				player.visible = true;
				header.visible = true;
			}

			// this.randomEstates();
		}

		private createPokers() {
			let length = Global.niuniuProxy.getPlayersLength() || 6;
			for (let i = length * 5 - 1; i >= 0; i--) {
				let tempPokers: niuniu.NiuniuCard = ObjectPool.produce("niuniu_poker", niuniu.NiuniuCard);
				if (!tempPokers) {
					tempPokers = new niuniu.NiuniuCard();
				}
				this.effectGroup.addChild(tempPokers);
				tempPokers.name = "poker" + i;
				tempPokers.scaleX = tempPokers.scaleY = 0.55;
				tempPokers.verticalCenter = 0;
				tempPokers.horizontalCenter = 0.05 - i * 0.08;
			}
			// this.startMove();
		}


		/**
		 * 发牌
		 */
		private startMove() {
			let count = 1;
			let length = Global.niuniuProxy.getPlayersLength() || 6;
			var listArr = [];
			for (let i = 0; i < length; i++) {
				listArr[i] = i;
			}
			async.eachSeries(listArr, (data, callback) => {
				let time1 = 0;
				for (let i = data * 5; i < (data + 1) * 5; i++) {
					let poker = this.effectGroup.getChildByName("poker" + i);
					egret.Tween.get(poker)
						.to({ verticalCenter: this["pl" + count].verticalCenter, horizontalCenter: this["pl" + count].horizontalCenter }, (150 + (50 * time1))).call(() => {
							game.UIUtils.removeSelf(poker);
							ObjectPool.reclaim("niuniu_poker", poker);
						});
					time1++;
				}
				egret.setTimeout(() => {
					this["pl" + count].visible = false;
					this['cards' + count].visible = true;
					this['cards' + count].cardAnimation();
					count++;
					callback();
				}, this, 150);
			}, () => {
				egret.setTimeout(() => {
					Global.niuniuProxy.roomInfo.roundStatus = NiuniuStep.XUANPAI;
					this.showRunTimeByStep(Global.niuniuProxy.roomInfo.roundStatus);
				}, this, 1000);
			});
		}

		private async tweenSync(node, showTime, hideTime) {
			return new Promise((resolve, reject) => {
				egret.Tween.get(node).to({ visible: true }, showTime).to({ visible: false }, hideTime).call(() => {
					resolve();
				});
			})
		}

		/**
		 * 定庄动画
		 */
		private qzLength = 0;
		private async randomEstates() {
			let players = Global.niuniuProxy.roomInfo.randomDealers;
			let zhuangId = Global.niuniuProxy.roomInfo.dealer;//换到抢庄的地方去。	
			let dealers = this.directions[zhuangId];
			let showCount = 3;
			this.qzLength = players.length;
			if (players.length == 1) {
				let header = this['header' + dealers] as NiuniuHeader;
				header.headerImage_k.visible = true;
				header.showIsZhuang(true);
				showCount = 0;
				return;
			} else {
				do {
					for (let i = 0; i < players.length; i++) {
						let dir = this.directions[players[i]];
						let header = this['header' + dir] as NiuniuHeader;
						await this.tweenSync(header.headerImage_k, 50, 50);
					}
					showCount--;
				} while (showCount > 0);
				let header = this['header' + dealers] as NiuniuHeader;
				header.headerImage_k.visible = true;
				egret.Tween.get(header.headerImage_k).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80);
				header.showIsZhuang(true);
			}

		}

		/**
		 * 交换group位子
		 */
		private changePlayerGroup(index1, index2) {
			this['player' + index1].bottom = this['player' + index2].bottom;
			this['player' + index1].left = this['player' + index2].left;
			this['player' + index1].top = this['player' + index2].top;
			this['player' + index1].right = this['player' + index2].right;
			this['player' + index1].verticalCenter = this['player' + index2].verticalCenter;
			this['player' + index1].horizontalCenter = this['player' + index2].horizontalCenter;
			this['player' + index1].width = this['player' + index2].width;
			this['player' + index1].height = this['player' + index2].height;
			this['header' + index1].x = this['header' + index2].x;
			this['header' + index1].y = this['header' + index2].y;
			this['cards' + index1].x = this['cards' + index2].x;
			this['cards' + index1].y = this['cards' + index2].y;
			this['pl' + index1].verticalCenter = this['pl' + index2].verticalCenter;
			this['pl' + index1].horizontalCenter = this['pl' + index2].horizontalCenter;
			this.niuniuTipsData[index1] = index2;
		}
		
		/**
		 * 展示牛牌
		 */
		private showNiu(pt, direction) {
			let nnFenGroup = new NiuniuFen(pt);
			let dir = this.niuniuTipsData[direction] + "";
			switch (dir) {
				case "1":
					nnFenGroup.horizontalCenter = 20;
					nnFenGroup.verticalCenter = 180;
					break;
				case "2":
					nnFenGroup.horizontalCenter = 408;
					nnFenGroup.verticalCenter = 76;
					break;
				case "3":
					nnFenGroup.horizontalCenter = 284;
					nnFenGroup.verticalCenter = -95;
					break;
				case "4":
					nnFenGroup.horizontalCenter = 20;
					nnFenGroup.verticalCenter = -95;
					break;
				case "5":
					nnFenGroup.horizontalCenter = -245;
					nnFenGroup.verticalCenter = -95;
					break;
				case "6":
					nnFenGroup.horizontalCenter = -420;
					nnFenGroup.verticalCenter = 76;
					break;
			}
			this.effectGroup.addChild(nnFenGroup);
		}


		/**
		 * 返回按钮
		 */
		public async exitBtnTouch() {
			var quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
			if (quitResp) {
				if (quitResp.error && quitResp.error.code != 0) {
					let text = GameConfig.GAME_CONFIG['long_config']['10002'].content
					Global.alertMediator.addAlert(text, () => {
					}, null, true);
					return;
				}
				Global.niuniuProxy.clearRoomInfo();
				if (quitResp.gold) {
					Global.playerProxy.playerData.gold = quitResp.gold;
				}
				game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUGAME);
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUSELECT);
				return;
			}
			let text = GameConfig.GAME_CONFIG['long_config']['10002'].content
			Global.alertMediator.addAlert(text, () => {

			}, null, true);
		}


		/**
         * 断线重连
         */
		private async reconnectSuc(e: egret.Event) {
			//对局已经结束不做处理
			if (this.status == NiuniuStatus.close) {
				game.NetReconnect.instance.hide();
				return;
			}
			let reqData = Global.niuniuProxy.lastGameConfig;
			if (!reqData) reqData = {};
			if (!Global.niuniuProxy.roomInfo || !Global.niuniuProxy.roomInfo.roomId) {
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAIN_HALL);
				game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUGAME);
				return;
			}
			reqData.roomId = Global.niuniuProxy.roomInfo.roomId;
			Global.playerProxy.updatePlayerInfo(async () => {
				if (this.status == NiuniuStatus.close) {
					// game.NetReconnect.instance.hide();
					return;
				}
				let handler = ServerPostPath.hall_sceneHandler_c_enter;
				reqData['isContinue'] = false;
				let resp: any = await game.PomeloManager.instance.request(handler, reqData);
				if (!resp) {
					return;
				}
				if (!resp.error) {
					resp.error = {};
					resp.error.code = 0;
				}
				//游戏房间已经解散
				if (resp.error.code == -213) {
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAIN_HALL);
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUGAME);
					let text = GameConfig.GAME_CONFIG['long_config']['10006'].content || "对局已结束";
					Global.alertMediator.addAlert(text);
					//弹出提示
				} else if (resp.error.code == 0) {
					Global.niuniuProxy.clearRoomInfo();
					Global.niuniuProxy.setRoomInfo(resp);
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_NIUNIUGAME);
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUGAME);
				}
			})

			// game.NetReconnect.instance.hide();
		}
	}
}