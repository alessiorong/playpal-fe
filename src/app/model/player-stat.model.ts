export interface PlayerStat{
    id? : number;
    playerFirstname : string;
    playerLastname : string;
    points : number;
    oRebound : number;
    dRebound : number;
    assist : number;
    turnover : number;
    steal :  number;
    block : number;
    freeThrowMade : number;
    freeThrowAttempted : number;
    twoPointsMade : number;
    twoPointsAttempted : number;
    threePointsMade : number;
    threePointsAttempted : number;
    playerId: number;
}