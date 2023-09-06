import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order.service';
import { Subscription, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/models/order.model';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  order: Order;
  orderId: string = '';
  orderIDSub: Subscription;
  @ViewChild('form') formData: NgForm;
  cartNumber: string = '1234-5678-1234-5678';
  cartCVV2: string = '1654';
  cartExpirationYear: string = '04';
  cartExpirationMonth: string = '02';
  cartPassword: number = null;
  keyPadChar: string;
  captchaChar: string;
  keyPad: String;
  captcha: String;
  rand: number;
  isLoading: boolean = false;
  timeoutSub;
  enteredWrongPassword: number = -1;

  constructor(private orderService: OrderService, private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.keyPadChar = '0123456789';
    this.keyPad = '';
    for (let i = 0; this.keyPad.length < 10; i++) {
      this.rand = Math.round(Math.random() * 10);
      if (this.keyPad.indexOf(this.rand.toString()) > -1) continue;
      this.keyPad += this.keyPadChar.substring(this.rand, this.rand + 1);
    }
    let result = '';
    const characters =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.captchaChar = result;
    this.orderIDSub = this.orderService.orderId_Subject
      .pipe(
        map((id) => {
          this.isLoading = true;
          return id;
        })
      )
      .subscribe((id) => {
        this.orderId = id;
        console.log(id);
        console.log(this.orderId);
        this.getOrder(this.orderId);
        console.log(this.order);
      });
    this.timeoutSub = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  getOrder(id: string) {
    this.http
      .get<Order>(process.env.NG_APP_FIREBASEAPIURL + `orders/${id}.json`, {
        observe: 'response',
      })
      .subscribe((response) => {
        console.log(response.body);
        this.order = response.body;
      });
  }

  getPassword() {
    this.cartPassword = 12345678;
  }

  addCVV2(key: number) {
    if (this.cartCVV2.length >= 4) {
      return;
    } else {
      this.cartCVV2 = this.cartCVV2 + key;
    }
  }

  removeLastDigitFromCVV2() {
    if (this.cartCVV2.length === 0) {
      return;
    } else {
      this.cartCVV2 = this.cartCVV2.slice(0, -1);
    }
  }

  removeCVV2() {
    if (this.cartCVV2.length === 0) {
      return;
    } else {
      this.cartCVV2 = '';
    }
  }

  checkValidity(event: InputEvent) {}

  onSubmit() {
    if (
      this.formData.value.captcha !== this.captchaChar ||
      this.formData.value.cartPassword !== this.cartPassword ||
      this.formData.value.cartCVV2 !== this.cartCVV2
    ) {
      if (this.enteredWrongPassword < 2) {
        this.formData.controls['captcha'].reset();
        this.formData.controls['cartPassword'].reset();
        this.formData.controls['cartCVV2'].reset();
        this.enteredWrongPassword += 1;
        alert('مقادیر خواسته شده را به درستی وارد کنید');
        return;
      } else {
        this.http
          .patch(
            process.env.NG_APP_FIREBASEAPIURL + `orders/${this.orderId}.json`,
            {
              refId: crypto.randomUUID(),
            },
            {
              observe: 'response',
            }
          )
          .subscribe((response) => {
            window.location.href = `http://localhost:4200/ref?ok=false&refID=${response.body['refId']}`;
          });
      }
    }

    this.http
      .patch(
        process.env.NG_APP_FIREBASEAPIURL + `orders/${this.orderId}.json`,
        {
          isPaid: true,
          cart: {
            id: this.order.cart['id'],
            isPaid: true,
            amount: this.order.cart['amount'],
            price: this.order.cart['price'],
            expirationDate: this.order.cart['expirationDate'],
            items: this.order.cart['items'],
          },
          refId: crypto.randomUUID(),
        },
        {
          observe: 'response',
        }
      )
      .subscribe((response) => {
        window.location.href = `https://ng-shop-farzin.netlify.app/ref?ok=${response.ok}&refID=${response.body['refId']}`;
      });
  }

  ngOnDestroy() {
    this.isLoading = false;
    if (this.timeoutSub) clearTimeout(this.timeoutSub);
    if (this.orderIDSub) this.orderIDSub.unsubscribe();
  }
}
