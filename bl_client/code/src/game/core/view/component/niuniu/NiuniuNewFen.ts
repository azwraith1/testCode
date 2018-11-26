module niuniu {
	export class NiuniuNewFen extends game.BaseUI {
		private beishu: eui.Label;
		private niuFen: eui.Image;
		private niuFen_text: eui.BitmapLabel;
		private data: any;
		public wancheng: eui.Label;
		public constructor(data) {
			super();
			this.data = parseInt(data);
			this.skinName = new NiuniuNewFenSkin();
		}

		public createChildren() {
			super.createChildren();
			this.showFen(this.data);

		}


		private visibles(nums) {
			this.niuFen.visible = this.niuFen_text.visible = this.beishu.visible = nums == 1 ? true : false;
			this.wancheng.visible = nums == 1 ? false : true;
		}

		private showFen(data) {
			switch (data) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					this.niuFen_text.x = 65;
					this.niuFen_text.font = "nns_12345_fnt";
					this.niuFen_text.text = this.showFenshu(data);
					this.beishu.text = "(1倍)"
					return;
				case 6:
				case 7:
				case 8:
				case 9:
					this.niuFen_text.x = 65;
					this.niuFen_text.font = "nns_6789_fnt";
					this.niuFen_text.text = this.showFenshu(data);
					this.beishu.text = "(2倍)"
					return;
				case 10:
					this.niuFen_text.x = 65;
					this.niuFen_text.font = "nns_nn45h_fnt";
					this.niuFen_text.text = this.showFenshu(data);
					this.beishu.text = "(3倍)"
					return;
				case 11:
				case 12:
					this.niuFen_text.x = 35;
					this.niuFen_text.font = "nns_nn45h_fnt";
					this.niuFen_text.text = this.showFenshu(data);
					this.beishu.text = "(4倍)"
					return;
				case 13:
					this.niuFen.x = 70;
					this.niuFen.source = RES.getRes("nns_pt13_png")
					this.beishu.text = "(5倍)"
					return;
				case 14:
					this.niuFen.x = 40;
					this.niuFen.source = RES.getRes("nns_pt14_png")
					this.beishu.text = "(6倍)"
					return;
				case 0:
					this.niuFen.source = RES.getRes("nns_pt0_png")
					this.niuFen.x = 70;
					this.niuFen.y = 4;
					this.beishu.text = "";
					return;
			}
		}

		private showFenshu(data) {
			switch (data) {
				case 1:
					return "牛一";
				case 2:
					return "牛二";
				case 3:
					return "牛三";
				case 4:
					return "牛四";
				case 5:
					return "牛五";
				case 6:
					return "牛六";
				case 7:
					return "牛七";
				case 8:
					return "牛八";
				case 9:
					return "牛九";
				case 10:
					return "牛牛";
				case 11:
					return "四花牛";
				case 12:
					return "五花牛";

			}
		}

	}
}