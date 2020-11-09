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
        this.highScores.sort((a, b) => a.totalScore > b.totalScore ? -1 : 1);
      }
    );
  }


}
