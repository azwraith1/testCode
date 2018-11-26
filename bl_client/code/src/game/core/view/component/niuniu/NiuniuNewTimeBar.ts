module niuniu {
	export class NiuniuNewTimeBar extends game.BaseUI implements IUpdate {
		private timeLabel: eui.Label;
		private angle: number = 0;
		private time: number = 0;
		private timeShape: egret.Shape;
		public constructor() {
			super();
			this.skinName = new NiuniuNewtimeDirectionBarSkin();
		}

		public createChildren() {
			super.createChildren();
			this.timeShape = new egret.Shape();
			this.timeShape.rotation = -90;
			this.addChild(this.timeShape);
			this.timeShape.x = -51.5;
			this.timeShape.y = 141.5;
			this.addChild(this.timeLabel);
		}

		private showShapByPo(angle) {
			let shape = this.timeShape;
			shape.graphics.clear();
			shape.graphics.beginFill(0x53a7ce);
			shape.graphics.moveTo(90, 90);
			shape.graphics.drawArc(90, 90, 32, 0, angle * Math.PI / 180, false);
			shape.graphics.lineTo(90, 90);
			shape.graphics.endFill();
		}

		private root: NiuniuScene;
		public startTime(root) {
			this.root = root;
			game.UpdateTickerManager.instance.add(this);
		}

		public update(dt: number) {
			if (Global.niuniuProxy.roomInfo && Global.niuniuProxy.roomInfo.countdown) {
				let endTime = Global.niuniuProxy.roomInfo.countdown.end;
				let startTime = game.DateTimeManager.instance.now;
				let start = Global.niuniuProxy.roomInfo.countdown.s;
				if (!start) {
					start = Global.niuniuProxy.roomInfo.countdown.end - Global.niuniuProxy.roomInfo.countdown.start;
				}
				let cha = endTime - startTime;
				let value = Math.floor(360 * cha / start);
				// * 360;
				if (value >= 0) {
					this.showShapByPo(value);
				}
				if (cha <= 0) {
					this.timeLabel.text = "00";
					return;
				}
				this.timeLabel.text = NumberFormat.getNNTimeStr(cha);
			}
		}

		public removeTimer() {
			game.UpdateTickerManager.instance.remove(this);
		}
	}
}