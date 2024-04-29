import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisClass } from '../../Models/registerUser';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


// export class RegisterComponent implements OnInit{
//     public RegObj: RegisClass = new RegisClass();
//     constructor(private job:AuthService){ 
//     }
//     onSignup(){
//       this.job.registerCandidate(this.RegObj).subscribe((res: any)=>{
//         if(res.result){
//           alert(res.message)
//         } else{
//           alert(res.message)
//         }
//       })
//     }

//     ngOnInit():void{

//     }
// }


export class RegisterComponent {
  public RegObj: RegisClass = new RegisClass();
  // constructor(private job:AuthService){}
  // onSignup(){
  //   this.job.registerCandidate(this.RegObj).subscribe((res: any)=>{
  //     if(res.result){
  //       alert(res.message)
  //     } else{
  //       alert(res.message)
  //     }
  //   })
  // }
}
