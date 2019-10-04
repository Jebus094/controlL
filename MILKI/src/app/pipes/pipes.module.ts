import { NgModule } from '@angular/core';
import { HoyPipe } from './hoy.pipe';

@NgModule({
  declarations: [HoyPipe],
  exports:[HoyPipe],
  imports: []
})
export class PipesModule {
 }
