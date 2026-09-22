// ============================================================
// 파리·스위스·이탈리아 허니문 11일 — 유태현·이채린 신혼여행
// 데이터 모듈 (블루여행사 견적서 2026-06-10 기준)
// ============================================================

const TRIP = {
  id: "honeymoon-2026",        // 동기화 키 네임스페이스 — europe-trip과 겹치지 않도록 구분
  title: "파리·스위스·이탈리아",
  subtitle: "유태현 · 이채린 허니문 11일",
  countries: "프랑스 → 스위스 → 이탈리아",
  start: "2026-11-15",
  end: "2026-11-25",
  totalDays: 11,
  nights: 9,
  people: "신랑신부 2인",
};

// ---- 지역별 상세 (요약 카드용) ----
const REGIONS = [
  {
    region: "프랑스",
    range: "11/15 ~ 11/18 (3박)",
    cities: [
      { name: "파리", nights: 3, range: "11/15~11/18", weather: "낮 10~12℃ / 밤 4~6℃, 초겨울", stay: "Pullman Paris Tour Eiffel ★★★★ (Deluxe·Balcony·Eiffel View 업그레이드)",
        highlights: "샤이요궁·에펠탑 야경, 라빠예뜨·쁘렝땅·봉마르쉐 쇼핑, 생제르맹데프레·마레지구, 앙젤리나 몽블랑·라뒤레 마카롱",
        dayTrip: "베르사유궁전(연회장·정원)" },
    ],
  },
  {
    region: "스위스",
    range: "11/18 ~ 11/21 (3박)",
    cities: [
      { name: "루체른", nights: 1, range: "11/18~11/19", weather: "낮 3~6℃, 알프스 초입 쌀쌀함", stay: "Hotel Waldstaetterhof ★★★ Premium, Zentralstrasse 4",
        highlights: "루체른 호수와 백조, 구시가지 산책", dayTrip: "리기산·필라투스산·티틀리스산 중 반일 코스" },
      { name: "그린델발트", nights: 2, range: "11/19~11/21", weather: "낮 0~4℃, 산악지대 추위 · 방한 필수", stay: "Jungfrau Lodge Swiss Mountain Hotel ★★★ (Eiger View 업그레이드), Dorfstrasse 49",
        highlights: "아이거 북벽 전망, 스위스 전통가옥 샬레 마을 풍경",
        dayTrip: "융프라우요흐(아이거익스프레스, 전망대 신라면, 만년설, 아이거글레처-클라이네샤이덱 하이킹)" },
    ],
  },
  {
    region: "이탈리아",
    range: "11/21 ~ 11/24 (3박)",
    cities: [
      { name: "피렌체", nights: 1, range: "11/21~11/22", weather: "낮 12~14℃ / 밤 5℃", stay: "MH Florence Hotel & Spa ★★★★, Via Luigi Alamanni 37",
        highlights: "우피치 미술관, 산타마리아노벨라 성당, 두오모, 베키오다리 — 도보 여행 가능한 도시", dayTrip: "-" },
      { name: "로마", nights: 2, range: "11/22~11/24", weather: "낮 15~16℃ / 밤 6~7℃, 봄가을 같은 날씨", stay: "The Independent Hotel ★★★★ Superior, Via Volturno 48",
        highlights: "트레비분수·스페인계단·콘도티거리·포폴로광장, 판테온·콜로세움",
        dayTrip: "바티칸 반일투어(패스트트랙, 08:15~14:00 — 회화관·솔방울정원·벨베데레정원·시스티나소성당·베드로대성당)" },
    ],
  },
];

// ---- 지도용 도시 스탑 (경로 순서) ----
const STOPS = [
  { name: "파리", nation: "프랑스", country: "프랑스", lat: 48.8529682, lng: 2.3499021, range: "11/15~11/18 (3박)", note: "에펠탑 야경, 베르사유궁전" },
  { name: "루체른", nation: "스위스", country: "스위스", lat: 47.0501682, lng: 8.3093072, range: "11/18~11/19 (1박)", note: "루체른 호수, 3대 명산 반일투어" },
  { name: "그린델발트", nation: "스위스", country: "스위스", lat: 46.624164, lng: 8.0413962, range: "11/19~11/21 (2박)", note: "융프라우요흐 Top of Europe" },
  { name: "피렌체", nation: "이탈리아", country: "이탈리아", lat: 43.773145, lng: 11.2559602, range: "11/21~11/22 (1박)", note: "우피치 미술관, 두오모" },
  { name: "로마", nation: "이탈리아", country: "이탈리아", lat: 41.8991328, lng: 12.4732921, range: "11/22~11/24 (2박)", note: "바티칸 투어 — 11/24 출국" },
];

