export const site = {
  name: 'Instituto Bicalho',
  tagline: 'Odontologia de Precisão',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://institutobicalho.com',
};
export type Unit = { id: string; name: string; phone: string; display: string; note: string; address: string; mapLocation: string; landmark?: string; onlineBooking?: string };
export const units: Unit[] = [
  { id: 'joao-monlevade', name: 'João Monlevade', phone: '5531992957448', display: '(31) 99295-7448', note: 'Nossa equipe espera por você em João Monlevade.', address: 'Av. Gentil Bicalho, 384, 2º andar, Carneirinhos', mapLocation: 'Av. Gentil Bicalho, 384, Carneirinhos, João Monlevade - MG, Brasil', onlineBooking: 'https://agenda.link/os/116828' },
  // Exact point in the official BH Point location link. Suite text can geocode to an unrelated business.
  { id: 'belo-horizonte', name: 'Belo Horizonte', phone: '5531997954111', display: '(31) 99795-4111', note: 'O cuidado do Instituto também em Belo Horizonte.', address: 'Av. Barão Homem de Melo, 55, loja 12, Nova Granada', mapLocation: '-19.935259,-43.9718161', landmark: 'BH Point' },
];
// Official profile URLs supplied by the user.
export const socialLinks: { name: string; icon: string; url: string | null }[] = [
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/institutobicalhoodontologia/' },
  { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/institutobicalho/' },
];
export const agencyUrl = 'https://www.aguiadigital.com/';
export const mapQuery = (unit: Unit) => unit.mapLocation;
export const directions = (unit: Unit) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(unit))}`;
export const mapEmbed = (unit: Unit) => `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery(unit))}&z=16&output=embed`;
export const whatsapp = (phone: string) => `https://wa.me/${phone}?text=${encodeURIComponent('Olá! Vim pelo site do Instituto Bicalho e gostaria de agendar uma avaliação.')}`;
export const nav = [
  { href: '/', label: 'Início' },
  { href: '/tratamentos/', label: 'Tratamentos' },
  { href: '/estetica/', label: 'Estética' },
  { href: '/ortodontia-e-cirurgia/', label: 'Ortodontia e Cirurgia' },
  { href: '/odontologia-de-precisao/', label: 'Odontologia de Precisão' },
];
export const media = {
  smile: { src: 'smile', alt: 'Imagem ilustrativa de um sorriso natural', position: '40% 40%' },
  hero: { src: 'hero-branded', alt: 'Cena ilustrativa de uma conversa acolhedora entre dentista e paciente', position: '100% 45%' },
  aligners: { src: 'aligners', alt: 'Cena ilustrativa de uma dentista apresentando um alinhador transparente à paciente', position: '50% 40%' },
  precision: { src: 'precision-branded', alt: 'Cena ilustrativa de escaneamento e planejamento odontológico digital', position: 'center' },
  partnerOne: { src: 'partner-01', alt: 'Sócio do Instituto Bicalho em retrato institucional', position: '50% 27%' },
  partnerTwo: { src: 'partner-02', alt: 'Sócia do Instituto Bicalho em retrato institucional', position: '50% 28%' },
  professional: { src: 'professional-01', alt: 'Profissional do Instituto Bicalho em retrato institucional', position: '50% 28%' },
};
export type Service = { id: string; title: string; text: string };
export type Area = { slug: string; title: string; short: string; heading: string; intro: string; icon: string; image: keyof typeof media; services: Service[]; questions: [string, string][] };
export const areas: Area[] = [
  {
    slug: 'tratamentos', title: 'Tratamentos', short: 'Saúde e função para o seu sorriso.', heading: 'Cuidado completo para a sua saúde bucal.', icon: 'tooth', image: 'hero',
    intro: 'Da prevenção à reabilitação oral, cada cuidado começa por entender você. Nossa equipe reúne diferentes áreas da odontologia para construir um planejamento individualizado.',
    services: [
      { id: 'implantes-dentarios', title: 'Implantes dentários', text: 'Uma possibilidade para a reposição de dentes ausentes. A avaliação considera a saúde bucal, a estrutura óssea e as necessidades de cada pessoa antes de definir o planejamento.' },
      { id: 'proteses-dentarias', title: 'Próteses dentárias', text: 'Soluções para recuperar dentes ausentes, a mastigação e a harmonia do sorriso. O planejamento pode incluir próteses convencionais ou sobre implantes, conforme a avaliação.' },
      { id: 'coroas-dentarias', title: 'Coroas dentárias', text: 'Restaurações que recobrem a estrutura de um dente quando há indicação clínica. Material, formato e adaptação são definidos de acordo com a função e as características do sorriso.' },
      { id: 'tratamento-de-canal', title: 'Tratamento de canal', text: 'Cuidado endodôntico voltado à parte interna do dente. O diagnóstico orienta a indicação e as etapas do tratamento, buscando preservar o dente quando possível.' },
      { id: 'restauracoes', title: 'Restaurações', text: 'Reconstrução de partes do dente comprometidas por cáries, fraturas ou desgaste. A avaliação considera a extensão da alteração e a melhor forma de recuperar função e aparência.' },
      { id: 'prevencao', title: 'Prevenção', text: 'Acompanhamento da saúde bucal, orientação de higiene e cuidados preventivos individualizados. A frequência das consultas é definida a partir das necessidades de cada paciente.' },
      { id: 'odontopediatria', title: 'Odontopediatria', text: 'Atenção à saúde bucal de crianças, com acolhimento e orientação à família. O cuidado acompanha as fases do desenvolvimento e incentiva hábitos de prevenção desde cedo.' },
      { id: 'periodontia', title: 'Periodontia', text: 'Avaliação e cuidado das gengivas e dos tecidos que sustentam os dentes. O planejamento inclui orientação, tratamento quando indicado e acompanhamento da saúde periodontal.' },
      { id: 'reabilitacao-oral', title: 'Reabilitação oral', text: 'Um planejamento integrado para casos que envolvem diferentes necessidades, como dentes ausentes, desgaste e alterações na mastigação. As etapas são organizadas de forma individual.' },
    ],
    questions: [ ['Por onde começar meu tratamento?', 'O primeiro passo é uma avaliação. A equipe escuta suas necessidades, avalia sua saúde bucal e explica as possibilidades e as etapas indicadas para você.'], ['Posso tratar mais de uma necessidade no Instituto?', 'O Instituto reúne profissionais de diferentes áreas. Na avaliação, a equipe organiza o cuidado e informa onde cada etapa pode ser realizada.'] ],
  },
  {
    slug: 'estetica', title: 'Estética', short: 'Harmonia que respeita a sua identidade.', heading: 'Seu sorriso. Sua expressão. Sua identidade.', icon: 'spark', image: 'smile',
    intro: 'Estética do sorriso e harmonização orofacial com atenção às suas características. O planejamento une saúde, função e suas expectativas, sem fórmulas iguais para todo mundo.',
    services: [
      { id: 'facetas', title: 'Facetas', text: 'Uma opção para modificar características como forma e cor dos dentes, quando indicada. Antes do tratamento, avaliamos a saúde bucal, a mordida e as características da estrutura dental.' },
      { id: 'lentes-de-contato-dental', title: 'Lentes de contato dental', text: 'Laminados cerâmicos planejados de acordo com o sorriso. A indicação, a espessura e a necessidade de preparo dependem da avaliação de cada dente e dos objetivos do tratamento.' },
      { id: 'clareamento-dental', title: 'Clareamento dental', text: 'Tratamento para modificar a tonalidade dos dentes com acompanhamento profissional. A técnica e os cuidados são definidos após avaliação; a resposta varia entre as pessoas.' },
      { id: 'harmonizacao-orofacial', title: 'Harmonização orofacial', text: 'Avaliação das proporções e características da face para um planejamento individualizado. Na consulta, o profissional explica indicações, limites e cuidados dos procedimentos propostos.' },
    ],
    questions: [ ['Como saber qual procedimento é indicado?', 'A escolha começa por uma avaliação da saúde bucal e uma conversa sobre suas expectativas. O profissional apresenta possibilidades, cuidados e limites antes de qualquer decisão.'], ['O planejamento considera meu sorriso natural?', 'Sim. As características da face, dos dentes e da mordida fazem parte da avaliação, junto com suas preferências e as possibilidades clínicas.'] ],
  },
  {
    slug: 'ortodontia-e-cirurgia', title: 'Ortodontia e Cirurgia', short: 'Planejamento e cuidado em cada etapa.', heading: 'Cada movimento começa com um bom planejamento.', icon: 'align', image: 'aligners',
    intro: 'Do alinhamento dos dentes aos cuidados cirúrgicos, o diagnóstico orienta cada decisão. Uma equipe integrada para explicar o caminho e acompanhar suas etapas.',
    services: [
      { id: 'ortodontia', title: 'Ortodontia', text: 'Avaliação do posicionamento dos dentes e da mordida. O tratamento e o acompanhamento são planejados a partir do diagnóstico, da fase de desenvolvimento e das necessidades individuais.' },
      { id: 'alinhadores-transparentes', title: 'Alinhadores transparentes', text: 'Uma alternativa ortodôntica removível para casos com indicação. O planejamento define a sequência de alinhadores e o acompanhamento; o uso conforme orientação é parte do tratamento.' },
      { id: 'extracao-de-sisos', title: 'Extração de sisos', text: 'A necessidade de remover os terceiros molares é avaliada por exame clínico e, quando indicado, exames de imagem. A equipe orienta sobre o procedimento e os cuidados de recuperação.' },
      { id: 'cirurgia-bucomaxilofacial', title: 'Cirurgia bucomaxilofacial', text: 'Avaliação e tratamento cirúrgico de condições da boca, dos maxilares e de estruturas relacionadas. O diagnóstico define o procedimento, a estrutura necessária e o acompanhamento.' },
      { id: 'cirurgias-com-sedacao', title: 'Cirurgias com sedação', text: 'A sedação pode integrar o planejamento de procedimentos selecionados. Sua indicação depende da avaliação de saúde, do procedimento e da equipe responsável. Consulte a disponibilidade por unidade.' },
      { id: 'biopsias', title: 'Realização de biópsias', text: 'Quando indicada, a coleta de uma amostra de tecido auxilia a investigação de alterações na boca. A avaliação profissional orienta a necessidade, o exame e os próximos cuidados.' },
      { id: 'tratamento-de-dtm', title: 'Tratamento de DTM', text: 'Avaliação de disfunções que podem envolver os músculos da mastigação e a articulação da mandíbula. O cuidado é definido a partir do diagnóstico e pode envolver diferentes abordagens.' },
      { id: 'avaliacao-da-atm', title: 'Avaliação e tratamento da ATM', text: 'Investigação de queixas relacionadas à articulação temporomandibular, como dor ou dificuldade de movimento. O exame individual orienta os cuidados e a necessidade de acompanhamento.' },
      { id: 'bruxismo', title: 'Bruxismo', text: 'Avaliação do apertamento ou ranger dos dentes e de seus possíveis efeitos. O acompanhamento busca compreender cada caso e orientar medidas de cuidado e proteção quando indicadas.' },
    ],
    questions: [ ['Todo caso pode ser tratado com alinhadores?', 'A indicação depende da avaliação ortodôntica. O profissional considera a mordida, os movimentos necessários e as condições de saúde bucal para apresentar as alternativas.'], ['Como saber em qual unidade realizar uma cirurgia?', 'Fale com a equipe da unidade de sua preferência. Ela confirma a disponibilidade e orienta sobre a avaliação e o local adequado para o procedimento.'] ],
  },
  {
    slug: 'odontologia-de-precisao', title: 'Odontologia de Precisão', short: 'Tecnologia a serviço de um cuidado individual.', heading: 'Tecnologia que aproxima. Precisão que faz diferença.', icon: 'scan', image: 'precision',
    intro: 'Ferramentas digitais ajudam a registrar, planejar e acompanhar o cuidado. A tecnologia faz parte de um processo guiado pelo conhecimento clínico e pela atenção a cada pessoa.',
    services: [
      { id: 'escaneamento-intraoral', title: 'Escaneamento intraoral', text: 'Registro digital das estruturas da boca por meio de um scanner. As imagens podem apoiar o planejamento e a comunicação entre as etapas do tratamento, conforme a indicação.' },
      { id: 'planejamento-digital-do-sorriso', title: 'Planejamento digital do sorriso', text: 'Recursos digitais auxiliam a análise do sorriso e a discussão das possibilidades de tratamento. Simulações são instrumentos de planejamento e não garantias de resultado.' },
      { id: 'laboratorio-digital', title: 'Laboratório digital', text: 'Integração entre registros digitais, planejamento e produção de peças odontológicas. Esse fluxo aproxima as informações clínicas e laboratoriais ao longo do cuidado.' },
      { id: 'proteses-e-restauracoes-digitais', title: 'Próteses e restaurações digitais', text: 'Planejamento e confecção apoiados por recursos digitais, considerando a adaptação, a função e as características de cada caso. A indicação e os ajustes seguem a avaliação clínica.' },
    ],
    questions: [ ['A tecnologia substitui a avaliação do dentista?', 'Não. Os recursos digitais apoiam o trabalho clínico. A avaliação, a indicação e o acompanhamento continuam sendo realizados pelos profissionais.'], ['O fluxo digital é utilizado em todos os tratamentos?', 'Os recursos são escolhidos conforme a necessidade de cada caso. Na avaliação, a equipe explica quais ferramentas fazem sentido para o seu planejamento.'] ],
  },
];
export const team = [
  { name: 'Dr. Bruno Bicalho', role: 'Sócio-proprietário', kind: 'Especialidades', work: 'Implantodontia e Cirurgia Bucomaxilofacial.' },
  { name: 'Dra. Roberta Bicalho', role: 'Sócia-proprietária', kind: 'Especialidades', work: 'Ortodontia e tratamento com alinhadores invisíveis.' },
  { name: 'Dra. Isabella Mazarelo', role: '', kind: 'Áreas de atuação', work: 'Harmonização Orofacial (HOF) e Clínica Geral.' },
  { name: 'Dra. Jéssica Bonfim', role: '', kind: 'Áreas de atuação', work: 'Implantodontia, Próteses Dentárias, Reabilitação Oral e Próteses sobre Implantes.' },
  { name: 'Dra. Lívia Teixeira', role: '', kind: 'Áreas de atuação', work: 'Prótese Dentária, Dentística, Facetas e Odontologia Estética.' },
  { name: 'Dra. Daniele', role: '', kind: 'Áreas de atuação', work: 'Cirurgias Odontológicas e Clínica Geral.' },
  { name: 'Dra. Mariane Barros', role: '', kind: 'Áreas de atuação', work: 'Clínica Geral, Clareamento Dental, Prevenção e Saúde Bucal e Restaurações.' },
  { name: 'Dra. Thaís dos Anjos', role: '', kind: 'Especialidades', work: 'Periodontia, ATM e DTM e tratamento do Bruxismo.' },
  { name: 'Dr. Paulo', role: '', kind: 'Especialidade', work: 'Ortodontia.' },
  { name: 'Dra. Ana Luiza Perdigão', role: '', kind: 'Especialidade', work: 'Odontopediatria.' },
  { name: 'Dra. Anne Sousa', role: '', kind: 'Especialidade', work: 'Endodontia — tratamento de canal.' },
  { name: 'Dra. Luísa Lima', role: 'Equipe de Belo Horizonte', kind: 'Áreas de atuação', work: 'Prótese Dentária, Clínica Geral e Harmonização Orofacial (HOF).' },
];
export const homeQuestions: [string, string][] = [
  ['Como agendar uma avaliação?', 'Em João Monlevade, você pode consultar horários na agenda online ou falar pelo WhatsApp. Em Belo Horizonte, o agendamento é pelo WhatsApp da unidade. Se tiver dúvidas, nossa equipe orienta você antes de marcar.'],
  ['O Instituto atende nas duas cidades?', 'Sim. O Instituto Bicalho está presente em João Monlevade e Belo Horizonte. Consulte a equipe sobre a disponibilidade do procedimento na unidade de sua preferência.'],
  ['Como funciona a primeira consulta?', 'É o momento de conhecer suas necessidades, conversar sobre sua saúde bucal e avaliar as possibilidades de cuidado. A equipe explica as próximas etapas e os exames necessários, quando indicados.'],
  ['Como consultar valores e formas de pagamento?', 'O planejamento e o orçamento dependem da avaliação individual. A equipe apresenta as etapas propostas e as condições de pagamento antes de você decidir pelo tratamento.'],
];
