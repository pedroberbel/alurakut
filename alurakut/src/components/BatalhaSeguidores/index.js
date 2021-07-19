import React from "react";
import Box from "../Box";
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

async function getDataGit(user){
    const retorno = await fetch(
        `https://api.github.com/users/${user}`
      );
      const data = await retorno.json();

      return data
}


export function BatalhaSeguidores(fighters){

    const clearPlayer = {
        login: '',
        followers:0,
        following:0,
        public_repos:0,
}
    var [winner, setWinner] = React.useState();
    let [player1 = {
        login: '',
        followers:0,
        following:0,
        public_repos:0,
    }, setPlayer1] = React.useState();
    let [player2 = {
        login: '',
        followers:0,
        following:0,
        public_repos:0,
    }, setPlayer2] = React.useState();
    
    React.useEffect(()=>{
        getDataGit(player1.login).then((retorno)=>{
        })
    },[])


            return (<Box>
                <h2 className="subTitle">Batalha de Seguidores</h2>
                <p>Como Jogar: digite o usuário github nos campos dos players e clique em Fight para carregar os dados, clique em fight novamente para saber quem é o vendor</p>
                <p>Clique em Nova Batalha, para começar a próxima!</p>
                <ProfileRelationsBoxWrapper>
                    <button onClick={function resetBatalha(e){
                        e.preventDefault();
                        setWinner('')
                        setPlayer1(clearPlayer)
                        setPlayer2(clearPlayer)
                    }}>Nova batalha</button>
                    <hr />
                    <form onSubmit={function handleBatalha(e) {
                        setWinner('')
                        e.preventDefault();
                        const dadosDoForm = new FormData(e.target);
                        
                        const batalha = { 
                            p1: dadosDoForm.get('player1'),
                            p2: dadosDoForm.get('player2'),
                        }
                        console.log('buscando: ', batalha.p1)
                        getDataGit(batalha.p1)
                        .then((response)=> {
                            setPlayer1(response)
                        }).then(()=>{
                            getDataGit(batalha.p2)
                            .then((response)=> {
                                setPlayer2(response)
                            })
                        }).then(()=>{
                            let p1Pts = 0;
                            let p2Pts = 0;
                            if (player1.followers === player2.followers) {
                                p1Pts += 1;
                                p2Pts += 1;
                            }
                            else if (player1.followers > player2.followers){
                                p1Pts += 1;
                            } else {
                                p2Pts += 1;
                            }
                            
                            if (player1.public_repos === player2.public_repos) {
                                p1Pts += 1;
                                p2Pts += 1;
                            }
                            else if (player1.public_repos > player2.public_repos){
                                p1Pts += 1;
                            } else {
                                p2Pts += 1;
                            }

                            if (player1.following === player2.following) {
                                p1Pts += 1;
                                p2Pts += 1;
                            }else if (player1.following > player2.following){
                                p1Pts += 1;
                            } else {
                                p2Pts += 1;
                            }
                    
                            
                            (p1Pts > p2Pts)? setWinner(player1.login) : (p1Pts === p2Pts) ? setWinner('empate') : setWinner(player2.login);
                        })
                        }}>
                        <ul>
                            <p style={{textAlign:'center'}}>
                                Player1
                                <input type="text" name="player1" placeholder="usuario" aria-label="usuario"></input>
                            </p>
                            <p style={{textAlign:'center'}}>
                                <button style={{width: '100%',
                                        display:'block',
                                        border: '0',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        backgroundColor: '#2E7BB4',
                                        color: '#FFFFFF'}} >FIGHT !</button></p>
                            <p style={{textAlign:'center'}}> 
                                Player2 
                                <input type="text" name="player2" placeholder="usuario" aria-label="usuario"></input>
                            </p>
                        </ul>
                    </form>
                    <hr />
                    <ul>
                    {(player1.login) ? <img src={`https://github.com/${player1.login}.png`} style={{maxHeight:'100px', maxWidth:'100px', borderRadius:'50px'}} /> : <img src={`https://miro.medium.com/max/1200/1*g09N-jl7JtVjVZGcd-vL2g.jpeg`} style={{maxHeight:'100px', maxWidth:'100px', borderRadius:'50px'}} /> }

                    <img src='https://image.flaticon.com/icons/png/512/571/571576.png' style={{maxHeight:'100px', maxWidth:'100px'}}/>
                    {(player2.login) ? <img src={`https://github.com/${player2.login}.png`} style={{maxHeight:'100px', maxWidth:'100px', borderRadius:'50px'}} /> : <img src={`https://miro.medium.com/max/1200/1*g09N-jl7JtVjVZGcd-vL2g.jpeg`} style={{maxHeight:'100px', maxWidth:'100px', borderRadius:'50px'}} /> }
                    </ul>
                    <hr />
                    <ul>
                        <p>Seguidores</p>
                        <p></p>
                        <p>Seguidores</p>
                    </ul>
                    <ul>
                        <p>{player1.followers}</p>
                        <p></p>
                        <p>{player2.followers}</p>
                    </ul>
                    <ul>
                        <p>Repositórios</p>
                        <p></p>
                        <p>Repositórios</p>
                    </ul>
                    <ul>
                        <p>{player1.public_repos}</p>
                        <p></p>
                        <p>{player2.public_repos}</p>
                    </ul>
                    <ul>
                        <p>Seguindo</p>
                        <p></p>
                        <p>Seguindo</p>
                    </ul>
                    <ul>
                        <p>{player1.following}</p>
                        <p></p>
                        <p>{player2.following}</p>
                    </ul>
                    <hr />
                    
                    <h2 className="subTitle" style={{textAlign:'center'}}>Vencedor</h2>
                    
                    <ul>
                        <p></p>
                    
                    {(!winner) ? <p></p> : (winner==="empate")? <h3>Empatou!</h3>: <img src={`https://github.com/${winner}.png`} style={{maxHeight:'100px', maxWidth:'100px', borderRadius:'50px'}} />} 
                    </ul>
                    
                </ProfileRelationsBoxWrapper>
                
            </Box>
            );       
    
    
}