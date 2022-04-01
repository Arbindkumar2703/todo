export interface TaskModel {
    id:number,
    title:string,
    description: string,
    tasktype:number,
    taskTypeName:string, //Not needed just to be sure it is declared
}

export interface TaskType{
    typeId:number,
    typeName:string,
}
