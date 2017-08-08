var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Protocol = (function (_super) {
    __extends(Protocol, _super);
    function Protocol(dataManager) {
        var _this = _super.call(this) || this;
        _this.isOurServer = false;
        _this.jumpGametypeId = 0;
        _this.jumpRoomKey = "28155fbfd0e84feb9b5ee89be0225036";
        _this.defaultPage = 2;
        // public openId:string = "20172011231";
        ////////////////////////
        // public urlPrefix:string = "http://192.168.1.60:8080/hall/";
        _this.urlPrefix = "";
        // public gameurl:string = "http://www.naliqu.net/xsmj/index.html";
        // public gameurl:string = "http://www.amo9.com/games/apr/xsmj/index.html";
        _this.gameurl = "";
        _this.provinceArr = [];
        _this.cityArr = [];
        _this.dealerArr = [];
        _this.submitSuccess = "";
        //维护
        _this.isMaint = false;
        //上传图片
        _this.photoPathPrefix = "http://www.amo9.com/photos/naliqu/";
        //获取二维码路径
        _this.qrPathPrefix = _this.urlPrefix + "qrimg/";
        _this.dataManager = dataManager;
        if (false) {
            _this.dataManager.MyPlayer.Key = MyUtils.getMyParamer("key");
            //     egret.log("Key "+ this.dataManager.MyPlayer.Key )
            if (MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("page")))
                _this.defaultPage = Number(MyUtils.getMyParamer("page"));
            //    egret.log("Page "+ this.defaultPage )
            if (MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("gametype")))
                _this.jumpGametypeId = Number(MyUtils.getMyParamer("gametype"));
            if (MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("roomkey")))
                _this.jumpRoomKey = MyUtils.getMyParamer("roomkey");
            if (MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("maint"))) {
                var maintinfo = MyUtils.getMyParamer("maint");
                if (maintinfo == "1") {
                    _this.isMaint = true;
                }
                else {
                    _this.isMaint = false;
                }
            }
            if (MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("ghtid")))
                _this.dataManager.MyPlayer.ghtid = Number(MyUtils.getMyParamer("ghtid"));
            // if(MyUtils.checkStringIsNotNulll(MyUtils.getMyParamer("gname")))
            //      this.dataManager.MyPlayer.EncodeGname = MyUtils.getMyParamer("gname");
            //   egret.log("gametype "+this.jumpGametypeId )
            if (_this.isOurServer) {
                _this.urlPrefix = "http://www.amo9.com/games/mar/naliqu/hall/";
            }
            else {
                _this.urlPrefix = "http://www.naliqu.net/hall/";
            }
        }
        else {
            // this.urlPrefix = "http://192.168.1.54:8080/hall/";
            _this.urlPrefix = "http://test.naliqu.net/hall/";
        }
        //this.shareOpenId = "123131";
        _this.qrPathPrefix = _this.urlPrefix + "qrimg/";
        return _this;
    }
    /////////////////////接口///////////////////////////
    //进入游戏
    Protocol.prototype.enter = function () {
        var _this = this;
        var url = this.urlPrefix + "checkin.do?openid=" + this.dataManager.MyPlayer.OpenId + "&nick=" + this.dataManager.MyPlayer.Name
            + "&headimg=" + this.dataManager.MyPlayer.Avatar + "&sex=" + this.dataManager.MyPlayer.Sex;
        console.log("enter-->" + url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            _this.dataManager.MyPlayer.Key = ret;
            console.log("key" + _this.dataManager.MyPlayer.Key);
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onEnter");
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //登陆
    Protocol.prototype.login = function () {
        var _this = this;
        this.gameurl = "";
        var url = this.urlPrefix + "login.do?key=" + this.dataManager.MyPlayer.Key + "&linktid=" + this.dataManager.MyPlayer.ghtid;
        console.log(url);
        //  egret.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log("登陆返回-->" + e.target.data);
            //    egret.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.gameurl = jsObj.gameurl;
                    _this.dataManager.MyPlayer.Name = jsObj.nick;
                    _this.dataManager.MyPlayer.Avatar = jsObj.headimg;
                    _this.dataManager.MyPlayer.Sex = Number(jsObj.sex);
                    _this.dataManager.MyPlayer.DiamondNum = Number(jsObj.jewel);
                    _this.dataManager.MyPlayer.promoter = Number(jsObj.promoter);
                    _this.dataManager.MyPlayer.income = (Number(jsObj.income)) / 100;
                    _this.dataManager.MyPlayer.qrPath = jsObj.qrpath;
                    _this.dataManager.MyPlayer.roles = Number(jsObj.roles);
                    // //如果链接带过来ghtid,gname,则不更新login.do返回的ghtid,gname
                    // if(this.dataManager.MyPlayer.ghtid<=0)
                    {
                        _this.dataManager.MyPlayer.Gname = jsObj.gname;
                        _this.dataManager.MyPlayer.ghtid = Number(jsObj.ghtid);
                    }
                    _this.dataManager.SystemData.withdrawweekdays = jsObj.sc.withdrawweekdays;
                    _this.dataManager.SystemData.withdrawstarttime = jsObj.sc.withdrawstarttime;
                    _this.dataManager.SystemData.withdrawendtime = jsObj.sc.withdrawendtime;
                    _this.dataManager.SystemData.withdrawminimum = jsObj.sc.withdrawminimum;
                    _this.dataManager.SystemData.maintweekdays = jsObj.sc.maintweekdays;
                    _this.dataManager.SystemData.maintstarttime = jsObj.sc.maintstarttime;
                    _this.dataManager.SystemData.maintendtime = jsObj.sc.maintendtime;
                    _this.dataManager.SystemData.commission = jsObj.sc.commission;
                    _this.dataManager.SystemData.ChargeData = jsObj.sc.chargeList;
                    //游戏数据
                    _this.dataManager.SystemData.gameInfoList = [];
                    var jsObjArr = jsObj.sc.gameInfoList;
                    for (var i = 0; i < jsObjArr.length; i++) {
                        var gi = new GameInfo();
                        gi.gametype = Number(jsObjArr[i].gametype);
                        gi.name = jsObjArr[i].name;
                        var objArr = jsObjArr[i].priceList;
                        for (var j = 0; j < objArr.length; j++) {
                            var gp = new GamePrice();
                            gp.gametype = Number(objArr[j].gametype);
                            gp.gamelasttime = Number(objArr[j].gamelasttime);
                            gp.price = Number(objArr[j].price);
                            gi.priceList.push(gp);
                        }
                        _this.dataManager.SystemData.gameInfoList.push(gi);
                        _this.dataManager.SystemData.analyseGameInfo();
                    }
                    var event = new egret.Event("onLogin");
                    self.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //开房
    Protocol.prototype.newRoom = function (gameType, subType, gameLastTime) {
        var url = this.urlPrefix + "newroom.do?key=" + this.dataManager.MyPlayer.Key + "&gametype=" + gameType + "&subtype=" + subType + "&gamelasttime=" + gameLastTime;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onNewRoom", true, true, ret);
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //收入流水账//大厅前端查询收益记录 -1 你的游戏身份有误 -2您不是推广员,-3 查询类型不对
    Protocol.prototype.getincomes = function (value) {
        var url = this.urlPrefix + "ishow.do?key=" + this.dataManager.MyPlayer.Key + "&type=m" + "&value=" + value;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("ongetincomes", true, true, ret);
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //收入流水账//大厅前端查询收益记录 -1 你的游戏身份有误 -2您不是推广员,-3 查询类型不对
    Protocol.prototype.getincomes1 = function (value) {
        var url = this.urlPrefix + "ishow.do?key=" + this.dataManager.MyPlayer.Key + "&type=m" + "&value=" + value;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("ongetincomes1", true, true, ret);
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //抽奖信息
    Protocol.prototype.getDrawInfo = function () {
        var _this = this;
        var url = this.urlPrefix + "drawinfo.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.DrawData.DrawInfo = [];
                    var arr = [];
                    var jsObjArr = jsObj.drlist;
                    var i = 0;
                    for (i = 0; i < jsObjArr.length; i++) {
                        arr.push({ nick: jsObjArr[i].nick,
                            idx: jsObjArr[i].idx,
                            jewel: jsObjArr[i].jewel });
                    }
                    _this.dataManager.DrawData.DrawInfo = arr;
                }
            }
            var event = new egret.Event("Ongetdraw");
            self.dispatchEvent(event);
        }, this);
        urlloader.load(req);
    };
    //抽奖
    Protocol.prototype.draw = function () {
        var _this = this;
        var url = this.urlPrefix + "draw.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.DrawData.DrawInfo = [];
                    _this.dataManager.DrawData.Result = Number(jsObj.result);
                    var arr = [];
                    var jsObjArr = jsObj.drlist;
                    var i = 0;
                    for (i = 0; i < jsObjArr.length; i++) {
                        arr.push({ nick: jsObjArr[i].nick,
                            idx: jsObjArr[i].idx,
                            jewel: jsObjArr[i].jewel });
                    }
                    _this.dataManager.DrawData.DrawInfo = arr;
                    var event = new egret.Event("Ondraw");
                    self.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //反馈
    Protocol.prototype.feedback = function (name, phone, issues, type, img1, img2, img3, img4) {
        var _this = this;
        var url = this.urlPrefix + "feedback.do?key=" + this.dataManager.MyPlayer.Key + "&name=" + name + "&phone=" + phone + "&issues=" + issues
            + "&type=" + type + "&img1=" + img1 + "&img2=" + img2 + "&img3=" + img3 + "&img4=" + img4;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("Onfeedback", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //加盟合作
    Protocol.prototype.Joinback = function (name, phone, region, advantage) {
        var _this = this;
        var url = this.urlPrefix + "join.do?key=" + this.dataManager.MyPlayer.Key + "&name=" + name + "&phone=" + phone + "&region=" + region
            + "&advantage=" + advantage;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("OnJoinback", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //获取战绩
    Protocol.prototype.getExploit = function () {
        var _this = this;
        this.dataManager.MyExploit.GameRecordArr = [];
        var url = this.urlPrefix + "getexploit.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            egret.log("总战绩数据:" + e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.MyExploit.TotalRounds = jsObj.totalRounds;
                    _this.dataManager.MyExploit.WinRate = jsObj.winRate;
                    _this.dataManager.MyExploit.TotalEscape = jsObj.totalEscape;
                    var arr = [];
                    var jsObjArr = jsObj.gameRecordClientList;
                    var i = 0;
                    for (i = 0; i < jsObjArr.length; i++) {
                        var gr = new GameRecord();
                        gr.GameType = Number(jsObjArr[i].gameType);
                        gr.MvpNum = Number(jsObjArr[i].mvpNum);
                        gr.WeakNum = Number(jsObjArr[i].weakNum);
                        gr.WinRate = Number(jsObjArr[i].winRate);
                        gr.TotalRound = Number(jsObjArr[i].totalRound);
                        gr.TotalPoint = Number(jsObjArr[i].totalPoint);
                        arr.push(gr);
                    }
                    _this.dataManager.MyExploit.GameRecordArr = arr;
                    var event = new egret.Event("OngetExploit");
                    _this.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //获取个人战绩
    Protocol.prototype.getMyExploit = function (gametype) {
        var _this = this;
        this.dataManager.MyExploit.GameRoundDataArr = [];
        var url = this.urlPrefix + "getskgexploit.do?key=" + this.dataManager.MyPlayer.Key + "&gametype=" + gametype;
        //    var url = this.urlPrefix + "getskgexploit.do?key=" + this.dataManager.MyPlayer.Key+"&gametype="+gametype+"&latest=1";
        if (this.jumpGametypeId > 0) {
            url = this.urlPrefix + "getskgexploit.do?key=" + this.dataManager.MyPlayer.Key + "&gametype=" + gametype + "&roomkey=" + this.jumpRoomKey;
        }
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            egret.log("单局战绩数据:" + e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObjArr = JSON.parse(e.target.data);
                for (var i = 0; i < jsObjArr.length; i++) {
                    var grd = new GameRoundData();
                    grd.RoundBeginTime = Number(jsObjArr[i].ctime);
                    grd.RoomId = Number(jsObjArr[i].roomid);
                    grd.GameType = gametype;
                    grd.GameStatus = Number(jsObjArr[i].gamestatus);
                    grd.GameLastTime = Number(jsObjArr[i].gameslasttime);
                    grd.RoomCreater = jsObjArr[i].createrNick;
                    grd.CreaterAvatar = jsObjArr[i].createrHeadimg;
                    grd.exploit = jsObjArr[i].exploit;
                    if (grd.exploit == "") {
                        var j = 0;
                    }
                    var playerRoundDataArr = [];
                    var tempArr = jsObjArr[i].prdcList;
                    for (var j = 0; j < tempArr.length; j++) {
                        var prd = new PlayerRoundData();
                        prd.Nick = tempArr[j].nick;
                        prd.Avatar = tempArr[j].headimg;
                        prd.Point = Number(tempArr[j].point);
                        prd.Rank = Number(tempArr[j].rank);
                        playerRoundDataArr.push(prd);
                    }
                    grd.PlayerRoundDataArr = playerRoundDataArr;
                    _this.dataManager.MyExploit.GameRoundDataArr.push(grd);
                }
                var event = new egret.Event("OngetMyExploit");
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //心跳
    Protocol.prototype.heartbeat = function () {
        var _this = this;
        this.dataManager.SystemData.Inform = "";
        var url = this.urlPrefix + "heartbeat.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            //{"serverTime":1492188818836,"broadcastInfoClient":{"inform":"栋栋陪我去北京吧","interval":3}} 
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.SystemData.ServerTime = jsObj.serverTime;
                    _this.dataManager.SystemData.Inform = jsObj.broadcastInfoClient.inform;
                    _this.dataManager.SystemData.maintweekdays = jsObj.maintweekdays;
                    _this.dataManager.SystemData.maintstarttime = jsObj.maintstarttime;
                    _this.dataManager.SystemData.maintendtime = jsObj.maintendtime;
                    _this.isMaint = Boolean(jsObj.maint);
                    var event = new egret.Event("Onheartbeat");
                    _this.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //签到信息
    Protocol.prototype.getSignInfo = function () {
        var _this = this;
        var url = this.urlPrefix + "signinfo.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.MyPlayer.SignToday = jsObj.signToday;
                    _this.dataManager.MyPlayer.SignDiamond = jsObj.SignJewel;
                    _this.dataManager.MyPlayer.SignDays = jsObj.signDays;
                    _this.dataManager.SystemData.ServerTime = jsObj.serverTime;
                    _this.dataManager.MyPlayer.DiamondNum = jsObj.jewel;
                    var event = new egret.Event("onGetSignInfo", true);
                    _this.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //签到
    Protocol.prototype.sign = function () {
        var _this = this;
        var url = this.urlPrefix + "sign.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.MyPlayer.SignToday = jsObj.signToday;
                    _this.dataManager.MyPlayer.SignDiamond = jsObj.SignJewel;
                    _this.dataManager.MyPlayer.SignDays = jsObj.signDays;
                    _this.dataManager.SystemData.ServerTime = jsObj.serverTime;
                    _this.dataManager.MyPlayer.DiamondNum = jsObj.jewel;
                    var event = new egret.Event("closeSignScene", true);
                    _this.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //获取签到10条信息
    Protocol.prototype.getSignNpc = function () {
        var _this = this;
        var url = this.urlPrefix + "signrecord.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.SystemData.SignTodayNum = jsObj.signTodayNum;
                    // this.dataManager.SystemData.SignInfo = [];
                    var arr = [];
                    var jsObjArr = jsObj.signRecordClientList;
                    var i = 0;
                    for (i = 0; i < jsObjArr.length; i++) {
                        arr.push({ name: jsObjArr[i].name,
                            diamondNum: jsObjArr[i].diamondNum });
                    }
                    _this.dataManager.SystemData.SignInfo = arr;
                    var event = new egret.Event("ongetSignNpc", true);
                    _this.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    ;
    //上传图片
    Protocol.prototype.onUpload = function (photoBase64) {
        var _this = this;
        var url = "http://www.amo9.com/wxsdk/upload.do";
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.POST;
        //urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        req.data = new egret.URLVariables("gameid=naliqu&photo=" + encodeURIComponent(photoBase64));
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var jsObj = JSON.parse(e.target.data);
            if (null != jsObj) {
                var name = jsObj.photo;
                var upday = jsObj.upday;
                var imgName = _this.photoPathPrefix + upday + "/" + name;
                var event = new egret.Event("onUpload", true, false, imgName);
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //充值
    Protocol.prototype.getPay = function (id) {
        var _this = this;
        var url = this.urlPrefix + "pay.do?key=" + this.dataManager.MyPlayer.Key + "&id=" + id;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.MyPlayer.AppId = jsObj.appId;
                    _this.dataManager.MyPlayer.TimeStamp = jsObj.timeStamp;
                    _this.dataManager.MyPlayer.NonceStr = jsObj.nonceStr;
                    _this.dataManager.MyPlayer.Prepay_id = jsObj.prepay_id;
                    _this.dataManager.MyPlayer.SignType = jsObj.signType;
                    _this.dataManager.MyPlayer.PaySign = jsObj.paySign;
                    var event = new egret.Event("Onpay", true);
                    _this.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //申请推广员
    Protocol.prototype.promotionApply = function (name, contact, gameName, wechat) {
        var _this = this;
        WndManager.root.main.dataManager.MyPlayer.promotion = null;
        var url = this.urlPrefix + "papply.do?key=" + this.dataManager.MyPlayer.Key + "&name=" + name + "&contact=" + contact + "&gname=" + gameName
            + "&wechat=" + wechat;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onPromotionApply", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //获取我的推广申请信息
    Protocol.prototype.getMyPromotionApply = function () {
        var _this = this;
        WndManager.root.main.dataManager.MyPlayer.promotion = null;
        var url = this.urlPrefix + "pinfo.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onPromotionInfo", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //申请提现
    Protocol.prototype.withdrawApply = function (cnum, bankname, accoutno, accoutname) {
        var _this = this;
        var url = this.urlPrefix + "wapply.do?key=" + this.dataManager.MyPlayer.Key + "&cnum=" + cnum + "&bankname=" + bankname + "&accoutno=" + accoutno
            + "&accoutname=" + accoutname;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onWithdrawApply", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //获取我的提现记录
    Protocol.prototype.getMyWithdrawApply = function () {
        var _this = this;
        WndManager.root.main.dataManager.MyPlayer.promotion = null;
        var url = this.urlPrefix + "wshow.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onWithdrawInfo", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //获取玩家信息
    Protocol.prototype.zuanshiNum = function () {
        var _this = this;
        this.gameurl = "";
        var url = this.urlPrefix + "playinfo.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var jsObj = JSON.parse(e.target.data);
                if (jsObj) {
                    _this.dataManager.MyPlayer.DiamondNum = Number(jsObj.jewel);
                    var event = new egret.Event("onzuanshiNum");
                    self.dispatchEvent(event);
                }
            }
        }, this);
        urlloader.load(req);
    };
    //获取我的反馈记录
    Protocol.prototype.getFeedbacks = function () {
        var url = this.urlPrefix + "feedbacklist.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data);
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onGetFeedback", true, true, ret);
                self.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    Protocol.prototype.getQrImgPath = function () {
        var _this = this;
        var url = this.urlPrefix + "createqr.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data, "33");
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("getQrImg", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    //打开充值页面
    Protocol.prototype.getChargeAddr = function () {
        var _this = this;
        var url = this.urlPrefix + "chargeaddr.do?key=" + this.dataManager.MyPlayer.Key;
        console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log(e.target.data, "33");
            var ret = e.target.data;
            if (MyUtils.checkStringIsNotNulll(ret)) {
                var event = new egret.Event("onGetChargeAddr", true, false, ret);
                _this.dispatchEvent(event);
            }
        }, this);
        urlloader.load(req);
    };
    return Protocol;
}(egret.Sprite));
__reflect(Protocol.prototype, "Protocol");
//# sourceMappingURL=Protocol.js.map