import { Component, OnInit, Input } from '@angular/core';
import { PqrReport } from '../../interfaces/pqr-report';

@Component({
  selector: 'app-pqr-modal',
  templateUrl: './pqr-modal.component.html',
  styleUrls: ['./pqr-modal.component.css']
})
export class PqrModalComponent implements OnInit {

  constructor() {
   }

  @Input() modalPqr;
  ngOnInit(): void {

  }
  ngDoCheck(){
    /* console.log(this.modalPqr, 'hola') */
  }


}
