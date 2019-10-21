import { Controller, Get, Query, Param, Body } from '@nestjs/common';
import { Adabas, AdabasMap } from 'adabas-tcp';
import { object } from '@hapi/joi';

@Controller(':host/:port/read')
export class ReadController {
    @Get('fileid/:fileid')
    async getAll(@Param('fileid') fileid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            // const Employee = new AdabasMap(11)
            //     .alpha(8, 'AA', { name: 'Personnel ID' })
            //     .alpha(3, 'AZ', { name: 'Language', occ: 3 });
            // console.log(Employee);
            const ada = new Adabas(host, port);
            return ada.read({ fnr: fileid, map: body.map || null }).then(res => {
                // console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    @Get('fileid/:fileid/isn/:isnid')
    async getbyISN(@Param('fileid') fileid, @Param('isnid') isnid, @Body() body, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            const ada = new Adabas(host, port);
            return ada.read({ fnr: fileid, map: body.map || null, isn: isnid }).then(res => {
                // console.log(res);
                ada.close().then(() => ada.disconnect());
                return res;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    @Get('fileid/:fileid/criteria')
    async getbyCriteria(@Param('fileid') fileid, @Body() body, @Query() params,
        @Param('host') host, @Param('port') port): Promise<any> {
        try {
            const ada = new Adabas(host, port);
            return ada.read({ fnr: fileid, map: body.map || null, criteria: body.criteria }).then(res => {
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
