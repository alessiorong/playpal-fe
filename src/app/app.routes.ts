import { Routes } from '@angular/router';
import { NewPlayerComponent } from './new-player/new-player.component';
import { PlayerComponent } from './player/player.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { NewTeamComponent } from './new-team/new-team.component';
import { TeamComponent } from './team/team.component';
import { DeleteTeamComponent } from './delete-team/delete-team.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { FreePlayersComponent } from './free-players/free-players.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { RemovePlayerComponent } from './remove-player/remove-player.component';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { NewPlayerstatComponent } from './new-playerstat/new-playerstat.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';
import { ChangeResultComponent } from './change-result/change-result.component';
import { ChangeCategoryComponent } from './change-category/change-category.component';
import { AverageStatsComponent } from './average-stats/average-stats.component';
import { ChangeScoresComponent } from './change-scores/change-scores.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'new-player', component: NewPlayerComponent},
    {path: 'player/:id', component: PlayerComponent},
    {path: 'player/:id/delete-player', component: DeletePlayerComponent},
    {path: 'new-team', component: NewTeamComponent},
    {path: 'team/:id', component: TeamComponent},
    {path: 'team/:id/delete-team', component: DeleteTeamComponent},
    {path: 'playerlist/:teamId', component: PlayerlistComponent},
    {path: 'free-players/:teamId', component: FreePlayersComponent},
    {path: 'free-players', component: FreePlayersComponent},
    {path: 'add-player/:playerId/to-team/:teamId', component: AddPlayerComponent},
    {path: 'remove-player/:playerId/:teamId', component: RemovePlayerComponent},
    {path: 'gamelist/:teamId', component: GameListComponent},
    {path: 'add-game/:teamId', component: AddGameComponent},
    {path: 'delete-game/:teamId/:gameId', component: DeleteGameComponent},
    {path: 'add-playerstat/:gameId/:playerId', component: NewPlayerstatComponent},
    {path: 'statistics/:gameId/:teamId', component: StatisticsComponent},
    {path: 'change-result/:gameId', component: ChangeResultComponent},
    {path: 'change-category/:teamId', component: ChangeCategoryComponent},
    {path: 'average-stats/:teamId/:playerId', component: AverageStatsComponent},
    {path: 'team/:teamId/game/:gameId/change-scores', component: ChangeScoresComponent }



    










];
