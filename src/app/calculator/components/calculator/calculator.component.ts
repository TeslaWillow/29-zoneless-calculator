import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);

  public calculatorsButtons = viewChildren( CalculatorButtonComponent );

  public subResultText = computed( () => this.calculatorService.subResultText() );
  public resultText = computed( () => this.calculatorService.resultText() );
  public lastOperator = computed( () => this.calculatorService.lastOperator() );

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

  public handleClick(key: string): void {
    console.log({key});
    this.calculatorService.constructNumber(key);
  }

}
