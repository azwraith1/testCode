/*
 * @Author: he bing 
 * @Date: 2018-07-31 15:05:10 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-09 15:22:43
 * @Description: 
 */
class HelpPanel extends game.BaseComponent {
	private closebtn: eui.Button;
	private texts: eui.Label;
	public resizeGroup: eui.Group;
	private jbgz: eui.Image;
	private jbgz_1: eui.Image;
	private pxjs: eui.Image;
	private pxjs_1: eui.Image;
	private tsgz: eui.Image;
	private tsgz_1: eui.Image;
	private textGroup: eui.Group;
	//左侧按钮组
	private xl_up: eui.Image;
	private xl_upw: eui.Image;
	private xl_down: eui.Image;
	private xl_downw: eui.Label;
	private xz_up: eui.Image;
	private xz_upw: eui.Image;
	private xz_down: eui.Image;
	private xz_downw: eui.Label;
	public constructor() {
		super();
		this.skinName = new HelpSkin();
	}

	protected createChildren() {
		super.createChildren();
		this.texts.size = 18;
		this.showOrFalse(1);
		this.leftBtnChose(1);
		this.textNums();
	}
	//记录选择的游戏帮助的按钮
	private btnTimer: number = 0;
	public onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.xl_up:
			case this.xl_upw:
			case this.xl_down:
			case this.xl_downw:
				majiang.MajiangUtils.playClick();//管理声音的
				this.textGroup.removeChildren();
				this.help_scroller.viewport.scrollV = 0;
				this.leftBtnChose(1);
				this.showOrFalse(1);
				this.texts.height = 480;
				this.texts.text = this.textLable(1);
				this.btnTimer = 0;
				this.textGroup.addChild(this.texts);
				break;

