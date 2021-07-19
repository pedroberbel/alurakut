import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { BuildBox } from '../src/components/BuildBox';
import { useRouter } from 'next/router';


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

export function ProfileRelationsBox(properties){
  return (
  <ProfileRelationsBoxWrapper>
  <h2 className="smallTitle">
  {properties.title}  ({properties.items.length}) {properties.items.length>6 ? <a href="/amigosgithub" style={{textDecoration:'none', color:'#2E7BB4' }}>Ver todos</a> : ''}
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
  const router = useRouter();
  const githubUser = props.githubUser;
  if (!githubUser){
    router.push('/login')
  }
  const pessoasFavoritas = ['pedroberbel','omariosouto','peas','juunegreiros','billgates','elonmusk','pedroberbel'];
  const [comunidades, setComunidades] = React.useState([]);
  //   {
  //   id: '23423443',
  //   title: 'Eu odeio acordar cedo',
  //   image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  // }]);

  const [seguidores, setSeguidores] = React.useState([]);
  const [seguidos, setSeguidos] = React.useState([]);

  const [criaBox, setCriaBox] = React.useState('criacomunidade');

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
          {/* <MenuOpcoes /> */}
          <ProfileRelationsBoxWrapper>
            
            <h2 className="subTitle"> O que você deseja fazer?</h2>
            <ul>
              <button onClick={function teste(){setCriaBox('btncomunidade')}}>Criar Comunidade</button>
              <button onClick={function teste(){setCriaBox('btnbatalha')}}>Batalha do Seguidores</button>
              <button onClick={function teste(){setCriaBox('btndepoimentos')}}>Criar Depoimento</button>
            </ul>
          </ProfileRelationsBoxWrapper>

          <BuildBox valor={criaBox} />

        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Amigos  ({pessoasFavoritas.length}) {pessoasFavoritas.length>6 ? <a href="/amigos" style={{textDecoration:'none', color:'#2E7BB4' }}>Ver todos</a> : ''}
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
              <p></p>
            </ul>

          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades  ({comunidades.length}) {comunidades.length>6 ? <a href="/comunidades" style={{textDecoration:'none', color:'#2E7BB4' }}>Ver todas</a> : ''}
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
  const tokenDecoded = jwt.decode(token);
  
  if (!tokenDecoded) {
    return {props:{githubUser:0}}
  }

  const response = await fetch(
    `https://api.github.com/users/${tokenDecoded.githubUser}`
  );
  const data = await response.json();

  if (data.message === "Not Found" || !data) {  
    return {props:{githubUser:0}}
  } else {
    return {
      props: {
        githubUser
      }
    }
  }

  //JWT para decodificar o token recebido
  //valor dentro da chave tem que ser o mesmo do recebido para ele reconhecer
  
  // return {
  //   props: {
  //     githubUser
  //   }
  // }
}