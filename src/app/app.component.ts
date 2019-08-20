import { Component, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { ClrFormLayouts, HlcClrFormComponent } from '@ng-holistic/clr-forms';
import { TextMask } from '@ng-holistic/clr-controls';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { distinctPropChanged } from '@ng-holistic/forms';
import { format } from 'date-fns/esm/fp';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { HlcClrModalService, HLC_CONTAINER_DATA } from '@ng-holistic/clr-common';


@Component({
    selector: 'hlc-form-modal',
    template: `
        <form clrForm [formGroup]="form">
            <clr-input-container>
                <label>Text</label> <input clrInput type="text" formControlName="text" />
            </clr-input-container>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInModalComponent {
    readonly form: FormGroup;

    constructor(fb: FormBuilder) {
        this.form = fb.group({ text: ['', [Validators.required]] });
    }
}

@Component({
  selector: 'my-app',
  template: `<button autofocus class="btn" (click)="onShowModal()">Show Modal</button>`
})
export class AppComponent {
    constructor(private readonly modalService: HlcClrModalService) {}

    onShowModal() {
        this.modalService.showForm({
            title: 'Form in modal',
            data: { hint: 'Hint from caller' },
            componentFormField: 'form',
            contentComponentType: FormInModalComponent,
            allowOkWhenFormPristine: false,
            dataAccess: {
                update(_) {
                    return timer(1000);
                }
            }
        });
    }
}
