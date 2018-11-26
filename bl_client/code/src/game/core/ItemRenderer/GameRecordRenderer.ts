module majiang {
	export class GameRecordRenderer extends game.BaseUI {
		private values;
		private i;
		private xuhao: eui.Label;
		private paijunumber: eui.Label;
		private room: eui.Label;
		private winOrLose: eui.Label;
		private gametimes: eui.Label;
		public constructor(data, i) {
			super();
			this.values = data;
			this.i = i;
			this.skinName = new GameRecordRendererSkin();
		}


		protected createChildren(): void {
			super.createChildren();
			let num = this.values;
			this.xuhao.text = this.i + 1;
			this.paijunumber.text = num["roomId"];
			this.room.text = this.choseField(num["sceneId"]);
			if (num["gainGold"] >= 0) {
				this.winOrLose.text = "+" + num["gainGold"];
				this.winOrLose.textColor = 0xf43c3c
			} else {
				this.winOrLose.text = num["gainGold"];
				this.winOrLose.textColor = 0x29ab17
			}
			this.gametimes.text = this.fmtDate(num["gameTime"]);


		}


		private choseField(value) {
			switch (value) {
				case 1001:
				
					return "平民场";
				case 1002:
					return "小资场";
				case 1003:
					return "白领场";
				case 1004:
					return "富豪场";
			}
		}

		private fmtDate(obj) {
			var date = new Date(obj * 1000);
			var y = date.getFullYear();
			var m = "0" + (date.getMonth() + 1);
			var d = "0" + date.getDate();
			var h = "0" + date.getHours();
			var mins = "0" + date.getMinutes();
			var sc = "0" + date.getSeconds();
			return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
		}
	}
}