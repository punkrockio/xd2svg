/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/xd2svg/LICENSE
 */

import { XMLElementOrXMLNode } from 'xmlbuilder';
import { fillParser }          from './fill';
import { Parser, Stroke }      from './models';

export const stroke: Parser = {
  name: 'stroke',
  parse: strokeParser,
};

function strokeParser(src: Stroke, parentElement: XMLElementOrXMLNode) {
  const strokeStyle = fillParser(src, parentElement);
  return strokeStyle + (src.width ? `;stroke-width:${src.width}px` : '');
}
