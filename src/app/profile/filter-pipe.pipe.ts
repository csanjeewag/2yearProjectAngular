import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){

      console.log(value);
      return value;
    }else{
      args = args.toUpperCase();
    }
   return  value.filter(items => 
      items.empName.toUpperCase().startsWith(args)==true ||
      items.empEmail.toUpperCase().startsWith(args)==true
      )
  }

}
