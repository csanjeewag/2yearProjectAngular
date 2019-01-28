export interface NewTask {
    taskId:number;
    taskName:string;
    eventId:string;
    startDate:Date;
    endDate:Date;
    budgetedCost:number;
    description:string;
    //employeeId:number;
    employees:Array<any>;
    status:boolean;
    addDate:Date;
}

