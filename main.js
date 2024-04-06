const publicKey = 'YOUR_PUBLIC_KEY'
const serviceID = 'YOUR_PRIVATE_KEY'
const templateID = 'YOUR_TEMPLATE_KEY'

// const publicKey = '5Pl8Ooyv2M-mzt8Al'
// const serviceID = 'service_1g36cd7'
// const templateID = 'template_0q7rsnu'

const btn = document.querySelector('.connect-form__btn')

;(function () {
  emailjs.init({
    publicKey: publicKey,
  })
})()

const form = document.querySelector('.connect-form')
const tel = form.querySelector('input[type="tel"]')
const inputMask = new Inputmask('+38 (999) 999 99 99')
inputMask.mask(tel)

const validateForm = new JustValidate(document.querySelector('.connect-form'))

function sendMail() {
  const params = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    message: document.querySelector('#message').value,
  }

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      alert('mail sent' + res.status)
      document.querySelector('.connect-form').reset()
    })
    .catch((error) => {
      console.error('Error sending email:', error)
    })
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
        const phone = tel.inputmask.unmaskedvalue()
        return Boolean(Number(phone)) && phone.length === 10
      },
      errorMessage: 'введіть номер телефону',
    },
  ])
  .addField(document.querySelector('#message'), [
    {
      rule: 'minLength',
      value: 20,
      errorMessage: 'Це поле повинно бути заповнено',
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Це поле повинно бути заповнено',
    },
  ])

validateForm.onSuccess(function () {
  sendMail()
})
