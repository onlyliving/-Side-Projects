import '../src/reset.css';
import '../src/index.css';
import '@babel/polyfill';
import Unsplash, { toJson } from "unsplash-js"

const unsplash = new Unsplash({ accessKey: "NOiz5YETErCrroUe4WlilkzfvRZTx2zq8YjGNoqaYwo" });
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

/**
 * TODO : 객채를 어떻게 쓸 수 있을까?
 * 검색 입력, 검색 결과.. 두 클래스 만들면 되려나?
 * 
 * 뷰와 데이터 메소드 구분
 * 
 * view : 결과 목록.
 * data : search 데이터

 1. 검색 Search
- Value 값
- 클릭이벤트



 */

//searchInput
class Search {
  constructor(id) {
    // 입력값
    this.id = id;
  }
}

let search = new Search(searchInput);

search.click = function() {
  console.log(this);

  // 초기화
  // reqData.keywords = searchInput.value.trim();
  reqData.keywords = this.id.value.trim();
  console.log(`reqData.keywords : ${reqData.keywords}`);
  resultItemEl = '';
  reqData.pageNum = 1;
  document.getElementById('resultBottomInfo').style.display = 'none';

  if (!reqData.keywords) {
    alert('검색어를 입력해주세요.');
    return false;
  }

  getData.loadImage('firstLoad');
}


let reqData = {
  keywords : '',
  pageNum : 1,
  perPage : 12,
  orientation : 'squarish'
};

let resultItemEl = '';
let resDataTotalPage = '';

function Loader(name) {
  this.name = name;
}

Loader.prototype.hide = function() {
  this.name.style.display = 'none';
};

Loader.prototype.show = function() {
  this.name.style.display = 'block';
};

const listLoaderEvent = new Loader(document.getElementById('loader'));

const classAllRemove = (el, className) => {
  for (let i = 0; i < el.length; i += 1) {
    if (el[i].classList.contains(className)) {
      el[i].classList.remove(className);
    }
  }
};

const imageHoverEvent = () => {
  if(document.getElementsByClassName('result-item')) {

    for (let i = 0; i < document.getElementsByClassName('result-item').length; i += 1) {
      document.getElementsByClassName('result-item')[i].addEventListener('mouseenter', () => {
        document.getElementsByClassName('result-item')[i].classList.add('is-hover');
        return true;
      });
  
      document.getElementsByClassName('result-item')[i].addEventListener('mouseleave', () => {
        document.getElementsByClassName('result-item')[i].classList.remove('is-hover');
        return true;
      });
    }
  }

  return false;
}




/*
2. 검색 결과 목록 searchResult / resultList / Result
- 검색필터
- 검색 10개씩 보이기
- 스크롤 이벤트
- 마우스호버 이벤트
*/

class GetData {

  loadImage(firstLoad) {
    console.log(this.reqKeyword);
    unsplash.search.photos(reqData.keywords, reqData.pageNum, reqData.perPage, { orientation: reqData.orientation }).then(toJson).then(json => {

      if (firstLoad === 'firstLoad') {

        // 검색 결과가 없는 경우
        if (json.total === 0) {
          resultTopInfo.innerHTML = `<em>[ ${this.reqKeyword} ]</em> 검색어에 대한 결과를 찾기 못했습니다. 다른 키워드로 검색해주세요. :)`;
          document.getElementById('resultEl').innerHTML = '';
          return false;
        }
      }

      if ((json.total !== 0) && (json.results !== [])) {
        
        listLoaderEvent.hide();

        if (firstLoad === 'firstLoad') {
          document.getElementById('resultTopInfo').innerHTML = `${json.total}개 이미지를 찾았습니다. 텍스트를 원하는 문장으로 바꿔보세요.`;
          resDataTotalPage = json.total_pages;
        }

        let reSortData = [];
        reSortData = json.results;
        reSortData.sort(function(a, b) {
          if (a.likes < b.likes) {
            return 1;
          }
          if (a.likes > b.likes) {
            return -1;
          }
          return 0;
        });

        // console.log(reSortData);

        for (let i = 0; i < reSortData.length; i += 1) {
          resultItemEl += `
          <li class="result-item">
                <a class="result-item__link" href=${reSortData[i].links.html} target="_blank"></a>
                <textarea class="result-item__textarea">신기루 같은 하루</textarea>
                <div class="result-item__img-wrap">
                    <img src=${reSortData[i].urls.small}>
                </div>
            </li>`;
        }

        document.getElementById('resultEl').innerHTML = resultItemEl;

        //
        imageHoverEvent();
        document.getElementById('textChangeEvent').style.display = 'flex';
        document.getElementById('filterEl').style.display='block';
      }
    });

  }

}

