import { SynchrounousResult } from "tmp";

const fs = require('fs');

export default function manifestParser(directory: SynchrounousResult) {
  const json: string = fs.readFileSync(`${directory.name}/manifest`, 'utf-8');

  const manifest = JSON.parse(json);

  const manifestInfo = {
    id: manifest.id,
    version: manifest['uxdesign#version'],
    artboards: [],
    resources: null,
  };

  manifest.children.forEach((child) => {
    if (child.name === 'artwork') manifestInfo.artboards.push(...child.children);

    if (child.name === 'resources') manifestInfo.resources = parseResources(directory.name, child.components);
  });

  manifestInfo.artboards = manifestInfo.artboards.filter((artboard) => Boolean(artboard['uxdesign#bounds']));

  return manifestInfo;
};

function parseResources(dirName: string, resources: any[] = []): { [path: string]: string } {
  const resourcesObject = {};

  resources.forEach((res) => {
    const resourceSourcePath = dirName + '/resources/' + res.path;

    const resourceSource = fs.readFileSync(resourceSourcePath);

    const base64 = new Buffer(resourceSource).toString('base64');

    resourcesObject[res.path] = `data:${res.type};base64,${base64}`;
  });

  return resourcesObject;
}