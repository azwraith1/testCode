//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(title) {
        var _this = _super.call(this) || this;
        _this.viewNum = 0;
        _this.graphics.lineStyle(2, 0x282828);
        _this.graphics.moveTo(0, 35);
        _this.graphics.lineTo(Context.stageWidth, 35);
        _this.graphics.endFill();
        _this.graphics.lineStyle(2, 0x6a6a6a);
        _this.graphics.moveTo(0, 37);
        _this.graphics.lineTo(Context.stageWidth, 37);
        _this.graphics.endFill();
        _this.drawText(title);
        _this.addChild(_this.textF);
        return _this;
    }
    Menu.prototype.drawText = function (label) {
        if (this.textF == null) {
            var text = new egret.TextField();
            text.text = label;
            text.width = Context.stageWidth;
            text.height = 35;
            text.size = 22;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.textAlign = egret.HorizontalAlign.CENTER;
            this.textF = text;
            this.textF.strokeColor = 0x292b2f;
        }
    };
    Menu.prototype.addTestView = function (label, scene) {
        var btn = new Button(label);
        btn.testView = scene;
        if (this.viewNum % 2 == 0) {
            btn.x = 10;
        }
        else {
            btn.x = (Context.stageWidth - 30) / 2 + 20;
        }
        btn.y = 48 + Math.floor(this.viewNum / 2) * 47;
        this.addChild(btn);
        btn.addEventListener("CHAGE_STAGE", this.change_scene, this);
        this.viewNum++;
    };
    Menu.prototype.change_scene = function (evt) {
        var parent = this.parent;
        this.parent.removeChild(this);
        parent.addChild(evt.currentTarget.testView);
        evt.currentTarget.testView.start();
    };
    Menu.prototype.addTestFunc = function (label, callback, target) {
        var btn = new Button(label);
        btn.x = (Context.stageWidth - 30) / 2 + 20;
        btn.y = 48 + this.viewNum * 47;
        this.addChild(btn);
        btn.addEventListener("CHAGE_STAGE", callback, target);
        this.viewNum++;
    };
    return Menu;
}(egret.Sprite));
__reflect(Menu.prototype, "Menu");
//# sourceMappingURL=Menu.js.map