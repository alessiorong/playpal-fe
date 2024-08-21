import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../service/game/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-game',
  standalone: true,
  imports: [],
  templateUrl: './delete-game.component.html',
  styleUrl: './delete-game.component.css'
})
export class DeleteGameComponent implements OnInit {
  game!: Game;
  gameId!: number;
  teamId!: number;

  constructor(
    private gameService : GameService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      this.gameId = +params['gameId'];
    })
  }

  onDelete(): void{
    this.gameService.deleteGameById(this.gameId).subscribe({
      next: () => { this.router.navigate([`gamelist/${this.gameId}/${this.teamId}`]);
      },
      error: (err) => {
        console.error('Errore nella eliminazione della partita')
      }
    });
  }



}
