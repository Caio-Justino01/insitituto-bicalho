// Measure ink from Range rectangles, rather than estimating lines from box height.
// Works with plain text, semantic no-wrap groups and GSAP SplitText spans.
export function inspectTextLayout({ scale = 1 } = {}) {
  const selectors = 'main h1,main h2,main h3,main p,main address,.faq-list summary>span,.service-index nav a,.other-areas a,.footer-top a,.footer-bottom a,.footer-bottom button,.portrait-note,.mobile-nav>a,#booking-title,.booking-intro,.booking-options strong,.booking-options small,.support-header h2,.support-header p,.chat-bubble,.chat-choice,.cookie-notice h2,.cookie-notice p';
  const results = [];
  for (const element of document.querySelectorAll(selectors)) {
    if (!element.getClientRects().length || element.closest('[hidden]')) continue;
    const nodes = []; let text = '';
    const collect = node => {
      if (node.nodeType === Node.TEXT_NODE) { nodes.push({ node, start:text.length, end:text.length+node.length }); text += node.textContent; return; }
      if (node.nodeType !== Node.ELEMENT_NODE || node.matches('svg,script,style')) return;
      if (node.tagName === 'BR') { text += '\n'; return; }
      const block = /^(block|flex|grid|list-item)$/.test(getComputedStyle(node).display);
      if (block) text += '\n';
      node.childNodes.forEach(collect);
      if (block) text += '\n';
    };
    element.childNodes.forEach(collect);
    const rows = [], split = [];
    for (const match of text.matchAll(/\S+/g)) {
      const start = match.index, end = start + match[0].length, rects = [];
      for (const item of nodes) {
        if (item.end <= start || item.start >= end) continue;
        const range = document.createRange();
        range.setStart(item.node, Math.max(0, start - item.start));
        range.setEnd(item.node, Math.min(item.node.length, end - item.start));
        rects.push(...[...range.getClientRects()].filter(r => r.width > .1 && r.height > .1));
      }
      const levels = [];
      for (const rect of rects) {
        if (!levels.some(y => Math.abs(y - rect.top) < 3)) levels.push(rect.top);
        let row = rows.find(r => Math.abs(r.top - rect.top) < 3);
        if (!row) { row = { top: rect.top, left: rect.left, right: rect.right, words: [] }; rows.push(row); }
        row.left = Math.min(row.left, rect.left); row.right = Math.max(row.right, rect.right);
        if (!row.words.some(w => w.index === start)) row.words.push({ index: start, text: match[0] });
      }
      if (levels.length > 1) split.push(match[0]);
    }
    rows.sort((a,b) => a.top - b.top);
    const lines = rows.map(row => row.words.sort((a,b) => a.index - b.index).map(w => w.text).join(' '));
    if (!lines.length) continue;
    const style = getComputedStyle(element), box = element.getBoundingClientRect();
    const category = element.tagName === 'H1' ? 'opening' : /^H[23]$/.test(element.tagName) ? 'heading' : element.matches('p,address,.portrait-note,.chat-bubble') ? 'body' : 'label';
    const budget = category === 'opening' ? (innerWidth < 375 ? 4 : 3) : category === 'heading' ? (element.closest('.service-index') || text.trim().length > 55 ? 3 : 2) : category === 'label' ? 4 : null;
    const orphan = rows.length > 1 && text.trim().split(/\s+/).length > 3 && rows.at(-1).words.length === 1;
    results.push({ selector: element.id ? '#' + element.id : element.tagName.toLowerCase()+'.'+[...element.classList].join('.'), category, text: text.replace(/\s+/g,' ').trim(), lines, font: parseFloat(style.fontSize), width: Math.round(box.width), budget, orphan, split, issues: [
      ...(scale === 1 && budget && rows.length > budget ? ['line-budget'] : []),
      ...(scale === 1 && orphan ? ['orphan'] : []),
      ...(scale === 1 && split.length ? ['split-word'] : []),
      ...(element.scrollWidth > element.clientWidth + 1 ? ['overflow'] : []),
      ...(style.textOverflow === 'ellipsis' || Number(style.webkitLineClamp) > 0 ? ['truncation'] : []),
    ] });
  }
  const clipped = [...document.querySelectorAll('main h1,main h2,main h3,main p,main summary')].filter(el=>el.getClientRects().length&&el.scrollWidth>el.clientWidth+1).map(el=>el.textContent.replace(/\s+/g,' ').trim());
  return { overflow: document.documentElement.scrollWidth - innerWidth, clipped, elements: results, failures: results.filter(r => r.issues.length) };
}
