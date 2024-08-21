import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../model/game.model';
import { PlayerStat } from '../../model/player-stat.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/game';

  constructor(private http : HttpClient) {}

  getAllGames() : Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/all-games`);
  }

  getAllGamesByTeam(teamId : number): Observable<any>{
    return this.http.get<Game[]>(`${this.apiUrl}/all-games-from-team/${teamId}`);
  }

  getGameById(id : number): Observable<any> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  createGameByTeamId(teamId : number, game : Game): Observable<any> {
    return this.http.post(`${this.apiUrl}/new-game/${teamId}`, game);
  }

  deleteGameById(id : number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-game/${id}`);
  }

  getPlayerStatsByGameId(gameId:number): Observable<PlayerStat[]>{
    return this.http.get<PlayerStat[]>(`${this.apiUrl}/${gameId}/game-stats`);
  }

  addPlayerStatToGameByGameId(playerStatId:number, gameId:number): Observable<any>{
    return this.http.post(`${this.apiUrl}/${gameId}/add-playerstat/${playerStatId}`, {});
  }

  removePlayerStatToGameByGameId(gameId:number, playerStatId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${gameId}/remove-playerstat/${playerStatId}`);
  }

  addPoints(statId: number, value: number): Observable<any> {
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-points`, null, {params});
  }

  addAssist(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-assist`, null, {params});
  }

  addORebound(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-offensive-rebound`, null, {params});
  }

  addDRebound(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-difensive-rebound`, null, {params});
  }

  addTurnover(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-turnover`, null, {params});
  }

  addSteal(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-steal`, null, {params});
  }

  addBlock(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-block`, null, {params});
  }

  addFreeThrowMade(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-free-throw-made`, null, {params});
  }

  addFreeThrowAttempted(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-free-throw-attempted`, null, {params});
  }

  addTwoPointsMade(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-two-points-made`, null, {params});
  }

  addTwoPointsAttempted(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-two-points-attempted`, null, {params});
  }

  addThreePointsMade(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-three-points-made`, null, {params});
  }

  addThreePointsAttempted(statId:number, value:number): Observable<any>{
    const params = new HttpParams().set('value', value.toString());
    return this.http.put(`${this.apiUrl}/playerstat/${statId}/add-three-points-attempted`, null, {params});
  }

  updateGameResult(gameId: number, result: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${gameId}/change-result`, {result});
  }

  updateMyFinalScore(gameId: number, newScore: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${gameId}/change-my-final-score`, { newScore });
  }
  
  updateOppositeFinalScore(gameId: number, newScore: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${gameId}/change-opposite-final-score`, { newScore });
  }
  

  }






