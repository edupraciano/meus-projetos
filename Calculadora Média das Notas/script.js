function calcularMedia() {
  let inputNome = document.querySelector("#cxNome");
  let nome = inputNome.value;

  let inputN1 = document.getElementById("nota1");
  let inputN2 = document.getElementById("nota2");
  // Solicita a entrada de números para o cálculo da média.
  if (inputN1.value.trim() === "" || inputN2.value.trim() === "") {
    alert(`Por favor, preencha todas as notas do aluno(a) ${nome}`);
    return; // Retorna sem calcular a média se as notas não foram preenchidas

    // Informa que os números Precisam ser entre 1 e 10.
  } else if (inputN1.value.trim() < 0 || inputN2.value.trim() < 0) {
    alert(
      `Por favor, preencha as notas do aluno(a) ${nome} Com Números entre 0 e 10.`
    );
    return; // Retorna sem calcular a média se as notas não foram preenchidas
  }

  let nota1 = Number(inputN1.value);
  let nota2 = Number(inputN2.value);

  let media = Number((nota1 + nota2) / 2);

  let situacao = "";
  let situacaoClasse = "";

  if (media < 3) {
    situacao = "FOI REPROVADO";
    situacaoClasse = "reprovado";
  } else if (media >= 3 && media < 6) {
    situacao = "EM RECUPERAÇÃO";
    situacaoClasse = "em-recuperacao";
  } else {
    situacao = "FOI APROVADO";
    situacaoClasse = "aprovado";
  }

  let inputMedia = document.querySelector("#cxMedia");
  inputMedia.value = media.toFixed(2);

  let inputSituacao = document.querySelector("#cxSituacao");
  inputSituacao.value = situacao;
  inputSituacao.className = situacaoClasse;

  let msg = document.getElementById("msg");
  msg.innerHTML = ` O Aluno(a) ${nome} teve  <br> uma média final de ${media.toFixed(
    2
  )}. <br> ${situacao}. `;

  document.querySelector("#resultado").style.display = "block";
}

function limparForm() {
  let inputNome = document.querySelector("#cxNome");
  let inputN1 = document.getElementById("nota1");
  let inputN2 = document.getElementById("nota2");

  document.querySelector("#cxNome").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";

  document.querySelector("#resultado").style.display = "none";
}
