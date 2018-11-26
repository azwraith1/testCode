/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:24:11 
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-06-29 16:51:03
 * @Description: 游戏内事件通知定义
 */
module game {
	export class EventNotify {
		//浏览器窗口大小改变
		public static EVENT_RESIZE: string = "EVENT_RESIZE";

		public static EVENT_USER_LOGIN_SUC: string = "EVENT_USER_LOGIN_SUC";

		public static READY: string = "SysNotify_READY";
		//游戏开始
		public static START_GAME: string = "SysNotify_START_GAME";
		//发送表情
		public static SEND_EMOJI: string = "SysNotify_SEND_EMOJI";
		//玩家落子
		public static PLAYER_LUOZI: string = "SysNotify_PLAYER_LUOZI";
		//求和
		public static QIU_HE: string = "SysNotify_ANSWER_QIUHE";
		//游戏结束
		public static GAME_OVER: string = "EventNotify_GAME_OVER";
		//游戏结束
		public static RESTART_GAME: string = "EventNotify_RESTART_GAME";






	}
}