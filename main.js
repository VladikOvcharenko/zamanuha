const validateForm = new JustValidate(document.querySelector('.connect-form'))

const openModal = () => {
  const modal = document.getElementById('modal')
  modal.classList.add('active-modal')

  setTimeout(() => {
    modal.classList.remove('active-modal')
  }, 3000)
}

validateForm
  .addField(document.querySelector('#name'), [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'мінімум 3 символи',
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'введіть імʼя!',
    },
  ])
  .addField(document.querySelector('#email'), [
    {
      rule: 'email',
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'введіть ваш email!',
    },
    {
      rule: 'custom',
      validator: (value) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      },
      errorMessage: 'Email має неправильний формат',
    },
  ])
  .addField(document.querySelector('#phone'), [
    {
      rule: 'custom',
      validator: (value) => {
        const reg = /[A-Za-zА-Яа-яЁё]/g
        const phoneInput = document.querySelector('#phone')
        phoneInput.addEventListener('input', function () {
          this.value = this.value.replace(reg, '')
        })
        const phone = phoneInput.value
        const phoneLength = phone.replace(reg, '').length
        return phoneLength >= 10 && phoneLength <= 13
      },
      errorMessage: 'введіть номер телефону',
    },
  ])
  .addField(document.querySelector('#message'), [
    {
      rule: 'maxLength',
      value: 420,
      errorMessage: 'Це поле повинно бути заповнено',
    },
  ])

validateForm.onSuccess(function () {
  sendMail()
})
