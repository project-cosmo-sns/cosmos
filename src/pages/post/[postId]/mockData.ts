import { HashTagType } from '@/components/Post/types';

// 임시 데이터 및 타입
export interface Author {
  id: string;
  nickname: string;
  generation: number;
  profileImageUrl?: string;
}

export interface Comment {
  id: string;
  createdAt: string;
  author: Author;
  content: string;
  reactionCount: number;
  likedByCurrentUser: boolean;
}

export interface Tag {
  name: string;
  color: string;
}

export interface PostData {
  id: string;
  category: string;
  title: string;
  author: Author;
  createdAt: string;
  content: string;
  tags: HashTagType[];
  emoji: number;
  views: number;
  comments: Comment[];
}

const mockData: PostData[] = [
  {
    id: 'postId1',
    category: '정보공유',
    title: '마크다운 테스트 입니다.',
    author: {
      id: 'tmpuserIď1',
      nickname: '코스모스',
      generation: 3,
    },
    createdAt: '2024-05-01T08:58:29.000Z',
    content: `# Markdown Example
    
    마크다운 문법 테스트 본문
    
    
-------------------
<br/>
**Headers:** 

# Header 1
## Header 2
### Header 3

- **Lists:**
  - Unordered List:
    - Item 1
    - Item 2
  - Ordered List:
    1. Item 1
    2. Item 2

\`\`\`javascript
const example = () => console.log("Hello World!");
\`\`\`

\`\`\`python
def hello():
  print("Hello, world!")
\`\`\`

- **Links:**
  - [Google](https://www.google.com)

- **Images:**
  - ![Alt text](https://example.com/image.jpg)

- **Blockquotes:**
> This is a blockquote.

- **Emphasis:**
  - *Italic Text*
  - _Italic Text_
  - **Bold Text**
  - ***Italic and Bold Text***
  - ~~Canceled~~
  - \`textbox\`

- **Horizontal Rules:**
  ---

- **Tables:**
  | Header 1 | Header 2 |
  |----------|----------|
  | Cell 1   | Cell 2   |

- **Task Lists:**
  - [x] Task 1
  - [ ] Task 2
`,
    tags: [
      { tagName: '코스모스', color: 'RED' },
      { tagName: '포스트', color: 'ORANGE' },
      { tagName: '해시태그', color: 'YELLOW' },
      { tagName: '예시', color: 'GREEN' },
      { tagName: '입니다', color: 'BLUE' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId2',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: 3,
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: false,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: 3,
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: true,
      },
    ],
  },
  {
    id: 'postId2',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId3',
      nickname: '코스모스',
      generation: 3,
    },
    createdAt: '2024-05-02T08:58:29.000Z',
    content: `## 🕺 스프린터 브이로그 주인공 모집  💃
<br/>
@스프린터
<br/><br/>
코드잇 컨텐츠 마케팅 팀에서 스프린터 브이로그 촬영을 기획했습니다.
스프린터 브이로그 컨텐츠의 🙆‍♂️주인공을 맡아주실 스프린터 분을 모시고 있는데요!
<br/><br/>
마음이 움직이시는 분은 @매니저_정사도 에게 DM주세요!
⭐반짝 반짝 스프린터 분들의 감출 수 없는 끼를 펼쳐주세요! 기다리고 있겠습니다! 
<br/><br/>

- [출연 모집 안내문 링크](https://codeit.notion.site/bfe28ebc35b245e996f3ab5116d356ad)
- 영상 의도: 스프린터 학습공간 및 위워크 공간 소개 / 온라인 부트캠프를 트렌디하게 수강하고 있음을 담아 내기
- 출연: 현재 위워크 학습공간에 자주 출석하시는 스프린터 (1명)
- 예상 촬영 시간 및 영상 분량: 2시간 내외 / 1분 분량의 릴스 약 4개
- 증정: 네이버페이 5만원권
<br/><br/>
`,
    tags: [
      { tagName: '코스모스', color: 'RED' },
      { tagName: '포스트', color: 'ORANGE' },
      { tagName: '해시태그', color: 'YELLOW' },
      { tagName: '예시', color: 'GREEN' },
      { tagName: '입니다', color: 'BLUE' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId4',
          nickname: '코스모스',
          generation: 3,
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: 3,
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
  {
    id: 'postId3',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId5',
      nickname: '코스모스',
      generation: 3,
    },
    createdAt: '2024-04-02T08:58:29.000Z',
    content: `## 📢 심화 프로젝트 발표 세션 및 수료식 일정 안내
@스프린터  파트4 주요일정에 대해 안내드립니다

- 4/15(월) 팀별 기획안 제출
- 5/1(수) 중간점검 제출 마감
  - 각 팀별 진행상황을 공유해주시면 됩니다. 따로 발표자료를 준비하실 필요는 없고 저희가 제공드리는 노션 포맷에 맞게 작성해주시면 됩니다 (추후 공유 예정)
- 5/17(금) 심화 프로젝트 발표
  - 이전 발표 세션과 동일하게 비대면으로 진행됩니다

- 5/18(토) 3시 ~ 6시 오프라인 수료식
  - 코드잇 본사에서 수료식이 진행됩니다. 참석 여부를 조사하니 4/15(월)까지 제출해주세요. 다같이 대면할 수 있는 기회이니 최대한 참석 부탁드려요🙏
  - [➡️오프라인 수료식 참여 조사](https://forms.gle/HK8H1f2FRNU73K5a8)

- 5월 21일(화) 종강
  - 커리큘럼에 있는 수료식은 ‘수료식 토픽’으로 대체될 예정입니다

`,
    tags: [
      { tagName: '코스모스', color: 'RED' },
      { tagName: '포스트', color: 'ORANGE' },
      { tagName: '해시태그', color: 'YELLOW' },
      { tagName: '예시', color: 'GREEN' },
      { tagName: '입니다', color: 'BLUE' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: '코스모스',
          generation: 3,
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId1',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: 3,
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
  {
    id: 'postId4',
    category: '이벤트',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId5',
      nickname: '코스모스',
      generation: 3,
    },
    createdAt: '2024-05-04T13:58:29.000Z',
    content: `## 3차 오프라인 행사 안내
스프린터분들과 중급 프로젝트 회포를 풀 수 있는 시간이 되길 바라며,
3차 오프라인 행사 안내 드립니다(보고 싶어요 여러분😍 )!

- 일시: 3월 29일 금요일 오후 6시 10분 (위워크에서 같이 걸어가실 분은 🏃‍♀️ 이모티콘 눌러주세요)
- 장소: [종로수제비 명동점](https://place.map.kakao.com/658967253)
- 비용: 0원 👍  (1인 30,000원 식사비용 제공 -> 먹고 싶은거 다 먹을 수 있음! )

@스프린터  아직 신청 못 하신 분이 있다면,
[3차 오프라인 행사 신청서](https://forms.gle/UYN8kTK32XueXLwS7)를 제출하고 DM 부탁드려요!
`,
    tags: [
      { tagName: '코스모스', color: 'RED' },
      { tagName: '포스트', color: 'ORANGE' },
      { tagName: '해시태그', color: 'YELLOW' },
      { tagName: '예시', color: 'GREEN' },
      { tagName: '입니다', color: 'BLUE' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: 3,
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: 3,
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
  {
    id: 'postId5',
    category: '특강',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId6',
      nickname: '코스모스',
      generation: 3,
    },
    createdAt: '2024-05-02T08:58:29.000Z',
    content: `## 🕺 스프린터 브이로그 주인공 모집  💃
<br/>
@스프린터
<br/><br/>
코드잇 컨텐츠 마케팅 팀에서 스프린터 브이로그 촬영을 기획했습니다.
스프린터 브이로그 컨텐츠의 🙆‍♂️주인공을 맡아주실 스프린터 분을 모시고 있는데요!
<br/><br/>
마음이 움직이시는 분은 @매니저_정사도 에게 DM주세요!
⭐반짝 반짝 스프린터 분들의 감출 수 없는 끼를 펼쳐주세요! 기다리고 있겠습니다! 
<br/><br/>

- [출연 모집 안내문 링크](https://codeit.notion.site/bfe28ebc35b245e996f3ab5116d356ad)
- 영상 의도: 스프린터 학습공간 및 위워크 공간 소개 / 온라인 부트캠프를 트렌디하게 수강하고 있음을 담아 내기
- 출연: 현재 위워크 학습공간에 자주 출석하시는 스프린터 (1명)
- 예상 촬영 시간 및 영상 분량: 2시간 내외 / 1분 분량의 릴스 약 4개
- 증정: 네이버페이 5만원권
<br/><br/>
`,
    tags: [
      { tagName: '코스모스', color: 'RED' },
      { tagName: '포스트', color: 'ORANGE' },
      { tagName: '해시태그', color: 'YELLOW' },
      { tagName: '예시', color: 'GREEN' },
      { tagName: '입니다', color: 'BLUE' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: 3,
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: 3,
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
  {
    id: 'postId6',
    category: '공지사항',
    title: '공지사항 입니다.',
    author: {
      id: 'tmpuserId6',
      nickname: '코스모스',
      generation: 3,
    },
    createdAt: '2024-05-02T08:58:29.000Z',
    content: `## 💸 최종 프로젝트 AWS 비용 지원 안내
<br>
안녕하세요. @백엔드 @디자이너 @스프린터  여러분!
클라우드 서버 비용 관련해서 문의가 있어, 전체 공지 드립니다.

- 프로젝트 기간인 6주 동안 사용하는 AWS 서비스들은 프리 티어만으로도 커버 가능하다고 생각이 들어요.
- 나아가 프로젝트가 끝나고 팀 자체적으로 서비스를 유지한다고 해도 프리 티어 선에서 해결 가능할 것 같아요.
- 가능한 대부분의 기능은 프리 티어로 우선 사용을 부탁드립니다.
- 과금이 되더라도 백엔드에서 주로 사용하는 EC2, S3, RDS 정도를 적절한 사이즈의 인스턴스로 사용하면 부담되지 않는 금액이 청구될 거라 생각이 들어요.
- 그럼에도  프리 티어 이상을 사용해서 프로젝트 기간에 과금이 된다면 비용은 팀 당 5만 원 상한으로 지원하도록 할게요. (프로젝트 기간 동안 최대 5만 원)
- 금액 선 결제하시고 이후에 증빙 자료를 제출하면 비용 입금을 해드리는 방식으로 진행할게요.
    
앞으로 프로젝트 관련하여 궁금한 점이 생길 경우,
모든 분들이 확인할 수 있도록 운영 QnA 채널에 남겨주세요!
<br/><br/>
`,
    tags: [
      { tagName: '코스모스', color: 'RED' },
      { tagName: '포스트', color: 'ORANGE' },
      { tagName: '해시태그', color: 'YELLOW' },
      { tagName: '예시', color: 'GREEN' },
      { tagName: '입니다', color: 'BLUE' },
    ],
    emoji: 3,
    views: 5,
    comments: [
      {
        id: 'tmpcommentId1',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId',
          nickname: '코스모스',
          generation: 3,
        },
        content:
          '오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 오늘 술 마실 사람 ',
        reactionCount: 2,
        likedByCurrentUser: true,
      },
      {
        id: 'tmpcommentId2',
        createdAt: '2024-05-02T08:58:29.000Z',
        author: {
          id: 'tmpuserId2',
          nickname: 'cosmos',
          generation: 3,
        },
        content: '저요',
        reactionCount: 1,
        likedByCurrentUser: false,
      },
    ],
  },
];

export { mockData };
