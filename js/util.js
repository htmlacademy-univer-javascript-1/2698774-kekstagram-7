const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.classList.add('data-error');
  alertContainerElement.style.zIndex = '100';
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = '0';
  alertContainerElement.style.top = '0';
  alertContainerElement.style.right = '0';
  alertContainerElement.style.padding = '10px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';

  alertContainerElement.textContent = message;

  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  showAlert,
  debounce
};
