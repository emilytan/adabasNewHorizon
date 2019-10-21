import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('read')
export class ReadController {
    @Get()
    async getAll(): Promise<any> {
        try {
           return 'test read';
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
