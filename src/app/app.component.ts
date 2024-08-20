import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  tap,
} from 'rxjs';

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
            <p>{{ price$.getValue() }} $</p>
          </div>
        </div>

        <div class="border-b-orange-400 border-b py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Quantity:</h5>
            <p>{{ quantity$.getValue() }} $</p>
          </div>
        </div>

        <div class="border-b-orange-400 border-b py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Discount:</h5>
            <p>{{ discount$.getValue() }} $</p>
          </div>
        </div>

        <div class="py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Total Price:</h5>
            <p class="text-orange-400 font-semibold">
              {{ totalPrice$ | async }} $
            </p>
          </div>
        </div>
        <div class="py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Total Price:</h5>
            <p class="text-orange-400 font-semibold">
              {{ totalPrice$ | async }} $
            </p>
          </div>
        </div>
        <div class="py-1 px-5">
          <div class="flex items-center justify-between">
            <h5 class="font-thin">Total Price:</h5>
            <p class="text-orange-400 font-semibold">
              {{ totalPrice$ | async }} $
            </p>
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
  price$ = new BehaviorSubject(10);
  quantity$ = new BehaviorSubject(4);
  discount$ = new BehaviorSubject(50);
  totalPrice$ = combineLatest([
    this.price$.pipe(distinctUntilChanged()),
    this.quantity$.pipe(distinctUntilChanged()),
    this.discount$.pipe(distinctUntilChanged()),
  ]).pipe(
    debounceTime(0),
    tap(() => this.counter++),
    map(([price, quantity, discount]) => {
      const total = price * quantity;
      return total - (total * discount) / 100;
    }),
    shareReplay()
  );

  ngOnInit(): void {
    initFlowbite();
  }

  calculate() {
    this.price$.next(120);
    this.quantity$.next(5);
    this.discount$.next(30);
  }
}
