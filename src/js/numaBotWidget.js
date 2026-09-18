import { processBotQuery } from './numaBotEngine.js';

export class NumaBotWidget {
  constructor(options = {}) {
    this.isOpen = false;
    this.messages = [];

    this.initDOM();
    this.bindEvents();
    this.sendInitialGreeting();
  }

  /**
   * Construye el DOM del launcher y la ventana flotante de Valery Lioness
   */
  initDOM() {
    if (document.getElementById('numa-bot-launcher')) return;

    // 1. Launcher Flotante
    const launcher = document.createElement('div');
    launcher.id = 'numa-bot-launcher';
    launcher.className = 'numa-bot-launcher';
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('aria-label', 'Abrir Asistente Valery Lioness');
    launcher.innerHTML = `
      <div class="numa-bot-launcher-icon vl-mystic-orb">
        <div class="vl-orb-ring"></div>
        <div class="vl-orb-sphere">
          <svg class="vl-orb-symbol" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <div class="vl-orb-shine"></div>
        </div>
      </div>
      <div class="numa-bot-launcher-text">
        <span class="numa-bot-launcher-title">Valery Lioness</span>
        <span class="numa-bot-launcher-sub">Tarot & Orientación</span>
      </div>
      <span class="numa-bot-badge" id="numa-bot-badge">✦ Online</span>
    `;

    // 2. Ventana de Chat Flotante
    const chatWindow = document.createElement('div');
    chatWindow.id = 'numa-bot-window';
    chatWindow.className = 'numa-bot-window';
    chatWindow.setAttribute('aria-hidden', 'true');
    chatWindow.innerHTML = `
      <header class="numa-bot-header">
        <div class="numa-bot-header-info">
          <div class="numa-bot-avatar vl-mystic-orb-avatar">
            <div class="vl-orb-sphere" style="width: 28px; height: 28px;">
              <svg class="vl-orb-symbol" style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <div class="vl-orb-shine"></div>
            </div>
          </div>
          <div class="numa-bot-header-titles">
            <h4 class="numa-bot-title">Valery Lioness · Asistente</h4>
            <div class="numa-bot-status">
              <span class="numa-bot-status-dot"></span>
              <span>Orientación Holística & Tarot</span>
            </div>
          </div>
        </div>
        <div class="numa-bot-header-actions">
          <button class="numa-bot-btn-icon" id="numa-bot-restart-btn" title="Reiniciar conversación">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
          </button>
          <button class="numa-bot-btn-icon" id="numa-bot-close-btn" title="Cerrar ventana">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <div class="numa-bot-messages" id="numa-bot-messages-list"></div>

      <div class="numa-bot-quick-replies" id="numa-bot-quick-replies"></div>

      <footer class="numa-bot-footer">
        <form class="numa-bot-form" id="numa-bot-form">
          <input
            type="text"
            id="numa-bot-input"
            class="numa-bot-input"
            placeholder="Escribe tu consulta o pide información..."
            autocomplete="off"
          />
          <button type="submit" class="numa-bot-send-btn" aria-label="Enviar mensaje">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </footer>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chatWindow);

    this.launcherEl = launcher;
    this.windowEl = chatWindow;
    this.messagesListEl = document.getElementById('numa-bot-messages-list');
    this.quickRepliesEl = document.getElementById('numa-bot-quick-replies');
    this.formEl = document.getElementById('numa-bot-form');
    this.inputEl = document.getElementById('numa-bot-input');
  }

  /**
   * Vincula los escuchadores de eventos
   */
  bindEvents() {
    this.launcherEl.addEventListener('click', () => this.toggle());

    document.getElementById('numa-bot-close-btn')?.addEventListener('click', () => {
      this.close();
    });

    document.getElementById('numa-bot-restart-btn')?.addEventListener('click', () => {
      this.messagesListEl.innerHTML = '';
      this.sendInitialGreeting();
    });

    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.inputEl.value.trim();
      if (!text) return;
      this.inputEl.value = '';
      this.handleUserMessage(text);
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.windowEl.classList.add('is-open');
    this.windowEl.setAttribute('aria-hidden', 'false');
    this.inputEl.focus();
    this.scrollToBottom();
  }

  close() {
    this.isOpen = false;
    this.windowEl.classList.remove('is-open');
    this.windowEl.setAttribute('aria-hidden', 'true');
  }

  sendInitialGreeting() {
    const greeting = processBotQuery('hola');
    this.appendMessage('bot', greeting.text);
    this.renderQuickReplies(greeting.quickReplies);
  }

  handleUserMessage(text) {
    this.appendMessage('user', text);
    this.renderQuickReplies([]);

    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const result = processBotQuery(text);
      this.appendMessage('bot', result.text);
      this.renderQuickReplies(result.quickReplies);
    }, 350);
  }

  showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'numa-bot-typing-indicator';
    typing.className = 'numa-bot-msg bot';
    typing.innerHTML = `
      <div class="numa-bot-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    this.messagesListEl.appendChild(typing);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typing = document.getElementById('numa-bot-typing-indicator');
    if (typing) typing.remove();
  }

  appendMessage(role, rawText) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `numa-bot-msg ${role}`;

    const formattedHtml = this.formatMarkdown(rawText);
    msgDiv.innerHTML = `
      <div class="numa-bot-bubble">
        ${formattedHtml}
      </div>
    `;

    this.messagesListEl.appendChild(msgDiv);
    this.scrollToBottom();
  }

  renderQuickReplies(replies = []) {
    this.quickRepliesEl.innerHTML = '';
    if (!replies || replies.length === 0) return;

    replies.forEach(replyText => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'numa-bot-chip';
      chip.textContent = replyText;
      chip.addEventListener('click', () => {
        if (replyText.includes('Abrir Formulario') || replyText.includes('Agendar Cita')) {
          const bookingModal = document.getElementById('booking-modal');
          if (bookingModal) {
            bookingModal.classList.add('is-open');
            this.close();
            return;
          }
        }
        if (replyText.includes('WhatsApp')) {
          window.open('https://wa.me/528120654457?text=Hola%20Valery%20%F0%9F%8C%9F%20quisiera%20informaci%C3%B3n%20sobre%20tus%20sesiones', '_blank');
          return;
        }
        this.handleUserMessage(replyText);
      });
      this.quickRepliesEl.appendChild(chip);
    });

    this.scrollToBottom();
  }

  formatMarkdown(text = '') {
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Links [texto](url)
    safe = safe.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--color-gold); text-decoration: underline;">$1</a>');

    // Negritas: **texto**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Cursivas: *texto*
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Líneas y viñetas
    const lines = safe.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('• ')) {
        const itemContent = trimmed.substring(2);
        return `<div style="margin-left: 6px; margin-bottom: 3px;">• ${itemContent}</div>`;
      }
      return trimmed ? `<p style="margin: 0.25rem 0;">${trimmed}</p>` : '<div style="height: 0.35rem;"></div>';
    });

    return processedLines.join('');
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.messagesListEl.scrollTop = this.messagesListEl.scrollHeight;
    });
  }
}
