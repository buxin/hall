/*反馈成功 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FeedbackScene2 = (function (_super) {
    __extends(FeedbackScene2, _super);
    function FeedbackScene2(myInfoScene) {
        var _this = _super.call(this) || this;
        _this.myInfoScene = myInfoScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/FeedbackWnd2.exml";
        return _this;
    }
    FeedbackScene2.prototype.onComplete = function () {
        this.init();
    };
    FeedbackScene2.prototype.init = function () {
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.itemRenderer = FeedbackItemRender;
        this.scroller.viewport = this.dataList;
        this.initListener();
    };
    FeedbackScene2.prototype.initListener = function () {
        this.rectFeedback.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleFeedbackClick, this);
    };
    FeedbackScene2.prototype.release = function () {
        this.rectFeedback.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleFeedbackClick, this);
    };
    //提交反馈
    FeedbackScene2.prototype.HandleFeedbackClick = function (e) {
        this.visible = false;
        this.myInfoScene.showSubScene(0);
    };
    FeedbackScene2.prototype.initData = function () {
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.MyPlayer.feedbackArr);
    };
    FeedbackScene2.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return FeedbackScene2;
}(WinBase));
__reflect(FeedbackScene2.prototype, "FeedbackScene2");
//# sourceMappingURL=FeedbackScene2.js.map