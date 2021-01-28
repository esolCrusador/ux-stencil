import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { fromEventPattern, merge, NEVER, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, mapTo, publishReplay, refCount, share, skip } from 'rxjs/operators';

export interface ISize {
    readonly width: number;
    readonly height: number;
  }

@Injectable()
export class WindowEventsService {
  private listeners: { [key in keyof WindowEventMap]?: Observable<any> };

  private sizeChanges$: Observable<ISize>;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly ngZone: NgZone,
  ) {
    this.listeners = {};
  }

  public focus$(): Observable<FocusEvent> {
    return this.listen$('focus');
  }

  public popstate$(): Observable<PopStateEvent> {
    return this.listen$('popstate');
  }

  public load$(): Observable<Event> {
    return this.listen$('load');
  }

  public scroll$(): Observable<Event> {
    return this.listen$('scroll');
  }

  public windowSize$(delay?: number): Observable<ISize> {
    if (isPlatformServer(this.platformId))
      throw new Error('Not supported');

    if (!this.sizeChanges$) {
      const resize$ = merge(
        this.resize$(),
        this.rotate$()
      ).pipe(mapTo(undefined));

      this.sizeChanges$ = merge(of(undefined), resize$).pipe(
        map(() => ({ width: window.innerWidth, height: window.innerHeight })),
        distinctUntilChanged((sz1, sz2) => sz1.width === sz2.width && sz1.height === sz2.height),
        publishReplay(1),
        refCount()
      );
    }

    if (!delay)
      return this.sizeChanges$;

    return merge(
      this.sizeChanges$.pipe(first()),
      this.sizeChanges$.pipe(skip(1), debounceTime(delay))
    );
  }

  private resize$(): Observable<UIEvent> {
    return this.listen$('resize');
  }

  private rotate$(): Observable<Event> {
    return this.listen$('orientationchange');
  }

  private listen$<TEvent extends keyof WindowEventMap>(event: TEvent): Observable<WindowEventMap[TEvent]> {
    if (isPlatformServer(this.platformId))
      return NEVER;

    let listener$ = this.listeners[event] as Observable<WindowEventMap[TEvent]>;
    if (!listener$) {
      listener$ = this.ngZone.runOutsideAngular(() =>
        fromEventPattern(
          (handler: (ev: WindowEventMap[TEvent]) => void) => window.addEventListener(event, handler),
          (handler: (ev: WindowEventMap[TEvent]) => void) => window.removeEventListener(event, handler)
        )
      );

      listener$ = listener$.pipe(share());
      this.listeners[event] = listener$ as Observable<WindowEventMap[TEvent]>;
    }

    return listener$;
  }
}
