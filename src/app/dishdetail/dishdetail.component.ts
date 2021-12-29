import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import { Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from "../shared/dish";
import { switchMap} from "rxjs/operators";
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {expand, flyInOut, visibility} from "../animations/app.animations";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish | any;
  dishIds: string[] | any;
  prev: string | undefined;
  next: string | undefined;
  commentForm: FormGroup | any;
  newCommentDate: string | any
  errMess: string = '';
  dishcopy: Dish | any;
  visibility = 'shown';

  @ViewChild('cform') commentFormDirective: any;
  @ViewChild('slider') slider: any;

  formErrors: any = {
    'author': '',
    'comment': ''
  };

  validationMessages: any = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(private dishService: DishService,
              private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              @Inject('BaseURL') public BaseURL: string) {

    this.createCommentForm();

  }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);

    this.route.params
      .pipe(switchMap((params: Params) => {
          this.visibility = 'hidden';
          return this.dishService.getDish(params['id']);
      }))
      .subscribe((dish: Dish | any) => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      },
        errmess => this.errMess = errmess);
    // this.dishService.getDish(id)
    //   .then((dish) => this.dish = dish);
    // this.dishService.getDish(id)
    //   .subscribe((dish) => this.dish = dish);
    this.newCommentDate = Date.now().toString();

  }

  private createCommentForm() {
    this.commentForm = this.fb.group({
      'author': ['', [Validators.required, Validators.minLength(2)]],
      'rating': 5,
      'comment': ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged();

  }

  private onValueChanged(data? :any) {

    if (!this.commentForm) {
      return;
    }

    const form = this.commentForm;

    for (const field in this.formErrors) {

      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishIds: string) {
    const index = this.dishIds.indexOf(dishIds);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const comment = this.commentForm.value;
    comment.date = new Date().toISOString();
    this.dishcopy.comments.push(comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
        errmess => {
          this.dish = null;
          this.dishcopy = null;
          this.errMess = <any>errmess;
        });

    this.commentForm.reset({
      'author': '',
      'rating': 5,
      'comment': ''
    });

    // this.dish.comments.push(comment);
    this.commentFormDirective.resetForm();
    this.slider.value = 5;
  }
}
