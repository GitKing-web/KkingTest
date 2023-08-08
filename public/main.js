const loginbtn = document.querySelector("#loginbtn");
const phone_numberVal = document.querySelector("#phone_number");
const passwordVal = document.querySelector("#password");

loginbtn.addEventListener("click", (e) => {
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
