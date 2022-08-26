import { R_OK } from 'constants';
import { RequestHandler } from 'express';
import { access, writeFile, mkdirSync } from 'fs';
import * as path from 'path';

type CompiledResponseHandler = (getCompiledHtmlPath: (requestPath: string) => string) => RequestHandler;
const stylePrefix = 'rel="stylesheet" href="';

const existsAsync = (requestPath: string) => new Promise<boolean>(resolve =>
  access(requestPath, R_OK, (error => error ? resolve(false) : resolve(true)))
);
const writeFileAsync = (requestPath: string, body: any) => new Promise<void>((resolve, reject) =>
  writeFile(requestPath, body, error => error ? reject(error) : resolve())
);

function createDirectoryIfNeeded(filePath: string) {
  const targetDir = path.dirname(filePath);

  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      mkdirSync(curDir);
      // tslint:disable-next-line:no-console
      console.debug('Created directory', curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

export const compiledResponseHandler: CompiledResponseHandler = (getCompiledHtmlPath) => async (request, response, next) => {
  if (request.xhr || request.path.includes('.')) {
    next();
    return;
  }

  const compiledHtmlPath = getCompiledHtmlPath(request.path);

  // tslint:disable-next-line:no-console
  console.debug('CompiledHtml', compiledHtmlPath);
  const forceReload = request.query['force-reload'] === 'true';

  if (forceReload || !await existsAsync(compiledHtmlPath)) {
    const sendResponse = response.send.bind(response);

    response.send = (body: any) => {
      const styleIndex = body.indexOf(stylePrefix) + stylePrefix.length;
      const styleEndIndex = body.indexOf('"', styleIndex);
      const stylePath = body.substring(styleIndex, styleEndIndex);
      body = body.replace('{{ StylePath }}', stylePath);

      createDirectoryIfNeeded(compiledHtmlPath);
      writeFileAsync(compiledHtmlPath, body)
        .then(() =>
          // tslint:disable-next-line:no-console
          console.debug('File saved successfuly')
        )
        .catch(error =>
          // tslint:disable-next-line:no-console
          console.error(error)
        );

      sendResponse(body);
      return body;
    };

    next();
    return;
  }

  // tslint:disable-next-line:no-console
  console.debug('Returning File', compiledHtmlPath);
  response.sendFile(compiledHtmlPath);
};
