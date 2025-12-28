/* ================= GLOBAL SETTINGS ================= */
let typingSpeed = 5;   // controls bot typing speed (ms per character)

/* ===================== SAFETY KEYWORDS ===================== */

// Emergency keywords
const emergencyKeywords = [
    "chest pain", "heart attack", "can't breathe", "cannot breathe",
    "severe bleeding", "stroke", "unconscious", "seizure", "fainted"
];

// Mental health keywords
const mentalHealthKeywords = [
    "suicide", "kill myself", "self harm",
    "end my life", "hopeless", "depressed"
];

/* ===================== UTILITY FUNCTIONS ===================== */

// Keyword checker
function containsKeyword(message, keywords) {
    return keywords.some(word =>
        message.toLowerCase().includes(word)
    );
}

// Append message to chat
function appendMessage(text, sender, extraClass = "") {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.className = `message ${sender} ${extraClass}`;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ===================== EMERGENCY MESSAGE ===================== */

function appendEmergencyMessage() {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.className = "message bot emergency";

    msg.innerHTML = `
🚨 MEDICAL EMERGENCY DETECTED

🇮🇳 Call immediately:

<div class="emergency-buttons">
    <a href="tel:108">🚑 Ambulance (108)</a>
    <a href="tel:112">🚓 Emergency (112)</a>
    <a href="tel:18005990019">🧠 KIRAN Mental Health</a>
</div>
    `;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ===================== TYPING ANIMATION ===================== */

function typeBotMessage(text) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot";
    chatBox.appendChild(messageDiv);

    let i = 0;
    const interval = setInterval(() => {
        messageDiv.textContent += text.charAt(i);
        i++;
        chatBox.scrollTop = chatBox.scrollHeight;

        if (i === text.length) {
            clearInterval(interval);
        }
    }, typingSpeed);
}
function showTyping() {
    const chatBox = document.getElementById("chatBox");
    const typing = document.createElement("div");
    typing.className = "message bot typing";
    typing.id = "typing";
    typing.innerText = "AI is typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}
function removeTypingIndicator() {
    const typingIndicator = document.querySelector(".message.bot.typing");
    if (typingIndicator) typingIndicator.remove();
}

/* ===================== MAIN CHAT FUNCTION ===================== */

function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();

    if (userText === "") return;

    appendMessage(userText, "user");
    input.value = "";

    // Show typing briefly (professional feel)
    showTyping();

    // INSTANT response (no lag)
    hideTyping();
    const reply = getHealthResponse(userText);
    appendMessage(reply, "bot");
}
async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    appendMessage(message, "user");
    input.value = "";

    /* 🚨 Emergency Filter */
    if (containsKeyword(message, emergencyKeywords)) {
        appendEmergencyMessage();
        return;
    }

    /* 🧠 Mental Health Filter */
    if (containsKeyword(message, mentalHealthKeywords)) {
        appendMessage(
`🧠 I’m really sorry you’re feeling this way.
Help is available in India:

📞 KIRAN Mental Health Helpline: 1800-599-0019
🚨 Emergency: 112

Please talk to a trusted person or seek professional help.`,
        "bot",
        "emergency"
        );
        return;
    }

    /* 🤖 Normal Safe Response */
    showTyping();

    appendMessage("⌨️ Bot is typing...", "bot typing");

setTimeout(() => {
    removeTypingIndicator();
    typeBotMessage(reply);
}, 400);

}

/* ===================== ENTER KEY SUPPORT ===================== */

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("userInput");

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
});

/* ===================== HEALTH RESPONSE LOGIC ===================== */
function getHealthResponse(message) {
    message = message.toLowerCase();

    if (message.includes("fever")) {
        return "Fever is commonly caused by infection. Stay hydrated and rest. If fever persists for more than 2 days or is very high, consult a doctor.";
    }

    if (message.includes("headache")) {
        return "Headaches can result from stress, dehydration, or lack of sleep. Rest and proper hydration may help. Seek medical advice if headaches are severe or frequent.";
    }

    if (message.includes("cold") || message.includes("cough")) {
        return "Common cold and cough usually resolve on their own. Warm fluids and rest may help. Consult a healthcare professional if symptoms worsen.";
    }

    return "I can provide general health information, but I am not a substitute for a medical professional. Please consult a doctor for accurate diagnosis and treatment.";
}

// ================= VOICE INPUT =================

document.addEventListener("DOMContentLoaded", function () {
    const micBtn = document.getElementById("micBtn");
    const inputField = document.getElementById("userInput");

    if (!micBtn || !inputField) return;

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice input not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    micBtn.addEventListener("click", () => {
        recognition.start();
        micBtn.classList.add("listening");
        micBtn.textContent = "🎙️";
    });

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        inputField.value = transcript;
        sendMessage();
    };

    recognition.onerror = function (event) {
        console.error("Speech error:", event.error);
        micBtn.classList.remove("listening");
        micBtn.textContent = "🎤";
        alert("Microphone error. Please allow access.");
    };

    recognition.onend = function () {
        micBtn.classList.remove("listening");
        micBtn.textContent = "🎤";
    };
});



/* ===================== CREATED BY ===================== */
console.log()
`==========================================
AI Health Chatbot

);
/* ===================== END OF SCRIPT ===================== */