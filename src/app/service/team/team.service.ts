import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../model/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8080/team';

  constructor(private http : HttpClient) { }


  getAllTeam() : Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/all-teams`);
  }

  getTeamByid(id : number) : Observable<any> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  checkTeamNameExists(name:string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${name}`);
  }

  getTeamIdByGameId(gameId : number) : Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/by-game/${gameId}`);
  }

  addTeam(team : Team) : Observable<Team>{
    return this.http.post<Team>(`${this.apiUrl}/add`, team);
  }

  deleteTeamById(id : number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/remove/${id}`);    
  }

  updateCategoryByTeamId(teamId : number, category : string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${teamId}/change-category`, {category});
  }





}
