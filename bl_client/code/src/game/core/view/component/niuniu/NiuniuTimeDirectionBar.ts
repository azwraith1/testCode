/*
 * @Author: li mengchan 
 * @Date: 2018-10-18 14:41:07 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-12 17:41:20
 * @Description: 牛牛时间定时器
 */
module niuniu {
	export class NiuniuTimeDirectionBar extends game.BaseUI implements IUpdate {
		private timeLabel: eui.BitmapLabel;
		private timeShape: egret.Shape;
		private angle: number = 0;
		private time: number = 0;
		public constructor() {
			super();
			this.skinName = new NiuniutimeDirectionBarSkin();
		}

		public createChildren() {
			super.createChildren();
			this.timeShape = new egret.Shape();
			this.addChild(this.timeShape);
		}

		private showShapByPo(angle) {
			let shape = this.timeShape;
			shape.graphics.clear();
			shape.graphics.beginFill(0x53a7ce);
			shape.graphics.moveTo(300, 300);
			shape.graphics.drawArc(300, 300, 100, 0, angle * Math.PI / 180, false);
			shape.graphics.lineTo(300, 300);
			shape.graphics.endFill();

		}

		private showTim() {

		}

		private root: NiuniuScene;
		public startTime(root) {
			this.root = root;
			game.UpdateTickerManager.instance.add(this);
		}

		public update(dt: number) {
			if (Global.niuniuProxy.roomInfo && Global.niuniuProxy.roomInfo.countdown) {
				let endTime = Global.niuniuProxy.roomInfo.countdown.end;
				let playTime = Global.niuniuProxy.roomInfo.countdown.end;
				let startTime = game.DateTimeManager.instance.now;
				let cha = endTime - startTime;
				if (cha < 1) {
					this.timeLabel.text = "00";
					return;
				}
				this.timeLabel.text = NumberFormat.getTimeStr(cha);
			}
		}




		public removeTimer() {
			game.UpdateTickerManager.instance.remove(this);
		}
	}
}