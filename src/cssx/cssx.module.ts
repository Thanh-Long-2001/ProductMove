import { Module } from '@nestjs/common';
import { CssxController } from './cssx.controller';
import { CssxService } from './cssx.service';

@Module({
  controllers: [CssxController],
  providers: [CssxService]
})
export class CssxModule {}
