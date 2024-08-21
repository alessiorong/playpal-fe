import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GameService } from '../service/game/game.service';

@Component({
  selector: 'app-change-scores',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './change-scores.component.html',
  styleUrl: './change-scores.component.css'
})
export class ChangeScoresComponent implements OnInit {
  teamId!: number;
  gameId!: number;
  myFinalScore!: number;
  oppositeFinalScore!: number;
  isSubmitted = false;

  constructor(
    private gameService : GameService,
    private router : Router,
    private route : ActivatedRoute
  ){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
      this.teamId = +params['teamId'];
    });
  }

  updateScores(ngForm:NgForm): void {
    if(ngForm.valid){
      const {myFinalScore, oppositeFinalScore} = ngForm.value;

      this.gameService.updateMyFinalScore(this.gameId, myFinalScore).subscribe({
        next: () => {
          this.gameService.updateOppositeFinalScore(this.gameId, oppositeFinalScore).subscribe({
            next: () => {
              this.isSubmitted = true;
              this.router.navigate([`/gamelist/${this.gameId}/${this.teamId}`]);
            },
            error: () => {
              console.error('Errore durante aggiornamento dello score dell\'avversario');
            }
        });
      },
      error: () => {
        console.error('Errore durante aggiornamento my score');
      }
      });
    }
  }

}
