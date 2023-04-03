import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent {
  
  num1: number = 0;
  num2: number = 0;
  result: number = 0;
  visor: string = '0'
  visorNumber: number = 0;
  visorOperacao : string = '';
  operacao : string = '';
  operador : string = '';
  chamouFuncao: boolean = false;

  //NUMBERS WORKING
  //for keyboard
  
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(this.result !== 0) {
      this.clear();
      this.visorOperacao = '';
    }

    if (event.key == 'Backspace'){
      this.visor = this.visor.substring(0, this.visor.length - 1);
    }

    if (event.key == 'Enter'){
      if (this.num1 !== 0 && this.visor !== '0') {
        this.equalFunction();
      }
    }

    if (['+'].includes(event.key)) {
      this.additionButton();
    }
    else if (['-'].includes(event.key)) {
      this.subtractionButton();
    }
    else if (['*'].includes(event.key)) {
      this.multiplicationButton();
    }
    else if (['/'].includes(event.key)){
      this.divisionButton();
    }

    if (this.visor == ''){
      this.visor = '0';
    }
    
    const regex = /[0-9]/;
    if (regex.test(event.key)) {
      if (this.visor === '0'){
        this.visor = '';
      }
      // console.log(+event.key); //+ transform to int, another option is to use parseInt like in JavaScript
      this.visor += event.key; 
    }
  }

  // for display buttons
  showDigit(key: number) {
    if(this.result !== 0) {
      this.clear();
      this.visorOperacao = '';
    }

    if (this.visor === '0'){
      this.visor = '';
    }
    this.visor += key;
  }
  // NUMBERS WORKING => END

  // FUNCTION BUTTONS (CE, C, BACKSPACE, +/-)

  clearEntry(){
    if(this.chamouFuncao == true){
      this.num2 = 0;
    }
    else{
      this.num1 = 0;
    }
    this.visor = '0';
  }

  clear(){
    this.num1 = 0;
    this.num2 = 0;
    this.visor = '0';
    this.visorOperacao = '';
    this.visorNumber = 0;
    this.operacao = '';
    this.result = 0;
    this.chamouFuncao = false;
  }

  erase(){
    this.visor = this.visor.substring(0, this.visor.length - 1);
    if (this.visor == ''){
      this.visor = '0';
    }
  }

  invertValue(){
    this.visorNumber = Number(this.visor);
    this.visorNumber = this.visorNumber * -1;
    this.visor = this.visorNumber.toString();    
  }
  // FUNCTION BUTTONS (CE, C, BACKSPACE, +/-) => END

  // OPERATIONS ONCLICK
  additionButton(){
    this.num1 = Number(this.visor);
    this.visor = '0';
    this.operacao = 'addition';
    this.chamouFuncao = true;
  }

  subtractionButton(){
    this.num1 = Number(this.visor);
    this.visor = '0';
    this.operacao = 'subtraction';
    this.chamouFuncao = true;
  }

  multiplicationButton(){
    this.num1 = Number(this.visor);
    this.visor = '0';
    this.operacao = 'multiplication';
    this.chamouFuncao = true;
  }

  divisionButton(){
    this.num1 = Number(this.visor);
    this.visor = '0';
    this.operacao = 'division';
    this.chamouFuncao = true;
  }
  // OPERATIONS ONCLICK => END

  // OPERATIONS

  addition(){
    this.result = this.num1 + this.num2;
    return this.result;
  }

  subtraction(){
    this.result = this.num1 - this.num2;
    return this.result;
  }

  multiplication(){
    this.result = this.num1 * this.num2;
    return this.result;
  }

  division(){
    this.result = this.num1 / this.num2;
    return this.result;
  }

  // OPERATIONS => END

  commaFunction(){
    if (this.visor.substr(-1) !== '.'){
      this.visor += '.';
    }
  }

  equalFunction(){
    this.num2 = Number(this.visor);

    switch(this.operacao){
      case 'addition':
        this.operador = '+';
        this.addition();
        break;
      case 'subtraction':
        this.operador = '-';
        this.subtraction();
        break;
      case 'multiplication':
        this.operador = '*';
        this.multiplication();
        break;
      case 'division':
        this.operador = '/';
        this.division();
        break;
    }
    this.chamouFuncao = false;
    this.visor = this.result.toString();
    this.showOperation();
  }  

  showOperation(){
    this.visorOperacao = `${this.num1}  ${this.operador} ${this.num2}`;
  }
}
