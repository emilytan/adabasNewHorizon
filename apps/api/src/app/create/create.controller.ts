import { Controller, Post, Param, Body } from '@nestjs/common';
import { Adabas, AdabasMap } from 'adabas-tcp';

@Controller(':host/:port/create')
export class CreateController {
    @Post('fileid/:fileid')
    async create(@Param('fileid') fileid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            // console.log('body.object', body.object);
            const ada = new Adabas(host, port);
            // const test = { "AH": 999999 };
            // const test = { "AA": "99999999", "AB": { "AC": "TestUser", "AE": "HI", "AD": "" }, "AF": "M", "AG": "M", "AH": 999999, "A1": { "AI": ["3 RUE DE GRANBY"], "AJ": "ST-ETIENNE", "AK": "42100", "AL": "F" }, "A2": { "AN": "9999", "AM": "42452720" }, "AO": "VENT56", "AP": "CHEF DE SERVICE", "AQ": [{ "AR": "EUR", "AS": 9999, "AT": [29] }], "A3": { "AU": 19, "AV": 5 }, "AW": [{ "AX": 19990701, "AY": 19990731 }], "AZ": ["FRE", "ENG"] };
            let callData;
            if (body.map) {
                const adaMap = new AdabasMap(fileid);
                callData = {
                    map: adaMap, object: body.object
                };
            } else {
                callData = {
                    fnr: fileid, object: body.object
                };
            }
            return ada.create(callData).then(res => {
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
