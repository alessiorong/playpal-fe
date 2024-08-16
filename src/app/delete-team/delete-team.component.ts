import { Component, OnInit } from '@angular/core';
import { Team } from '../model/team.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeamService } from '../service/team/team.service';

@Component({
  selector: 'app-delete-team',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './delete-team.component.html',
  styleUrl: './delete-team.component.css'
})
export class DeleteTeamComponent implements OnInit {

  team! : Team;
  teamId! : number;

  constructor(private route: ActivatedRoute, private router : Router, private teamService : TeamService){}
  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['id'];
  }

  onDelete(){
    this.teamService.deleteTeamById(this.teamId).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => console.error(err)
    });
  }


}
