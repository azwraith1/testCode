class NiuniuUtils {
	public constructor() {
	}

	public static getNumberSum(numbers: number[]) {
		let sum = 0;
		for (let i = 0; i < numbers.length; i++) {
			let num = numbers[i] % 100;
			if (num > 10) {
				num = 10;
			}
			sum += num;
		}
		return sum;
	}


	/**
	 * 根据自己的位子获取方位
	 * @param  {number} mineIndex
	 */
	public static getDirectionByMine(mineIndex: number, playerLength: number) {
		let directionTrue: any = {};
		let dirArr = [];
		for(let i = mineIndex; i<= playerLength; i++){
			dirArr.push(i);
		}

		for(let i = 1; i< mineIndex; i++){
			dirArr.push(i);
		}

		for (let i = 0; i < dirArr.length; i++) {
			let data = dirArr[i];
			directionTrue[data] = (i + 1) + "";
		}
		return directionTrue;
	}

	public static getNNSort(dealer: number, playerLength){
		let dirArr = [];
		for(let i = dealer + 1; i<= playerLength; i++){
			dirArr.push(i);
		}

		for(let i = 1; i< dealer; i++){
			dirArr.push(i);
		}

		dirArr.push(dealer);
		return dirArr;
	}
}