var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene5 = (function (_super) {
    __extends(PromotionScene5, _super);
    function PromotionScene5(promotionScene4) {
        var _this = _super.call(this) || this;
        _this.promotionScene4 = promotionScene4;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd5.exml";
        return _this;
    }
    PromotionScene5.prototype.onComplete = function () {
        this.init();
    };
    PromotionScene5.prototype.init = function () {
        this.initData();
        this.initListener();
    };
    PromotionScene5.prototype.initData = function () {
        this.inputCnum.prompt = "可提现" + WndManager.root.main.dataManager.MyPlayer.income + "元";
        this.inputCnum.text = "";
        this.inputBankname.text = "";
        this.inputAccoutno.text = "";
        this.inputAccoutname.text = "";
    };
    PromotionScene5.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
    };
    PromotionScene5.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
        this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
    };
    PromotionScene5.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene5.prototype.HandleSubmitClick = function (e) {
        var inp = Number(this.inputCnum.text);
        var inpstr = String(inp * 100);
        if (!MyUtils.checkStringIsNotNulll(inpstr)) {
            WndManager.root.notifyWnd.show("请输入提现金额", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            var rb = /^\d+(\.\d{1,2})?$/;
            if (rb.test(this.inputCnum.text) == false) {
                WndManager.root.notifyWnd.show("请正确输入提取金额", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
        }
        if (inp < WndManager.root.main.dataManager.SystemData.withdrawminimum) {
            WndManager.root.notifyWnd.show("最低可提现" + WndManager.root.main.dataManager.SystemData.withdrawminimum + "元", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputBankname.text)) {
            WndManager.root.notifyWnd.show("请输入开户银行名字", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputAccoutno.text)) {
            WndManager.root.notifyWnd.show("请输入银行卡号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputAccoutname.text)) {
            WndManager.root.notifyWnd.show("请输入银行户名", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        //提交
        WndManager.root.main.protocol.addEventListener("onWithdrawApply", this.onWithdrawApply, this);
        WndManager.root.main.protocol.withdrawApply(inpstr, this.inputBankname.text, this.inputAccoutno.text, this.inputAccoutname.text);
    };
    PromotionScene5.prototype.onWithdrawApply = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            var retValue = Number(ret);
            if (retValue > 0) {
                WndManager.root.main.dataManager.MyPlayer.income = (Number(retValue) / 100);
                WndManager.root.notifyWnd.show("提交成功", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                this.promotionScene4.initData();
                this.visible = false;
            }
            else {
                switch (retValue) {
                    case -1:
                        WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -2:
                        WndManager.root.notifyWnd.show("提现金额错误", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -3:
                        WndManager.root.notifyWnd.show("请正确填写开户银行名称", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -4:
                        WndManager.root.notifyWnd.show("请正确填写开户银行卡号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -5:
                        WndManager.root.notifyWnd.show("请正确填写开户人姓名", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -6:
                        WndManager.root.notifyWnd.show("您不是推广员，不可以提现", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -7:
                        WndManager.root.notifyWnd.show("提现金额超出账户余额", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -8:
                        WndManager.root.notifyWnd.show("当前不是提现时间", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                }
            }
        }
        else {
            WndManager.root.notifyWnd.show("提交上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    PromotionScene5.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene5;
}(WinBase));
__reflect(PromotionScene5.prototype, "PromotionScene5");
//# sourceMappingURL=PromotionScene5.js.map