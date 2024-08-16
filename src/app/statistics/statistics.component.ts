import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerStat } from '../model/player-stat.model';
import { GameService } from '../service/game/game.service';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player/player.service';
import { TeamService } from '../service/team/team.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {

  playerStats : PlayerStat[] = [];
  players : Player[] = [];
  gameId!: number;
  teamId!: number;
  selectedPlayerId!: number;

  constructor(
    private gameService : GameService,
    private playerService : PlayerService,
    private teamService : TeamService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
      this.loadPlayerStats();
    });
  }

  loadPlayerStats(): void {
    this.gameService.getPlayerStatsByGameId(this.gameId).subscribe({
      next: (stats) => {
        this.playerStats = stats.sort((a, b) => a.playerFirstname.localeCompare(b.playerFirstname));
      },
      error: () => {
        console.error('Errore nel caricamento delle statistiche');
      }
    });

    this.loadPlayersByTeam();
  }

  loadPlayersByTeam(): void {
    this.teamService.getTeamIdByGameId(this.gameId).subscribe({
      next: (teamId) => {
        this.playerService.getAllPlayersByTeamId(teamId).subscribe({
          next: (players) => {
            this.players = players;
          },
          error: () => {
            console.error('Errore nel caricamento dei giocatori');
          }
        });
      },
      error: () => {
        console.error('Errore nel recupero dell\'ID del team');
      }
    });
  } 

  addPlayerStat() : void {
    if(this.selectedPlayerId){
      this.router.navigate([`/add-playerstat/${this.gameId}/${this.selectedPlayerId}`]);
    } else {
      console.error('Seleziona un giocatore prima di aggiungere una statistica');
    }
  }

  addPoints(playerStatId: number|undefined, points: number): void {
    this.gameService.addPoints(playerStatId!, points).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta dei punti');
      }
    });
  }

  addAssist(playerStatId: number|undefined, assist : number): void {
    this.gameService.addAssist(playerStatId!, assist).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta dell\'assist');
      }
    });
  }

  addRebound(playerStatId: number|undefined, rebound : number): void {
    this.gameService.addRebound(playerStatId!, rebound).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del rimbalzo');
      }
    });
  }



}
