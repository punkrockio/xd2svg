import colorTransformer from '../utils/colorTransformer';
import { Parser } from "./index";

const document: Document = new (require('jsdom').JSDOM)().window.document;

const fillParser: Parser = {
  name: 'fill',
  parse: fill
};

/**
 * Generate fill style property from object
 * @param {Object} fill - Object representing fill properties
 * @param {Element} parentElement - Element which contain target element
 * @param {String} uuid - Unique identifier for element
 * @param {Object} resources - Object representing images for patterns
 * @return {String} String representing fill style properties
 */
function fill(fill, parentElement: Element, uuid: string, resources): string {
  switch (fill.type) {
    case 'color':
      return colorTransformer(fill.fill.color);
    case 'gradient':
      return `url(#${fill.gradient.ref})`;
    case 'pattern':
      parentElement.appendChild(createPattern(uuid, resources, fill.pattern));

      return `url(#${uuid})`;
    case 'none':
      return 'none';
    default:
      return colorTransformer(fill.color);
  }
}

/**
 * Create pattern for image fill
 * @param {String} uuid - Unique identificator of pattern
 * @param {Object} resources - Object representing images for pattern
 * @param {Object} patternObject - Object representing pattern
 * @return {Element} Created pattern
 */
function createPattern(uuid: string, resources, patternObject): Element {
  const pattern: Element = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
  const image: Element = document.createElementNS('http://www.w3.org/2000/svg', 'image');

  pattern.setAttribute('id', uuid);

  image.setAttribute('xlink:href', resources[patternObject.meta.ux.uid]);
  image.setAttribute('width', patternObject.width);
  image.setAttribute('height', patternObject.height);

  pattern.appendChild(image);

  return pattern;
}

export default fillParser;
