import {Observable} from 'rxjs';
import {AdminUserService} from '../admin-users/services/AdminUser.service';
import {AbstractControl, FormArray, FormControl, ValidatorFn, ValidationErrors, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';

export class AppValidators {

  static minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : {required: true};
    };
    return validator;
  }

  static minItems(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null && control.value.length === 0) {
      return {required: true};
    }
    return null;
  }

  static MatchPassword(AC: AbstractControl) {
    if (AC.get('confirmPassword').errors && !AC.get('confirmPassword').errors['MatchPassword']) {
      return;
    }
    if (AC.get('password').value !== AC.get('confirmPassword').value) {
      AC.get('confirmPassword').setErrors({MatchPassword: true});
      return {MatchPassword: true};
    }
    AC.get('confirmPassword').setErrors(null);
    return null;
  }

  static EmailValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.length === 0) {
      return null;
    } else {
      const EMAIL_REGEXP = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
      return EMAIL_REGEXP.test(control.value) ? null : {validateEmail: true};
    }
  }

  static validateHost(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.length === 0) {
      return null;
    } else {
      const HOST_REGEXP = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g;
      return HOST_REGEXP.test(control.value) ? null : {validateHost: true};
    }
  }

  //This will allow long values
  static longPattern(control: AbstractControl): ValidationErrors | null {
    const re = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {longPattern: true};
  }

  //This will allow lat values
  static latPatterng(control: AbstractControl): ValidationErrors | null {
    const re = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {latPattern: true};
  }

  static urlPattern(control: AbstractControl): ValidationErrors | null {
    const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {urlPattern: true};
  }

  //This will allow decimal numbers (or whole numbers) that don't start with zero
  static acceptNumbers(control: AbstractControl): ValidationErrors | null {
    const re = /^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {acceptNumbers: true};
  }

  static acceptEnglisgh(control: AbstractControl): ValidationErrors | null {
    const re = /^[A-Za-z0-9&\/\\#,+|_\-()\[\]:;+@$~%.`'":*?!{} ]*$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {acceptEnglisgh: true};
  }

  static acceptArabic(control: AbstractControl): ValidationErrors | null {
    const re = /^[\u0621-\u064A0-9 ]+$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {acceptArabic: true};
  }

  static pattern(control: AbstractControl): ValidationErrors | null {
    const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? null : {pattern: true};
  }

  static userNameSpecialChars(control: AbstractControl): ValidationErrors | null {
    const re = /([\\\/:*?^<>|'"Æ]|{end})/;
    if (!control.value)
      return null;
    const valid = re.test(control.value);
    return valid ? {userNameSpecialChars: true} : null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!control.value)
      return null;
    const valid = re.test(control.value.trim());
    return valid ? null : {email: true};
  }


  static shouldNotStartWith(value: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

      const opt: any[] = value.split(',');
      for (let i = 0; i < opt.length; i++) {
        let val = control.value;
        if (val != undefined && val.trim().toLowerCase().startsWith(opt[i])) {
          return {'shouldNotStartWith': true};
        }
      }
      return null;
    }
  }

  static shouldNotStartWithSpace(value: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value === null || control.value.length === 0) {
        return null;
      }


      let val = control.value;
      if (val != undefined && val.startsWith(' ')) {
        return {'shouldNotStartWithSpace': true};
      }

      return null;
    }
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({NoPassswordMatch: true});
    }
  }

  static minlen(minNum: number, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      return ((control.value.trim()).length >= minNum) ? null : error;
    };
  }

  static maxlen(maxNum: number, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      return ((control.value.trim()).length <= maxNum) ? null : error;
    };
  }

  static userUniqueEmail(adminUserService: AdminUserService, id?: string): AsyncValidatorFn {
    return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return adminUserService.checkEmailExist({name: c.value, _id: id}).pipe(
        map((res: any) => {
          return res.exist ? {notUnique: true} : null;
        })
      );
    };
  }
}
