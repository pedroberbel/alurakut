import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export function MenuOpcoes(){
    return (
        <ProfileRelationsBoxWrapper>
            
            <h2 className="subTitle"> O que você deseja fazer?</h2>
            <ul>
              <button>Criar Comunidade</button>
              <button>Batalha do Seguidores</button>
              <button>Criar Depoimento</button>
            </ul>
            
            
            
          </ProfileRelationsBoxWrapper>
    )
}