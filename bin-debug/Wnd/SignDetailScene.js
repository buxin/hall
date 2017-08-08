/*签到详情*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SignDetailScene = (function (_super) {
    __extends(SignDetailScene, _super);
    function SignDetailScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/SignDetailWnd.exml";
        return _this;
    }
    SignDetailScene.prototype.onComplete = function () {
        this.init();
    };
    SignDetailScene.prototype.init = function () {
        this.initData();
        this.initListener();
    };
    SignDetailScene.prototype.initData = function () {
        for (var i = 0; i < GameConstant.GAME_SIGN_DURATION; i++) {
            var gId = i + 1;
            this["g" + gId].visible = i < WndManager.root.main.dataManager.MyPlayer.SignDays;
        }
        var dateStrArr = WndManager.root.main.dataManager.MyPlayer.DataArr;
        for (var i = 0; i < GameConstant.GAME_SIGN_DURATION; i++) {
            var lDateId = i + 1;
            this["lDate" + lDateId].text = dateStrArr[i];
        }
        this.lSignNum.text = WndManager.root.main.dataManager.SystemData.SignTodayNum.toString() + "人";
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        //	this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.SignInfo);
        WndManager.root.main.protocol.once("ongetSignNpc", this.ongetSignNpc, this);
        WndManager.root.main.protocol.getSignNpc();
        this.dataList.itemRenderer = SignInfoItemRender;
        this.scroller.viewport = this.dataList;
    };
    SignDetailScene.prototype.ongetSignNpc = function () {
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.SignInfo);
    };
    SignDetailScene.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            //重置数据
            this.initData();
        }
    };
    SignDetailScene.prototype.initListener = function () {
        this.rectRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleRefreshClick, this);
    };
    SignDetailScene.prototype.release = function () {
        this.rectRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleRefreshClick, this);
    };
    //刷新
    SignDetailScene.prototype.HandleRefreshClick = function (e) {
        //提交刷新接口，也可以做一个假刷新
    };
    return SignDetailScene;
}(WinBase));
__reflect(SignDetailScene.prototype, "SignDetailScene");
//# sourceMappingURL=SignDetailScene.js.map