
/**
 * 龙骨工厂类
 * 本类为未测试，请自行实现。
 */
class DBFactory {

	private static s_instance: DBFactory;

	private m_factorys: any;

	private m_dbFactory: dragonBones.EgretFactory;

	public constructor() {
		this.m_factorys = {};
		this.m_dbFactory = new dragonBones.EgretFactory();
	}
	/**
	 * 获取影片剪辑
	 * @param db    龙骨数据名称
	 * @param json  龙骨JSON名称
	 * @param png   龙骨PNG名称
	 * @param name  龙骨名称
	 */
	public getDB(db: string, json: string, png: string, name: string = ""): dragonBones.EgretArmatureDisplay {
		let dragonbonesData: any = RES.getRes(db);
		let jsonData: any = RES.getRes(json);
		let pngData: egret.Texture = RES.getRes(png);
		if (!dragonbonesData || !jsonData || !pngData) {
			LogUtils.logI("资源不存在");
			return;
		}

		let dbFactory: dragonBones.EgretFactory = this.m_dbFactory;
		dbFactory.parseDragonBonesData(dragonbonesData);
		dbFactory.parseTextureAtlasData(jsonData, pngData);
		return dbFactory.buildArmatureDisplay(name);
	}

	public static get instance(): DBFactory {
		if (DBFactory.s_instance == null) {
			DBFactory.s_instance = new DBFactory();
		}
		return DBFactory.s_instance;
	}


	public remove(name) {
		this.m_dbFactory.removeDragonBonesData(name, true);
	}
}