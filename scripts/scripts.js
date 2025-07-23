// scripts.js



//função para alternar entre os formulários de login e registo
function toggleForms() {

    //obtém os elementos dos formulários de login e registo usando seus IDs
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  
  // Verifica o estado atual dos formulários e alterna entre eles
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';  // Exibe o formulário de login
    registerForm.style.display = 'none';  // Oculta o formulário de registro
  } else {
    loginForm.style.display = 'none';  // Oculta o formulário de login
    registerForm.style.display = 'block';  // Exibe o formulário de registro
  }
}



//função para trocar o ícone de coração ao clicar nos favoritos (coração vazio para coração preenchido)
document.getElementById('heart-icon').addEventListener('click', function() {
  var icon = this;
  if (icon.classList.contains('bi-heart')) {
    icon.classList.remove('bi-heart');
    icon.classList.add('bi-heart-fill');
  } else {
    icon.classList.remove('bi-heart-fill');
    icon.classList.add('bi-heart');
  }
});



//função para dar rating (estrelas clicáveis) a um determinado curso listado.
const stars = document.querySelectorAll('.star-rating i');
const ratingText = document.getElementById('rating-text');
let currentRating = 0;
let isHalf = false;
let hoverRating = 0; // Variável nova para guardar a pré-visualização

// Pré-visualização ao passar o mouse
stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        hoverRating = parseInt(star.getAttribute('data-value'));
        updateStars(hoverRating, false); // false = só pré-visualização
    });

    // Volta ao valor real quando o mouse sai
    star.addEventListener('mouseout', () => {
        updateStars(currentRating, isHalf);
    });

    // Clique para definir
    star.addEventListener('click', () => {
        const clickedValue = parseInt(star.getAttribute('data-value'));
        
        if (currentRating === clickedValue) {
            isHalf = !isHalf; // Alterna entre cheia/meia
        } else {
            isHalf = false;
        }
        
        currentRating = clickedValue;
        updateStars(currentRating, isHalf);
    });
});



//função para atualizar as estrelas
function updateStars(rating, half) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        
        star.className = 'bi';
        
        if (starValue < rating) {
            star.classList.add('bi-star-fill');
        } else if (starValue === rating && half) {
            star.classList.add('bi-star-half');
        } else if (starValue === rating) {
            star.classList.add('bi-star-fill');
        } else {
            star.classList.add('bi-star');
        }
    });
    
    // Atualiza texto (mostra valor real, não a pré-visualização)
    const displayRating = half ? rating - 0.5 : rating;
    ratingText.textContent = `${currentRating === 0 ? 0 : displayRating}/5`;
}



//função para abrir o modal de vídeo
document.querySelectorAll('.ver-video').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault(); // Impede comportamento padrão do link

    // Obtém os atributos do botão clicado
    const videoTitle = this.getAttribute('data-title'); // Título dinâmico
    const videoId = "dzrNLxvEuP4"; // ID fixo do vídeo

    // Atualiza o título no modal
    document.getElementById('videoModalTitle').textContent = videoTitle;

    // Atualiza o iframe com o vídeo correspondente
    document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Abre o modal
    new bootstrap.Modal(document.getElementById('videoModal')).show();
  });
});

document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
  document.getElementById('videoFrame').src = ''; // Remove src ao fechar
});






