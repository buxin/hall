/*抽奖界面 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawScene = (function (_super) {
    __extends(DrawScene, _super);
    function DrawScene(dis) {
        var _this = _super.call(this) || this;
        _this.drisArr = [];
        _this.drisPosArr = [36, 304, 36 + 142, 304, 36 + 142 * 2, 304, 36 + 142 * 3, 304,
            36 + 142 * 3, 304 + 113,
            36 + 142 * 3, 304 + 113 * 2, 36 + 142 * 2, 304 + 113 * 2, 36 + 142, 304 + 113 * 2, 36, 304 + 113 * 2,
            36, 304 + 113];
        _this.moveTimes = 0;
        _this.selectId = 0;
        _this.winId = -1;
        _this.dis = dis;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/DrawWnd.exml";
        return _this;
    }
    DrawScene.prototype.onComplete = function () {
        this.init();
    };
    DrawScene.prototype.init = function () {
        this.initUI();
        this.initData();
        this.initListener();
    };
    DrawScene.prototype.initUI = function () {
        var rewardArr = WndManager.root.main.dataManager.DrawData.RewardArr;
        var len = this.drisPosArr.length >> 1;
        for (var i = 0; i < rewardArr.length && i < len; i++) {
            var dris = new DrawRewardItemScene(rewardArr[i]);
            dris.x = this.drisPosArr[i * 2];
            dris.y = this.drisPosArr[i * 2 + 1];
            this.addChild(dris);
            this.drisArr.push(dris);
        }
        this.resetLights();
        this.setDrisArrSelected(-1);
        this.imgAvatar.mask = this.rectMask;
    };
    DrawScene.prototype.setDrisArrSelected = function (value) {
        for (var i = 0; i < this.drisArr.length; i++) {
            this.drisArr[i].setRectSelectVisible(value == i);
        }
    };
    DrawScene.prototype.resetLights = function () {
        this.g1.visible = true;
        this.g2.visible = false;
    };
    DrawScene.prototype.initData = function () {
        this.imgAvatar.source = WndManager.root.main.dataManager.MyPlayer.Avatar;
        this.lName.text = WndManager.root.main.dataManager.MyPlayer.Name;
        this.lDrawPrice.text = WndManager.root.main.dataManager.DrawData.DrawPrice.toString() + "钻1次";
        this.resetData();
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.DrawData.getDrawInfo());
        this.dataList.itemRenderer = DrawInfoItemRender;
        this.scroller.viewport = this.dataList;
    };
    DrawScene.prototype.resetData = function () {
        this.moveTimes = 0;
        this.selectId = 0;
        this.winId = -1;
    };
    DrawScene.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBackClick, this);
        this.rectDraw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleDrawClick, this);
    };
    DrawScene.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBackClick, this);
        this.rectDraw.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleDrawClick, this);
    };
    //返回
    DrawScene.prototype.HandleBackClick = function (e) {
        this.visible = false;
        this.dis.agindis();
    };
    //抽奖
    DrawScene.prototype.HandleDrawClick = function (e) {
        console.log("抽奖开始");
        this.rectDraw.touchEnabled = false;
        this.setBottomClicked(false);
        WndManager.root.main.dataManager.DrawData.Result = 0;
        WndManager.root.main.protocol.addEventListener("Ondraw", this.Ondraw, this);
        WndManager.root.main.protocol.draw();
        //this.winId = Math.floor(Math.random()*this.drisArr.length);
        //this.playDrawAni(this.winId);
    };
    DrawScene.prototype.Ondraw = function () {
        WndManager.root.main.protocol.addEventListener("onzuanshiNum", this.onzuanshiNum, this);
        WndManager.root.main.protocol.zuanshiNum();
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.DrawData.getDrawInfo());
        if (WndManager.root.main.dataManager.DrawData.Result == 1) {
            this.winId = WndManager.root.main.dataManager.DrawData.Idx;
            this.playDrawAni(this.winId);
        }
        else if (WndManager.root.main.dataManager.DrawData.Result == -1) {
            WndManager.root.notifyWnd.show("钻石不足，请充值", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    DrawScene.prototype.onzuanshiNum = function () {
    };
    DrawScene.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.resetLights();
            this.setDrisArrSelected(-1);
            this.resetData();
        }
    };
    DrawScene.prototype.playDrawAni = function (value) {
        this.moveTimes = this.getMoveTimes(value);
        this.setDrisArrSelected(this.selectId);
        this.tweenGDraw = egret.Tween.get(this.gDraw, { loop: true });
        this.tweenGDraw.to({ scaleX: 0.8, scaleY: 0.8 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        this.rotate();
    };
    DrawScene.prototype.rotate = function () {
        var _this = this;
        if (this.moveTimes > 0) {
            this.selectId = (this.selectId + 1) % this.drisArr.length;
            var time = 50;
            if (this.moveTimes < 8)
                time = 100;
            this.g1.visible = (this.moveTimes % 2 == 1);
            this.g2.visible = (this.moveTimes % 2 == 0);
            egret.setTimeout(function () {
                _this.setDrisArrSelected(_this.selectId);
                _this.rotate();
            }, this, time);
            this.moveTimes--;
        }
        else {
            console.log("抽奖结束");
            this.tweenGDraw.pause();
            this.tweenGDraw = null;
            if (WndManager.root.main.dataManager.DrawData.RewardArr[this.winId] > 0) {
                var str = "恭喜获得" + WndManager.root.main.dataManager.DrawData.RewardArr[this.winId] + "钻";
                WndManager.root.notifyWnd.show(str, 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            }
            else {
                WndManager.root.notifyWnd.show("长得这么帅下次肯定会中哦！", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
            }
            this.resetData();
            this.rectDraw.touchEnabled = true;
            this.setBottomClicked(true);
        }
    };
    DrawScene.prototype.getMoveTimes = function (value) {
        return 100 + value;
    };
    DrawScene.prototype.setBottomClicked = function (value) {
        var event = new egret.Event("bottomClickStatus", true, false, value);
        this.dispatchEvent(event);
    };
    return DrawScene;
}(WinBase));
__reflect(DrawScene.prototype, "DrawScene");
//# sourceMappingURL=DrawScene.js.map