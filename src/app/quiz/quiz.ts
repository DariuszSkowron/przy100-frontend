import {Question} from './question';
import {UserAnswer} from './user-answer';

export class Quiz {
  id: string;
  startTime: Date;
  questionList: Question[];
  userAnswers: UserAnswer[];
}
