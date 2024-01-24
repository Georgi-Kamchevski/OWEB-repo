import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Driver } from '../module/klasa';
import { NgIf,CommonModule} from '@angular/common';


@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit{



  constructor(){}
  cardWidth=300;
  cardHeight=300;
  @Input()
  ime:String="";

  @Input()
  vozac: Driver = {} as Driver;
  @Input()
  reden:number=0;
  @Output()
  cuci= new EventEmitter<any>();

  ngOnInit(): void {

  }
  klasi(){
    return{'poz':this.vozac.category=="Beginner",'course-card':true}
  }
  klik(){
    var link =this.vozac.iconUrl;
    window.open(link,"_blank");
    console.log("Me klikna");
    this.cuci.emit(this.vozac);
  }
  backgroundsCheck(){
    if(this.reden==1){
      return 'gold';
    }
    else if(this.reden==2){
      return 'silver'
    }
    else{
      return '	#CD7F32'
    }
  }
}
