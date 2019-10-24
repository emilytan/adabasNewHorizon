export class FDT {
  name: string;
  format: string;
  length: number;

  constructor() {
    this.name = '';
    this.format = '';
    this.length = null;
  }
}

export class AdabasMap {
  shortName: string;
  type: string;
  size: number;
  longName: string;

  constructor() {
    this.shortName = '';
    this.type = '';
    this.size = null;
    this.longName = '';
  }
}

export enum FDTFormat {
  A = 'alpha',
  B = 'binary',
  F = 'float',
  G = 'fixed',
  P = 'packed',
  U = 'unpacked',
  W = 'wide',
  N = 'unpacked',
  I = 'fixed'
}
