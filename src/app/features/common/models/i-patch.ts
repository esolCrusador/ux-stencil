export type IPatch<TModel> = { [key in keyof TModel]?: TModel[key]; };
