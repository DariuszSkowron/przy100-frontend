import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {QuizComponent} from './quiz/quiz/quiz.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuizService} from './shared/quiz.service';
import {ResultComponent} from './result/result.component';
import {HighscoresComponent} from './result/highscores/highscores.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultComponent,
    HighscoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],

  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
