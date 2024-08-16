import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player/player.service';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  player : Player | undefined;
  

  constructor(private playerService : PlayerService, private route : ActivatedRoute, private router : Router){}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id){
      this.playerService.getPlayerById(+id).subscribe(p => this.player = p);
    }
    
  }

}
