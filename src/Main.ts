//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare function  selectImage(selectedFunc, thisValue): void;
declare function payment(data): void;
declare function title(name): void;
declare function openChargeWeb(path,bool):void
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    public protocol:Protocol;
    private loadingView: LoadingUI;

    public _jssdk: JSSDK;

    public  loginSuccess:boolean = false;

    public static loadAni:boolean = false;

    public static ani:Array<eui.Image> = [];

    //public dataJsonParser:DataJsonParser;

    public dataManager:DataManager;
  
    protected createChildren(): void {
        super.createChildren();

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
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface

        //设置加载进度界面
        this.loadingView = new LoadingUI(this);
        this.stage.addChild(this.loadingView);

        //分享
        this._jssdk = new JSSDK(this.protocol,this);
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
        if(RELEASE){
           // this._jssdk.init();

        this.protocol.addEventListener("onLogin", this.onLogin, this);
        this.protocol.login();
        }
        else{
        this.protocol.addEventListener("onEnter", this.onEnter, this);
        this.protocol.enter();
        }
    }

    private onEnter(e:egret.Event):void
    {
       // this._jssdk.init();

        this.protocol.addEventListener("onLogin", this.onLogin, this);
        this.protocol.login();
       
    }

      private onSize(e:egret.Event):void{
            this.dataManager.StageWidth = this.stage.stageWidth;
             this.dataManager.StageHeight = this.stage.stageHeight;

             if(e!=null && null != this.mainScene)
              this.mainScene.screenAdapt();
        }

    private onLogin(e:egret.Event):void
    {
        this._jssdk.init();
        title(this.dataManager.MyPlayer.Gname);
        this.loginSuccess = true;  
        // this.enterGame();    
    }

    private onLoad(e:egret.Event):void
    {
        egret.log("加载祝福完毕");
        this.loginSuccess = true;
        this.enterGame();
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

     
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        //this.createScene();
        //this.enterGame();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("beforePreload");
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == "beforePreload") {
            this.loadingView.setImg(Main.createBitmapByName("loadingBg_png"),Main.createBitmapByName("loadingBar_png"));
            RES.loadGroup("preload");

        }
        if (event.groupName == "preload") {
            this.isResourceLoadEnd = true;
            //this.dataJsonParser.parser();
            this.enterGame();
        }
    }

    private enterGame():void
    {
        if(this.isResourceLoadEnd && this.isThemeLoadEnd && this.loginSuccess)
        {
            if(this.loadingView.parent)
            {
                this.stage.removeChild(this.loadingView);

                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                
                this.createScene();
            }
        }
    }

    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            //隐藏充值页面
            openChargeWeb("",false);

            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
          // egret.log("name:"+ event.resItem);
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield:egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */

    public mainScene:MainScene;
    protected startCreateScene(): void {

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description_json", this.startAnimation, this);

        this.mainScene = new MainScene(this);
        this.addChild(this.mainScene);
        
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }
    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }

    public onScreenChange(angle:string):void
    {
        this.dataManager.StageWidth = this.stage.stageWidth;
        this.dataManager.StageHeight = this.stage.stageHeight;
    }
    //支付成功回调
     public fundcz(str:string){
           egret.log(str);
        //    alert("1234");
        //	WndManager.root.main.protocol.addEventListener("onzuanshiNum", this.onzuanshiNum, this);
          
         WndManager.root.main.protocol.zuanshiNum();
      }
}
