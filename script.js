// Tela de carregamento
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  
  // Simula carregamento por 2.5 segundos
  setTimeout(() => {
    loader.classList.add('fade-out');
    
    // Remove o loader do DOM após a animação
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 2500);
});

// Scroll reveal simples
const onScroll = () => {
  const els = document.querySelectorAll('.reveal');
  const vh = window.innerHeight;
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.9) el.classList.add('visible');
  });
};
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// Copiar e-mail
const email = 'clubfc.contato@gmail.com';
const copy = (id) => {
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const prev = btn.textContent;
    btn.textContent = 'Copiado!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = prev; btn.classList.remove('copied'); }, 1400);
  });
};
document.getElementById('copy-email')?.addEventListener('click', () => copy('copy-email'));
document.getElementById('copy-email-2')?.addEventListener('click', () => copy('copy-email-2'));
