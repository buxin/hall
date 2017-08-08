var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SystemData = (function () {
    function SystemData() {
        this.inform = "抵制不良游戏，拒绝盗版游戏。注意自我保护。谨防受骗上当。适当游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。游戏的目的是休闲娱乐，禁止赌博！"; //系统公告
        this.broadcastInterval = 20000;
        this.serverTime = 0;
        // private chargeData:Array<any> = [{id:1,diamondNum:100,money:1},{id:2,diamondNum:1050,money:10},
        // 							{id:3,diamondNum:5500,money:50},{id:4,diamondNum:13000,money:100},{id:5,diamondNum:120000,money:1000}];
        this.chargeData = []; //充值列表
        this.myInfoListData = [{ id: 0, name: "意见反馈", imgSource: "imgFeedBack_png" }, { id: 1, name: "服务条款", imgSource: "imgTermService_png" },
            { id: 2, name: "加盟合作", imgSource: "imgJoin_png" }, { id: 3, name: "申请推广", imgSource: "imgApplyPromotion_png" }];
        this.discoveryData = [];
        this.signTodayNum = 1093; //今日签到人数
        this.signInfo = [{ name: "代上帝的眼", diamondNum: 200 }, { name: "聪明的坏蛋", diamondNum: 80 },
            { name: "代上帝的眼", diamondNum: 1500 }, { name: "天下无伤", diamondNum: 100 },
            { name: "代上帝的眼", diamondNum: 1500 }, { name: "天下无伤", diamondNum: 100 },
            { name: "代上帝的眼", diamondNum: 1500 }, { name: "天下无伤", diamondNum: 100 },
            { name: "逗比", diamondNum: 200 }, { name: "天下无伤", diamondNum: 100 }]; //系统签到记录，取前10条
        this.allsignInfo = [];
        this.withdrawweekdays = ""; //每周那几天可以提现 0,1,2
        this.withdrawstarttime = ""; //提现日开始时间
        this.withdrawendtime = ""; //提现日结束时间
        this.withdrawminimum = 0; //提现最小值
        this.maintweekdays = ""; //每周哪几天可以维护
        this.maintstarttime = ""; //维护开始时间
        this.maintendtime = ""; //维护结束时间
        this.commission = ""; //充值抽成百分比
        this.gameInfoList = []; //游戏信息
        this.gameSettingArr = null; //游戏时间设置
    }
    SystemData.prototype.analyseGameInfo = function () {
        if (null != this.gameInfoList) {
            this.gameSettingArr = new Array();
            for (var i = 0; i < this.gameInfoList.length; i++) {
                var gi = this.gameInfoList[i];
                if (null != gi) {
                    var gs = new GameSetting();
                    var timeArr = [];
                    for (var j = 0; j < gi.priceList.length; j++) {
                        timeArr.push(gi.priceList[j].gamelasttime);
                    }
                    gs.timeArr = timeArr;
                    gs.gameName = gi.name;
                    this.gameSettingArr.push(gs);
                }
            }
        }
    };
    //游戏设置
    SystemData.prototype.getGameSetting = function (id) {
        if (null != this.gameSettingArr && id < this.gameSettingArr.length && id >= 0)
            return this.gameSettingArr[id];
        else
            return null;
    };
    SystemData.prototype.getWithdrawWeekDays = function () {
        var arrStr = this.withdrawweekdays.split(",");
        var ret = "";
        for (var i = 0; i < arrStr.length; i++) {
            var day = Number(arrStr[i]);
            if (i != arrStr.length - 1) {
                ret += SystemData.WEEK_DAYS[day] + ",";
            }
            else {
                ret += SystemData.WEEK_DAYS[day];
            }
        }
        return ret;
    };
    SystemData.prototype.getWithdrawstarttime = function () {
        return MyUtils.formatTimeStr(this.withdrawstarttime);
    };
    SystemData.prototype.getWithdrawendtime = function () {
        return MyUtils.formatTimeStr(this.withdrawendtime);
    };
    Object.defineProperty(SystemData.prototype, "Inform", {
        get: function () {
            return this.inform;
        },
        set: function (value) {
            this.inform = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "AllsignInfo", {
        get: function () {
            return this.allsignInfo;
        },
        set: function (value) {
            this.allsignInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "BroadcastInterval", {
        get: function () {
            return this.broadcastInterval;
        },
        set: function (value) {
            this.broadcastInterval = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "ChargeData", {
        get: function () {
            return this.chargeData;
        },
        set: function (value) {
            this.chargeData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "MyInfoListData", {
        get: function () {
            return this.myInfoListData;
        },
        set: function (value) {
            this.myInfoListData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "DiscoveryData", {
        //发现页面数据
        get: function () {
            this.discoveryData = [];
            var signDays = WndManager.root.main.dataManager.MyPlayer.SignDays;
            var leftSignDays = GameConstant.GAME_SIGN_DURATION - signDays;
            var signDaysStr = signDays.toString();
            var leftSignDaysStr = leftSignDays.toString();
            this.discoveryData.push({ itemId: GameConstant.ITEM_SIGN, imgSource: "imgSign_png", itemName: "签到", itemDesc: "神人16888等你来拿",
                itemNews: [{ text: "已签", style: { "textColor": 0x585858 } },
                    { text: signDaysStr, style: { "textColor": 0xff9392 } },
                    { text: "天,还有", style: { "textColor": 0x585858 } },
                    { text: leftSignDaysStr, style: { "textColor": 0x12bf7f } },
                    { text: "天就抽大奖", style: { "textColor": 0x585858 } }] });
            var drawWinner = WndManager.root.main.dataManager.DrawData.DrawWinner;
            var drawWinNum = WndManager.root.main.dataManager.DrawData.DrawWinNum;
            if (drawWinNum > 0) {
                this.discoveryData.push({ itemId: GameConstant.ITEM_DRAW, imgSource: "imgDraw_png", itemName: "抽奖", itemDesc: "海量钻石送不停",
                    itemNews: [{ text: drawWinner, style: { "textColor": 0xff9392 } },
                        { text: "抽取了", style: { "textColor": 0x585858 } },
                        { text: drawWinNum, style: { "textColor": 0x12bf7f } },
                        { text: "钻", style: { "textColor": 0x585858 } }
                    ]
                });
            }
            else {
                this.discoveryData.push({ itemId: GameConstant.ITEM_DRAW, imgSource: "imgDraw_png", itemName: "抽奖", itemDesc: "海量钻石送不停"
                });
            }
            this.discoveryData.push({ itemId: GameConstant.ITEM_EXP_SHARE, imgSource: "imgExpShare_png", itemName: "经验分享", itemDesc: "三人行必有我师,去看看师傅吧！",
                itemNews: [{ text: "正在研发中...", style: { "textColor": 0x585858 } }
                ] });
            return this.discoveryData;
        },
        set: function (value) {
            this.discoveryData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "ServerTime", {
        get: function () {
            //实际上，应该在打开签到页面的时候，更新一下系统时间
            return this.serverTime;
        },
        set: function (value) {
            //实际上，应该在打开签到页面的时候，更新一下系统时间
            this.serverTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "SignTodayNum", {
        //今日签到人数
        get: function () {
            return this.signTodayNum;
        },
        set: function (value) {
            this.signTodayNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemData.prototype, "SignInfo", {
        //签到记录
        get: function () {
            var ret = [];
            for (var i = 0; i < this.signInfo.length; i++) {
                // ret.push({info:WndManager.root.main.protocol.+" 获得"+this.signInfo[i].diamondNum+"钻"});
                ret.push({ info: WndManager.root.main.protocol.dataManager.SystemData.signInfo[i].name
                        + " 获得" + WndManager.root.main.protocol.dataManager.SystemData.signInfo[i].diamondNum + "钻" });
            }
            return ret;
        },
        set: function (value) {
            this.signInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    SystemData.prototype.ongetSignNpc = function () {
    };
    return SystemData;
}());
SystemData.WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];
__reflect(SystemData.prototype, "SystemData");
//# sourceMappingURL=SystemData.js.map