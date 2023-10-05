var SS = SpreadsheetApp.openById(
  "1vt04glByJ6-aPqZEnLg1Vi-X9g3c1BruqZzkAneYuzY"
);
var main = SS.getSheetByName("main");

function doPost(e) {
  if (e.parameters.qualFuncao == "entradaDeFuncionario") {
    if (fazLogin(e)) {
      return ContentService.createTextOutput(
        JSON.stringify(entradaDeFuncionario(e))
      );
    }
  } else if (e.parameters.qualFuncao == "lerFuncionarios") {
    if (fazLogin(e)) {
      return ContentService.createTextOutput(
        JSON.stringify(lerFuncionarios(e))
      );
    }
  } else if (e.parameters.qualFuncao == "removerFuncionario") {
    if (fazLogin(e)) {
      removerFuncionario(e);
    }
  } else if (e.parameters.qualFuncao == "fazLogin") {
    return ContentService.createTextOutput(JSON.stringify(fazLogin(e)));
  } else if (e.parameters.qualFuncao == "alterarSenha") {
    if (fazLogin(e)) {
      return ContentService.createTextOutput(JSON.stringify(alterarSenha(e)));
    }
  } else if (e.parameters.qualFuncao == "confirmacao_email") {
    confirmacao_email(e);
  }
}

function gerador_do_token() {
  var opt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var token = "";

  for (var i = 0; i < 40; i++) {
    var indice_randon = Math.floor(Math.random() * opt.length);
    token += opt.charAt(indice_randon);
  }
  return token;
}

function confirmacao_email(e) {
  var novo_usuario = e.parameters.novo_usuario;
  var novo_email = e.parameters.novo_email;
  var nova_senha = e.parameters.nova_senha;

  var minhaURLatual =
    "https://script.google.com/macros/s/AKfycbySC9Aj-kY-YmCKjB3k3WbOIYir-eMP-b3DjPobLy6mQsT4jqz-iAd4s2eNwaMunapd_Q/exec";
  var token = gerador_do_token();

  var string_de_confirmacao =
    minhaURLatual + "?" + "arg1=" + novo_email + "&arg2=" + token;

  var minha_mensagem_HTML =
    "Clique neo Link Caso você tenha solicitado um Usuário.: <br><br> <a href='" +
    string_de_confirmacao +
    "'> LINK </a> ";

  var envia_email = GmailApp.sendEmail(
    novo_email,
    "Confirmação de Cadastro",
    "",
    { htmlBody: minha_mensagem_HTML }
  );

  var SS = SpreadsheetApp.openById(
    "1vt04glByJ6-aPqZEnLg1Vi-X9g3c1BruqZzkAneYuzY"
  );
  var usuarios = SS.getSheetByName("usuários");
  var qts_usuarios = usuarios.getLastRow() + 1;

  usuarios.getRange(qts_usuarios, 1).setValue(novo_usuario);
  usuarios.getRange(qts_usuarios, 2).setValue(nova_senha);
  usuarios.getRange(qts_usuarios, 3).setValue(novo_email);
  usuarios.getRange(qts_usuarios, 4).setValue("Não Confirmado");
  usuarios.getRange(qts_usuarios, 5).setValue(token);
}

function alterarSenha(e) {
  var usuarios = SS.getSheetByName("usuários");
  var qtdeFuncionario = usuarios.getLastRow() + 1;

  var usuario = e.parameters.userName;
  var senha_antiga = e.parameters.senhaAntiga;
  var senha_nova = e.parameters.senhaNova;

  for (var i = 1; i < qtdeFuncionario; i++) {
    if (usuarios.getRange(i, 1).getValue() == usuario) {
      if (usuarios.getRange(i, 2).getValue() == senha_antiga) {
        usuarios.getRange(i, 2).setValue(senha_nova);
        return "Senha Alterada!";
      }
    }
  }
  return "Nada Foi Alterado!";
}

function lerFuncionarios(e) {
  var ultimaLinha = main.getLastRow();
  var ultimaColuna = main.getLastColumn();
  var todaTabela = main.getRange(1, 1, ultimaLinha, ultimaColuna).getValues();
  //console.log(todaTabela);
  return todaTabela;
}

function entradaDeFuncionario(e) {
  var colunaId = main.getRange("A:A").getValues();
  var id = "";

  if (id == "") {
    id = Math.max.apply(null, colunaId) + 1;
  }

  try {
    // ADICIONAR FUNCIONÁRIO
    if (e.parameters.idDoFuncionario == "") {
      var ultimaLinha = main.getLastRow() + 1;
      main.getRange(ultimaLinha, 1).setValue(id);
      main.getRange(ultimaLinha, 2).setValue(e.parameters.nomeDoFuncionario);
      main.getRange(ultimaLinha, 3).setValue(e.parameters.cargoDoFuncionario);
      main.getRange(ultimaLinha, 4).setValue(e.parameters.salarioDoFuncionario);
      return "Funcionário Adicionado Com Sucesso!";
    } else {
      // ALTERAR FUNCIONÁRIO
      var ultimaLinha = main.getLastRow() + 1;
      for (var i = 1; i < ultimaLinha; i++) {
        if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
          main.getRange(i, 1).setValue(e.parameters.idDoFuncionario);
          main.getRange(i, 2).setValue(e.parameters.nomeDoFuncionario);
          main.getRange(i, 3).setValue(e.parameters.cargoDoFuncionario);
          main.getRange(i, 4).setValue(e.parameters.salarioDoFuncionario);
          return "Funcionário Alterado Com Sucesso!";
        }
      }
    }
  } catch {
    return "Houve Algum Problema!";
  }
}

function removerFuncionario(e) {
  var ultimaLinha = main.getLastRow() + 2;
  for (var i = 1; i < ultimaLinha; i++) {
    if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
      main.deleteRow(i);
      break;
    }
  }
}

function fazLogin(e) {
  var abaUsuario = SS.getSheetByName("usuários");
  var ultimaLinha = abaUsuario.getLastRow() + 1;
  var usuarioAutenticado = false;

  var userName = e.parameters.userName;
  var password = e.parameters.password;

  for (var i = 1; i < ultimaLinha; i++) {
    if (
      abaUsuario.getRange(i, 1).getValue() == userName &&
      abaUsuario.getRange(i, 2).getValue() == password
    ) {
      usuarioAutenticado = true;
    }
  }
  console.log(usuarioAutenticado);
  return usuarioAutenticado;
}
