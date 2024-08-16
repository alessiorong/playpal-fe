import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent  implements OnInit{
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  

}
