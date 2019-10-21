import { Controller, Delete, Param, Body } from '@nestjs/common';
import { Adabas, AdabasMap } from 'adabas-tcp';

@Controller(':host/:port/delete')
export class DeleteController {
    @Delete('fileid/:fileid')
    async delete(@Param('fileid') fileid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            // console.log('body.criteria', body.criteria);
            const ada = new Adabas(host, port);
            let callData;
            if (body.map) {
                const adaMap = new AdabasMap(fileid);
                callData = {
                    map: adaMap, criteria: body.criteria
                };
            } else {
                callData = {
                    fnr: fileid, criteria: body.criteria
                };
            }
            return ada.delete(callData).then(res => {
                // console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
