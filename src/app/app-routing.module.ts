import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameListComponent} from "./main/game-list/game-list.component";
import {GameCreateComponent} from "./main/game-create/game-create.component";

const routes: Routes = [
  { path: '', component: GameListComponent, pathMatch: 'full' },
  { path: 'create', component: GameCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
