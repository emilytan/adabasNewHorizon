import { Controller, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { Adabas } from 'adabas-tcp';

@Controller(':host/:port/fdt')
export class FdtController {
    @Get('fileid/:fileid')
    async getAll(@Param('fileid') fileid, @Param('host') host, @Param('port') port): Promise<any> {
        try {
            const ada = new Adabas(host, port);
            
            return ada.readFDT({ fnr: fileid }).then(res => {
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
