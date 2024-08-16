import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../service/game/game.service';


@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {

  gamelist : Game[] = [];
  teamId! : number;

  constructor(
    private gameService : GameService,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    const teamIdStr = this.route.snapshot.paramMap.get("teamId");
    if (teamIdStr) {
      this.teamId = +teamIdStr;
      this.gameService.getAllGamesByTeam(this.teamId).subscribe({
        next: (response) => {
          this.gamelist = response;
        },
        error: (err) => {
          console.error('Errore nel recupero della lista delle partite');
        }
      });
      
    }


  }



}
