// TypeScript file
module game {
    export class RoundGroupManager {
        public _roundGroup: eui.Group;

        public static _instance: RoundGroupManager;

        public constructor() {
            if (RoundGroupManager._instance) {
                throw new Error("DateTimer使用单例");
            }
        }

        public static roundGroup(): RoundGroupManager {
            if (!this._instance) {
                this._instance = new RoundGroupManager();
            }
            return this._instance;
        }

        public createGroup(i:number,imagSourceStr:Array<number>){
            this._roundGroup = new eui.Group();
            let bitmap:egret.Bitmap =  new egret.Bitmap();
            for(let j = 1;j<=i;j++){
                bitmap.texture = RES.getRes("icon_json."+ 1 + "");
                bitmap.x = 0;
                bitmap.y = (j-1) * bitmap.height;
                this._roundGroup.addChild(bitmap);
            }
            return this._roundGroup;
        }
    }

}