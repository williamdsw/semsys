import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';

const BOOTSTRAP_COMPONENTS_ROOT = [
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
];

const BOOTSTRAP_COMPONENTS = [
    CollapseModule,
    TabsModule,
    BsDatepickerModule,
    AccordionModule,
    CarouselModule,
];

@NgModule({
    imports: [BOOTSTRAP_COMPONENTS_ROOT],
    exports: [BOOTSTRAP_COMPONENTS]
})
export class BootstrapModule {}