			case this.xz_up:
			case this.xz_upw:
			case this.xz_down:
			case this.xz_downw:
				majiang.MajiangUtils.playClick();//管理声音的
				this.textGroup.removeChildren();
				this.help_scroller.viewport.scrollV = 0;
				this.leftBtnChose(2);
				this.showOrFalse(1);
				this.texts.height = 480;
				this.texts.text = this.textLable(4);
				this.btnTimer = 1;
				this.textGroup.addChild(this.texts);
				break;
			case this.jbgz_1:
			case this.jbgz:
				majiang.MajiangUtils.playClick();//管理声音的
				this.showOrFalse(1);
				this.textGroup.removeChildren();
				this.help_scroller.viewport.scrollV = 0;
				this.texts.height = 480;
				if (this.btnTimer == 0) {
					this.texts.text = this.textLable(1);
				} else {
					this.texts.text = this.textLable(4);
				}
				this.textGroup.addChild(this.texts);
				break;
			case this.pxjs_1:
			case this.pxjs:
				majiang.MajiangUtils.playClick();//管理声音的
				this.showOrFalse(2);
				this.textGroup.removeChildren();
				this.help_scroller.viewport.scrollV = 0;
				this.texts.height = 520;
				this.texts.text = this.textLable(2);
				this.textGroup.addChild(this.texts);
				break;
			case this.tsgz_1:
			case this.tsgz:
				majiang.MajiangUtils.playClick();//管理声音的
				this.showOrFalse(3);
				this.textGroup.removeChildren();
				this.help_scroller.viewport.scrollV = 0;
				this.texts.text = this.textLable(3);
				var name = "photo";
				let image1 = new eui.Image();
				let image2 = new eui.Image();
				image1.source = "photo_2_png";
				image2.source = "photo_1_png";
				this.textGroup.addChild(this.texts);
				this.textGroup.addChild(image1);
				this.textGroup.addChild(image2);
				this.texts.height = 80;
				image1.width = image2.width = 473;
				image1.height = image2.height = 265;
				image1.x = image2.x = this.texts.x;
				image1.y = this.texts.height + 20;
				image2.y = this.texts.height + 20 + image1.height + 20;
				break;
			case this.closebtn:
			case this.rects:
				this.rects.visible = false;
				game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_HELP);
				break;
		}
	}
	private rects: eui.Rect;
	private help_scroller: eui.Scroller;
	public textNums() {
		this.texts.text = this.textLable(1);
	}

	/**
	 * 是否显示或者隐藏文字类容
	 */
	public showOrFalse(number) {
		switch (number) {
			case 1:
				this.jbgz.visible = true;
				this.jbgz_1.visible = false;
				this.pxjs_1.visible = true;
				this.tsgz_1.visible = true;
				break;
			case 2:
				this.pxjs.visible = true;
				this.pxjs_1.visible = false;
				this.jbgz_1.visible = true;
				this.tsgz_1.visible = true;
				break;
			case 3:
				this.tsgz.visible = true;
				this.tsgz_1.visible = false;
				this.jbgz_1.visible = true;
				this.pxjs_1.visible = true;
				break;
		}
	}

	/**
	 * 左边按钮组互斥
	 */
	private leftBtnChose(num) {
		if (num == 1) {
			this.xl_up.visible = true;
			this.xl_upw.visible = true;
			this.xz_down.visible = true;
			this.xz_downw.visible = true;
			this.xl_down.visible = false;
			this.xl_downw.visible = false;
			this.xz_up.visible = false;
			this.xz_upw.visible = false;
		} else {
			this.xl_down.visible = true;
			this.xl_downw.visible = true;
			this.xz_up.visible = true;
			this.xz_upw.visible = true;
			this.xl_up.visible = false;
			this.xl_upw.visible = false;
			this.xz_down.visible = false;
			this.xz_downw.visible = false;
		}
	}

	private textLable(textLables) {
		switch (textLables) {
			case 1:
				return "血流成河为四川特色麻将玩法，因其上手简单、过程刺激的特点深受玩家喜爱。血流成河玩法允许每个玩家在一局中多次胡牌" + "\n"
					+ "【用牌】：" + "\n"
					+ "使用筒、条、万三种花色各36张牌，总计108张牌" + "\n"
					+ "【流程】：" + "\n"
					+ "每个玩家开局庄家14张手牌，其余玩家13张手牌；从庄家开始逆时针摸打，只能碰、杠，不能吃牌；牌墙所有牌摸完或玩家破产至只剩一人时牌局结束" + "\n"
					+ "【定缺】：" + "\n"
					+ "从三个花色中选出一个花色作为定缺，牌局结束前必须打完定缺花色，否则花猪" + "\n"
					+ "【刮风】：" + "\n"
					+ "再次摸到自己碰的牌后杠牌称为刮风" + "\n"
					+ "【下雨】：" + "\n"
					+ "暗杠在四川麻将中称为下雨" + "\n"
					+ "【呼叫转移】：" + "\n"
					+ "杠牌后第一张打出的牌被胡，会将杠牌赢得的钱转移给相应玩家" + "\n"
					+ "【海底捞】：" + "\n"
					+ "牌墙中最后一张牌自摸称为海底捞" + "\n"
					+ "【过手胡】：" + "\n"
					+ "可以胡的牌自己选择过，在自己再次摸牌前不能胡这张牌" + "\n"
					+ "【必胡】：" + "\n"
					+ "牌墙剩余牌≤4时，必须胡牌";
			case 2:
				return "每次杠牌、胡牌、花猪、查叫都会实时计算分数，计算规则如下：" + "\n"
					+ "胡牌得分=底分*牌型倍数*加番倍数" + "\n"
					+ "刮风得分=底分（从本桌游戏中玩家收取）" + "\n"
					+ "下雨得分=底分*2（从本桌游戏中玩家收取）" + "\n"
					+ "花猪扣分=底分*32（赔给本桌所有游戏中玩家）" + "\n"
					+ "查叫扣分=底分*听牌未胡牌的玩家最大牌型分数" + "\n"
					+ "\n"
					+ "牌型倍数" + "\n"
					+ "【平胡】：1倍，手牌为面子和将牌组成的基本牌型" + "\n"
					+ "【对对胡】：2倍，手牌为对子+碰、杠组成的牌型" + "\n"
					+ "【七对】：4倍，手牌为不同花色的七组对子" + "\n"
					+ "【清一色】：4倍，手牌为一种花色组成的牌型" + "\n"
					+ "【清对】：8倍，手牌为一种花色的对子+碰、杠" + "\n"
					+ "【清七对】：16倍，手牌为一种花色的七组对子" + "\n"
					+ "【龙七对】：16倍，手牌为六对子+一杠" + "\n"
					+ "【清龙七对】：32倍，手牌为一种花色的六对子+一杠" + "\n"
					+ "\n"
					+ "加番类型" + "\n"
					+ "【根】：2倍，手牌中每有一杠算一根" + "\n"
					+ "【自摸】：2倍，自己摸牌胡牌" + "\n"
					+ "【杠上开花】：2倍，杠牌后摸得第一张牌胡牌" + "\n"
					+ "【海底捞】：4倍，牌墙最后一张牌自摸" + "\n"
					+ "【杠上炮】：2倍，别人杠牌后第一张打出的牌作为胡牌" + "\n"
					+ "\n"
					+ "【抽水比例】:5%";
			case 3:
				return "【换三张】" + "\n"
					+ "每局开始定缺前，选择三张同花色的手牌作为换三张的牌和同桌玩家进行交换" + "\n"
					+ "交换的方式有：顺时针换牌、逆时针换牌、对家换";
			case 4:
				return "血战到底为四川特色麻将玩法，因其上手简单、过程刺激的特点深受玩家喜爱" + "\n"
					+ "【用牌】：" + "\n"
					+ "使用筒、条、万三种花色各36张牌，总计108张牌" + "\n"
					+ "【流程】：" + "\n"
					+ "每个玩家开局庄家14张手牌，其余玩家13张手牌；从庄家开始逆时针摸打，只能碰、杠，不能吃牌；牌墙所有牌摸完或玩家胡牌剩至一人" + "\n"
					+ "【定缺】：" + "\n"
					+ "从三个花色中选出一个花色作为定缺，牌局结束前必须打完定缺花色，否则花猪" + "\n"
					+ "【刮风】：" + "\n"
					+ "再次摸到自己碰的牌后杠牌称为刮风" + "\n"
					+ "【下雨】：" + "\n"
					+ "暗杠在四川麻将中称为下雨" + "\n"
					+ "【呼叫转移】：" + "\n"
					+ "杠牌后第一张打出的牌被胡，会将杠牌赢得的钱转移给相应玩家" + "\n"
					+ "【海底捞】：" + "\n"
					+ "牌墙中最后一张牌自摸称为海底捞" + "\n"
					+ "【过手胡】：" + "\n"
					+ "可以胡的牌自己选择过，在自己再次摸牌前不能胡这张牌" + "\n"
					+ "【必胡】：" + "\n"
					+ "牌墙剩余牌≤4时，必须胡牌";
		}

	}

	public onAdded() {
		super.onAdded();
	}
}