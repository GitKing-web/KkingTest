const loginbtn = document.querySelector("#loginbtn");
const phone_numberVal = document.querySelector("#phone_number");
const passwordVal = document.querySelector("#password");

// REGISTER
const regPhoneNumber = document.querySelector('#regPhone');
const regPassword = document.querySelector('#regPass');
const regCpassword = document.querySelector('#regCpass');
const regBtn = document.querySelector('#regBtn');

const HandleReg = async () => {
  await fetch('/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
        phone: regPhoneNumber.value,
        password: regPassword.value
      })
  })
  .then(res => res.json())
  .then(data => {
    if(data){
      localStorage.setItem("kkring", JSON.stringify(data))
    }
  })
.catch(error => console.log(error))
}
regBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  if(!regPhoneNumber || !regPassword) return;
  if(regPassword.value !== regCpassword.value){
    console.log('passwords did not match');
    return;
  }
  HandleReg();

})

loginbtn?.addEventListener("click", (e) => {
  e.preventDefault();

  if (!phone_numberVal.value || !passwordVal.value) return;
  const values = {
    phone: phone_numberVal.value,
    password: passwordVal.value,
  };
  sendToBack(values);
});

async function sendToBack(val) {
  await fetch("/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(val),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        window.localStorage.setItem("user", JSON.stringify(data));
        location.replace("/");
      }
    })
    .catch((error) => console.error(error));
}
