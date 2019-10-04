import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoy'
})
export class HoyPipe implements PipeTransform {
 
  transform( arreglo: any[],
    texto: string,
    columna: string){

if( texto === '') {
return arreglo;
console.log('error')
}else{
  console.log('esta escribiendo')

}



return arreglo.filter( item =>{
 return item[columna];
})
return arreglo;
}

}
