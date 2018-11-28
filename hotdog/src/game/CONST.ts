class CONST {
    public static stageWidth:number = 480;
    public static stageHeight:number = 720;

    public static goal:number = 0;

    /**
     * 创建敌人时间间隔
     */
    public static enemyGap:number = 50;
    /**
     * 创建子弹时间间隔
     */
    public static heroBulletGap:number = 50;

    public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
}