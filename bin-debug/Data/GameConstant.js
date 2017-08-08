var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConstant = (function () {
    function GameConstant() {
    }
    return GameConstant;
}());
GameConstant.GAME_TYPE_MAJIANG = 1; //象山麻将
GameConstant.GAME_TYPE_XIZHOU = 2; //西周麻将
GameConstant.GAME_TYPE_NIUNIU = 3; //牛牛
GameConstant.GAME_SUBTYPE1 = 1; //清12混8
GameConstant.GAME_SUBTYPE2 = 2; //清10混8
GameConstant.GAME_ROOM_STATUS_GOING = 1; //本局游戏正在进行
GameConstant.GAME_ROOM_STATUS_FINISHED = 2; //本局游戏已经结束
GameConstant.GAME_TYPE_NAME_ARR = ["", "象山麻将", "西周麻将", "牛牛"];
GameConstant.GAME_STATUS = ["", "等待中", "进行中", "已结束"];
GameConstant.GAME_SIGN_DURATION = 7; //签到周期时长
//发现页常量
GameConstant.ITEM_SIGN = 1;
GameConstant.ITEM_DRAW = 2;
GameConstant.ITEM_EXP_SHARE = 3;
//顶框ui布局
GameConstant.TOPSCENE_LAYOUT_HALL = 1;
GameConstant.TOPSCENE_LAYOUT_MYINFO = 2;
//推广信息
GameConstant.PROMOTION_STATUS_SUBMIT = 1; //提交
GameConstant.PROMOTION_STATUS_CHECKING = 2; //正在审核
GameConstant.PROMOTION_STATUS_PASS = 3; //通过
GameConstant.PROMOTION_STATUS_REJECT = 4; //拒绝
GameConstant.PROMOTION_UNVIEW_RESULT = 1; //申请人未曾查看结果
GameConstant.PROMOTION_VIEWED_RESULT = 2; //申请人已经查看结果
__reflect(GameConstant.prototype, "GameConstant");
//# sourceMappingURL=GameConstant.js.map