document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.querySelector('.heading__scroll-down');

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: document.body.scrollHeight, // прокрутка до самого низа
      behavior: 'smooth'                // плавная анимация
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.fourth-object__icons');
  const btnLeft = document.querySelector('.fourth-object__arrowleft');
  const btnRight = document.querySelector('.fourth-object__arrowright');

  let items = Array.from(carousel.children);

  btnRight.addEventListener('click', () => {
    const first = items.shift();
    carousel.appendChild(first);
    items.push(first);
  });

  btnLeft.addEventListener('click', () => {
    const last = items.pop();
    carousel.insertBefore(last, items[0]);
    items.unshift(last);
  });

  // --- Drag & Touch ---
  let isDragging = false;
  let startX = 0;

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    carousel.classList.add('dragging');
  });

  carousel.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    const diff = e.pageX - startX;
    if(diff > 50) { // если тянем вправо
      const last = items.pop();
      carousel.insertBefore(last, items[0]);
      items.unshift(last);
      startX = e.pageX;
    } else if(diff < -50) { // если тянем влево
      const first = items.shift();
      carousel.appendChild(first);
      items.push(first);
      startX = e.pageX;
    }
  });

  carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.classList.remove('dragging');
  });

  // Touch для мобильных устройств
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
  });

  carousel.addEventListener('touchmove', (e) => {
    const diff = e.touches[0].pageX - startX;
    if(diff > 50) { 
      const last = items.pop();
      carousel.insertBefore(last, items[0]);
      items.unshift(last);
      startX = e.touches[0].pageX;
    } else if(diff < -50) { 
      const first = items.shift();
      carousel.appendChild(first);
      items.push(first);
      startX = e.touches[0].pageX;
    }
  });
});
