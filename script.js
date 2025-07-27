/*
 * ===================================================================
 * CRONOSHOP - MAIN JAVASCRIPT FILE
 * ===================================================================
 * Complete functionality for the iOS-style Cronoshop website
 * ===================================================================
 */

// Global variables
let allProducts = []
const filteredProducts = []
let currentFilter = "all"
const currentSort = "relevance"
let currentPage = 0
const productsPerPage = 12

// Sample products data
const products = [
  {
    id: "prod1",
    nome: "Samsung Galaxy S25 Ultra",
    prezzo: 1199.0,
    prezzo_originale: 1599.0,
    sconto: 25,
    descrizione: 'Smartphone AI con display 6.9" QHD+ Dynamic AMOLED 2X',
    categoria: "smartphone",
    img: "/placeholder.svg?height=300&width=400&text=Samsung+Galaxy+S25+Ultra",
    link: "https://amzn.to/3Z551fa",
  },
  {
    id: "prod2",
    nome: "by Amazon Quinoa biologica, 500g",
    prezzo: 5.49,
    prezzo_originale: 6.99,
    sconto: 21,
    descrizione: "Quinoa biologica di alta qualità, ricca di proteine e fibre",
    categoria: "casa",
    img: "/placeholder.svg?height=300&width=400&text=Quinoa+Biologica",
    link: "https://amzn.to/4mB7UhK",
  },
  {
    id: "prod3",
    nome: "Apple iPhone 15 (128 GB)",
    prezzo: 645.0,
    prezzo_originale: 879.0,
    sconto: 27,
    descrizione: "Display Super Retina XDR da 6,1 pollici e chip A16 Bionic",
    categoria: "smartphone",
    img: "/placeholder.svg?height=300&width=400&text=iPhone+15",
    link: "https://www.amazon.it/dp/B0CHWV5HTM",
  },
  {
    id: "prod4",
    nome: "Calvin Klein T-Shirt Uomo in Cotone",
    prezzo: 18.0,
    prezzo_originale: 35.0,
    sconto: 49,
    descrizione: "Stile minimalista, 100% cotone per il massimo comfort",
    categoria: "fashion",
    img: "/placeholder.svg?height=300&width=400&text=Calvin+Klein+T-Shirt",
    link: "https://amzn.to/4kbOb6E",
  },
  {
    id: "prod5",
    nome: "Amazon Fire TV Stick HD",
    prezzo: 28.99,
    prezzo_originale: 49.99,
    sconto: 42,
    descrizione: "Streaming HD con TV gratuita e telecomando vocale Alexa",
    categoria: "tech",
    img: "/placeholder.svg?height=300&width=400&text=Fire+TV+Stick",
    link: "https://amzn.to/4jhgwHr",
  },
  {
    id: "prod6",
    nome: "Oral-B Testine Di Ricambio Originali",
    prezzo: 24.99,
    prezzo_originale: 39.99,
    sconto: 38,
    descrizione: "Confezione da 10 testine Pro Cross Action per spazzolino elettrico",
    categoria: "salute",
    img: "/placeholder.svg?height=300&width=400&text=Oral-B+Testine",
    link: "https://amzn.to/3SUojjE",
  },
  {
    id: "prod7",
    nome: "Nike Air Max 270",
    prezzo: 89.99,
    prezzo_originale: 150.0,
    sconto: 40,
    descrizione: "Scarpe sportive con tecnologia Air Max per il massimo comfort",
    categoria: "sport",
    img: "/placeholder.svg?height=300&width=400&text=Nike+Air+Max+270",
    link: "https://amzn.to/nike270",
  },
  {
    id: "prod8",
    nome: "Philips Hue Smart Bulb",
    prezzo: 19.99,
    prezzo_originale: 29.99,
    sconto: 33,
    descrizione: "Lampadina intelligente con 16 milioni di colori",
    categoria: "tech",
    img: "/placeholder.svg?height=300&width=400&text=Philips+Hue",
    link: "https://amzn.to/philipshue",
  },
  {
    id: "prod9",
    nome: "Zara Giacca Elegante Donna",
    prezzo: 45.99,
    prezzo_originale: 79.99,
    sconto: 43,
    descrizione: "Giacca elegante per donna, perfetta per l'ufficio",
    categoria: "fashion",
    img: "/placeholder.svg?height=300&width=400&text=Zara+Giacca",
    link: "https://amzn.to/zaragiacca",
  },
  {
    id: "prod10",
    nome: "De'Longhi Macchina del Caffè",
    prezzo: 129.99,
    prezzo_originale: 199.99,
    sconto: 35,
    descrizione: "Macchina per caffè espresso automatica con macinacaffè integrato",
    categoria: "casa",
    img: "/placeholder.svg?height=300&width=400&text=DeLonghi+Caffe",
    link: "https://amzn.to/delonghicaffe",
  },
  {
    id: "prod11",
    nome: "Fitbit Charge 5",
    prezzo: 149.99,
    prezzo_originale: 199.99,
    sconto: 25,
    descrizione: "Fitness tracker avanzato con GPS e monitoraggio della salute",
    categoria: "sport",
    img: "/placeholder.svg?height=300&width=400&text=Fitbit+Charge+5",
    link: "https://amzn.to/fitbitcharge5",
  },
  {
    id: "prod12",
    nome: "L'Oréal Paris Crema Viso",
    prezzo: 12.99,
    prezzo_originale: 19.99,
    sconto: 35,
    descrizione: "Crema anti-età con acido ialuronico e vitamina C",
    categoria: "salute",
    img: "/placeholder.svg?height=300&width=400&text=Loreal+Crema",
    link: "https://amzn.to/lorealcrema",
  },
]

