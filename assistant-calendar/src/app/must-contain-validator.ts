import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
  
export function mustContainValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const symbols = ['(', '[', '~', '!', '@', '#', '$', '%', '^',
                        '&', '*', '(', ')', '-', '_', '=', '+', '{',
                        '}', ':', ';', ',', '.', '"', "'", '`', '<', '>',
                        '[', ']', '\\', '/', '?'];
        let numFlag = false, symFlag = false;
    
        nums.forEach(num => {
          if (value?.includes(num.toString())) {
            numFlag = true;
          }
        });
    
        symbols.forEach(sym => {
          if (value?.includes(sym)) {
            symFlag = true;
          }
        });

        return (!symFlag || !numFlag) ? 
                { contains: {
                  number: {
                    value: numFlag
                  },
                  symbols: {
                    value: symFlag
                  }
                }} : null;
    };
}