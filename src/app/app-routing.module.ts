import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from './quiz/quiz/quiz.component';
import {ResultComponent} from './result/result.component';
import {HighscoresComponent} from './result/highscores/highscores.component';
import {MainPageComponent} from './core/main-page/main-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full' },
  {path: 'quiz', component: QuizComponent},
  {path: 'result', component: ResultComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'highscores', component: HighscoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
