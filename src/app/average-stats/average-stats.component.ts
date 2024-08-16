import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../service/player/player.service';
import { AverageStats } from '../model/averageStats.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-average-stats',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './average-stats.component.html',
  styleUrl: './average-stats.component.css'
})
export class AverageStatsComponent implements OnInit {

  playerId!: number;
  teamId!: number;
  averageStats : AverageStats | undefined;

  constructor(
    private playerService : PlayerService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = +params['playerId'];
      this.teamId = +params['teamId'];
      this.loadAverageStats();
    });
  }



  loadAverageStats(): void {
    forkJoin({
      points: this.playerService.averagePoints(this.playerId),
      rebounds: this.playerService.averageRebounds(this.playerId),
      assists: this.playerService.averageAssist(this.playerId)
    }).subscribe({
      next: (results) => {
        this.averageStats = {
          averagePoints: parseFloat(results.points.toFixed(2)),
          averageRebound: parseFloat(results.rebounds.toFixed(2)),
          averageAssist: parseFloat(results.assists.toFixed(2))
        };
      },
      error: () => {
        console.error('Errore nel caricamento delle statistiche medie');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/playerlist', this.teamId]);
  }
  



}
