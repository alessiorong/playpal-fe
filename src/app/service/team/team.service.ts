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

  getTotalGamesPlayed(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/total-games-played`);
  }

  getAveragePoints(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-points`);
  }

  getAverageOffRebounds(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-offensive-rebounds`);
  }

  getAverageAssist(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-assist`);
  }

  getAverageDefRebounds(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-defensive-rebounds`);
  }

  getAverageSteals(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-steals`);
  }

  getAverageTurnovers(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-turnovers`);
  }

  getAverageBlocks(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-blocks`);
  }

  getAverageFTM(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-free-throw-made`);
  }

  getAverageFTA(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-free-throw-attempted`);
  }

  getAverageTwoPM(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-two-points-made`);
  }

  getAverageTwoPA(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-two-points-attempted`);
  }

  getAverageThreePM(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-three-points-made`);
  }

  getAverageThreePA(teamId : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${teamId}/average-three-points-attempted`);
  }










}
