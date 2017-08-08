var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loginSuccess = false;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.name = "_main";
        this.dataManager = new DataManager();
        this.protocol = new Protocol(this.dataManager);
        //this.dataJsonParser = new DataJsonParser(this.protocol);
        if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            this.stage.orientation = egret.OrientationMode.AUTO;
        }
        //关闭多点触摸
        // this.stage.maxTouches=1;
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI(this);
        this.stage.addChild(this.loadingView);
        //分享
        this._jssdk = new JSSDK(this.protocol, this);
        this.stage.addChild(this._jssdk);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        //login
        // this.protocol.addEventListener("onLogin", this.onLogin, this);
        //this.protocol.login(); 
        // this.stage.addEventListener(egret.Event.RESIZE,this.onSize,this);
        // this.onSize(null);
        // this.protocol.addEventListener("onEnter", this.onEnter, this);
        // this.protocol.enter();
        if (false) {
            // this._jssdk.init();
            this.protocol.addEventListener("onLogin", this.onLogin, this);
            this.protocol.login();
        }
        else {
            this.protocol.addEventListener("onEnter", this.onEnter, this);
            this.protocol.enter();
        }
    };
    Main.prototype.onEnter = function (e) {
        // this._jssdk.init();
        this.protocol.addEventListener("onLogin", this.onLogin, this);
        this.protocol.login();
    };
    Main.prototype.onSize = function (e) {
        this.dataManager.StageWidth = this.stage.stageWidth;
        this.dataManager.StageHeight = this.stage.stageHeight;
        if (e != null && null != this.mainScene)
            this.mainScene.screenAdapt();
    };
    Main.prototype.onLogin = function (e) {
        this._jssdk.init();
        title(this.dataManager.MyPlayer.Gname);
        this.loginSuccess = true;
        // this.enterGame();    
    };
    Main.prototype.onLoad = function (e) {
        egret.log("加载祝福完毕");
        this.loginSuccess = true;
        this.enterGame();
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        //this.createScene();
        //this.enterGame();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("beforePreload");
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "beforePreload") {
            this.loadingView.setImg(Main.createBitmapByName("loadingBg_png"), Main.createBitmapByName("loadingBar_png"));
            RES.loadGroup("preload");
        }
        if (event.groupName == "preload") {
            this.isResourceLoadEnd = true;
            //this.dataJsonParser.parser();
            this.enterGame();
        }
    };
    Main.prototype.enterGame = function () {
        if (this.isResourceLoadEnd && this.isThemeLoadEnd && this.loginSuccess) {
            if (this.loadingView.parent) {
                this.stage.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                this.createScene();
            }
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            //隐藏充值页面
            openChargeWeb("", false);
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            // egret.log("name:"+ event.resItem);
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.startCreateScene = function () {
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description_json", this.startAnimation, this);
        this.mainScene = new MainScene(this);
        this.addChild(this.mainScene);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    Main.prototype.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    Main.prototype.onScreenChange = function (angle) {
        this.dataManager.StageWidth = this.stage.stageWidth;
        this.dataManager.StageHeight = this.stage.stageHeight;
    };
    //支付成功回调
    Main.prototype.fundcz = function (str) {
        egret.log(str);
        //    alert("1234");
        //	WndManager.root.main.protocol.addEventListener("onzuanshiNum", this.onzuanshiNum, this);
        WndManager.root.main.protocol.zuanshiNum();
    };
    return Main;
}(eui.UILayer));
Main.loadAni = false;
Main.ani = [];
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map