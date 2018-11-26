var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-09-11 10:57:15
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-16 18:24:51
 * @Description:
 */
var PathTypeEnum;
(function (PathTypeEnum) {
    //192.168.2.98
    PathTypeEnum[PathTypeEnum["NEI_TEST"] = 0] = "NEI_TEST";
    //192.168.2.200
    PathTypeEnum[PathTypeEnum["NEI_PRODUCT"] = 1] = "NEI_PRODUCT";
    //外网测试 35.221.192.46
    PathTypeEnum[PathTypeEnum["WAI_TEST"] = 2] = "WAI_TEST";
    //外网正式 
    PathTypeEnum[PathTypeEnum["WAI_PRODUCT"] = 3] = "WAI_PRODUCT";
    //35.187.151.179 体验测试服
    PathTypeEnum[PathTypeEnum["TIYAN_CLIENT"] = 4] = "TIYAN_CLIENT";
})(PathTypeEnum || (PathTypeEnum = {}));
var PathConfig = (function () {
    function PathConfig() {
        //是否使用oss
        this.use_oss = false;
        this.debug_model = false;
        this.token_login = false;
    }
    return PathConfig;
}());
__reflect(PathConfig.prototype, "PathConfig");
var PathConfigFac = (function () {
    function PathConfigFac() {
    }
    PathConfigFac.getPathByType = function (type) {
        var pathConfig = new PathConfig();
        pathConfig.log_level = 2;
        switch (type) {
            case PathTypeEnum.NEI_TEST:
                pathConfig.http_header = "http://";
                pathConfig.http_server = "192.168.2.18";
                pathConfig.http_port = "6065";
                pathConfig.socket_header = "ws://";
                pathConfig.socket_path = "192.168.2.18";
                pathConfig.use_oss = false;
                // pathConfig.log_level = LogUtils.DEBUG;
                break;
            case PathTypeEnum.NEI_PRODUCT:
                pathConfig.http_header = "http://";
                pathConfig.http_server = "192.168.2.210";
                pathConfig.http_port = "3002";
                pathConfig.socket_header = "ws://";
                pathConfig.socket_path = "192.168.2.210";
                pathConfig.use_oss = false;
                break;
            case PathTypeEnum.WAI_PRODUCT:
                pathConfig.http_header = "https://";
                pathConfig.http_server = "game.v5sm.com";
                pathConfig.http_port = "3002";
                // pathConfig.log_level = LogUtils.ERROR;
                pathConfig.socket_header = "wss://";
                pathConfig.socket_path = "game.v5sm.com";
                // pathConfig.use_oss = true;
                // pathConfig.oss_path = pathConfig.http_header + "game.v5sm.com/"
                // pathConfig.oss_path = "https://oss-scmj.oss-cn-shenzhen.aliyuncs.com/res/";//pathConfig.http_header + "bl.v5sm.com/game/"
                // pathConfig.json_path = pathConfig.http_header + "bl.v5sm.com/res/";
                pathConfig.debug_model = false;
                pathConfig.token_login = true;
                break;
            case PathTypeEnum.WAI_TEST:
                pathConfig.http_header = "http://";
                pathConfig.http_server = "35.221.192.46";
                pathConfig.http_port = "3002";
                // pathConfig.log_level = LogUtils.ERROR;
                pathConfig.socket_header = "ws://";
                pathConfig.socket_path = "35.221.192.46";
                pathConfig.use_oss = false;
                pathConfig.debug_model = false;
                break;
            case PathTypeEnum.TIYAN_CLIENT:
                pathConfig.http_header = "http://";
                pathConfig.http_server = "35.187.151.179";
                pathConfig.http_port = "3002";
                // pathConfig.log_level = LogUtils.ERROR;
                pathConfig.socket_header = "ws://";
                pathConfig.socket_path = "35.187.151.179";
                pathConfig.debug_model = false;
                break;
        }
        return pathConfig;
    };
    return PathConfigFac;
}());
__reflect(PathConfigFac.prototype, "PathConfigFac");
//# sourceMappingURL=PathConfig.js.map