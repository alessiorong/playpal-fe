import { Component, OnInit } from '@angular/core';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team/team.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  teams : Team[] = [];
  selectedTeamId!: number;
  newTeamName: string='';

  constructor(
    private teamService : TeamService,
    private ruoter : Router
  ){}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeam().subscribe({
      next: (teams) => {
        this.teams = teams;
      },
      error: () => {
        console.error('Errore nel caricamento dei team');
      }
    });
  }

  onSelectTeam(): void {
    if(this.selectedTeamId){
      this.ruoter.navigate([`/team/${this.selectedTeamId}`]);
    } else {
      console.error('Seleziona un team prima di procedere');
    }
  }

  onCreatePlayer() : void {
    this.ruoter.navigate(['/new-player']);
  }

  onCreateTeam(): void {
    this.ruoter.navigate(['/new-team']);
  }





}
