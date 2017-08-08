var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene8 = (function (_super) {
    __extends(PromotionScene8, _super);
    function PromotionScene8() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd8.exml";
        return _this;
    }
    PromotionScene8.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    PromotionScene8.prototype.init = function () {
        this.initData();
    };
    PromotionScene8.prototype.initData = function () {
        this.lRule.text = "提现为充值的" + WndManager.root.main.dataManager.SystemData.commission + "%，每周" +
            WndManager.root.main.dataManager.SystemData.getWithdrawWeekDays() + "的" +
            WndManager.root.main.dataManager.SystemData.getWithdrawstarttime() + "-" +
            WndManager.root.main.dataManager.SystemData.getWithdrawendtime() + "为提现时间，最低可提现" +
            WndManager.root.main.dataManager.SystemData.withdrawminimum + "元,有问题可以随时咨询。。。";
    };
    PromotionScene8.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene8.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene8.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene8.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene8;
}(WinBase));
__reflect(PromotionScene8.prototype, "PromotionScene8");
//# sourceMappingURL=PromotionScene8.js.map