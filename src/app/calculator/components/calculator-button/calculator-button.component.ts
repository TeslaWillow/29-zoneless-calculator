import { booleanAttribute, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  }
})
export class CalculatorButtonComponent {

  public isCommand    = input(false, { transform: booleanAttribute });
  public isDoubleSize = input(false, { transform: booleanAttribute });

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }

}
