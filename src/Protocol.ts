/**
 *
 * @author 
 *
 */
class Protocol extends egret.Sprite {

    
     public constructor(dataManager:DataManager) {
        super();

        this.dataManager = dataManager;

        if(RELEASE)
        {    
            this.dataManager.MyPlayer.Key = MyUtils.getMyParamer("key");
       //     egret.log("Key "+ this.dataManager.MyPlayer.Key )

            if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("page")))
                this.defaultPage = Number(MyUtils.getMyParamer("page"));

        //    egret.log("Page "+ this.defaultPage )
            
    
             if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("gametype")))
                this.jumpGametypeId = Number(MyUtils.getMyParamer("gametype"));


            if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("roomkey")))
                 this.jumpRoomKey = MyUtils.getMyParamer("roomkey");


                   if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("maint")))
                   {
                        var maintinfo =MyUtils.getMyParamer("maint");
                            if(maintinfo=="1"){
                                this.isMaint=true;
                            }
                            else{
                                this.isMaint=false;
                                
                            }
                   }

             if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("ghtid")))
                this.dataManager.MyPlayer.ghtid = Number(MyUtils.getMyParamer("ghtid"));

            // if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("gname")))
            //      this.dataManager.MyPlayer.EncodeGname = MyUtils.getMyParamer("gname");

         //   egret.log("gametype "+this.jumpGametypeId )

            if(this.isOurServer)
            {
                this.urlPrefix = "http://www.amo9.com/games/mar/naliqu/hall/";
            }
            else
            {
                this.urlPrefix = "http://www.naliqu.net/hall/";
            }


      //      this.urlPrefix = "http://192.168.1.58:8080/hall/"; 
     //           this.urlPrefix = "http://192.168.1.63:8080/hall/"; 
     
        }
        else{
        // this.urlPrefix = "http://192.168.1.54:8080/hall/";
        this.urlPrefix = "http://test.naliqu.net/hall/";
            
        }

        //this.shareOpenId = "123131";
        this.qrPathPrefix =  this.urlPrefix + "qrimg/";
    }

    public isOurServer:boolean = false;
    public jumpGametypeId:number=0;
    public jumpRoomKey:string = "28155fbfd0e84feb9b5ee89be0225036";
    public defaultPage:number = 2;
    public dataManager:DataManager;
    // public openId:string = "20172011231";
     ////////////////////////
    // public urlPrefix:string = "http://192.168.1.60:8080/hall/";
    public urlPrefix:string = "";
    // public gameurl:string = "http://www.naliqu.net/xsmj/index.html";
   // public gameurl:string = "http://www.amo9.com/games/apr/xsmj/index.html";
    public gameurl:string ="";

    public provinceArr:Array<string> =[];
    public cityArr:Array<Array<string>> = [];
    public dealerArr:Array<Array<Array<string>>> = [];

    public submitSuccess:string = "";

    //维护
    public isMaint:boolean = false;

    /////////////////////接口///////////////////////////

     //进入游戏
    public enter():void
    {   
       var url = this.urlPrefix + "checkin.do?openid=" + this.dataManager.MyPlayer.OpenId + "&nick="+this.dataManager.MyPlayer.Name
        + "&headimg="+this.dataManager.MyPlayer.Avatar + "&sex="+this.dataManager.MyPlayer.Sex;
       console.log("enter-->"+url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            var ret:string = e.target.data as string;
    
            this.dataManager.MyPlayer.Key = ret;
            console.log("key"+this.dataManager.MyPlayer.Key)
            if(MyUtils.checkStringIsNotNulll(ret))
            {
                var event = new egret.Event("onEnter");
                self.dispatchEvent(event);
            }

        }, this);
        urlloader.load(req);
    }

     //登陆
    public login():void
    {   
        this.gameurl="";
       var url = this.urlPrefix + "login.do?key=" + this.dataManager.MyPlayer.Key + "&linktid="+ this.dataManager.MyPlayer.ghtid;
       console.log(url)
     //  egret.log(url);
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log("登陆返回-->"+e.target.data);
         //    egret.log(e.target.data);
            
            var ret:string = e.target.data as string;
            if(MyUtils.checkStringIsNotNulll(ret))
            {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    this.gameurl=jsObj.gameurl;
                    this.dataManager.MyPlayer.Name = jsObj.nick;
                    this.dataManager.MyPlayer.Avatar = jsObj.headimg;
                    this.dataManager.MyPlayer.Sex = Number(jsObj.sex);
                    this.dataManager.MyPlayer.DiamondNum = Number(jsObj.jewel);

                    this.dataManager.MyPlayer.promoter = Number(jsObj.promoter);
                    this.dataManager.MyPlayer.income =(Number(jsObj.income))/100;
                    this.dataManager.MyPlayer.qrPath = jsObj.qrpath as string;

                    this.dataManager.MyPlayer.roles = Number(jsObj.roles);

                    // //如果链接带过来ghtid,gname,则不更新login.do返回的ghtid,gname
                    // if(this.dataManager.MyPlayer.ghtid<=0)
                    {
                        this.dataManager.MyPlayer.Gname = jsObj.gname as string;
                        this.dataManager.MyPlayer.ghtid = Number(jsObj.ghtid);
                    }

                    this.dataManager.SystemData.withdrawweekdays=jsObj.sc.withdrawweekdays
                    this.dataManager.SystemData.withdrawstarttime=jsObj.sc.withdrawstarttime
                    this.dataManager.SystemData.withdrawendtime=jsObj.sc.withdrawendtime
                    this.dataManager.SystemData.withdrawminimum = jsObj.sc.withdrawminimum;

                    this.dataManager.SystemData.maintweekdays=jsObj.sc.maintweekdays
                    this.dataManager.SystemData.maintstarttime=jsObj.sc.maintstarttime
                    this.dataManager.SystemData.maintendtime=jsObj.sc.maintendtime

                    this.dataManager.SystemData.commission=jsObj.sc.commission

                     this.dataManager.SystemData.ChargeData =jsObj.sc.chargeList;

                     //游戏数据
                     this.dataManager.SystemData.gameInfoList = [];

                    var jsObjArr:any[] = jsObj.sc.gameInfoList as any[];
                    for(var i = 0;i < jsObjArr.length;i++) {

                        var gi:GameInfo = new GameInfo();

                        gi.gametype = Number(jsObjArr[i].gametype);
                        gi.name = jsObjArr[i].name as string;
                        
                        var objArr:any[] = jsObjArr[i].priceList as any[];

                        for(var j = 0;j < objArr.length;j++) {
                            var gp:GamePrice = new GamePrice();
                            gp.gametype = Number(objArr[j].gametype);
                            gp.gamelasttime = Number(objArr[j].gamelasttime);
                            gp.price = Number(objArr[j].price);

                            gi.priceList.push(gp);
                        }
                        
                           this.dataManager.SystemData.gameInfoList.push(gi);

                           this.dataManager.SystemData.analyseGameInfo();
                    }


                    var event = new egret.Event("onLogin");
                    self.dispatchEvent(event);
                }
            }

        }, this);
        urlloader.load(req);
    }


      //开房
    public newRoom(gameType:number,subType:number,gameLastTime:number):void
    {   
       var url = this.urlPrefix + "newroom.do?key=" + this.dataManager.MyPlayer.Key + "&gametype="+gameType + "&subtype="+subType + "&gamelasttime="+gameLastTime;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

             if(MyUtils.checkStringIsNotNulll(ret))
            {
                var event = new egret.Event("onNewRoom",true,true,ret);
                self.dispatchEvent(event);
            }
             

        }, this);
        urlloader.load(req);
    }


     //收入流水账//大厅前端查询收益记录 -1 你的游戏身份有误 -2您不是推广员,-3 查询类型不对
    public getincomes(value:number):void
    {   
       var url = this.urlPrefix + "ishow.do?key=" + this.dataManager.MyPlayer.Key + "&type=m" + "&value="+value ;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

             if(MyUtils.checkStringIsNotNulll(ret))
            {
                var event = new egret.Event("ongetincomes",true,true,ret);
                self.dispatchEvent(event);
            }
             

        }, this);
        urlloader.load(req);
    }


      //收入流水账//大厅前端查询收益记录 -1 你的游戏身份有误 -2您不是推广员,-3 查询类型不对
    public getincomes1(value:number):void
    {   
       var url = this.urlPrefix + "ishow.do?key=" + this.dataManager.MyPlayer.Key + "&type=m" + "&value="+value ;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

             if(MyUtils.checkStringIsNotNulll(ret))
            {
                var event = new egret.Event("ongetincomes1",true,true,ret);
                self.dispatchEvent(event);
            }
             

        }, this);
        urlloader.load(req);
    }

    //抽奖信息
    public getDrawInfo():void
    {   
       var url = this.urlPrefix + "drawinfo.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
                 var jsObj = JSON.parse(e.target.data);
                if (jsObj) {

                    
              this.dataManager.DrawData.DrawInfo = [];
                   var arr:Array<any>=[];

                       
                var jsObjArr:any[] = jsObj.drlist as any[];
                    var i = 0;
                    for(i = 0;i < jsObjArr.length;i++) {
                       arr.push({nick:jsObjArr[i].nick,
                            idx:jsObjArr[i].idx,
                            jewel:jsObjArr[i].jewel});
                               
                    }
                    this.dataManager.DrawData.DrawInfo=arr;
           
                                
                }
            }

                 var event = new egret.Event("Ongetdraw");
                self.dispatchEvent(event);
             

        }, this);
        urlloader.load(req);
    }

    //抽奖
    public draw():void
    {   
       var url = this.urlPrefix + "draw.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
                 var jsObj = JSON.parse(e.target.data);
                
              if (jsObj) {

                    this.dataManager.DrawData.DrawInfo = [];
                this.dataManager.DrawData.Result=Number(jsObj.result);
             
                 var arr:Array<any>=[];

                       
                var jsObjArr:any[] = jsObj.drlist as any[];
                    var i = 0;
                    for(i = 0;i < jsObjArr.length;i++) {
                       arr.push({nick:jsObjArr[i].nick,
                            idx:jsObjArr[i].idx,
                            jewel:jsObjArr[i].jewel});
                               
                    }
                    this.dataManager.DrawData.DrawInfo=arr;
                         var event = new egret.Event("Ondraw");
                         self.dispatchEvent(event);           
                }
            }
             

        }, this);
        urlloader.load(req);
    }

    //反馈
    public feedback(name:string,phone:string,issues:string,type:number,img1:string,img2:string,img3:string,img4:string):void
    {   
       var url = this.urlPrefix + "feedback.do?key=" + this.dataManager.MyPlayer.Key + "&name="+name + "&phone="+phone + "&issues="+issues
                + "&type="+type + "&img1="+img1 + "&img2="+img2 + "&img3="+img3 + "&img4="+img4;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("Onfeedback",true,false,ret);
                    this.dispatchEvent(event);

            }
            
        }, this);
        urlloader.load(req);
    }



    //加盟合作
    public Joinback(name:string,phone:string,region:string,advantage:string):void
    {   
       var url = this.urlPrefix + "join.do?key=" + this.dataManager.MyPlayer.Key + "&name="+name + "&phone="+phone + "&region="+region
                + "&advantage="+advantage ;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("OnJoinback",true,false,ret);
                    this.dispatchEvent(event);

            }
            
        }, this);
        urlloader.load(req);
    }
    //获取战绩
    public getExploit():void
    {   
        this.dataManager.MyExploit.GameRecordArr=[];
       var url = this.urlPrefix + "getexploit.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);  

             egret.log("总战绩数据:"+e.target.data);

            var ret:string = e.target.data as string;
            if(MyUtils.checkStringIsNotNulll(ret))
            {
              var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    this.dataManager.MyExploit.TotalRounds = jsObj.totalRounds;
                    this.dataManager.MyExploit.WinRate = jsObj.winRate;
                    this.dataManager.MyExploit.TotalEscape = jsObj.totalEscape;

                  

                    var arr:Array<GameRecord> = [];

                       
                var jsObjArr:any[] = jsObj.gameRecordClientList as any[];
                    var i = 0;
                    for(i = 0;i < jsObjArr.length;i++) {
                        var gr:GameRecord = new GameRecord();
                        gr.GameType = Number(jsObjArr[i].gameType);
                        gr.MvpNum = Number(jsObjArr[i].mvpNum);
                        gr.WeakNum = Number(jsObjArr[i].weakNum);
                        gr.WinRate = Number(jsObjArr[i].winRate);
                        gr.TotalRound = Number(jsObjArr[i].totalRound);
                        gr.TotalPoint = Number(jsObjArr[i].totalPoint);
                        
                        arr.push(gr);

                    }
                    this.dataManager.MyExploit.GameRecordArr=arr;
                    var event = new egret.Event("OngetExploit");
                    this.dispatchEvent(event);
                }

            } 

        }, this);
        urlloader.load(req);
    }


     //获取个人战绩
    public getMyExploit(gametype:number):void
    {   
        this.dataManager.MyExploit.GameRoundDataArr = [];
       var url = this.urlPrefix + "getskgexploit.do?key=" + this.dataManager.MyPlayer.Key+"&gametype="+gametype;
        //    var url = this.urlPrefix + "getskgexploit.do?key=" + this.dataManager.MyPlayer.Key+"&gametype="+gametype+"&latest=1";
    

        if(this.jumpGametypeId>0){
            url = this.urlPrefix + "getskgexploit.do?key=" + this.dataManager.MyPlayer.Key+"&gametype="+gametype+"&roomkey="+this.jumpRoomKey;
      //      this.jumpGametypeId=0;
        }

       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);

            egret.log("单局战绩数据:"+e.target.data);
            
            var ret:string = e.target.data as string;
  

            if(MyUtils.checkStringIsNotNulll(ret))
            {
                var jsObjArr:any[] = JSON.parse(e.target.data) as  any[];
                for(var i=0;i<jsObjArr.length;i++)
                {
                    var grd:GameRoundData = new GameRoundData();
                    grd.RoundBeginTime = Number(jsObjArr[i].ctime);
                    grd.RoomId = Number(jsObjArr[i].roomid);
                    grd.GameType = gametype;
                    grd.GameStatus = Number(jsObjArr[i].gamestatus);
                    grd.GameLastTime = Number(jsObjArr[i].gameslasttime);
                    grd.RoomCreater =  jsObjArr[i].createrNick as string;
                    grd.CreaterAvatar = jsObjArr[i].createrHeadimg as string;
                    grd.exploit = jsObjArr[i].exploit as string

                    if( grd.exploit ==""){
                        var j=0;
                    }

                    var playerRoundDataArr:Array<PlayerRoundData> = [];

                    var tempArr:any[] = jsObjArr[i].prdcList as  any[];

                    for(var j=0;j<tempArr.length;j++)
                    {
                        var prd:PlayerRoundData = new PlayerRoundData();
                        prd.Nick = tempArr[j].nick as string;
                        prd.Avatar = tempArr[j].headimg as string;
                        prd.Point = Number(tempArr[j].point);
                        prd.Rank = Number(tempArr[j].rank);
                        playerRoundDataArr.push(prd);
                    }
                    grd.PlayerRoundDataArr = playerRoundDataArr;

                    this.dataManager.MyExploit.GameRoundDataArr.push(grd);
                }

                  var event = new egret.Event("OngetMyExploit");
                    this.dispatchEvent(event);
            } 

        }, this);
        urlloader.load(req);
    }

    //心跳
    public heartbeat():void
    {   
        this.dataManager.SystemData.Inform =""
       var url = this.urlPrefix + "heartbeat.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;
//{"serverTime":1492188818836,"broadcastInfoClient":{"inform":"栋栋陪我去北京吧","interval":3}} 
            if(MyUtils.checkStringIsNotNulll(ret))
            {
                 var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    this.dataManager.SystemData.ServerTime = jsObj.serverTime;
                    this.dataManager.SystemData.Inform = jsObj.broadcastInfoClient.inform;
                        

                    this.dataManager.SystemData.maintweekdays=jsObj.maintweekdays
                    this.dataManager.SystemData.maintstarttime=jsObj.maintstarttime
                    this.dataManager.SystemData.maintendtime=jsObj.maintendtime


                   this.isMaint = Boolean(jsObj.maint);
                                                        
                    var event = new egret.Event("Onheartbeat");
                    this.dispatchEvent(event);
                }
            }
             

        }, this);
        urlloader.load(req);
    }

    //签到信息
    public getSignInfo():void
    {   
       var url = this.urlPrefix + "signinfo.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {

                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    this.dataManager.MyPlayer.SignToday = jsObj.signToday;
                    this.dataManager.MyPlayer.SignDiamond = jsObj.SignJewel;
                    this.dataManager.MyPlayer.SignDays = jsObj.signDays;
                    this.dataManager.SystemData.ServerTime = jsObj.serverTime;
                    this.dataManager.MyPlayer.DiamondNum = jsObj.jewel;

                     var event = new egret.Event("onGetSignInfo",true);
                    this.dispatchEvent(event);
                    // var event = new egret.Event("openSignScene",true);
                    // this.dispatchEvent(event);
                }

               
            }
             

        }, this);
        urlloader.load(req);
    }

    //签到
    public sign():void
    {   
       var url = this.urlPrefix + "sign.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
              var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    this.dataManager.MyPlayer.SignToday = jsObj.signToday;
                    this.dataManager.MyPlayer.SignDiamond = jsObj.SignJewel;
                    this.dataManager.MyPlayer.SignDays = jsObj.signDays;
                    this.dataManager.SystemData.ServerTime = jsObj.serverTime;
                    this.dataManager.MyPlayer.DiamondNum = jsObj.jewel;
                    var event = new egret.Event("closeSignScene",true);
                    this.dispatchEvent(event);
                }
            }
             

        }, this);
        urlloader.load(req);
    }

    //获取签到10条信息
    public getSignNpc():void
    {   
       var url = this.urlPrefix + "signrecord.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {


               var jsObj = JSON.parse(e.target.data);
                if (jsObj) {

                    
                this.dataManager.SystemData.SignTodayNum=jsObj.signTodayNum;
                 // this.dataManager.SystemData.SignInfo = [];
                 var arr:Array<any>=[];

                       
                var jsObjArr:any[] = jsObj.signRecordClientList as any[];
                    var i = 0;
                    for(i = 0;i < jsObjArr.length;i++) {
                       arr.push({name:jsObjArr[i].name,
                            diamondNum:jsObjArr[i].diamondNum});
                               
                    }
                    this.dataManager.SystemData.SignInfo=arr;
                                  var event = new egret.Event("ongetSignNpc",true);
                                  this.dispatchEvent(event);
                }
            }
             

        }, this);
        urlloader.load(req);
    }


       //上传图片
    public photoPathPrefix:string = "http://www.amo9.com/photos/naliqu/";;
    //上传图片
    public onUpload( photoBase64: any): void {
        var url = "http://www.amo9.com/wxsdk/upload.do";
        
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.POST;
        //urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        req.data = new egret.URLVariables("gameid=naliqu&photo=" + encodeURIComponent(photoBase64));
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            var jsObj = JSON.parse(e.target.data);
            if(null != jsObj)
            {
                var name:string = jsObj.photo as string;
                var upday:string = jsObj.upday as string;
                var imgName:string = this.photoPathPrefix + upday + "/" + name;

                var event = new egret.Event("onUpload",true,false,imgName);
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    } 


       //充值
    public getPay(id:number):void
    {   
       var url = this.urlPrefix + "pay.do?key=" + this.dataManager.MyPlayer.Key+"&id=" + id;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
           var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    this.dataManager.MyPlayer.AppId = jsObj.appId;
                    this.dataManager.MyPlayer.TimeStamp = jsObj.timeStamp;
                    this.dataManager.MyPlayer.NonceStr = jsObj.nonceStr;
                    this.dataManager.MyPlayer.Prepay_id = jsObj.prepay_id;
                    this.dataManager.MyPlayer.SignType = jsObj.signType;
                    this.dataManager.MyPlayer.PaySign = jsObj.paySign;
                    var event = new egret.Event("Onpay",true);
                    this.dispatchEvent(event);
                }
            }
             

        }, this);
        urlloader.load(req);
    }


    //申请推广员
    public promotionApply(name:string,contact:string,gameName:string,wechat:string):void
    {   
        WndManager.root.main.dataManager.MyPlayer.promotion = null;
       var url = this.urlPrefix + "papply.do?key=" + this.dataManager.MyPlayer.Key + "&name="+name + "&contact="+contact + "&gname="+gameName
                + "&wechat="+wechat ;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("onPromotionApply",true,false,ret);
                    this.dispatchEvent(event);

            }
            
        }, this);
        urlloader.load(req);
    }

    //获取我的推广申请信息
    public getMyPromotionApply():void
    {   
        WndManager.root.main.dataManager.MyPlayer.promotion = null;
       var url = this.urlPrefix + "pinfo.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("onPromotionInfo",true,false,ret);
                    this.dispatchEvent(event);

            }
            
        }, this);
        urlloader.load(req);
    }

    //申请提现
    public withdrawApply(cnum:string,bankname:string,accoutno:string,accoutname:string):void
    {   
       var url = this.urlPrefix + "wapply.do?key=" + this.dataManager.MyPlayer.Key + "&cnum="+cnum + "&bankname="+bankname + "&accoutno="+accoutno
                + "&accoutname="+accoutname ;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("onWithdrawApply",true,false,ret);
                    this.dispatchEvent(event);

            }
            
        }, this);
        urlloader.load(req);
    }


    //获取我的提现记录
    public getMyWithdrawApply():void
    {   
        WndManager.root.main.dataManager.MyPlayer.promotion = null;
       var url = this.urlPrefix + "wshow.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("onWithdrawInfo",true,false,ret);
                    this.dispatchEvent(event);

            }
            
        }, this);
        urlloader.load(req);
    }


      //获取玩家信息
    public zuanshiNum():void
    {   
        this.gameurl="";
       var url = this.urlPrefix + "playinfo.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;
            if(MyUtils.checkStringIsNotNulll(ret))
            {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                   
                    this.dataManager.MyPlayer.DiamondNum = Number(jsObj.jewel);

                   
                    

                    var event = new egret.Event("onzuanshiNum");
                    self.dispatchEvent(event);
                }
            }

        }, this);
        urlloader.load(req);
    }

     //获取我的反馈记录
    public getFeedbacks():void
    {   
       var url = this.urlPrefix + "feedbacklist.do?key=" + this.dataManager.MyPlayer.Key;
       console.log(url)
       var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
         var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data);
            
            var ret:string = e.target.data as string;

             if(MyUtils.checkStringIsNotNulll(ret))
            {
                var event = new egret.Event("onGetFeedback",true,true,ret);
                self.dispatchEvent(event);
            }
             

        }, this);
        urlloader.load(req);
    }

    //获取二维码路径
    public qrPathPrefix:string = this.urlPrefix + "qrimg/";
    
    public getQrImgPath()
    {
        var url = this.urlPrefix + "createqr.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data,"33");

             var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("getQrImg",true,false,ret);
                this.dispatchEvent(event);
            }
            
        }, this);
        urlloader.load(req);
    }

    //打开充值页面
    public getChargeAddr():void
    {
        var url = this.urlPrefix + "chargeaddr.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
            console.log(e.target.data,"33");

             var ret:string = e.target.data as string;

            if(MyUtils.checkStringIsNotNulll(ret))
            {
               var event = new egret.Event("onGetChargeAddr",true,false,ret);
                this.dispatchEvent(event);
            }
            
        }, this);
        urlloader.load(req);
    }
}
