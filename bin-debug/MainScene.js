var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene(main) {
        var _this = _super.call(this) || this;
        _this.soundPlay = true; //声音是否播放
        _this.wndSlideOpenDelay = true;
        _this.timer = null;
        _this.main = main;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._int, _this);
        return _this;
    }
    MainScene.prototype._int = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._int, this);
        //this.main._jssdk.init();
        WndManager.root = this;
        this.wndmanager = new WndManager;
        this.addChild(this.wndmanager);
        WndManager.root.openWnd(FirstPageScene, false);
        // this.shareScene = new ShareScene();
        // this.shareScene.visible = false;
        // this.addChild(this.shareScene);
        this.bottomScene = new BottomScene();
        this.bottomScene.y = 942;
        this.addChild(this.bottomScene);
        this.notifyWnd = new NotityWnd();
        this.addChild(this.notifyWnd);
        //  this.musicBg = document.getElementById("bgMusic");
        //  this.initSoundIcon();
        this.initLogo();
        this.addListener();
        if (WndManager.root.main.protocol.defaultPage == 1) {
            this.openExploitSubScene(null);
        }
        this.requestBc();
        WndManager.root.main.protocol.getSignInfo();
        this.maintscene = new MaintScene();
        this.addChild(this.maintscene);
        this.maintscene.visible = WndManager.root.main.protocol.isMaint;
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onControlMe, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onControlMe, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlMe, this);
    };
    MainScene.prototype.requestBc = function () {
        WndManager.root.main.protocol.addEventListener("Onheartbeat", this.Onheartbeat, this);
        WndManager.root.main.protocol.heartbeat();
        this.timer = new egret.Timer(10000, -1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this); //启动时间
        this.timer.start();
    };
    MainScene.prototype.Onheartbeat = function () {
        if (this.bottomScene.selectId == 2) {
            var fps = WndManager.getWnd(FirstPageScene);
            if (null != fps) {
                fps.broadcast(MyUtils.checkStringIsNotNulll(WndManager.root.main.dataManager.SystemData.Inform));
            }
        }
        //维护
        this.maintscene.visible = WndManager.root.main.protocol.isMaint;
    };
    MainScene.prototype.timerFunc = function () {
        WndManager.root.main.protocol.heartbeat();
    };
    MainScene.prototype.initLogo = function () {
        this.logoImg = new eui.Image(RES.getRes("logo_png"));
        this.logoImg.x = 408;
        this.logoImg.y = 24;
        this.addChild(this.logoImg);
    };
    MainScene.prototype.initSound = function () {
        //得分
        this.soundScore = RES.getRes("score_wav");
        //爆炸
        this.soundBoom = RES.getRes("boom_mp3");
    };
    //播放得分
    MainScene.prototype.playSoundScore = function () {
        if (this.soundPlay) {
            if (null != this.soundChannel)
                this.soundChannel.stop();
            this.soundChannel = this.soundScore.play(0, 1);
        }
    };
    //播放爆炸
    MainScene.prototype.playSoundBoom = function () {
        if (this.soundPlay) {
            if (null != this.soundChannel)
                this.soundChannel.stop();
            this.soundChannel = this.soundBoom.play(0, 1);
        }
    };
    MainScene.prototype.initSoundIcon = function () {
        this.soundImg = new eui.Image(RES.getRes("bt3_png"));
        this.soundImg.anchorOffsetX = 62 / 2;
        this.soundImg.anchorOffsetY = 64 / 2;
        this.soundImg.x = 40;
        this.soundImg.y = 42;
        this.soundImg.touchEnabled = true;
        this.soundImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundEvent, this);
        this.soundTw = egret.Tween.get(this.soundImg, { loop: true }).to({ rotation: 360 }, 1000);
        this.addChild(this.soundImg);
    };
    MainScene.prototype.onSoundLoadOK = function (data) {
        this.soundImg = new eui.Image(RES.getRes("bt3_png"));
        this.soundImg.anchorOffsetX = 62 / 2;
        this.soundImg.anchorOffsetY = 64 / 2;
        this.soundImg.x = 40;
        this.soundImg.y = 42;
        this.soundImg.touchEnabled = true;
        this.soundImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundEvent, this);
        this.soundTw = egret.Tween.get(this.soundImg, { loop: true }).to({ rotation: 360 }, 1000);
        this.addChild(this.soundImg);
        if (!this.soundPlay) {
            if (this.musicChannel)
                this.musicChannel.stop();
            this.soundTw.pause();
        }
        this.initMusic(data);
    };
    MainScene.prototype.addListener = function () {
        this.addEventListener("backHall", this.backHall, this);
        this.addEventListener("discoveryJump", this.discoveryJump, this);
        this.addEventListener("openChargeScene", this.openChargeScene, this);
        this.addEventListener("openSignScene", this.openSignScene, this);
        this.main.protocol.addEventListener("closeSignScene", this.closeSignScene, this);
        this.addEventListener("openMyInfoSubScene", this.openMyInfoSubScene, this);
        this.addEventListener("backMyInfo", this.openMyInfoScene, this);
        this.addEventListener("gotopay", this.gotopay, this);
        this.main.protocol.addEventListener("onGetChargeAddr", this.onGetChargeAddr, this);
        this.main.protocol.addEventListener("onGetSignInfo", this.onGetSignInfo, this);
        this.addEventListener("bottomClickStatus", this.setBottomClick, this);
        // this.addEventListener("onNewRoom",this.onNewRoom,this);
        this.main.protocol.addEventListener("onNewRoom", this.onNewRoom, this);
    };
    MainScene.prototype.setBottomClick = function (e) {
        var clicked = Boolean(e.data);
        this.bottomScene.setClicked(clicked);
    };
    //跳转pay
    MainScene.prototype.gotopay = function () {
        this.bottomScene.HandleBtnChargeClick(null);
    };
    //开房返回
    MainScene.prototype.onNewRoom = function (e) {
        var ret = e.data;
        if (ret == "-2") {
            //弹窗，不存在此类型的房间
            WndManager.root.notifyWnd.show("请选择正确的房间", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
        else if (ret == "-1") {
            //弹窗，钻石不足
            WndManager.root.notifyWnd.show("钻石不足，请充值", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
        else if (ret == "-3") {
            //弹窗，分配服务器失败
            WndManager.root.notifyWnd.show("访问失败，请重新连接", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
        else if (ret == "-4") {
            WndManager.root.notifyWnd.show("开房数量不能超过3个哦！", 0xff0000, 2, 0x0000ff, NotityWnd.MOVE_HORIZONTAL, 0, 80, MainScene.screen_width, 80, 3000);
        }
        else {
            var jsObj = JSON.parse(ret);
            if (jsObj) {
                var ip = jsObj.ip;
                var port = jsObj.port;
                var roomKey = jsObj.roomkey;
                var path = jsObj.path;
                var gameurl = jsObj.gameurl;
                if (WndManager.root.main.protocol.dataManager.MyPlayer.ghtid > 0) {
                    window.location.href = gameurl + "?ip=" + ip + "&port=" + port + "&path=" + path + "&roomkey=" + roomKey + "&key=" + WndManager.root.main.dataManager.MyPlayer.Key +
                        "&ghtid=" + WndManager.root.main.protocol.dataManager.MyPlayer.ghtid; // + "&gname="+WndManager.root.main.protocol.dataManager.MyPlayer.Gname;
                }
                else {
                    window.location.href = gameurl + "?ip=" + ip + "&port=" + port + "&path=" + path + "&roomkey=" + roomKey + "&key=" + WndManager.root.main.dataManager.MyPlayer.Key;
                    console.log("内容ip" + ip + "&port=" + port + "&path=" + path + "&roomKey=" + roomKey + "&key=" + WndManager.root.main.dataManager.MyPlayer.Key);
                }
            }
        }
    };
    //打开我的信息窗口
    MainScene.prototype.openMyInfoScene = function (e) {
        this.bottomScene.backMyInfo(e);
    };
    //显示我的战绩
    MainScene.prototype.openExploitSubScene = function (e) {
        this.bottomScene.backExploit(e);
    };
    //打开我的子窗口
    MainScene.prototype.openMyInfoSubScene = function (e) {
        var itemId = Number(e.data);
        this.bottomScene.backMyInfo(e);
        var mis = WndManager.getWnd(MyInfoScene);
        if (null != mis)
            mis.showSubScene(itemId);
    };
    //充值
    MainScene.prototype.openChargeScene = function (e) {
        this.bottomScene.HandleBtnChargeClick(null);
    };
    //打开充值窗口
    MainScene.prototype.onGetChargeAddr = function (e) {
        this.bottomScene.showChargePage();
    };
    //返回大厅
    MainScene.prototype.backHall = function (e) {
        this.bottomScene.backHall(e);
    };
    //签到
    MainScene.prototype.openSignScene = function (e) {
        this.bottomScene.backHall(e);
        var fps = WndManager.getWnd(FirstPageScene);
        if (null != fps)
            fps.openSignScene();
    };
    //关闭签到
    MainScene.prototype.closeSignScene = function (e) {
        this.bottomScene.backHall(e);
        var fps = WndManager.getWnd(FirstPageScene);
        if (null != fps)
            fps.closeSignScene();
    };
    //刷新签到按钮状态
    MainScene.prototype.onGetSignInfo = function (e) {
        var fps = WndManager.getWnd(FirstPageScene);
        if (null != fps)
            fps.closeSignScene();
    };
    //发现页跳转
    MainScene.prototype.discoveryJump = function (e) {
        var itemId = Number(e.data);
        switch (itemId) {
            case GameConstant.ITEM_SIGN:
                {
                    var dcs = WndManager.getWnd(DiscoveryScene);
                    if (null != dcs)
                        dcs.openSignDetailScene();
                    break;
                }
            case GameConstant.ITEM_DRAW:
                {
                    var dcs = WndManager.getWnd(DiscoveryScene);
                    if (null != dcs)
                        dcs.openDrawScene();
                    break;
                }
        }
    };
    MainScene.prototype.openWnd = function (wndClazz, data) {
        if (data === void 0) { data = null; }
        WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_OPEN_NEW);
    };
    MainScene.prototype.closeWnd = function (wndClazz) {
        WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_CLOSE_DELETE);
    };
    MainScene.prototype.openWndAndMove = function (wndClazz, data) {
        if (data === void 0) { data = null; }
        WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_OPEN_NEW);
    };
    MainScene.prototype.closeWndAndMove = function (wndClazz) {
        WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_CLOSE_DELETE, WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_UP);
    };
    MainScene.prototype.initMusic = function (data) {
        //		this.soundHorseRun = RES.getRes("");
        if (null != data)
            this.musicBg = data;
        else
            this.musicBg = RES.getRes("bg_mp3");
        this.playMusic();
    };
    MainScene.prototype.soundEvent = function (e) {
        this.soundPlay = !this.soundPlay;
        if (this.soundPlay) {
            this.soundTw = egret.Tween.get(this.soundImg, { loop: true }).to({ rotation: 360 }, 1000);
            //this.musicChannel = this.musicBg.play(0,0);	
            this.musicBg.play();
        }
        else {
            //this.musicChannel.stop();	 
            this.musicBg.pause();
            this.soundTw.pause();
        }
    };
    MainScene.prototype.playMusic = function () {
        if (this.soundPlay) {
            this.musicChannel = this.musicBg.play(0, 0);
        }
    };
    MainScene.prototype.updateLeftPageCode = function () {
        // MainScene.pageCode--;
        // if(MainScene.pageCode < 0)
        // 	MainScene.pageCode += this.pageObject.length;
    };
    MainScene.prototype.updateRightPageCode = function () {
        // MainScene.pageCode++;
        // if(MainScene.pageCode >= this.pageObject.length)
        // 	MainScene.pageCode -= this.pageObject.length;
    };
    MainScene.prototype.onControlMe = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.this_X = event.stageX;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
        }
        else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
        }
    };
    MainScene.prototype.screenAdapt = function () {
        var win = this.wndmanager.getTopWnd();
        if (null != win)
            win.screenAdapt();
    };
    return MainScene;
}(eui.UILayer));
MainScene.screen_width = 640;
MainScene.screen_height = 1036;
//	private pageObject: Array<any> = [Page3Scene,Page4Scene];
MainScene.pageCode = 0;
__reflect(MainScene.prototype, "MainScene");
//# sourceMappingURL=MainScene.js.map