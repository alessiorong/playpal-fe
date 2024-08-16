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

  addPlayerToTeam(playerId : number, teamId : number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${playerId}/add-in-team/${teamId}`, {});
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

  averagePoints(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-points`);
  }

  averageRebounds(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-rebound`);
  }

  averageAssist(playerId:number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${playerId}/average-assist`);
  }

}
