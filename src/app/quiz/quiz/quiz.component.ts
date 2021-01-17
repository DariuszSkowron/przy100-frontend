import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../shared/quiz.service';
import {Quiz} from '../quiz';
import {Router} from '@angular/router';
import {UserAnswer} from '../user-answer';

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
  userAnswer: UserAnswer;
  userAnswers: UserAnswer[] = [];

  constructor(private router: Router, public quizService: QuizService) {

  }

  ngOnInit() {
    this.quiz = JSON.parse(localStorage.getItem('quiz'));
    // this.quizService.seconds = JSON.parse(localStorage.getItem('seconds'))
    // this.quizService.timer = localStorage.getItem('timer');
    this.quizService.quizProgress = Number((localStorage.getItem('quizProgress')));

    if (Number(localStorage.getItem('quiz') != null) && this.quizService.quizProgress === this.quiz.questionList.length ) {
      // this.quizService.seconds = Number(localStorage.getItem('seconds'));
      // this.quizService.quizProgress = Number((localStorage.getItem('quizProgress')));
      // this.quizService.questionList = JSON.parse(localStorage.getItem('questionList'));
      // this.quiz = JSON.parse(localStorage.getItem('quiz'));
      // if (this.quizService.quizProgress === this.quiz.questionList.length) {
        this.router.navigate(['/result']);
      // }
    } else {
      this.quizService.seconds = 0;
      this.quizService.quizProgress = 0;
      clearTimeout(this.quizService.timer);
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
    localStorage.setItem('timer', this.quizService.timer);
  }


  Answer(selectedAnswer) {
    this.userAnswer = {
      questionId: this.quiz.questionList[this.quizService.quizProgress].id,
      answer: selectedAnswer,
      answerTime: new Date()
    };
    this.userAnswers[this.quizService.quizProgress] = this.userAnswer;
    // this.quiz.userAnswers[this.quizService.quizProgress] = this.userAnswer;
    // this.quiz.userAnswers[this.quizService.quizProgress].answerTime = new Date();
    // this.quiz.userAnswers[this.quizService.quizProgress].questionId = this.quiz.questionList[this.quizService.quizProgress].id;
    localStorage.setItem('questionList', JSON.stringify(this.quizService.questionList));
    localStorage.setItem('quiz', JSON.stringify(this.quiz));
    this.quizService.quizProgress++;
    this.songListenAvailable = true;
    this.pauseButtonTimer();
    this.timeLeft = 5;
    localStorage.setItem('quizProgress', this.quizService.quizProgress.toString());
    if (this.quizService.quizProgress === this.quiz.questionList.length) {
      this.quiz.userAnswers = this.userAnswers;
      localStorage.setItem('quiz', JSON.stringify(this.quiz));
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
