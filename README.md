# Chat Simulator

React & Redux를 이용하여 채팅 기록을 재생할 수 있도록 하는 과제입니다.

## Setup

Install dependencies

```sh
$ yarn install (or npm install)
```

## Development

```sh
$ yarn start (or npm start)
# visit http://localhost:3000
```

- HTML 수정: `/public/index.html`를 수정하시면 됩니다.
- JS 수정: `/src` 디렉토리 내에서 자유롭게 파일/폴더를 생성/수정하여 작업하시면 됩니다.
- CSS 수정: `/src` 디렉토리 내에서 자유롭게 파일/폴더를 생성/수정하여 작업하시면 됩니다.

**Redux, Redux-logger, React-redux는 `package.json`에 이미 추가되어 있습니다.**

## TODO

- [ ] 채팅 기록을 `https://chat-simulator.firebaseio.com/chats.json`로부터 불러와 재생시켜 주도록 작업하시면 됩니다.
- [ ] 각 데이터는 다음과 같은 구조로 되어 있습니다.
  - `delta`: 시간을 의미합니다. 예) 1000 - 채팅 시작후 1초 경과를 의미
  - `payload`: 메시지에 대한 세부 정보를 담고 있습니다. 데이터를 꼼꼼하게 분석해보시기 바랍니다.
- [ ] 사용자의 `display_name`과 메시지 `text`는 반드시 보여야 합니다.
- [ ] 현재 접속자 목록을 반드시 보여주어야 합니다.
- [ ] UX는 Slack을 참고하여 만드시면 좋습니다.
