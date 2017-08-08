var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimeFormat = (function () {
    function TimeFormat(time) {
        this.getTimeData(time);
    }
    TimeFormat.prototype.getTimeData = function (time) {
        var date = new Date(time);
        var mon = date.getMonth() + 1; //月份从0开始
        this.month = (mon < 10 ? "0" : "") + mon;
        this.days = date.getDate();
        var h = date.getHours();
        this.hours = (h < 10 ? "0" : "") + h;
        var m = date.getMinutes();
        this.minutes = (m < 10 ? "0" : "") + m;
    };
    Object.defineProperty(TimeFormat.prototype, "Month", {
        get: function () {
            return this.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFormat.prototype, "Days", {
        get: function () {
            return this.days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFormat.prototype, "Hours", {
        get: function () {
            return this.hours;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeFormat.prototype, "Minutes", {
        get: function () {
            return this.minutes;
        },
        enumerable: true,
        configurable: true
    });
    TimeFormat.prototype.isSameDays = function (tf) {
        if (null != tf && tf.Month == this.Month && tf.Days == this.Days)
            return true;
        else
            return false;
    };
    return TimeFormat;
}());
__reflect(TimeFormat.prototype, "TimeFormat");
//# sourceMappingURL=TimeFormat.js.map