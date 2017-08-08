var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BannerScene = (function (_super) {
    __extends(BannerScene, _super);
    function BannerScene() {
        var _this = _super.call(this) || this;
        _this.t = 0;
        _this.i = 1;
        _this.hua = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/BannerWnd.exml";
        return _this;
    }
    BannerScene.prototype.onComplete = function () {
        this.addEventListener(egret.TouchEvent.ENTER_FRAME, this.lunbo, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gotoNo2, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.gotoNo2, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.gotoNo2, this);
        this.imgBan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gototuiguan, this);
        this.bt1.addEventListener(egret.TouchEvent.TOUCH_TAP, this._bts, this);
        this.bt2.addEventListener(egret.TouchEvent.TOUCH_TAP, this._bts, this);
    };
    BannerScene.prototype._bts = function () {
        if (this.i == 1) {
            this.i = 2;
            this.h2.visible = true;
            this.b1.visible = true;
            this.h1.visible = false;
            this.b2.visible = false;
        }
        else {
            this.i = 1;
            this.h1.visible = true;
            this.b2.visible = true;
            this.h2.visible = false;
            this.b1.visible = false;
        }
        this.imgBan.source = RES.getRes("imgBanner" + this.i + "_png");
    };
    BannerScene.prototype.lunbo = function () {
        this.t += 1;
        if (this.t >= 100) {
            //egret.log("i +" +this.i)
            this.t = 0;
            if (this.i == 1) {
                this.i = 2;
                this.h2.visible = true;
                this.b1.visible = true;
                this.h1.visible = false;
                this.b2.visible = false;
            }
            else {
                this.i = 1;
                this.h1.visible = true;
                this.b2.visible = true;
                this.h2.visible = false;
                this.b1.visible = false;
            }
            this.imgBan.source = RES.getRes("imgBanner" + this.i + "_png");
        }
    };
    BannerScene.prototype.gototuiguan = function () {
        if (this.i == 2) {
            var event = new egret.Event("openMyInfoSubScene", true, false, 3);
            this.dispatchEvent(event);
        }
    };
    BannerScene.prototype.gotoNo2 = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.this_X = event.stageX;
            this.hua = true;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
        }
        else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            if (event.stageX - this.this_X < -50 && this.hua) {
                if (this.i == 1) {
                    this.i = 2;
                }
                else {
                    this.i = 1;
                }
                this.imgBan.source = RES.getRes("imgBanner" + this.i + "_png");
                this.hua = false;
                return;
            }
        }
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.this_X = event.stageX;
            this.hua = true;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
        }
        else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            if (event.stageX - this.this_X > 50 && this.hua) {
                if (this.i == 1) {
                    this.i = 2;
                }
                else {
                    this.i = 1;
                }
                this.imgBan.source = RES.getRes("imgBanner" + this.i + "_png");
                this.hua = false;
                return;
            }
        }
    };
    return BannerScene;
}(WinBase));
__reflect(BannerScene.prototype, "BannerScene");
//# sourceMappingURL=BannerScene.js.map