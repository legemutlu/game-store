import {Game} from "../models/game.model";
import {
  Action,
  createAction,
  createFeatureSelector,
  createReducer, createSelector,
  on,
  props,
} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";

export const fakeResponse: Game[] = [
  {
    name: 'Test',
    bundle: 'test.com',
    owner: 'test@test.com',
    image: 'Violet.img',
  },
  {
    name: 'Test1',
    bundle: 'test1.com',
    owner: 'test1@test.com',
    image: 'Violet.img',
  },
  {
    name: 'Test2',
    bundle: 'test2.com',
    owner: 'test2@test.com',
    image: 'Violet.img',
  },
  {
    name: 'Tes3t',
    bundle: 'test3.com',
    owner: 'test3@test.com',
    image: 'Violet.img',
  },
];

export interface GamesState {
  games: Game[];
  loaded: boolean;
  error?: string | null;
}

export const initialState: GamesState = {
  games: [],
  loaded: false,
  error: null,
};

export enum GamesActionsEnum {
  Init = '[Game] Init',
  LoadGames = '[Game] Load Games',
  LoadGamesSuccess = '[Game] Load Games Success',
  LoadGamesFailure = '[Game] Load Games Failure',
  AddGame = '[Game] Create',
  AddGameSuccess = '[Game] Create Success',
  AddGameFailure = '[Game] Create Failure',
  BrowserReload = '[Game] Browser Reload'
}

export const LoadGames = createAction(GamesActionsEnum.LoadGames);

export const LoadGamesSuccess = createAction(
  GamesActionsEnum.LoadGamesSuccess,
  props<{ data: Game[] }>()
);

export const LoadGamesFailure = createAction(
  GamesActionsEnum.LoadGamesFailure,
  props<{ error: string | null }>()
);

export const AddGame = createAction(
  GamesActionsEnum.AddGame,
  props<{ data: Game }>()
);

export const AddGameSuccess = createAction(
  GamesActionsEnum.AddGameSuccess,
  props<{ data: Game }>()
);

export const AddGameFailure = createAction(
  GamesActionsEnum.AddGameFailure,
  props<{ error: string | null }>()
);

export const BrowserReload = createAction(
  GamesActionsEnum.BrowserReload,
  props<{ data: Game[] }>()
);

@Injectable()
export class GamesEffects {
  constructor(
    private readonly actions$: Actions,
  ) {}

  readonly loadGames$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType(GamesActionsEnum.LoadGames),
      map((data: Game[]) => LoadGamesSuccess({data})),
      catchError((error: string | null) =>
        of(LoadGamesFailure({error}))
      )
    );
  });

  readonly addGame$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType(GamesActionsEnum.AddGame),
      map((data: any) => {
        const game: Game = data.data;
        return AddGameSuccess({data: game});
      }),
      catchError((error: string | null) =>
        of(AddGameFailure({error}))
      )
    );
  });
}

const gamesReducer = createReducer(
  initialState,
  on(LoadGames, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(LoadGamesSuccess, BrowserReload, (state, { data }) => ({
    ...state,
    games: data,
    loaded: true,
    error: null,
  })),
  on(LoadGamesFailure, (state, { error }) => ({ ...state, error })),
  on(AddGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AddGameSuccess, (state, {data}) => {
    // @ts-ignore
    const games: Game[] = JSON.parse(localStorage.getItem('games'));
    if (games){
      let newGames = [...games, data];
      localStorage.setItem('games', JSON.stringify(newGames));
    }else{
      localStorage.setItem('games', JSON.stringify([data]));
    }
    return {
      games: [...state.games, data],
      loaded: true,
      error: null,
    };
  }),
  on(LoadGamesFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: GamesState | undefined, action: Action) {
  return gamesReducer(state, action);
}

export const getGamesState = createFeatureSelector<GamesState>('games');

export const getGamesLoaded = createSelector(
  getGamesState,
  (state: GamesState) => state.loaded
);

export const getAllGames  = createSelector(
  getGamesState,
  (state: GamesState) => state.games
);

