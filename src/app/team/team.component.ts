import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team/team.service';


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit{
  team : Team | undefined;
  teamId!: number;
  gameId!: number;
  averagePoints!: number;
  averageOffRebounds!: number;
  averageAssist!: number;
  averageDefRebounds!: number;
  averageSteals!: number;
  averageTurnovers!: number;
  averageBlocks!: number;
  averageFTM!: number;
  averageFTA!: number;
  averageTwoPM!: number;
  averageTwoPA!: number;
  averageThreePM!: number;
  averageThreePA!: number;
  totalGamesPlayed!: number;

  constructor(private teamService: TeamService, private route : ActivatedRoute, private router : Router){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      this.gameId = +params['gameId'];
    });
    this.loadTeamDetails();
    this.loadTeamStatistics();
  }

  loadTeamDetails(): void {
    this.teamService.getTeamByid(this.teamId).subscribe(team => {
      this.team = team;
    });
  }

  loadTeamStatistics(): void {
    this.teamService.getTotalGamesPlayed(this.teamId).subscribe(data => this.totalGamesPlayed = data);
    this.teamService.getAveragePoints(this.teamId).subscribe(data => this.averagePoints = data);
    this.teamService.getAverageOffRebounds(this.teamId).subscribe(data => this.averageOffRebounds = data);
    this.teamService.getAverageAssist(this.teamId).subscribe(data => this.averageAssist = data);
    this.teamService.getAverageDefRebounds(this.teamId).subscribe(data => this.averageDefRebounds = data);
    this.teamService.getAverageSteals(this.teamId).subscribe(data => this.averageSteals = data);
    this.teamService.getAverageTurnovers(this.teamId).subscribe(data => this.averageTurnovers = data);
    this.teamService.getAverageBlocks(this.teamId).subscribe(data => this.averageBlocks = data);
    this.teamService.getAverageFTM(this.teamId).subscribe(data => this.averageFTM = data);
    this.teamService.getAverageFTA(this.teamId).subscribe(data => this.averageFTA = data);
    this.teamService.getAverageTwoPM(this.teamId).subscribe(data => this.averageTwoPM = data);
    this.teamService.getAverageTwoPA(this.teamId).subscribe(data => this.averageTwoPA = data);
    this.teamService.getAverageThreePM(this.teamId).subscribe(data => this.averageThreePM = data);
    this.teamService.getAverageThreePA(this.teamId).subscribe(data => this.averageThreePA = data);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
