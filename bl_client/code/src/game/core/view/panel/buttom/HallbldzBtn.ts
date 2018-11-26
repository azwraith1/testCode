/*
 * @Author: he bing 
 * @Date: 2018-10-09 11:24:20 
 * @Last Modified by:   he bing 
 * @Last Modified time: 2018-10-09 11:24:20 
 * @Description: 
 */

module majiang {
	export class HallbldzBtn extends game.BaseComponent {
		public peoples_dz: eui.Label;
		public dz: eui.Image;
		public dzLable: eui.Label;
		public constructor() {
			super();
			this.skinName = new HallbldzSkin();
		}

		public createChildren() {
			super.createChildren();
			// Global.gameProxy.people();
			// this.peoples_dz.text = "0"// Global.gameProxy.peoplesCounts["bldz"];

		}

	}
}