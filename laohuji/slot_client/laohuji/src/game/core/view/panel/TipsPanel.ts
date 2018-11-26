module game {
	export class TipsPanel extends eui.Component implements eui.UIComponent {
		private tip_1: eui.Image;
		private tip_2: eui.Image;
		private tip_3: eui.Image;
		private close_btn_1: eui.Button;
		private close_btn_2: eui.Button;
		private close_btn_3: eui.Button;
		private tip_group: eui.Group;

		private shp_1: egret.Shape;
		private shp_2: egret.Shape;
		private shp_3: egret.Shape;
		private beginX: number;
		private endX: number;
		public constructor() {
			super();
			this.skinName = new TipsPanelSkin();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			this.shp_1 = new egret.Shape();
			this.shp_1.x = 600;
			this.shp_1.y = 680;
			this.shp_1.graphics.lineStyle(10, 0xdd7016);
			this.shp_1.graphics.beginFill(0xdd7016, 1);
			this.shp_1.graphics.drawCircle(0, 0, 10);
			this.shp_1.graphics.endFill();
			this.addChild(this.shp_1);

			this.shp_2 = new egret.Shape();
			this.shp_2.x = 640;
			this.shp_2.y = 680;
			this.shp_2.graphics.lineStyle(10, 0xffffff);
			this.shp_2.graphics.beginFill(0xffffff, 1);
			this.shp_2.graphics.drawCircle(0, 0, 10);
			this.shp_2.graphics.endFill();
			this.addChild(this.shp_2);

			this.shp_3 = new egret.Shape();
			this.shp_3.x = 680;
			this.shp_3.y = 680;
			this.shp_3.graphics.lineStyle(10, 0xffffff);
			this.shp_3.graphics.beginFill(0xffffff, 1);
			this.shp_3.graphics.drawCircle(0, 0, 10);
			this.shp_3.graphics.endFill();
			this.addChild(this.shp_3);
			this.tip_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.tip_group.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.tip_group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
			this.close_btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			this.close_btn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			this.close_btn_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		}

		protected touchBegin(e: egret.TouchEvent) {
			this.beginX = e.stageX;
		}

		protected touchMove(e: egret.TouchEvent) {
			// this.stage.x += this.beginX - this.endX;

		}

		protected touchEnd(e: egret.TouchEvent) {
			this.endX = e.stageX;
			if (this.beginX - this.endX > 0 && this.tip_group.x > -2560) {
				egret.Tween.get(this.tip_group).to({ x: this.tip_group.x - 1280 }, 500, egret.Ease.sineIn).call(() => {
					switch (this.tip_group.x) {
						case 0:
						this.removeChild(this.shp_1);
							this.shp_1 = new egret.Shape();
							this.shp_1.x = 600;
							this.shp_1.y = 680;
							this.shp_1.graphics.lineStyle(10, 0xdd7016);
							this.shp_1.graphics.beginFill(0xdd7016, 1);
							this.shp_1.graphics.drawCircle(0, 0, 10);
							this.shp_1.graphics.endFill();
							this.addChild(this.shp_1);
							this.removeChild(this.shp_2);
							this.shp_2 = new egret.Shape();
							this.shp_2.x = 640;
							this.shp_2.y = 680;
							this.shp_2.graphics.lineStyle(10, 0xffffff);
							this.shp_2.graphics.beginFill(0xffffff, 1);
							this.shp_2.graphics.drawCircle(0, 0, 10);
							this.shp_2.graphics.endFill();
							this.addChild(this.shp_2);
							this.removeChild(this.shp_3);
							this.shp_3 = new egret.Shape();
							this.shp_3.x = 680;
							this.shp_3.y = 680;
							this.shp_3.graphics.lineStyle(10, 0xffffff);
							this.shp_3.graphics.beginFill(0xffffff, 1);
							this.shp_3.graphics.drawCircle(0, 0, 10);
							this.shp_3.graphics.endFill();
							this.addChild(this.shp_3);
							break;
						case -1280:
						this.removeChild(this.shp_1);
							this.shp_1 = new egret.Shape();
							this.shp_1.x = 600;
							this.shp_1.y = 680;
							this.shp_1.graphics.lineStyle(10, 0xffffff);
							this.shp_1.graphics.beginFill(0xffffff, 1);
							this.shp_1.graphics.drawCircle(0, 0, 10);
							this.shp_1.graphics.endFill();
							this.addChild(this.shp_1);
							this.removeChild(this.shp_2);
							this.shp_2 = new egret.Shape();
							this.shp_2.x = 640;
							this.shp_2.y = 680;
							this.shp_2.graphics.lineStyle(10, 0xdd7016);
							this.shp_2.graphics.beginFill(0xdd7016, 1);
							this.shp_2.graphics.drawCircle(0, 0, 10);
							this.shp_2.graphics.endFill();
							this.addChild(this.shp_2);
							this.removeChild(this.shp_3);
							this.shp_3 = new egret.Shape();
							this.shp_3.x = 680;
							this.shp_3.y = 680;
							this.shp_3.graphics.lineStyle(10, 0xffffff);
							this.shp_3.graphics.beginFill(0xffffff, 1);
							this.shp_3.graphics.drawCircle(0, 0, 10);
							this.shp_3.graphics.endFill();
							this.addChild(this.shp_3);
							break;
						case -2560:
							this.removeChild(this.shp_1);
							this.shp_1 = new egret.Shape();
							this.shp_1.x = 600;
							this.shp_1.y = 680;
							this.shp_1.graphics.lineStyle(10, 0xffffff);
							this.shp_1.graphics.beginFill(0xffffff, 1);
							this.shp_1.graphics.drawCircle(0, 0, 10);
							this.shp_1.graphics.endFill();
							this.addChild(this.shp_1);
							this.removeChild(this.shp_2);
							this.shp_2 = new egret.Shape();
							this.shp_2.x = 640;
							this.shp_2.y = 680;
							this.shp_2.graphics.lineStyle(10, 0xffffff);
							this.shp_2.graphics.beginFill(0xffffff, 1);
							this.shp_2.graphics.drawCircle(0, 0, 10);
							this.shp_2.graphics.endFill();
							this.addChild(this.shp_2);
							this.removeChild(this.shp_3);
							this.shp_3 = new egret.Shape();
							this.shp_3.x = 680;
							this.shp_3.y = 680;
							this.shp_3.graphics.lineStyle(10, 0xdd7016);
							this.shp_3.graphics.beginFill(0xdd7016, 1);
							this.shp_3.graphics.drawCircle(0, 0, 10);
							this.shp_3.graphics.endFill();
							this.addChild(this.shp_3);
							break;

					}
				});
			} else if (this.beginX - this.endX < 0 && this.tip_group.x < -1) {
				egret.Tween.get(this.tip_group).to({ x: this.tip_group.x + 1280 }, 500, egret.Ease.sineIn).call(() => {
					switch (this.tip_group.x) {
						case 0:
							this.removeChild(this.shp_1);
							this.shp_1 = new egret.Shape();
							this.shp_1.x = 600;
							this.shp_1.y = 680;
							this.shp_1.graphics.lineStyle(10, 0xdd7016);
							this.shp_1.graphics.beginFill(0xdd7016, 1);
							this.shp_1.graphics.drawCircle(0, 0, 10);
							this.shp_1.graphics.endFill();
							this.addChild(this.shp_1);
							this.removeChild(this.shp_2);
							this.shp_2 = new egret.Shape();
							this.shp_2.x = 640;
							this.shp_2.y = 680;
							this.shp_2.graphics.lineStyle(10, 0xffffff);
							this.shp_2.graphics.beginFill(0xffffff, 1);
							this.shp_2.graphics.drawCircle(0, 0, 10);
							this.shp_2.graphics.endFill();
							this.addChild(this.shp_2);
							this.removeChild(this.shp_3);
							this.shp_3 = new egret.Shape();
							this.shp_3.x = 680;
							this.shp_3.y = 680;
							this.shp_3.graphics.lineStyle(10, 0xffffff);
							this.shp_3.graphics.beginFill(0xffffff, 1);
							this.shp_3.graphics.drawCircle(0, 0, 10);
							this.shp_3.graphics.endFill();
							this.addChild(this.shp_3);
							break;
						case -1280:
							this.removeChild(this.shp_1);
							this.shp_1 = new egret.Shape();
							this.shp_1.x = 600;
							this.shp_1.y = 680;
							this.shp_1.graphics.lineStyle(10, 0xffffff);
							this.shp_1.graphics.beginFill(0xffffff, 1);
							this.shp_1.graphics.drawCircle(0, 0, 10);
							this.shp_1.graphics.endFill();
							this.addChild(this.shp_1);
							this.removeChild(this.shp_2);
							this.shp_2 = new egret.Shape();
							this.shp_2.x = 640;
							this.shp_2.y = 680;
							this.shp_2.graphics.lineStyle(10, 0xdd7016);
							this.shp_2.graphics.beginFill(0xdd7016, 1);
							this.shp_2.graphics.drawCircle(0, 0, 10);
							this.shp_2.graphics.endFill();
							this.addChild(this.shp_2);
							this.removeChild(this.shp_3);
							this.shp_3 = new egret.Shape();
							this.shp_3.x = 680;
							this.shp_3.y = 680;
							this.shp_3.graphics.lineStyle(10, 0xffffff);
							this.shp_3.graphics.beginFill(0xffffff, 1);
							this.shp_3.graphics.drawCircle(0, 0, 10);
							this.shp_3.graphics.endFill();
							this.addChild(this.shp_3);
							break;
						case -2560:
							this.removeChild(this.shp_1);
							this.shp_1 = new egret.Shape();
							this.shp_1.x = 600;
							this.shp_1.y = 680;
							this.shp_1.graphics.lineStyle(10, 0xffffff);
							this.shp_1.graphics.beginFill(0xffffff, 1);
							this.shp_1.graphics.drawCircle(0, 0, 10);
							this.shp_1.graphics.endFill();
							this.addChild(this.shp_1);
							this.removeChild(this.shp_2);
							this.shp_2 = new egret.Shape();
							this.shp_2.x = 640;
							this.shp_2.y = 680;
							this.shp_2.graphics.lineStyle(10, 0xffffff);
							this.shp_2.graphics.beginFill(0xffffff, 1);
							this.shp_2.graphics.drawCircle(0, 0, 10);
							this.shp_2.graphics.endFill();
							this.addChild(this.shp_2);
							this.removeChild(this.shp_3);
							this.shp_3 = new egret.Shape();
							this.shp_3.x = 680;
							this.shp_3.y = 680;
							this.shp_3.graphics.lineStyle(10, 0xdd7016);
							this.shp_3.graphics.beginFill(0xdd7016, 1);
							this.shp_3.graphics.drawCircle(0, 0, 10);
							this.shp_3.graphics.endFill();
							this.addChild(this.shp_3);
							break;
					}
				});
			}
		}

		protected closePanel() {
			this.tip_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.tip_group.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.tip_group.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
			this.close_btn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			this.close_btn_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			this.close_btn_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
			game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_TIPS);
		}

	}
}