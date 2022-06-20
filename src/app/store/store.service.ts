import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AddGame, BrowserReload, GamesState, getAllGames} from "./store";
import {Game} from "../models/game.model";

@Injectable()
export class StoreService {
  public readonly allGames$: Observable<Game[]> = this.store.pipe(
    select(getAllGames)
  );

  constructor(private readonly store: Store<GamesState>) {
  }

  public addGame(game: Game): void {
    this.store.dispatch(AddGame({ data: game }));
  }

  public browserReload(games: Game[]){
    this.store.dispatch(BrowserReload({data: games}))
  }
}
