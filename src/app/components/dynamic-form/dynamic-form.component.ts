import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormConfigInterface} from "./form-config.interface";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {max, Subscription} from "rxjs";
import {FormConfigTypeEnum} from "./form-config-type.enum";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) formConfig!: FormConfigInterface[];
  @Output() valueChanges = new EventEmitter<any>();
  private formSub!: Subscription;

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      // TODO extract address formGroup to an array add push this if type is address
      address: this.formBuilder.group({
        street: [],
        country: [],
      })
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.formSub = this.form.valueChanges.subscribe(data => {
      this.valueChanges.emit(data);
    })
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  private initForm() {
    this.formConfig.forEach((field: FormConfigInterface) => {
      if (field.type === FormConfigTypeEnum.Text) {
        const control: FormControl = this.formBuilder.control('', [Validators.required]);
        if (field.options?.length) {
          control.addValidators(Validators.maxLength(field.options.length));
          control.addValidators(Validators.minLength(field.options.length));
          control.updateValueAndValidity();
        }
        if (field.options?.valueType === 'numeric') {
          // TODO extract regex rules in an external Validator
          control.addValidators(Validators.pattern("^[0-9]*$"),);
          control.updateValueAndValidity();
        }
        this.form.addControl(field.label, control);
      }
      if (field.type === FormConfigTypeEnum.Text) {}
    })


  }

  get FormConfigTypeEnum() {
    return FormConfigTypeEnum;
  }
}
