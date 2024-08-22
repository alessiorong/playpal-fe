import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../service/game/game.service';
import { subscribe } from 'diagnostics_channel';
import { nextTick } from 'process';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  gamelist : Game[] = [];
  filteredGameList: any[] = [];
  teamId! : number;
  isFilteredByUpcoming: boolean = false;

  constructor(
    private gameService : GameService,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.teamId = +this.route.snapshot.paramMap.get('teamId')!;
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGamesByTeam(this.teamId).subscribe({
      next: (response) => {
        this.gamelist = response.sort((a:Game, b:Game) => new Date(b.gameDay).getTime() - new Date(a.gameDay).getTime());
        this.filterByPlayedGames();
      },
      error: (err) => {
        console.error('Errore nel recupero della lista delle partite');
      }
    });
  }

  filterByPlayedGames(): void {
    this.filteredGameList = this.gamelist.filter(game => game.result === 'vinta' || game.result === 'persa');
    this.isFilteredByUpcoming = false; 
  }

  filterUpcomingGames(): void {
    this.filteredGameList = this.gamelist
    .filter(game => game.result === 'da giocare')
    .sort((a,b) => new Date(a.gameDay).getTime() - new Date(b.gameDay).getTime());
    this.isFilteredByUpcoming = true;
  }
  


}
