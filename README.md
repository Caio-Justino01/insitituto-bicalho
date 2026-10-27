# Instituto Bicalho

Site institucional em Astro + TypeScript, com HTML estático, seis páginas principais, três páginas de políticas e 404. Publicado em https://insitituto-bicalho.vercel.app/ via GitHub/Vercel; a URL temporária permanece fora da indexação.

## Revisão atual — composição original e fotos oficiais

As quatro páginas de serviços incluem uma faixa azul-escura com uma fotografia inédita da pasta do cliente, depois dos serviços e do aviso clínico, antes de “Conheça outras áreas de atendimento”. O componente compartilhado `ServicePhotoBand.astro` não acrescenta texto, legenda ou controles. A foto tem até 1240 px de largura, altura de 320 px abaixo de 1024 px e 440 px nas telas maiores. A Home foi preservada. O cadastro `Area.sectionImage` define a fotografia de cada página; a seleção completa está em `assets/PHOTO-SOURCES.md`.

A composição anterior foi restaurada: cabeçalho flutuante, botões em cápsula, superfícies de vidro, mosaico e movimento. `src/styles/responsive.css` concentra os ajustes de encaixe, tamanhos de texto, rodapé e painéis, sem substituir essa linguagem visual. Os textos, contatos, rotas e integrações permanecem preservados.

A seleção usa a recepção na hero, cenas de atendimento nas áreas de cuidado e a reunião no painel da equipe. Consultórios e atendimento geral ilustram institucionalmente as áreas sem registro específico de procedimento, conforme a escolha do cliente. Os retratos dos sócios ficam na apresentação institucional. `assets/PHOTO-SOURCES.md` registra os arquivos. Os derivados horizontais têm até 2936 px, WebP em qualidade 92 e AVIF em qualidade 72. Os originais permanecem intactos. A escolha de resolução considera o recorte ampliado, com verificação em telas 2× e 3× por `npm run test:photos`.

A navegação completa começa em 1200 px. As atualizações seguem o repositório `Caio-Justino01/insitituto-bicalho`, branch `main`, ligado ao projeto Vercel existente `insitituto-bicalho` e ao endereço https://insitituto-bicalho.vercel.app/. Na configuração local atual, esse repositório é o remoto `upstream`; `origin` aponta para o fork da Águia. A implantação Preview de 27/10/2026 pertence ao mesmo projeto. A indexação continua desativada; o domínio institucional e suas configurações foram preservados. A suíte inclui navegação, agendamento, consentimento, painéis, movimento, 230 verificações responsivas de 320 a 2560 px com texto a 200% e 204 verificações de resolução de fotografias em telas 2× e 3×, além do fallback sem JavaScript.

## Revisão para apresentação ao cliente — 27/10/2026

Os textos aprovados, títulos SEO, descrições, canonical e indexação foram preservados. A revisão acrescenta Open Graph e Twitter com descrições das imagens, WebSite/WebPage/ImageObject e os perfis oficiais das duas unidades no schema. `src/data/photos.ts` centraliza as descrições do HTML e do XMP incorporado nos arquivos WebP/AVIF. Não foram presumidos fotógrafo, licença ou localização das fotografias.

Os mapas agora identificam a clínica no Google, e os links de rotas usam o Place ID de cada unidade. Cada endereço inclui acesso às avaliações públicas, sem copiar depoimentos, notas ou contagens para o site. Telefones e endereços conferem com os perfis consultados:

