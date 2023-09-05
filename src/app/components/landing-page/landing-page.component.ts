import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  // constructor(private router: Router) {}
  // ngOnInit() {
  //   this.router.navigate(['payment']);
  // }

  orderId: string;
  orderIdSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderIdSub = this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId'];
      this.orderService.orderId_Subject.next(this.orderId);
    });
    this.router.navigate(['/payment']);
  }

  ngOnDestroy() {
    if (this.orderIdSub) this.orderIdSub.unsubscribe();
  }
}
