export interface NewTask {
    //taskId:number;
    taskName:string;
    eventName:string;
    startDate:Date;
    endDate:Date;
    budgetedCost:number;
    description:string;
    employeeEmpId:string;
    employees:Array<any>;
    admin:string;
    status:boolean;
    addDate:Date;
}

