export enum UploadEventType {
    InProgress = 'INPROGRESS',
    Completed = 'COMPLETED'
  }
  
  export class UploadEvent<TResult = any> {
    constructor(
      public readonly type: UploadEventType,
      public readonly result?: TResult,
      public readonly sentBytes?: number,
      public readonly totalBytes?: number,
    ) { }
  }
  