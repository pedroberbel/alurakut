import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'


function ProfileSidebar(properties){
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{borderRadius:'8px'}}></img>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'pedroberbel';

  return (
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>
      

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>Bem Vindo</Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <Box>Amigos</Box>
        <Box>Comunidades</Box>
      </div>
      
      

    </MainGrid>
  )
}
