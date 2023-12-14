const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./credentials.json')
const JWT = require('google-auth-library')
require('dotenv').config()

const serviceAccountAuth = new JWT.JWT ({
    email:credentials.client_email,
    key:credentials.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ]
})

// const sheetYear = {
//     2023: process.env.ID_SHEETS_TESTE
// }
const docId = process.env.ID_SHEETS_TESTE

const doc = new GoogleSpreadsheet.GoogleSpreadsheet(docId, serviceAccountAuth);

const loadSheet = async function (){
    await doc.loadInfo()

    const sheet = await doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    // let dados = []

    const dados = rows.map(item => {

        return {
            Id: item.get('ID'),
            Nome: item.get('Nome'),
            Telefone: item.get('Telefone'),
            Valor: item.get('Valor'),
            Status: item.get('Status'),
            Data: item.get('Data-vencimento'),
            Parcela: item.get('N Parcela'),
            OBS: item.get('OBS.:')
        }

    })

    // let dia = dados[1].Data.split('/')[0]
    // let mes = dados[1].Data.split('/')[1]
    // let ano = dados[1].Data.split('/')[2]
    // console.log(`O dia de vencimento desse cliente é: ${dia}, do mês ${mes}, do ano ${ano}`)
    console.log(dados)

    return dados
}

// loadSheet()

module.exports = loadSheet