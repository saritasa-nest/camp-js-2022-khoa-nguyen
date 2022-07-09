const inputEmail = document.querySelector('input[type=email]') as HTMLInputElement ;
const inputPassword = document.querySelector('input[type=password]') as HTMLInputElement;
const form = document.querySelector('.form__container');

if (form) {
  form.addEventListener('submit', () => {
    console.log(inputEmail?.value);
    console.log(inputPassword?.value);
  });
}
