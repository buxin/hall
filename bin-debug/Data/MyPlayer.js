var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyPlayer = (function () {
    function MyPlayer() {
        this.name = ""; //微信昵称
        this.avatar = ""; //微信头像
        this.sex = 1;
        this.key = ""; //代替openid,存在服务器 session里
        this.diamondNum = 900000; //钻石数量
        this.openId = ""; //openId
        this.signToday = false; //今日签到
        this.signDiamond = 100; //今日签到奖励钻石
        this.signDays = 5; //连续签到日
        this.gname = "哪里去棋牌"; //我的群名字
        this.ghtid = 0; //如果有群，则返回群主真实tid,否则返回0
        this.qrPath = ""; //二维码路径
        //身份
        this.roles = 0; //玩家角色 0-普通玩家 1-内部测试人员
        //套餐数据
        this.packstype1 = 0; //套餐类型
        this.packLeftTime = 0; //套餐剩余时间
        this.updatePackDataTime = 0; //更新套餐时间
        //提现记录
        this.withdrawArr = [];
        //收入记录
        this.incomeArr = [];
        //反馈记录
        this.feedbackArr = [];
        //推广申请
        this.promotion = null;
        //    this.openId = (Math.floor(Math.random()*10000)).toString();
        //    this.name ="测试name"+ (Math.floor(Math.random()*10000)).toString();
        this.openId = "o39HWv_i8M2U94Fv2PusU3NYmImwvd1nvvv";
        this.name = "test124";
    }
    Object.defineProperty(MyPlayer.prototype, "Gname", {
        get: function () {
            return this.gname;
        },
        // public set EncodeGname(value:string)
        // {
        // 	egret.log("链接gname1:"+value);
        // 	var str:string = decodeURIComponent(value);
        // 	egret.log("链接gname2:"+str);
        // 	this.gname = str;
        // }
        set: function (value) {
            this.gname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "AppId", {
        // public get EncodeGname()
        // {
        // 	var str:string = encodeURIComponent(this.gname);
        // 	return str;
        // }
        //游戏类型
        get: function () {
            return this.appId;
        },
        set: function (value) {
            this.appId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "TimeStamp", {
        //
        get: function () {
            return this.timeStamp;
        },
        set: function (value) {
            this.timeStamp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "NonceStr", {
        //
        get: function () {
            return this.nonceStr;
        },
        set: function (value) {
            this.nonceStr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "Prepay_id", {
        //
        get: function () {
            return this.prepay_id;
        },
        set: function (value) {
            this.prepay_id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "SignType", {
        //
        get: function () {
            return this.signType;
        },
        set: function (value) {
            this.signType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "PaySign", {
        //
        get: function () {
            return this.paySign;
        },
        set: function (value) {
            this.paySign = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "Name", {
        //////////
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "Avatar", {
        get: function () {
            if (MyUtils.checkStringIsNotNulll(this.avatar))
                return this.avatar;
            else
                return "http://www.naliqu.net/hall/resource/icon.jpg";
        },
        set: function (value) {
            this.avatar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "Sex", {
        get: function () {
            return this.sex;
        },
        set: function (value) {
            this.sex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "Key", {
        get: function () {
            return this.key;
        },
        set: function (value) {
            this.key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "DiamondNum", {
        get: function () {
            return this.diamondNum;
        },
        set: function (value) {
            this.diamondNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "OpenId", {
        get: function () {
            return this.openId;
        },
        set: function (value) {
            this.openId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "SignToday", {
        get: function () {
            return this.signToday;
        },
        set: function (value) {
            this.signToday = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "SignDiamond", {
        //今日签到奖励钻石
        get: function () {
            return this.signDiamond;
        },
        set: function (value) {
            this.signDiamond = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "SignDays", {
        //连续签到日
        get: function () {
            return this.signDays;
        },
        set: function (value) {
            this.signDays = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "DataArr", {
        //获得签到页面日期
        get: function () {
            var serverTime = WndManager.root.main.dataManager.SystemData.ServerTime;
            var todayId = this.signDays;
            if (this.signToday)
                todayId = todayId - 1;
            var ret = [];
            for (var i = 0; i < GameConstant.GAME_SIGN_DURATION; i++) {
                if (i == todayId)
                    ret.push("今日");
                else {
                    var time = serverTime + (i - todayId) * 86400 * 1000;
                    var date = new Date(time);
                    var mon = date.getMonth() + 1;
                    ret.push(mon + "." + date.getDate());
                }
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    //根据提现记录id,获得对应提现记录
    MyPlayer.prototype.getWithdrawDataById = function (id) {
        if (null != this.withdrawArr && this.withdrawArr.length > 0) {
            for (var i = 0; i < this.withdrawArr.length; i++) {
                if (null != this.withdrawArr[i]) {
                    var wid = Number(this.withdrawArr[i].id);
                    if (wid == id)
                        return this.withdrawArr[i];
                }
            }
        }
        return null;
    };
    MyPlayer.prototype.setUpdatePackDataTime = function () {
        this.updatePackDataTime = (new Date()).valueOf();
    };
    Object.defineProperty(MyPlayer.prototype, "PackLeftTime", {
        get: function () {
            var curMill = (new Date()).valueOf();
            return this.packLeftTime - (curMill - this.updatePackDataTime);
        },
        set: function (value) {
            this.packLeftTime = value;
            this.setUpdatePackDataTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPlayer.prototype, "Packstype1", {
        get: function () {
            return this.packstype1;
        },
        set: function (value) {
            this.packstype1 = value;
        },
        enumerable: true,
        configurable: true
    });
    return MyPlayer;
}());
__reflect(MyPlayer.prototype, "MyPlayer");
//# sourceMappingURL=MyPlayer.js.map