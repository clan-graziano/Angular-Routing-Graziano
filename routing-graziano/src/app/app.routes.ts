import { RouterModule, Routes } from '@angular/router';
import { Animals } from './animals/animals';
import { Fruits } from './fruits/fruits';
import { NgModule } from '@angular/core';
import { Generic } from './generic/generic';
import { Home } from './home/home';

export const routes: Routes = [

    {path: 'animals', component: Animals },
    {path: 'fruits', component: Fruits },
    {path: '', component: Home },
    { path: 'generic/:id', component: Generic }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }