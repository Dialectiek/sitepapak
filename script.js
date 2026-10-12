// Change this to the address that should receive the messages
const EMAIL = "7406de536410d0c5ed1eff0825064b93";

const form = document.getElementById("form");
const box = document.getElementById("thoughts");

// Press Enter to send (Shift+Enter makes a new line)
box.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = box.value.trim();
  if (!message) return;

  box.disabled = true;

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        message: message,
        _subject: "Someone sent you a thought",
      }),
    });
    const data = await res.json();
    if (!res.ok || String(data.success) !== "true") throw new Error(data.message);

    box.value = "";
    showHint("sent, thanks!");
  } catch (err) {
    showHint("something went wrong, try again");
  } finally {
    box.disabled = false;
    box.focus();
  }
});

function showHint(text) {
  box.placeholder = text;
  setTimeout(() => (box.placeholder = ""), 3000);
}