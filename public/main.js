const loginbtn = document.querySelector("#loginbtn");
const phone_numberVal = document.querySelector("#phone_number");
const passwordVal = document.querySelector("#password");

const loading = document.querySelector("#loading");
const message = document.querySelector("#message");
const errorMsg = document.querySelector("#error");
const errorMsgBg = document.querySelector("#error-color");
const confirmBtn = document.querySelector("#confirm-btn");
const messageBtn = document.querySelector("#btn-message");

// REGISTER
const regPhoneNumber = document.querySelector("#regPhone");
const regPassword = document.querySelector("#regPass");
const regCpassword = document.querySelector("#regCpass");
const regBtn = document.querySelector("#regBtn");

const HandleReg = async () => {
  loading.style.display = "block";

  await fetch("/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      phone: regPhoneNumber.value,
      password: regPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 201) {
        loading.style.display = "none";
        errorMsg.style.display = "block";
        errorMsgBg.style.display = "block";
        messageBtn.innerHTML = "Ok";
        message.innerHTML = data.message;
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        loading.style.display = "none";
        errorMsg.style.display = "block";
        errorMsgBg.style.display = "block";
        messageBtn.innerHTML = "Ok";
        message.innerHTML = data.message;
      }
    })
    .catch((error) => console.log(error));
};
regBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (!regPhoneNumber || !regPassword) return;
  if (regPassword.value !== regCpassword.value) {
    console.log("passwords did not match");
    return;
  }
  HandleReg();
});

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
  loading.style.display = "block";

  await fetch("/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(val),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.user) {
        loading.style.display = "none";
        console.log(data);
        window.localStorage.setItem("user", JSON.stringify(data));
        location.replace("/home");
      }
      if (data.message) {
        loading.style.display = "none";
        errorMsg.style.display = "block";
        errorMsgBg.style.display = "block";
        messageBtn.innerHTML = "Ok";
        message.innerHTML = data.message;
      }
    })
    .catch((error) => {
      loading.style.display = "none";

      console.error(error);
    });
  loading.style.display = "none";
}

confirmBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  errorMsg.style.display = "none";
  errorMsgBg.style.display = "none";
});
