export interface Message {
  message: string;
}

export interface RESTAdaMap {
  type: adaType;
  shortname: string;
  longname: string;
  size?: number;
  occ?: number;
  child?: Array<RESTAdaMap>;
}

export enum adaType {
  ALPHA = "ALPHA",
  WIDE = "WIDE",
  BINARY = "BINARY",
  FIXED = "FIXED",
  FLOAT = "FLOAT",
  PACKED = "PACKED",
  UNPACKED = "UNPACKED",
  GROUP = "GROUP",
  PERIODIC = "PERIODIC"
}