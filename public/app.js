const form = document.querySelector("form");

const messageInput = document.getElementById("message");

const queryEl = document.getElementById("query");
const responseEl = document.getElementById("response");
const messageBtn = document.getElementById("message-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log(messageInput.value);
  const queryText = messageInput.value;
  messageInput.value = "";
  queryEl.innerHTML = queryText;
 

  messageBtn.disabled = true;
  messageBtn.innerHTML = "Pending...";

  try {
    const res = await fetch("/api/flowise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: queryText }),
    });

    const data = await res.json();
    responseEl.innerHTML = data.message;

  } catch (error) {

    queryEl.innerHTML = `Failed request: ${queryText}`;
    responseEl.innerHTML = error.message;

  } finally {
    messageBtn.disabled = false;
    messageBtn.innerHTML = "Send";
    //messageInput.value = "";
  }
});