// Make products available globally
window.products = products
allProducts = products

// Main Cronoshop App Class
class CronoshopApp {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadUserData()
    this.applyTheme()
    this.updateCartBadge()
    this.initializeComponents()
  }

  setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById("menuToggle")
    const closeMenu = document.getElementById("closeMenu")
    const overlay = document.getElementById("overlay")

    if (menuToggle) {
      menuToggle.addEventListener("click", () => this.toggleMenu())
    }

    if (closeMenu) {
      closeMenu.addEventListener("click", () => this.closeMenu())
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        this.closeMenu()
        this.closeSearch()
      })
    }

    // Search toggle
    const searchToggle = document.getElementById("searchToggle")
    const searchCancel = document.getElementById("searchCancel")

    if (searchToggle) {
      searchToggle.addEventListener("click", () => this.toggleSearch())
    }

    if (searchCancel) {
      searchCancel.addEventListener("click", () => this.closeSearch())
    }

    // Theme toggle
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }

    // Search functionality
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value))
    }

    // Filter chips
    document.querySelectorAll(".ios-filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.setFilter(chip.dataset.category)
      })
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu()
        this.closeSearch()
      }
    })
  }

  toggleMenu() {
    const menu = document.getElementById("mobileMenu")
    const overlay = document.getElementById("overlay")

    if (menu && overlay) {
      menu.classList.toggle("active")
      overlay.classList.toggle("active")
      document.body.classList.toggle("ios-menu-open")
    }
  }

  closeMenu() {
    const menu = document.getElementById("mobileMenu")
    const overlay = document.getElementById("overlay")

    if (menu && overlay) {
      menu.classList.remove("active")
      overlay.classList.remove("active")
      document.body.classList.remove("ios-menu-open")
    }
  }

  toggleSearch() {
    const container = document.getElementById("searchContainer")
    const navbar = document.querySelector(".ios-navbar")

    if (container && navbar) {
      container.classList.toggle("active")
      navbar.classList.toggle("search-active")

      if (container.classList.contains("active")) {
        const searchInput = document.getElementById("searchInput")
        if (searchInput) {
          searchInput.focus()
        }
      }
    }
  }

  closeSearch() {
    const container = document.getElementById("searchContainer")
    const navbar = document.querySelector(".ios-navbar")
    const searchInput = document.getElementById("searchInput")

    if (container && navbar) {
      container.classList.remove("active")
      navbar.classList.remove("search-active")
    }

    if (searchInput) {
      searchInput.value = ""
    }
  }

  toggleTheme() {
    const body = document.body
    const themeBtn = document.getElementById("themeToggle")

    body.classList.toggle("ios-dark-mode")

    if (themeBtn) {
      const icon = themeBtn.querySelector("i")
      if (icon) {
        if (body.classList.contains("ios-dark-mode")) {
          icon.className = "ph ph-sun"
          localStorage.setItem("theme", "dark")
        } else {
          icon.className = "ph ph-moon"
          localStorage.setItem("theme", "light")
        }
      }
    }

    this.showNotification("Tema cambiato con successo!", "success")
  }

  applyTheme() {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = savedTheme || (prefersDark ? "dark" : "light")

    if (theme === "dark") {
      document.body.classList.add("ios-dark-mode")
      const themeBtn = document.getElementById("themeToggle")
      if (themeBtn) {
        const icon = themeBtn.querySelector("i")
        if (icon) {
          icon.className = "ph ph-sun"
        }
      }
    }
  }

  handleSearch(query) {
    if (window.location.pathname.includes("products.html")) {
      this.searchProducts(query)
    } else {
      // Redirect to products page with search query
      if (query.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`
      }
    }
  }

  searchProducts(query) {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    const filteredProducts = allProducts.filter(
      (product) =>
        product.nome.toLowerCase().includes(query.toLowerCase()) ||
        (product.descrizione && product.descrizione.toLowerCase().includes(query.toLowerCase())) ||
        product.categoria.toLowerCase().includes(query.toLowerCase()),
    )

    this.renderProducts(filteredProducts)
  }

  setFilter(category) {
    currentFilter = category
    currentPage = 0

    // Update active chip
    document.querySelectorAll(".ios-filter-chip").forEach((chip) => {
      chip.classList.remove("active")
    })

    const activeChip = document.querySelector(`[data-category="${category}"]`)
    if (activeChip) {
      activeChip.classList.add("active")
    }

    this.filterAndRenderProducts()
  }

  filterAndRenderProducts() {
    let filtered = [...allProducts]

    // Apply category filter
    if (currentFilter !== "all") {
      filtered = filtered.filter((product) => product.categoria === currentFilter)
    }

    // Apply sorting
    switch (currentSort) {
      case "price-low":
        filtered.sort((a, b) => this.getPrice(a) - this.getPrice(b))
        break
      case "price-high":
        filtered.sort((a, b) => this.getPrice(b) - this.getPrice(a))
        break
      case "discount":
        filtered.sort((a, b) => (b.sconto || 0) - (a.sconto || 0))
        break
      case "name":
        filtered.sort((a, b) => a.nome.localeCompare(b.nome))
        break
    }

    this.renderProducts(filtered)
  }

  getPrice(product) {
    return typeof product.prezzo === "number" ? product.prezzo : Number.parseFloat(product.prezzo) || 0
  }

  renderProducts(productsToRender = null) {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    const products = productsToRender || allProducts.slice(0, (currentPage + 1) * productsPerPage)

    grid.innerHTML = products.map((product) => this.createProductCard(product)).join("")
  }

  createProductCard(product) {
    const price = this.getPrice(product)
    const originalPrice =
      typeof product.prezzo_originale === "number"
        ? product.prezzo_originale
        : Number.parseFloat(product.prezzo_originale) || null

    return `
            <div class="ios-product-card ios-animate-fade-in">
                <div class="ios-product-image">
                    <img src="${product.img}" alt="${product.nome}" loading="lazy">
                </div>
                <div class="ios-product-info">
                    <div class="ios-product-category">${this.getCategoryName(product.categoria)}</div>
                    <h3 class="ios-product-title">${product.nome}</h3>
                    <p class="ios-product-description">${product.descrizione || ""}</p>
                    <div class="ios-product-price">
                        <span class="ios-price-current">€${price.toFixed(2)}</span>
                        ${originalPrice ? `<span class="ios-price-original">€${originalPrice.toFixed(2)}</span>` : ""}
                        ${product.sconto ? `<span class="ios-discount-badge">-${product.sconto}%</span>` : ""}
                    </div>
                    <div class="ios-product-actions">
                        <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="ios-btn ios-btn-primary ios-btn-small">
                            <i class="ph ph-shopping-cart"></i>
                            Acquista
                        </a>
                        <button class="ios-btn ios-btn-secondary ios-btn-icon" onclick="app.addToWishlist('${product.id}')" title="Aggiungi alla wishlist">
                            <i class="ph ph-heart"></i>
                        </button>
                        <button class="ios-btn ios-btn-secondary ios-btn-icon" onclick="app.shareProduct('${product.id}')" title="Condividi">
                            <i class="ph ph-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
  }

  getCategoryName(category) {
    const categoryNames = {
      smartphone: "Smartphone",
      tech: "Tecnologia",
      fashion: "Moda",
      casa: "Casa & Cucina",
      salute: "Salute & Bellezza",
      sport: "Sport & Tempo Libero",
    }
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  addToWishlist(productId) {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) {
      this.showNotification("Prodotto non trovato", "error")
      return
    }

    try {
      const userData = this.getUserData()
      const wishlist = userData.wishlist || []

      const existingItem = wishlist.find((item) => item.id === productId)
      if (existingItem) {
        this.showNotification("Prodotto già nella wishlist", "info")
        return
      }

      wishlist.push(product)
      userData.wishlist = wishlist
      this.saveUserData(userData)

      this.showNotification("Prodotto aggiunto alla wishlist!", "success")
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      this.showNotification("Errore nell'aggiungere alla wishlist", "error")
    }
  }

  addToCart(productId) {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) {
      this.showNotification("Prodotto non trovato", "error")
      return
    }

    try {
      const userData = this.getUserData()
      const cart = userData.cart || []

      const existingItem = cart.find((item) => item.id === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }

      userData.cart = cart
      this.saveUserData(userData)

      this.updateCartBadge()
      this.showNotification("Prodotto aggiunto al carrello!", "success")
    } catch (error) {
      console.error("Error adding to cart:", error)
      this.showNotification("Errore nell'aggiungere al carrello", "error")
    }
  }

  shareProduct(productId) {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) return

    const shareData = {
      title: `${product.nome} - Cronoshop`,
      text: `Guarda questa offerta su Cronoshop: ${product.nome} a €${product.prezzo}`,
      url: product.link,
    }

    if (navigator.share) {
      navigator.share(shareData).catch(console.error)
    } else {
      // Fallback: copy to clipboard
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          this.showNotification("Link copiato negli appunti!", "success")
        })
        .catch(() => {
          this.showNotification("Impossibile condividere", "error")
        })
    }
  }

  getUserData() {
    try {
      const data = localStorage.getItem("cronoshop_data")
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error("Error loading user data:", error)
      return {}
    }
  }

  saveUserData(data) {
    try {
      localStorage.setItem("cronoshop_data", JSON.stringify(data))
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  loadUserData() {
    const userData = this.getUserData()
    // Initialize empty arrays if they don't exist
    if (!userData.cart) userData.cart = []
    if (!userData.wishlist) userData.wishlist = []
    this.saveUserData(userData)
  }

  updateCartBadge() {
    try {
      const userData = this.getUserData()
      const cart = userData.cart || []
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

      const badges = document.querySelectorAll("#cartBadge, .cart-count")
      badges.forEach((badge) => {
        if (badge) {
          badge.textContent = totalItems
          badge.style.display = totalItems > 0 ? "block" : "none"
        }
      })
    } catch (error) {
      console.error("Error updating cart badge:", error)
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `ios-notification ios-notification-${type}`
    notification.innerHTML = `
            <div class="ios-notification-content">
                <i class="ph ph-${type === "success" ? "check-circle" : type === "error" ? "x-circle" : "info"}"></i>
                <span>${message}</span>
            </div>
        `

    document.body.appendChild(notification)

    setTimeout(() => notification.classList.add("show"), 100)
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  initializeComponents() {
    // Initialize any page-specific components
    this.initializeFAQ()
    this.initializeHomePage()
  }

  initializeFAQ() {
    document.querySelectorAll(".ios-faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.closest(".ios-faq-item")
        const isActive = faqItem.classList.contains("active")

        // Close all other FAQ items
        document.querySelectorAll(".ios-faq-item").forEach((item) => {
          item.classList.remove("active")
        })

        // Toggle current item
        if (!isActive) {
          faqItem.classList.add("active")
        }
      })
    })
  }

  initializeHomePage() {
    // Load products on home page
    if (document.getElementById("productsGrid")) {
      this.renderProducts()
    }
  }
}