// ---- 지도 세부 경로용 좌표 (도시 허브 + 당일투어 목적지) ----
const WAYPOINTS = {
  paris: [48.8529682, 2.3499021], versailles: [48.8048649, 2.1203554],
  basel: [47.5475873, 7.5897064],
  lucerne: [47.0501682, 8.3093072],
  interlaken: [46.6863481, 7.8632049],
  grindelwald: [46.624164, 8.0413962], jungfraujoch: [46.5474576, 7.9821133],
  firenze: [43.773145, 11.2559602],
  roma: [41.8991328, 12.4732921], vatican: [41.9064878, 12.4536413],
};

// 도시 밖(당일투어) 지점만 지도에 보조 점으로 표시할 때 쓰는 표시명
const WAYPOINT_LABELS = {
  versailles: "베르사유궁전", basel: "바젤(경유)", interlaken: "인터라켄(경유)",
  jungfraujoch: "융프라우요흐(Top of Europe)", vatican: "바티칸",
};

// 지도 탭의 "지역별 상세 보기" 버튼에 쓰이는 그룹 (허브 도시 + 당일투어 지점 id)
const REGION_MAP_GROUPS = [
  { label: "프랑스", ids: ["paris", "versailles"] },
  { label: "스위스", ids: ["lucerne", "interlaken", "grindelwald", "jungfraujoch", "basel"] },
  { label: "이탈리아", ids: ["firenze", "roma", "vatican"] },
];

// 날짜별 그날의 이동 경로(웨이포인트 id 순서). 2개 이상이면 당일(오전~저녁) 붉은선,
// 전날 마지막 지점 → 다음날 첫 지점은 파란선(일별 이동)으로 app.js가 자동으로 그립니다.
const DAY_ROUTES = {
  "2026-11-15": ["paris"],
  "2026-11-16": ["paris"],
  "2026-11-17": ["paris", "versailles", "paris"],
  "2026-11-18": ["paris", "basel", "lucerne"],
  "2026-11-19": ["lucerne", "interlaken", "grindelwald"],
  "2026-11-20": ["grindelwald", "jungfraujoch", "grindelwald"],
  "2026-11-21": ["grindelwald", "interlaken", "firenze"],
  "2026-11-22": ["firenze", "roma"],
  "2026-11-23": ["roma", "vatican", "roma"],
  "2026-11-24": ["roma"],
  "2026-11-25": [],
};

// ---- 일자별 상세 일정 (D1~D11, 2026.11.15~11.25) ----
const DAILY = [
 ["2026-11-15","프랑스·파리","Pullman Paris Tour Eiffel","인천국제공항 출발(OZ501, 10:05)","파리 샤를드골공항 도착(16:25), 픽업차량으로 호텔 이동","샤이요궁·에펠탑 야경 감상(트로카데로 정원)","인천공항 출발 3시간 전까지 도착 — 직항 14시간20분"],
 ["2026-11-16","프랑스·파리","Pullman Paris Tour Eiffel","호텔 조식 후 파리 시내 자유여행","라빠예뜨·쁘렝땅·봉마르쉐 백화점, 생제르맹데프레·마레지구 쇼핑","앙젤리나 몽블랑·라뒤레 마카롱과 커피","전일 자유여행"],
 ["2026-11-17","프랑스·파리","Pullman Paris Tour Eiffel","호텔 조식 후 근교 자유여행","베르사유궁전(연회장·정원, 루이 14세의 삶)","파리 복귀, 자유식사","파리 근교 반일~전일"],
 ["2026-11-18","스위스·루체른","Hotel Waldstaetterhof","호텔 조식 후 루체른행 열차 이동","Paris Gare de Lyon(09:26)→Basel SBB(13:23), Basel SBB(14:04)→Luzern(15:05)","루체른 도착, 호텔 이동 및 자유여행","고속열차·주간열차 총 5시간40분 — 이동일"],
 ["2026-11-19","스위스·그린델발트","Jungfrau Lodge Swiss Mountain Hotel","호텔 조식 후 루체른 반일여행(리기산·필라투스산·티틀리스산 중 선택)","그린델발트행 열차 이동(Luzern→Interlaken Ost→Grindelwald)","그린델발트 도착, 호텔 이동 및 자유여행","주간열차 총 2시간40분 — 이동일"],
 ["2026-11-20","스위스·그린델발트","Jungfrau Lodge Swiss Mountain Hotel","융프라우 전일 자유여행 — 아이거익스프레스로 전망대行","융프라우 전망대에서 신라면, 만년설 밟아보기","아이거글레처-클라이네샤이덱 구간 하이킹","할인쿠폰 이용, 등반열차 비용은 불포함"],
 ["2026-11-21","이탈리아·피렌체","MH Florence Hotel & Spa","기상 후 피렌체행 열차 이동 시작(Grindelwald 06:47)","Interlaken Ost→Spiez→Milano Centrale(10:54)→Firenze S.M.N.(13:04)","피렌체 도착, 호텔 이동 및 자유여행(우피치·두오모·베키오다리)","주간열차+고속열차 총 6시간20분 — 이동일, 이른 기상 필요"],
 ["2026-11-22","이탈리아·로마","The Independent Hotel","호텔 조식 후 로마행 고속열차 이동","Firenze S.M.N.(시간지정)→Roma Termini(시간지정), 약 1시간40분","로마 도착, 호텔 이동 및 자유여행(트레비분수·스페인계단·콘도티거리)","이동일"],
 ["2026-11-23","이탈리아·로마","The Independent Hotel","바티칸 반일투어(패스트트랙, 08:15~14:00)","회화관·솔방울정원·벨베데레정원·시스티나소성당(천지창조·최후의심판)·베드로대성당","호텔 인근 자유식사","입장료·무선수신기 55유로는 불포함, 전문가이드 동행"],
 ["2026-11-24","이탈리아·로마","The Independent Hotel","호텔 조식 후 로마 반일 자유여행(판테온·콜로세움)","공항 픽업차량 이동(출발 3시간 전)","로마 피우미치노공항 출발(OZ562, 22:00)","귀국일 — 직항 11시간35분"],
 ["2026-11-25","이동","-","기내","인천국제공항 도착(17:35)","귀국 완료","-"],
].map((r, i) => ({
  no: i + 1, date: r[0], city: r[1], stay: r[2], am: r[3], pm: r[4], eve: r[5], note: r[6],
  transit: r[6].includes("이동일") || r[1] === "이동",
  route: DAY_ROUTES[r[0]] || [],
}));

