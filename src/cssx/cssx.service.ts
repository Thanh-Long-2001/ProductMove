import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StatusCSSXtoDLPPDocument } from './storageCSSX/statusCSSXtoDLPP.schema';
import { StorageCSSX, StorageCSSXDocument } from './storageCSSX/storageCSSX.schema';

@Injectable()
export class CssxService {
    constructor(
        private storageCSSXModel: Model<StorageCSSXDocument>,
        private StatusCSSXtoDLPPModel: Model<StatusCSSXtoDLPPDocument>
        ) {}


    async addSoluongToProduct(storageCSSXDTO: any) {
        const {productID, soluong} = storageCSSXDTO;
        const product = await this.storageCSSXModel.findById(productID);
        if(product.totalSoluong === undefined) {
            product.totalSoluong = 0;
            product.totalSoluong = product.totalSoluong + soluong;
            return await this.storageCSSXModel.findByIdAndUpdate(productID, {totalSoluong: product.totalSoluong});
        } else {
            product.totalSoluong = product.totalSoluong + soluong;
            return await this.storageCSSXModel.findByIdAndUpdate(productID, {totalSoluong: product.totalSoluong});
        }
    }

    async exportToStore(exportToStoreDTO: any) {
        const {productID, soluong, storeID} = exportToStoreDTO;
        const product = await this.storageCSSXModel.findById(productID);
        product.totalSoluong = product.totalSoluong - soluong;
        await this.storageCSSXModel.findByIdAndUpdate(productID, {totalSoluong: product.totalSoluong});

        let status = 'NOT DONE';
        const statusCSSXtoDLPP = new this.StatusCSSXtoDLPPModel(exportToStoreDTO);
        statusCSSXtoDLPP.status = status;
        statusCSSXtoDLPP.save();

    }
}
