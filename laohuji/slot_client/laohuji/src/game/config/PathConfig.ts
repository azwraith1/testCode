/*
 * @Author: li mengchan 
 * @Date: 2018-09-11 10:57:15 
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-16 18:24:51
 * @Description: 
 */
enum PathTypeEnum {
	//192.168.2.98
	NEI_TEST,
	//192.168.2.200
	NEI_PRODUCT,
	//外网测试 35.221.192.46
	WAI_TEST,
	//外网正式 
	WAI_PRODUCT,
	//35.187.151.179 体验测试服
	TIYAN_CLIENT
}

class PathConfig {
	//http 或者 https
	public http_header: string;
	//http地址
	public http_server: string;
	//http端口
	public http_port: string;
	//socket头部 ws wss
	public socket_header: string;
	//socket地址
	public socket_path: string;
	//是否使用oss
	public use_oss: boolean = false;
	//oss地址
	public oss_path: string;
	//日志等级
	public log_level: number;
	public json_path: string;

	public debug_model: boolean = false;

	public token_login: boolean = false;
}

class PathConfigFac {
	public static getPathByType(type: number): PathConfig {
		let pathConfig = new PathConfig();
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
	}

}