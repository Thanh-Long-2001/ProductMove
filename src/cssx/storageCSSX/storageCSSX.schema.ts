import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type StorageCSSXDocument = Document & StorageCSSX;

@Schema()
export class StorageCSSX {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product', index: true})
    productID: string;

    @Prop()
    totalSoluong: number;
}

export const StorageCSSXSchema = SchemaFactory.createForClass(StorageCSSX)