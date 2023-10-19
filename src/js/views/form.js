
import {getAutocompleteInstance, getDatePickerInstance} from '../plugins/materialize';
class FormUI {
  constructor(autocompleteInstance, datePickerInstance){
    this._form = document.forms['locationControls'];//_ - указываются условно-приватные свойства
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.depart);
    this.returnDatePicker = datePickerInstance(this.return);
  }

  //Getter
  get form() {
    return this._form; 
  }
  //Setter
  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

  //*Данные из автокоплитов
  get originValue(){
    return this.origin.value;
  }

  get destinationValue(){
    return this.destination.value;
  }

  get departDateValue(){
    return this.departDatePicker.toString();
  }

  get returnDateValue(){
    return this.returnDatePicker.toString();
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;