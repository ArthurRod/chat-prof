export type Observation = {
    id: string;
    studentId: string;
    observation: string;
    observationDate: ObservationDate;
    schoolSubject: string;
    subject: string;
    teacherName: string;
    teacherId: string;
}

type ObservationDate = {
    seconds: number;
}
