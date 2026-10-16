const requestForm = document.querySelector('.elite-promo__form');
const nameField = requestForm.querySelector('[name="name"]');
const phoneField = requestForm.querySelector('[name="phone"]');
const agreement = requestForm.querySelector('#agree');
const agreementError = requestForm.querySelector('#request-agree-error');
const requestStatus = requestForm.querySelector('.request-status');
let attempted = false;

function validateField(field) {
  let message = '';
  if (field === nameField && !field.value.trim()) {
    message = 'Введите ваше имя';
  }
  if (field === phoneField) {
    const value = field.value.trim();
    const digits = value.replace(/\D/g, '');
    // Demo form accepts Russian numbers starting with +7, 7 or 8.
    if (!value) message = 'Введите ваш телефон';
    else if (!/^[+\d\s()-]+$/.test(value) || !/^[78]\d{10}$/.test(digits)) {
      message = 'Введите 11 цифр телефона, начиная с +7 или 8';
    }
  }
  field.closest('.custom-input').classList.toggle('custom-input--error', Boolean(message));
  field.setAttribute('aria-invalid', String(Boolean(message)));
  document.getElementById(field.getAttribute('aria-describedby')).textContent = message;
  return !message;
}

function validateAgreement() {
  agreementError.hidden = agreement.checked;
  agreement.setAttribute('aria-invalid', String(!agreement.checked));
  return agreement.checked;
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  attempted = true;
  requestStatus.textContent = '';
  const validName = validateField(nameField);
  const validPhone = validateField(phoneField);
  const validAgreement = validateAgreement();
  if (!validName || !validPhone || !validAgreement) {
    const firstInvalid = !validName ? nameField : !validPhone ? phoneField : agreement;
    firstInvalid.focus();
    return;
  }
  requestStatus.textContent = 'Проверка пройдена! Это демонстрационная форма: заявка не отправлена, данные никуда не передаются.';
});

[nameField, phoneField].forEach((field) => {
  field.addEventListener('input', () => {
    requestStatus.textContent = '';
    if (attempted) validateField(field);
  });
});
agreement.addEventListener('change', () => {
  requestStatus.textContent = '';
  if (attempted) validateAgreement();
});
