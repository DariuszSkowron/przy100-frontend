import {Question} from "./question";

export class Quiz {
  id: string;
  startTime: Date;
  endTime: Date;
  score: string;
  questionList: Question[];
  userAnswers: string[];
}