// Global functions for HTML onclick handlers
function scrollToOffers() {
  const offersSection = document.getElementById("todaysOffers")
  if (offersSection) {
    offersSection.scrollIntoView({ behavior: "smooth" })
  }
}

function toggleFAQ(element) {
  const faqItem = element.closest(".ios-faq-item")
  faqItem.classList.toggle("active")
}

// Initialize app when DOM is loaded
let app
document.addEventListener("DOMContentLoaded", () => {
  app = new CronoshopApp()
  window.app = app // Make app globally available

  // Load navigation if nav.html exists
  loadNavigation()
})

// Navigation loader
function loadNavigation() {
  const headerPlaceholder = document.querySelector(".glass-header")
  const footerPlaceholder = document.querySelector(".glass-footer")

  if (headerPlaceholder && headerPlaceholder.innerHTML.trim() === "") {
    fetch("nav.html")
      .then((response) => response.text())
      .then((data) => {
        // Extract navigation content
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, "text/html")
        const nav = doc.querySelector("nav")
        const mobileMenu = doc.querySelector(".mobile-menu")
        const overlay = doc.querySelector(".overlay")

        if (nav) {
          headerPlaceholder.appendChild(nav)
        }

        if (mobileMenu) {
          document.body.appendChild(mobileMenu)
        }

        if (overlay) {
          document.body.appendChild(overlay)
        }

        // Re-initialize app after navigation is loaded
        if (app) {
          app.setupEventListeners()
          app.updateCartBadge()
        }
      })
      .catch((error) => {
        console.error("Error loading navigation:", error)
        // Fallback: create basic navigation
        createFallbackNavigation()
      })
  }
}

