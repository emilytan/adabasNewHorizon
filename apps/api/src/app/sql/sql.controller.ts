import {
  Controller,
  HttpException,
  HttpStatus,
  Body,
  Param,
  Get,
  Post
} from '@nestjs/common';
import { parseAdaMap, fieldToMap } from '../functions/sharedfunction';
import { Adabas, AdabasMap } from 'adabas-tcp';

class CallData {
  fnr?: number;
  map?: AdabasMap;
  criteria?: string;
  isn?: number;
  object: any;
}

@Controller(':host/:port/sql')
export class SqlController {
  @Post()
  async execSQL(
    @Body() body,
    @Param('host') host,
    @Param('port') port
  ): Promise<any> {
    try {
      const ada = new Adabas(host, port);
      let callData = new CallData();
      const query: string = body.sql
        .replace(/^[ \t]+/gm, '')
        .replace(/^[ \r\n]+/gm, ' ')
        .replace(/[ ][fF][rR][oO][mM][ ]/gm, ' FROM ')
        .replace(/[ ][sS][eE][tT][ ]/gm, ' SET ')
        .replace(/[ ][wW][hH][eE][rR][eE][ ]/gm, ' WHERE ')
        .replace(/[ ][vV][aA][lL][uU][eE][sS][ ]/gm, ' VALUES ');
      const method = query.substring(0, 6).toUpperCase();
      let result = '';
      switch (method) {
        case 'SELECT': {
          const fields = query
            .substring(6)
            .split(' FROM ')[0]
            .replace(/[ \t]+/gm, '')
            .split(',');
          const file = Number(
            query
              .substring(6)
              .split(' FROM ')[1]
              .split(' WHERE ')[0]
          );
          if (
            query
              .substring(6)
              .split(' FROM ')[1]
              .split(' WHERE ').length > 1
          ) {
            const condition = query
              .split(' WHERE ')[1]
              .replace(/^[ \t]+/gm, '')
              .replace(/[ \t\n\r]+$/gm, '');
            if (
              condition
                .split('=')[0]
                .replace(/^[ \t]+/gm, '')
                .replace(/[ \t\n\r]+$/gm, '')
                .toLocaleUpperCase() === 'ISN'
            ) {
              callData.isn = Number(
                condition
                  .split('=')[1]
                  .replace(/^[ \t]+/gm, '')
                  .replace(/[ \t\n\r]+$/gm, '')
              );
            } else {
              callData.criteria = condition;
            }
          }

          if (body.map) {
            callData.map = parseAdaMap(body.map, file);
          } else {
            if (fields.length === 1 && fields[0].replace(' ', '') === '*') {
              callData.fnr = file;
            } else {
              await ada.readFDT({ fnr: file }).then(res => {
                callData.map = fieldToMap(fields, res, file);
              });
            }
          }
          break;
        }
        case 'DELETE': {
          const file = Number(query.split(' FROM ')[1].split(' WHERE ')[0]);
          const criteria = query
            .split(' FROM ')[1]
            .split(' WHERE ')[1]
            .replace(/^[ \t]+/gm, '')
            .replace(/[ \t\n\r]+$/gm, '');
          if (body.map) {
            const adaMap = parseAdaMap(body.map, file);
            callData.map = adaMap;
            callData.criteria = criteria;
          } else {
            callData.fnr = file;
            callData.criteria = criteria;
          }
          return ada.delete(callData).then(res => {
            // console.log(res);
            ada.close().then(() => ada.disconnect());
            return res;
          });
          break;
        }
        case 'UPDATE': {
          const file = Number(query.substring(6).split(' SET ')[0]);
          const value = query
            .substring(6)
            .split(' SET ')[1]
            .split(' WHERE ')[0]
            .replace(/^[ \t]+/gm, '')
            .replace(/[ \t\n\r]+$/gm, '');

          const criteria = query
            .split(' WHERE ')[1]
            .replace(/^[ \t]+/gm, '')
            .replace(/[ \t\n\r]+$/gm, '');

          let obj = {};
          if (value.substr(0, 1) === '{') {
            obj = JSON.parse(value);
          } else {
            value.split(',').forEach(v => {
              Object.assign(
                obj,
                JSON.parse(
                  '{"' +
                    v
                      .split('=')[0]
                      .replace(' ', '')
                      .replace(/^[ \t]+/gm, '')
                      .replace(/[ \t\n\r]+$/gm, '') +
                    '":"' +
                    v
                      .split('=')[1]
                      .replace(/^[ \t]+/gm, '')
                      .replace(/[ \t\n\r]+$/gm, '') +
                    '"}'
                )
              );
            });
          }

          if (body.map) {
            const adaMap = parseAdaMap(body.map, file);
            callData = {
              map: adaMap,
              criteria: criteria,
              object: obj
            };
          } else {
            callData = {
              fnr: file,
              criteria: criteria,
              object: obj
            };
          }
          return ada.update(callData).then(res => {
            ada.close().then(() => ada.disconnect());
            return res;
          });
          break;
        }
        case 'INSERT': {
          const file = Number(query.substring(11).split(' VALUES ')[0]);
          const value = query
            .substring(11)
            .split(' VALUES ')[1]
            .replace(/^[ \t]+/gm, '')
            .replace(/[ \t\n\r]+$/gm, '');

          const obj = JSON.parse(value);
          if (body.map) {
            const adaMap = parseAdaMap(body.map, file);
            callData = {
              map: adaMap,
              object: obj
            };
          } else {
            callData = {
              fnr: file,
              object: obj
            };
          }
          return ada.create(callData).then(res => {
            // console.log(res);
            ada.close().then(() => ada.disconnect());
            return res;
          });
          break;
        }
        default: {
          console.log('Invalid method - ', method);
          throw new Error('Invalid method - ' + method);
          break;
        }
      }

      // if (body.map) {
      //     const adaMap = parseAdaMap(body.map, fileid);
      //     callData = {
      //         map: adaMap
      //     };
      // } else {
      //     callData = {
      //         fnr: fileid
      //     };
      // }
      return ada.read(callData).then(res => {
        // console.log(res);
        ada.close().then(() => ada.disconnect());
        return res;
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
