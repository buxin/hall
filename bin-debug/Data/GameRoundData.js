/*单局游戏数据*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameRoundData = (function () {
    function GameRoundData() {
        this.roomCreater = "笑眯眯"; //房间创建人昵称
        this.createrAvatar = "http://www.amo9.com/photos/ysld/20161114/2b95f9f674ea4af0b4204e1e5a164299.jpeg"; //房主头像
        this.playerRoundDataArr = []; //本局玩家数据集，默认为按照名次排序，在接受服务器的地方进行排序操作
        this.playerRoundDataJsonStr = [];
        this.construtTestData();
    }
    GameRoundData.prototype.construtTestData = function () {
        // this.roundBeginTime = (new Date()).valueOf();// - (Math.floor(Math.random()*7))*86400;
        // // var date:Date = new Date(this.roundBeginTime);
        // // console.log("日期:"+date.toDateString());
        // // console.log("时间:"+date.toTimeString());
        // // console.log("月:"+date.getMonth());
        // // console.log("日:"+date.getDate());
        // // console.log("时:"+date.getHours());
        // // console.log("分:"+date.getMinutes());
        // this.roomId = 10000 + Math.floor(Math.random()*10000);
        // this.gameStatus = GameConstant.GAME_ROOM_STATUS_FINISHED;
        // this.gameLastTime = 15;
        // var prd1:PlayerRoundData = new PlayerRoundData();
        // prd1.Name = "么么哒的兔";
        // //prd1.Avatar = "";
        // prd1.Point = 5;
        // prd1.Rank = 0;
        // var prd2:PlayerRoundData = new PlayerRoundData();
        // prd2.Name = "皑皑";
        // //prd2.Avatar = "";
        // prd2.Point = 3;
        // prd2.Rank = 1;
        // var prd3:PlayerRoundData = new PlayerRoundData();
        // prd3.Name = "岁月如风";
        // //prd3.Avatar = "";
        // prd3.Point = 2;
        // prd3.Rank = 2;
        // var prd4:PlayerRoundData = new PlayerRoundData();
        // prd4.Name = "夜的黑";
        // //prd4.Avatar = "";
        // prd4.Point = -8;
        // prd4.Rank = 3;
        // this.playerRoundDataArr.push(prd1);
        // this.playerRoundDataArr.push(prd2);
        // this.playerRoundDataArr.push(prd3);
        // this.playerRoundDataArr.push(prd4);
    };
    Object.defineProperty(GameRoundData.prototype, "RoundBeginTime", {
        //本局开局时间
        get: function () {
            return this.roundBeginTime;
        },
        set: function (value) {
            this.roundBeginTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "RoundBeginTimeStr", {
        get: function () {
            var tf = new TimeFormat(this.roundBeginTime);
            return tf.Month + "-" + tf.Days + " " + tf.Hours + ":" + tf.Minutes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "RoomId", {
        //房间号
        get: function () {
            return this.roomId;
        },
        set: function (value) {
            this.roomId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "GameType", {
        //游戏类型
        get: function () {
            return this.gameType;
        },
        set: function (value) {
            this.gameType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "GameStatus", {
        //游戏状态
        get: function () {
            return this.gameStatus;
        },
        set: function (value) {
            this.gameStatus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "GameLastTime", {
        //游戏持续时间
        get: function () {
            return this.gameLastTime;
        },
        set: function (value) {
            this.gameLastTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "RoomCreater", {
        //房间创建人昵称
        get: function () {
            return this.roomCreater;
        },
        set: function (value) {
            this.roomCreater = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "CreaterAvatar", {
        //房主头像
        get: function () {
            return this.createrAvatar;
        },
        set: function (value) {
            this.createrAvatar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "PlayerRoundDataArr", {
        //本局玩家数据集
        get: function () {
            return this.playerRoundDataArr;
        },
        set: function (value) {
            this.playerRoundDataArr = value;
        },
        enumerable: true,
        configurable: true
    });
    //获得本局数据的简要
    GameRoundData.prototype.toJsonString = function () {
        var prd = this.MyPlayerRoundData;
        var timeFormatArr = [];
        var tf = new TimeFormat(this.roundBeginTime);
        var point = 0;
        if (null != prd) {
            point = prd.Point;
        }
        return { gameType: this.gameType, gameLastTime: this.gameLastTime, roomCreater: this.roomCreater,
            avatar: this.createrAvatar, point: point, gameDate: tf.Month + "-" + tf.Days, gameTime: tf.Hours + ":" + tf.Minutes, roomId: this.roomId };
    };
    Object.defineProperty(GameRoundData.prototype, "PlayerRoundDataJsonStr", {
        //本局玩家详细数据
        get: function () {
            if (this.playerRoundDataJsonStr.length == 0) {
                for (var i = 0; i < this.playerRoundDataArr.length; i++) {
                    if (null != this.playerRoundDataArr[i])
                        this.playerRoundDataJsonStr.push(this.playerRoundDataArr[i].toJsonString());
                }
            }
            return this.playerRoundDataJsonStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "MyPlayerRoundData", {
        //我的本局数据
        get: function () {
            var prd = null;
            for (var i = 0; i < this.playerRoundDataArr.length; i++) {
                var temp = this.playerRoundDataArr[i];
                if (null != temp && temp.Nick == WndManager.root.main.dataManager.MyPlayer.Name) {
                    prd = temp;
                    break;
                }
            }
            return prd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "RoundMvpData", {
        get: function () {
            var prd = null;
            var noMvp = false;
            if (this.playerRoundDataArr.length > 0 && null != this.playerRoundDataArr[0]) {
                prd = this.playerRoundDataArr[0];
                for (var i = 1; i < this.playerRoundDataArr.length; i++) {
                    var temp = this.playerRoundDataArr[i];
                    if (null != temp) {
                        if (temp.Point > prd.Point) {
                            noMvp = false;
                            prd = temp;
                        }
                        else if (temp.Point == prd.Point) {
                            noMvp = true;
                        }
                    }
                }
            }
            if (noMvp)
                return null;
            else
                return prd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRoundData.prototype, "RoundWeakData", {
        get: function () {
            var prd = null;
            var noWeak = false;
            if (this.playerRoundDataArr.length > 0 && null != this.playerRoundDataArr[0]) {
                prd = this.playerRoundDataArr[0];
                for (var i = 1; i < this.playerRoundDataArr.length; i++) {
                    var temp = this.playerRoundDataArr[i];
                    if (null != temp) {
                        if (temp.Point < prd.Point) {
                            noWeak = false;
                            prd = temp;
                        }
                        else if (temp.Point == prd.Point) {
                            noWeak = true;
                        }
                    }
                }
            }
            if (noWeak)
                return null;
            else
                return prd;
        },
        enumerable: true,
        configurable: true
    });
    return GameRoundData;
}());
__reflect(GameRoundData.prototype, "GameRoundData");
//# sourceMappingURL=GameRoundData.js.map