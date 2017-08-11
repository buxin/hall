var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PackScene = (function (_super) {
    __extends(PackScene, _super);
    function PackScene(chargeScene) {
        var _this = _super.call(this) || this;
        _this.chargeScene = chargeScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PackWnd.exml";
        return _this;
    }
    PackScene.prototype.onComplete = function () {
        this.initUI();
        this.initData();
        this.initListener();
    };
    PackScene.prototype.initUI = function () {
        this.rectUntouch.touchEnabled = false;
    };
    PackScene.prototype.initData = function () {
        this.lPrice1.text = WndManager.root.main.dataManager.SystemData.getPackPriceStrBySubType1(1);
        this.lPrice2.text = WndManager.root.main.dataManager.SystemData.getPackPriceStrBySubType1(2);
        this.lPrice3.text = WndManager.root.main.dataManager.SystemData.getPackPriceStrBySubType1(3);
        this.lDay.text = WndManager.root.main.dataManager.SystemData.getPackShowNameBySubType1(1);
        this.lWeek.text = WndManager.root.main.dataManager.SystemData.getPackShowNameBySubType1(2);
        this.lMonth.text = WndManager.root.main.dataManager.SystemData.getPackShowNameBySubType1(3);
        this.updateData();
    };
    PackScene.prototype.updateData = function () {
        this.lTitle.visible = WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0;
        this.lTime.visible = WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0;
        //this.rectUntouch.visible = WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0;
        //this.gPack.alpha = WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0?0.5:1;
        if (WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0) {
            var leftTime = WndManager.root.main.dataManager.MyPlayer.PackLeftTime;
            this.lTime.text = MyUtils.formatDuring(leftTime);
        }
    };
    PackScene.prototype.initListener = function () {
        this.btnPackDay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnPackDayClick, this);
        this.btnPackWeek.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnPackWeekClick, this);
        this.btnPackMonth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnPackMonthClick, this);
    };
    PackScene.prototype.HandleBtnPackDayClick = function (e) {
        if (WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0) {
            WndManager.root.notifyWnd.show("您已经是套餐用户", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            // WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
            // WndManager.root.main.protocol.shopping(1);
            this.chargeScene.shopping(1);
        }
    };
    PackScene.prototype.HandleBtnPackWeekClick = function (e) {
        if (WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0) {
            WndManager.root.notifyWnd.show("您已经是套餐用户", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            // WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
            // WndManager.root.main.protocol.shopping(2);
            this.chargeScene.shopping(2);
        }
    };
    PackScene.prototype.HandleBtnPackMonthClick = function (e) {
        if (WndManager.root.main.dataManager.MyPlayer.PackLeftTime > 0) {
            WndManager.root.notifyWnd.show("您已经是套餐用户", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            // WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
            // WndManager.root.main.protocol.shopping(3);
            this.chargeScene.shopping(3);
        }
    };
    PackScene.prototype.release = function () {
        this.btnPackDay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnPackDayClick, this);
        this.btnPackWeek.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnPackWeekClick, this);
        this.btnPackMonth.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBtnPackMonthClick, this);
    };
    PackScene.prototype.onShopping = function (e) {
        this.chargeScene.onShopping(e);
    };
    return PackScene;
}(WinBase));
__reflect(PackScene.prototype, "PackScene");
//# sourceMappingURL=PackScene.js.map