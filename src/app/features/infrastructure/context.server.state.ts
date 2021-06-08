import { Injectable } from '@angular/core';

@Injectable()
export class ContextServerState {
    statusCode: number

    constructor() {
        this.statusCode = 200;
    }
}
