import { Grade } from "./Grade";
import { Observation } from "./Observation";

export type StudentData = {
  studentName: string;
  grades: Grade[];
  observations: Observation[];
};
