import { Component, OnInit} from '@angular/core';
import { PlayerService } from '../service/player/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent implements OnInit {
  playerId!: number;
  teamId!: number;
  errorMessage = '';
  selectedJerseyNumber!: number;
  availableJerseyNumbers: number[] = [];

  constructor(
    private playerService : PlayerService,
    private route : ActivatedRoute,
    private router : Router
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = +params['playerId'];
      this.teamId = +params['teamId'];
      this.loadAvailableJerseyNumbers();
    });
  }

  loadAvailableJerseyNumbers(): void {
    this.playerService.getAvailableJerseyNumbers(this.teamId).subscribe({
      next: (numbers : number[]) => {
        this.availableJerseyNumbers = numbers;
        if(this.availableJerseyNumbers.length>0){
          this.selectedJerseyNumber = this.availableJerseyNumbers[0];
        }
      },
      error: () => {
        console.error('Errore nel caricamento dei numeri di maglia disponibili');
      }
    });
  }

  addPlayer(): void {
    this.playerService.addPlayerToTeam(this.playerId, this.teamId, this.selectedJerseyNumber).subscribe({
      next: (response) => {
        this.router.navigate([`playerlist/${this.teamId}`]);
      },
      error: (err) => {
        if (err.status === 400 && err.error.message.includes('jersey number already in use')) {
          this.errorMessage = 'Il numero di maglia è già in uso. Scegli un altro numero.';
          this.availableJerseyNumbers = err.error.availableNumbers; // Lista di numeri disponibili ricevuta dal backend
        } else {
          this.errorMessage = 'Errore nell\'aggiunta del giocatore alla squadra.';
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/playerlist', this.teamId]);
  }



}
