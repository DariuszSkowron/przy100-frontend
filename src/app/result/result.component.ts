import {Component, OnInit} from '@angular/core';
import {QuizService} from "../shared/quiz.service";
import {Router} from "@angular/router";
import {Result} from "./result";


@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  correctAnswerCount = 0;
  listOfQuestionId;
  isDisabled = false;
  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit(){
    if (parseInt(localStorage.getItem('quizProgress')) == 2){
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.quizProgress = parseInt(localStorage.getItem('quizProgress'));
      this.quizService.questionList = JSON.parse(localStorage.getItem('questionList'));
      this.quizService.startTime = JSON.parse(localStorage.getItem('startTime'));
      this.quizService.totalTime = JSON.parse(localStorage.getItem('totalTime'));


      this.listOfQuestionId = this.quizService.questionList.map(question => question.id);
      this.quizService.getCorrectAnswers(this.listOfQuestionId).subscribe((data: any) => {
        this.quizService.questionList.forEach((e,i) => {
          if (e.userAnswer == data[i])
            this.correctAnswerCount++;
        });
      }
      );
    }
  }

  disableButton() {
    this.isDisabled = true;
  }

  actionMethod($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
  }


  onSubmit(nickname: string){
    const newResult: Result = {
      id: null,
      timeSpent: this.quizService.totalTime,
      numberOfCorrectAnswers: this.correctAnswerCount,
      nickname: nickname,
      totalScore: 0
    };
    this.disableButton();
    this.quizService.submitScore(newResult).subscribe(() => {
      this.restart();
    });
  }

  restart() {
    localStorage.setItem('quizProgress', "0");
    localStorage.setItem('questions', "");
    localStorage.setItem('seconds', "0");
  }

  quizRepeat(){
    this.restart();
    this.router.navigate(['/quiz']);
  }


}
