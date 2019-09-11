import { AbstractControl } from '@angular/forms'
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as moment from 'moment';
@Directive({
    selector: '[dpdhlAgeValidator]'
})
export class AgeValidatorDirective {
    min: number = 20;
    max: number = 60;
    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const dob = this._el.nativeElement.value;
        var min = 18;
        var max = 70;
        const today = moment(new Date()).startOf('day');
        const userAge = today.diff(dob, 'years');
        if (userAge !== undefined && (isNaN(userAge) || userAge < min || userAge > max)) {
            event.stopPropagation();
            // return {
            //     'age': true,
            // }
        }
    };
}