// ---- 예산 (블루여행사 견적, 2026-06-10 기준) ----
// 견적서가 1인당 총액만 제공하므로 세부 항목 금액은 임의로 나누지 않고 총액만 반영합니다.
const BUDGET_DETAILED = [
  {
    category: "패키지 견적가 (블루여행사, 2026-06-10 기준)",
    items: [
      { label: "성인 2인 패키지 견적가", note: "1인 5,665,000원 × 2인 — 왕복국제선(OZ), 호텔 9박(조식포함), 스위스패스 4일권, 이탈리아 구간 1등석 업그레이드, 바티칸투어 등 포함. 항공TAX·유가할증료·제세공과금 포함", amount: 11330000 },
    ],
  },
];

// ---- 준비사항 체크리스트 ----
const CHECKLIST = [
  { cat: "포함사항", items: [
    "유럽 왕복국제선 항공권 [OZ 아시아나항공]",
    "블루 추천호텔 9박 [조식포함/2인실 기준]",
    "파리→바젤 구간 고속열차 (2등석/시간&좌석지정)",
    "스위스패스 연속 4일권 성인 2등석 2회 — 주간열차/유람선/대중교통 무료탑승 + 박물관/미술관 무료입장",
    "스위스→이탈리아구간 좌석예약비 (2등석/시간지정)",
    "이탈리아 2구간 고속열차 (2등석/시간좌석지정) ★1등석 업그레이드: 밀라노→피렌체 / 피렌체→로마",
    "파리공항→호텔 픽업차량 서비스 (한인업체)",
    "로마호텔→공항 픽업차량 서비스 (한인업체)",
    "현지투어: 바티칸투어",
    "유럽여행 정보책자제공 (팀당 1권)",
    "에이스여행자보험 [최대 1억원 보장]",
    "USB멀티어댑터(팀당 1개), 네임택 등",
    "융프라우 할인쿠폰 및 스위스관광청 배포자료",
    "파리 세느강유람선티켓 서비스 제공 (바토파리지앵/오픈티켓)",
  ]},
  { cat: "불포함사항", items: [
    "개인경비 (시내교통비 및 근교 여행경비, 입장료, 중·석식비)",
    "유럽호텔 투어리스트TAX (1박/1인/3~10유로, 호텔 체크인 시 현지 지불)",
    "융프라우 등반열차 비용",
    "투어 불포함사항 (현지에서 가이드에게 현금 지불 — 세부일정 확인 필요)",
  ]},
  { cat: "2026 허니문 이벤트 혜택 (한시적)", items: [
    "혜택1: 다이슨 트래블 헤어드라이어(팀당 1개) 또는 1인 기준 20만원 할인 중 택1 — 6월간 한시적 적용",
    "혜택2: 호텔 객실 업그레이드 — 파리(Eiffel View), 그린델발트(Eiger View) 세부 일정표 반영됨",
    "혜택3: USB 멀티 어댑터 및 커플 네임택 제공",
    "최초 견적 확인 후 3일 이내 계약 시 적용, 계약 이후 세부일정 조정 가능",
  ]},
  { cat: "항공 스케줄", items: [
    "출국 OZ501: 인천 10:05 출발 → 파리 16:25 도착 (직항, 14시간20분)",
    "귀국 OZ562: 로마 22:00 출발 → 인천 17:35 도착 (직항, 11시간35분)",
    "인천국제공항은 출발 3시간 전까지 도착",
  ]},
  { cat: "여행사 정보", items: [
    "(주)젊은여행사블루/블루여행사(since 1993) — 서울시 강남구 언주로 157길 15(신사동 626-40) 4층",
    "담당: 배영은 과장 / 070-7730-6607 / yebae@bluetravel.co.kr",
    "전화 02-3445-6161 / 팩스 02-3445-6169 / www.bluetravel.co.kr",
    "24시간 비상연락서비스 제공",
    "견적일자 2026-06-10 기준 — 계약 시점에 환율·좌석·호텔 최종 확정 필요",
  ]},
];

