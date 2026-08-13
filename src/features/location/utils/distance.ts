/**
 * I used the standard Haversine formula to calculate the distance between two coordinates.
 * Since this is a standard mathematical formula, I adapted this implementation 
 * from from common open-source solutions (Reference: https://github.com/njj/haversine).
 * It takes the user's location and facility location, and returns the distance in meters.
 **/
export function getDistanceInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371e3;// Earth's radius in meters
// Convert degrees to radians
  const toRadians = (degree: number) => (degree * Math.PI) / 180;
    
    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const deltaPhi = toRadians(lat2 - lat1);
    const deltaLambda = toRadians(lon2 - lon1);
// The Haversine math
    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;// Added Math.round to get a clean whole number
}