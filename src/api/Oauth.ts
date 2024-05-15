import axios from '@/api/axios';

export async function githubLogin(code: string) {
  try {
    const res = await axios.post(`/auth/github/redirect?code=${code}`);
    window.opener.location.reload();
    window.close();
  } catch (error) {
    console.error('요청 실패:', error);
  }
}

export async function googleLogin(code: string) {
  try {
    const res = await axios.post(`/auth/google/redirect?code=${code}`);
    if (res) {
      window.opener.location.reload();
      window.close();
    }
  } catch (error) {
    console.error('요청 실패:', error);
  }
}

//winow.open으로 팝업창을 띄우고 그 창에서 로그인을 하고
// 로그인이 완료되면 새로고침을 하고 팝업창을 닫는다.

//window.opener.postMessage()를 사용하면 부모창에 메세지를 보낼 수 있다.
//로그인 모달에서 깃허브아이콘을 클릭하면 팝업창을 열고
//로그인이 완료되면 githutredirect페이지로 이동하고
//부모창에 메세지를 보내고 팝업창을 닫는다.

//새창을 띄어주는 페이지가 부모창,  새롭게 뜬 창이 자식창 => redirect 페이지가 자식창
//자식창이 닫히면 부모창이 reload되도록 구현
//window.addEventListener()를 선언해서 자식창에서 postMessage로 보낸 메세지를 받아서 부모창을 reload하도록 구현
//window.addEventListener(자식창에서 받는 메세지 , 실행함수, 옵션)
