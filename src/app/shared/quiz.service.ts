import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../quiz/quiz';
import {Question} from '../quiz/question';
import {Result} from '../result/result';
import {environment} from '../../environments/environment';

@Injectable()
export class QuizService {
  timer;
  seconds: number;
  quizProgress: number;
  questionList: Question[];
  startTime: Date;
  totalTime: number;

  // private BASE_URL = `http://localhost:8080`;
  private BASE_URL = environment.baseUrl;
  private QUIZ_URL = `${this.BASE_URL}/quiz`;


  constructor(private http: HttpClient) {
  }


  displayTimeElapsed() {
    const minutes: number = Math.floor(this.seconds / 60);
    const seconds: number = Math.floor(this.seconds % 60);

    if (minutes < 10 && seconds < 10) {
      return '0' + minutes + ' : 0' + (seconds);
    }
    if (minutes > 10 && seconds > 10) {
      return '0' + ' : ' + minutes + ' : ' + (seconds);
    }
    if (minutes > 10 && seconds < 10) {
      return minutes + ' : 0' + (seconds);
    }
    if (seconds >= 10) {
      return '0' + minutes + ' : ' + (seconds);
    }

  }
    getQuiz(): Observable<Quiz> {
      return this.http.get<Quiz>(`${this.QUIZ_URL}` + `/start`);
    }

    submitScore(score: Result): Observable<any> {
    return this.http.post(`${this.QUIZ_URL}` + `/result`, score);
    }

    getCorrectAnswers(answersList: string[]): Observable<any> {
    return this.http.post(`${this.QUIZ_URL}` + '/correctAnswers', answersList);
    }

    getUserResult(finishedQuiz: Quiz): Observable<any> {
    return this.http.post(`${this.QUIZ_URL}` + '/userResult', finishedQuiz);
    }

    getHighScores(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.QUIZ_URL}` + '/highscores');
    }

    checkIfScoreIsHigh(userResult: Result): Observable<any> {
    return this.http.post(`${this.QUIZ_URL}` + '/isHighScore', userResult);
    }


}
