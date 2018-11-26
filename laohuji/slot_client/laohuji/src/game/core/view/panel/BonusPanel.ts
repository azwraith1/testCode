module game{
	export class BonusPanel extends BaseComponent{
		private close_btn:eui.Button;
		private bonus_Num: eui.BitmapLabel;
		public constructor(){
			super();
			this.skinName = new BonusPanelSkin();
		}
		protected ontouchTap(e:egret.TouchEvent){
			switch(e.target){
				case this.close_btn:
				AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BONUS);
				break;
			}
		}
	}
}