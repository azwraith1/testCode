var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Utils = (function () {
        function Utils() {
        }
        /**
         * 获取从min-max之间的值
         * @param min
         * @param max
         */
        Utils.rang = function (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        };
        /**
         * 判断是否在范围
         * @param val
         * @param min
         * @param max
         * @returns {boolean}
         */
        Utils.isRang = function (val, min, max) {
            return val >= min && val <= max;
        };
        /**
        * 产生包含min,max的随机数
        * @param min 最小值
        * @param max 最大值
        * @param isFloat 是否返回Float值
        * @param decimal 保留小数位 默认保留2位小数
        * @returns {number} 数值
        */
        Utils.random = function (min, max, isFloat, decimal) {
            return isFloat ? (min + parseFloat((Math.random() * (max - min)).toFixed(decimal ? decimal : 2))) : (min + Math.round(Math.random() * (max - min)));
        };
        /**
         * 将val的值限制起来
         * @param val
         * @param min
         * @param max
         * @returns {number}
         */
        Utils.limit = function (val, min, max) {
            return Math.max(min, Math.min(max, val));
        };
        /**
         * 角度转化弧度
         * @param val
         */
        Utils.ang2rad = function (val) {
            return val / 180 * Math.PI;
        };
        /**
         * 弧度转化角度
         * @param val
         */
        Utils.rad2ang = function (val) {
            return val / Math.PI * 180;
        };
        /**
         * 返回大数据的显示方式
         * @param num
         * @returns {string}
         */
        Utils.getBigNumberShow = function (num) {
            if (num < 10000) {
                return num + "";
            }
            else {
                num /= 1000;
                return num.toFixed(1) + "K";
            }
        };
        /**
         * 元素是否包含在Array里
         * @param el
         * @param arr
         * @returns {boolean}
         */
        Utils.isElinArr = function (el, arr) {
            return arr.indexOf(el) > -1;
        };
        /**
         * 2个Array是否有相交元素
         * @param arr1
         * @param arr2
         */
        Utils.isArrCrossing = function (arr1, arr2) {
            for (var i = 0; i < arr1.length; i++) {
                if (Utils.isElinArr(arr1[i], arr2)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 从地址上获取key
         * @param name {string} 要获取的key名称
         * @returns {string} key值
         * @platform Web
         * @code utf-8
         */
        Utils.getURLQueryString = function (name) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var url = decodeURIComponent(window.location.href);
                url = url.replace(/&quot/g, "\"");
                var r;
                if (url.indexOf("#?") > 0) {
                    url = url.replace("#?", "&");
                    r = url.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
                }
                else {
                    r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
                }
                return r ? r[2] : null;
            }
        };
        Utils.getMaxStr = function (str) {
            if (str.length <= 5) {
                return str;
            }
            return str.substr(0, 5) + "...";
        };
        Utils.removeArrayItem = function (arr, item) {
            var index = arr.indexOf(item);
            if (index > -1) {
                arr.splice(index, 1);
            }
        };
        Utils.mtaChainSdk = function (id) {
            var MtaH5 = window['MtaH5'];
            if (MtaH5 && MtaH5.clickStat) {
                var obj = {};
                obj[id.toLocaleLowerCase()] = 'true';
                MtaH5.clickStat('yemianshendu', obj);
            }
        };
        /**
* 两矩形碰撞
* @param x1 {number} 方1x
* @param y1 {number} 方1y
* @param w1 {number} 方1宽
* @param h1 {number} 方1高
* @param x2 {number} 方2x
* @param y2 {number} 方2y
* @param w2 {number} 方2宽
* @param h2 {number} 方2高
*/
        Utils.isCollsionRect2 = function (x1, y1, w1, h1, x2, y2, w2, h2) {
            return ((x1 >= x2 && x1 >= x2 + w2) || (x1 <= x2 && x1 + w1 <= x2) || (y1 >= y2 && y1 >= y2 + h2) || (y1 <= y2 && y1 + h1 <= y2)) ? false : true;
        };
        Utils.rect1CollsionRect2 = function (rect1, rect2) {
            return Utils.isCollsionRect2(rect1.x, rect1.y, rect1.width, rect1.height, rect2.x, rect2.y, rect2.width, rect2.height);
        };
        Utils.getRotationXy = function (r, rotaion) {
            var result;
            var rad = Utils.ang2rad(90 - Math.abs(rotaion));
            if (rotaion < 0) {
                result = {
                    x: (r * Math.cos(rad)),
                    y: (r * Math.sin(rad))
                };
            }
            else {
                result = {
                    x: -(r * Math.cos(rad)),
                    y: (r * Math.sin(rad))
                };
            }
            return result;
        };
        return Utils;
    }());
    game.Utils = Utils;
    __reflect(Utils.prototype, "game.Utils");
})(game || (game = {}));
//# sourceMappingURL=Utils.js.map