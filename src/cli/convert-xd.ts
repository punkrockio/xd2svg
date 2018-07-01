/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/xd2svg/LICENSE
 */

import { existsSync, mkdirSync, writeFile } from 'fs';
import { xd2svg }                           from '../xd2svg';
import { CliOptions, OutputFormat }         from './models';

export async function convertXd(input: string, options: CliOptions): Promise<void> {
  const svgImages: OutputFormat = await xd2svg(process.argv[2], options);

  preparePath(options);

  typeof svgImages === 'string' ?
    writeFile(options.output, svgImages, errorHandler)
    : Object.keys(svgImages).map((key) => writeFile(`${options.output}/${key}.${options.format}`, svgImages[key], errorHandler));
}

function preparePath(options: CliOptions): void {
  const path: string[] = options.output.split('/');
  if (options.single) path.pop();

  if (path.length) {
    path.reduce((prev, cur) => {
      const newPath = `${prev}/${cur}`;

      if (!existsSync(newPath)) {
        mkdirSync(newPath);
      }

      return newPath;
    }, '.');
  }
}

function errorHandler(error) {
  if (error) throw error;
}