// ---- 지역별 꼭 알아야 할 사항 ----
const REGION_TIPS = [
  {
    region: "프랑스",
    tips: [
      "에펠탑은 매시 정각 조명이 반짝이는 연출이 있어 트로카데로 정원에서 보는 야경을 놓치지 말 것",
      "베르사유궁전은 파리에서 근교로 이동하는 반일~전일 일정 — 편한 신발 필수",
      "라빠예뜨·쁘렝땅 등 백화점 면세 쇼핑 시 여권 지참",
      "파리 시내 자유여행일은 대중교통(지하철) 1일권 구매를 고려",
    ],
  },
  {
    region: "스위스",
    tips: [
      "스위스패스 4일권으로 주간열차·유람선·대중교통 무료 탑승 및 박물관 무료입장 — 사용 시작일을 여행사와 미리 확인",
      "그린델발트는 산악지대라 11월 기온이 0~4℃ 안팎으로 낮 — 방한복·방한화 필수",
      "융프라우 등반열차 비용은 불포함이므로 할인쿠폰을 반드시 지참",
      "루체른 3대 명산(리기산·필라투스산·티틀리스산)은 반일 코스이므로 하나만 선택",
    ],
  },
  {
    region: "이탈리아",
    tips: [
      "피렌체는 도보로 충분히 다닐 수 있는 아담한 도시 — 지붕 없는 박물관이라 불릴 만큼 시내 전체가 볼거리",
      "밀라노→피렌체, 피렌체→로마 구간은 1등석으로 업그레이드되어 있음",
      "바티칸 투어는 패스트트랙이지만 입장료·무선수신기(55유로)는 현지에서 별도 지불",
      "로마 자유여행일에는 판테온·콜로세움·트레비분수 등 도보권 명소 위주로 동선을 짜면 효율적",
    ],
  },
];

// ---- 도시별 주소록 (Uber/택시용) ----
const ADDRESSES = [
  { city: "파리", airport: "Aéroport de Paris-Charles de Gaulle (CDG), 95700 Roissy-en-France", landmark: "Tour Eiffel, Champ de Mars, 5 Avenue Anatole France, 75007 Paris", stay: "Pullman Paris Tour Eiffel ★★★★ (Deluxe·Balcony·Eiffel View)" },
  { city: "루체른", airport: "(취리히 또는 바젤 경유, 철도 이동)", landmark: "Kapellbrücke, 6002 Luzern, Switzerland", stay: "Hotel Waldstaetterhof, Zentralstrasse 4, Luzern ★★★ Premium" },
  { city: "그린델발트", airport: "(인터라켄 경유, 철도 이동)", landmark: "Grindelwald Grund, 3818 Grindelwald, Switzerland", stay: "Jungfrau Lodge Swiss Mountain Hotel, Dorfstrasse 49, Grindelwald ★★★ (Eiger View)" },
  { city: "피렌체", airport: "Aeroporto di Firenze, Via del Termine 11, 50127 Firenze FI", landmark: "Piazza del Duomo, 50122 Firenze FI", stay: "MH Florence Hotel & Spa, Via Luigi Alamanni 37, Firenze ★★★★" },
  { city: "로마", airport: "Aeroporto di Fiumicino (FCO), Via dell'Aeroporto di Fiumicino 320, 00054 Fiumicino RM", landmark: "Fontana di Trevi, Piazza di Trevi, 00187 Roma RM", stay: "The Independent Hotel, Via Volturno 48, Roma ★★★★ Superior" },
];
