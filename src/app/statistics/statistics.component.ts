import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerStat } from '../model/player-stat.model';
import { GameService } from '../service/game/game.service';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player/player.service';
import { TeamService } from '../service/team/team.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {

  playerStats : PlayerStat[] = [];
  players : Player[] = [];
  oppositeTeamName: string = '';
  gameId!: number;
  teamId!: number;
  selectedPlayerId!: number;
  statisticsLocked : boolean = false;

  constructor(
    private gameService : GameService,
    private playerService : PlayerService,
    private teamService : TeamService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['gameId'];
      this.teamId = +params['teamId'];
      this.loadPlayerStats();
      this.loadGameDetails();
    });
    const locked = localStorage.getItem('statisticsLocked');
    if (locked === 'true') {
      this.statisticsLocked = true;
    }
  }

  loadGameDetails(): void {
    this.gameService.getGameById(this.gameId).subscribe({
      next: (game) => {
        this.oppositeTeamName = game.oppositeTeam; 
      },
      error: () => {
        console.error('Errore nel caricamento dei dettagli della partita');
      }
    });
  }

  loadPlayerStats(): void {
    this.gameService.getPlayerStatsByGameId(this.gameId).subscribe({
      next: (stats) => {
        this.playerStats = stats.sort((a, b) => a.playerFirstname.localeCompare(b.playerFirstname));
      },
      error: () => {
        console.error('Errore nel caricamento delle statistiche');
      }
    });

    this.loadPlayersByTeam();
  }

  loadPlayersByTeam(): void {
    this.teamService.getTeamIdByGameId(this.gameId).subscribe({
      next: (teamId) => {
        this.playerService.getAllPlayersByTeamId(teamId).subscribe({
          next: (players) => {
            this.players = players;
          },
          error: () => {
            console.error('Errore nel caricamento dei giocatori');
          }
        });
      },
      error: () => {
        console.error('Errore nel recupero dell\'ID del team');
      }
    });
  } 

  addPlayerStat(): void {
    if (this.selectedPlayerId) {
      this.playerService.getPlayerById(this.selectedPlayerId).subscribe({
        next: (player) => {
          const newStat: PlayerStat = {
            playerFirstname: player.firstname,
            playerLastname: player.lastname,
            points: 0,
            oRebound: 0,
            dRebound: 0,
            assist: 0,
            turnover: 0,
            steal: 0,
            block: 0,
            freeThrowMade: 0,
            freeThrowAttempted: 0,
            twoPointsMade: 0,
            twoPointsAttempted: 0,
            threePointsMade: 0,
            threePointsAttempted: 0,
            playerId: this.selectedPlayerId
          };
  
          this.playerService.createPlayerStatByPlayerId(newStat.playerId).subscribe({
            next: (response) => {
              this.gameService.addPlayerStatToGameByGameId(response.id, this.gameId).subscribe({
                next: () => {
                  this.loadPlayerStats();
                },
                error: () => {
                  alert('Errore nell\'aggiunta della statistica alla partita');
                }
              });
            },
            error: () => {
              alert('Errore nella creazione della statistica del giocatore');
            }
          });
        },
        error: () => {
          console.error('Errore nel recupero del giocatore');
        }
      });
    } else {
      console.error('Seleziona un giocatore prima di aggiungere una statistica');
    }
  }
  

  removePlayerStat(playerStatId: number): void {
    this.gameService.removePlayerStatToGameByGameId(this.gameId, playerStatId).subscribe({
        next: () => {
            console.log('Statistica del giocatore rimossa con successo');
            this.loadPlayerStats();  
        },
        error: (err) => {
            console.error('Errore durante la rimozione della statistica del giocatore', err);
        }
    });
}


  addPoints(playerStatId: number|undefined, points: number): void {
    this.gameService.addPoints(playerStatId!, points).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta dei punti');
      }
    });
  }

  addAssist(playerStatId: number|undefined, assist : number): void {
    this.gameService.addAssist(playerStatId!, assist).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta dell\'assist');
      }
    });
  }

  addORebound(playerStatId: number|undefined, oRebound : number): void {
    this.gameService.addORebound(playerStatId!, oRebound).subscribe({
      next: () => {
        console.log(`Rimbalzo offensivo aggiunto per il giocatore con ID ${playerStatId}: +${oRebound}`);
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del rimbalzo offensivo');
      }
    });
  }

  addDRebound(playerStatId: number|undefined, dRebound : number): void {
    this.gameService.addDRebound(playerStatId!, dRebound).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del rimbalzo difensivo');
      }
    });
  }

  addSteal(playerStatId: number|undefined, steal : number): void {
    this.gameService.addSteal(playerStatId!, steal).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta della palla recuperata');
      }
    });
  }

  addTurnover(playerStatId: number|undefined, turnover : number): void {
    this.gameService.addTurnover(playerStatId!, turnover).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta della palla persa');
      }
    });
  }

  addBlock(playerStatId: number|undefined, block : number): void {
    this.gameService.addBlock(playerStatId!, block).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta della stoppata');
      }
    });
  }

  addTwoPointsMade(playerStatId: number|undefined, made2 : number): void {
    this.gameService.addTwoPointsMade(playerStatId!, made2).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del tiro da due segnato');
      }
    });
  }

  addTwoPointsAttempted(playerStatId: number|undefined, attempt2 : number): void {
    this.gameService.addTwoPointsAttempted(playerStatId!, attempt2).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del tiro da due provato');
      }
    });
  }

  addThreePointsMade(playerStatId: number|undefined, made3 : number): void {
    this.gameService.addThreePointsMade(playerStatId!, made3).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del tiro da tre segnato');
      }
    });
  }

  addThreePointsAttempted(playerStatId: number|undefined, attempt3 : number): void {
    this.gameService.addThreePointsAttempted(playerStatId!, attempt3).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del tiro da tre provato');
      }
    });
  }

  addFreeThrowMade(playerStatId: number|undefined, made1 : number): void {
    this.gameService.addFreeThrowMade(playerStatId!, made1).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del tiro libero segnato');
      }
    });
  }

  addFreeThrowAttempted(playerStatId: number|undefined, attempt1 : number): void {
    this.gameService.addFreeThrowAttempted(playerStatId!, attempt1).subscribe({
      next: () => {
        this.loadPlayerStats();
      },
      error: () => {
        console.error('Errore nell\'aggiunta del tiro libero provato');
      }
    });
  }


  goBack(): void {
    this.router.navigate(['/gamelist',this.gameId, this.teamId]);
  }

  lockStatistics() : void {
    this.statisticsLocked = true;
    localStorage.setItem('statisticsLocked', 'true');
  }


  












}
