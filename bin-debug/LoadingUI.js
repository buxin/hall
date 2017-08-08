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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI(main) {
        var _this = _super.call(this) || this;
        _this.dotNum = 1;
        _this.txt = new egret.TextField;
        _this.main = main;
        return _this;
    }
    LoadingUI.prototype.setImg = function (bg, bar) {
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x0, 1);
        rect.graphics.drawRect(0, 0, MainScene.screen_width, MainScene.screen_height);
        rect.graphics.endFill();
        this.addChild(rect);
        this.addChild(bg);
        this.bar = MyUtils.createBitmapByName("loadingBar_png");
        this.bar.x = 247;
        this.bar.y = 730;
        this.addChild(this.bar);
        this.load = MyUtils.createMovieClipByName("load1");
        this.load.x = 120;
        this.load.y = 180;
        this.addChild(this.load);
        this.load.play(-1);
        this.txt.width = 60;
        this.txt.y = 728;
        this.txt.x = 185;
        this.txt.size = 22;
        this.txt.textColor = 0x0;
        this.addChild(this.txt);
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.text = "";
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.txt.text = Math.floor(100 * current / total) + "%";
        //console.log("dotNum:"+ this.dotNum);
        this.bar.width = 216 * current / total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map