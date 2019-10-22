import { Controller, Get, HttpException, HttpStatus, Body, Post } from '@nestjs/common';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as path from 'path';

const baseFolder = './apiFolder/'
@Controller('fileio')
export class FileIoController {
    constructor() {
        try {
            if (!fs.existsSync(baseFolder)) {
                fs.mkdirSync(baseFolder)
            }
        } catch (err) {
            console.error(err)
        }
    }
    @Get('readfile')
    async getfile(@Body() body): Promise<any> {
        try {
            return readFileSync(baseFolder + body.file, 'utf8');
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('browsefile')
    async getbrowse(@Body() body): Promise<any> {
        try {
            const selectedpath = body.path || './';
            return fs.readdirSync(baseFolder + selectedpath);
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('writefile')
    async create(@Body() body): Promise<any> {
        try {
            fs.writeFileSync(baseFolder + body.file, body.content);
            return  new HttpException(baseFolder + body.file + ' created', HttpStatus.CREATED);
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
