<script setup lang="ts">

interface IProject {
  title: string;
  description: string;
  link: string;
  icon: string;
}

// 定义项目列表数据
const projects = [
  {
    title: 'Markdown Assistant',
    description: 'vscode 插件, 提升你的markdown写作体验',
    link: 'https://marketplace.visualstudio.com/items?itemName=lyx.markdown-assistant',
    icon: '/images/project1.png'
  },
  {
    title: '项目二',
    description: '这是项目二的描述内容，可以简单介绍项目的功能和特点',
    link: 'https://example.com/project2',
    icon: '/images/project2.png'
  },
];

const clickCard = (project: IProject) => {
  window.open(project.link, '_blank');
};
</script>

<template>
  <div class="projects-container">
    <div class="projects-grid" >
      <div v-for="(project, index) in projects" :key="index" class="project-card" @click="clickCard(project)">
        <div class="project-icon">
          <img :src="project.icon" alt="icon">
        </div>
        <div class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  padding: 2rem 0;
  width: 100%;
  overflow-x: hidden; /* 防止水平滚动 */
}

.projects-grid {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.project-card {
  display: flex;
  align-items: center;
  width: 40%;
  height: 8rem;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.project-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
}

.project-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-title {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.project-description {
  margin: 0 0 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-link {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.project-link:hover {
  background-color: var(--vp-c-brand-dark);
}

/* 响应式设计 - 在更小的屏幕上进一步调整 */
@media (max-width: 768px) {
  .projects-grid {
    width: 90%;
    gap: 1rem;
  }
  
  .project-card {
    width: 100%;
    height: auto;
    min-height: 6rem;
    padding: 0.75rem;
  }
  
  .project-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .project-title {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  
  .project-description {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
    margin-bottom: 0.4rem;
  }
}

@media (max-width: 480px) {
  .projects-container {
    padding: 1rem 0;
  }
  
  .projects-grid {
    width: 95%;
    padding: 0 0.5rem;
  }
  
  .project-card {
    padding: 0.6rem;
    min-height: 5rem;
  }
  
  .project-icon {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 0.75rem;
  }
  
  .project-description {
    -webkit-line-clamp: 2;
    font-size: 0.8rem;
    margin-bottom: 0;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .projects-grid {
    width: 85%;
    gap: 1.5rem;
  }
}

/* 暗黑模式特定样式 */
.dark .project-card {
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .project-icon {
  border-color: var(--vp-c-divider-light);
  background-color: var(--vp-c-bg-soft);
}

.dark .project-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  background-color: var(--vp-c-bg-alt);
}
</style>