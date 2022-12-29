import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandDTO } from './dtos/brand.dto';
import { ProductDTO } from './dtos/product.dto';
import { UserDTO } from './dtos/user.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { Product, ProductDocument } from './schemas/product.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Product.name) 
        private productModel: Model<ProductDocument>,
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        @InjectModel(Brand.name)
        private brandModel: Model<BrandDocument>,
        
        ) {}

    // Product
    async createProduct(productDto: ProductDTO, image: any): Promise<Product> {
        const newproduct = new this.productModel(productDto);
        newproduct.image = image;
        return newproduct.save();
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find();
    }

    async updateProduct(id: string, productDto: ProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, {...productDto}).exec();
        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<any> {
        return await this.productModel.deleteOne({_id: id}).exec();
    }

    // Brand
    async createBrand(BrandDto: BrandDTO, image: any): Promise<Brand> {
        const newbrand = new this.brandModel(BrandDto);
        newbrand.image = image;
        return newbrand.save();
    }

    async getAllBrands(): Promise<Brand[]> {
        return this.brandModel.find();
    }

    async updateBrand(id: string, BrandDto: BrandDTO): Promise<Brand> {
        const updatedBrand = await this.brandModel.findByIdAndUpdate(id, {...BrandDto}).exec();
        return updatedBrand;
    }

    async deleteBrand(id: string): Promise<any> {
        return await this.brandModel.deleteOne({_id: id}).exec();
    }

    // User
    async createUser(userDto: UserDTO): Promise<User> {
        const newuser = new this.userModel(userDto);
        console.log(newuser);
        return newuser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async updateUser(id: string, userDto: UserDTO): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, {...userDto}).exec();
        return updatedUser;
    }

    async deleteUser(id: string): Promise<any> {
        return await this.userModel.deleteOne({_id: id}).exec();
    }

    async findUserById(id: string) : Promise<User> {
        return await this.userModel.findById(id);
    }

    async updateUserRFToken(id: string, refreshToken: any, refreshTokenExp: any) : Promise<any> {
        return await this.userModel.updateOne({_id: id, refreshToken: refreshToken, refreshTokenExp: refreshTokenExp}).exec();
    }

    async findUser(username: string): Promise<User> {
        const user = await this.userModel.findOne({username: username});
        return user;
    }

    async validRefreshToken(email: string, refreshToken: string): Promise<User> {
    let user = await this.userModel.findOne({email, refreshToken});
    
    if(!user) {
        return null;
    }
    
    if( new Date() > new Date((await user).refreshTokenExp)) {
        
        return null
    }
    
    return user;
    }
}
