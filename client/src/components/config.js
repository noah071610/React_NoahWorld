import { faAddressCard, faEnvelope, faImages, faLaptop } from "@fortawesome/free-solid-svg-icons";

// Color

export const BLUE_COLOR = "#1187cf";
export const MAIN_COLOR = "#D5F7E6";
export const SUB_COLOR = "#5AE4A8";
export const GRAY_COLOR = "rgba(0, 0, 0, 0.2)";
export const BG_COLOR = "rgb(247, 247, 247)";
export const RED_COLOR = "#f15b6c";

// Mainpage Desc

export const CARD_DESC_PS =
  "새로운 기술을 배우기전 항상 자신의 기본기를 점검합니다. 또한 문제를 정확하게 인식하고 배우고 기록합니다.";
export const CARD_DESC_COMU =
  "팀워크를 최우선으로 여기며 소통을 중심으로 매순간 신뢰의 기반을 다집니다.";
export const CARD_DESC_COOP =
  "코딩 자체를 즐기며 매순간 열정을 가지고 고비를 넘으며 담담하게 도전합니다.";

export const CardContents = [
  {
    squareTitle: "ProblemSolve",
    title: "문제해결능력을 위한 기본기",
    desc: CARD_DESC_PS,
    src: "/images/ProblemSolve.png",
  },
  {
    squareTitle: "Cooperation",
    title: "신뢰에서 오는 진정한 소통",
    desc: CARD_DESC_COMU,
    src: "/images/Cooperation.png",
  },
  {
    squareTitle: "Passion",
    title: "열정 그리고 도전",
    desc: CARD_DESC_COOP,
    src: "/images/Passion.png",
  },
];

// Nav Contents
export const navContents = [
  {
    icon: faAddressCard,
    explain: "About me",
    name: "aboutme",
  },
  {
    icon: faLaptop,
    explain: "Skills",
    name: "skills",
  },
  {
    icon: faImages,
    explain: "Portfolio",
    name: "portfolio",
  },
  {
    icon: faEnvelope,
    explain: "Contact",
    name: "contact",
  },
];

// Skill page
export const skills = [
  {
    name: "Html",
    src: "https://img.icons8.com/color/144/000000/html-5.png",
    desc: "웹표준을 준수하며 DOM-tree를 정확하게 파악합니다.",
    level: true,
  },
  {
    name: "CSS",
    src: "https://img.icons8.com/color/144/000000/css3.png",
    desc:
      "SCSS와 같은 전처리기 사용이 가능하며 다채로운 애니메이션과 더불어 브라우저 렌딩 특성을 파악해 최적화를 보장합니다.",
    level: true,
  },
  {
    name: "Java Script",
    src: "https://img.icons8.com/color/144/000000/javascript.png",
    desc: "기본문법부터 ES6 최신문법과 클로저,This,이벤트루프등 독특한 JS특성을 폭넓게 이해합니다.",
    level: true,
  },
  {
    name: "React",
    src: "https://img.icons8.com/color/144/000000/react-native.png",
    desc: "React 와 Hooks 문법, Redux와 Router 적용, jsx 와 SPA 의 특성을 이해합니다.",
    level: true,
  },
  {
    name: "Mysql",
    src: "https://img.icons8.com/ios-filled/100/000000/mysql-logo.png",
    desc:
      "시퀄라이즈를 적극활용하고 스키마 정의와 데이터베이스관계도를 이해해 데이터를 효율있게 관리합니다.",
    level: true,
  },
  {
    name: "Git",
    src: "https://img.icons8.com/nolan/128/github.png",
    desc: "형상관리의 기본원리와 버전관리,브랜치,백업등을 적극 활용합니다.",
    level: true,
  },
];