function createFallbackNavigation() {
  const headerPlaceholder = document.querySelector(".glass-header")
  if (!headerPlaceholder) return

  headerPlaceholder.innerHTML = `
        <nav class="ios-navbar">
            <div class="ios-navbar-content">
                <div class="ios-navbar-left">
                    <a href="index.html" class="ios-logo">
                        <img src="assets/cronoshop-logo.png" alt="Cronoshop" class="ios-logo-image">
                        <span class="ios-logo-text">Cronoshop</span>
                    </a>
                </div>
                <div class="ios-navbar-right">
                    <button class="ios-nav-action" id="themeToggle">
                        <i class="ph ph-moon"></i>
                    </button>
                    <a href="cart.html" class="ios-nav-action">
                        <i class="ph ph-shopping-cart"></i>
                        <span class="ios-badge" id="cartBadge">0</span>
                    </a>
                </div>
            </div>
        </nav>
    `
}

// Export for global use
window.CronoshopApp = CronoshopApp
window.products = products


/**
 * Oggetto applicazione globale per utilità come le notifiche.
 * Questo dovrebbe essere disponibile su window.app
 */
window.app = {
    showNotification: function(message, type = 'info', duration = 3000) {
        // Implementazione di un semplice sistema di notifica.
        // Per un progetto reale, sarebbe meglio una UI di notifica più robusta.
        const notificationContainer = document.getElementById('notification-container') || (() => {
            const div = document.createElement('div');
            div.id = 'notification-container';
            Object.assign(div.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '9999',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            });
            document.body.appendChild(div);
            return div;
        })();

        const notification = document.createElement('div');
        Object.assign(notification.style, {
            background: type === 'success' ? '#34C759' : (type === 'error' ? '#FF3B30' : '#007AFF'),
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease-out',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            minWidth: '200px',
            textAlign: 'center',
        });
        notification.textContent = message;

        notificationContainer.appendChild(notification);

        // Animazione di ingresso
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 50);

        // Animazione di uscita e rimozione
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            notification.addEventListener('transitionend', () => notification.remove());
        }, duration);
    }
};

/**
 * Classe ThemeCustomizer
 * Gestisce il tema, i colori e altre impostazioni di personalizzazione.
 * Applica le impostazioni a livello globale e le salva in localStorage.
 */
class ThemeCustomizer {
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applySettings();
        this.updateUI(); // Aggiorna gli elementi UI solo se esistono nella pagina corrente
    }

    loadSettings() {
        const defaultSettings = {
            theme: 'light',
            autoTheme: false,
            glassEffect: true,
            reducedMotion: false,
            highContrast: false,
            fontSize: 16,
            borderRadius: 12,
            primaryColor: '#007aff',
            backgroundColor: '#f2f2f7'
        };

        try {
            const saved = localStorage.getItem('cronoshop_theme_settings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch (error) {
            console.error('Errore durante il caricamento delle impostazioni del tema:', error);
            return defaultSettings;
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('cronoshop_theme_settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Errore durante il salvataggio delle impostazioni del tema:', error);
        }
    }

    setupEventListeners() {
        // Questi event listener si collegheranno solo se gli elementi esistono nella pagina corrente.
        // Questo rende lo script sicuro da includere in tutte le pagine.

        // Schede tema
        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                const theme = card.dataset.theme;
                this.setTheme(theme);
            });
        });

        // Toggle
        const autoThemeToggle = document.getElementById('autoThemeToggle');
        if (autoThemeToggle) {
            autoThemeToggle.addEventListener('click', () => {
                this.toggleSetting('autoTheme');
                if (this.settings.autoTheme) {
                    this.setupAutoTheme();
                } else {
                    // Se la modalità automatica è disattivata, ritorna al tema light/dark predefinito
                    this.setTheme(this.settings.theme === 'dark' ? 'dark' : 'light');
                    clearInterval(this._autoThemeInterval); // Interrompe l'intervallo se presente
                }
            });
        }

        const glassEffectToggle = document.getElementById('glassEffectToggle');
        if (glassEffectToggle) {
            glassEffectToggle.addEventListener('click', () => {
                this.toggleSetting('glassEffect');
            });
        }

        const reducedMotionToggle = document.getElementById('reducedMotionToggle');
        if (reducedMotionToggle) {
            reducedMotionToggle.addEventListener('click', () => {
                this.toggleSetting('reducedMotion');
            });
        }

        const highContrastToggle = document.getElementById('highContrastToggle');
        if (highContrastToggle) {
            highContrastToggle.addEventListener('click', () => {
                this.toggleSetting('highContrast');
            });
        }

        // Slider
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        if (fontSizeSlider) {
            fontSizeSlider.addEventListener('input', (e) => {
                this.setSetting('fontSize', parseInt(e.target.value));
            });
        }

        const borderRadiusSlider = document.getElementById('borderRadiusSlider');
        if (borderRadiusSlider) {
            borderRadiusSlider.addEventListener('input', (e) => {
                this.setSetting('borderRadius', parseInt(e.target.value));
            });
        }

        // Selettori colore (colore principale)
        document.querySelectorAll('[data-color]').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                this.setSetting('primaryColor', color);
                this.updateColorPicker('color', color);
            });
        });

        // Selettori colore (colore di sfondo)
        document.querySelectorAll('[data-bg-color]').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.bgColor;
                this.setSetting('backgroundColor', color);
                this.updateColorPicker('bg-color', color);
            });
        });

        // Pulsante di reset
        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetSettings();
            });
        }

        // Controllo iniziale per la modalità automatica
        if (this.settings.autoTheme) {
            this.setupAutoTheme();
        }
    }

    setTheme(theme) {
        this.settings.theme = theme;
        this.saveSettings();
        this.applySettings();
        this.updateThemeCards(); // Aggiorna gli elementi UI solo se esistono

        if (window.app && typeof window.app.showNotification === 'function') {
            window.app.showNotification(`Tema "${theme}" applicato!`, 'success');
        }
    }

    toggleSetting(setting) {
        this.settings[setting] = !this.settings[setting];
        this.saveSettings();
        this.applySettings();
        this.updateUI(); // Aggiorna gli elementi UI solo se esistono

        if (window.app && typeof window.app.showNotification === 'function') {
            window.app.showNotification(`${setting} ${this.settings[setting] ? 'attivato' : 'disattivato'}`, 'success');
        }
    }

    setSetting(setting, value) {
        this.settings[setting] = value;
        this.saveSettings();
        this.applySettings();

        // Opzionale: mostra notifica per i cambiamenti degli slider, ma potrebbe essere troppo frequente
        // if (window.app && typeof window.app.showNotification === 'function') {
        //     window.app.showNotification(`${setting} aggiornato a ${value}`, 'success');
        // }
    }

    applySettings() {
        const root = document.documentElement; // Si applica al tag <html>
        const body = document.body;

        // Rimuovi le classi di tema/effetto esistenti
        body.classList.remove(
            'ios-dark-mode', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange',
            'glass-effect', 'reduced-motion', 'high-contrast'
        );

        // Applica la classe del tema
        if (this.settings.theme === 'dark') {
            body.classList.add('ios-dark-mode');
        } else if (['blue', 'green', 'purple', 'orange'].includes(this.settings.theme)) {
            body.classList.add(`theme-${this.settings.theme}`);
        }
        // Se il tema è 'light', nessuna classe specifica viene aggiunta in quanto è lo stato predefinito nel CSS

        // Applica le classi degli effetti
        if (this.settings.glassEffect) {
            body.classList.add('glass-effect');
        }
        if (this.settings.reducedMotion) {
            body.classList.add('reduced-motion');
        }
        if (this.settings.highContrast) {
            body.classList.add('high-contrast');
        }

        // Applica le proprietà CSS personalizzate all'elemento radice
        root.style.setProperty('--custom-font-size', `${this.settings.fontSize}px`);
        root.style.setProperty('--custom-border-radius', `${this.settings.borderRadius}px`);
        root.style.setProperty('--custom-primary-color', this.settings.primaryColor);

        // Applica il colore/gradiente di sfondo personalizzato
        const gradients = {
            gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            gradient5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            gradient6: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            gradient7: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        };

        if (this.settings.backgroundColor.startsWith('gradient')) {
            root.style.setProperty('--custom-bg-color', gradients[this.settings.backgroundColor]);
        } else {
            root.style.setProperty('--custom-bg-color', this.settings.backgroundColor);
        }
    }

    updateUI() {
        // Aggiorna lo stato dei toggle
        const autoThemeToggle = document.getElementById('autoThemeToggle');
        if (autoThemeToggle) autoThemeToggle.classList.toggle('active', this.settings.autoTheme);

        const glassEffectToggle = document.getElementById('glassEffectToggle');
        if (glassEffectToggle) glassEffectToggle.classList.toggle('active', this.settings.glassEffect);

        const reducedMotionToggle = document.getElementById('reducedMotionToggle');
        if (reducedMotionToggle) reducedMotionToggle.classList.toggle('active', this.settings.reducedMotion);

        const highContrastToggle = document.getElementById('highContrastToggle');
        if (highContrastToggle) highContrastToggle.classList.toggle('active', this.settings.highContrast);

        // Aggiorna il valore degli slider
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        if (fontSizeSlider) fontSizeSlider.value = this.settings.fontSize;

        const borderRadiusSlider = document.getElementById('borderRadiusSlider');
        if (borderRadiusSlider) borderRadiusSlider.value = this.settings.borderRadius;

        // Aggiorna lo stato attivo delle schede tema
        this.updateThemeCards();

        // Aggiorna lo stato attivo dei selettori colore
        this.updateColorPicker('color', this.settings.primaryColor);
        this.updateColorPicker('bg-color', this.settings.backgroundColor);
    }

    updateThemeCards() {
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });

        const activeCard = document.querySelector(`[data-theme="${this.settings.theme}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }

    updateColorPicker(type, value) {
        document.querySelectorAll(`[data-${type}]`).forEach(option => {
            option.classList.remove('active');
        });

        const activeOption = document.querySelector(`[data-${type}="${value}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    }

    setupAutoTheme() {
        const updateAutoTheme = () => {
            if (!this.settings.autoTheme) return; // Ferma se la modalità automatica è disabilitata

            const hour = new Date().getHours();
            const isDark = hour < 7 || hour > 19; // Tra le 19:00 e le 07:00
            const newTheme = isDark ? 'dark' : 'light';

            // Cambia tema solo se è diverso per evitare aggiornamenti/notifiche non necessari
            if (newTheme !== this.settings.theme) {
                this.setTheme(newTheme);
            }
        };

        // Esegui immediatamente e poi ogni minuto
        updateAutoTheme();
        clearInterval(this._autoThemeInterval); // Pulisce qualsiasi intervallo esistente
        this._autoThemeInterval = setInterval(updateAutoTheme, 60000); // Controlla ogni minuto
    }

    resetSettings() {
        if (confirm('Sei sicuro di voler ripristinare tutte le impostazioni?')) {
            localStorage.removeItem('cronoshop_theme_settings');
            this.settings = this.loadSettings(); // Ricarica le impostazioni predefinite
            this.applySettings();
            this.updateUI();

            if (window.app && typeof window.app.showNotification === 'function') {
                window.app.showNotification('Impostazioni ripristinate!', 'success');
            }
        }
    }
}

// Inizializza il personalizzatore del tema quando il DOM è caricato su qualsiasi pagina
document.addEventListener('DOMContentLoaded', () => {
    window.themeCustomizer = new ThemeCustomizer(); // Rende l'oggetto accessibile globalmente se necessario
});

// Applica le impostazioni immediatamente al caricamento dello script, anche prima di DOMContentLoaded,
// per prevenire FOUC (Flash Of Unstyled Content) per tema/colori.
// Gli aggiornamenti UI possono attendere DOMContentLoaded.
(function() {
    const defaultSettings = {
        theme: 'light',
        glassEffect: true,
        reducedMotion: false,
        highContrast: false,
        fontSize: 16,
        borderRadius: 12,
        primaryColor: '#007aff',
        backgroundColor: '#f2f2f7'
    };

    let savedSettings = defaultSettings;
    try {
        const saved = localStorage.getItem('cronoshop_theme_settings');
        savedSettings = saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (error) {
        console.error('Errore durante il caricamento delle impostazioni iniziali del tema:', error);
    }

    const root = document.documentElement;
    const body = document.body;

    // Applica la classe del tema
    if (savedSettings.theme === 'dark') {
        body.classList.add('ios-dark-mode');
    } else if (['blue', 'green', 'purple', 'orange'].includes(savedSettings.theme)) {
        body.classList.add(`theme-${savedSettings.theme}`);
    }

    // Applica le classi degli effetti
    if (savedSettings.glassEffect) {
        body.classList.add('glass-effect');
    }
    if (savedSettings.reducedMotion) {
        body.classList.add('reduced-motion');
    }
    if (savedSettings.highContrast) {
        body.classList.add('high-contrast');
    }

    // Applica le proprietà CSS personalizzate
    root.style.setProperty('--custom-font-size', `${savedSettings.fontSize}px`);
    root.style.setProperty('--custom-border-radius', `${savedSettings.borderRadius}px`);
    root.style.setProperty('--custom-primary-color', savedSettings.primaryColor);

    const gradients = {
        gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        gradient5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        gradient6: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        gradient7: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    };

    if (savedSettings.backgroundColor.startsWith('gradient')) {
        root.style.setProperty('--custom-bg-color', gradients[savedSettings.backgroundColor]);
    } else {
        root.style.setProperty('--custom-bg-color', savedSettings.backgroundColor);
    }
})();
// script.js

// ... (Mantieni tutto il codice esistente fino a qui, inclusi window.app e la classe ThemeCustomizer) ...

// --- NEW: Funzione per caricare e inizializzare la navbar ---
async function loadNavbar() {
    try {
        const response = await fetch('nav.html');
        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
        const fullHtml = await response.text();
        
        // Crea un elemento temporaneo per "parlare" il HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullHtml;

        // Estrai solo il body (che contiene la navbar e i suoi script/stili)
        const navBodyContent = tempDiv.querySelector('body')?.innerHTML;
        
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder && navBodyContent) {
            navbarPlaceholder.innerHTML = navBodyContent;

            // NEW: Applica gli stili e gli script dalla navbar caricata
            // Questo gestisce i tag <style> e <script> che erano dentro nav.html
            // e li aggiunge al DOM della pagina corrente.
            tempDiv.querySelectorAll('style').forEach(styleTag => {
                const newStyle = document.createElement('style');
                newStyle.textContent = styleTag.textContent;
                document.head.appendChild(newStyle);
            });

            tempDiv.querySelectorAll('script').forEach(scriptTag => {
                const newScript = document.createElement('script');
                // Se lo script ha un src, usa quello
                if (scriptTag.src) {
                    newScript.src = scriptTag.src;
                } else { // Altrimenti, copia il contenuto inline
                    newScript.textContent = scriptTag.textContent;
                }
                document.body.appendChild(newScript);
            });

            // Re-inizializza le funzioni della navbar DOPO che è stata caricata e i suoi script aggiunti
            initializeNavbarFunctions();
            
            // Applica immediatamente le impostazioni del tema per la navbar caricata
            if (window.themeCustomizer) {
                window.themeCustomizer.applySettings();
                window.themeCustomizer.updateUI();
            }

        } else {
            console.warn('Elemento con ID "navbar-placeholder" non trovato o contenuto di nav.html vuoto. La navbar non verrà caricata.');
        }

    } catch (error) {
        console.error('Errore durante il caricamento della navbar:', error);
    }
}


// --- Funzioni per la Navbar (inizializzate dopo il caricamento della navbar) ---
function initializeNavbarFunctions() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    function toggleMobileMenu(isOpen) {
        if (mobileMenu) mobileMenu.classList.toggle('active', isOpen);
        if (overlay) overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent scrolling behind overlay
    }

    mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMobileMenu(false));
    overlay?.addEventListener('click', () => toggleMobileMenu(false));

    // Highlight active page
    const currentPagePath = window.location.pathname;
    const currentPageFile = currentPagePath.split('/').pop();
    const currentPageName = currentPageFile.split('.')[0] || 'index';

    document.querySelectorAll(`[data-page]`).forEach(link => {
        if (link.dataset.page === currentPageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update cart and wishlist counts
    function updateBadges() {
        try {
            const cart = JSON.parse(localStorage.getItem('cronoshop_cart') || '[]');
            const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            document.querySelectorAll('.cart-count').forEach(badge => {
                badge.textContent = cartCount;
                badge.classList.toggle('show', cartCount > 0);
            });

            const wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
            const wishlistCount = wishlist.length;
            document.querySelectorAll('.wishlist-count').forEach(badge => {
                badge.textContent = wishlistCount;
                badge.classList.toggle('show', wishlistCount > 0);
            });
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dei badge:', error);
        }
    }

    updateBadges();
    window.addEventListener('storage', updateBadges);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            toggleMobileMenu(false);
        }
    });

}


