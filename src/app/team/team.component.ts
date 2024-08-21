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
  gameId!: number;
  

  constructor(private teamService: TeamService, private route : ActivatedRoute, private router : Router){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.teamService.getTeamByid(+id).subscribe(t => this.team = t);
    }
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
    })
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
