/*
 * @Author: He Bing 
 * @Date: 2018-07-03 14:11:47 
 * @Last Modified time: 2018-07-06 11:53:44
 * @Description: 游戏选择场景。
 */

module majiang {
	export class MajiangSelectScene extends game.BaseComponent {
		//按键组，包含放大按钮和菜单按钮；
		private left_btngroup: eui.Group;
		//返回按钮
		private mj_btn_back: eui.Button;
		//血战到底按钮
		private mj_btn_xzdd: eui.Button;
		//游戏菜单
		private mj_btn_more: eui.Button;
		//血流成河按钮
		private mj_btn_xlch: eui.Button;
		//游戏玩家姓名
		private select_playerName: eui.Label;
		//游戏玩家头像
		private select_playerImage: eui.Image;
		//游戏玩家金币
		private goldLabel: eui.BitmapLabel;
		//选择游戏滚动窗口
		private select: eui.Scroller;
		//选择游戏列表
		// private select_game: eui.List;
		//全屏按钮。
		private mj_btn_fdsx: eui.Button;
		//背景保持全屏
		// private beijing: eui.Group;
		//选择按钮组
		private contentGroup: eui.Group;
		//提示语
		private tishiyu: eui.Label;
		private img_xzdd: eui.Image;
		//标题
		private sjmj_title: eui.Image;
		//暂时先做成图片的形式，不要要点击效果，等后期迭代的时候在家按钮效果
		private img_ch_down: eui.Image;
		private img_ch_up: eui.Image;
		private img_dd_down: eui.Image;
		private img_dd_up: eui.Image;
		private img_men0: eui.Image;
		private img_men1: eui.Image;

		private gold_add: eui.Button;
		//选择界面的总包
		public resizeGroup: eui.Group;
		private rightGroup: eui.Group;
		private gameRects;//游戏记录数据
		public hallId: string = "scmj";
		public constructor() {
			super();
			this.skinName = new majiang.MajiangSelectSceneSkin();
		}
		public onAdded() {
			super.onAdded();
			EventManager.instance.addEvent(EventNotify.ENTER_GOLD_SCENE, this.enterScene, this);
			EventManager.instance.addEvent(EventNotify.RECONNECT_SUC, this.reconnectSuc, this);


		}

		public onRemoved() {
			super.onRemoved();
			EventManager.instance.removeEvent(EventNotify.ENTER_GOLD_SCENE, this.enterScene, this);
			EventManager.instance.removeEvent(EventNotify.RECONNECT_SUC, this.reconnectSuc, this);
		}

		private reconnectSuc(e: egret.Event) {
			// game.NetReconnect.instance.hide();
		}

		/**
		 * 检查回到界面
		 */
		private checkReconnectScene() {
			let roomState = Global.gameProxy.roomState;
			if (roomState && roomState.state == 1) {
				let text = GameConfig.GAME_CONFIG['long_config']['10004'].content
				Global.alertMediator.addAlert(text, () => {
					EventManager.instance.dispatch(EventNotify.ENTER_GOLD_SCENE, roomState);
				});
			}
		}

