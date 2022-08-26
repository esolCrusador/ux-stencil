export type IFormLabels<TForm> = {
    [key in keyof TForm]: string
};
