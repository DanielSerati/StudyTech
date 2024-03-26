// Função para mostrar as informações da matrícula em uma caixa de diálogo flutuante
function showMatriculationInfo() {
    var pricingDiv = document.getElementById("pricing");
    var matriculationButton = document.getElementById("matriculation-button");

    // Cria uma nova div para a caixa de diálogo flutuante
    var dialogBox = document.createElement("div");
    dialogBox.className = "dialog-box";
    dialogBox.innerHTML = "<h2>Básico</h2>" +
                          "<p>De R$ 1.800 por 12x R$109 à vista R$1.308</p>" +
                          "<p>Acesso a TODOS os cursos da StudyTech</p>" +
                          "<p>StudyTech Challenges</p>" +
                          "<p>Certificado</p>" +
                          "<a href='formulario.html' class='enroll-button'>Matricular-se</a>" +
                          "<button onclick='closeDialog()'>Fechar</button>";

    // Insere a caixa de diálogo flutuante no documento
    document.body.appendChild(dialogBox);

    // Desabilita o botão "Matricular-se" enquanto a caixa de diálogo estiver aberta
    matriculationButton.disabled = true;
}

// Função para fechar a caixa de diálogo flutuante
function closeDialog() {
    var dialogBox = document.querySelector(".dialog-box");
    var matriculationButton = document.getElementById("matriculation-button");

    // Remove a caixa de diálogo do documento
    dialogBox.parentNode.removeChild(dialogBox);

    // Habilita novamente o botão "Matricular-se"
    matriculationButton.disabled = false;
}

// Adiciona evento de clique ao botão "Matricular-se"
var matriculationButton = document.getElementById("matriculation-button");
matriculationButton.addEventListener("click", showMatriculationInfo);