		/**
		 * 获取对局信息
		 * @param  {egret.Event} e?
		 */
		private lock: boolean = false;
		private async enterScene(e?: egret.Event) {
			if (this.lock) {
				return;
			}
			try {
				this.lock = true;
				var data = e.data;
				Global.gameProxy.lastGameConfig = data;
				var handler = ServerPostPath.hall_sceneHandler_c_enter;
				data['isContinue'] = false;
				let resp: any = await game.PomeloManager.instance.request(handler, data);
				if (!resp) {
					this.lock = false;
					return;
				}
				console.info('********* enterScene resp=%j', resp);
				if(resp.reconnect){
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_HOME);
					HallForwardFac.redirectScene(resp, data);
				} else {
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAJIANG_MATCH, data);
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_HOME);
				}
			} catch (e) {
				Global.alertMediator.addAlert("加入房间失败");
			} finally{
				this.lock = false;
			}
		}

		/**
		 * 书写逻辑代码
		 */

		private choseType: number;//记录上次选择的游戏种类。
		public createChildren() {
			super.createChildren();
			game.AudioManager.getInstance().playHomeMusic("home_bg_mp3");
			this.checkReconnectScene();
			//给玩家的数据赋值
			this.select_playerName.text = Global.playerProxy.playerData.nickname;
			this.select_playerImage.source = "header_icon_" + Global.playerProxy.playerData.figure_url + "_png";
			this.updateGold();
			//给游戏选场数据列表赋值
			if (Global.gameProxy.gameType == 0) {
				this.choseGameType("mjxlch");
				this.visibleTorF(1);
				Global.gameProxy.diWen = "mjxlch";
			} else if (Global.gameProxy.gameType == 1) {
				this.choseGameType("mjxzdd");
				this.visibleTorF(2);
				Global.gameProxy.diWen = "mjxzdd";
			}
			this.sjmj_title.alpha = 0;
			egret.Tween.get(this.sjmj_title).to({ alpha: 0 }, 50).to({ alpha: 1 }, 600);
			this.rightGroup.x = 1208;
			egret.Tween.get(this.rightGroup).to({ horizontalCenter: 1161 }, 50).to({ horizontalCenter: 70 }, 300);
			RES.loadGroup("majiang_back");
		}


		/**
		 * @param  {egret.TouchEvent} e父类方法，自己知道调
		 * 全屏的放大
		 *本界面里的所有点击事件。
		 * 
		 */
		private times = 0;//点击次数。
		private msgs;//保存数据。
		public onTouchTap(event: egret.TouchEvent) {
			event.stopPropagation();
			switch (event.target) {
				case this.mj_btn_fdsx://放大缩小
					game.UIUtils.windowFullscreen();
					break;
				case this.mj_btn_back://返回上一级
					//alert("没得返回的，等一等")
					majiang.MajiangUtils.playClick();//管理声音的
					egret.Tween.get(this.mj_btn_back).to({ scaleX: 0.8, scaleY: 0.8 }, 50).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
						game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_MAIN_HALL);
						game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_HOME);
					});

					break;
				//血流成河 
				case this.img_ch_down:
				case this.img_ch_up:
				case this.img_men0:
					majiang.MajiangUtils.playClick();//管理声音的
					Global.gameProxy.gameType = 0;
					Global.gameProxy.diWen = "mjxlch";
					this.contentGroup.visible = true;
					this.visibleTorF(1);
					this.choseGameType("mjxlch");
					break;
				//血战到底
				case this.img_dd_down:
				case this.img_dd_up:
				case this.img_men1:
					majiang.MajiangUtils.playClick();//管理声音的
					if (ServerConfig.OPEN_XZDD) {
						Global.gameProxy.gameType = 1;
						Global.gameProxy.diWen = "mjxzdd";
						this.visibleTorF(2);
						this.choseGameType("mjxzdd");
					}
					break;
				case this.gold_add:
					FrameUtils.goRecharge();
					break;

			}
		}

		/**
		 * 游戏类型选择，1，血流成河，2血战到底。
		 */
		private choseGameType(gameType) {
			this.contentGroup.removeChildren();
			let index = 0;
			var item: any;
			for (let i in Global.gameProxy.gameNums) {
				if (gameType == i) {
					let games = Global.gameProxy.gameNums[i];
					for (let j in games) {
						item = new MajiangSelectRenderer(games[j], gameType);
						this.contentGroup.addChild(item);
						item.x = item.width / 2 + index * (item.width + 20)
						index++;
						item.alpha = 0;
						egret.Tween.get(item).to({ alpha: 0 }, 100).to({ alpha: 1 }, 200);
					}
				}
			}
		}
		/**
		 * 隐藏or打开
		 */
		private visibleTorF(visibleType) {
			if (visibleType == 1) {
				this.img_ch_down.visible = true;
				this.img_dd_up.visible = true;
				this.img_ch_up.visible = false;
				this.img_dd_down.visible = false;
			} else {
				this.img_ch_down.visible = false;
				this.img_dd_up.visible = false;
				this.img_ch_up.visible = true;
				this.img_dd_down.visible = true;
			}
		}
	}
}