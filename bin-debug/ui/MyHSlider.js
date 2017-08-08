var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyHSlider = (function (_super) {
    __extends(MyHSlider, _super);
    function MyHSlider(stepNum) {
        if (stepNum === void 0) { stepNum = 1; }
        var _this = _super.call(this) || this;
        _this.stepNum = 0;
        _this.checkPointArr = [];
        _this.pressThumb = false;
        _this.radiusThumb = 0;
        _this.stepNum = stepNum;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/MyHSliderWnd.exml";
        return _this;
    }
    MyHSlider.prototype.onComplete = function () {
        this.init();
        this.initCheckPoints();
    };
    MyHSlider.prototype.init = function () {
        this.rectFront.mask = this.rectMask;
        this.rectMask.scaleX = 0;
        this.initListener();
    };
    MyHSlider.prototype.initListener = function () {
        this.rectTouch.touchEnabled = true;
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onControlMe, this);
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_END, this.onControlMe, this);
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlMe, this);
    };
    MyHSlider.prototype.initCheckPoints = function () {
        console.log("宽度" + this.rectFront.width + " x:" + this.rectFront.x);
        this.radiusThumb = this.myThumb.width >> 1;
        var stepDuration = Math.floor(this.rectFront.width / (this.stepNum - 1));
        for (var i = 0; i < this.stepNum; i++) {
            var checkPointX = this.radiusThumb + i * stepDuration;
            this.checkPointArr.push(checkPointX);
        }
    };
    MyHSlider.prototype.onControlMe = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (event.localX > this.myThumb.x && event.localX < this.myThumb.x + this.myThumb.width
                && event.localY > this.myThumb.y && event.localY < this.myThumb.x + this.myThumb.height)
                //console.log("滑动锁定");
                this.pressThumb = true;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
            //console.log("滑动位置"+event.localX);
            this.updateSliderShow(event.localX);
            this.pressThumb = false;
        }
        else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            //console.log("滑动位置"+event.localX);
            this.updateSliderShow(event.localX);
        }
    };
    MyHSlider.prototype.updateSliderShow = function (slideX) {
        var checkPointId = -1;
        for (var i = this.checkPointArr.length; i >= 0; i--) {
            if (slideX >= this.checkPointArr[i]) {
                this.rectMask.scaleX = (this.checkPointArr[i] - this.radiusThumb) / this.rectFront.width;
                this.myThumb.x = this.checkPointArr[i] - this.radiusThumb;
                var event = new egret.Event("updateSlider", true, false, i);
                this.dispatchEvent(event);
                return;
            }
        }
    };
    MyHSlider.prototype.releaseListener = function () {
        this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onControlMe, this);
        this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_END, this.onControlMe, this);
        this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlMe, this);
    };
    return MyHSlider;
}(WinBase));
__reflect(MyHSlider.prototype, "MyHSlider");
//# sourceMappingURL=MyHSlider.js.map