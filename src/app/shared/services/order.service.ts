import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderId_Subject = new BehaviorSubject<string>('');

  constructor() {}
}
