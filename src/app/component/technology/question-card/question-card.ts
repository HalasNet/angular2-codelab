import { Component, Input, Output, EventEmitter, ViewEncapsulation } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { Technology } from '../technology';
import { IQuestion, IChoice, Question } from '../../../services/QuestionsStore';
import { MarkPipe } from './markPipe';
import { LifeCyclesHooks } from '../../../services/LifeCyclesHooks'; 

@Component({
	pipes: [MarkPipe],
	selector: 'question-card',
	templateUrl: './app/component/technology/question-card/question-card.html',
	styles: [`
		/* TODO fix shadow dom style */
		:host {margin: 1px;}
		
		.mdl-menu {z-index: 0;}
		.mdl-switch__label {display: inline-block; width: 100%; height: 40px;}
		.answer {display: inline-block; width: 20px; height: 20px; position: relative; right: 33px; top: -1px;}
		.correct {color: green;}
		.wrong {color: red;}
	`],
	encapsulation: ViewEncapsulation.None
})
export class QuestionCard  extends LifeCyclesHooks  {
	
	@Input() question: IQuestion;
	@Input() preview: boolean;
	@Output() checked: EventEmitter<Boolean>;
	
	constructor() {
		super();
		this.checked = new EventEmitter();
	}
	
	onCheckedChange($event, choice: IChoice) {
		this.checked.next(choice);
	}
	
}