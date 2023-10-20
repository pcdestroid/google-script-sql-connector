function start() {
  let tabela = SQL("SELECT * FROM Cliente");
  Logger.log(tabela);
}

function SQL(sqlQuery) {
  try {
    // Verifica se a consulta é um SELECT
    if (sqlQuery.trim().toLowerCase().startsWith('select')) {
      // Encontra o nome da aba após o "FROM"
      var fromIndex = sqlQuery.indexOf('FROM');
      if (fromIndex !== -1) {
        var abaNome = sqlQuery.slice(fromIndex + 4).trim();
        var planilha = SpreadsheetApp.getActiveSpreadsheet();
        var aba = planilha.getSheetByName(abaNome);

        if (!aba) {
          return "A aba '" + abaNome + "' não foi encontrada.";
        }

        var dados = aba.getDataRange().getValues();
        var header = dados[0];
        var result = [];

        for (var i = 1; i < dados.length; i++) {
          var row = {};
          for (var j = 0; j < header.length; j++) {
            row[header[j]] = dados[i][j];
          }
          result.push(row);
        }

        return result;
      } else {
        return "Erro: SQL mal formado. Deve conter 'FROM' seguido pelo nome da aba.";
      }
    } else {
      return "Apenas comandos SELECT são suportados.";
    }
  } catch (e) {
    return "Erro: " + e;
  }
}
