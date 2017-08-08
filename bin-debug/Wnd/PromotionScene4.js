var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene4 = (function (_super) {
    __extends(PromotionScene4, _super);
    function PromotionScene4() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd4.exml";
        return _this;
    }
    PromotionScene4.prototype.onComplete = function () {
        this.init();
    };
    PromotionScene4.prototype.init = function () {
        this.goto9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotop9, this);
        this.initData();
        this.initListener();
        this.promotionScene5 = new PromotionScene5(this);
        this.promotionScene5.visible = false;
        this.addChild(this.promotionScene5);
        this.promotionScene6 = new PromotionScene6();
        this.promotionScene6.visible = false;
        this.addChild(this.promotionScene6);
        this.promotionScene8 = new PromotionScene8();
        this.promotionScene8.visible = false;
        this.addChild(this.promotionScene8);
        this.promotionScene9 = new PromotionScene9();
        this.promotionScene9.visible = false;
        this.addChild(this.promotionScene9);
    };
    PromotionScene4.prototype.gotop9 = function () {
        WndManager.root.main.protocol.addEventListener("ongetincomes", this.ongetincomes, this);
        WndManager.root.main.protocol.getincomes(0);
    };
    PromotionScene4.prototype.ongetincomes = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            if (ret == "-1") {
                WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            if (ret == "-2") {
                WndManager.root.notifyWnd.show("你不是推广员", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            if (ret == "-3") {
                WndManager.root.notifyWnd.show("查询类型不对", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            var jsObjArr = JSON.parse(ret);
            if (null != jsObjArr) {
                WndManager.root.main.dataManager.MyPlayer.incomeArr = jsObjArr.incomeList;
                var year = jsObjArr.year;
                var month = jsObjArr.month;
                WndManager.root.main.dataManager.MyPlayer.income = (Number(jsObjArr.income) / 100);
                this.promotionScene9.show(true, year, month);
            }
        }
        else {
            WndManager.root.notifyWnd.show("提交上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    PromotionScene4.prototype.initData = function () {
        this.lgname.text = WndManager.root.main.dataManager.MyPlayer.Gname;
        var incomeStr = WndManager.root.main.dataManager.MyPlayer.income.toString();
        this.lincome.textFlow = [{ text: "余额:", style: { "textColor": 0x0, "size": 40 } },
            { text: incomeStr, style: { "textColor": 0xff6968, "size": 40 } }];
        var timestring = "(每周" +
            WndManager.root.main.dataManager.SystemData.getWithdrawWeekDays() + "的" +
            WndManager.root.main.dataManager.SystemData.getWithdrawstarttime() + "-" +
            WndManager.root.main.dataManager.SystemData.getWithdrawendtime() + "可提现）";
        this.ltip.textFlow = [{ text: "提现:", style: { "textColor": 0xffffff, "size": 40 } },
            { text: timestring, style: { "textColor": 0xffffff, "size": 30 } }];
    };
    PromotionScene4.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
        this.rectCreateQr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleCreateQr, this);
        this.btnWithDraw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleWithDrawClick, this);
        this.btnWithDrawRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleRecordClick, this);
        this.btnWithDrawRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleRuleClick, this);
        this.btnTellFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotofriend, this);
        this.btnTellFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotofriend, this);
        this.shareScene = new ShareScene();
        this.addChild(this.shareScene);
        this.shareScene.visible = false;
    };
    PromotionScene4.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene4.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
        this.rectCreateQr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleCreateQr, this);
        this.btnWithDraw.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleWithDrawClick, this);
        this.btnWithDrawRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleRecordClick, this);
        this.btnWithDrawRule.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleRuleClick, this);
    };
    PromotionScene4.prototype.gotofriend = function () {
        this.shareScene.visible = true;
    };
    //提现
    PromotionScene4.prototype.HandleWithDrawClick = function (e) {
        this.promotionScene5.setVisible(true);
    };
    //提现记录
    PromotionScene4.prototype.HandleRecordClick = function (e) {
        WndManager.root.main.protocol.addEventListener("onWithdrawInfo", this.onWithdrawInfo, this);
        WndManager.root.main.protocol.getMyWithdrawApply();
    };
    //提现规则
    PromotionScene4.prototype.HandleRuleClick = function (e) {
        this.promotionScene8.setVisible(true);
    };
    PromotionScene4.prototype.onWithdrawInfo = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            if (ret == "-1") {
                WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            if (ret == "-2") {
                WndManager.root.notifyWnd.show("你不是推广员", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            var jsObjArr = JSON.parse(ret);
            if (null != jsObjArr) {
                WndManager.root.main.dataManager.MyPlayer.withdrawArr = jsObjArr;
                this.promotionScene6.setVisible(true);
            }
        }
        else {
            WndManager.root.notifyWnd.show("提交上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    PromotionScene4.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    PromotionScene4.prototype.HandleCreateQr = function () {
        if (MyUtils.checkStringIsNotNulll(WndManager.root.main.protocol.dataManager.MyPlayer.qrPath)) {
            this.showQr();
        }
        else {
            WndManager.root.main.protocol.once("getQrImg", this.getQrImg, this);
            WndManager.root.main.protocol.getQrImgPath();
        }
    };
    PromotionScene4.prototype.getQrImg = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            var jsObj = JSON.parse(ret);
            if (null != jsObj) {
                var code = Number(jsObj.code);
                if (code == -1) {
                    WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                    return;
                }
                if (code == -2) {
                    WndManager.root.notifyWnd.show("你不是推广员", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                    return;
                }
                WndManager.root.main.protocol.dataManager.MyPlayer.qrPath = jsObj.qrpath;
                this.showQr();
            }
            else {
                WndManager.root.notifyWnd.show("获取二维码失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            }
        }
        else {
            WndManager.root.notifyWnd.show("获取二维码失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    PromotionScene4.prototype.showQr = function () {
        if (null != this.qrScene) {
            this.removeChild(this.qrScene);
            this.qrScene = null;
        }
        this.qrScene = new QrScene();
        this.qrScene.setVisible(true);
        this.addChild(this.qrScene);
    };
    return PromotionScene4;
}(WinBase));
__reflect(PromotionScene4.prototype, "PromotionScene4");
//# sourceMappingURL=PromotionScene4.js.map