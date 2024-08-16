import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../service/player/player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-remove-player',
  standalone: true,
  imports: [],
  templateUrl: './remove-player.component.html',
  styleUrl: './remove-player.component.css'
})
export class RemovePlayerComponent implements OnInit {
  
  playerId! : number;
  teamId!: number;
  errorMessage = '';

  constructor(
    private playerService : PlayerService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = +params['playerId'];
      this.teamId = +params['teamId'];
    });
  }

  onRemove(): void{
    this.playerService.removePlayer(this.playerId).subscribe({
      next: (response) => {
        this.router.navigate([`playerlist/${this.teamId}`]);
      },
      error: (err) => {
        this.errorMessage = 'Errore nella rimozione del giocatore dalla squadra';
        console.error(err);
      }
    });
  }


}
