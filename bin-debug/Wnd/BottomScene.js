var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BottomScene = (function (_super) {
    __extends(BottomScene, _super);
    function BottomScene() {
        var _this = _super.call(this) || this;
        _this.btnSelectImgs = [];
        _this.btnUnSelectImgs = [];
        _this.selectId = 2;
        _this.lastSelectId = 2;
        _this.chargeWebScene = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/BottomWnd.exml";
        return _this;
    }
    BottomScene.prototype.onComplete = function () {
        this.initUI();
        this.initListener();
    };
    BottomScene.prototype.initUI = function () {
        this.initImgs();
        this.updateSelectShow();
    };
    BottomScene.prototype.initImgs = function () {
        this.btnSelectImgs.push(this.btnCharge1);
        this.btnSelectImgs.push(this.btnExploit1);
        this.btnSelectImgs.push(this.btnHall1);
        this.btnSelectImgs.push(this.btnDiscovery1);
        this.btnSelectImgs.push(this.btnMyInfo1);
        this.btnUnSelectImgs.push(this.btnCharge2);
        this.btnUnSelectImgs.push(this.btnExploit2);
        this.btnUnSelectImgs.push(this.btnHall2);
        this.btnUnSelectImgs.push(this.btnDiscovery2);
        this.btnUnSelectImgs.push(this.btnMyInfo2);
    };
    BottomScene.prototype.updateSelectShow = function () {
        for (var i = 0; i < this.btnSelectImgs.length; i++) {
            this.btnSelectImgs[i].visible = (this.selectId == i);
            this.btnUnSelectImgs[i].visible = (this.selectId != i);
        }
    };
    BottomScene.prototype.initListener = function () {
        //this.addEventListener("backHall",this.backHall,this);
        this.rectCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnChargeClick, this);
        this.rectExploit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnExploitClick, this);
        this.rectHall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnHallClick, this);
        this.rectDiscovery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnDiscoveryClick, this);
        this.rectMyInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnMyInfoClick, this);
    };
    //返回大厅
    BottomScene.prototype.backHall = function (e) {
        this.HandleBtnHallClick(null);
    };
    //显示我的战绩
    BottomScene.prototype.backExploit = function (e) {
        this.HandleBtnExploitClick(null);
    };
    //返回我的信息窗口
    BottomScene.prototype.backMyInfo = function (e) {
        this.HandleBtnMyInfoClick(null);
    };
    //充值
    BottomScene.prototype.HandleBtnChargeClick = function (e) {
        this.SelectId = 0;
        this.updateSelectShow();
        this.switchScene();
    };
    //战绩
    BottomScene.prototype.HandleBtnExploitClick = function (e) {
        // if(WndManager.root.main.protocol.jumpGametypeId >0)
        // {
        // 		this.SelectId = 1;
        // 	this.updateSelectShow();
        // 	this.switchScene();
        // }
        // else
        // {
        WndManager.root.main.protocol.addEventListener("OngetExploit", this.OngetExploit, this);
        WndManager.root.main.protocol.getExploit();
        //}
    };
    BottomScene.prototype.OngetExploit = function () {
        this.SelectId = 1;
        this.updateSelectShow();
        this.switchScene();
    };
    //大厅
    BottomScene.prototype.HandleBtnHallClick = function (e) {
        this.SelectId = 2;
        this.updateSelectShow();
        this.switchScene();
    };
    //发现
    BottomScene.prototype.HandleBtnDiscoveryClick = function (e) {
        WndManager.root.main.protocol.addEventListener("Ongetdraw", this.Ongetdraw, this);
        WndManager.root.main.protocol.getDrawInfo();
    };
    BottomScene.prototype.Ongetdraw = function () {
        this.SelectId = 3;
        this.updateSelectShow();
        this.switchScene();
        //	this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.DrawData.getDrawInfo());
    };
    //我的
    BottomScene.prototype.HandleBtnMyInfoClick = function (e) {
        this.SelectId = 4;
        this.updateSelectShow();
        this.switchScene();
    };
    BottomScene.prototype.release = function () {
        //this.removeEventListener("backHall",this.backHall,this);
        this.rectCharge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnChargeClick, this);
        this.rectExploit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnExploitClick, this);
        this.rectHall.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnHallClick, this);
        this.rectDiscovery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnDiscoveryClick, this);
        this.rectMyInfo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnMyInfoClick, this);
    };
    BottomScene.prototype.switchScene = function () {
        this.closeScene();
        this.openScene();
    };
    BottomScene.prototype.openScene = function () {
        switch (this.selectId) {
            case 0:
                WndManager.root.openWnd(ChargeScene); //调试充值页面
                //this.openChargePage();
                break;
            case 1:
                WndManager.root.openWnd(ExploitScene);
                break;
            case 2:
                WndManager.root.openWnd(FirstPageScene);
                break;
            case 3:
                WndManager.root.openWnd(DiscoveryScene);
                break;
            case 4:
                WndManager.root.openWnd(MyInfoScene);
                break;
        }
    };
    BottomScene.prototype.closeScene = function () {
        switch (this.lastSelectId) {
            case 0:
                WndManager.root.closeWnd(ChargeScene);
                //this.hideChargePage();
                break;
            case 1:
                WndManager.root.closeWnd(ExploitScene);
                break;
            case 2:
                WndManager.root.closeWnd(FirstPageScene);
                break;
            case 3:
                WndManager.root.closeWnd(DiscoveryScene);
                break;
            case 4:
                WndManager.root.closeWnd(MyInfoScene);
                break;
        }
    };
    Object.defineProperty(BottomScene.prototype, "SelectId", {
        set: function (value) {
            this.lastSelectId = this.selectId;
            this.selectId = value;
        },
        enumerable: true,
        configurable: true
    });
    BottomScene.prototype.setClicked = function (value) {
        this.touchEnabled = value;
        this.touchChildren = value;
    };
    BottomScene.prototype.openChargePage = function () {
        WndManager.root.main.protocol.getChargeAddr();
    };
    BottomScene.prototype.onGetChargeAddr = function (e) {
        var ret = e.data;
    };
    BottomScene.prototype.showChargePage = function () {
        this.hideChargePage();
        this.chargeWebScene = new ChargeWebScene();
        this.chargeWebScene.setVisible(true);
        this.addChild(this.chargeWebScene);
    };
    BottomScene.prototype.hideChargePage = function () {
        if (null != this.chargeWebScene) {
            this.chargeWebScene.setVisible(false);
            this.removeChild(this.chargeWebScene);
            this.chargeWebScene = null;
        }
    };
    return BottomScene;
}(WinBase));
__reflect(BottomScene.prototype, "BottomScene");
//# sourceMappingURL=BottomScene.js.map