const getData = new GetData();

// getData.event = function(firstLoad) {
  
// };

document.addEventListener('DOMContentLoaded', () => {

  searchInput.addEventListener('keypress', () => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      searchBtn.click();
      return true; 
    }
  });

  searchBtn.addEventListener('click', () => {
    search.click();
  });

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop === document.documentElement.scrollHeight - document.documentElement.clientHeight) {
      // console.log('스크롤이 맨 아래에 있습니다.')
      listLoaderEvent.show();

      // 스크롤해도 데이터가 더이상 없는 경우
      if (reqData.pageNum === resDataTotalPage) {
        listLoaderEvent.hide();
        document.getElementById('resultBottomInfo').style.display = 'block';
        return true;
      }
      
      reqData.pageNum ++;
      getData.loadImage();
    }
  });

  for (let i = 0; i < document.querySelectorAll('.search-tag__list li').length; i += 1 ) {
    document.querySelectorAll('.search-tag__list li')[i].addEventListener('click', () => {
      searchInput.value = document.querySelectorAll('.search-tag__list li')[i].querySelector('button').value;
      searchBtn.click();
      return true;
    });
  }

  for (let i = 0; i < document.querySelectorAll('.search-filter__list li').length; i += 1) {
    document.querySelectorAll('.search-filter__list li')[i].addEventListener('click', () => {

      classAllRemove(document.querySelectorAll('.search-filter__list li'), 'is-active');
      document.querySelectorAll('.search-filter__list li')[i].classList.contains('is-active') ? document.querySelectorAll('.search-filter__list li')[i].classList.remove('is-active') : document.querySelectorAll('.search-filter__list li')[i].classList.add('is-active');
      reqData.orientation = document.querySelectorAll('.search-filter__list li')[i].querySelector('button').value;
      searchBtn.click();

      if (reqData.orientation === 'landscape') {
        // 가로
        document.getElementById('resultEl').classList.add('is-type-landscape');
        document.getElementById('resultEl').classList.remove('is-type-portrait');
      } else if (reqData.orientation === 'portrait') {
        // 세로 portrait
        document.getElementById('resultEl').classList.remove('is-type-landscape');
        document.getElementById('resultEl').classList.add('is-type-portrait');

      } else {
        document.getElementById('resultEl').classList.remove('is-type-landscape');
        document.getElementById('resultEl').classList.remove('is-type-portrait');
      }

      return true;
    });
  }

  for ( let i = 0; i < document.querySelectorAll('#filterFontList > li').length; i += 1) {
    document.querySelectorAll('#filterFontList > li')[i].addEventListener('click', () => {

      for ( let j = 0; j < document.querySelectorAll('#filterFontList > li').length; j += 1) {
        if (document.querySelectorAll('#filterFontList > li')[j].classList.contains('is-active')) {
          document.querySelectorAll('#filterFontList > li')[j].classList.remove('is-active');
        }
      }
      
      document.querySelectorAll('#filterFontList > li')[i].classList.add('is-active');
    });
  }

  textAllChangeInput.addEventListener('keypress', () => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      textAllChangeSend.click();
      return true; 
    }
  });

  let modifyText = '';
  textAllChangeSend.addEventListener('click', () => {
    if (!textAllChangeInput.value) {
      alert('내용을 입력해주세요.');
      return false;
    }

    modifyText = textAllChangeInput.value;
    for (let i = 0; i < document.getElementsByClassName('result-item').length; i += 1) {
      document.getElementsByClassName('result-item')[i].querySelector('textarea').value = modifyText;
    }
  });

  for (let i = 0; i < document.querySelectorAll('#filterFontList > li').length; i += 1) {
    document.querySelectorAll('#filterFontList > li')[i].addEventListener('click', () => {
      if (document.querySelectorAll('#filterFontList > li')[i].querySelector('button').name === 'font-type') {
        document.body.className = `font-family-${document.querySelectorAll('#filterFontList > li')[i].querySelector('button').value}`;
        return true;
      }

      if (document.querySelectorAll('#filterFontList > li')[i].querySelector('button').name === 'font-weight') {
        document.body.className = `font-weight-${document.querySelectorAll('#filterFontList > li')[i].querySelector('button').value}`;
        return true;
      }
      
    });
    
  }

  document.getElementById('fontStyleReset').addEventListener('click', () => {
    document.body.className = '';
  });
  
});