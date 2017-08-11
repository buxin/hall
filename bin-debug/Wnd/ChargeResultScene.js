var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeResultScene = (function (_super) {
    __extends(ChargeResultScene, _super);
    function ChargeResultScene(chargeScene) {
        var _this = _super.call(this) || this;
        _this.param1 = 0;
        _this.appCons = "";
        _this.chargeScene = chargeScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/ChargeResultWnd.exml";
        return _this;
    }
    ChargeResultScene.prototype.onComplete = function () {
        this.initUI();
        this.initData();
        this.initListener();
    };
    ChargeResultScene.prototype.initUI = function () {
    };
    ChargeResultScene.prototype.initData = function () {
    };
    ChargeResultScene.prototype.updateData = function (title, content, param1, appCons) {
        this.lTitle.text = title;
        this.lContent.text = content;
        this.visible = true;
        this.param1 = param1;
        this.appCons = appCons;
        if (this.appCons == ChargeResultScene.APP_SHOPPING) {
            this.btnClose.visible = true;
            this.imgClose.visible = true;
        }
        else {
            this.btnClose.visible = false;
            this.imgClose.visible = false;
        }
        if (MyUtils.checkStringIsNotNulll(content))
            this.lTitle.y = 450;
        else
            this.lTitle.y = 470;
        if (MyUtils.checkStringIsNotNulll(WndManager.root.main.protocol.serverInfo.gameweb) && this.appCons != ChargeResultScene.APP_SHOPPING) {
            this.yesBtn5.visible = false;
            this.yesBtn4.visible = true;
            this.btnBack.visible = true;
        }
        else {
            this.yesBtn5.visible = true;
            this.yesBtn4.visible = false;
            this.btnBack.visible = false;
        }
    };
    ChargeResultScene.prototype.initListener = function () {
        this.yesBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnYesClick, this);
        this.yesBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnYesClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnBackClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnCloseClick, this);
    };
    ChargeResultScene.prototype.HandleBtnYesClick = function (e) {
        this.visible = false;
        if (this.appCons == ChargeResultScene.APP_SHOPPING) {
            this.chargeScene.confirmShoping(this.param1);
        }
    };
    ChargeResultScene.prototype.HandleBtnCloseClick = function (e) {
        this.visible = false;
    };
    ChargeResultScene.prototype.HandleBtnBackClick = function (e) {
        WndManager.root.backGame();
    };
    ChargeResultScene.prototype.release = function () {
        this.yesBtn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnYesClick, this);
        this.yesBtn5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnYesClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnCloseClick, this);
    };
    return ChargeResultScene;
}(WinBase));
ChargeResultScene.APP_SHOPPING = "APP_SHOPPING";
__reflect(ChargeResultScene.prototype, "ChargeResultScene");
//# sourceMappingURL=ChargeResultScene.js.map