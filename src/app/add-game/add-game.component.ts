import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game/game.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Game } from '../model/game.model';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css'
})
export class AddGameComponent implements OnInit{
  teamId!: number;
  isSubmitted = false;

  constructor(
    private gameService : GameService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
    });
  }

  onSubmit(ngForm : NgForm){
    
    const currentGame : Game = {
      gameDay: ngForm.value.gameDay,
      oppositeTeam: ngForm.value.oppositeTeam,
      result: 'da giocare',
      myFinalScore: 0,
      oppositeFinalScore: 0
    };
    
    this.gameService.createGameByTeamId(this.teamId, currentGame).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.router.navigate([`gamelist/${currentGame.id}/${this.teamId}`]);
      },
      error: () => {
        console.error('Errore nell\' aggiunta di questo game');
      }
    });
  }
    
  

}
