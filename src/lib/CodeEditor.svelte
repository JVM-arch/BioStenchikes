<script>
  import { onMount } from 'svelte';

  const codeSegments = [
    { text: 'while', class: 'keyword' },
    { text: ' (', class: 'bracket' },
    { text: '!', class: 'operator' },
    { text: 'success', class: 'variable' },
    { text: ') {\n', class: 'bracket' },
    { text: '    ', class: '' },
    { text: 'tryAgain', class: 'method' },
    { text: '();\n', class: 'bracket' },
    { text: '    ', class: '' },
    { text: 'coffee', class: 'variable' },
    { text: '++;\n', class: 'operator' },
    { text: '    ', class: '' },
    { text: 'if', class: 'keyword' },
    { text: ' (', class: 'bracket' },
    { text: 'coffee', class: 'variable' },
    { text: ' > ', class: 'operator' },
    { text: '10', class: 'number' },
    { text: ') {\n', class: 'bracket' },
    { text: '        ', class: '' },
    { text: 'sleep', class: 'method' },
    { text: '();\n', class: 'bracket' },
    { text: '    }\n', class: 'bracket' },
    { text: '}\n', class: 'bracket' },
    { text: 'System', class: 'class-name' },
    { text: '.out.', class: 'operator' },
    { text: 'println', class: 'method' },
    { text: '(', class: 'bracket' },
    { text: '"Done! 🎉"', class: 'string' },
    { text: ');', class: 'bracket' }
  ];

  let codeOutput = '';
  let currentIndex = 0;
  let charIndex = 0;

  function typeCode() {
    if (currentIndex < codeSegments.length) {
      const segment = codeSegments[currentIndex];
      const char = segment.text[charIndex];
      
      if (charIndex === 0 && segment.class) {
        codeOutput += `<span class="${segment.class}">`;
      }
      
      codeOutput += char === '\n' ? '<br>' : char === ' ' ? '&nbsp;' : char;
      charIndex++;
      
      if (charIndex >= segment.text.length) {
        if (segment.class) {
          codeOutput += '</span>';
        }
        currentIndex++;
        charIndex = 0;
      }
      
      setTimeout(typeCode, 45 + Math.random() * 55);
    } else {
      setTimeout(() => {
        codeOutput = '';
        currentIndex = 0;
        charIndex = 0;
        typeCode();
      }, 4000);
    }
  }

  onMount(() => {
    setTimeout(typeCode, 500);
  });
</script>

<div class="vscode-card card">
  <div class="vscode-header">
    <div class="vscode-dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div class="vscode-title">
      <span>☕</span>
      <span>Magic.java</span>
    </div>
    <div></div>
  </div>
  <div class="vscode-editor">
    <div class="line-numbers">
      {#each Array(9) as _, i}
        <span>{i + 1}</span>
      {/each}
    </div>
    <div class="code-area">
      <pre>{@html codeOutput}<span class="cursor"></span></pre>
    </div>
  </div>
  <div class="vscode-statusbar">
    <span>☕ Java</span>
    <span>UTF-8</span>
  </div>
</div>

<style>
  .vscode-card {
    font-family: 'JetBrains Mono', monospace;
    background: rgba(13, 13, 13, 0.75) !important;
    font-size: 0.62rem;
    width: 90%;
    max-width: 460px;
    align-self: center;
    transform: scale(0.92);
    transform-origin: top center;
  }

  .vscode-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(26, 26, 26, 0.5);
    padding: 6px 10px; /* Reduced padding */
    border-bottom: 1px solid #2a2a2a;
  }

  .vscode-dots {
    display: flex;
    gap: 5px;
  }

  .dot {
    width: 8px; /* Smaller dots */
    height: 8px;
    border-radius: 50%;
  }

  .dot.red { background: #ff5f56; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #27ca40; }

  .vscode-title {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #888;
    font-size: 0.7rem;
  }

  .vscode-editor {
    display: flex;
    min-height: 160px; /* Taller but overall narrower card */
    background: transparent;
  }

  .line-numbers {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    color: #444;
    font-size: 0.68rem;
    line-height: 1.7;
    text-align: right;
    border-right: 1px solid #1a1a1a;
    min-width: 32px;
  }

  .code-area {
    flex: 1;
    padding: 10px 12px;
    overflow: hidden;
  }

  pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    line-height: 1.7;
    margin: 0;
  }

  :global(.keyword) { color: #569cd6; }
  :global(.class-name) { color: #4ec9b0; }
  :global(.string) { color: #ce9178; }
  :global(.method) { color: #dcdcaa; }
  :global(.variable) { color: #9cdcfe; }
  :global(.number) { color: #b5cea8; }
  :global(.bracket) { color: #ffd700; }
  :global(.operator) { color: #888; }

  .cursor {
    display: inline-block;
    width: 2px;
    height: 12px;
    background: #666;
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .vscode-statusbar {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 3px 10px;
    background: rgba(26, 26, 26, 0.5);
    font-size: 0.6rem;
    color: #666;
  }
</style>
