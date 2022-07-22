import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  message: any

  constructor(private formBuilder: FormBuilder,  private router: Router) {
  }





  // addLogin(login: Login) {
  //   this.login = login;
  //   let response = this.loginService.addLogin(login);
  //   response.subscribe((data) => this.message = data);
  // }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]

    });


  }

  handleWarningAlert() {

    Swal.fire({
      position: "center",
      title: 'Inlog succesvol',
      text: 'Welkom bij MiRijEx',
      icon: 'success',
      //showCancelButton: true,
      showConfirmButton: false,
      footer: '<a href="http://localhost:4200">Ok</a>'

    }).then()

  }
  }
