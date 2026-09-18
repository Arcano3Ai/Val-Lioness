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

export function processBotQuery(rawQuery = '') {
  const query = normalizeText(rawQuery);

  // 1. Saludo inicial
  if (!query || query === 'hola' || query === 'buenas' || query === 'inicio' || query === 'menu') {
    return {
      text: `¡Hola! Te doy la bienvenida al espacio de **Valery Lioness · Soul Healer** ✨

Un lugar sagrado para comprender, sanar y tomar decisiones desde tu propio poder.

¿En qué podemos acompañarte el día de hoy?`,
      quickReplies: ['🃏 Tarot y Precios', '🌿 Terapias de Sanación', '📅 Agendar Cita', '💬 WhatsApp']
    };
  }

  // 2. Tarot y lecturas
  if (query.includes('tarot') || query.includes('lectura') || query.includes('carta') || query.includes('oraculo')) {
    return {
      text: `**Lecturas de Tarot & Orientación:**
• **Tarot:** $250 MXN
• **Tarot Terapéutico:** $550 MXN
• **Tarot Terapéutico (Promoción):** $249 MXN
• **Consulta presencial:** $400 MXN

Todas las sesiones están enfocadas en brindarte claridad, dirección y equilibrio emocional.

¿Deseas agendar tu sesión o tienes alguna duda específica?`,
      quickReplies: ['📅 Agendar Cita', '🌿 Terapias de Sanación', '💬 WhatsApp']
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