// --- Logica di Inizializzazione Globale (questa parte potrebbe essere leggermente modificata) ---
// Applica le impostazioni del tema immediatamente (per prevenire FOUC)
(function() {
    const defaultSettings = {
        theme: 'light',
        glassEffect: true,
        reducedMotion: false,
        highContrast: false,
        fontSize: 16,
        borderRadius: 12,
        primaryColor: '#007aff',
        backgroundColor: '#f2f2f7'
    };

    let savedSettings = defaultSettings;
    try {
        const saved = localStorage.getItem('cronoshop_theme_settings');
        savedSettings = saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (error) {
        console.error('Errore durante il caricamento delle impostazioni iniziali del tema:', error);
    }

    const root = document.documentElement;
    const body = document.body;

    if (savedSettings.theme === 'dark') {
        body.classList.add('ios-dark-mode');
    } else if (['blue', 'green', 'purple', 'orange'].includes(savedSettings.theme)) {
        body.classList.add(`theme-${savedSettings.theme}`);
    }

    if (savedSettings.glassEffect) {
        body.classList.add('glass-effect');
    }
    if (savedSettings.reducedMotion) {
        body.classList.add('reduced-motion');
    }
    if (savedSettings.highContrast) {
        body.classList.add('high-contrast');
    }

    root.style.setProperty('--custom-font-size', `${savedSettings.fontSize}px`);
    root.style.setProperty('--custom-border-radius', `${savedSettings.borderRadius}px`);
    root.style.setProperty('--custom-primary-color', savedSettings.primaryColor);

    const gradients = {
        gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        gradient5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        gradient6: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        gradient7: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    };

    if (savedSettings.backgroundColor.startsWith('gradient')) {
        root.style.setProperty('--custom-bg-color', gradients[savedSettings.backgroundColor]);
    } else {
        root.style.setProperty('--custom-bg-color', savedSettings.backgroundColor);
    }
})();

// Inizializza ThemeCustomizer e carica Navbar quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
    window.themeCustomizer = new ThemeCustomizer();
    loadNavbar(); // Carica il contenuto della navbar dinamicamente
});

