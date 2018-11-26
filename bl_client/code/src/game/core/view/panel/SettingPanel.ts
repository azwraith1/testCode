class SettingPanel extends game.BaseComponent {
	private closeBtn: eui.Button;
	private musicGroup: eui.Group;
	private soundGroup: eui.Group;
	private musicBtn: eui.ToggleSwitch;
	private soundBtn: eui.ToggleSwitch;
	public resizeGroup: eui.Group;
	public constructor() {
		super();
		if ( GameConfig.CURRENT_ISSHU && SettingShuSkin) {
			this.skinName = new SettingShuSkin();
			return;
		}
		this.skinName = new SettingSkin();
	}

	protected createChildren() {
		super.createChildren();
		this.musicBtn.selected = game.AudioManager.getInstance().isPlayMusic;
		this.soundBtn.selected = game.AudioManager.getInstance().isPlaySound;
	}
	private rects: eui.Rect;
	public onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.closeBtn:
			case this.rects:
				this.rects.visible = false;
				game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_SETTING);
				break;
			case this.musicBtn://音乐开关
				game.AudioManager.getInstance().isPlayMusic = this.musicBtn.selected;
				break;
			case this.soundBtn://声音开关
				game.AudioManager.getInstance().isPlaySound = this.soundBtn.selected;
				break;
		}
	}

	public onAdded() {
		super.onAdded();
	}
}
