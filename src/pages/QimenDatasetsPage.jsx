import { useI18n } from '../i18n.jsx';

const repositories = [
  {
    name: 'qimen',
    author: 'qfdk',
    url: 'https://github.com/qfdk/qimen',
    language: 'JavaScript',
    stars: 111,
    description: {
      en: 'Online Qimen Dun Jia chart tool (rotating plate method)',
      cn: '奇门遁甲在线排盘工具（转盘法）'
    },
    features: {
      en: ['BaZi integration', 'Qimen chart generation', 'Web-based interface'],
      cn: ['整合八字', '奇门排盘', '网页界面']
    }
  },
  {
    name: 'xuanxueapp',
    author: 'MartingKing',
    url: 'https://github.com/MartingKing/xuanxueapp',
    language: 'Java',
    stars: 152,
    description: {
      en: 'Automatic Qimen Dun Jia chart generation, Feng Shui compass, and BaZi analysis',
      cn: '奇门遁甲自动排盘，风水罗盘寻龙点穴，八字推演'
    },
    features: {
      en: ['Automated chart generation', 'Feng Shui compass', 'BaZi predictions'],
      cn: ['自动排盘', '风水罗盘', '八字推演']
    }
  },
  {
    name: 'yunque-qimen',
    author: 'gaojunxin',
    url: 'https://github.com/gaojunxin/yunque-qimen',
    language: 'JavaScript',
    stars: 40,
    description: {
      en: 'Yunque Qimen Dun Jia chart builder using 3D models',
      cn: '云雀奇门遁甲排盘，通过三维模型构建奇门遁甲排盘软件'
    },
    features: {
      en: ['3D visualization', 'Modern interface', 'Interactive charts'],
      cn: ['三维可视化', '现代界面', '互动图表']
    }
  },
  {
    name: 'taobi',
    author: 'Taogram',
    url: 'https://github.com/Taogram/taobi',
    language: 'JavaScript',
    stars: 46,
    description: {
      en: 'Online Qimen Dun Jia library with VSOP87D astronomical algorithm for precise 24 Solar Terms',
      cn: '基于js的在线奇门遁甲摆盘库，二十四节气采用天文VSOP87D算法，可精确至分钟'
    },
    features: {
      en: ['VSOP87D algorithm', 'Precise to the minute', 'Custom methods support'],
      cn: ['VSOP87D算法', '精确至分钟', '支持自定义拆补法']
    }
  },
  {
    name: 'qimen-go',
    author: 'deminzhang',
    url: 'https://github.com/deminzhang/qimen-go',
    language: 'Go',
    stars: 20,
    description: {
      en: 'Qimen Dun Jia chart generation in Golang',
      cn: 'Golang版奇门遁甲排盘'
    },
    features: {
      en: ['High performance', 'Go implementation', 'CLI tool'],
      cn: ['高性能', 'Go语言实现', '命令行工具']
    }
  },
  {
    name: 'qimenpaipan',
    author: 'redrockhorse',
    url: 'https://github.com/redrockhorse/qimenpaipan',
    language: 'Python',
    stars: 10,
    description: {
      en: 'Python implementation of Qimen Dun Jia chart, supports chabu and zhirun methods',
      cn: '奇门遁甲排盘Python实现，支持拆补法和置闰法，默认置闰法'
    },
    features: {
      en: ['Python library', 'Multiple methods', 'Easy integration'],
      cn: ['Python库', '多种方法', '易于集成']
    }
  },
  {
    name: 'xuan-utils-pro',
    author: 'shan-dai',
    url: 'https://github.com/shan-dai/xuan-utils-pro',
    language: 'Java',
    stars: 20,
    description: {
      en: 'Enhanced metaphysics chart tools including BaZi, Liuyao, Qimen Dun Jia, and Plum Blossom divination',
      cn: '排盘工具升级版，如：八字、六爻、奇门遁甲、梅花易数等'
    },
    features: {
      en: ['Multiple systems', 'Java library', 'Comprehensive toolkit'],
      cn: ['多系统支持', 'Java库', '综合工具包']
    }
  },
  {
    name: 'ZhouYiLab',
    author: 'banderzhm',
    url: 'https://github.com/banderzhm/ZhouYiLab',
    language: 'C++',
    stars: 9,
    description: {
      en: 'Chinese metaphysics computation engine including Da Liuren, Liuyao, Zi Wei, BaZi, and Qimen',
      cn: '玄学计算引擎，包含大六壬、六爻、紫薇斗数、八字、奇门遁甲'
    },
    features: {
      en: ['Multiple systems', 'C++ engine', 'Educational focus'],
      cn: ['多系统引擎', 'C++实现', '教育导向']
    }
  },
  {
    name: 'csp',
    author: 'taynpg',
    url: 'https://github.com/taynpg/csp',
    language: 'C++',
    stars: 36,
    description: {
      en: 'Command-line Qimen Dun Jia chart tool in C++',
      cn: 'C++式盘，一个cmd命令行奇门遁甲起盘工具'
    },
    features: {
      en: ['CLI interface', 'C++ performance', 'Liuren support'],
      cn: ['命令行界面', 'C++性能', '支持六壬']
    }
  },
  {
    name: 'Qimen (Entity Extraction)',
    author: 'ownthink',
    url: 'https://github.com/ownthink/Qimen',
    language: 'Python',
    stars: 29,
    description: {
      en: 'Qimen toolkit for entity extraction and NLP applications',
      cn: 'Qimen表示的是奇门遁甲之术，用于抽取各种实体的工具'
    },
    features: {
      en: ['Entity extraction', 'NLP toolkit', 'Python library'],
      cn: ['实体抽取', 'NLP工具', 'Python库']
    }
  }
];

