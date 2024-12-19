import { booleanAttribute, Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isCommand    = input(false, { transform: booleanAttribute });
  public isDoubleSize = input(false, { transform: booleanAttribute });
  public onClick      = output<string>();
  public isPressed    = signal(false);

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }

  public handleClick(): void {
    if(!this.contentValue()?.nativeElement) return;

    const command = this.contentValue()!.nativeElement.innerText.toLowerCase().trim();
    this.onClick.emit(command);
  }

  public keyboardPressedStyle( key: string ){
    if(!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText.trim();

    if( value !== key ) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 250);

  }

}
