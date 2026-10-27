# Fotografias oficiais

Material fornecido pelo cliente em 26/10/2026, com 36 JPGs. Originais preservados sem alterações em `assets/originals/official-20261026/`, fora do Git.

## Seleção atual

| Arquivo indicado pelo cliente | Original equivalente | Derivado | Uso |
| --- | --- | --- | --- |
| entrada pra hero.jpg | DSC01005.jpg | official-entrance | Hero da Home e imagem de compartilhamento: recepção e letreiro |
| atendimento dentario.jpg | THA03292.jpg | official-dental-care-close | Abertura da página de Tratamentos: atendimento odontológico |
| atendimento dentario2.jpg | THA03288.jpg | official-dental-care-wide | Cartão de Tratamentos na Home: vista mais aberta do atendimento |
| aTNEDIUMENTO.jpg | THA03256.jpg | official-consultation | Estética: cena institucional de conversa com uma paciente |
| consultorio.jpg | DSC01027.jpg | official-consulting-room | Odontologia de Precisão: estrutura do consultório |
| ambinete de atrneidmento nao sei oq é olhe vc.jpg | DSC01016.jpg | official-care-room | Seção do fluxo digital: vista institucional de um consultório |
| equipeemreuniao.jpg | THA03124.jpg | official-team-meeting | Painel da equipe: reunião de profissionais |
| consultorio5.jpg | DSC01046.jpg | official-treatment-room | Ortodontia e Cirurgia: estrutura do consultório |
| consultorio3.jpg | DSC01076.jpg | official-service-tratamentos | Faixa fotográfica de Tratamentos: consultório com painel de anatomia dental |
| consultior4.jpg | DSC01054.jpg | official-service-estetica | Faixa fotográfica de Estética: consultório com espelho |
| DSC00998.jpg | DSC00998.jpg | official-service-ortodontia | Faixa fotográfica de Ortodontia e Cirurgia: cadeira e estrutura clínica |
| consultorio2.jpg | DSC00991.jpg | official-service-precisao | Faixa fotográfica de Odontologia de Precisão: consultório com mesa de avaliação |

Os retratos institucionais reais já aprovados na seção dos sócios foram mantidos. A nova seleção não associa retratos individuais a nomes ou especialidades sem identificação fornecida pelo cliente.

Os nomes indicados pelo cliente correspondem aos mesmos arquivos originais, conferidos por SHA-256. A imagem de procedimento mais escura (THA03315.jpg / atnedimento 4.jpg) e os retratos de estúdio usados antes na hero e em Estética saíram dos destaques. Nem todas as fotos recebidas precisam aparecer no site.

O cliente escolheu usar consultórios e atendimento geral como imagens institucionais nas áreas sem fotografia específica confirmada. Essas cenas não são identificadas como cirurgia, procedimento estético, laboratório ou escaneamento. Na seção do fluxo digital, o texto “Imagem digital. Base para o plano de tratamento.” foi preservado e separado da fotografia, como introdução ao processo descrito a seguir.

As quatro faixas usam fotografias diferentes, que não apareciam nas páginas nem nas seleções anteriores conferidas. Cada faixa fica após os serviços e o aviso de avaliação individual, antes das outras áreas, com fundo azul-escuro e apenas a imagem. Elas mantêm o caráter institucional, sem identificar equipamentos ou procedimentos não confirmados.

`src/data/photos.ts` centraliza os originais, títulos, descrições e dimensões. `node scripts/official-assets.mjs` gera WebP em qualidade 92 e AVIF em qualidade 72, nas larguras 480, 800, 1200, 1600 e 1920 px para as fotos novas, acrescentando 2560 e 2936 px nas dez fotografias horizontais. Os retratos anteriores têm até 1600 px. O gerador rejeita larguras superiores ao original; `--missing` gera apenas os tamanhos ainda ausentes. Não há ampliação artificial, retoque, filtro ou reconstrução de pessoas. O enquadramento é definido pelo CSS.

Os atributos `sizes` consideram a imagem inteira por trás do recorte com `object-fit: cover`, incluindo o zoom dos cartões 03 e 04. O HTML inclui valores de fallback por composição. Um ResizeObserver ajusta a medida ao encaixe real quando mudam a tela, o tamanho do texto ou o painel da equipe, sem alterar o layout. `npm run test:photos` verifica as imagens carregadas em telas 2× e 3× e o fallback sem JavaScript.

Os derivados incluem XMP com título, descrição, assunto institucional e idioma, também verificados em AVIF. O processo não copia EXIF, GPS ou informações de câmera dos originais. Não foram atribuídos fotógrafo, copyright ou licença desconhecidos. O HTML inclui descrições alternativas e ImageObject com crédito de acervo institucional, sem apresentar o Instituto como fotógrafo.

O assistente usa o símbolo da marca. A imagem de compartilhamento acompanha a recepção da hero. As seleções anteriores e as imagens de IA não são usadas pelas páginas atuais.
