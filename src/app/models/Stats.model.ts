import { Time } from '@angular/common';

export class Stats {

	constructor(
		public date:any,
		public items:StatsItem[]
	){}


}

export class StatsItem{
	constructor(public code:number,public time:any){}
}