var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:47
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-06-25 17:04:13
 * @Description: 场景的消息通知
 */
var SceneNotify = (function () {
    function SceneNotify() {
    }
    //打开加载
    SceneNotify.OPEN_LOADING = "SceneNotify_OPEN_LOADING";
    //关闭加载
    SceneNotify.CLOSE_LOADING = "SceneNotify_CLOSE_LOADING";
    //打开主城场景
    SceneNotify.OPEN_HOME = "SceneNotify_OPEN_HOME";
    //关闭主城场景
    SceneNotify.CLOSE_HOME = "SceneNotify_CLOSE_HOME";
    //打开主城场景
    SceneNotify.OPEN_MAJIANG = "OPEN_MAJIANG";
    //关闭主城场景
    SceneNotify.CLOSE_MAJIANG = "CLOSE_MAJIANG";
    //打开主城场景
    SceneNotify.PRE_OPEN_HOME = "SceneNotify_PRE_OPEN_HOME";
    //关闭主城场景
    SceneNotify.PRE_CLOSE_HOME = "SceneNotify_PRE_CLOSE_HOME";
    //打开游戏场景
    SceneNotify.OPEN_GAME = "SceneNotify_OPEN_GAME";
    //关闭游戏场景
    SceneNotify.CLOSE_GAME = "SceneNotify_CLOSE_GAME";
    //打开游戏场景
    SceneNotify.OPEN_RANK = "SceneNotify_OPEN_RANK";
    //关闭游戏场景
    SceneNotify.CLOSE_RANK = "SceneNotify_CLOSE_RANK";
    //关闭游戏场景
    SceneNotify.GAME_NEXT_QUESTION = "GAME_NEXT_QUESTION";
    SceneNotify.CLOSE_TOUCH_GROUP = "CLOSE_TOUCH_GROUP";
    SceneNotify.OPEN_MAIN_GAME = "OPEN_MAIN_GAME";
    SceneNotify.CLOSE_MAIN_GAME = "CLOSE_MAIN_GAME";
    return SceneNotify;
}());
__reflect(SceneNotify.prototype, "SceneNotify");
//# sourceMappingURL=SceneNotify.js.map