/**
 * 牛牛分展示
 */
module niuniu {
	export class NiuniuFen extends game.BaseUI {
		private beishu: eui.Label;
		private niuFen: eui.Image;
		private data: any;
		public constructor(data) {
			super();
			this.data = parseInt(data);
			this.skinName = new NiuniuFenSkin();
		}

		public createChildren() {
			super.createChildren();

			if (this.data < 6 && this.data >= 1) {
				this.beishu.text = "(1倍)"
			} else if (this.data <= 9 && this.data >= 6) {
				this.beishu.text = "(2倍)"
			} else if (this.data >= 10) {
				this.beishu.text = "(3倍)"
			} else {
				this.beishu.text = "";
			}
			this.niuFen.source = RES.getRes("nn_" + this.data + "_png");
		}
	}
}