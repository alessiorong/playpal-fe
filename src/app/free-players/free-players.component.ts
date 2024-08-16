import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player/player.service';
import { response } from 'express';

@Component({
  selector: 'app-free-players',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './free-players.component.html',
  styleUrl: './free-players.component.css'
})
export class FreePlayersComponent implements OnInit {
  freePlayerList : Player[] = [];
  teamId!: number;

  constructor(private playerService : PlayerService, private route : ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId']; // Assumendo che l'ID del team venga passato via URL
    });
    this.playerService.getAllFreePlayers().subscribe(
      response => { this.freePlayerList = response; 

      });
  }



}
