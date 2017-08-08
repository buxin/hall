/*我的信息 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyInfoScene = (function (_super) {
    __extends(MyInfoScene, _super);
    function MyInfoScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/MyInfoWnd.exml";
        return _this;
    }
    MyInfoScene.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    MyInfoScene.prototype.init = function () {
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.MyInfoListData);
        this.dataList.itemRenderer = MyInfoItemRender;
        this.scroller.viewport = this.dataList;
        this.topScene = new TopScene(GameConstant.TOPSCENE_LAYOUT_MYINFO);
        this.addChild(this.topScene);
        this.joinScene = new JoinScene();
        this.joinScene.visible = false;
        this.addChild(this.joinScene);
        this.feedbackScene = new FeedbackScene(this);
        this.feedbackScene.visible = false;
        this.addChild(this.feedbackScene);
        this.feedbackScene1 = new FeedbackScene1(this);
        this.feedbackScene1.visible = false;
        this.addChild(this.feedbackScene1);
        this.feedbackScene2 = new FeedbackScene2(this);
        this.feedbackScene2.visible = false;
        this.addChild(this.feedbackScene2);
        this.fwutiaokuangScene = new FwutiaokuangScene();
        this.fwutiaokuangScene.visible = false;
        this.addChild(this.fwutiaokuangScene);
        this.promotionScene1 = new PromotionScene1(this);
        this.promotionScene1.visible = false;
        this.addChild(this.promotionScene1);
        this.promotionScene2 = new PromotionScene2();
        this.promotionScene2.visible = false;
        this.addChild(this.promotionScene2);
        this.promotionScene3 = new PromotionScene3();
        this.promotionScene3.visible = false;
        this.addChild(this.promotionScene3);
        this.promotionScene4 = new PromotionScene4();
        this.promotionScene4.visible = false;
        this.addChild(this.promotionScene4);
    };
    MyInfoScene.prototype.initListener = function () {
        this.addEventListener("myInfoItemClick", this.HandleOpenSubSceneClick, this);
    };
    MyInfoScene.prototype.release = function () {
        this.removeEventListener("myInfoItemClick", this.HandleOpenSubSceneClick, this);
    };
    MyInfoScene.prototype.HandleOpenSubSceneClick = function (e) {
        var itemId = Number(e.data);
        this.showSubScene(itemId);
    };
    MyInfoScene.prototype.showSubScene = function (itemId) {
        switch (itemId) {
            case 0:
                this.feedbackScene.setVisible(true);
                break;
            case 1:
                this.fwutiaokuangScene.visible = true;
                break;
            case 2:
                this.joinScene.setVisible(true);
                break;
            case 3:
                if (WndManager.root.main.dataManager.MyPlayer.promoter == 1) {
                    //显示推广员页面
                    this.promotionScene4.setVisible(true);
                }
                else {
                    WndManager.root.main.protocol.addEventListener("onPromotionInfo", this.onPromotionInfo, this);
                    WndManager.root.main.protocol.getMyPromotionApply();
                }
                break;
            case 4:
                this.feedbackScene1.visible = true;
                break;
            case 5:
                {
                    WndManager.root.main.protocol.addEventListener("onGetFeedback", this.onGetFeedback, this);
                    WndManager.root.main.protocol.getFeedbacks();
                }
                break;
        }
    };
    MyInfoScene.prototype.onPromotionInfo = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            var jsObj = JSON.parse(ret);
            if (jsObj) {
                var code = Number(jsObj.code);
                switch (code) {
                    case -1:
                        WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case -2:
                        this.promotionScene1.setVisible(true);
                        return;
                    case 1:
                        WndManager.root.main.dataManager.MyPlayer.promotion = new Promotion(jsObj);
                        WndManager.root.main.dataManager.MyPlayer.promoter = jsObj.playerClient.promoter;
                        WndManager.root.main.dataManager.MyPlayer.Gname = jsObj.playerClient.gname;
                        WndManager.root.main.dataManager.MyPlayer.income = (Number(jsObj.playerClient.income)) / 100;
                        WndManager.root.main.dataManager.MyPlayer.DiamondNum = jsObj.playerClient.jewel;
                        WndManager.root.main.dataManager.MyPlayer.ghtid = jsObj.playerClient.ghtid;
                        WndManager.root.main._jssdk.init();
                        title(WndManager.root.main.dataManager.MyPlayer.Gname);
                        if (WndManager.root.main.dataManager.MyPlayer.promoter == 1) {
                            //显示推广员页面
                            this.promotionScene4.setVisible(true);
                        }
                        else {
                            //如果申请被拒绝
                            if (WndManager.root.main.dataManager.MyPlayer.promotion.status == GameConstant.PROMOTION_STATUS_REJECT)
                                this.promotionScene3.setVisible(true);
                            else
                                this.promotionScene2.setVisible(true);
                        }
                        return;
                }
            }
        }
        else {
            WndManager.root.notifyWnd.show("上传失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    MyInfoScene.prototype.jumpPromotionScene2 = function () {
        this.promotionScene1.setVisible(false);
        this.promotionScene2.setVisible(true);
    };
    MyInfoScene.prototype.onGetFeedback = function (e) {
        var ret = e.data;
        if (MyUtils.checkStringIsNotNulll(ret)) {
            var jsObj = JSON.parse(ret);
            if (jsObj) {
                var code = Number(jsObj.code);
                switch (code) {
                    case -1:
                        WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
                        return;
                    case 1:
                        WndManager.root.main.dataManager.MyPlayer.feedbackArr = jsObj.data;
                        this.feedbackScene2.setVisible(true);
                        return;
                }
            }
        }
        else {
            WndManager.root.notifyWnd.show("获取反馈失败", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
    };
    return MyInfoScene;
}(WinBase));
__reflect(MyInfoScene.prototype, "MyInfoScene");
//# sourceMappingURL=MyInfoScene.js.map