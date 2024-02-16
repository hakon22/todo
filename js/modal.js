const modalBackground = document.querySelector('.modalBackground');
const modalClose = document.querySelector('.modalClose');

export const closeModal = () => {
  modalBackground.style.display = 'none';
  modalBackground.parentElement.style.overflow = '';
  modalBackground.parentElement.style.marginRight = '';
};

// вешаем обработчики на закрытие модального окна (на фон и крестик)
[modalClose, modalBackground].forEach((modal) => {
  modal.addEventListener('click', ({ target }) => {
    if (target === modalBackground || target === modalClose) {
      closeModal();
    }
  });
});

export const openModal = () => {
  const scrollBar = window.innerWidth - document.body.clientWidth;

  modalBackground.style.display = 'block';
  modalBackground.parentElement.style.overflow = 'hidden';

  // делаем так, что бы окно не прыгало при наличии прокрутки
  if (window.screen.width > 767) {
    modalBackground.parentElement.style.marginRight = `${scrollBar}px`;
  }
};
