import { Body, Controller, Post } from '@nestjs/common';
import { CssxService } from './cssx.service';
import { ExportToStoreDTO } from './dto/exportToStore.dto';
import { StorageCSSXDTO } from './dto/storageCSSX.dto';
import { StorageCSSX } from './storageCSSX/storageCSSX.schema';

@Controller('cssx')
export class CssxController {
    constructor(private cssxService: CssxService) {}

    @Post('/api/addSoluongToProduct')
    async addSoluong(@Body() storageCSSXDTO: StorageCSSXDTO) {
        return await this.cssxService.addSoluongToProduct(storageCSSXDTO);
    }

    @Post('api/exportToStore')
    async exportToStore(@Body() exportToStoreDTO: ExportToStoreDTO) {
        return await this.cssxService.exportToStore(exportToStoreDTO);
    }
}
