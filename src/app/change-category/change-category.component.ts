import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeamService } from '../service/team/team.service';


@Component({
  selector: 'app-change-category',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './change-category.component.html',
  styleUrl: './change-category.component.css'
})
export class ChangeCategoryComponent implements OnInit {

  teamId!: number;
  selectedCategory: string = 'giovanili';
  categories = ['giovanili', 'divisione regionale 3', 'divisione regionale 2', 'divisione regionale 1', 'serie c'];


  constructor(
    private teamService : TeamService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
    });
  }



  onSubmit(ngForm:NgForm): void {
    this.teamService.updateCategoryByTeamId(this.teamId, this.selectedCategory).subscribe({
      next: () => {
        this.router.navigate(['/team', this.teamId]);
      },
      error: () => {
        alert('Errore durante l\'aggiornamento della categoria');
      }
    });
  }


}
