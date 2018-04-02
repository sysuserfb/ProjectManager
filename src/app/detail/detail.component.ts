import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private id:String="";
  constructor(public router:ActivatedRoute,
    
  ) {
    this.router.paramMap.subscribe(data=>{
      this.id=data.get('id');
      console.log(data.get('id'))
    });
   }

  ngOnInit() {
  }

}
