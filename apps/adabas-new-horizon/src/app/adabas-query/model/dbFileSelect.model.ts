import { functionType } from './function-type.model';

export class DbFileSelect {
    host: string;
    port: string;
    fnr: number;
    ddlFunction: functionType;

    constructor(newConstruct) {
        this.host = newConstruct['host'];
        this.port = newConstruct['port'];
        this.fnr = newConstruct['fnr'];
        this.ddlFunction = newConstruct['ddlFunction'];
    }
}