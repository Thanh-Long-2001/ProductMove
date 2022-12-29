import { 
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Query,
    Request,
    UseGuards,
    UploadedFile,
    UseInterceptors,
    Bind
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import path from 'path';
const path = require('path');
import { AdminService } from './admin.service';
import { BrandDTO } from './dtos/brand.dto';
import { ProductDTO } from './dtos/product.dto';
import { UserDTO } from './dtos/user.dto';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) {};

    // Product
    @Post('api/product/create')
    @UseInterceptors(FileInterceptor ('file', {
        storage: diskStorage({
            destination: 'src/assets/product/images',
            filename(req, file, callback) {
                const fileName = path.parse(file.originalname).name.replace('/\s/g', '') + Date.now();
                const extension = path.parse(file.originalname).ext;
                callback(null, `${fileName}${extension}`)
            },
        })
    }))
    @Bind(UploadedFile())
    async createProduct(file: any, @Body() productDto: ProductDTO) {
        const linkFile = file.path;
        return await this.adminService.createProduct(productDto, linkFile);
    }

    @Get('api/product/getAll')
    async getAllProduct() {
        return this.adminService.getAllProducts();
    }

    @Put('api/product/update/:id')
    async updateProduct(@Param('id') id: string, @Body() productDto: ProductDTO) {
        return await this.adminService.updateProduct(id, productDto);
    }

    @Delete('/api/product/delete/:id')
    async deleteProduct(@Param('id') id: string) {
        return await this.adminService.deleteProduct(id);
    }

    // Brand
    @Post('api/brand/create')
    @UseInterceptors(FileInterceptor ('image', {
        storage: diskStorage({
            destination: 'src/assets/brand/images',
            filename(req, file, callback) {
                const originalname = file.originalname;
                console.log(typeof originalname);
                const fileName = path.parse(originalname).name.replace('/\s/g', '') + Date.now();
                console.log(fileName);
                const extension = path.parse(originalname).ext;
                console.log(extension);
                callback(null, `${fileName}${extension}`)
            }
        })
    }))
    @Bind(UploadedFile())
    async createBrand(file: any, @Body() brandDto: BrandDTO) {
        console.log(file.path)
        const linkFile = file.path;
        console.log(linkFile);
        return await this.adminService.createBrand(brandDto, linkFile);
    }

    @Get('api/brand/getAll')
    async getAllBrand() {
        return this.adminService.getAllBrands();
    }

    @Put('api/brand/update/:id')
    async updateBrand(@Param('id') id: string, @Body() brandDto: BrandDTO) {
        return await this.adminService.updateBrand(id, brandDto);
    }

    @Delete('/api/brand/delete/:id')
    async deleteBrand(@Param('id') id: string) {
        return await this.adminService.deleteBrand(id);
    }

    //User
    @Post('api/user/create')
    async createUser( @Body() userDto: UserDTO) {
        return await this.adminService.createUser(userDto);
    }

    @Get('api/user/getAll')
    async getAllUser() {
        return this.adminService.getAllUsers();
    }

    @Put('api/user/update/:id')
    async updateuser(@Param('id') id: string, @Body() userDto: UserDTO) {
        return await this.adminService.updateUser(id, userDto);
    }

    @Delete('/api/user/delete/:id')
    async deleteuser(@Param('id') id: string) {
        return await this.adminService.deleteUser(id);
    }
}
