/*
 * @Author: Li MengChan 
 * @Date: 2018-06-28 10:10:59 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-07 10:23:58
 * @Description: 面向玩家手牌
 */
module niuniu {
	export class NiuniuCard extends eui.Component {
		public value: number;
		public color: number;
		public number: number;
		private beiImage: eui.Image;
		private zhengGroup: eui.Group;
		private valueLabel: eui.BitmapLabel;
		private bigColorImg: eui.Image;
		private smallColorImg: eui.Image;
		public constructor() {
			super();
			this.touchEnabled = false;
			this.touchChildren = false;
			if(!this.skinName){
				this.skinName = new NiuniuCardSkin1();
			}
		}

		public createChildren() {
			super.createChildren();
		}

		public initWithNum(num: number) {
			this.number = num;
			this.color = Math.floor(num / 100);
			this.value = Math.floor(num % 100);
			this.changeImage();
			this.showB2Z();
		}
		/**
		 * 牌面
		 */
		public changeImage() {
			this.valueLabel.text = PukerUtils.number2Puker(this.value);
			this.bigColorImg.source = RES.getRes(`nns_big_color_${this.color}_png`);
			this.smallColorImg.source = RES.getRes(`nn_small_color_${this.color}_png`);
			if (this.color == 1 || this.color == 3) {
				this.valueLabel.font = "nns_big_black_number_fnt";
			} else {
				this.valueLabel.font = "nns_big_red_number_fnt";
			}
		}

		/**
		 * 背面变正面。
		 */
		public showB2Z() {
			this.beiImage.visible = false;
			this.zhengGroup.visible = true;
		}

		/**
		 * 正面变背面。
		 */
		public showZ2B() {
			this.beiImage.visible = true;
			this.zhengGroup.visible = false;
		}

		public selectDown() {
			this.y = 0;
		}

		public selectUp() {
			this.y = - 20;
		}
	}
}