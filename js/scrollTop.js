export default () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

export const onScroll = (uppenButton) => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    uppenButton.style.display = 'block';
  } else {
    uppenButton.style.display = 'none';
  }
};
