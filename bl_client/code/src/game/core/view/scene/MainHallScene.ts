class MainHallScene extends game.BaseComponent {
	//适配group
	public resizeGroup: eui.Group;
	//放大缩小按钮
	private mj_btn_fdsx: eui.Button;
	//记录牌局
	private btn_jilu: eui.Button;
	//玩家头像
	private hall_playerImage: eui.Image;
	//四川麻将
	private sc_mj: eui.Image;
	//大众麻将
	private public_mj: eui.Image;
	//大众麻将里面的麻将图片
	private public_mj1: eui.Image;
	//更多游戏
	private moreGame_mj: eui.Image;
	//锦标赛
	private championships_mj: eui.Image;
	//玩家名字
	private hall_playerName: eui.Label;
	//玩家金币
	private goldLabel: eui.BitmapLabel;
	//游戏规则
	private btn_wenhao: eui.Button;
	//游戏设置
	private btn_shezi: eui.Button;
	//热门图标
	private game_hot: eui.Image;
	//四川麻将在线人数
	private peoples_mj: eui.Label;
	//牛牛在线人数
	private peoples_nn: eui.Label;
	//德州在线人数
	private peoples_dz: eui.Label;
	//捕鱼在线人数
	private peoples_by: eui.Label;
	//老虎机在线人数
	private peoples_lhj: eui.Label;
	//游戏组
	private gameGroup: eui.Group;
	//四川麻将组
	private scButton: majiang.HallscmjBtn;
	//牛牛组
	private nnButton: majiang.HallblnnBtn;
	//德州
	private dzButton: majiang.HallbldzBtn;
	//捕鱼
	private byButton: majiang.HallblbyBtn;
	//老虎机
	private lhjButton: majiang.HallbllhjBtn;
	//排行榜
	private btn_paihang: eui.Button;
	// //骰子一号
	// private sezhi_one: eui.Image;
	// //骰子二号
	// private sezhi_two: eui.Image;
	// //火锅图标
	// private huoguo: eui.Image;
	private gold_add: eui.Button;
	public constructor() {
		super();
		this.skinName = new MajiangHallSceneceSkin();
		// if (egret.Capabilities.os == "iOS") {
		// 	this.mj_btn_fdsx.visible = false;
		// }
	}

	/**
	 * 书写逻辑代码
	 */
	public createChildren() {
		super.createChildren();
		let colorLabel = new egret.TextField();
		//this.game_hot.visible = false;
		game.AudioManager.getInstance().playHomeMusic("home_bg_mp3");
		//给玩家的数据赋值
		this.hall_playerName.text = Global.playerProxy.playerData.nickname;
		this.hall_playerImage.source = "header_icon_" + Global.playerProxy.playerData.figure_url + "_png";
		this.updateGold();
		/**
		 * 移入移出动画
		 */
		// this.gameGroup.horizontalCenter = 1280;
		this.gameGroup.alpha = 0;
		egret.Tween.get(this.gameGroup).to({ alpha: 1 }, 400);

		Global.gameProxy.people();
		//this.showPlayerCount();
		if (ServerConfig.PATH_TYPE == PathTypeEnum.NEI_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.WAI_TEST) {
			this.nnButton.nn_Group.visible = true;
		} else {
			this.nnButton.nn.visible = true;
			this.nnButton.jqqd.visible = true;
		}
		RES.loadGroup("majiang");
		RES.loadGroup("niuniu_s");
	}

	private num: number;
	public test() {
		this.num = 1;

	}

	private onChange(): void {
		this.goldLabel.text = Math.round(this.num).toString();
	}

	public onAdded() {
		super.onAdded();
		EventManager.instance.addEvent(EventNotify.UPDATE_PLAYER_COUNT, this.showPlayerCount, this);

	}

	public onRemoved() {
		super.onRemoved();
		EventManager.instance.removeEvent(EventNotify.UPDATE_PLAYER_COUNT, this.showPlayerCount, this);
	}

	/**
	 * 初始化按钮组,已经加在了skin里面，这里就不用加了
	 */
	// private initializationBtns() {
	// 	this.scButton = new HallscmjBtn();
	// 	this.nnButton = new HallblnnBtn();
	// 	this.byButton = new HallblbyBtn();
	// 	this.dzButton = new HallbldzBtn();
	// 	this.lhjButton = new HallbllhjBtn();
	// }


	private times = 0;//点击次数。
	private msgs;//保存数据。
	public onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.mj_btn_fdsx://放大缩小	
				game.UIUtils.windowFullscreen();
				break;
			case this.btn_wenhao:
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP)
				break;
			case this.btn_jilu:
				//	game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_JIESUAN);
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAMERECORD, null);
				break;
			case this.btn_shezi:
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING)
				break;
			case this.scButton:
				LoadingScene.instance.load("majiang", "majiang_bg_jpg", () => {
					game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_MAIN_HALL)
					game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_HOME)
				});
				break;
			case this.btn_shezi:
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING)
				break;
			case this.nnButton:
				if (ServerConfig.PATH_TYPE == PathTypeEnum.NEI_TEST) {
					LoadingScene.instance.load("niuniu", "majiang_bg_jpg", () => {
						game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_MAIN_HALL);
						game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUSELECT);
					});
				} else {
					this.sendMsg(e.target);
				}
				break;
			case this.dzButton:
				game.AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_MAIN_HALL);
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUGAMES);
				break;
			case this.byButton:
			case this.lhjButton:
			case this.btn_paihang:
				game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_NIUNIUGAMES);
				// Global.alertMediator.addAlert("TEST", ()=>{
				// 	FrameUtils.flushWindow();
				// }, null, true);
				TipsCompoment.instance.show("暂未开放，敬请期待")
				// Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
				break;
			case this.gold_add:
				FrameUtils.goRecharge();
				break;
		}
	}
	private sendMsg(obj) {
		egret.Tween.get(obj).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(() => {
			Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
		});
	}

	/**
	 * 更新玩家信息
	 */
	private showPlayerCount() {
		this.scButton.peoples_mj.text = Global.gameProxy.peoplesCounts["scmj"];
		this.nnButton.peoples_nn.text = Global.gameProxy.peoplesCounts["blnn"];
		// this.nnButton.peoples_nn.text = "0";
		// this.dzButton.peoples_dz.text = "0";
		// this.lhjButton.peoples_lhj.text = "0";
	}
}