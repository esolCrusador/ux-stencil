export enum ChangeType {
    Added = 1,
    Updated,
    Deleted
}

export interface IChange<TModel> {
    type: ChangeType;
    value: TModel;
}
