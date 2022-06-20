import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCreateComponent } from './main/game-create/game-create.component';
import { GameListComponent } from './main/game-list/game-list.component';
import {StoreModule} from "@ngrx/store";
import {GamesEffects, reducer} from "./store/store";
import {EffectsModule} from "@ngrx/effects";
import {environment} from "../environments/environment";
import {StoreService} from "./store/store.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {GameCardComponent} from "./components/game-card/game-card.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {OverlayContainer} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
    GameCreateComponent,
    GameListComponent,
    GameCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('games', reducer),
    EffectsModule.forRoot([GamesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NoopAnimationsModule,
    MatSnackBarModule
  ],
  providers: [StoreService, { provide: OverlayContainer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
