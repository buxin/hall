/*反馈 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FeedbackScene = (function (_super) {
    __extends(FeedbackScene, _super);
    function FeedbackScene(myInfoScene) {
        var _this = _super.call(this) || this;
        _this.questionType = 0;
        _this.upNum = 0;
        _this.imgNameArr = [];
        _this.myInfoScene = myInfoScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/FeedbackWnd.exml";
        return _this;
    }
    FeedbackScene.prototype.onComplete = function () {
        this.init();
    };
    FeedbackScene.prototype.init = function () {
        this.initData();
        this.initListener();
    };
    FeedbackScene.prototype.initData = function () {
        this.inputName.prompt = "请输入您的姓名";
        this.inputPhone.prompt = "请输入您的手机号";
        this.inputFeedback.prompt = "请输入您要反馈的问题";
        this.inputFeedback.textDisplay.multiline = true;
    };
    FeedbackScene.prototype.initListener = function () {
        this.rectTouch1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect1Click, this);
        this.rectTouch2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect2Click, this);
        this.rectTouch3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect3Click, this);
        this.rectTouch4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect4Click, this);
        this.rectTouch5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect5Click, this);
        this.rectTouch6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect6Click, this);
        this.btnSelImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelectImgClick, this);
        this.rectSubmit.once(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
        this.rectShowList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleShowListClick, this);
    };
    FeedbackScene.prototype.release = function () {
        this.rectTouch1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect1Click, this);
        this.rectTouch2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect2Click, this);
        this.rectTouch3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect3Click, this);
        this.rectTouch4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect4Click, this);
        this.rectTouch5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect5Click, this);
        this.rectTouch6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelect6Click, this);
        this.btnSelImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSelectImgClick, this);
        this.rectSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleSubmitClick, this);
        this.rectShowList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleShowListClick, this);
    };
    //反馈问题1
    FeedbackScene.prototype.HandleSelect1Click = function (e) {
        this.questionType = 1;
        this.updateSelectShow();
    };
    //反馈问题2
    FeedbackScene.prototype.HandleSelect2Click = function (e) {
        this.questionType = 2;
        this.updateSelectShow();
    };
    //反馈问题3
    FeedbackScene.prototype.HandleSelect3Click = function (e) {
        this.questionType = 3;
        this.updateSelectShow();
    };
    //反馈问题4
    FeedbackScene.prototype.HandleSelect4Click = function (e) {
        this.questionType = 4;
        this.updateSelectShow();
    };
    //反馈问题5
    FeedbackScene.prototype.HandleSelect5Click = function (e) {
        this.questionType = 5;
        this.updateSelectShow();
    };
    //反馈问题6
    FeedbackScene.prototype.HandleSelect6Click = function (e) {
        this.questionType = 6;
        this.updateSelectShow();
    };
    //选择图片
    FeedbackScene.prototype.HandleSelectImgClick = function () {
        selectImage(this.selectedHandler, this);
    };
    //提交
    FeedbackScene.prototype.HandleSubmitClick = function () {
        if (!MyUtils.checkStringIsNotNulll(this.inputName.text)) {
            WndManager.root.notifyWnd.show("请输入您的姓名", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputPhone.text)) {
            WndManager.root.notifyWnd.show("请输入您的手机号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        else {
            // var rb: RegExp = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            // if (rb.test(this.inputPhone.text) == false)
            if (!MyUtils.verifyPhone(this.inputPhone.text)) {
                WndManager.root.notifyWnd.show("请正确输入您的手机号", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
        }
        if (!MyUtils.checkStringIsNotNulll(this.inputFeedback.text)) {
            WndManager.root.notifyWnd.show("请输入您要反馈的问题", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        if (this.questionType == 0) {
            WndManager.root.notifyWnd.show("请选择反馈的类型", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            return;
        }
        //提交数据，等服务器真正接口
        //提交图片
        //this.base = this.uploadImg.texture.toDataURL("image/jpeg");
        WndManager.root.main.protocol.addEventListener("Onfeedback", this.Onfeedback, this);
        WndManager.root.main.protocol.feedback(this.inputName.text, this.inputPhone.text, this.inputFeedback.text, this.questionType, this.img1Name, this.img2Name, this.img3Name, this.img4Name);
    };
    FeedbackScene.prototype.Onfeedback = function (e) {
        var ret = e.data;
        if (ret == "1") {
            this.visible = false;
            this.myInfoScene.showSubScene(4);
        }
        else {
            WndManager.root.notifyWnd.show("上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    FeedbackScene.prototype.updateSelectShow = function () {
        this.imgSelect1.visible = (this.questionType == 1);
        this.imgSelect2.visible = (this.questionType == 2);
        this.imgSelect3.visible = (this.questionType == 3);
        this.imgSelect4.visible = (this.questionType == 4);
        this.imgSelect5.visible = (this.questionType == 5);
        this.imgSelect6.visible = (this.questionType == 6);
    };
    FeedbackScene.prototype.selectedHandler = function (thisRef, imgURL, file) {
        //alert("img selected"+imgURL);
        RES.getResByUrl(imgURL, thisRef.compFunc, thisRef, RES.ResourceItem.TYPE_IMAGE);
        //getImageData(file,thisRef.bytesHandler,thisRef);
    };
    FeedbackScene.prototype.compFunc = function (texture) {
        if (this.upNum < 4)
            this.upNum = this.upNum + 1;
        else
            WndManager.root.notifyWnd.show("最多只能选择4张图片", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        switch (this.upNum) {
            case 1:
                this.uploadImg.source = texture;
                this.uploadImg.x = this.btnSelImg.x;
                this.uploadImg.y = this.btnSelImg.y;
                this.btnSelImg.x = 246;
                this.btnSelImg.y = 604;
                this.upload(texture);
                break;
            case 2:
                this.uploadImg0.source = texture;
                this.uploadImg0.x = this.btnSelImg.x;
                this.uploadImg0.y = this.btnSelImg.y;
                this.btnSelImg.x = 430;
                this.btnSelImg.y = 604;
                this.upload(texture);
                break;
            case 3:
                this.uploadImg1.source = texture;
                this.uploadImg1.scaleX = 0.7;
                this.uploadImg1.scaleY = 0.7;
                this.uploadImg0.scaleX = 0.7;
                this.uploadImg0.scaleY = 0.7;
                this.uploadImg2.scaleX = 0.7;
                this.uploadImg.scaleY = 0.7;
                this.uploadImg.scaleX = 0.7;
                this.uploadImg1.scaleY = 0.7;
                this.uploadImg.x = 44;
                this.uploadImg0.x = 177;
                this.uploadImg1.x = 310;
                this.uploadImg0.y = 630;
                this.uploadImg.y = 630;
                this.uploadImg1.y = 630;
                this.btnSelImg.x = 430;
                this.btnSelImg.y = 604;
                this.upload(texture);
                break;
            case 4:
                this.uploadImg2.source = texture;
                this.uploadImg2.scaleX = 0.7;
                this.uploadImg2.scaleY = 0.7;
                this.uploadImg2.x = 443;
                this.uploadImg2.y = 630;
                this.btnSelImg.visible = false;
                this.upload(texture);
                break;
        }
    };
    FeedbackScene.prototype.upload = function (texture) {
        this.base = texture.toDataURL("image/jpeg");
        WndManager.root.main.protocol.once("onUpload", this.onUpload, this);
        WndManager.root.main.protocol.onUpload(this.base);
    };
    FeedbackScene.prototype.onUpload = function (e) {
        var imgName = e.data;
        if (MyUtils.checkStringIsNotNulll(imgName)) {
            this.imgNameArr.push(imgName);
            if (this.imgNameArr.length == 1) {
                this.img1Name = imgName;
            }
            if (this.imgNameArr.length == 2) {
                this.img2Name = imgName;
            }
            if (this.imgNameArr.length == 3) {
                this.img3Name = imgName;
            }
            if (this.imgNameArr.length == 4) {
                this.img4Name = imgName;
            }
        }
    };
    FeedbackScene.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initListener();
            this.imgNameArr = [];
            this.img1Name = "";
            this.img2Name = "";
            this.img3Name = "";
            this.img4Name = "";
            this.inputName.prompt = "请输入您的姓名";
            this.inputPhone.prompt = "请输入您的手机号";
            this.inputFeedback.prompt = "请输入您要反馈的问题";
            this.inputName.text = "";
            this.inputPhone.text = "";
            this.inputFeedback.text = "";
            this.questionType = 0;
            this.updateSelectShow();
            this.btnSelImg.visible = true;
            this.btnSelImg.x = 40;
            this.btnSelImg.y = 600;
            this.uploadImg.source = "";
            this.uploadImg0.source = "";
            this.uploadImg1.source = "";
            this.uploadImg2.source = "";
            this.uploadImg.x = 246;
            this.uploadImg0.x = 430;
            this.uploadImg1.x = 246;
            this.uploadImg2.x = 246;
            this.uploadImg.y = 604;
            this.uploadImg0.y = 604;
            this.uploadImg1.y = 604;
            this.uploadImg2.y = 604;
            this.upNum = 0;
            this.uploadImg.scaleX = 1;
            this.uploadImg0.scaleX = 1;
            this.uploadImg1.scaleX = 1;
            this.uploadImg2.scaleX = 1;
            this.uploadImg.scaleY = 1;
            this.uploadImg0.scaleY = 1;
            this.uploadImg1.scaleY = 1;
            this.uploadImg2.scaleY = 1;
        }
    };
    //显示我之前的反馈
    FeedbackScene.prototype.HandleShowListClick = function (e) {
        this.visible = false;
        this.myInfoScene.showSubScene(5);
    };
    return FeedbackScene;
}(WinBase));
__reflect(FeedbackScene.prototype, "FeedbackScene");
//# sourceMappingURL=FeedbackScene.js.map