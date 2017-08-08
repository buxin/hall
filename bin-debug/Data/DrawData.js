/*抽奖数据 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DrawData = (function () {
    function DrawData() {
        this.drawPrice = 10; //单次抽奖花费钻石
        this.rewardArr = [30, 5, 16888, 0, 15, 3, 10, 100, 0, 1]; //所有奖励
        // private drawInfo:Array<any> = [{nick:"代上帝的眼",jewel:200},{nick:"聪明的坏蛋",jewel:80},
        // 							{nick:"代上帝的眼",jewel:1500},{nick:"天下无伤",jewel:100},
        // 							{nick:"逗比",jewel:200},{nick:"天下无伤",jewel:100}];//抽奖记录
        this.drawInfo = []; //抽奖记录
        this.result = 0;
    }
    Object.defineProperty(DrawData.prototype, "Idx", {
        get: function () {
            if (this.drawInfo.length > 0)
                return Number(this.drawInfo[0].idx);
            else
                return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawData.prototype, "DrawWinner", {
        //最新中奖者
        get: function () {
            if (this.drawInfo.length > 0)
                return this.drawInfo[0].nick;
            else
                return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawData.prototype, "DrawWinNum", {
        //最新中奖金额
        get: function () {
            if (this.drawInfo.length > 0)
                return Number(this.drawInfo[0].jewel);
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawData.prototype, "Result", {
        //抽奖结果
        get: function () {
            return this.result;
        },
        set: function (value) {
            this.result = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawData.prototype, "DrawPrice", {
        //单次抽奖花费钻石
        get: function () {
            return this.drawPrice;
        },
        set: function (value) {
            this.drawPrice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawData.prototype, "RewardArr", {
        //所有奖励
        get: function () {
            return this.rewardArr;
        },
        set: function (value) {
            this.rewardArr = value;
        },
        enumerable: true,
        configurable: true
    });
    //抽奖记录
    DrawData.prototype.getDrawInfo = function () {
        var ret = [];
        for (var i = 0; i < this.drawInfo.length; i++) {
            var reward = Number(this.drawInfo[i].jewel);
            if (reward <= 0)
                continue;
            // 	var nickname:string=this.drawInfo[i].nick;
            // if(i==0 &&nickname==WndManager.root.main.dataManager.MyPlayer.Name){
            // 	WndManager.root.main.dataManager.MyPlayer.DiamondNum+=reward;
            // }
            ret.push({ name: this.drawInfo[i].nick,
                rewardInfo: [{ text: "获得", style: { "textColor": 0xffffff } },
                    { text: this.drawInfo[i].jewel, style: { "textColor": 0xffe303 } },
                    { text: "钻", style: { "textColor": 0xffffff } }] });
        }
        return ret;
    };
    Object.defineProperty(DrawData.prototype, "DrawInfo", {
        get: function () {
            return this.drawInfo;
        },
        set: function (value) {
            this.drawInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrawData;
}());
__reflect(DrawData.prototype, "DrawData");
//# sourceMappingURL=DrawData.js.map