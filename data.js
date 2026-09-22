// ============================================================
// 유태현·이채린 신혼여행 — 파리·스위스·이탈리아 11일 (Honeymoon)
// 데이터 모듈 — 블루여행사(Blue Europe) 견적서 2026-06-10 기준
// ============================================================

const TRIP = {
  id: "honeymoon-2026",          // 동기화 키 네임스페이스
  title: "유태현·이채린 신혼여행",
  subtitle: "파리·스위스·이탈리아 11일 Honeymoon",
  countries: "프랑스 → 스위스 → 이탈리아",
  start: "2026-11-15",
  end: "2026-11-25",
  totalDays: 11,
  nights: 9,
  people: "신랑 유태현 · 신부 이채린 (2인)",
};

// ---- 지역별 요약 카드 ----
const REGIONS = [
  {
    region: "프랑스",
    range: "11/15 ~ 11/18 (3박)",
    cities: [
      { name: "파리", nights: 3, range: "11/15~11/18", weather: "11월 중순, 낮 8~11℃, 밤 3~5℃, 쌀쌀", stay: "Pullman Paris Tour Eiffel ★★★★ (Deluxe, Balcony, Eiffel View)",
        highlights: "샤이요궁·에펠탑 야경(트로카데로 정원), 라빠예뜨·쁘렝땅·봉마르쉐 백화점, 생제르맹데프레·마레지구, 앙젤리나 몽블랑·라뒤레 마카롱",
        dayTrip: "베르사유궁전(연회장·정원)" },
    ],
  },
  {
    region: "스위스",
    range: "11/18 ~ 11/21 (3박)",
    cities: [
      { name: "루체른", nights: 1, range: "11/18~11/19", weather: "산악지대, 낮 3~6℃, 눈·서리 가능", stay: "Hotel Waldstaetterhof ★★★ Premium (Zentralstrasse 4)",
        highlights: "호수와 백조, 카펠교", dayTrip: "리기산·필라투스산·티틀리스산 중 반일 여행(택1)" },
      { name: "그린델발트", nights: 2, range: "11/19~11/21", weather: "고산지대, 낮 -2~3℃, 밤 영하권 — 방한 필수", stay: "Jungfrau Lodge Swiss Mountain Hotel ★★★ Standard, Eiger View 업그레이드(이벤트)",
        highlights: "아이거 북벽 조망, 스위스 전통가옥 샬레 마을",
        dayTrip: "융프라우요흐(유럽의 지붕, 아이거익스프레스), 아이거글레처-클라이네샤이덱 하이킹" },
    ],
  },
  {
    region: "이탈리아",
    range: "11/21 ~ 11/24 (3박)",
    cities: [
      { name: "피렌체", nights: 1, range: "11/21~11/22", weather: "낮 12~14℃ 내외", stay: "MH Florence Hotel & Spa ★★★★ (Via Luigi Alamanni, 37)",
        highlights: "우피치미술관, 산타마리아노벨라성당, 두오모, 베키오다리 — 도보로 다니기 좋은 소도시",
        dayTrip: "-" },
      { name: "로마", nights: 2, range: "11/22~11/24", weather: "낮 14~16℃ 내외", stay: "The Independent Hotel ★★★★ Superior (Via Volturno 48)",
        highlights: "트레비분수, 스페인계단, 콘도티거리, 포폴로 광장, 판테온",
        dayTrip: "바티칸 반일투어(패스트트랙) — 회화관·시스티나소성당·성 베드로 대성당" },
    ],
  },
];

// ---- 지도용 도시 스탑 ----
const STOPS = [
  { name: "파리", nation: "프랑스", country: "프랑스", lat: 48.8529682, lng: 2.3499021, range: "11/15~11/18 (3박)", note: "에펠탑 야경, 베르사유궁전" },
  { name: "루체른", nation: "스위스", country: "스위스", lat: 47.0501682, lng: 8.3093072, range: "11/18~11/19 (1박)", note: "리기산·필라투스산·티틀리스산" },
  { name: "그린델발트", nation: "스위스", country: "스위스", lat: 46.624164, lng: 8.0413962, range: "11/19~11/21 (2박)", note: "융프라우요흐(유럽의 지붕)" },
  { name: "피렌체", nation: "이탈리아", country: "이탈리아", lat: 43.773145, lng: 11.2559602, range: "11/21~11/22 (1박)", note: "우피치, 두오모" },
  { name: "로마", nation: "이탈리아", country: "이탈리아", lat: 41.8991328, lng: 12.4732921, range: "11/22~11/24 (2박)", note: "바티칸, 트레비분수 — 11/24 출국" },
];

