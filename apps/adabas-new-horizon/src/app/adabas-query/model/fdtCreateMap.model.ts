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
  state?: boolean;
  shortName: string;
  type: string;
  size: number;
  longName: string;

  constructor() {
    this.state = false;
    this.shortName = '';
    this.type = '';
    this.size = null;
    this.longName = '';
  }
}

export enum FDTFormat {
  A = 'ALPHA',
  B = 'BINARY',
  F = 'FLOAT',
  G = 'FIXED',
  P = 'PACKED',
  U = 'UNPACKED',
  W = 'WIDE',
}
