import { Controller, Get, Query, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Adabas, AdabasMap } from 'adabas-tcp';
import { parseAdaMap } from '../functions/sharedfunction';

@Controller(':host/:port/read')
export class ReadController {
    @Get('fileid/:fileid')
    async getAll(@Param('fileid') fileid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            const ada = new Adabas(host, port);
            let callData;
            if (body.map) {
                const adaMap = parseAdaMap(body.map, fileid);
                callData = {
                    map: adaMap
                };
            } else {
                callData = {
                    fnr: fileid
                };
            }
            return ada.read(callData).then(res => {
                // console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get('fileid/:fileid/isn/:isnid')
    async getbyISN(@Param('fileid') fileid, @Param('isnid') isnid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            const ada = new Adabas(host, port);
            let callData;
            if (body.map) {
                const adaMap = parseAdaMap(body.map, fileid);
                callData = {
                    map: adaMap, isn: isnid
                };
            } else {
                callData = {
                    fnr: fileid, isn: isnid
                };
            }
            return ada.read(callData).then(res => {
                // console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get('fileid/:fileid/criteria')
    async getbyCriteria(@Param('fileid') fileid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            const ada = new Adabas(host, port);
            let callData;
            if (body.map) {
                const adaMap = parseAdaMap(body.map, fileid);
                callData = {
                    map: adaMap, criteria: body.criteria
                };
            } else {
                callData = {
                    fnr: fileid, criteria: body.criteria
                };
            }
            return ada.read(callData).then(res => {
                // console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
