/*加盟 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JoinScene = (function (_super) {
    __extends(JoinScene, _super);
    function JoinScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/JoinWnd.exml";
        return _this;
    }
    JoinScene.prototype.onComplete = function () {
        this.init();
    };
    JoinScene.prototype.init = function () {
        this.initData();
        this.initListener();
    };
    JoinScene.prototype.initData = function () {
        this.inputName.prompt = "请输入您的姓名";
        this.inputPhone.prompt = "请输入您的手机号";
        this.inputArea.prompt = "请输入您的省份地址";
        this.inputExplanation.prompt = "请描述您加盟本平台的优势";
        this.inputExplanation.textDisplay.multiline = true;
    };
    JoinScene.prototype.initListener = function () {
        this.rectTouch.once(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
    };
    JoinScene.prototype.release = function () {
        this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
    };
    JoinScene.prototype.HandleSubmitClick = function (e) {
        if (!MyUtils.checkStringIsNotNulll(this.inputName.text)) {
            WndManager.root.notifyWnd.show("请输入您的姓名", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputPhone.text)) {
            WndManager.root.notifyWnd.show("请输入您的手机号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            var rb = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (rb.test(this.inputPhone.text) == false) {
                WndManager.root.notifyWnd.show("请正确输入您的手机号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputArea.text)) {
            WndManager.root.notifyWnd.show("请输入您的省份地址", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputExplanation.text)) {
            WndManager.root.notifyWnd.show("请描述您加盟本平台的优势", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        //提交
        WndManager.root.main.protocol.addEventListener("OnJoinback", this.OnJoinback, this);
        WndManager.root.main.protocol.Joinback(this.inputName.text, this.inputPhone.text, this.inputArea.text, this.inputExplanation.text);
    };
    JoinScene.prototype.OnJoinback = function (e) {
        var ret = e.data;
        if (ret == "1") {
            WndManager.root.notifyWnd.show("申请成功,我们会尽快和您联系！", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
        else {
            WndManager.root.notifyWnd.show("上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    JoinScene.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initListener();
        }
    };
    return JoinScene;
}(WinBase));
__reflect(JoinScene.prototype, "JoinScene");
//# sourceMappingURL=JoinScene.js.map