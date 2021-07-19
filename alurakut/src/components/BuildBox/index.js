import { CriarComunidade } from '../CriarComunidade';
import { BatalhaSeguidores } from '../BatalhaSeguidores';
import { Depoimentos } from '../Depoimentos';




export function BuildBox(properties) {
//    console.log('BuildBox: ', properties.valor)
//    if(properties.valor === 'btncomunidade'){
//    return <CriarComunidade />
   if(properties.valor === 'btnbatalha') {
       return <BatalhaSeguidores />
   } else if(properties.valor === 'btndepoimentos') {
        return <Depoimentos />
   } else {
       return <CriarComunidade />;
   }
   // return (<Box><p>{properties.valor}</p></Box>);
}