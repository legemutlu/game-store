import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../store/store.service";
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games: Game[] = [];

  constructor(private readonly storeService: StoreService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    const games: Game[] = JSON.parse(localStorage.getItem('games'));
    this.storeService.browserReload(games);
    this.storeService.allGames$
      .subscribe((games: Game[]) => {
        this.games = games;
      });
  }

}