// Esporta per uso globale (se altri script devono attivare gli aggiornamenti dei badge)
window.cronoshopNav = {
    updateBadges: function() {
        const event = new Event('storage'); // Simula evento storage per attivare l'aggiornamento
        window.dispatchEvent(event);
    }
};
/* ===== NAVBAR LOGIC START ===== */

document.addEventListener('DOMContentLoaded', function() {
    // Questa funzione viene eseguita solo DOPO che il DOM è pronto.
    // È sicura perché a questo punto la navbar da nav.html dovrebbe essere già stata iniettata.
    
    // --- ELEMENT SELECTION ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // --- MOBILE MENU MANAGEMENT ---
    
    /**
     * Toggles the mobile menu visibility.
     * @param {boolean} isOpen - True to open, false to close.
     */
    const toggleMobileMenu = (isOpen) => {
        if (!mobileMenu || !overlay) return; // Safety check
        
        mobileMenu.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        
        // Prevents scrolling of the body when the menu is open for better UX
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // Attach events to buttons to open and close the menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
    }
    if (overlay) {
        overlay.addEventListener('click', () => toggleMobileMenu(false));
    }

    // --- THEME MANAGEMENT (DARK/LIGHT MODE) ---

    /**
     * Applies the theme (dark or light) and updates the icon.
     * It relies on the global ThemeCustomizer class defined in script.js.
     */
    const applyTheme = () => {
        // Check if the global theme manager exists and the icon element is found
        if (!window.themeCustomizer || !themeIcon) return; 

        const isDarkMode = window.themeCustomizer.settings.theme === 'dark';
        
        // Update the button icon
        themeIcon.className = isDarkMode ? 'ph ph-sun' : 'ph ph-moon';
    };
    
    // Event for the theme toggle button click
    if (themeToggleBtn && window.themeCustomizer) {
        themeToggleBtn.addEventListener('click', () => {
            // Determine the current theme and set the opposite one
            const currentTheme = window.themeCustomizer.settings.theme;
            const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
            
            // Call the global function to change the theme
            window.themeCustomizer.setTheme(newTheme);
            
            // Update the icon immediately
            applyTheme(); 
        });
    }
    
    // --- ACTIVE PAGE HIGHLIGHT ---
    
    /**
     * Highlights the navigation link corresponding to the current page.
     */
    const highlightActiveLink = () => {
        const currentPagePath = window.location.pathname;
        // Extracts the filename (e.g., "products.html") or remains empty for the root
        const currentPageFile = currentPagePath.split('/').pop() || 'index.html';
        
        // Removes the extension to get the page name (e.g., "products")
        const pageName = currentPageFile.split('.')[0];
        
        // Iterates over all links (desktop and mobile)
        document.querySelectorAll('.nav-link[data-page], .mobile-nav-link[data-page]').forEach(link => {
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // --- BADGE UPDATE (CART & WISHLIST) ---

    /**
     * Reads data from localStorage and updates the counters on the cart and wishlist.
     */
    const updateBadges = () => {
        try {
            // Update cart counter
            const cart = JSON.parse(localStorage.getItem('cronoshop_cart') || '[]');
            const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            document.querySelectorAll('.cart-count').forEach(badge => {
                badge.textContent = cartCount;
                badge.classList.toggle('show', cartCount > 0);
            });

            // Update wishlist counter
            const wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
            const wishlistCount = wishlist.length;
            document.querySelectorAll('.wishlist-count').forEach(badge => {
                badge.textContent = wishlistCount;
                badge.classList.toggle('show', wishlistCount > 0);
            });
        } catch (error) {
            console.error("Error updating badges:", error);
        }
    };

    // --- INITIALIZATION ---
    // Function to run all initial setup operations.
    const initializeNavbar = () => {
        applyTheme();
        highlightActiveLink();
        updateBadges();
        
        // Adds a listener to update badges when data changes in another tab
        window.addEventListener('storage', updateBadges);
        
        // Makes the update function globally accessible
        // so other parts of the site (e.g., cart.js) can call it.
        if (!window.cronoshopNav) {
            window.cronoshopNav = {};
        }
        window.cronoshopNav.updateBadges = updateBadges;
    };
    
    // Run everything
    initializeNavbar();
});

/* ===== NAVBAR LOGIC END ===== */

