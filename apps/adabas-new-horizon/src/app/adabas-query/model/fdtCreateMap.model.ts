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
  shortname: string;
  type: string;
  size: number;
  longname: string;

  constructor() {
    this.state = false;
    this.shortname = '';
    this.type = '';
    this.size = null;
    this.longname = '';
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