export const sub_skills = [
  {
    name: "Photoshop",
    src: "https://img.icons8.com/color/144/000000/adobe-photoshop.png",
  },
  {
    name: "Type Script",
    src: "https://img.icons8.com/color/144/000000/typescript.png",

    level: true,
  },
  {
    name: "Nodejs",
    src: "https://img.icons8.com/color/144/000000/nodejs.png",

    level: true,
  },

  {
    name: "MongoDB",
    src: "https://img.icons8.com/color/144/000000/mongodb.png",
  },
  {
    name: "Postman",
    src: "https://miro.medium.com/max/512/1*fVBL9mtLJmHIH6YpU7WvHQ.png",
  },
  {
    name: "Express",
    src: "https://www.mementotech.in/assets/images/icons/express.png",
    level: true,
  },
  {
    name: "Antd",
    src: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    level: true,
  },
  {
    name: "Styled-components",
    src: "https://avatars.githubusercontent.com/u/20658825?s=280&v=4",
    level: true,
  },
  {
    name: "PassportJS",
    src:
      "https://leolanchas.com/wp-content/uploads/2013/07/0d184ee3-fd8d-4b94-acf4-b4e686e57375.png",
    level: true,
  },
];

export const eng_desc = (
  <div>
    <p>· 개요: 문화체육관광부에서 실시하는 통역분야의 유일한 국가공인자격증(출처:Q-Net)</p>
    <p>· 취득당시 어학점수: TOEIC 925점(2018년 취득)</p>
  </div>
);
export const jap_desc = (
  <div>
    <p>· 개요: 문화체육관광부에서 실시하는 통역분야의 유일한 국가공인자격증(출처:Q-Net)</p>
    <p>· 취득당시 어학점수: JLPT1급(2019년 취득)</p>
  </div>
);

export const languages = [
  {
    name: "English",
    src: "https://img.icons8.com/color/96/000000/usa-circular.png",
    popup: true,
    licenseKor: "영어",
    content: eng_desc,
  },
  {
    name: "Japanese",
    src: "https://img.icons8.com/color/96/000000/japan-circular.png",
    popup: true,
    licenseKor: "일본어",
    content: jap_desc,
  },
];

//Portfolio

export const portfolio1 = {
  id: 1,
  name: "반응형 웹 포트폴리오 사이트",
  date: "2021/2~ 2021/3",
  tags: ["#Html", "#CSS", "#Javascript", "#React"],
  desc: `#반응형으로 모바일과 PC 둘 다 사용이 가능합니다.
  <br />#<span class="marker">간결하고 직관적인</span> 페이지로 가독성을 높였습니다.
  <br />
  #필요없는 기능은 과감하게 제거했으며 최적화를 보장합니다.
  <br />
  #야간모드 및 다양한 라이브러리를 이해하고 적용했습니다.`,
  src: "/images/portfolio/portfolio1_main.png",
  git: "https://github.com/noah071610",
};

export const portfolio2 = {
  id: 2,
  name: "반응형 웹 포트폴리오 사이트dd",
  date: "2021/2~ 2021/3zz",
  tags: ["#Html", "dd", "Javascript", "React"],
  desc: `#반응형으로 모바일과 PC 둘 다 사용이 가능합니다.
  <br />#<span class="marker">간결하고 직관적인</span> 페이지로 가독성을 높였습니다.
  <br />
  #필요없는 기능은 과감하게 제거했으며 dd최적화를 보장합니다.
  <br />
  #야간모드 및 다양한 라이브러리를 이해하고 적용했습니다.`,
  src: "/images/game.jpg",
  git: "https://github.com/noah071610",
};

export const portfolio3 = {
  id: 3,
  name: "ss",
  date: "2021/2~ 2021/3zz",
  tags: ["#Html", "dd", "Javascript", "React"],
  desc: `#반응형으로 모바일과 PC 둘 다 사용이 가능합니다.
  <br />#<span class="marker">간결하고 직관적인</span> 페이지로 가독성을 높였습니다.
  <br />
  #필요없는 기능은 과감하게 제거했으며 dd최적화를 보장합니다.
  <br />
  #야간모드 및 다양한 라이브러리를 이해하고 적용했습니다.`,
  src: "/images/game.jpg",
  git: "https://github.com/noah071610",
};
