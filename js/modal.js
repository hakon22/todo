const modalBackground = document.querySelector('.modalBackground');
const modalClose = document.querySelector('.modalClose');
const modalWindow = document.querySelector('.modalWindow');
const scrollBar = window.innerWidth - document.body.clientWidth;

export const closeModal = () => {
  modalBackground.style.display = 'none';
  modalBackground.parentElement.style.overflow = '';
  modalBackground.parentElement.style.marginRight = '';
};

[modalClose, modalBackground].forEach((modal) => {
  modal.addEventListener('click', ({ target }) => {
    if (target === modalBackground || target === modalClose) {
      closeModal();
      if (modalWindow.firstElementChild.style.display === 'none') {
        modalBackground.firstElementChild.style.overflow = '';
        modalWindow.firstElementChild.style.display = '';
        modalWindow.lastElementChild.style.display = 'none';
      }
    }
  });
});

export const openModal = () => {
  modalBackground.style.display = 'block';
  modalBackground.parentElement.style.overflow = 'hidden';

  if (window.screen.width > 768) {
    modalBackground.parentElement.style.marginRight = `${scrollBar}px`;
  }
};
