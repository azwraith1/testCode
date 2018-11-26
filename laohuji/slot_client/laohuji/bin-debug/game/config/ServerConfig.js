var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerConfig = (function () {
    function ServerConfig() {
    }
    //服务器测试账号
    ServerConfig.USER_NAME = "skt_faker";
    ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST;
    /**
     * 是否开启血战到底
    */
    ServerConfig.OPEN_XZDD = true;
    return ServerConfig;
}());
__reflect(ServerConfig.prototype, "ServerConfig");
//# sourceMappingURL=ServerConfig.js.map