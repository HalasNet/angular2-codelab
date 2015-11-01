/// <reference path="../../typings/_custom.d.ts" />

import { Component, NgIf, Inject, Output, EventEmitter, ViewEncapsulation } from 'angular2/angular2';
import { Router, RouteParams, RouterLink, Location } from 'angular2/router';
import { ObservableWrapper } from 'angular2/src/core/facade/async';

import { QuestionCard } from './question-card/question-card';
import { IQuestion, Question, QuestionsStore, QUESTION } from '../../services/QuestionsStore';
import { TitleObservableWrapper } from '../../services/TitleObservableWrapper';

@Component({
  selector: 'technology',
  events: ['updatetitle'],
  styles: [`
    .mdl-card__actions {width: 320px;margin: 0 auto;}
    .mdl-align__left {float: left;}
    .mdl-align__right {float: right}
  `],
  template:`
    <question-card [preview]="false" [question]="currentQuestion" class="mdl-cell mdl-cell--4-col" ></question-card>
    
    <div class="mdl-card__actions mdl-card--border">
      <a  *ng-if="! isFirstQuestion === true" 
          (click)="previousQuestionClick()" 
          class="mdl-button mdl-align__left mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Previous Question
      </a>
      <a  *ng-if="! isLastQuestion === true" 
          (click)="nextQuestionClick()" 
          class="mdl-button mdl-align__right mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Next Question
      </a>
      <a  *ng-if="isLastQuestion === true" 
          [router-link]="['/Summary']" 
          class="mdl-button mdl-align__right mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Finish
      </a>
    </div>
  `,
  directives: [QuestionCard, NgIf, RouterLink],
  encapsulation: ViewEncapsulation.None
})
export class Technology {
  
  private questionsStore: QuestionsStore;
  private questions: IQuestion[];
  private currentQuestion: IQuestion;
  private currentQuestionId: number = 0;
  private params: RouteParams;
  private router: Router;
  private location: Location;
  private isFirstQuestion: boolean;
  private isLastQuestion: boolean;
  private updatetitle: EventEmitter;
  
  // DI in pure ES6
  /*/
  constructor(
    @Inject(QuestionsStore) questionsStore, 
    @Inject(RouteParams) params, 
    @Inject(Location) location, 
    @Inject(Router) router) 
  {
  /**/
  
  //DI in Typescript
  //*/ 
  constructor(
    questionsStore: QuestionsStore, 
    params: RouteParams, 
    location: Location, 
    router: Router) 
  {
  /**/
  
    this.questionsStore = questionsStore;
    this.params = params;
    this.location = location;
    this.router = router;
    
    // defaults
    this.questions = [];
    this.currentQuestionId = 0;
    this.currentQuestion = null;
    this.isFirstQuestion = true;
    this.isLastQuestion = false;
    
    this.updatetitle = new EventEmitter();
    
  }
  
  public afterViewInit() {
    
    this.updatetitle.next('Technology');
  
    this.fetchData();
      
  }
  
  private fetchData() {
    this.questionsStore
      .fetch()
      .then( (questions: IQuestion[]) => {
        this.questions = questions;
        return questions;
      })
      .then( (questions: IQuestion[]) => {
        this.questions = this.questions.map( (question: IQuestion) => new Question(question)); 
        return this.questions; 
      })
      .then( (questions: IQuestion[]) => {
        this.currentQuestion = questions[ this.currentQuestionId ];
      })
      .then(() => this.updateUrl(this.currentQuestion));
  }
  
  private nextQuestionClick() {
    this.navigateToQuestion(QUESTION.NEXT);
  }
  
  private previousQuestionClick() {
    this.navigateToQuestion(QUESTION.PREVIOUS);
  }
  
  private navigateToQuestion(nextOrPrevious: QUESTION) {
    if(this.questions.length > 0){
      this.setCurrentQuestion(nextOrPrevious);
      this.setFirstLast();
      this.updateUrl(this.currentQuestion);
    }
  }
  
  private setFirstLast() {
    this.isFirstQuestion = (this.currentQuestionId === 0);
    this.isLastQuestion = (this.currentQuestionId === this.questions.length-1);
  }
  
  private setCurrentQuestion(nextOrPrevious: QUESTION) {
      this.currentQuestionId = this.computeCurrentQuestionId(this.currentQuestionId, nextOrPrevious);
      this.currentQuestion = this.questions[ this.currentQuestionId ];
  }
  
  // update url (does not reload the page)
  private updateUrl(question: IQuestion) {
    this.location.go(`/technology/${this.params.get('name')}/${question.id}`);
  }
  
  private computeCurrentQuestionId(currentId: number, nextOrPrevious: QUESTION) {
    let currentQuestionId = currentId;
    if(nextOrPrevious === QUESTION.NEXT) {
      if((currentQuestionId + 1) < this.questions.length) {
        currentQuestionId += 1;
      }
    }
    else if (nextOrPrevious === QUESTION.PREVIOUS) {
      if((currentQuestionId - 1) >= 0) {
        currentQuestionId -= 1;
      }
    }
    return currentQuestionId;
  }
  
}