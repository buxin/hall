var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SignScene = (function (_super) {
    __extends(SignScene, _super);
    function SignScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/SignWnd.exml";
        return _this;
    }
    SignScene.prototype.onComplete = function () {
        this.initData();
        this.initListener();
    };
    SignScene.prototype.initData = function () {
        this.yesBtn3.visible = WndManager.root.main.dataManager.MyPlayer.SignToday;
        //签到天数
        this.lSignDays.text = "已成功签到" + WndManager.root.main.dataManager.MyPlayer.SignDays.toString() + "天";
        //今日签到奖励
        this.lSignReward.text = "+" + WndManager.root.main.dataManager.MyPlayer.SignDiamond.toString();
    };
    SignScene.prototype.initListener = function () {
        this.yesBtn2.once(egret.TouchEvent.TOUCH_TAP, this.HandleYesBtn2Click, this);
        this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleCloseClick, this);
    };
    //签到
    SignScene.prototype.HandleYesBtn2Click = function (e) {
        WndManager.root.main.protocol.sign();
    };
    SignScene.prototype.release = function () {
        //this.yesBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleYesBtn2Click,this);
        this.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleCloseClick, this);
    };
    SignScene.prototype.setVisible = function (value) {
        this.visible = value;
        //初始化
        if (value)
            this.initData();
    };
    //签到
    SignScene.prototype.HandleCloseClick = function (e) {
        this.visible = false;
    };
    return SignScene;
}(WinBase));
__reflect(SignScene.prototype, "SignScene");
//# sourceMappingURL=SignScene.js.map