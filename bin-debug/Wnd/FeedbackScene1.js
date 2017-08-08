/*反馈成功 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FeedbackScene1 = (function (_super) {
    __extends(FeedbackScene1, _super);
    function FeedbackScene1(myInfoScene) {
        var _this = _super.call(this) || this;
        _this.myInfoScene = myInfoScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/FeedbackWnd1.exml";
        return _this;
    }
    FeedbackScene1.prototype.onComplete = function () {
        this.init();
    };
    FeedbackScene1.prototype.init = function () {
        this.initListener();
    };
    FeedbackScene1.prototype.initListener = function () {
        this.rectShowList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleShowListClick, this);
        this.rectShowList1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleShowListClick, this);
    };
    FeedbackScene1.prototype.release = function () {
        this.rectShowList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleShowListClick, this);
        this.rectShowList1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleShowListClick, this);
    };
    //显示我之前的反馈
    FeedbackScene1.prototype.HandleShowListClick = function (e) {
        this.visible = false;
        this.myInfoScene.showSubScene(5);
    };
    return FeedbackScene1;
}(WinBase));
__reflect(FeedbackScene1.prototype, "FeedbackScene1");
//# sourceMappingURL=FeedbackScene1.js.map