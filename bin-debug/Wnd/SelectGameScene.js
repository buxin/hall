var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectGameScene = (function (_super) {
    __extends(SelectGameScene, _super);
    function SelectGameScene() {
        var _this = _super.call(this) || this;
        _this.cutOffPointArr = [];
        _this.gameType = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/SelectGame1Wnd.exml";
        return _this;
    }
    SelectGameScene.prototype.onComplete = function () {
        this.initListener();
    };
    SelectGameScene.prototype.init = function () {
        this.lTIme.text = this.currentGameSetting.timeArr[this.currentGameSetting.TimeId] + "分钟";
        this.lTitle.text = WndManager.root.main.dataManager.MyPlayer.Name + "-" + this.currentGameSetting.gameName;
        // this.timeSlider = new MyHSlider(3);
        // this.timeSlider.x  = 165;
        // this.timeSlider.y = 426;
        // this.addChild(this.timeSlider);
        this.timeSlider.addEventListener(egret.Event.CHANGE, this.onControlMe, this);
        // this.timeSlider.addEventListener(egret.TouchEvent.ENTER_FRAME,this.onControlMe,this)
        // console.log("宽度"+this.timeSlider.width+" x:"+this.timeSlider.thumb.x);
        this.timeSlider.maximum = 100;
        this.timeSlider.minimum = 0;
    };
    SelectGameScene.prototype.getCutOffPointArr = function () {
        var len = this.currentGameSetting.timeArr.length;
        var average = Math.floor(100 / (len - 1));
        for (var i = 0; i < len; i++) {
            var cutOffPoint = i * average;
            if (i == len - 1)
                cutOffPoint = 100;
            this.cutOffPointArr.push(cutOffPoint);
        }
    };
    SelectGameScene.prototype.onControlMe = function (event) {
        // console.log("宽度"+this.timeSlider.width+" x:"+this.timeSlider.thumb.x);
        for (var i = 0; i < this.cutOffPointArr.length; i++) {
            if (i < this.cutOffPointArr.length - 1) {
                if (this.timeSlider.value >= this.cutOffPointArr[i] && this.timeSlider.value < this.cutOffPointArr[i + 1])
                    this.currentGameSetting.TimeId = i;
            }
            else {
                if (this.timeSlider.value == this.cutOffPointArr[i])
                    this.currentGameSetting.TimeId = i;
            }
        }
        // if(this.timeSlider.value>=0&& this.timeSlider.value<50){
        // WndManager.root.main.dataManager.GameSetting1.TimeId=0
        // }
        // if(this.timeSlider.value >=50 && this.timeSlider.value<100){
        // WndManager.root.main.dataManager.GameSetting1.TimeId=1
        // }
        // if(this.timeSlider.value ==100){
        // WndManager.root.main.dataManager.GameSetting1.TimeId=2
        // }
        this.lTIme.text = this.currentGameSetting.timeArr[this.currentGameSetting.TimeId] + "分钟";
        this.lTitle.text = WndManager.root.main.dataManager.MyPlayer.Name + "-" + this.currentGameSetting.gameName;
    };
    SelectGameScene.prototype.initListener = function () {
        this.addEventListener("updateSlider", this.updateSliderShow, this);
        this.checkRect0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelect0Click, this);
        this.checkRect1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelect1Click, this);
        this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleYesBtnClick, this);
        this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleNoBtnClick, this);
        this.closeRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleCloseBtnClick, this);
    };
    SelectGameScene.prototype.updateSliderShow = function (e) {
        this.currentGameSetting.TimeId = Number(e.data);
        this.lTIme.text = this.currentGameSetting.timeArr[this.currentGameSetting.TimeId] + "分钟";
    };
    SelectGameScene.prototype.showSelectGameScene = function (value, gameType) {
        this.visible = value;
        this.gameType = gameType;
        //初始化
        if (value) {
            this.currentGameSetting = WndManager.root.main.dataManager.SystemData.getGameSetting(gameType - 1);
            if (null != this.currentGameSetting) {
                this.getCutOffPointArr();
                this.init();
                //if(this.gameType == GameConstant.GAME_TYPE_MAJIANG || this.gameType == GameConstant.GAME_TYPE_NIUNIU)
                if (this.gameType == GameConstant.GAME_TYPE_MAJIANG) {
                    this.gSubType.visible = true;
                    this.currentGameSetting.Type = GameConstant.GAME_SUBTYPE1;
                    this.showSubTypeText();
                    this.updateSelectShow();
                }
                else
                    this.gSubType.visible = false;
            }
        }
    };
    SelectGameScene.prototype.showSubTypeText = function () {
        this.text2.visible = (this.gameType == GameConstant.GAME_TYPE_MAJIANG);
        this.text3.visible = (this.gameType == GameConstant.GAME_TYPE_NIUNIU);
    };
    SelectGameScene.prototype.release = function () {
        this.removeEventListener("updateSlider", this.updateSliderShow, this);
        this.checkRect0.touchEnabled = true;
        this.checkRect1.touchEnabled = true;
        this.checkRect0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelect0Click, this);
        this.checkRect1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelect1Click, this);
        this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleYesBtnClick, this);
        this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleNoBtnClick, this);
        this.closeRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleCloseBtnClick, this);
    };
    //选择清12混8
    SelectGameScene.prototype.handleSelect0Click = function (e) {
        if (this.currentGameSetting.Type != GameConstant.GAME_SUBTYPE1) {
            this.currentGameSetting.setType();
            this.updateSelectShow();
        }
    };
    //选择清10混8
    SelectGameScene.prototype.handleSelect1Click = function (e) {
        if (this.currentGameSetting.Type != GameConstant.GAME_SUBTYPE2) {
            this.currentGameSetting.setType();
            this.updateSelectShow();
        }
    };
    SelectGameScene.prototype.updateSelectShow = function () {
        this.imgSelect0.visible = (this.currentGameSetting.Type == GameConstant.GAME_SUBTYPE1);
        this.imgSelect1.visible = (this.currentGameSetting.Type == GameConstant.GAME_SUBTYPE2);
    };
    //确定
    SelectGameScene.prototype.handleYesBtnClick = function (e) {
        if (this.gameType == GameConstant.GAME_TYPE_NIUNIU) {
            WndManager.root.main.protocol.newRoom(this.gameType, 2, this.currentGameSetting.timeArr[this.currentGameSetting.TimeId]);
        }
        else {
            WndManager.root.main.protocol.newRoom(this.gameType, this.currentGameSetting.Type, this.currentGameSetting.timeArr[this.currentGameSetting.TimeId]);
        }
    };
    //取消
    SelectGameScene.prototype.handleNoBtnClick = function (e) {
        this.setVisible(false);
    };
    //关闭
    SelectGameScene.prototype.handleCloseBtnClick = function (e) {
        this.setVisible(false);
    };
    return SelectGameScene;
}(WinBase));
__reflect(SelectGameScene.prototype, "SelectGameScene");
//# sourceMappingURL=SelectGameScene.js.map