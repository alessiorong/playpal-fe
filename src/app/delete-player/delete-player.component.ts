import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../service/player/player.service';


@Component({
  selector: 'app-delete-player',
  standalone: true,
  imports: [],
  templateUrl: './delete-player.component.html',
  styleUrl: './delete-player.component.css'
})
export class DeletePlayerComponent implements OnInit {

  player! : Player;
  playerId! : number;

  constructor(private route: ActivatedRoute, private playerService : PlayerService, private router : Router ){}
  
  ngOnInit(): void {
    this.playerId = this.route.snapshot.params['id'];
  }

  onDelete(){
    this.playerService.deletePlayerById(this.playerId).subscribe({
      next: () => this.router.navigate(['new-player']),
      error: (err) => console.error(err)
    });
  }



}
