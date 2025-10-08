import { RouterModule, Routes } from '@angular/router';
import { Animals } from './animals/animals';
import { Fruits } from './fruits/fruits';
import { NgModule } from '@angular/core';
import { Generic } from './generic/generic';
import { Home } from './home/home';
import { DataViewComponent } from './data-view/data-view';
import { CardDetailComponent } from './data-view/card-detail';

export const routes: Routes = [
    { path: 'animals', component: Animals },
    { path: 'fruits', component: Fruits },
    { path: '', component: Home },
    { path: 'generic/:id', component: Generic },
    { path: 'data-view', component: DataViewComponent },
    { path: 'data-view/:unit', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }