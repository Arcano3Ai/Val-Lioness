/**
 * Motor de Respuestas de Asistente Virtual para Valery Lioness · Soul Healer
 */

function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

const TAROT_CARDS = [
  {
    name: "XVII · La Estrella",
    element: "Aire / Esperanza",
    message: "La calma regresa después de cualquier tormenta. Es momento de confiar plenamente en el flujo de la vida, sanar viejas heridas y permitir que tu luz interior brille con seguridad.",
    advice: "Decreta hoy: 'Confío en mi guía divina y en mi poder de renacimiento'."
  },
  {
    name: "III · La Emperatriz",
    element: "Tierra / Abundancia",
    message: "Estás en un ciclo de fertilidad creativa, magnetismo y nutrición espiritual. Abre tus brazos para recibir aquello que con tanto amor has sembrado.",
    advice: "Conecta con el placer de cuidarte y honrar tu templo corporal."
  },
  {
    name: "XIX · El Sol",
    element: "Fuego / Claridad",
    message: "La sombra se disipa y la verdad se revela con calidez. Este es un recordatorio de que tu energía es vital y capaz de transformar cualquier obstáculo en sabiduría.",
    advice: "Celebra tus pequeños y grandes logros; la victoria ya es tuya."
  },
  {
    name: "I · El Mago",
    element: "Mercurio / Manifestación",
    message: "Todos los elementos necesarios para crear tu nueva realidad están sobre tu mesa sagrada: mente, emoción, espíritu y acción. No esperes el momento perfecto; créalo tú.",
    advice: "Enfoca tu intención en un solo objetivo y actúa con certeza."
  },
  {
    name: "II · La Suma Sacerdotisa",
    element: "Agua / Intuición",
    message: "No busques respuestas afuera de ti. Lo que tu alma necesita saber ya está pulsando en tu silencio. Confía en las señales sutiles y los sueños lúcidos.",
    advice: "Dedica hoy unos minutos a la meditación o al silencio consciente."
  },
  {
    name: "VIII · La Fuerza",
    element: "Fuego / Coraje Serena",
    message: "La verdadera fuerza no nace de la imposición ni del control, sino de la compasión y la ternura con la que abrazas tus propias vulnerabilidades.",
    advice: "Sé paciente y amorosa contigo misma en este proceso de cambio."
  },
  {
    name: "X · La Rueda de la Fortuna",
    element: "Éter / Nuevos Ciclos",
    message: "Un ciclo kármico se cierra para dar paso a un movimiento favorable. Fluye con los giros del destino; cada cambio trae una bendición disfrazada.",
    advice: "Suelta lo que ya cumplió su ciclo y da la bienvenida a lo nuevo."
  }
];

export function processBotQuery(rawQuery = '') {
  const query = normalizeText(rawQuery);

  // 1. Saludo inicial
  if (!query || query === 'hola' || query === 'buenas' || query === 'inicio' || query === 'menu') {
    return {
      text: `¡Bienvenida a este espacio sagrado! Soy tu guía oracular en **Valery Lioness · Soul Healer** ✨

Un lugar para comprender, sanar y tomar decisiones desde tu verdadero poder interior.

¿Te gustaría revelar tu **Carta del Día**, conocer los servicios de Tarot y sanación, o agendar una sesión privada?`,
      quickReplies: ['🔮 Carta del Día', '🃏 Tarot y Precios', '🌿 Terapias de Sanación', '📅 Agendar Cita']
    };
  }

  // 2. Oráculo / Carta del Día
  if (query.includes('carta del dia') || query.includes('oraculo') || query.includes('tirada') || query.includes('mensaje del alma')) {
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    return {
      text: `✨ **Tu Mensaje del Oráculo para Hoy:**

🎴 **${card.name}** *(Frecuencia: ${card.element})*

«${card.message}»

🕯️ **Consejo de Valery:** ${card.advice}

*(Esta es una lectura oracular breve. Para profundizar en tu situación personal, amor, camino de vida o bloqueos, puedes agendar tu lectura completa con Valery).*`,
      quickReplies: ['📅 Agendar Tarot ($249 Promo)', '🔮 Otra Carta', '💬 Consultar por WhatsApp']
    };
  }

  // 3. Tarot y lecturas
  if (query.includes('tarot') || query.includes('lectura') || query.includes('precio tarot')) {
    return {
      text: `**Lecturas de Tarot & Orientación:**
• **Tarot Terapéutico (Promoción Especial):** $249 MXN
• **Tarot General:** $250 MXN
• **Tarot Terapéutico Completo:** $550 MXN
• **Consulta Presencial (Monterrey):** $400 MXN

Sesiones canalizadas para brindarte dirección, claridad emocional y respuestas concretas.

¿Deseas agendar tu espacio o consultar dudas con Valery?`,
      quickReplies: ['📅 Agendar Cita', '🔮 Carta del Día', '💬 WhatsApp']
    };
  }

  // 3. Terapias energéticas y sanación
  if (
    query.includes('terapia') ||
    query.includes('sanacion') ||
    query.includes('chakra') ||
    query.includes('aura') ||
    query.includes('energia') ||
    query.includes('adn') ||
    query.includes('utero') ||
    query.includes('adiccion') ||
    query.includes('pareja') ||
    query.includes('777') ||
    query.includes('cuantica')
  ) {
    return {
      text: `**Terapias Energéticas:**
• **Alineación de Chakras:** $240 MXN
• **Armonización del Aura:** $250 MXN
• **Sanación del Pasado:** $444 MXN
• **Sanación de Adicciones:** $494 MXN
• **Sanación del ADN:** $550 MXN
• **Sanación de Pareja:** $690 MXN
• **Sanación de Útero:** $725 MXN
• **Sesión 777:** $777 MXN
• **Cirugía Cuántica Angelical:** $793 MXN

Procesos profundos guiados para desbloquear cargas energéticas y restaurar tu armonía.`,
      quickReplies: ['📅 Agendar Cita', '🃏 Tarot y Precios', '💬 WhatsApp']
    };
  }

  // 4. Bienestar y otros servicios
  if (
    query.includes('bienestar') ||
    query.includes('masaje') ||
    query.includes('maderoterapia') ||
    query.includes('acupuntura') ||
    query.includes('reiki') ||
    query.includes('angelical') ||
    query.includes('flores') ||
    query.includes('cuarzo') ||
    query.includes('numerologia')
  ) {
    return {
      text: `**Bienestar y Terapias Complementarias:**
• **Masaje Holístico Relajante:** $850 MXN
• **Maderoterapia:** Consultar
• **Acupuntura:** Consultar
• **Terapia Angelical / Reiki / Numerología:** Consultar
• **Flores de Bach / Limpiezas Energéticas:** Consultar

Puedes consultar fechas disponibles y detalles directamente con Valery.`,
      quickReplies: ['📅 Agendar Cita', '🃏 Tarot y Precios', '💬 WhatsApp']
    };
  }

  // 5. Agendar Cita / Reserva / Horarios
  if (query.includes('agendar') || query.includes('cita') || query.includes('reserva') || query.includes('horario') || query.includes('fecha')) {
    return {
      text: `Puedes solicitar tu cita ahora mismo:

1. A través de nuestro **formulario interactivo** en esta página.
2. Directamente vía **WhatsApp** para atención personalizada con Valery.

¿Qué modalidad te resulta más cómoda?`,
      quickReplies: ['📅 Abrir Formulario de Cita', '💬 Escribir a WhatsApp']
    };
  }

  // 6. Ubicación / Modalidad presencial y online
  if (query.includes('donde') || query.includes('ubicacion') || query.includes('lugar') || query.includes('monterrey') || query.includes('presencial') || query.includes('online')) {
    return {
      text: `**Modalidades de Atención:**
• **Presencial:** Sesiones privadas en Monterrey, Nuevo León.
• **Online:** Sesiones por videollamada o WhatsApp a cualquier ciudad o país.

Ambas modalidades cuentan con la misma profundidad, atención y calidez.`,
      quickReplies: ['📅 Agendar Cita', '💬 WhatsApp']
    };
  }

  // 7. Contacto directo / WhatsApp
  if (query.includes('whatsapp') || query.includes('contacto') || query.includes('telefono') || query.includes('celular') || query.includes('mensaje')) {
    return {
      text: `Puedes comunicarte de manera directa con Valery en WhatsApp:

📱 **+52 81 2065 4457**

Estará encantada de responder tus preguntas y confirmar el horario de tu sesión.`,
      quickReplies: ['💬 WhatsApp', '🃏 Tarot y Precios', '📅 Agendar Cita']
    };
  }

  // 8. Respuesta por defecto
  return {
    text: `Con gusto te acompaño. ¿Te gustaría conocer detalles de alguna de las siguientes opciones?

• Información y precios de **Tarot**
• **Terapias Energéticas** y sanación
• **Agendar tu Cita** presencial u online
• Contacto directo por **WhatsApp**`,
    quickReplies: ['🃏 Tarot y Precios', '🌿 Terapias de Sanación', '📅 Agendar Cita', '💬 WhatsApp']
  };
}
