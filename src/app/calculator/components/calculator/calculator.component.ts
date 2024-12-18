import { Component } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  /*
     styles: `
      .is-command {
        @apply bg-indigo-700 bg-opacity-20;
      }
    `
  */
})
export class CalculatorComponent {

}