- [João Monlevade — perfil oficial](https://www.google.com/maps/search/?api=1&query=Instituto+Bicalho+Joao+Monlevade&query_place_id=ChIJU1SbPXMHpQARw7UoLTBid8k).
- [Belo Horizonte — perfil oficial](https://www.google.com/maps/search/?api=1&query=Instituto+Bicalho+Belo+Horizonte&query_place_id=ChIJRWZqfhmXpgARwWg7SmnBfFY).

`npm run test:seo` confere as dez páginas, dados estruturados, compartilhamento, links do Google e XMP dos 184 derivados de imagem. A suíte `test:all` inclui essa verificação e a auditoria de resolução das fotografias. O teste de fotos também confere a posição e a ausência de textos nas novas faixas. Relatórios e capturas da revisão ficam em `artifacts/release-review/` e `artifacts/photo-quality/`.

Lighthouse local mobile desta revisão: desempenho 95, acessibilidade 100, boas práticas 100, LCP 2,8 s e CLS 0,032. A nota de SEO é 69 pelo bloqueio de indexação intencional da prévia; títulos, descrições, canonical e dados de imagens foram validados separadamente.

Pendências encontradas fora do site, nos perfis do Google: o link de uma postagem de João Monlevade usa o número incompleto `553192957448`, e o link de agendamento da filial usa `553197954111`. Os destinos corretos são `5531992957448` e `5531997954111`, respectivamente. João Monlevade também mantém `agenda.link/116828` em “Agendar on-line”, enquanto o fluxo aprovado do site usa WhatsApp. Esses campos externos não foram alterados nesta revisão.

Referências técnicas: [Google Search Central — imagens](https://developers.google.com/search/docs/appearance/google-images), [metadados das imagens](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) e [URLs do Google Maps](https://developers.google.com/maps/documentation/urls/get-started).

## Histórico da V2 — vidro, fotografia e movimento

Visual claro com Plus Jakarta Sans variável local (400–700), navegação flutuante, botões em cápsula, fotografias em molduras e vidro com fundo sólido de fallback. A Home tem quatro áreas no mosaico, composição editorial com retratos preservados, cena azul de odontologia digital, equipe de 14 profissionais em `details` nativo, perguntas e duas unidades com igual destaque. A legenda dos sócios usa os nomes fornecidos pelo cliente; não foram presumidas outras associações individuais.

`src/scripts/motion.ts` usa GSAP, ScrollTrigger e SplitText: títulos por linhas com máscara e nome acessível, entradas de fotografias e painéis, progressão do fluxo digital e interações breves. `gsap.matchMedia()` limpa e reconstrói efeitos nos breakpoints e na alteração de movimento reduzido. SplitText recompõe linhas em mudanças de largura. Seções já visitadas não repetem a entrada. A rolagem é nativa; o botão inicial não depende da animação. O bundle de movimento é separado do código de agendamento e consentimento; o HTML permanece legível sem JavaScript.

As políticas, rotas, metadados, sitemap, redirecionamentos, WhatsApp e atribuição foram preservados. Manrope e Source Sans 3 foram removidas. A V2 não ativou serviços externos. A V3 acrescenta mapas incorporados e atendimento guiado pelo WhatsApp, descritos abaixo.

## Executar

Node 24 LTS, fixado em `.nvmrc` e `package.json`.

```sh
npm ci
npm run dev
```

Para testar o resultado de produção, inclusive status HTTP e redirecionamentos:

```sh
npm run build
npm run preview
npm test
npm run test:flows
npm run test:cta
```

A prévia usa http://127.0.0.1:4321 e envia `X-Robots-Tag: noindex, follow`. Deixe `npm run preview` aberto em outro terminal durante os testes. `npm run test:all` executa a suíte completa. Localmente os testes usam Chrome instalado; em CI usam Chromium (`PLAYWRIGHT_CHANNEL=chromium`). Não enviam mensagens ou agendam consultas. `artifacts/` reúne capturas e resultados locais, fora do Git.

## Importar na Vercel

Repositório: https://github.com/Caio-Justino01/insitituto-bicalho .

1. Na Vercel, escolha **Add New → Project** e importe esse repositório, branch `main`.
2. Use **Astro**, diretório raiz `./`, Node **24.x**, instalação `npm ci`, build `npm run build`, saída `dist`. O `vercel.json` já registra os comandos, cache e redirecionamentos. Não é necessário adaptador SSR, banco ou backend.
3. Para a primeira revisão, mantenha `PUBLIC_INDEXABLE=false`. A URL temporária da Vercel funciona sem Google Analytics ou Search Console configurados.
4. Após aprovação e vinculação do domínio, configure `PUBLIC_SITE_URL=https://institutobicalho.com` e `PUBLIC_INDEXABLE=true` **somente no ambiente Production**. Faça um novo deploy para aplicar as variáveis de build. Deploys Preview permanecem com `noindex` mesmo se herdarem a variável `true`.
5. Quando disponíveis, preencha `PUBLIC_GA_ID` e `PUBLIC_GOOGLE_VERIFICATION`. Analytics depende de consentimento. Confira os itens de publicação abaixo antes da troca de DNS.

O GitHub Actions executa build, testes de navegação, acessibilidade, atendimento, consentimento, movimento e CTAs em cada push para `main` e em pull requests. Capturas e resultados ficam nos artefatos da execução por 14 dias. Falha no Actions não bloqueia automaticamente o deploy da Vercel: confira o resultado antes de promover a versão ao domínio.

Somente fontes, dependências travadas e imagens otimizadas são versionadas. `.env`, fotos originais, pesquisas, relatórios, `node_modules` e `dist` ficam fora do Git. A Vercel gera `dist` no build. Os scripts opcionais de processamento de imagens precisam dos originais locais; o build do site não depende deles.

## Ajustes finais de apresentação

Todos os CTAs de avaliação compartilham `BookingLink.astro`, símbolo B oficial e animação de pressão com GSAP. WhatsApp e agenda mantêm seus destinos próprios. A faixa dos retratos alinha as bordas laterais e inferior com a composição, com raio inferior de 24 px na segunda fotografia. Validação em 360, 390, 430, 768, 1024 e 1440 px, incluindo retorno de foco após fechar o agendamento pelo menu e pela barra mobile.

Medição histórica local Lighthouse (30/09/2026), em execuções sequenciais com rede/CPU mobile simuladas:

| Página | Desempenho mobile | LCP | CLS |
| --- | --- | --- | --- |
| Home | 97 | 2,5 s | 0 |
| Tratamentos | 99 | 2,0 s | 0 |
| Estética | 99 | 2,2 s | 0,001 |
| Ortodontia e Cirurgia | 99 | 2,0 s | 0 |
| Odontologia de Precisão | 98 | 2,1 s | 0 |

Todas obtiveram 100 em acessibilidade e boas práticas na auditoria automática. A Home desktop obteve 100 em desempenho, LCP 0,5 s. SEO 69 em todas por `noindex` intencional. Os relatórios estão em `artifacts/lighthouse-release-*.report.html` na máquina de desenvolvimento. Esses números são de laboratório local, não uma medição PageSpeed Insights de um domínio público, nem garantia de nota 100 ou desempenho real. Repetir no endereço da Vercel após o deploy. As medições V2/V3 abaixo são histórico, anteriores à entrega final.

## Página de Contato

`/contato/` reúne as unidades, WhatsApp, telefones, endereços e mapas. A aba Contato usa a navegação central em desktop, mobile, sem JavaScript, rodapé e sitemap. `Units.astro` recebe `contactFirst` (padrão false) para colocar os canais antes do mapa e `position` (padrão units) para identificar os cliques consentidos; a página Contato usa contact-units. `UnitChannels.astro` compartilha os mesmos canais e números entre todas as páginas. A Home e os serviços preservam sua ordem de apresentação e os links /#unidades. A nova página tem metadados próprios, canonical /contato/, breadcrumb e os mesmos dados estruturados das duas unidades, mantendo noindex nesta fase. Não foram acrescentados horários, e-mail ou formulário. A validação da entrega cobriu nove páginas, 36 verificações de largura, navegação sem JavaScript, teclado, texto ampliado e consentimento; mapas carregaram sem falhas. Capturas em artifacts/contact/.

## Conteúdo e imagens

Revisão da Home em 14/10/2026: textos aplicados conforme o Markdown "Textos da Home: Instituto Bicalho (site novo)" fornecido pelo cliente. Metadados e OG usam o title completo sem repetir a marca. `homeSummary` separa a redação dos cartões da descrição das páginas internas; o componente de unidades recebe o título da Home por propriedade opcional. Roberta Souza Carneiro e Anne Sousa foram corrigidas, e Stefany de Oliveira Lima e Veridiana Salles acrescentadas à equipe de Belo Horizonte. A referência a implantes na página de Ortodontia e Cirurgia aponta ao conteúdo existente em Tratamentos, sem duplicar o serviço no atendimento virtual.

O CSS da Home mantém o H1 em 34–36 px no celular e 44–56 px no desktop, legendas e textos secundários do fluxo digital em 14 px, sem alterar a tipografia das páginas internas. Conferência do conteúdo com o documento, 14 profissionais, seis larguras de 360–1440 px, ampliação de texto a 200%, painel nativo sem JavaScript e testes completos de navegação, consentimento, atendimento e movimento passaram.

Lighthouse mobile local nesta revisão: desempenho 94, acessibilidade 100 e boas práticas 100; LCP aproximadamente 2,5 s, CLS inferior a 0,001 e TBT 210 ms. SEO 69 pelo `noindex` intencional. Relatórios em `artifacts/home-copy/lighthouse-mobile.report.html` e `.json`, capturas na mesma pasta. Medição de laboratório com rede/CPU simuladas, sem garantia de pontuação ou desempenho em campo.

`src/data/content.ts` centraliza equipe, serviços, unidades, contatos e posições das imagens. Textos clínicos são introdutórios e precisam da conferência final da equipe. Não foram inventados registros profissionais, horários, avaliações ou estatísticas. Os endereços aprovados estão centralizados junto aos contatos.

Os originais estão em `assets/originals/`; imagens otimizadas ficam em `public/assets/`. Retratos originais não foram retocados. A fotografia HEIC foi convertida em `clinic-reference.jpg` para avaliação e permanece como referência, sem identificação presumida. As cenas antigas `hero`, `precision` e `smile` foram geradas por IA e foram substituídas na revisão de 26/10/2026; sua origem histórica permanece documentada nos prompts. Por solicitação do usuário, os avisos de produção foram removidos da interface pública e dos textos alternativos. Troque essas imagens por materiais aprovados mantendo o nome-base e execute `node scripts/assets.mjs` para gerar os quatro tamanhos de cada formato (480, 800, 1200 e 1600), ou atualize o componente Photo e o manifesto de mídia em conjunto. A capa prioriza carregamento e as outras fotos usam lazy loading. Os prompts completos estão em `assets/IMAGE-PROMPTS.md`.

## Google, consentimento e campanhas

Copie `.env.example` para `.env` apenas quando houver dados reais. `PUBLIC_INDEXABLE` é `false` por padrão. `PUBLIC_GA_ID` vazio não carrega analytics e não abre banner automaticamente. As preferências continuam acessíveis no rodapé. Com ID válido, consentimento é solicitado antes de carregar o Google Analytics; a recusa mantém o WhatsApp funcional. A escolha fica em localStorage por 180 dias. Revogar desativa a tag, apaga cookies `_ga` acessíveis no domínio e recarrega a página.

O evento `whatsapp_click` envia somente unidade e posição do botão. O `page_view` usa URL sem query e sem hash. Parâmetros UTM são preservados nos links internos; nunca entram na mensagem do WhatsApp. Não usar dados pessoais em nomes de campanhas. Não há pixel publicitário ou remarketing. Na propriedade GA4, desabilitar medição aprimorada de cliques externos, formulários e mudanças de histórico para que apenas os eventos deliberadamente implementados sejam coletados. Conferir DebugView com a propriedade real antes da publicação.

Search Console usa a propriedade do domínio (DNS) ou `PUBLIC_GOOGLE_VERIFICATION`. Registrar o sitemap após a publicação. Não houve acesso nem alteração a contas do Google.

## Publicação pendente

1. Aprovar a prévia visual e o comportamento em celular.
2. Conferir nomes completos, CRO, responsável técnico, dados da pessoa jurídica/controlador e canal de privacidade. Revisar os textos de políticas de acordo com hospedagem e práticas efetivas; os textos atuais são minutas funcionais, não atestado de conformidade.
3. Conferir endereços, horários, contatos e qual procedimento exige deslocamento de BH para JM. Horários e disponibilidade não confirmados foram omitidos; os dois endereços aprovados constam nos cartões.
4. Substituir ou aprovar as imagens ilustrativas e conferir as autorizações de uso das fotos.
5. Configurar domínio, integrações e `PUBLIC_INDEXABLE=true`; gerar novo build.
6. Aplicar `redirects.json` no provedor como redirecionamentos HTTP permanentes, com preservação da query. Configurar 404 real apontando para `404.html`. Nunca usar fallback de SPA que devolva 200 para URLs inexistentes. A prévia local já exercita esses comportamentos.
7. Conferir 200/301/404, canonical, robots, remoção de noindex, sitemap, WhatsApp e consentimento no domínio. Preservar backup do site anterior antes de trocar a publicação.

`vercel.json` prepara build estático e os quatro redirecionamentos 301 conhecidos, caso Vercel seja o destino escolhido. Nenhum projeto foi vinculado ou publicado. Não houve alterações de DNS ou envio de mensagens. Não há formulário, backend ou banco.

## Validação da entrega

- `npm run build`: sem erros ou avisos de TypeScript/Astro.
- `npm test`: oito páginas, 30 combinações entre páginas principais e larguras (360, 390, 430, 768, 1024, 1440), menu/Escape, diálogo e restauração de foco, CTA fixo, acordeões, consentimento, UTM, 404, quatro redirecionamentos, sitemap, orientação horizontal, texto ampliado, movimento reduzido e HTML sem JavaScript. Nenhuma violação nos testes automáticos axe WCAG A/AA.
- `node scripts/analytics-check.mjs`: consentimento, aceite/recusa/revogação, remoção de cookies, page_view único, evento de WhatsApp e URL sem dados pessoais. A tag externa foi simulada no teste; nenhum evento foi enviado a uma conta real.
- `node scripts/motion-check.mjs`: GSAP ativo, títulos acessíveis, rolagem rápida e retorno, 12 profissionais, abertura/fechamento com teclado, orientação, passagem entre breakpoints, texto 200% e mudança de movimento reduzido sem conteúdo invisível.
- Lighthouse mobile V2 local: desempenho 99, acessibilidade 100, boas práticas 100; LCP 2,2 s, CLS 0, bloqueio total 30 ms. Medição de laboratório com limitação simulada de rede/CPU; não é garantia de campo. A prévia tem noindex deliberado (SEO 69 por esse bloqueio). Relatórios em `artifacts/lighthouse-v2.report.html` e `.json`.
- `node scripts/visual-v2.mjs`: capturas mobile e desktop em `artifacts/`; `hero-mobile.png`, `home-mobile.png`, `hero-desktop.png` e `home-desktop.png` também são gerados por `npm test`.

## Pesquisa e fontes

Consultadas em 30/09/2026:

- https://institutobicalho.com/ e páginas de tratamentos existentes: contexto institucional e inventário inicial de URLs.
- https://linktr.ee/institutobicalho : dois canais públicos do WhatsApp.
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap : descoberta por sitemap, sem garantia de posicionamento.
- https://developers.google.com/analytics/devguides/collection/ga4/views : page_view explícito sem duplicação automática.
- https://developers.google.com/tag-platform/security/guides/privacy : desativação da medição.
- Material enviado pelo usuário: fonte principal para equipe, áreas de atuação, serviços, logo e retratos.

As páginas públicas apresentam horários divergentes. Publicações recentes do Instagram não puderam ser verificadas; nenhum conteúdo foi apresentado como atualização recente. Em 30/09/2026, `/sitemap.xml` no domínio antigo retornou 404; isso não comprova ausência de sitemap em outro endereço.

## V3 — atendimento, agenda e marca oficial

- `src/data/content.ts`: contatos, endereços aprovados, consultas dos mapas, canais de WhatsApp por unidade e `socialLinks`. Instagram e Facebook estão configurados com os perfis oficiais fornecidos pelo usuário, presentes no rodapé de todas as páginas e em `Organization.sameAs` nos dados estruturados.
- Desde 14/10/2026, todos os CTAs gerais abrem diretamente a escolha entre João Monlevade e Belo Horizonte para continuar no WhatsApp. A agenda externa foi removida do site; a equipe orienta sobre horários e confirma a consulta na conversa. No assistente, a escolha da unidade leva diretamente ao resumo editável.
- `SupportAssistant.astro` e `src/scripts/assistant.ts`: fluxo tipado com respostas preparadas, 26 procedimentos, dúvidas, pacientes atuais, voltar/reiniciar, troca de unidade e resumo editável antes do WhatsApp. Estado apenas em memória; nenhum backend, gravação de conversa ou envio automático. O atendimento permanece identificado como assistente virtual; na revisão atual, o avatar usa o símbolo oficial da marca. O indicador verde significa disponibilidade do assistente virtual.
- Logo oficial no rodapé, símbolo original recortado da marca no CTA, glifo reconhecível do WhatsApp e crédito para https://www.aguiadigital.com/.
- Os mapas incorporados carregam sob demanda perto da visualização. Google Maps é um recurso externo independente de Analytics; as políticas explicam isso. Links de rotas e endereços permanecem acessíveis.
- JM: Av. Gentil Bicalho, 384, 2º andar, Carneirinhos (usuário e agenda). BH: Av. Barão Homem de Melo, 55, loja 12, Nova Granada, BH Point (endereço aprovado no plano; cadastro da clínica corresponde ao telefone). Referências: https://dentmap.com.br/dentistas/belo-horizonte/instituto-bicalho-odontologia-bh-4a3b68c1 e https://sites.google.com/view/bh-point/menu/localizacao . A loja 20 é a administração do empreendimento, não a clínica.
- `whatsapp_click` mede somente clique, unidade e posição, após consentimento; não mede consulta confirmada. Nenhuma mensagem, procedimento ou observação é enviada ao Analytics. O evento de agenda online foi removido. Manter medição aprimorada de cliques externos desabilitada na propriedade GA4 antes de ativar o ID real.
- `scripts/assets-v3.mjs` gera os derivados das imagens novas, preservando os originais anteriores. `hero-branded`, `precision-branded` e `aligners` são cenas ilustrativas. `assistant` é uma personagem fictícia. Os três retratos reais não foram alterados. O sorriso ilustrativo é um paciente com roupa comum, sem logomarca.
- Novos testes: `node scripts/support-check.mjs` percorre todos os 26 serviços, quatro dúvidas gerais, três caminhos de pacientes, as duas unidades no WhatsApp, voltar, reiniciar, reabrir, reload, nota segura, telas de 360–1440, paisagem, texto 200%, movimento reduzido, ausência de JS e axe no assistente.
- `node scripts/visual-v3.mjs` produz capturas da abertura, diálogo de agendamento, conversa, resumo, unidades e rodapé em `artifacts/v3-*.png`.

Pendentes para publicação: identificadores reais de Google/GA4, conferência dos dados profissionais e das políticas pelo Instituto e aprovação da versão navegável. Nenhuma publicação realizada.

Medição mobile V3 local (30/09/2026): desempenho 98, acessibilidade 100, boas práticas 100; LCP 2,4 s, CLS 0 e TBT 80 ms. Rede/CPU limitadas na simulação Lighthouse; não representa garantia de campo. SEO 69 por noindex deliberado. O aviso adicional de correspondência entre rótulo visível e nome acessível do avatar foi corrigido e revalidado separadamente. Relatório de laboratório: artifacts/lighthouse-v3.report.html.

O mapa de BH usa o ponto geográfico (-19.935259, -43.9718161) do link oficial do BH Point, evitando interpretação ambígua de complementos como loja 12. O endereço completo permanece no cartão. Mapas e links de rotas foram conferidos visualmente. O ciclo de foco por Tab/Shift+Tab permanece dentro dos diálogos; Escape devolve o foco ao botão de abertura.
