export const calculateAverageScore = (quizReports) => {
  if (quizReports.length === 0) return 0;
  const totalScore = quizReports.reduce((total, report) => {
    return total + report;
  }, 0);
  return totalScore / quizReports.length;
};

export const groupReportsByBatchAndInstructor = (
  quizzes,
  students,
  quizReports
) => {
  const groupedReports = [];

  quizzes.forEach((quiz) => {
    const quizReport = quizReports.filter(
      (report) => report.quizId === quiz.id
    );

    const batchInstructorMap = {};

    quizReport.forEach((report) => {
      const student = students.find(
        (student) => student.id.toString() === report.studentId.toString()
      );
      if (!student) return;

      const key = `${student.batch}-${student.instructor}`;

      if (!batchInstructorMap[key]) {
        batchInstructorMap[key] = {
          quizId: quiz.id,
          title: quiz.title,
          course: quiz.course,
          batch: student.batch,
          instructor: student.instructor,
          scores: [],
        };
      }

      batchInstructorMap[key].scores.push(report.score);
    });

    Object.values(batchInstructorMap).forEach((report) => {
      groupedReports.push({
        ...report,
        averageScore: calculateAverageScore(report.scores),
      });
    });
  });

  return groupedReports;
};
