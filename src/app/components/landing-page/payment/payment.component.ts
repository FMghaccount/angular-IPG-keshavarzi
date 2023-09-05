import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  @ViewChild('form') formData: NgForm;
  cartNumber: string = '1234-5678-1234-5678';
  cartCVV2: string = '1654';
  cartExpirationYear: string = '04';
  cartExpirationMonth: string = '02';
  cartPassword: number = null;
  cartDetail = {
    cartNumber: '',
    cartCVV2: '',
    cartExpirationYear: '',
    cartExpirationMonth: '',
    cartPassword: null,
  };
  submitted = false;
  keyPadChar: string;
  captchaChar: string;
  keyPad: String;
  captcha: String;
  rand: number;

  ngOnInit() {
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
      this.formData.controls['captcha'].reset();
      this.formData.controls['cartPassword'].reset();
      this.formData.controls['cartCVV2'].reset();
      alert('مقادیر خواسته شده را به درستی وارد کنید');
      return;
    }

    // this.cartDetail.cartPassword = this.formData.value.cartPassword;

    // this.formData.reset();
  }
}
