const { loadSheetMes, loadSheetFevereiro } = require("./index")
const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const client = new Client({
    authStrategy: new LocalAuth()
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

    console.log(msg)

    
    if (msg.body === '#menu') {
        console.log(msg.from)
        await client.sendMessage(msg.from, `01 - Janeiro\n02 - Fevereiro\n03 - Março\n04 - Abril\n05 - Maio\n06 - Junho\n07 - Julho\n08 - Agosto\n09 - Setembro\n10 - Outubro\n11 - Novembro\n12 - Dezembro`)

        console.log('Menu enviado para client!')

    }else if (msg.body === "1" || msg.body === '01' || msg.bdoy === 'Janeiro' || msg.body === '01 - Janeiro') {

        let mes = 0

        const data = await loadSheetMes()

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
