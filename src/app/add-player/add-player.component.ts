import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../service/player/player.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent implements OnInit {
  playerId!: number;
  teamId!: number;
  errorMessage = '';

  constructor(
    private playerService : PlayerService,
    private route : ActivatedRoute,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = +params['playerId'];
      this.teamId = +params['teamId'];
    });
  }

  addPlayer(): void {
    this.playerService.addPlayerToTeam(this.playerId, this.teamId).subscribe({
      next: (response) => {
        this.router.navigate([`playerlist/${this.teamId}`]);
      },
      error: (err) => {
        this.errorMessage = 'Errore nell\'aggiunta del giocatore alla squadra.';
        console.error(err);
      }
    });
  }



}
