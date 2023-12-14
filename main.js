const { loadSheet } = require("./index")
const { Client, LocalAuth, ClientInfo } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
require('dotenv').config()

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox']
    }
})

client.on('loading_screen', async (percent, message) => {
    console.log('LOADING SCREEN', percent, message)
});


client.on('qr', async qr => {
    qrcode.generate(qr, {small: true})
})

client.on('ready', async () => {
    console.log('Whatsapp conectado')
    await client.sendMessage('556599873086@c.us', 'Serviço iniciado com sucesso!!!')
})

client.on('message', async msg => {

    if (msg.body === '!iniciar') {
        await client.sendMessage(msg.from, `Olá, aqui é o RobMaster,\n\nEstou aqui para te ajudar com o envio das mensagens para os seus clientes.\n\nEscolha agora o ano que dejesa começar:\n\n- 2023;\n- 2024;`)
    } else if (msg.body === '2023') {
        await client.sendMessage(msg.from, `Muito bem, por qual mês deseja começar os envios:\n\n- Novembro/23;\n- Dezembro/23;\n- Anteriores/23;`)
    } else if (msg.body.toLowerCase() === 'novembro/23') {
        const data = await loadSheet(2023, 0)

        for await (const item of data) {
            if (item['Status'] == 'Inadimplente'){
                if (!isNaN(item['Telefone'])){
                    let fone = `${item[telefone]}@c.us`
                    let nome = item['Nome']
                    let data = item['Data']
                    let valor = item['Valor']

                    setTimeout(async () => {

                        await client.sendMessage(fone, `Olá, *${nome}*, aqui é o *BiroBot*,\n\nNão identificamos o pagamento da sua notinha que venceu dia *${data}*, no valor de *${valor}*.\n\nCaso ache mas cômodo podemos te encaminhar o nosso *pix*.\n\nCaso já tenha efetuado o pagamento, ignore a mensagem.`)
    
                        await client.sendMessage(fone, 'Segue chave pix abaixo:')
                        await client.sendMessage(fone, '05359593113')

                    }, 2500)
                }
            }
        }

    } else if (msg.body.toLowerCase() === 'dezembro/23') {
        const data = await loadSheet(2023, 1)

        for await (const item of data) {
            if (item['Status'] == 'Inadimplente'){
                if (!isNaN(item['Telefone'])){
                    let fone = `${item[telefone]}@c.us`
                    let nome = item['Nome']
                    let data = item['Data']
                    let valor = item['Valor']

                    setTimeout(async () => {

                        await client.sendMessage(fone, `
                        Olá, *${nome}*, aqui é da *MasterCell*,
                        
                        Não identificamos o pagamento da sua notinha que venceu dia *${data}*, no valor de *${valor}*.
                        
                        Caso ache mas cômodo podemos te encaminhar o nosso *pix*.
                        
                        Caso já tenha efetuado o pagamento, ignore a mensagem.
                        `)
    
                        await client.sendMessage(fone, 'Segue chave pix abaixo, é o nosso número de telefone.')
                        await client.sendMessage(fone, '65999117777')

                    }, 2500)
                }
            }
        }

    } else if (msg.body.toLowerCase() === 'anteriores/23') {
        const data = await loadSheet(2023, 2)

        for await (const item of data) {
            if (item['Status'] == 'Inadimplente'){
                if (!isNaN(item['Telefone'])){
                    let fone = `${item[telefone]}@c.us`
                    let nome = item['Nome']
                    let data = item['Data']
                    let valor = item['Valor']

                    if (item['OBS'] === 'SPC') {
                        setTimeout(async () => {

                            await client.sendMessage(fone, `
                            Olá, *${nome}*, aqui é da *MasterCell*,
                            
                            Não identificamos o pagamento da(s) sua(s) notinha(s).

                            Informamos que seu nome consta no SPC.
                            
                            Caso precise de uma renegociação, podemos conversar novamente sobre uma melhor forma de pagamento.
                            
                            Caso já tenha efetuado o pagamento, ignore a mensagem.
                            `)
    
                        }, 2500)
                    } else {
                        setTimeout(async () => {

                            await client.sendMessage(fone, `
                            Olá, *${nome}*, aqui é da *MasterCell*,
                            
                            Não identificamos o pagamento da(s) sua(s) notinha(s).
                            
                            Caso precise de uma renegociação, podemos conversar novamente sobre uma melhor forma de pagamento.
                            
                            Caso já tenha efetuado o pagamento, ignore a mensagem.
                            `)
    
                        }, 2500)
                    }
                }
            }
        }

    }

    
    if (msg.body === '#menu') {
        console.log(msg.from)
        await client.sendMessage(msg.from, `01 - Janeiro\n02 - Fevereiro\n03 - Março\n04 - Abril\n05 - Maio\n06 - Junho\n07 - Julho\n08 - Agosto\n09 - Setembro\n10 - Outubro\n11 - Novembro\n12 - Dezembro`)

        console.log('Menu enviado para client!')

    }else if (msg.body === "1" || msg.body === '01' || msg.bdoy === 'Janeiro' || msg.body === '01 - Janeiro') {

        const data = await loadSheet()

        // const listaEnviados = []

        for await (const item of data){
            if (item['Status'] == "Inadimplente") {
                if (!isNaN(item['Telefone'])) {
                    let telefone = `${item["Telefone"]}@c.us`
                    let nome = item["Nome"]
    
                    await client.sendMessage(telefone, `Olá ${nome},\n\nIdentificamos que você tem uma notinha em aberto conosco.\n\nNo valor de ${item["Valor"]}.\n\nPor favor responda está mensagem para darmos prosseguimento, e evitar a negtivaçao do seu nome.`)
                    console.log(`Mensagem enviada para: ${item['Nome']}`)
                    
                }
                // await client.sendMessage('556599873086@c.us', `Mensagem enviado para ${item['Nome']}`)

                // listaEnviados.push({
                //     Nome: item['Nome'],
                //     Telefone: item['Telefone'],
                //     Valor: item['Valor'],
                //     Status: item['Status']
                // })
                
            }
        }
    }

})

client.initialize()
