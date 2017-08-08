var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TimerCount = (function (_super) {
    __extends(TimerCount, _super);
    function TimerCount(delay, repeatCount, showCount) {
        var _this = _super.call(this) || this;
        _this.showCount = showCount;
        if (_this.showCount) {
        }
        _this.leftTimes = repeatCount;
        //创建一个计时器对象
        _this.timer = new egret.Timer(delay, repeatCount);
        //注册事件侦听器
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunc, _this);
        //开始计时
        _this.timer.start();
        return _this;
    }
    TimerCount.prototype.timerFunc = function () {
        //console.log("计时");
        if (this.showCount) {
        }
        this.leftTimes--;
        this.dispatchEvent(new egret.Event("count_update", true, false, this.leftTimes));
    };
    TimerCount.prototype.timerComFunc = function () {
        //console.log("计时结束");
        this.dispatchEvent(new egret.Event("count_finish", true));
    };
    return TimerCount;
}(egret.DisplayObjectContainer));
__reflect(TimerCount.prototype, "TimerCount");
//# sourceMappingURL=TimerCount.js.map