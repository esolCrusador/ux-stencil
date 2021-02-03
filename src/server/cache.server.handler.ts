import { ServerCache } from './server-cache';
import { RequestHandler } from 'express';

const cacheDictionary = new ServerCache();
export const cacheHandler: (duration: number) => RequestHandler = duration => {
  return async (request, response, next) => {
    const key = `response-${request.url}`;

    const sendResponse = response.send.bind(response);

    let fromCache = true;
    const responseBody = await cacheDictionary.getOrUpdate(key, () => new Promise<string>((resolve, reject) => {
      response.send = body => {
        try {
          fromCache = false;
          resolve(body);
        } catch (ex) {
          reject(ex);
        }

        return body;
      };

      try {
        next();
      } catch (ex) {
        reject(ex);
      }
    }), duration, duration / 10);

    response.set('x-from-cache', fromCache.toString());
    sendResponse(responseBody);
  };
};