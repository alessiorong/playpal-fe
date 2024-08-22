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
  gamesPlayed! : number;

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
      oRebounds: this.playerService.averageORebounds(this.playerId),
      dRebounds: this.playerService.averageDRebounds(this.playerId),
      assists: this.playerService.averageAssist(this.playerId),
      steals: this.playerService.averageSteals(this.playerId),
      turnovers: this.playerService.averageTurnovers(this.playerId),
      blocks: this.playerService.averageBlocks(this.playerId),
      TwoPointsMade: this.playerService.averageTwoPM(this.playerId),
      TwoPointsAttempted: this.playerService.averageTwoPA(this.playerId),
      ThreePointsMade: this.playerService.averageThreePM(this.playerId),
      ThreePointsAttempted: this.playerService.averageThreePA(this.playerId),
      FreeThrowMade: this.playerService.averageFTM(this.playerId),
      FreeThrowAttempted: this.playerService.averageFTA(this.playerId),
      gamesPlayed: this.playerService.getTotalGamesPlayed(this.playerId)
    }).subscribe({
      next: (results) => {
        this.averageStats = {
          averagePoints: parseFloat(results.points.toFixed(2)),
          averageAssist: parseFloat(results.assists.toFixed(2)),
          averageORebound: parseFloat(results.oRebounds.toFixed(2)),
          averageDRebound: parseFloat(results.dRebounds.toFixed(2)),
          averageSteals: parseFloat(results.steals.toFixed(2)),
          averageTurnovers: parseFloat(results.turnovers.toFixed(2)),
          averageBlocks: parseFloat(results.blocks.toFixed(2)),
          average2PM: parseFloat(results.TwoPointsMade.toFixed(2)),
          average2PA: parseFloat(results.TwoPointsAttempted.toFixed(2)),
          average3PM: parseFloat(results.ThreePointsMade.toFixed(2)),
          average3PA: parseFloat(results.ThreePointsAttempted.toFixed(2)),
          averageFTM: parseFloat(results.FreeThrowMade.toFixed(2)),
          averageFTA: parseFloat(results.FreeThrowAttempted.toFixed(2))
        };
        this.gamesPlayed = results.gamesPlayed;
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
