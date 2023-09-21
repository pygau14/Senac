// Chatbot queries and responses
const chatbotData = [
    { query: "Services", response: "Our services include corporate tax, personal tax, accounting firm, business partnership tax preparation, CRA audit representation, payroll tax problems, small business tax, tax planning, trust tax preparation, business advisory, business tax preparation, late tax filing, self-employed tax preparation, tax filing, tax preparation services, and unpaid back taxes." },
    { query: "Tax Filing", response: "We offer professional tax filing services to ensure accurate and timely submission of your tax returns. Our team of experts will handle all the paperwork and processing, saving you time and stress." },
    { query: "Tax Planning", response: "Our tax planning services help you optimize your financial situation and minimize your tax obligations. We tailor our programs to fit your unique circumstances, maximizing asset value while reducing tax liabilities." },
    { query: "Hassle-Free Tax Filing", response: "With our dependable and effective tax filing service, you can save time, stress, and money. Our all-inclusive customer packages take care of all paperwork, processing, and delivery, making the experience hassle-free." },
    { query: "Dependable Tax Filing Partner", response: "Partner with us for your tax filing needs and benefit from simplicity, cost savings, and peace of mind. We have the expertise to maximize your tax deductions and claims while ensuring compliance with tax regulations." },
    { query: "Thorough Tax Planning", response: "Our thorough tax planning programs empower you to take control of your finances. We help you efficiently manage your money, improve your financial situation, and reduce your tax obligations. Let us guide you towards financial stability and success." },
    { query: "Guaranteed Accuracy", response: "Every document we handle is processed with the utmost care, attention, and quality control. We strive for complete accuracy in our services, delivering on our commitment to perfection." },
    { query: "Personalized Services", response: "At our company, we take a customer-focused approach and strive to build enduring, reliable connections with our clients. You can expect personalized services from our attentive and caring team of professionals." },
    { query: "Client Satisfaction Guarantee", response: "We prioritize complete client satisfaction. If we fall short of your expectations, we will make every effort to address and rectify the situation. Your happiness is our guarantee." },
    { query: "Hello", response: "Hello! How can I assist you today?" },
    { query: "I need help", response: "Of course! I'm here to help. What do you need assistance with?" },
    { query: "Please help me", response: "Certainly! I'll do my best to assist you. Please let me know what you need help with." },
    { query: "How can you assist me?", response: "I can provide information and support on various topics such as tax filing, tax planning, and our services. Feel free to ask me anything!" },
  ];
 
  
 // Function to check if a query contains any keywords
function matchKeywords(query) {
  const keywords = [
    "tax",
    "filing",
    "planning",
    "services",
    "partner",
    "accuracy",
    "personalized",
    "satisfaction",
    "hassle-free"
  ];

  for (let i = 0; i < keywords.length; i++) {
    if (query.toLowerCase().includes(keywords[i])) {
      return true;
    }
  }

  return false;
}
// Global variable to store user data
let userData = {
  name: "",
  email: "",
  phone: "",
  preffered_time: "",
  message : ""
};

function handleKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    processUserInput();
  }
}

// Function to append the greeting message
function appendGreetingMessage() {
  const chatContent = document.getElementById("chatContent");
  chatContent.innerHTML = "";
  const greetingMessage = "Hi, I'm Mira. How can I assist you? 🙏";
  const welcomeMessage = "Welcome to Senac Group! 🚀";
  const nameMessage = "Ahoy there! 🌟 Before we set sail on our conversation, could you kindly share the treasure of your name with me?"
  appendMessage(welcomeMessage, "bot", true);
  setTimeout(function () {
    appendMessage(greetingMessage, "bot", true);
  }, 1500);
  setTimeout(function () {
    appendMessage(nameMessage, "bot", true);
  }, 3000);
}

// Function to append a message to the chat content
function appendMessage(message, sender, fadeInLeft) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message", sender);
  const messageText = document.createElement("div");
  if (sender === "bot") {
    const botIcon = document.createElement("span");
    botIcon.classList.add("bot-response-icon");
    const botIconImg = document.createElement("img");
    botIconImg.src = "chatbot.png";
    botIconImg.alt = "Chat Icon";
    botIconImg.width = 20;
    botIconImg.height = 20;
    botIcon.appendChild(botIconImg);
    messageContainer.appendChild(botIcon);
    messageText.classList.add("message-text", "fade-in-left");
  }
  if (sender === "user") {
    messageText.classList.add("user-message-text");
  }

  messageText.innerText = message;
  if (fadeInLeft) {
    messageContainer.classList.add("fade-in-left");
  }

  messageContainer.appendChild(messageText);
  chatContent.appendChild(messageContainer);
  chatContent.scrollTop = chatContent.scrollHeight;
}



let initialStage = true; // Variable to track the initial stage

// Process user input
async function processUserInput() {
  const userInput = document.getElementById("userInput").value;
  console.log(userInput);
  appendMessage(userInput,'user',true);
  // Check if user data is complete
  if (userData.name === "") {
    // Bot asks for name
    userData.name = userInput;
    appendMessage(`Nice to meet you, ${userData.name}! What's your email address?`, "bot",true);
  } else if (userData.email === "") {
    // Bot asks for email
    userData.email = userInput;
    appendMessage(`Great! Could you please provide your mobile number?`, "bot",true);
  } else if (userData.phone === "") {
    // Bot asks for mobile number
    userData.phone = userInput;
    appendMessage(`Thank you for providing your information, ${userData.name}!Could provide any Prefferd time to connect with you`, "bot",true);
  }else if(userData.preffered_time === ""){
    userData.preffered_time = userInput;
    appendMessage(`Thank you for providing your information, ${userData.name}! Any special message to us?`, "bot",true);
  }
  else if(userData.message === ""){
    userData.message = userInput;
    console.log(userData);
    var formData = new FormData();

    for (var key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key]);
      }
    }

    await  fetch('https://script.google.com/macros/s/AKfycbwcSOAQyuY1cVFVcN0JT_2tK_UwZfEbD_EHcKJd2dPSSgncVL5yiaWxk5HChly-VExv/exec',{
              method : 'POST',
              body : formData
               }).then((resp)=>{
                  console.log(resp);
                  
                  if(resp.ok){
                    
                    appendMessage(`Thank you for providing your information, ${userData.name}! How can I assist you further?`, "bot",false);
                  }
               }).catch((err)=>{
                console.log(err);
                appendMessage(`There was some error while sharing your data to team ${userData.name}! please referesh this page once`, "bot",false);
               })
  }
   else {
    // Process user query using chatbotData
    const answer = chatbotData[userInput];
    
    if (answer) {
      // If query matches, display the answer
      appendMessage(answer, "bot", false);
    } else {
      // If query doesn't match, display a creative message
      const notUnderstoodMessage = "I'm sorry, I couldn't understand your query. Don't worry, our team will get back to you soon!";
      appendMessage(notUnderstoodMessage, "bot",false);
    }
  }

  // Clear user input field
  document.getElementById("userInput").value = "";
}


  
  // Function to clear the chat and restart
function clearChat() {
    const chatContent = document.getElementById("chatContent");
    chatContent.innerHTML = "";
    appendGreetingMessage();
  }
  
  // Function to toggle chat window visibility with animations
  function toggleChatWindow() {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
    if(chatWindow.style.display == 'block'){
        appendGreetingMessage();
    }
  }
  
 
  