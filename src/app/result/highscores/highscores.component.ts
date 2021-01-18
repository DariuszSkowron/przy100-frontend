import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../shared/quiz.service';
import {Result} from '../result';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.scss']
})
export class HighscoresComponent implements OnInit {

  highScores: Result[];

  constructor(private router: Router, public quizService: QuizService) {
  }

  ngOnInit() {
    this.getHighScores();
  }

  getHighScores() {
    this.quizService.getHighScores().subscribe(
      res => {
        this.highScores = res;
        this.highScores.sort(function(a, b){
          if(a.numberOfCorrectAnswers == b.numberOfCorrectAnswers){
            return (a.timeSpent < b.timeSpent)? -1 : (a.timeSpent > b.timeSpent) ? 1 : 0;
          }else{
            return (a.numberOfCorrectAnswers > b.numberOfCorrectAnswers) ? -1 : 1;
          }

        });

      }
    );
  }

  // a.numberOfCorrectAnswers > b.numberOfCorrectAnswers ? -1 : (a.timeSpent > b.timeSpent) ? 1 : -1);
}
