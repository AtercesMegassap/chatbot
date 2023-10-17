// Variáveis para controlar o fluxo de perguntas e respostas
const perguntas = [
  { pergunta: "Olá! Qual é o seu nome?", aceitaNumeros: false },
  { pergunta: "Qual é a sua idade?", aceitaNumeros: true },
  { pergunta: "Qual é a sua cidade?", aceitaNumeros: false }
];
let perguntaAtual = 0;
const respostas = [];

function sendMessage() {
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value.trim();

  if (userMessage === "") return;

  // Verifique se o input deve aceitar apenas números
  if (perguntas[perguntaAtual].aceitaNumeros && !/^\d+$/.test(userMessage)) {
      alert("Por favor, digite apenas números para esta pergunta.");
      userInput.value = "";
      userInput.focus();
      return;
  }

  const chatContainer = document.querySelector(".chat-container");

  // Crie um novo elemento de mensagem enviada
  const sentMessage = document.createElement("div");
  sentMessage.classList.add("enviado");

  const messageSent = document.createElement("div");
  messageSent.classList.add("message", "sent");
  messageSent.textContent = userMessage;

  const avatarSent = document.createElement("img");
  avatarSent.src = "resurces/profile.png";
  avatarSent.classList.add("avatar");
  avatarSent.alt = "Avatar Enviado";

  sentMessage.appendChild(messageSent);
  sentMessage.appendChild(avatarSent);

  chatContainer.appendChild(sentMessage);

  // Armazene a resposta do usuário
  respostas.push(userMessage);

  userInput.value = "";
  userInput.focus();

  // Verifique se todas as perguntas foram feitas
  if (perguntaAtual < perguntas.length - 1) {
      // Ainda há perguntas a serem feitas, avance para a próxima pergunta
      perguntaAtual++;

      // Simule uma resposta do chatbot com a próxima pergunta
      setTimeout(function() {
          const receivedMessage = document.createElement("div");
          receivedMessage.classList.add("recebido");

          const avatarReceived = document.createElement("img");
          avatarReceived.src = "resurces/homem.png";
          avatarReceived.classList.add("avatar");
          avatarReceived.alt = "Avatar Recebido";

          const messageReceived = document.createElement("div");
          messageReceived.classList.add("message", "received");
          messageReceived.textContent = perguntas[perguntaAtual].pergunta;

          receivedMessage.appendChild(avatarReceived);
          receivedMessage.appendChild(messageReceived);

          chatContainer.appendChild(receivedMessage);

          chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 1000); // Simule uma resposta após 1 segundo (1000 milissegundos)
  } else {
      // Todas as perguntas foram feitas, encerre a conversa ou processe as respostas aqui
      setTimeout(function() {
          const receivedMessage = document.createElement("div");
          receivedMessage.classList.add("recebido");

          const avatarReceived = document.createElement("img");
          avatarReceived.src = "resurces/homem.png";
          avatarReceived.classList.add("avatar");
          avatarReceived.alt = "Avatar Recebido";

          const messageReceived = document.createElement("div");
          messageReceived.classList.add("message", "received");
          messageReceived.textContent = "Aguarde alguns segundos estamos te redirecionando para o whatasapp...";

          receivedMessage.appendChild(avatarReceived);
          receivedMessage.appendChild(messageReceived);

          chatContainer.appendChild(receivedMessage);

          chatContainer.scrollTop = chatContainer.scrollHeight;

                    // Aqui você pode fazer algo com as respostas do usuário
          var textMessage = `Meu nome é ${respostas[0]}
Tenho ${respostas[1]} anos
Sou de ${respostas[2]}`

          setTimeout(() => redirectMessage(textMessage), 5000);
      }, 1000); // Simule uma resposta final após 1 segundo (1000 milissegundos)
  }
}


function redirectMessage(userMessage) {
  // Número de telefone para o qual você deseja enviar a mensagem (substitua pelo número desejado)
  const numeroWhatsApp = "14998654122";

  // Codifique a mensagem para que seja uma URL válida
  const mensagemCodificada = encodeURIComponent(userMessage);

  // Crie o link para iniciar a conversa no WhatsApp com a mensagem
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`;

  // Redirecione para o link do WhatsApp
  window.location.href = linkWhatsApp;
}
