import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[buttonBusy]'
})
export class ButtonBusyDirective { 
    @Input() set buttonBusy(isBusy: boolean) {
        this.refreshState(isBusy);
    }

    @Input() busyText: string;

    private _button: any;
    private _originalButtonInnerHtml: any;

    constructor(
        private _element: ElementRef,
    ) {
    }

    ngOnInit(): void {
        this._button = this._element.nativeElement;
    }

    ngAfterViewInit(): void {
        this._originalButtonInnerHtml = this._button.innerHTML;
    }

    refreshState(isBusy: boolean): void {
        if (!this._button) {
            return;
        }

        if (isBusy) {
            // disable button
            this._button.setAttribute('disabled', 'disabled');

            this._button.innerHTML = '<i class="fa fa-spin fa-spinner"></i>' +
                '<span>' + (this.busyText ? this.busyText : 'Saving...') + '</span>';

            this._button.setAttribute('_disabledBefore', true);
        } else {
            if (!this._button.getAttribute('_disabledBefore')) {
                return;
            }

            // enable button
            this._button.removeAttribute('disabled');
            this._button.innerHTML = this._originalButtonInnerHtml;
        }
    }
}
