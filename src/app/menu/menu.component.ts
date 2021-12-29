import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from "../services/dish.service";
import {expand, flyInOut} from "../animations/app.animations";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[] | any;
  selectedDish: Dish | undefined;
  errMess: string = '';

  constructor(private dishService: DishService,
              @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit(): void {
    // this.dishService.getDishes()
    //   .then((dishes) => this.dishes = dishes); // no longer using promises

    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

}
