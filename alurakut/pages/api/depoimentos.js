import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '89e6f53dee468a66602855eba2eaef';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "977395",
            ...request.body //dessa forma não garante que os dado são válidos.
    
        })
    
        response.json({
            registroCriado: registroCriado,
        })

        return;
    }
    
    response.status(404).json({
        message:"Ainda não tem nada no GET, apenas no POST"
    })
}