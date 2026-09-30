import { areas, units, homeQuestions, directions, type Unit } from '../data/content';
export type Stage = 'start' | 'doubts' | 'areas' | 'services' | 'answer' | 'patients' | 'unit' | 'channels' | 'review';
export type Conversation = {
  stage: Stage; intent?: 'booking' | 'question' | 'patient'; area?: string; service?: string;
  unit?: string; answer?: string; choices: string[]; note: string;
};
export const initialConversation = (): Conversation => ({ stage: 'start', choices: [], note: '' });
export function prepareMessage(state: Conversation, unit: Unit): string {
  return ['Olá! Vim pelo site do Instituto Bicalho.', `Unidade: ${unit.name}.`,
    `Assunto: ${state.choices.join(' → ') || 'Falar com a equipe'}.`,
    ...(state.note.trim() ? [`Observação: ${state.note.trim()}`] : []),
    'Gostaria de receber orientação da equipe.'].join('\n');
}
export function initAssistant(onVisibilityChange: () => void) {
  const dialog = document.querySelector<HTMLDialogElement>('#support-dialog')!;
  const launcher = document.querySelector<HTMLButtonElement>('.assistant-launcher')!;
  const log = document.querySelector<HTMLElement>('#support-history')!;
  const actions = document.querySelector<HTMLElement>('#support-actions')!;
  const scroll = dialog.querySelector<HTMLElement>('.support-scroll')!;
  const back = dialog.querySelector<HTMLButtonElement>('[data-support-back]')!;
  type Message = { who: 'assistant' | 'visitor'; text: string };
  type Snapshot = { state: Conversation; messages: Message[] };
  let state = initialConversation();
  let messages: Message[] = [];
  const previous: Snapshot[] = [];
  function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string) {
    const element = document.createElement(tag); element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  const unit = () => units.find(u => u.id === state.unit);
  function prompt(): string {
    switch (state.stage) {
      case 'start': return 'Olá! Sou a assistente virtual Bicalho. Como posso ajudar você hoje?';
      case 'doubts': return 'Sobre qual assunto você gostaria de saber mais?';
      case 'areas': return 'Qual área de cuidado você quer conhecer?';
      case 'services': return 'Qual procedimento despertou seu interesse?';
      case 'answer': return state.answer || '';
      case 'patients': return 'Que bom ter você por aqui. Do que você precisa?';
      case 'unit': return 'Em qual unidade você prefere receber atendimento?';
      case 'channels': return unit()?.onlineBooking ? 'Em João Monlevade, você pode consultar a agenda online agora ou conversar com a equipe. Qual caminho prefere?' : 'Em Belo Horizonte, o agendamento é feito com a equipe pelo WhatsApp. Vamos preparar sua mensagem?';
      case 'review': return `Tudo pronto para falar com a equipe de ${unit()?.name}. Confira o resumo e acrescente uma observação, se quiser.`;
    }
  }
  function paintMessages() {
    // Keep existing log nodes so assistive technology announces only new messages.
    const nodes = [...log.children];
    let shared = 0;
    while (shared < nodes.length && shared < messages.length && nodes[shared].textContent === messages[shared].text) shared++;
    nodes.slice(shared).forEach(node => node.remove());
    messages.slice(shared).forEach(message => {
      const bubble = el('p', `chat-bubble chat-${message.who}`, message.text);
      bubble.setAttribute('aria-label', `${message.who === 'assistant' ? 'Assistente' : 'Você'}: ${message.text}`);
      log.append(bubble);
    });
  }
  function advance(label: string, patch: Partial<Conversation>, record = true) {
    previous.push({ state: structuredClone(state), messages: structuredClone(messages) });
    state = { ...state, ...patch, choices: record ? [...state.choices, label] : state.choices };
    messages.push({ who: 'visitor', text: label }, { who: 'assistant', text: prompt() });
    render(true);
  }
  function option(label: string, patch: Partial<Conversation>, record = true) {
    const button = el('button', 'chat-choice', label); button.type = 'button';
    button.addEventListener('click', () => advance(label, patch, record)); actions.append(button);
  }
  function external(label: string, url: string, kind?: 'whatsapp' | 'onlineBooking') {
    const link = el('a', 'chat-choice chat-external', label); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    if (kind) { link.dataset[kind] = state.unit!; link.dataset.position = 'assistant'; }
    if (kind === 'whatsapp') link.append(document.querySelector<HTMLTemplateElement>('#whatsapp-icon')!.content.cloneNode(true));
    actions.append(link); return link;
  }
  function render(moveFocus = false) {
    paintMessages(); actions.replaceChildren(); back.disabled = previous.length === 0;
    const nextUnit = { stage: 'unit' as const, unit: undefined };
    switch (state.stage) {
      case 'start':
        option('Quero agendar', { ...nextUnit, intent: 'booking' });
        option('Tenho dúvidas', { stage: 'doubts', intent: 'question' });
        option('Já sou paciente', { stage: 'patients', intent: 'patient' }); break;
      case 'doubts':
        option('Tratamentos', { stage: 'areas' });
        option('Primeira consulta', { stage: 'answer', answer: homeQuestions[2][1] });
        option('Valores e pagamento', { stage: 'answer', answer: homeQuestions[3][1] });
        option('Localização', { stage: 'answer', answer: units.map(u => `${u.name}: ${u.address}${u.landmark ? `, no ${u.landmark}` : ''}.`).join('\n\n') });
        option('Outro assunto', { stage: 'answer', answer: 'Nossa equipe pode orientar você. Escolha uma unidade e, na próxima etapa, acrescente uma observação ao resumo se desejar.' }); break;
      case 'areas': areas.forEach(area => option(area.title, { stage: 'services', area: area.slug })); break;
      case 'services': areas.find(a => a.slug === state.area)!.services.forEach(service => option(service.title, { stage: 'answer', service: service.id, answer: service.text })); break;
      case 'answer':
        if (state.choices.at(-1) === 'Localização') units.forEach(u => external(`Como chegar · ${u.name}`, directions(u)));
        option('Continuar com a equipe', nextUnit, false); break;
      case 'patients':
        ['Retorno', 'Consulta agendada', 'Falar com a equipe'].forEach(label => option(label, nextUnit)); break;
      case 'unit': units.forEach(u => option(u.name, { unit: u.id, stage: state.intent === 'booking' ? 'channels' : 'review' }, false)); break;
      case 'channels':
        if (unit()?.onlineBooking) {
          external('Agendar online · João Monlevade ↗', unit()!.onlineBooking!, 'onlineBooking');
          actions.append(el('p', 'chat-hint', 'A agenda oficial abre em outra aba. Horários e confirmação são consultados nela.'));
        }
        option('Conversar pelo WhatsApp', { stage: 'review' }, false);
        option('Trocar unidade', nextUnit, false); break;
      case 'review': {
        const selected = unit()!;
        const label = el('label', 'chat-note-label', 'Observação (opcional)'); label.htmlFor = 'support-note';
        const textarea = el('textarea', 'chat-note'); textarea.id = 'support-note'; textarea.maxLength = 400; textarea.rows = 2;
        textarea.placeholder = 'Acrescente somente o necessário para o contato.'; textarea.value = state.note;
        textarea.setAttribute('aria-describedby', 'support-note-hint');
        const hint = el('p', 'chat-hint', 'Evite informar documentos, exames ou dados sensíveis. Até 400 caracteres.'); hint.id = 'support-note-hint';
        const summary = el('div', 'chat-summary'); summary.setAttribute('aria-label', 'Resumo da mensagem');
        const summaryTitle = el('strong', '', 'Sua mensagem para o Instituto');
        const text = el('p', '', prepareMessage(state, selected)); summary.append(summaryTitle, text);
        actions.append(label, textarea, hint, summary);
        const link = external('Continuar no WhatsApp', `https://wa.me/${selected.phone}?text=${encodeURIComponent(prepareMessage(state, selected))}`, 'whatsapp');
        textarea.addEventListener('input', () => { state.note = textarea.value; text.textContent = prepareMessage(state, selected); link.href = `https://wa.me/${selected.phone}?text=${encodeURIComponent(prepareMessage(state, selected))}`; });
        actions.append(el('p', 'chat-hint', 'Nada foi enviado. Você confirma o envio no WhatsApp.'));
        option('Trocar unidade', nextUnit, false); break;
      }
    }
    if (moveFocus) {
      const latest = log.lastElementChild as HTMLElement; latest.tabIndex = -1; latest.focus({ preventScroll: true });
      scroll.scrollTop = latest.offsetTop - 12;
      document.dispatchEvent(new CustomEvent('bicalho:chat-step', { detail: { element: actions } }));
    }
  }
  function reset() { state = initialConversation(); previous.length = 0; messages = [{ who: 'assistant', text: prompt() }]; render(true); }
  launcher.addEventListener('click', () => {
    if (!messages.length) { messages = [{ who: 'assistant', text: prompt() }]; render(); }
    dialog.showModal(); document.body.classList.add('modal-open'); onVisibilityChange();
    actions.querySelector<HTMLElement>('button, a')?.focus({ preventScroll: true });
  });
  dialog.querySelector('[data-support-close]')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); onVisibilityChange(); launcher.focus({ preventScroll: true }); });
  dialog.querySelector('[data-support-reset]')!.addEventListener('click', reset);
  dialog.querySelector('[data-support-human]')!.addEventListener('click', () => advance('Falar com a equipe', { stage: 'unit', unit: undefined, intent: state.intent === 'booking' ? 'question' : state.intent }, !state.choices.length));
  back.addEventListener('click', () => { const snapshot = previous.pop(); if (snapshot) { state = snapshot.state; messages = snapshot.messages; render(true); } });
  // The visual viewport shrinks when a mobile keyboard opens; the composer stays reachable.
  function resize() { if (window.visualViewport) { dialog.style.setProperty('--support-height', `${window.visualViewport.height}px`); dialog.style.setProperty('--support-top', `${window.visualViewport.offsetTop}px`); } }
  window.visualViewport?.addEventListener('resize', resize); window.visualViewport?.addEventListener('scroll', resize); resize();
}
