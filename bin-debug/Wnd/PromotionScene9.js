var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PromotionScene9 = (function (_super) {
    __extends(PromotionScene9, _super);
    function PromotionScene9() {
        var _this = _super.call(this) || this;
        _this.monthNum = 0;
        _this.nextMonthNum = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd9.exml";
        return _this;
    }
    PromotionScene9.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    PromotionScene9.prototype.init = function () {
        this.Rightbnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this._right, this);
        this.Leftbnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this._left, this);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList1.itemRenderer = IncomeItemRender;
        this.scroller.viewport = this.dataList1;
    };
    PromotionScene9.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene9.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene9.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene9.prototype._right = function () {
        this.nextMonthNum -= 1;
        if (this.nextMonthNum < 0) {
            this.nextMonthNum = 0;
            this.Rightbnt.touchEnabled = false;
        }
        if (this.nextMonthNum != this.monthNum) {
            this.monthNum = this.nextMonthNum;
            WndManager.root.main.protocol.addEventListener("ongetincomes1", this.ongetincomes, this);
            WndManager.root.main.protocol.getincomes1(this.monthNum);
        }
    };
    PromotionScene9.prototype._left = function () {
        this.nextMonthNum += 1;
        if (this.nextMonthNum > 3) {
            this.nextMonthNum = 3;
            this.Leftbnt.touchEnabled = false;
        }
        if (this.nextMonthNum != this.monthNum) {
            this.monthNum = this.nextMonthNum;
            WndManager.root.main.protocol.addEventListener("ongetincomes1", this.ongetincomes, this);
            WndManager.root.main.protocol.getincomes1(this.monthNum);
        }
    };
    PromotionScene9.prototype.ongetincomes = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            if (ret == "-1") {
                WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            if (ret == "-2") {
                WndManager.root.notifyWnd.show("你不是推广员", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            if (ret == "-3") {
                WndManager.root.notifyWnd.show("查询类型不对", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                return;
            }
            var jsObjArr = JSON.parse(ret);
            if (null != jsObjArr) {
                WndManager.root.main.dataManager.MyPlayer.incomeArr = jsObjArr.incomeList;
                var year = jsObjArr.year;
                var month = jsObjArr.month;
                WndManager.root.main.dataManager.MyPlayer.income = (Number(jsObjArr.income) / 100);
                this.initData();
                this.yuefen.text = month + "月明细";
                this.riqi.text = year + ".0" + month;
                this.zongjin.text = "" + WndManager.root.main.dataManager.MyPlayer.income;
                this.Leftbnt.touchEnabled = true;
                this.Rightbnt.touchEnabled = true;
            }
        }
        else {
            WndManager.root.notifyWnd.show("提交上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    PromotionScene9.prototype.initData = function () {
        this.dataList1.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.MyPlayer.incomeArr);
    };
    PromotionScene9.prototype.show = function (value, year, month) {
        this.visible = value;
        if (value) {
            this.initData();
            this.yuefen.text = month + "月明细";
            this.riqi.text = year + ".0" + month;
            this.zongjin.text = "" + WndManager.root.main.dataManager.MyPlayer.income;
        }
    };
    return PromotionScene9;
}(WinBase));
__reflect(PromotionScene9.prototype, "PromotionScene9");
//# sourceMappingURL=PromotionScene9.js.map