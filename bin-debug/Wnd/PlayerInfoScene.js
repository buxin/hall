var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerInfoScene = (function (_super) {
    __extends(PlayerInfoScene, _super);
    function PlayerInfoScene(uiStyle) {
        var _this = _super.call(this) || this;
        _this.uiStyle = GameConstant.PLAYER_INFO_SCENE_LAYOUT_MYINFO;
        _this.uiStyle = uiStyle;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PlayerInfoWnd.exml";
        return _this;
    }
    PlayerInfoScene.prototype.onComplete = function () {
        this.initUI();
        this.initData();
        this.initListener();
    };
    PlayerInfoScene.prototype.initUI = function () {
        this.imgAvatar.mask = this.rectMask;
        this.btnLogout.visible = (this.uiStyle == GameConstant.PLAYER_INFO_SCENE_LAYOUT_MYINFO);
        this.imgArrow.visible = (this.uiStyle == GameConstant.PLAYER_INFO_SCENE_LAYOUT_CHARGE);
        this.rectAvatar.visible = (this.uiStyle == GameConstant.PLAYER_INFO_SCENE_LAYOUT_CHARGE);
    };
    PlayerInfoScene.prototype.initData = function () {
        this.imgAvatar.source = WndManager.root.main.dataManager.MyPlayer.Avatar;
        this.lName.text = WndManager.root.main.dataManager.MyPlayer.Name;
        this.updateData();
    };
    PlayerInfoScene.prototype.updateData = function () {
        if (WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0) {
            this.gTitle1.visible = true;
            this.gTitle0.visible = false;
            if (WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0)
                this.textTitle1.text = WndManager.root.main.dataManager.SystemData.getPackNameBySubType1(WndManager.root.main.dataManager.MyPlayer.Packstype1);
            else
                this.textTitle1.text = "普通用户";
        }
        else {
            this.gTitle1.visible = false;
            this.gTitle0.visible = true;
        }
        this.lDiamondNum.text = WndManager.root.main.dataManager.MyPlayer.DiamondNum.toString();
    };
    PlayerInfoScene.prototype.initListener = function () {
        this.btnLogout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnLogoutClick, this);
        this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnAvatarClick, this);
    };
    PlayerInfoScene.prototype.HandleBtnLogoutClick = function (e) {
        // var event = new egret.Event("openChargeScene",true);
        // this.dispatchEvent(event);
    };
    //点击头像
    PlayerInfoScene.prototype.HandleBtnAvatarClick = function (e) {
        var event = new egret.Event("backMyInfo", true);
        this.dispatchEvent(event);
    };
    PlayerInfoScene.prototype.release = function () {
        this.btnLogout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnLogoutClick, this);
        this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnAvatarClick, this);
    };
    return PlayerInfoScene;
}(WinBase));
__reflect(PlayerInfoScene.prototype, "PlayerInfoScene");
//# sourceMappingURL=PlayerInfoScene.js.map