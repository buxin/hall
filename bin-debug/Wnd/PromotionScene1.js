var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene1 = (function (_super) {
    __extends(PromotionScene1, _super);
    function PromotionScene1(myInfoScene) {
        var _this = _super.call(this) || this;
        _this.myInfoScene = myInfoScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd1.exml";
        return _this;
    }
    PromotionScene1.prototype.onComplete = function () {
        this.init();
    };
    PromotionScene1.prototype.init = function () {
        this.initData();
        this.initListener();
    };
    PromotionScene1.prototype.initData = function () {
        this.inputName.prompt = "请输入您的姓名";
        this.inputContact.prompt = "请输入您的手机号";
        this.inputGameName.prompt = "请输入您的游戏名称";
        this.inputWechat.prompt = "请输入您的微信号";
        this.inputName.text = "";
        this.inputContact.text = "";
        this.inputGameName.text = "";
        this.inputWechat.text = "";
    };
    PromotionScene1.prototype.initListener = function () {
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene1.prototype.release = function () {
        this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene1.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene1.prototype.HandleSubmitClick = function (e) {
        if (!MyUtils.checkStringIsNotNulll(this.inputName.text)) {
            WndManager.root.notifyWnd.show("请输入您的姓名", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputContact.text)) {
            WndManager.root.notifyWnd.show("请输入您的手机号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            var rb = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (rb.test(this.inputContact.text) == false) {
                WndManager.root.notifyWnd.show("请正确输入您的手机号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputGameName.text)) {
            WndManager.root.notifyWnd.show("请输入您的游戏名称", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputWechat.text)) {
            WndManager.root.notifyWnd.show("请输入您的微信号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        //提交
        WndManager.root.main.protocol.addEventListener("onPromotionApply", this.onPromotionApply, this);
        WndManager.root.main.protocol.promotionApply(this.inputName.text, this.inputContact.text, this.inputGameName.text, this.inputWechat.text);
    };
    PromotionScene1.prototype.onPromotionApply = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            var jsObj = JSON.parse(ret);
            if (jsObj) {
                var code = Number(jsObj.code);
                switch (code) {
                    case -1:
                        WndManager.root.notifyWnd.show("您之前已经提交过申请了，请勿重复提交", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -2:
                        WndManager.root.notifyWnd.show("游戏名重复，请再取名", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -3:
                        WndManager.root.notifyWnd.show("提交资料有缺漏，请填写完整", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -4:
                        WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case 1:
                        WndManager.root.notifyWnd.show("提交成功", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        WndManager.root.main.dataManager.MyPlayer.promotion = new Promotion(jsObj);
                        //跳转到推广页面2
                        this.myInfoScene.jumpPromotionScene2();
                        return;
                }
            }
        }
        else {
            WndManager.root.notifyWnd.show("上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    PromotionScene1.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene1;
}(WinBase));
__reflect(PromotionScene1.prototype, "PromotionScene1");
//# sourceMappingURL=PromotionScene1.js.map