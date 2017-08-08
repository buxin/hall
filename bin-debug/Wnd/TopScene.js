var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TopScene = (function (_super) {
    __extends(TopScene, _super);
    function TopScene(uiStyle) {
        var _this = _super.call(this) || this;
        _this.uiStyle = GameConstant.TOPSCENE_LAYOUT_HALL;
        _this.uiStyle = uiStyle;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/TopWnd.exml";
        return _this;
    }
    //初始化窗口高度，组件宽，高
    TopScene.prototype.initSize = function () {
    };
    TopScene.prototype.screenAdapt = function () {
    };
    TopScene.prototype.onComplete = function () {
        this.initUI();
        this.initData();
        this.modUI();
        this.initListener();
    };
    TopScene.prototype.initUI = function () {
        this.imgAvatar.mask = this.rectMask;
        this.btnLogout.visible = (this.uiStyle == GameConstant.TOPSCENE_LAYOUT_MYINFO);
        this.btnFeedback.visible = (this.uiStyle == GameConstant.TOPSCENE_LAYOUT_HALL);
        if (this.uiStyle == GameConstant.TOPSCENE_LAYOUT_HALL) {
            this.btnSign.visible = !WndManager.root.main.dataManager.MyPlayer.SignToday;
            this.btnSign1.visible = WndManager.root.main.dataManager.MyPlayer.SignToday;
        }
        else {
            this.btnSign.visible = false;
            this.btnSign1.visible = false;
        }
        //this.screenAdapt();
    };
    TopScene.prototype.initData = function () {
        this.imgAvatar.source = WndManager.root.main.dataManager.MyPlayer.Avatar;
        this.lName.text = WndManager.root.main.dataManager.MyPlayer.Name;
        this.lDiamondNum.text = WndManager.root.main.dataManager.MyPlayer.DiamondNum.toString();
    };
    TopScene.prototype.initListener = function () {
        this.btnLogout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnLogoutClick, this);
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnChargeClick, this);
        this.btnSign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnSignClick, this);
        this.btnFeedback.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnFeedbackClick, this);
        this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnAvatarClick, this);
    };
    TopScene.prototype.HandleBtnLogoutClick = function (e) {
        // var event = new egret.Event("openChargeScene",true);
        // this.dispatchEvent(event);
    };
    //充值
    TopScene.prototype.HandleBtnChargeClick = function (e) {
        WndManager.root.gotopay();
    };
    //签到
    TopScene.prototype.HandleBtnSignClick = function (e) {
        var event = new egret.Event("openSignScene", true);
        this.dispatchEvent(event);
        // WndManager.root.main.protocol.getSignInfo();
    };
    //反馈
    TopScene.prototype.HandleBtnFeedbackClick = function (e) {
        var event = new egret.Event("openMyInfoSubScene", true, false, 0);
        this.dispatchEvent(event);
    };
    //点击头像
    TopScene.prototype.HandleBtnAvatarClick = function (e) {
        var event = new egret.Event("backMyInfo", true);
        this.dispatchEvent(event);
    };
    TopScene.prototype.release = function () {
        this.btnLogout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnLogoutClick, this);
        this.btnCharge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnChargeClick, this);
        this.btnSign.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnSignClick, this);
        this.btnFeedback.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnFeedbackClick, this);
        this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnAvatarClick, this);
    };
    TopScene.prototype.modUI = function () {
        if (this.lDiamondNum.text != "") {
            var charNum = this.lDiamondNum.text.length;
            if (charNum < 4)
                charNum == 4;
            this.btnCharge.x = this.lDiamondNum.x + 14 * (charNum + 1);
        }
    };
    return TopScene;
}(WinBase));
__reflect(TopScene.prototype, "TopScene");
//# sourceMappingURL=TopScene.js.map