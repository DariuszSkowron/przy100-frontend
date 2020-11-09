import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from './quiz/quiz/quiz.component';
import {ResultComponent} from './result/result.component';
import {HighscoresComponent} from './result/highscores/highscores.component';


const routes: Routes = [
  {path: 'quiz', component: QuizComponent},
  {path: 'result', component: ResultComponent},
  {path: 'highscores', component: HighscoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
