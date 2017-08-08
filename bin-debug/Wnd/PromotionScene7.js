var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene7 = (function (_super) {
    __extends(PromotionScene7, _super);
    function PromotionScene7() {
        var _this = _super.call(this) || this;
        _this.withdrawData = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd7.exml";
        return _this;
    }
    PromotionScene7.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    PromotionScene7.prototype.init = function () {
    };
    PromotionScene7.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene7.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene7.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene7.prototype.initData = function () {
        if (null != this.withdrawData) {
            this.lTime11.text = this.withdrawData.time1;
            this.lTime12.text = this.lTime11.text;
            this.lTime2.text = this.withdrawData.time2;
            this.lTime3.text = this.withdrawData.time3;
            this.lTime4.text = this.withdrawData.time4;
            var cNub = (Number(this.withdrawData.cnum) / 100);
            this.lCnum.text = "" + cNub;
            var status = Number(this.withdrawData.status);
            this.imgStatus1.visible = MyUtils.checkStringIsNotNulll(this.lTime11.text);
            this.imgStatus2.visible = MyUtils.checkStringIsNotNulll(this.lTime12.text);
            this.imgStatus3.visible = (status == 3 || status == 4);
            if (status == 3) {
                this.lStatus3.text = "提现成功";
            }
            else if (status == 4) {
                this.lStatus3.text = "提现失败";
            }
            this.lBankname.text = this.withdrawData.bankname;
            this.lAccountno.text = this.withdrawData.accoutno;
        }
    };
    PromotionScene7.prototype.show = function (value, withdrawData) {
        this.withdrawData = withdrawData;
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene7;
}(WinBase));
__reflect(PromotionScene7.prototype, "PromotionScene7");
//# sourceMappingURL=PromotionScene7.js.map