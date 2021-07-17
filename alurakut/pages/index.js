import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

function ProfileSidebar(properties){
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{borderRadius:'8px'}}></img>
      {/* <img src={`https://www.linkedin.com/in/${properties.githubUser}/detail/photo/`} style={{borderRadius:'8px'}}></img> */}
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>@{properties.githubUser}</a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(properties){
  return (
  <ProfileRelationsBoxWrapper>
  <h2 className="smallTitle">
  {properties.title}  ({properties.items.length})
  </h2>
  <ul>
    {properties.items.slice(0,6).map((itemAtual)=>{
      return (
        <li key={itemAtual.login}>
        <a href={`https://github.com/${itemAtual.login}`}>
          <img src={`https://github.com/${itemAtual.login}.png`} />
          <span>{itemAtual.login}</span>
        </a>
      </li>
        )
    })}
  </ul>

</ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  // const githubUser = 'pedroberbel';
  const githubUser = props.githubUser;
  const pessoasFavoritas = ['pedroberbel','omariosouto','peas','juunegreiros','billgates','elonmusk','pedroberbel'];
  const [comunidades, setComunidades] = React.useState([]);
  //   {
  //   id: '23423443',
  //   title: 'Eu odeio acordar cedo',
  //   image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  // }]);

  const [seguidores, setSeguidores] = React.useState([]);
  const [seguidos, setSeguidos] = React.useState([]);

  React.useEffect(()=>{
    //array de pessoas que o usuário segue no github
    fetch(`https://api.github.com/users/${githubUser}/following`)
                      .then((githubResponseFollowing) => {
                        return githubResponseFollowing.json();
                      })
                      .then((completeResponseFollowing) => {
                        console.log(completeResponseFollowing)
                        setSeguidos(completeResponseFollowing)
                      })

    //array de dados de seguidores do github
    fetch(`https://api.github.com/users/${githubUser}/followers`)
                      .then((githubResponse) => {
                        return githubResponse.json();
                      })
                      .then((completeResponse) => {
                        setSeguidores(completeResponse)
                      })
     //array de dados das comunidades do DatoCMS  
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
    })}) //objeto de configuração, method padrão GET
    .then((response)=> response.json())
    .then((responseCompleto) => {
      const comunidadesFromDato = responseCompleto.data.allCommunities;
      setComunidades(comunidadesFromDato)
      console.log(comunidadesFromDato)
    })

  }, []) //segundo parâmetro - um array vazio, pois queremos que ele rode apenas 1 vez.


  //const comunidades = comunidades[0]; posição com o valor 
  //const alteradorComunidades = comunidades[1]; posição com oque altera o array
  const limit = 6;
  return (
    <div>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="tittle">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              // console.log(dadosDoForm.get('title'));
              // console.log(dadosDoForm.get('image'));

              //cria um objeto para passar à array
              const comunidade = { 
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser
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
          {/* <Box>
          <h2 className="subTitle">Batalha dos Seguidores!</h2>
          <p>Os seguidores são comparados atrvés de 3 itens:</p>
          <p>Número de Seguidores - 1 ponto</p>
          <p>Número de Repositórios - 1 ponto</p>
          <p>Usuário mais Antigo - 1 ponto</p>

          <p>É necessário ser um seguidor da conta: <a href={`https://github.com/pedroberbel`}>@pedroberbel</a></p>

          </Box> */}
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Amigos  ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.slice(0, limit).map((itemAtual) => { // pessoasFavoritas.map((itemAtual) => {
                return (
                  
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                  
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades  ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0,limit).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title="Seguindo no Github" items={seguidos} />
          <ProfileRelationsBox title="Seguidores Github" items={seguidores}/>


        </div>
        
        

      </MainGrid>
    </div>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);

  console.log(githubUser)

  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  console.log('isAuthenticated: ' + jwt.decode(token).githubUser + ' ' + isAuthenticated);

  if (!isAuthenticated){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  //JWT para decodificar o token recebido
  //valor dentro da chave tem que ser o mesmo do recebido para ele reconhecer
  
  return {
    props: {
      githubUser
    }
  }
}