function doGet(e) {
  if (!e.parameters.arg1) {
    return HtmlService.createHtmlOutputFromFile("index");
  } else {
    var email = e.parameters.arg1;
    var token = e.parameters.arg2;

    var SS = SpreadsheetApp.openById(
      "1vt04glByJ6-aPqZEnLg1Vi-X9g3c1BruqZzkAneYuzY"
    );
    var usuarios = SS.getSheetByName("usuários");
    var qts_usuarios = usuarios.getLastRow() + 1;

    for (var i = 1; i < qts_usuarios; i++) {
      if (usuarios.getRange(i, 3).getValue() == email) {
        if (usuarios.getRange(i, 5).getValue() == token) {
          usuarios.getRange(i, 4).setValue("Validado");
          return HtmlService.createHtmlOutput("<div>Usuário Confirmado!</div>");
        }
      }
    }
    return HtmlService.createHtmlOutput("<div>Passou Reto</div>");
  }
}
