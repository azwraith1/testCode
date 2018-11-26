class NumberFormat {
	public static formatGold(gold, id?) {
		if (id == 1) {
			return parseFloat(gold).toFixed(2);
		} else {
			gold = parseFloat(gold).toFixed(2);
			if (gold < 10000) {
				return gold;
			}
			let wan = Math.floor(gold / 10000);
			let qian = gold % 10000;
			let bai = Math.floor(qian / 100);
			let barStr = bai + ""
			if (bai < 10) {
				barStr = "0" + bai;
			}
			let str = wan + "." + barStr + "万";
			return str;
		}

	}

	public static formatGold_scence(gold, id?) {
		if (id == 1) {
			return parseFloat(gold).toFixed(2);
		} else {
			gold = parseFloat(gold).toFixed(2);
			if (gold < 1000000) {
				return gold;
			}
			let baiWan = Math.floor(gold / 10000);
			let shiWan = gold % 10000;
			let wan = Math.floor(shiWan / 100);
			let str = baiWan + "." + wan + "万";
			return str;
		}

	}

	public static getNNTimeStr(time) {
		let time1 = Math.ceil(time / 1000);
		if (time1 < 10) {
			if (time1 == 1) {
				return "0" + time1;
			}
			return "0" + time1;
		}
		if(time1 <= 0){
			return "00";
		}
	
		return time1 + "";
	}


	public static getTimeStr(time) {
		let time1 = Math.ceil(time / 1000);
		if (time1 < 10) {
			if (time1 == 1) {
				return "0 " + time1;
			}
			return "0" + time1;
		}
		if(time1 <= 0){
			return "00";
		}
	
		return time1 + "";
	}
}