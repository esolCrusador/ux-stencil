import { Injectable } from '@angular/core';
import { ILogger } from '../i-logger';

@Injectable()
export class ConsoleLogger implements ILogger {
  public isEnabled(): boolean {
    return true;
  }

  public setUser(userId: number, userName: string): void {
  }

  public debug(message: any, optionalParameters?: any[]): void {
    // tslint:disable-next-line:no-console
    console.debug(message, optionalParameters);
  }

  public info(message: any, optionalParameters?: any[]): void {
    // tslint:disable-next-line:no-console
    console.info(message, optionalParameters);
  }

  public warn(message: any, optionalParameters?: any[]): void {
    // tslint:disable-next-line:no-console
    console.warn(message, optionalParameters);
  }

  public error(message: any, optionalParameters?: any[]): void {
    // tslint:disable-next-line:no-console
    optionalParameters ? console.error(message, optionalParameters) : console.error(message);
  }
}
