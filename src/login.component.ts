import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {Login} from "./login";
import {LoginService} from "../shared/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  message: any

  users:Login[] = [];

  constructor(private formBuilder: FormBuilder,  private router: Router, private loginService:LoginService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]

    });

    this.getAllUsers();
  }

  getAllUsers(){
    this.loginService.getUser().subscribe((data) => {
      this.users =  data;
    });
  }

  validateUser(values: any){
    console.log(values);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].idNummer === values.userName && this.users[i].password === values.password){
        this.router.navigateByUrl('/home');
      }else {
      this.handleWarningAlert();
      }
    }
  }

  handleWarningAlert() {

    Swal.fire({
      position: "center",
      title: 'Inlog onsuccesvol',
      text: 'Verkeerde username of password',
      icon: 'warning',
      //showCancelButton: true,
      showConfirmButton: false,
      footer: '<a href="http://localhost:4200">Ok</a>'

    }).then()

  }
  }

