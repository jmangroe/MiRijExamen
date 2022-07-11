import {Component} from "@angular/core";
import {QuestionService} from "../service/question.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-toets',
  templateUrl: './toets.component.html',
  styleUrls: ['./toets.component.css']
})
export class ToetsComponent {
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 120;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$:any;
  progress:string="0";
  isQuizCompleted: boolean= false;
  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionsJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }

    nextQuestion()
    {
      this.currentQuestion++;
    }
    previousQuestion() {
      this.currentQuestion--;
    }

    answer(currentQno: number, option: any) {
    if (currentQno===this.questionList.length){
      this.isQuizCompleted=true;
      this.stopCounter();
    }
      if (option.correct) {
        this.points += 1;
        this.currentQuestion++;
        this.correctAnswer++;
        this.getProgressPercent();


      } else {
        this.points -= 10;
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.getProgressPercent();
      }
    }
    startCounter(){
     this.interval$=interval(1000)
     .subscribe(val=>{
       this.counter--;
       if (this.counter===0){
         this.currentQuestion++;
         this.counter=30;
         this.points-=1;
       }
      });
     setTimeout(()=>{
     this.interval$.unsubscribe();
     },3000000);
    }
    stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
    }
    resetCounter(){
     this.stopCounter();
     this.counter=60;
     this.startCounter();
    }
    resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
    }
    getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
    }
  }

