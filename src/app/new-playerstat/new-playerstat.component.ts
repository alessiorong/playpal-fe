import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../service/player/player.service';
import { GameService } from '../service/game/game.service';
import { PlayerStat } from '../model/player-stat.model';


@Component({
  selector: 'app-new-playerstat',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-playerstat.component.html',
  styleUrl: './new-playerstat.component.css'
})
export class NewPlayerstatComponent implements OnInit {
  selectedPlayerFirstname!: string;
  selectedPlayerLastname!: string;
  selectedPlayerId!: number;
  gameId!: number;
  playerStatId!: number;
  points: number = 0;
  assist: number = 0;
  rebound: number = 0;
  isSubmitted = false;

  constructor(
    private playerService : PlayerService,
    private gameService : GameService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
      this.selectedPlayerId = +params['playerId'];

      this.playerService.getPlayerById(this.selectedPlayerId).subscribe(player => {
        this.selectedPlayerFirstname = player.firstname;
        this.selectedPlayerLastname = player.lastname;
      });
    });
  }

  onSubmit(ngForm : NgForm){
    /*const newStat : PlayerStat = {
      playerFirstname: this.selectedPlayerFirstname,
      playerLastname: this.selectedPlayerLastname,
      points: this.points,
      assist: this.assist,
      oRebound: this.
      playerId: this.selectedPlayerId
    }*/
    const newStat : PlayerStat = {
      playerFirstname: this.selectedPlayerFirstname,
      playerLastname: this.selectedPlayerLastname,
      points: 0,
      oRebound: 0,
      dRebound: 0,
      assist: 0,
      turnover: 0,
      steal: 0,
      block: 0,
      freeThrowMade: 0,
      freeThrowAttempted: 0,
      twoPointsMade: 0,
      twoPointsAttempted: 0,
      threePointsMade: 0,
      threePointsAttempted: 0,
      playerId: 0
    }

    this.playerService.createPlayerStatByPlayerId(newStat.playerId).subscribe({
      next: (response) => {
        this.gameService.addPlayerStatToGameByGameId(response.id, this.gameId).subscribe({
          next: () => {
            this.isSubmitted = true;
            this.router.navigate([`statistics/${this.gameId}`]);
          },
          error: () => {
            alert('Errore nell\'aggiunta della statistica alla partita');
          }
        });
      },
      error: () => {
        alert('Errore nella creazione della statistica del giocatore');
      }
    });
  } 



}
