import Box from "../Box";
import React from 'react';

export function Depoimentos(){
    
    const [depoimentos, setDepoimentos] = React.useState([]);
         //array de dados das comunidades do DatoCMS  
    React.useEffect(()=>{
        fetch('https://graphql.datocms.com/',{
            method: 'POST', 
            headers: {
                'Authorization':'6669b4508e09695ffc25ed7f31ad20',
                'Content-Type':'application/json',
                'Accept':'application/json'        
                },
            body: JSON.stringify({"query":`
            query {
                    allTestimonies {
                    id
                    creatorSlug
                    createdAt
                    text
                }
                
            }`
            })
        }) //objeto de configuração, method padrão GET
        .then((response)=> response.json())
        .then((responseCompleto) => {
        const depoimentosFromDato = responseCompleto.data.allTestimonies;
        setDepoimentos(depoimentosFromDato)
        console.log(depoimentosFromDato)
        })
    
    }, []) //segundo parâmetro - um array vazio, pois queremos que ele rode apenas 1 vez.

    return (
        <Box>
            <form onSubmit={function handleCriaDepoimento(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              // console.log(dadosDoForm.get('title'));
              // console.log(dadosDoForm.get('image'));

              //cria um objeto para passar à array
              const criardepoimento = { 
                text: dadosDoForm.get('text'),
                creatorSlug: dadosDoForm.get('creatorSlug')
              }

              fetch('/api/depoimentos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(criardepoimento)
              })
              .then(async (response)=> {
                const dados = await response.json();
                const depoimento = dados.registroCriado;
                const depoimentosAtualizados = [...depoimentos, depoimento];
                setDepoimentos(depoimentosAtualizados);
              })


              
            }}>
            <div>
            <h2 className="subTitle">Criar Depoimento</h2>
                <input 
                  placeholder="Qual seu nome?" 
                  name="creatorSlug" 
                  aria-label="Qual seu nome?"   />
              </div>
              <div>
                <input 
                  placeholder="O que você tem a dizer?" 
                  name="text" 
                  aria-label="O que você tem a dizer?"   />
              </div>
              <button style={{width: '100%',
                                        display:'block',
                                        border: '0',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        backgroundColor: '#2E7BB4',
                                        color: '#FFFFFF'}}>
                Criar Depoimento
              </button>
              </form>
            <hr />
            <h2 className="subTitle">Depoimentos ({depoimentos.length}) {depoimentos.length>6 ? <a href="/depoimentos" style={{textDecoration:'none', color:'#2E7BB4' }}>Ver todos</a> : ''}</h2>
            <ul>
              {depoimentos.slice(0,6).map((itemAtual) => {
                return ( 
                  <ul key={itemAtual.id}>
                      <ul className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
                      
                      <img src={`https://github.com/${itemAtual.creatorSlug}.png`} 
                      style={{maxHeight:'50px', borderRadius:'8px'}} />

                      {itemAtual.creatorSlug}:{itemAtual.text}
                      
                      </ul>
                      
                      <hr />
                  </ul>
                  
                )
              })}
            </ul>
        </Box>
    
        )
}