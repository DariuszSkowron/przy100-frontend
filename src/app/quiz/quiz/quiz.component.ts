import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../shared/quiz.service';
import {Quiz} from '../quiz';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz: Quiz;
  songListenAvailable = true;
  timeLeft = 5;
  interval;

  constructor(private router: Router, public quizService: QuizService) {

  }

  ngOnInit() {
    if (Number(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = Number(localStorage.getItem('seconds'));
      this.quizService.quizProgress = Number((localStorage.getItem('quizProgress')));
      this.quiz = JSON.parse(localStorage.getItem('quiz'));
      if (this.quizService.quizProgress === this.quiz.questionList.length) {
        this.router.navigate(['/result']);
      }
    } else {
      this.quizService.seconds = 0;
      this.quizService.quizProgress = 0;
      this.getQuiz();
    }
  }


  getQuiz() {
    this.quizService.getQuiz().subscribe(res => {
      this.quiz = res;
      this.quizService.questionList = this.quiz.questionList;
      this.quizService.startTime = this.quiz.startTime;
      localStorage.setItem('questionList', JSON.stringify(this.quizService.questionList));
      localStorage.setItem('startTime', JSON.stringify(this.quizService.startTime));
      localStorage.setItem('quiz', JSON.stringify(this.quiz));
      this.startTimer();

    });
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }


  Answer(selectedAnswer) {
    this.quiz.questionList[this.quizService.quizProgress].userAnswer = selectedAnswer;
    localStorage.setItem('questionList', JSON.stringify(this.quizService.questionList));
    this.quizService.quizProgress++;
    this.songListenAvailable = true;
    this.pauseButtonTimer();
    this.timeLeft = 5;
    localStorage.setItem('quizProgress', this.quizService.quizProgress.toString());
    if (this.quizService.quizProgress === this.quiz.questionList.length) {
      clearTimeout(this.quizService.timer);
      this.quizService.totalTime = (new Date().getTime() - new Date(this.quizService.startTime).getTime()) / 1000;
      localStorage.setItem('totalTime', this.quizService.totalTime.toString());

      this.router.navigate(['/result']);
    }
  }


  public playSong(player: HTMLAudioElement): void {
    this.startButtonTimer(player);
    player.play();
    this.songListenAvailable = false;
  }

  startButtonTimer(player: HTMLAudioElement) {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.songListenAvailable = false;
        player.pause();
      }
    }, 1000);
  }

  pauseButtonTimer() {
    clearInterval(this.interval);
  }


}
