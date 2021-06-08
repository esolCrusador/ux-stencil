import { ILogger } from "../../logging/i-logger";
import { BrowserType } from "../models/browser-type.enum";


export abstract class BrowserInfoService {
  private readonly isIOSRegex: RegExp = /iPad|iPhone|iPod/;
  private isIOS: boolean = undefined;
  private detectedBrowserType: BrowserType = undefined;

  constructor(
    private readonly logger: ILogger,
  ) {
  }

  public get iOS(): boolean {
    if (this.isIOS === undefined) {
      const userAgent = this.getUserAgent();
      if (userAgent) {
        this.isIOS = this.isIOSRegex.test(userAgent);
      } else {
        this.isIOS = false;
      }
    }

    return this.isIOS;
  }

  public get browserType(): BrowserType {
    if (this.detectedBrowserType === undefined)
      this.detectedBrowserType = this.getBrowserType();

    return this.detectedBrowserType;
  }

  public abstract getLanguages(): readonly string[];
  protected abstract getUserAgent(): string;

  private getBrowserType(): BrowserType {
    try {
      if (this.getUserAgent().indexOf('Edge') !== -1 && navigator.appVersion.indexOf('Edge') !== -1)
        return BrowserType.Edge;

      if (this.getUserAgent().indexOf('Opera') !== -1 || this.getUserAgent().indexOf('OPR') !== -1)
        return BrowserType.Opera;

      if (this.getUserAgent().indexOf('Chrome') !== -1 || this.getUserAgent().indexOf('CriOS') !== -1)
        return BrowserType.Chrome;

      if (this.getUserAgent().indexOf('Safari') !== -1)
        return BrowserType.Safari;

      if (this.getUserAgent().indexOf('Firefox') !== -1)
        return BrowserType.Firefox;

      if ((this.getUserAgent().indexOf('MSIE') !== -1)) // IF IE > 10
        return BrowserType.IE;

      return BrowserType.Unknown;
    } catch (ex) {
      this.logger.error(ex);

      return BrowserType.Unknown;
    }
  }
}
