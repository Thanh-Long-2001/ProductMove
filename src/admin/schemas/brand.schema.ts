import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type BrandDocument = Document & Brand;

@Schema()
export class Brand {
    name: string;
    country: string;
    image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
