import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game/game.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TeamService } from '../service/team/team.service';

@Component({
  selector: 'app-change-result',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './change-result.component.html',
  styleUrl: './change-result.component.css'
})
export class ChangeResultComponent implements OnInit {
  gameId!: number;
  selectedResult: string='da giocare';
  isSubmitted = false;
  results = ['da giocare', 'vinta', 'persa'];
  teamId!: number;

  constructor(
    private gameService : GameService,
    private teamService : TeamService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
      this.loadTeamId();
    });
  }


  onSubmit(ngForm : NgForm): void {
    this.gameService.updateGameResult(this.gameId, this.selectedResult).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.router.navigate(['/gamelist', this.teamId]);
      },
      error: () => {
        alert('Errore durante l\'aggiornamento del risultato');
      }
    });
  }

  loadTeamId(): void {
    this.teamService.getTeamIdByGameId(this.gameId).subscribe({
      next: (teamId) => {
        this.teamId = teamId;
      },
      error: () => {
        alert('Errore nel recupero del teamId');
      }
    });
  }
}
