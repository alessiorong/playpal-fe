import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player/player.service';
import { FormsModule, NgForm } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.css'
})
export class NewPlayerComponent {

  isSubmitted = false;
  player : Player | undefined;
  //playerId : number | undefined;
  
  constructor( private playerService : PlayerService, private router : Router, private route : ActivatedRoute){}

  onSubmit(ngForm : NgForm){
    const currentPlayer : Player = {
      firstname : ngForm.value.firstname,
      lastname : ngForm.value.lastname,
      birthdate : ngForm.value.birthdate,
      jerseyNumber : ngForm.value.jerseyNumber,
      position : ngForm.value.position
    };

   this.playerService.createPlayer(currentPlayer).subscribe({
      next: (resp) => {
        this.isSubmitted = true;
      },
      error: (er) => {
        alert('Errore durante la creazione del giocatore');
      }  
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }


  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

