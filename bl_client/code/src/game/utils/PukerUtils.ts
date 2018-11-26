/*
 * @Author: li mengchan 
 * @Date: 2018-10-18 15:26:45 
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-10-18 15:39:58
 * @Description: 扑克工具类
 */
class PukerUtils {
	
	/**
	 * 数字转扑克值
	 * @param  {} number
	 */
	public static number2Puker(number){
		if(number > 1 && number <= 10){
			return number;
		}else if(number == 11){
			return "J";
		}else if(number == 12){
			return "Q";
		}else if(number == 13){
			return "K";
		}else{
			return "A";
		}

	}
}