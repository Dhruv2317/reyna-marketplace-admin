import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhonePipe } from './phone.pipe';
import { SearchPipe } from './search.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    SearchPipe,
    SafePipe
  ],
  imports: [
  ],
  providers: [],
  exports: [PhonePipe,SearchPipe,SafePipe]
})
export class PipesModule { }
