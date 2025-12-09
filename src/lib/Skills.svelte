<script>
  export let skills = [];

  function getDots(level) {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(level)) {
        dots.push('filled');
      } else if (i - 0.5 === level) {
        dots.push('half');
      } else {
        dots.push('empty');
      }
    }
    return dots;
  }
</script>

<div class="skills-section">
  <h2 class="skills-title">Skills</h2>
  
  <div class="skills-grid">
    {#each skills as category}
      <div class="skill-card card">
        <div class="skill-header">
          <span class="skill-icon">{category.icon}</span>
          <span class="skill-category">{category.name}</span>
          <span class="skill-count">{category.skills.length} SKILLS</span>
        </div>
        <div class="skill-list">
          {#each category.skills as skill}
            <div class="skill-item">
              <span class="skill-name">{skill.name}</span>
              <div class="skill-dots {category.color}">
                {#each getDots(skill.level) as dot}
                  <span class="dot-skill {dot}"></span>
                {/each}
              </div>
              <span class="skill-level">{skill.level}/5</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .skills-section {
    width: 100%;
  }

  .skills-title {
    color: var(--accent);
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 12px;
    padding-left: 4px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .skill-card {
    padding: 14px;
    position: relative;
    overflow: hidden;
  }

  .skill-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.08;
    pointer-events: none;
  }

  /* Different gradients for each category */
  .skill-card:nth-child(1)::before {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  }

  .skill-card:nth-child(2)::before {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }

  .skill-card:nth-child(3)::before {
    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  }

  .skill-card:nth-child(4)::before {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  }

  .skill-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color);
  }

  .skill-icon { font-size: 0.9rem; }
  .skill-category { font-weight: 600; font-size: 0.85rem; flex: 1; }
  .skill-count { font-size: 0.6rem; color: var(--text-muted); }

  .skill-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .skill-name {
    font-size: 0.7rem;
    color: var(--text-secondary);
    min-width: 70px;
    flex-shrink: 0;
  }

  .skill-dots {
    display: flex;
    gap: 3px;
    flex: 1;
  }

  .dot-skill {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
  }

  /* Orange */
  .orange .dot-skill.filled { background: #f97316; border-color: #f97316; }
  .orange .dot-skill.half { background: linear-gradient(90deg, #f97316 50%, #1a1a1a 50%); border-color: #f97316; }

  /* Blue */
  .blue .dot-skill.filled { background: #3b82f6; border-color: #3b82f6; }
  .blue .dot-skill.half { background: linear-gradient(90deg, #3b82f6 50%, #1a1a1a 50%); border-color: #3b82f6; }

  /* Pink */
  .pink .dot-skill.filled { background: #ec4899; border-color: #ec4899; }
  .pink .dot-skill.half { background: linear-gradient(90deg, #ec4899 50%, #1a1a1a 50%); border-color: #ec4899; }

  /* Green */
  .green .dot-skill.filled { background: #22c55e; border-color: #22c55e; }
  .green .dot-skill.half { background: linear-gradient(90deg, #22c55e 50%, #1a1a1a 50%); border-color: #22c55e; }

  .skill-level {
    font-size: 0.6rem;
    color: var(--text-muted);
    min-width: 24px;
    text-align: right;
  }

  @media (max-width: 500px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
