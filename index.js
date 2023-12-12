const GoogleSpreadsheet = require('google-spreadsheet');
// const credentials = require('./credentials.json');
// const JWT = require('google-auth-library');

// const serviceAccountAuth = new JWT.JWT ({
//     email:credentials.client_email,
//     key:credentials.private_key,
//     scopes: [
//         'https://www.googleapis.com/auth/spreadsheets',
//     ]
// });

// // const docIdteste = "1J4IeLYGcgCAaPM7KHBCYjPO23tnLM9A5r5L3KNUtDWk"
// const docIdteste = "1FKDu53W5dQD99nvv6-b7ldGr-U7ZWXOo_rQDRirLcMk";
// const docTeste = new GoogleSpreadsheet.GoogleSpreadsheet(docIdteste, serviceAccountAuth);

// const loadSheetMes = async function (){
//     await docTeste.loadInfo();

//     const sheet = await docTeste.sheetsByIndex[0];
//     const rows = await sheet.getRows();

//     // let dados = []

//     const dados = rows.map(item => {

//         return {
//             Id: item.get('ID'),
//             Nome: item.get('Nome'),
//             Telefone: item.get('Telefone'),
//             Valor: item.get('Valor'),
//             Status: item.get('Status'),
//             Data: item.get('Data-vencimento'),
//             Parcela: item.get('N Parcela')
//         }

//     });

//     // let dia = dados[1].Data.split('/')[0]
//     // let mes = dados[1].Data.split('/')[1]
//     // let ano = dados[1].Data.split('/')[2]
//     // console.log(`O dia de vencimento desse cliente é: ${dia}, do mês ${mes}, do ano ${ano}`)
//     console.log(dados);

//     return dados;
// };

// const loadSheetFevereiro = async function (){

//     await docTeste.loadInfo()

//    const sheet = await docTeste.sheetsByIndex[1]
//    const rows = await sheet.getRows()

//    let dados = []

//    rows.map(item => {

//        dados.push({
//            'Nome': item.get('Nome'),
//            'Telefone': item.get('Telefone'),
//            'Valor': item.get('Valor'),
//            'Status': item.get('Status')
//        })

//    })

//    console.log(dados)

//    return dados
// }

console.log('Rodou')

// dadosClientes = {
//     loadSheetMes,
//     loadSheetFevereiro
// }
// module.exports = dadosClientes