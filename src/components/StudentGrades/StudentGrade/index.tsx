import { DeleteGrade } from "../../Modal/DeleteGrade";

interface StudentGradeProps {
  isBadGrade: boolean;
  id: string;
  teacherName: string;
  schoolSubject: string;
  period: string;
  schoolGrade: string;
}

export function StudentGrade({
  isBadGrade,
  id,
  teacherName,
  schoolSubject,
  period,
  schoolGrade,
}: StudentGradeProps) {
  return (
    <div className={`grade ${isBadGrade && "bad-grade"}`}>
      <span className="teacher-name">
        <strong>Professor: </strong>
        {teacherName}
      </span>
      <span className="school-subject">
        <strong>Matéria: </strong>
        {schoolSubject}
      </span>
      <span className="period">
        <strong>Período: </strong>
        {period}
      </span>
      <span className="school-grade">
        <strong>Nota: </strong>
        {schoolGrade} pts
      </span>
      <DeleteGrade gradeId={id} />
    </div>
  );
}
