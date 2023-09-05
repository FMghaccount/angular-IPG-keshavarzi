import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, map, tap } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  orderId: string;
  orderIdSub: Subscription;
  timeoutSubscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderIdSub = this.route.params.subscribe((params: Params) => {
      this.orderId = params.orderId;
    });
    this.timeoutSubscription = setTimeout(() => {
      this.emitIdValue(this.orderId);
      this.router.navigate(['/payment']);
    }, 1500);
  }

  emitIdValue(id: string) {
    this.orderService.orderId_Subject.next(this.orderId);
  }
  ngOnDestroy() {
    if (this.orderIdSub) this.orderIdSub.unsubscribe();
    // if (this.timeoutSubscription) clearTimeout(this.timeoutSubscription);
  }
}
