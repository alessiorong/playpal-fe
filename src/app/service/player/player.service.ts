import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../model/player.model';
import { PlayerStat } from '../../model/player-stat.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/player';

  constructor(private http : HttpClient) { }

  getAllPlayersByTeamId(teamId : number) : Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/all-players-of-team/${teamId}`);
  }

  getPlayerById(id : number) : Observable<any> {
      return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  createPlayer(player : Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/new`, player);
  }

  addPlayerToTeam(playerId : number, teamId : number, jerseyNumber : number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${playerId}/add-in-team/${teamId}`, {jerseyNumber});
  }

  getAvailableJerseyNumbers(teamId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/team/${teamId}/available-jersey-numbers`);
  }
  

  deletePlayerById(id : number) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${id}`);
  }

  createPlayerStatByPlayerId(playerId : number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${playerId}/new-stats`, {});
  }

  getAllFreePlayers() : Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/free`);
  }

  removePlayer(playerId : number) : Observable<any> {
    return this.http.post(`${this.apiUrl}/${playerId}/remove-from-team`, {}, {responseType: 'text' });
  }

  getTotalGamesPlayed(playerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/total-games-played`);
  }

  averagePoints(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-points`);
  }

  averageORebounds(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-offensive-rebound`);
  }

  averageDRebounds(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-difensive-rebound`);
  }

  averageAssist(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-assist`);
  }

  averageSteals(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-steals`);
  }

  averageTurnovers(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-turnovers`);
  }

  averageBlocks(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-blocks`);
  }

  averageFTM(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-free-throw-made`);
  }

  averageFTA(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-free-throw-attempted`);
  }

  averageTwoPM(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-two-points-made`);
  }

  averageTwoPA(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-two-points-attempted`);
  }

  averageThreePM(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-three-points-made`);
  }

  averageThreePA(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-three-points-attempted`);
  }





}
