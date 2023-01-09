import { Observation } from "../types/Observation";

export function handleOrderObservations(
  observations: Observation[] | undefined,
  setOrderObservations: (orderedObservations: Observation[]) => void
) {
  if (observations && observations.length > 0) {
    let orderedObservations = observations.sort(
      (x: Observation, y: Observation) => {
        return y.observationDate.seconds - x.observationDate.seconds;
      }
    );

    setOrderObservations(orderedObservations);
  }
}
