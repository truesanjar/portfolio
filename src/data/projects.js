// Project data — multilingual for title/desc fields
export const PROJECTS = [
  {
    id: "anyvoice",
    year: "2025",
    stack: ["React", "FastAPI", "MongoDB", "WebSocket"],
    url: "https://www.anyvoice.world",
    accent: "#F59E0B",
    cover:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop",
    title: {
      tj: "AnyVoice",
      ru: "AnyVoice",
      en: "AnyVoice",
    },
    tagline: {
      tj: "Шабакаи иҷтимоии озодии баён",
      ru: "Социальная сеть свободы слова",
      en: "Social network for free expression",
    },
    why: {
      tj: "Хостам ҷое созам ки ҳар кас бе хавфи фошсозӣ нигаронии худро баён карда тавонад.",
      ru: "Хотел создать место, где каждый может высказаться без страха быть раскрытым.",
      en: "I wanted a place where anyone could speak up without fear of exposure.",
    },
    what: {
      tj: "Платформаи иҷтимоист ки сабти ном бе маълумоти шахсӣ имконпазир аст. Ҳама паёмҳо номаълум, аммо хӯшаҳо барои гуфтугӯҳои ҷамъиятӣ.",
      ru: "Социальная платформа с регистрацией без личных данных. Анонимные сообщения и тематические треды для публичных дискуссий.",
      en: "A social platform with no-personal-data signup. Anonymous posts and threads for public discussions.",
    },
    built: {
      tj: "React + FastAPI + MongoDB. WebSocket барои live чат, JWT-auth, инфраструктураи production.",
      ru: "React + FastAPI + MongoDB. WebSocket для live-чата, JWT-auth, продакшн инфраструктура.",
      en: "React + FastAPI + MongoDB. WebSocket for live chat, JWT auth, production infra.",
    },
  },
  {
    id: "capsulix",
    year: "2025",
    stack: ["Python", "aiogram", "MongoDB", "APScheduler"],
    url: "https://t.me/Capsulixbot",
    accent: "#22D3EE",
    cover:
      "https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?w=900&q=80&auto=format&fit=crop",
    title: {
      tj: "Capsulix Bot",
      ru: "Capsulix Bot",
      en: "Capsulix Bot",
    },
    tagline: {
      tj: "Капсулаи вақт дар Telegram",
      ru: "Капсула времени в Telegram",
      en: "Time capsule in Telegram",
    },
    why: {
      tj: "Ҳама бояд имкон дошта бошанд ки бо худи ояндаи худ гуфтугӯ кунанд.",
      ru: "Каждый должен иметь возможность поговорить со своим будущим я.",
      en: "Everyone should be able to talk to their future self.",
    },
    what: {
      tj: "Бот барои Telegram, ки паёмҳои ту ба худи ояндаатро дар санаи мушаххас фиристод.",
      ru: "Telegram-бот, который отправляет твоё сообщение тебе же в указанную дату.",
      en: "Telegram bot that delivers your messages to your future self on a chosen date.",
    },
    built: {
      tj: "aiogram 3, APScheduler барои таъхири даќиќ, MongoDB барои нигоҳдории капсулаҳо.",
      ru: "aiogram 3, APScheduler для точной отложенной отправки, MongoDB для хранения капсул.",
      en: "aiogram 3, APScheduler for precise delayed delivery, MongoDB for capsule storage.",
    },
  },
  {
    id: "weather-ai",
    year: "2025",
    stack: ["Python", "aiogram", "OpenWeather API", "GPT"],
    url: "#",
    accent: "#10B981",
    cover:
      "https://images.unsplash.com/photo-1561553543-e4c7b608b98d?w=900&q=80&auto=format&fit=crop",
    title: {
      tj: "Боти обуҳаво бо AI",
      ru: "Бот погоды с AI",
      en: "Weather AI Bot",
    },
    tagline: {
      tj: "Обуҳаво бо тафсири AI",
      ru: "Погода с AI-комментарием",
      en: "Weather with AI commentary",
    },
    why: {
      tj: "Маълумоти оддии обуҳаво кофӣ нест — одамон тавсия ва тафсир мехоҳанд.",
      ru: "Сухие цифры о погоде не работают — людям нужен совет и интерпретация.",
      en: "Plain weather data isn't enough — people want advice and interpretation.",
    },
    what: {
      tj: "Telegram бот ки обуҳаворо барои ҳар шаҳр медиҳад ва бо AI шарҳ медиҳад: чӣ пӯшидан, гирифтани соябон ё не.",
      ru: "Telegram-бот: показывает погоду для любого города и AI-объяснение: что надеть, нужен ли зонт.",
      en: "Telegram bot: weather for any city plus AI commentary on what to wear, whether to bring an umbrella.",
    },
    built: {
      tj: "aiogram + OpenWeather API + GPT-4o-mini барои тавсияҳои табиӣ ба забонҳои гуногун.",
      ru: "aiogram + OpenWeather API + GPT-4o-mini для естественных рекомендаций на разных языках.",
      en: "aiogram + OpenWeather API + GPT-4o-mini for natural recommendations in several languages.",
    },
  },
  {
    id: "portfolio",
    year: "2025",
    stack: ["React", "FastAPI", "Tailwind", "MongoDB"],
    url: "#",
    accent: "#A855F7",
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80&auto=format&fit=crop",
    title: {
      tj: "Ин вебсайт",
      ru: "Этот сайт",
      en: "This website",
    },
    tagline: {
      tj: "Портфолиои шахсӣ",
      ru: "Личное портфолио",
      en: "Personal portfolio",
    },
    why: {
      tj: "Лозим буд як ҷои ягона дошта бошам барои нишон додани кор, малакаҳо ва андешаҳои худам.",
      ru: "Нужно было одно место, где можно показать работы, навыки и мысли.",
      en: "I needed a single place to show my work, skills and thoughts.",
    },
    what: {
      tj: "Портфолио бо твитҳо, лоиҳаҳо, малакаҳо. Бо 3 забон, 2 тема, mobile-first.",
      ru: "Портфолио с твитами, проектами, навыками. 3 языка, 2 темы, mobile-first.",
      en: "Portfolio with tweets, projects, skills. 3 languages, 2 themes, mobile-first.",
    },
    built: {
      tj: "React 19 + FastAPI + MongoDB. Lazy loading, view tracking, theme & language switcher.",
      ru: "React 19 + FastAPI + MongoDB. Lazy loading, счётчик просмотров, переключение темы и языка.",
      en: "React 19 + FastAPI + MongoDB. Lazy loading, view tracking, theme & language switching.",
    },
  },
];
