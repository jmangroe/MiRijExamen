
import{HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private htpp:HttpClient) {
  }
    getQuestionsJson(){
      return this.htpp.get<any>("assets/questions.json");
    }
}
