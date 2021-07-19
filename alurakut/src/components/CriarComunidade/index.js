import Box from "../Box";
import React from 'react';

export function CriarComunidade(githubUser){
    console.log('cria recebe: ', githubUser.githubUser)
    const [comunidades, setComunidades] = React.useState([]);


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
                  allCommunities {
                    id
                    title
                    imageUrl
                    creatorSlug
                  }
                }`
            })
        }) //objeto de configuração, method padrão GET
        .then((response)=> response.json())
        .then((responseCompleto) => {
        const comunidadesFromDato = responseCompleto.data.allTestimonies;
        setComunidades(comunidadesFromDato)
        console.log(comunidadesFromDato)
        })
    
    }, []) //segundo parâmetro - um array vazio, pois queremos que ele rode apenas 1 vez.


    return (
        <Box>
            <h2 className="subTitle">Criar Comunidade</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              //cria um objeto para passar à array
              const comunidade = { 
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser.githubUser
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response)=> {
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })


              
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
              <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa" />
              </div>
              <button>
                Criar Comunidade
              </button>
              
            </form>
          </Box>
          );
}