export default function QimenDatasetsPage() {
  const { lang } = useI18n();
  const isEN = lang === 'EN';

  const content = {
    title: isEN ? 'Qimen Dun Jia Datasets & Tools on GitHub' : 'GitHub上的奇门遁甲数据集与工具',
    subtitle: isEN 
      ? 'Open-source resources for Qimen Dun Jia research, education, and application development'
      : '用于奇门遁甲研究、教育和应用开发的开源资源',
    intro: {
      title: isEN ? 'Introduction' : '简介',
      content: isEN
        ? 'Qimen Dun Jia (奇门遁甲), also known as "Mystical Doors Escaping Technique," is one of the most sophisticated systems in Chinese metaphysics. Several open-source projects on GitHub provide datasets, algorithms, and tools for studying and applying this ancient divination system. Below is a curated list of the most notable repositories.'
        : '奇门遁甲是中国玄学中最复杂精密的系统之一。GitHub上有多个开源项目提供数据集、算法和工具，用于研究和应用这一古老的占卜系统。以下是最值得关注的资源库列表。'
    },
    usage: {
      title: isEN ? 'Use Cases' : '使用场景',
      items: isEN ? [
        'Academic research and algorithmic study',
        'Building educational applications',
        'Integration into metaphysics consultation software',
        'Cross-validation with other divination systems',
        'Development of automated chart generation tools'
      ] : [
        '学术研究与算法研究',
        '构建教育应用程序',
        '集成到玄学咨询软件',
        '与其他占卜系统交叉验证',
        '开发自动排盘工具'
      ]
    },
    note: {
      title: isEN ? 'Important Note' : '重要提示',
      content: isEN
        ? 'These repositories are maintained by independent developers and may vary in accuracy, completeness, and maintenance status. Always verify calculations and consult with qualified practitioners for professional readings.'
        : '这些资源库由独立开发者维护，在准确性、完整性和维护状态上可能有所不同。请务必验证计算结果，并咨询合格的专业人士进行专业解读。'
    },
    cta: {
      title: isEN ? 'Need Professional Qimen Analysis?' : '需要专业奇门分析？',
      description: isEN
        ? 'While these tools are valuable for learning and research, professional Qimen Dun Jia consultations require expert interpretation. Contact us for a comprehensive analysis tailored to your specific situation.'
        : '虽然这些工具对学习和研究很有价值，但专业的奇门遁甲咨询需要专家解读。联系我们获取针对您具体情况的全面分析。',
      button: isEN ? 'Book a Consultation' : '预约咨询'
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero section - matching the pattern from AboutPage */}
      <header className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] -mt-8 -mb-8 min-h-[50vh] flex items-center text-center rounded-none border-0 p-8 md:p-12 overflow-hidden">
        <img src="/page-banner.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.75 }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))' }} />
        <div className="relative z-10 w-full max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 pb-[10px] bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-yellow-400 to-blue-600 bg-clip-text text-transparent">
            {content.intro.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.intro.content}
          </p>
        </section>

        {/* Repositories Grid */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-500 via-yellow-400 to-blue-600 bg-clip-text text-transparent">
            {isEN ? 'Available Repositories' : '可用资源库'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {repositories.map((repo, index) => (
              <div 
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <a 
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {isEN ? 'by' : '作者:'} {repo.author}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {repo.language}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ⭐ {repo.stars}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  {isEN ? repo.description.en : repo.description.cn}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    {isEN ? 'Key Features:' : '主要特性：'}
                  </p>
                  <ul className="space-y-1">
                    {(isEN ? repo.features.en : repo.features.cn).map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="mr-2 text-yellow-500">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-yellow-400 to-blue-600 bg-clip-text text-transparent">
            {content.usage.title}
          </h2>
          <ul className="space-y-3">
            {content.usage.items.map((item, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-3 text-yellow-500 text-xl">✓</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Important Note */}
        <section className="mb-16 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="text-2xl font-bold mb-3 text-yellow-800 dark:text-yellow-300">
            {content.note.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.note.content}
          </p>
        </section>

        {/* CTA */}
        <section className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl text-center border border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-blue-600 bg-clip-text text-transparent">
            {content.cta.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {content.cta.description}
          </p>
          <a 
            href={`#/contact`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {content.cta.button}
          </a>
        </section>
      </div>
    </div>
  );
}