// ---- 지도 세부 경로 좌표 ----
const WAYPOINTS = {
  paris: [48.8529682, 2.3499021], versailles: [48.8048649, 2.1203554],
  basel: [47.5595986, 7.5885761],
  lucerne: [47.0501682, 8.3093072], rigi: [47.055985, 8.4851606],
  interlaken: [46.6863481, 7.8632049], spiez: [46.6884826, 7.6791524],
  grindelwald: [46.624164, 8.0413962], jungfraujoch: [46.5474576, 7.9821133],
  milan: [45.4640976, 9.1919265],
  florence: [43.773145, 11.2559602],
  roma: [41.8991328, 12.4732921], vatican: [41.9021667, 12.4539367],
};

const WAYPOINT_LABELS = {
  versailles: "베르사유궁전", basel: "바젤(경유)", rigi: "리기산", spiez: "슈피츠(경유)",
  jungfraujoch: "융프라우요흐", milan: "밀라노(경유)", vatican: "바티칸",
};

const REGION_MAP_GROUPS = [
  { label: "프랑스", ids: ["paris", "versailles"] },
  { label: "스위스", ids: ["lucerne", "rigi", "grindelwald", "jungfraujoch"] },
  { label: "이탈리아", ids: ["florence", "roma", "vatican"] },
];

const DAY_ROUTES = {
  "2026-11-15": ["paris"],
  "2026-11-16": ["paris"],
  "2026-11-17": ["paris", "versailles", "paris"],
  "2026-11-18": ["paris", "basel", "lucerne"],
  "2026-11-19": ["lucerne", "rigi", "lucerne", "interlaken", "grindelwald"],
  "2026-11-20": ["grindelwald", "jungfraujoch", "grindelwald"],
  "2026-11-21": ["grindelwald", "interlaken", "spiez", "milan", "florence"],
  "2026-11-22": ["florence", "roma"],
  "2026-11-23": ["roma", "vatican", "roma"],
  "2026-11-24": ["roma"],
  "2026-11-25": [],
};

