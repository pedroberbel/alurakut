import { CriarComunidade } from '../CriarComunidade';
import { BatalhaSeguidores } from '../BatalhaSeguidores';
import { Depoimentos } from '../Depoimentos';




export function BuildBox(properties) {
//    console.log('BuildBox: ', properties.valor)
//    if(properties.valor === 'btncomunidade'){
//    return <CriarComunidade />
console.log(properties.valor.githubUser)
   if(properties.valor.box === 'btnbatalha') {
       return <BatalhaSeguidores />
   } else if(properties.valor.box === 'btndepoimentos') {
        return <Depoimentos />
   } else {
       return <CriarComunidade githubUser={properties.valor.githubUser}/>;
   }
   // return (<Box><p>{properties.valor}</p></Box>);
}