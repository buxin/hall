class IdManager {
	private static START_ID:number = 0;
	private id:number;

	public constructor() {
		this.resetId();
	}

	public resetId():void
	{
		this.id = IdManager.START_ID;
	}

	public getNewId():number
	{
		var retId = this.id;
		this.id++;
		return retId;
	}
}