import { Controller, Param, Body, Put } from '@nestjs/common';
import { Adabas, AdabasMap } from 'adabas-tcp';
import { parseAdaMap } from '../functions/sharedfunction';

@Controller(':host/:port/update')
export class UpdateController {
    @Put('fileid/:fileid')
    async update(@Param('fileid') fileid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            // console.log('body.object', body.object);
            const ada = new Adabas(host, port);
            // const test = { "AH": 999999 };
            let callData;
            if (body.map) {
                const adaMap = parseAdaMap(body.map, fileid);
                callData = {
                    map: adaMap, object: body.object
                };
            } else {
                callData = {
                    fnr: fileid, object: body.object
                };
            }
            return ada.update(callData).then(res => {
                console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