// ---- 일자별 상세 일정 ----
const DAILY = [
 ["2026-11-15","프랑스·파리","Pullman Paris Tour Eiffel","인천 출발(OZ501, 10:05)","파리 샤를드골공항 도착(16:25)","호텔 픽업차량 이동, 파리 야경 감상(샤이요궁·에펠탑, 트로카데로 정원)","인천공항 출발 3시간 전까지 도착 — 이동일"],
 ["2026-11-16","프랑스·파리","Pullman Paris Tour Eiffel","호텔 조식","파리 시내 자유여행 — 라빠예뜨·쁘렝땅·봉마르쉐 백화점, 생제르맹데프레·마레지구 쇼핑","앙젤리나 몽블랑·라뒤레 마카롱 등 디저트 카페","-"],
 ["2026-11-17","프랑스·파리","Pullman Paris Tour Eiffel","호텔 조식","베르사유궁전 근교 자유여행(연회장·정원)","자유식사","-"],
 ["2026-11-18","스위스·루체른","Hotel Waldstaetterhof","파리 Gare de Lyon 출발(09:26) → 바젤 SBB 도착(13:23)","바젤 SBB 출발(14:04) → 루체른 도착(15:05)","호텔 체크인, 루체른 자유여행(호수·백조)","주간열차 2등석 시간·좌석지정 — 이동일"],
 ["2026-11-19","스위스·그린델발트","Jungfrau Lodge Swiss Mountain Hotel(Eiger View)","루체른 반일여행 — 리기산·필라투스산·티틀리스산 중 선택","그린델발트로 열차 이동(Luzern→Interlaken Ost→Grindelwald, 오픈티켓)","호텔 체크인, 그린델발트 자유여행","스위스패스 4일권 이용 — 이동일"],
 ["2026-11-20","스위스·그린델발트","Jungfrau Lodge Swiss Mountain Hotel(Eiger View)","융프라우 전일 자유여행 — 아이거익스프레스로 융프라우요흐 이동","융프라우 전망대(유럽의 지붕), 만년설 체험, 신라면","아이거글레처-클라이네샤이덱 구간 하이킹","융프라우 등반열차 비용은 불포함(할인쿠폰 제공)"],
 ["2026-11-21","이탈리아·피렌체","MH Florence Hotel & Spa","그린델발트 출발(06:47)→인터라켄 오스트(07:24)→슈피츠(07:48)","슈피츠 출발(08:05)→밀라노 첸트랄레(10:54), 밀라노→피렌체 SMN(11:10→13:04)","호텔 체크인, 피렌체 자유여행(우피치·두오모·베키오다리 추천)","고속열차 2구간 1등석 업그레이드 — 이동일"],
 ["2026-11-22","이탈리아·로마","The Independent Hotel","호텔 조식","피렌체 SMN → 로마 테르미니 고속열차 이동(약 1시간40분)","호텔 체크인, 로마 자유여행(트레비분수·스페인계단·콘도티거리·포폴로 광장)","이동일"],
 ["2026-11-23","이탈리아·로마","The Independent Hotel","바티칸 반일투어(패스트트랙, 08:15~14:00) — 회화관·솔방울정원·벨베데레정원","시스티나소성당(천지창조·최후의심판)·베드로대성당","자유식사","무선수신기 비용 55유로 불포함"],
 ["2026-11-24","이탈리아·로마","The Independent Hotel","호텔 조식","로마 반일 자유여행 — 판테온, 콜로세움 등","공항 픽업차량 이동, 아시아나항공 탑승수속","로마 피우미치노 출발 22:00(OZ562) — 이동일"],
 ["2026-11-25","이동","-","인천국제공항 도착(17:35)","귀국 완료","-","-"],
].map((r, i) => ({
  no: i + 1, date: r[0], city: r[1], stay: r[2], am: r[3], pm: r[4], eve: r[5], note: r[6],
  transit: r[6].includes("이동일") || r[1] === "이동",
  route: DAY_ROUTES[r[0]] || [],
}));

// ---- 예산 (블루여행사 견적서 기준, 2026-06-10) ----
const BUDGET_DETAILED = [
  {
    category: "패키지 기본요금",
    items: [
      { label: "파리/스위스/이탈리아 11일 패키지 (성인 1인 견적가 × 2인)", note: "항공TAX·유가할증료·제세공과금 포함, 1인 5,665,000원 × 2인, 2026-06-10 견적 기준 — 최초 견적 확인 후 3일 이내 계약 시 이벤트 적용", amount: 11330000 },
    ],
  },
  {
    category: "불포함 추가 예상비용",
    items: [
      { label: "유럽호텔 투어리스트税", note: "1박/1인 3~10유로, 9박×2인 평균 추정(호텔 체크인 시 현장 지불)", amount: 178200 },
      { label: "바티칸 무선수신기", note: "55유로/인 추정, 2인 (현지 가이드에게 현금 지불)", amount: 181500 },
      { label: "융프라우 등반열차", note: "금액 미정 — 할인쿠폰 제공, 현장에서 등급별 확인 필요", amount: 0 },
      { label: "개인경비(시내교통·근교경비·입장료·중석식비)", note: "견적서상 별도 산정 필요 — 실제 지출은 현지에서 확정", amount: 0 },
    ],
  },
];

// ---- 지역별 꼭 알아야 할 사항 ----
const REGION_TIPS = [
  { region: "프랑스", tips: [
    "베르사유궁전은 사전 온라인 티켓 예매 권장(현장 대기줄 긴 편)",
    "11월은 쌀쌀하므로 코트·목도리 등 방한 준비",
    "파리 시내 소매치기 주의(관광 밀집지역·대중교통)",
  ]},
  { region: "스위스", tips: [
    "그린델발트·융프라우 지역은 11월 기준 영하권 — 방한복·방한화 필수",
    "융프라우요흐 방문은 날씨에 따라 전망이 크게 달라지므로 당일 아침 날씨 확인",
    "스위스패스 4일권은 주간열차·유람선·대중교통 무료탑승 + 박물관·미술관 무료입장 포함 — 사용 시 반드시 지참",
    "루체른 반일여행(리기산/필라투스산/티틀리스산)은 3곳 중 1곳만 포함이므로 사전 선택 필요",
  ]},
  { region: "이탈리아", tips: [
    "피렌체는 도보로 충분히 다닐 수 있는 규모 — 대중교통 없이도 여행 가능",
    "바티칸 투어는 패스트트랙이라도 사전 집합시간(08:15) 준수 필요",
    "호텔 투어리스트税는 체크인 시 현금으로 별도 지불",
  ]},
];

