import '../src/reset.css';
import '../src/index.css';
import '@babel/polyfill';
import Unsplash, { toJson } from "unsplash-js"

const unsplash = new Unsplash({ accessKey: "NOiz5YETErCrroUe4WlilkzfvRZTx2zq8YjGNoqaYwo" });
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
// const unsplash = new Unsplash({
//   accessKey: "{YOUR_ACCESS_KEY}",
//   secret: "{YOUR_SECRET_KEY}"
// });

// const unsplash = new Unsplash({
//   accessKey: "{APP_ACCESS_KEY}",
//   // Optionally you can also configure a custom header to be sent with every request
//   headers: {
//     "X-Custom-Header": "foo"
//   },
//   // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
//   timeout: 500 // values set in ms
// });

document.addEventListener('DOMContentLoaded', () => {

  searchInput.addEventListener('keypress', () => {
    console.log(`keypress : ${searchInput.value}`);
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      searchBtn.click();
      return true; 
    }
  });

  searchBtn.addEventListener('click', () => {
    let inputText = searchInput.value;
    inputText = inputText.trim();

    if (!inputText) {
      alert('검색어를 입력해주세요.');
      return false;
    }

    // orientation 방향도 검색할 떄 정할 수 있게 하자. Valid values: all, landscape, portrait, squarish; default: all
    // TODO : 키워드가 영어 검색만 된다.
    let reqDataPage = 1;
    
    unsplash.search.photos(inputText, reqDataPage, 10, { orientation: "squarish" }).then(toJson).then(json => {
      let resultItemEl = '';

      if (json.total === 0) {
        resultTopInfo.innerHTML = `<em>[ ${inputText} ]</em> 검색어에 대한 결과를 찾기 못했습니다. 다른 키워드로 검색해주세요. :)`;
        document.getElementById('resultEl').innerHTML = '';
        return false;
      }

      
      if ((json.total !== 0) && (json.results !== [])) {
        document.getElementById('resultTopInfo').innerText = `${json.total}개 이미지를 찾았습니다. 텍스트를 원하는 문장으로 바꿔보세요.`;
        let imageUrl = '';
        let resDataTotalPage = json.total_pages;
        
        for (let i = 0; i < json.results.length; i += 1) {
          imageUrl = json.results[i].urls.small;
          resultItemEl += `
          <li class="result-item">
                <textarea class="result-item__textarea">신기루 같은 하루</textarea>
                <div class="result-item__img-wrap">
                    <img src=${imageUrl}>
                </div>
            </li>`;
        }

        document.getElementById('resultEl').innerHTML = resultItemEl;


        /// 스크롤을 내리면 페이지가 더 보여야 함.
        window.addEventListener('scroll', () => {
          if (document.documentElement.scrollTop === document.documentElement.scrollHeight - document.documentElement.clientHeight) {
            console.log('스크롤이 맨 아래에 있습니다.')
            document.getElementById('loader').classList.add('is-show');

            if (reqDataPage === resDataTotalPage) {
              resultBottomInfo.classList.add('is-show');
              return true;
            }
            
            reqDataPage ++;
            unsplash.search.photos(inputText, reqDataPage, 10, { orientation: "squarish" }).then(toJson).then(json => {

              // console.log('== toJson  ==');
              // console.log(json);
              // console.log('==! toJson  ==');
              if ((json.total !== 0) && (json.results !== [])) {
                document.getElementById('loader').classList.remove('is-show');

                for (let j = 0; j < json.results.length; j += 1) {
                  imageUrl = json.results[j].urls.small;
                  resultItemEl += `
                  <li class="result-item">
                        <textarea class="result-item__textarea">신기루 같은 하루</textarea>
                        <div class="result-item__img-wrap">
                            <img src=${imageUrl}>
                        </div>
                    </li>`;
                }
        
                document.getElementById('resultEl').innerHTML = resultItemEl;
                return true;
              }
            });
          }
        });

      }
    });
  });

});