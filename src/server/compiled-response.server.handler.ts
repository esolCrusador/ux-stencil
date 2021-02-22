import { R_OK } from "constants";
import { RequestHandler } from "express";
import { access, writeFile } from "fs";

type CompiledResponseHandler = (compiledHtmlPath: string) => RequestHandler;

const existsAsync = (path: string) => new Promise<boolean>(resolve =>
  access(path, R_OK, (error => error ? resolve(false) : resolve(true)))
);
const writeFileAsync = (path: string, body: any) => new Promise<void>((resolve, reject) =>
  writeFile(path, body, error => error ? reject(error) : resolve())
);

export const compiledResponseHandler: CompiledResponseHandler = (compiledHtmlPath) => async (request, response, next) => {
  console.debug('CompiledHtml', compiledHtmlPath);
  const forceReload = request.query['force-reload'] === 'true';
  
  if (forceReload || !await existsAsync(compiledHtmlPath)) {
    const sendResponse = response.send.bind(response);

    response.send = body => {
      writeFileAsync(compiledHtmlPath, body)
        .then(() => console.debug('File saved successfuly'))
        .catch(error => console.error(error));

      sendResponse(body);
      return body;
    };

    next();
    return;
  }

  console.debug('Returning File', compiledHtmlPath);
  response.sendFile(compiledHtmlPath);
}