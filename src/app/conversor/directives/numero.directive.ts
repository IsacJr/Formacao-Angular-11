import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[numero]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let valor = $event.target.value;
    const postDecimais = valor.indexOf('.');

    valor = valor.replace(/[\D]/g, '');

    if(postDecimais > 0) {
      valor = valor.substr(0, postDecimais) + '.' +
        valor.substr(postDecimais);
    }

    $event.target.value = valor;
    this.onChange(valor);
  }

}
