import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PathService } from './Services/path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontHospitalMaterno';
  mostrarSide:boolean;

  constructor(
    private path_service: PathService,
    private cdr: ChangeDetectorRef
  ){
    
  }

  ngOnInit(){

    // this.mostrarSide=true
    this.path_service.mostrarSide.subscribe((data_s) => {
      this.mostrarSide = data_s;
      this.cdr.detectChanges();
    })
  }

}
