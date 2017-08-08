class GameConstant {
	public constructor() {
	}

	public static GAME_TYPE_MAJIANG:number = 1;//象山麻将
	public static GAME_TYPE_XIZHOU:number = 2;//西周麻将
	public static GAME_TYPE_NIUNIU:number = 3;//牛牛

	public static GAME_SUBTYPE1:number = 1;//清12混8
	public static GAME_SUBTYPE2:number = 2;//清10混8

	public static GAME_ROOM_STATUS_GOING:number = 1;//本局游戏正在进行
	public static GAME_ROOM_STATUS_FINISHED:number = 2;//本局游戏已经结束

	public static GAME_TYPE_NAME_ARR:Array<string> = ["","象山麻将","西周麻将","牛牛"];
	public static GAME_STATUS:Array<string> = ["","等待中","进行中","已结束"];

	public static GAME_SIGN_DURATION:number = 7;//签到周期时长

	//发现页常量
	public static ITEM_SIGN:number = 1;
	public static ITEM_DRAW:number = 2;
	public static ITEM_EXP_SHARE:number = 3;

	//顶框ui布局
	public static TOPSCENE_LAYOUT_HALL:number = 1;
	public static TOPSCENE_LAYOUT_MYINFO:number = 2;

	//推广信息
	public static PROMOTION_STATUS_SUBMIT:number = 1;//提交
	public static PROMOTION_STATUS_CHECKING:number = 2;//正在审核
	public static PROMOTION_STATUS_PASS:number = 3;//通过
	public static PROMOTION_STATUS_REJECT:number = 4;//拒绝
	
	public static PROMOTION_UNVIEW_RESULT:number = 1;//申请人未曾查看结果
	public static PROMOTION_VIEWED_RESULT:number = 2;//申请人已经查看结果
}