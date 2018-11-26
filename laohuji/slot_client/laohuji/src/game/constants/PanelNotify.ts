/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:24:27 
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-14 16:02:03
 * @Description: 面板弹出层的通知
 */
class PanelNotify {
    public constructor() {

    }

    //游戲結束
    public static OPEN_GAME_OVER: string = "OPEN_GAME_OVER";

    //關閉游戲結束
    public static CLOSE_GAME_OVER: string = "CLOSE_GAME_OVER";

    /**
     * 展现当前结果
     */
    public static SHOW_RESULT: string = "SHOW_RESULT";

    public static CLOSE_RESULT: string = "CLOSE_RESULT";


    public static OPEN_DESC: string = "OPEN_DESC";

    public static CLOSE_DESC: string = "CLOSE_DESC";

    public static OPEN_LOOK: string = "OPEN_LOOK";

    public static CLOSE_LOOK: string = "CLOSE_LOOK";
    public static OPEN_BONUS: string = "OPEN_BONUS";
    public static CLOSE_BONUS: string = "CLOSE_BONUS";
    public static OPEN_TIPS: string = "OPEN_TIPS";
    public static CLOSE_TIPS: string = "CLOSE_TIPS";
}



