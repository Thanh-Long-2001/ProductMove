import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Brand } from './brand.schema';

export type ProductDocument = Document & Product;

@Schema()
export class Product {
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    speed: number;
    image: string;
    color: string;
    price: number;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Brand', index: true})
    brand: Brand;
    
}

export const ProductSchema = SchemaFactory.createForClass(Product);