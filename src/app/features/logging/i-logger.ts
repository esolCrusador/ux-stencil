import { Injectable, InjectionToken } from '@angular/core';

export const LOGGER_KIND: InjectionToken<ILogger> = new InjectionToken<ILogger>('LOGGER_KIND');

@Injectable()
export abstract class ILogger {
  public abstract isEnabled(): boolean;
  public abstract setUser(userId: number, userName: string): void;
  public abstract debug(message: any, optionalParameters?: any[]): void;
  public abstract info(message: any, optionalParameters?: any[]): void;
  public abstract warn(message: any, optionalParameters?: any[]): void;
  public abstract error(message: any, optionalParameters?: any[]): void;
}
