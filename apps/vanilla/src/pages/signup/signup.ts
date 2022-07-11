const inputEmail = document.querySelector('input[data-type=email]') as HTMLInputElement ;
const inputPassword = document.querySelector('input[data-type=password]') as HTMLInputElement;
const inputConfirmPassword = document.querySelector('input[data-type=confirmPassword]') as HTMLInputElement;
const inputFirstName = document.querySelector('input[data-type=firstname]') as HTMLInputElement;
const inputLastName = document.querySelector('input[data-type=lastname]') as HTMLInputElement;

const form = document.querySelector('.form__container');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(inputEmail?.value);
    console.log(inputPassword?.value);
    console.log(inputFirstName?.value);
    console.log(inputLastName?.value);
    console.log(inputConfirmPassword?.value);
  });
}
