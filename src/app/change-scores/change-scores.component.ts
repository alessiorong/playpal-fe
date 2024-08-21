import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GameService } from '../service/game/game.service';

@Component({
  selector: 'app-change-scores',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './change-scores.component.html',
  styleUrls: ['./change-scores.component.css']
})
export class ChangeScoresComponent implements OnInit {
  teamId!: number;
  gameId!: number;
  myFinalScore!: number;
  oppositeFinalScore!: number;
  selectedResult!: string;
  homeOrAway!: string; 
  results = ['vinta', 'persa'];

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
      this.teamId = +params['teamId'];
    });
  }

  updateScores(ngForm: NgForm): void {
    if (ngForm.valid) {
        const { myFinalScore, oppositeFinalScore, homeOrAway } = ngForm.value;

        let updatedMyScore, updatedOppositeScore;

        if (homeOrAway === 'away') {
            updatedMyScore = oppositeFinalScore;
            updatedOppositeScore = myFinalScore;
        } else {
            updatedMyScore = myFinalScore;
            updatedOppositeScore = oppositeFinalScore;
        }

        this.gameService.updateMyFinalScore(this.gameId, updatedMyScore).subscribe({
            next: () => {
                this.gameService.updateOppositeFinalScore(this.gameId, updatedOppositeScore).subscribe({
                    next: () => {
                        if (homeOrAway === 'home') {
                            this.selectedResult = myFinalScore > oppositeFinalScore ? 'vinta' : 'persa';
                        } else {
                            this.selectedResult = myFinalScore > oppositeFinalScore ? 'vinta' : 'persa';
                        }

                        this.gameService.updateGameResult(this.gameId, this.selectedResult).subscribe({
                            next: () => {
                                this.router.navigate([`/gamelist/${this.gameId}/${this.teamId}`]);
                            },
                            error: () => {
                                console.error('Errore durante l\'aggiornamento del risultato');
                            }
                        });
                    },
                    error: () => {
                        console.error('Errore durante aggiornamento dello score dell\'avversario');
                    }
                });
            },
            error: () => {
                console.error('Errore durante aggiornamento del mio score');
            }
        });
    }
}





}