// ---- 준비사항 체크리스트 ----
const CHECKLIST = [
  { cat: "예약 조건 (견적서 기준)", items: [
    "최초 견적 확인 후 3일 이내 계약 시 이벤트 혜택 적용 — 다이슨 트래블 헤어드라이어(팀당 1개) 또는 1인 기준 20만원 할인 중 택1(2026년 6월 한시)",
    "혜택 2: 호텔 객실 업그레이드(세부 일정표 참고) / 혜택 3: USB 멀티어댑터 및 커플 네임택 제공",
    "계약 이후에도 세부일정 조정 가능 — 여행사(배영은 과장, 070-7730-6607)와 최종 일정 재확인",
  ]},
  { cat: "포함사항", items: [
    "유럽 왕복국제선 항공권(OZ 아시아나항공 직항)",
    "블루 추천호텔 9박(조식포함, 2인실 기준)",
    "파리→바젤 구간 고속열차(2등석/시간·좌석지정)",
    "스위스패스 연속 4일권 성인 2등석 2회",
    "스위스→이탈리아 구간 좌석예약비, 이탈리아 2구간 고속열차(1등석 업그레이드: 밀라노→피렌체/피렌체→로마)",
    "파리공항↔호텔, 로마호텔↔공항 픽업차량 서비스(한인업체)",
    "바티칸투어(패스트트랙), 에이스여행자보험(최대 1억원 보장)",
    "파리 세느강 유람선티켓(바토파리지앵/오픈티켓), 유럽여행 정보책자, USB멀티어댑터·네임택",
  ]},
  { cat: "불포함사항 — 별도 확인", items: [
    "개인경비: 시내교통비, 근교 여행경비, 입장료, 중·석식비",
    "유럽호텔 투어리스트TAX: 1박/1인 3~10유로, 호텔 체크인 시 지불",
    "융프라우 등반열차 비용",
    "투어 불포함사항(현지에서 가이드에게 현금 지불) — 세부일정 확인 필요",
  ]},
  { cat: "출발 전 점검", items: [
    "여권 유효기간 확인(솅겐 출국 예정일 기준 6개월 이상 권장)",
    "인천국제공항 출발 3시간 전까지 도착",
    "스위스패스·유레일 실물 티켓(또는 모바일) 수령 확인",
    "여행자보험 증서 수령 확인",
    "24시간 비상연락서비스 연락처 메모",
  ]},
];

// ---- 주소록 (Uber/택시용) ----
const ADDRESSES = [
  { city: "파리", airport: "Aéroport de Paris-Charles de Gaulle (CDG), 95700 Roissy-en-France", landmark: "Place du Trocadéro, 75116 Paris (샤이요궁·에펠탑 야경 포인트)", stay: "Pullman Paris Tour Eiffel ★★★★" },
  { city: "루체른", airport: "(취리히 공항 경유, 철도 이동)", landmark: "Lucerne, Switzerland (카펠교 인근)", stay: "Hotel Waldstaetterhof, Zentralstrasse 4" },
  { city: "그린델발트", airport: "(취리히/제네바 경유, 철도 이동)", landmark: "Grindelwald, Switzerland", stay: "Jungfrau Lodge Swiss Mountain Hotel, Dorfstrasse 49" },
  { city: "피렌체", airport: "Aeroporto di Firenze, Via del Termine 11, 50127 Firenze FI", landmark: "Piazza del Duomo, 50122 Firenze FI", stay: "MH Florence Hotel & Spa, Via Luigi Alamanni 37" },
  { city: "로마", airport: "Aeroporto di Fiumicino (FCO), Via dell'Aeroporto di Fiumicino 320, 00054 Fiumicino RM", landmark: "Piazza San Pietro, 00120 Città del Vaticano", stay: "The Independent Hotel, Via Volturno 48" },
];
