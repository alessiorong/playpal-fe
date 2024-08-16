import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player/player.service';

@Component({
  selector: 'app-playerlist',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './playerlist.component.html',
  styleUrl: './playerlist.component.css'
})
export class PlayerlistComponent implements OnInit {
  playerlist : Player[] = [];
  teamId!: number;

  constructor(private playerService : PlayerService, private route : ActivatedRoute){}
  ngOnInit(): void {
    const teamIdStr = this.route.snapshot.paramMap.get("teamId");
    if(teamIdStr){
      this.teamId = +teamIdStr; //converte la stringa in un numero
      this.playerService.getAllPlayersByTeamId(this.teamId).subscribe(
        response =>{ this.playerlist = response;
        },
        error => {
          console.error('Errore nel recupero dei giocatori', error)
        }
     );
    }
    
  }



}
