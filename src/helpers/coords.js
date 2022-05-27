export function fromInvToCoords (coords, slot, player){
  return `itp slot ${slot} ${player} coords ${coords}`;
}

export function fromCoordsToInv (coords, slot, player){
  return `itp coords ${coords} slot ${slot} ${player}`;
}