import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team/team.service';
import { error } from 'console';


@Component({
  selector: 'app-new-team',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-team.component.html',
  styleUrl: './new-team.component.css'
})
export class NewTeamComponent {
  isSubmitted = false;
  team : Team | undefined;


  constructor(private teamService : TeamService, private router : Router, private route : ActivatedRoute){}


  onSubmit(ngForm : NgForm){
    const currentTeam : Team = {
      name : ngForm.value.name,
      category : ngForm.value.category
    };

    this.teamService.checkTeamNameExists(currentTeam.name).subscribe({
      next: (exists) => {
        if (exists) {
          alert('Esiste già una squadra con questo nome');
        } else {
          this.createTeam(currentTeam);
        }
      },
      error: () => {
        alert('Errore durante la verifica del nome del team');
      }
    });
  }

  createTeam(team : Team): void {
    this.teamService.addTeam(team).subscribe({
      next: (resp) => {
        this.isSubmitted = true;
        this.router.navigate(['']);
      },
      error: (err) => {
        alert('Errore durante la creazione della squadra');
      }
    });
  }


  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
