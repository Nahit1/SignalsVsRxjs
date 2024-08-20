import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="relative overflow-x-auto p-5">
      <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="border-b-orange-400 border-b py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Price:</h5>
            <p>{{ price() }} $</p>
          </div>
        </div>

        <div class="border-b-orange-400 border-b py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Quantity:</h5>
            <p>{{ quantity() }} $</p>
          </div>
        </div>

        <div class="border-b-orange-400 border-b py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Discount:</h5>
            <p>{{ discount() }} $</p>
          </div>
        </div>

        <div class="py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Total Price:</h5>
            <p class="text-orange-400 font-semibold">{{ totalPrice() }} $</p>
          </div>
        </div>
        <button
          (click)="calculate()"
          class="inline-flex mt-5 px-5 w-full py-2 text-sm font-medium justify-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none"
        >
          Calculate
        </button>
        <p>{{ counter }}</p>
      </div>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  counter = 0;
  price = signal(10);
  quantity = signal(4);
  discount = signal(50);
  totalPrice = computed(() => {
    const total = this.price() * this.quantity();
    this.counter++;
    return total - (total * this.discount()) / 100;
  });

  ngOnInit(): void {
    initFlowbite();
  }

  calculate() {
    this.price.set(10);
    this.quantity.set(5);
    this.discount.set(30);
  }
}
