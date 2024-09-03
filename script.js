document.getElementById('sendWhatsAppButton').addEventListener('click', function() {
  const clientName = capitalizeFirstLetter(document.getElementById('clientName').value);
  const device = capitalizeFirstLetter(document.getElementById('device').value);
  const phoneNumber = document.getElementById('phoneNumber').value.trim();

  // Mensagem para o cliente
  const message = `
Olá, ${clientName},

Esperamos que você esteja bem!

Estamos entrando em contato para informar que o seu ${device} está *pronto* para retirada.

A sua garantia de 90 dias para o serviço realizado começará a contar 48 horas após esta notificação. Se precisar de mais alguma coisa ou tiver alguma dúvida, por favor, entre em contato.

Nosso horário de funcionamento é: 09:00 ao 12:00 e das 14:00 às 17:00 de segunda a sexta.

Agradecemos sua compreensão.
`.trim();

  // Adicionar o DDD 51 e o prefixo internacional
  const phone = phoneNumber.replace(/\D/g, '');
  const whatsappNumber = `55${phone}`;

  if (phone.length >= 10 && phone.length <= 11) {
      // Detectar dispositivo e definir URL correta
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const whatsappURL = isMobile
          ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`
          : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

      window.open(whatsappURL);

      // Mostrar modal
      $('#confirmationModal').modal('show');

      // Limpar o formulário após o envio
      document.getElementById('notificationForm').reset();
  } else {
      alert('Por favor, insira um número de telefone válido com DDD.');
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.querySelectorAll('.capitalize').forEach(function(input) {
  input.addEventListener('input', function(event) {
      let words = input.value.split(' ');
      words = words.map(word => capitalizeFirstLetter(word));
      input.value = words.join(' ');
  });
});
