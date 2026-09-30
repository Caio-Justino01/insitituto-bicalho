# Imagens ilustrativas

Ferramenta utilizada: geração de imagens integrada, sem API externa. Originais preservados em `assets/originals/`. Retratos reais não foram gerados nem alterados. A simulação de layout aprovada é referência visual, não um ativo do site.

## hero.png

Generate a single standalone photorealistic editorial website hero image, landscape 1536x1024. Use the attached APPROVED WEBSITE MOCKUP as reference ONLY for its TOP HERO PHOTOGRAPH: recreate that scene as a clean full-frame photo WITHOUT any website text, UI, logo or lettering. A Brazilian female dentist with long dark hair wearing a clean deep navy scrub coat converses warmly with an adult Brazilian female patient seated in a pale turquoise dental chair. Both smiling naturally at each other, normal natural teeth, realistic skin pores and hands. Dentist standing just left of patient, patient on the right. People occupy right two thirds, left third softly blurred contemporary clinic provides negative space for HTML text overlay. Realistic daytime Brazilian clinic, pale walls, blue accents, gentle window greenery far right, warm skin, authentic candid medical editorial photography. Restrained polished light, no glamour retouching, no instruments in mouths, no printed words, no logos. Fictional illustrative people, not actual staff. Deliver PHOTO ONLY.

## precision.png

Photorealistic premium editorial photograph for Brazilian dentistry website, landscape 1536x1024. Close-up of a female clinician wearing deep navy scrub coat and blue nitrile gloves holding a realistic modern white wireless intraoral dental scanner in front of a desktop monitor showing a clean unlabeled realistic 3D digital model of an upper dental arch. Natural hand anatomy, medically plausible scanner. No patient mouth, no invasive procedure, no blood. Frame hands and scanner lower left, monitor center right, cropped torso of clinician at far left. Elegant authentic dental clinic, deep blue accents, soft natural daylight, highly detailed true-to-life materials. No words, no letters, no logos, no watermark, no collage, no UI mockup, one standalone real-looking photographic scene. Illustrative fictional clinic scene.

## smile.png

A single premium photorealistic editorial photograph for a dental aesthetics website card. Landscape 1536x1024 crop of the lower half of a smiling Brazilian adult woman's face in soft natural light, face at three-quarter angle, natural realistically proportioned teeth, healthy natural smile not unnaturally white or perfect, authentic pores and skin texture, no lipstick glamour, pale soft blue clinical background, casual ivory clothing edge. Warm human candid look, professional photographic quality, no text, no logos, no collage, no instruments, no before-after. Illustrative person.

# V3 — identidade e atendimento (30/09/2026)

Ferramenta: image_gen integrada, sem API externa própria. Originais anteriores e retratos reais preservados. Derivados WebP/AVIF em public/assets; otimização por scripts/assets-v3.mjs.

## hero-branded.png
Arquivo: assets/originals/hero-branded.png. Referências: hero.png (alvo) e public/assets/logo.png (marca).
Prompt: Edit target image 1: preserve this exact photographic composition, both people faces and expressions, lighting and clinical background. Only add the supplied Instituto Bicalho official logo from image 2 as a small realistic embroidery on the dentist's visible navy coat LEFT chest (viewer right of zipper). Faithfully preserve the B symbol and Bicalho typography, white and turquoise embroidery, follow perspective and fabric. Do not brand the patient's cream clothes. No other alterations. Landscape 1536x1024.

## assistant.png
Arquivo: assets/originals/assistant.png. Referência: logo oficial. Personagem fictícia; não representa funcionária real.
Prompt: Generate a single photorealistic square head-and-shoulders portrait for a fictional virtual receptionist avatar of Instituto Bicalho dental clinic Brazil. New fictional woman age 32, warm medium brown skin, shoulder length dark brown hair, kind confident natural smile, facing camera. Natural skin texture, believable ordinary human, not glamour. Navy blue clinical reception tunic with a small faithful embroidery of the provided Instituto Bicalho logo on left chest, turquoise B symbol and white wordmark. Light cool blue blurred modern reception background, soft daylight. Face fills upper central half, generous room around head for circular crop. Modern institutional editorial photography. No headset, no text outside embroidered logo. 1024x1024.

## aligners.png
Arquivo: assets/originals/aligners.png. Referência: logo oficial. Substitui o retrato sem relação específica com Ortodontia.
Prompt: Create a photorealistic editorial dental consultation photograph for Instituto Bicalho website orthodontics card, landscape 1536x1024. A fictional Brazilian female orthodontist around 40 with tied back dark hair wearing navy tunic and small faithful embroidered logo from supplied reference on her left chest, in white and turquoise. She holds ONE clear transparent upper dental aligner between two gloved fingers at chest height showing its shape to a seated adult female patient in ordinary light beige clothing (no logo). Both people seen waist-up in a natural thoughtful conversation, faces and aligner prominent near center, soft daylight in modern pale blue clinical room with subtle monitor showing an unlabeled dental arch rendering. Anatomically correct hands with five fingers, realistic translucent aligner, no instruments inside mouths, no surgery, no glam retouching. Composition retains important faces and aligner in central 70% for mobile crop. No titles or typography outside small uniform embroidery.

## precision-branded.png
Arquivo: assets/originals/precision-branded.png. Referências: precision.png (alvo) e logo oficial.
Prompt: Edit only the navy clinical uniform in image 1: add a small discreet embroidered official turquoise B symbol from reference logo image 2 on the visible breast pocket area (left side of image). Keep exact symbol shape. No text necessary, just small B monogram that follows fabric and perspective. Preserve everything else exactly: scanner instrument, gloved hands, monitor, dental rendering, room, face, composition. Do not change any equipment or apply logos outside uniform. Landscape photograph.

Revisão: cenas ilustrativas explicitamente identificadas; pacientes sem marca; composição central dos alinhadores usada na Home e na interna; bordados visíveis onde o uniforme permite. A fotografia de sorriso é de paciente e permanece sem bordado. Marca do site/CTA usa o arquivo real, sem reprodução gerada. Identidade bordada em imagens de IA é ilustrativa e deve ceder às fotografias oficiais quando disponíveis.
# Logo transparente — navbar e rodapé

Edição com a ferramenta integrada `image_gen`, em 30/09/2026. Origem: `public/assets/logo-original.png`. Arquivo aplicado: `public/assets/logo-transparent.png`; derivados lossless WebP de 320 e 600 px. Transparência alpha verificada. O rodapé usa a mesma imagem com filtro CSS branco para contraste sobre o azul, sem painel de fundo. O arquivo original permanece preservado.

Prompt utilizado:

> Background removal only. Extract the exact existing Instituto Bicalho official logo from this source image to an actual transparent background. Preserve the existing pixels/letter geometry and ORIGINAL MUTED COLORS: soft turquoise cyan emblem, slate gray/navy lettering, same muted turquoise tagline. Do NOT boost saturation or contrast, do not sharpen, do not redraw. Smooth intact clean antialiased edges, no eroded flecks or jagged outlines. Exact words: INSTITUTO Bicalho ODONTOLOGIA DE PRECISÃO. Remove all white areas including enclosed counters. Tight crop around the full logo retaining its original 3.37:1 aspect ratio. No additions. Transparent PNG.
