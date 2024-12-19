import { Component, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  }
  /*
     styles: `
      .is-command {
        @apply bg-indigo-700 bg-opacity-20;
      }
    `
  */
})
export class CalculatorComponent {

  public calculatorsButtons = viewChildren( CalculatorButtonComponent );

  public handleClick(key: string): void {
    console.log({ key });
  }

  // @HostListener('document:keyup', ['$event'])
  public handleKeyboardEvent( event: KeyboardEvent ): void {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear:  'C',
      '*':    '⨉',
      '/':    '÷',
      'Enter':'=',
    };

    const { key } = event;
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(keyValue);

    this.calculatorsButtons().forEach( (button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }

}
