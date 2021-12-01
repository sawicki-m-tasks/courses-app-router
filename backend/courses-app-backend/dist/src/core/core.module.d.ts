import { DynamicModule } from '@nestjs/common';
import { CoreModuleConfig } from './core-module.config';
export declare class CoreModule {
    static forRoot({ algorithm, timeLiving, filesFolder, }: CoreModuleConfig): DynamicModule;
}
