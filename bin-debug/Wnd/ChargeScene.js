var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeScene = (function (_super) {
    __extends(ChargeScene, _super);
    function ChargeScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/ChargeWnd.exml";
        return _this;
    }
    ChargeScene.prototype.onComplete = function () {
        this.init();
    };
    ChargeScene.prototype.init = function () {
        this.playerInfoScene = new PlayerInfoScene(GameConstant.PLAYER_INFO_SCENE_LAYOUT_CHARGE);
        this.playerInfoScene.y = 70;
        this.addChild(this.playerInfoScene);
        this.packScene = new PackScene(this);
        this.packScene.y = 193;
        this.addChild(this.packScene);
        this.chargeResultScene = new ChargeResultScene(this);
        this.chargeResultScene.visible = false;
        this.addChild(this.chargeResultScene);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.ChargeData);
        this.dataList.itemRenderer = ChargeItemRender;
        this.scroller.viewport = this.dataList;
    };
    ChargeScene.prototype.updateData = function () {
        if (null != this.playerInfoScene)
            this.playerInfoScene.updateData();
        if (null != this.packScene)
            this.packScene.updateData();
    };
    ChargeScene.prototype.onShopping = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            var jsObj = JSON.parse(ret);
            if (jsObj) {
                var code = Number(jsObj.code);
                switch (code) {
                    case -1:
                        WndManager.root.notifyWnd.show("您的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -2:
                        WndManager.root.notifyWnd.show("您的购买套餐不存在", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -1003:
                        //WndManager.root.notifyWnd.show("您的钻石不足",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
                        this.chargeResultScene.updateData("钻石不足", "请先充值后再进行包卡哟！", 0, "");
                        return;
                    case -3:
                    case -4:
                    case -5:
                    case -7:
                        WndManager.root.notifyWnd.show("购买失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -6:
                        WndManager.root.notifyWnd.show("您已经是套餐用户", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case 1:
                        if (null != jsObj.data) {
                            WndManager.root.main.dataManager.MyPlayer.DiamondNum = Number(jsObj.data.jewel);
                            WndManager.root.main.dataManager.MyPlayer.Packstype1 = Number(jsObj.data.packstype1);
                            WndManager.root.main.dataManager.MyPlayer.PackLeftTime = Number(jsObj.data.packLeftTime);
                            this.updateData();
                        }
                        this.chargeResultScene.updateData("恭喜你已购买成功", "", 0, "");
                        //WndManager.root.notifyWnd.show("购买成功",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
                        return;
                }
            }
        }
        else {
            WndManager.root.notifyWnd.show("购买套餐失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    ChargeScene.prototype.afterCharge = function () {
        this.chargeResultScene.updateData("充值成功", "赶紧去包卡吧！", 0, "");
        this.updateData();
    };
    ChargeScene.prototype.shopping = function (goodsid) {
        var title = "消耗钻石" + WndManager.root.main.dataManager.SystemData.getPackPriceById(goodsid);
        var content = WndManager.root.main.dataManager.SystemData.getPackShowNameById(goodsid) + "卡使用时间为" +
            WndManager.root.main.dataManager.SystemData.getPackHoursById(goodsid) + "小时！";
        this.chargeResultScene.updateData(title, content, goodsid, ChargeResultScene.APP_SHOPPING);
    };
    ChargeScene.prototype.confirmShoping = function (goodsid) {
        WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
        WndManager.root.main.protocol.shopping(goodsid);
    };
    return ChargeScene;
}(WinBase));
__reflect(ChargeScene.prototype, "ChargeScene");
//# sourceMappingURL=ChargeScene.js.map