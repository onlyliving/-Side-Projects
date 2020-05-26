import React, { Component } from 'react';
import ResultTable from './components/ResultTable';
import SearchTable from './components/SearchTable';
import Unsplash, { toJson } from "unsplash-js"
const unsplash = new Unsplash({ accessKey: "NOiz5YETErCrroUe4WlilkzfvRZTx2zq8YjGNoqaYwo" });

class App extends Component {
    constructor(props) {
        super(props);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.imageHoverEvent = this.imageHoverEvent.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {
            requestData : {
                keywords : '',
                pageNum : 1,
                perPage : 12,
                orientation : 'squarish'
            },
            filter: {
                filterType: [
                    {value: 'Jua', desc: '폰트 주아체'},
                    {value: 'DoHyeon', desc: '폰트 도현체'},
                    {value: 'NanumMyeongjo', desc: '폰트 나눔명조체'},
                ],
                filterWeight: [
                    {value: 'lighter', desc: '폰트 얇은'},
                    {value: 'bold', desc: '폰트 두꺼운'},
                ],
                filterImageShape : [
                    {value: 'squarish', desc: '정사각형 이미지'},
                    {value: 'landscape', desc: '가로형 이미지'},
                    {value: 'portrait', desc: '세로형 이미지'},
                ]
            },
            tags: [
                {value: 'trip', title: '여행'},
                {value: 'it, social, office, phone, notebook, media', title: 'IT'},
                {value: 'energy, active, dynamic, jogging, climbing, yoga', title: '건강'},
                {value: 'cooking, healthy', title: '요리'},
                {value: 'forest', title: '숲'},
                {value: 'tree, forest', title: '나무'},
                {value: 'eyes, human', title: '눈이 포함된 사진'},
                {value: 'sky', title: '하늘'},
                {value: 'sea, blue', title: '바다'},
                {value: 'natural, green', title: '자연'},
                {value: 'anger, crying', title: '스트레스'},
                {value: 'mode, dawn', title: '감성'},
                {value: 'love, ardent', title: '사랑'},
                {value: 'interior', title: '인테리어'},
            ]
        }
    }

    handleDataChange () {
        this.setState({
            requestData: {
                keywords: document.getElementById('searchInput').value ? document.getElementById('searchInput').value : '',
                pageNum: (localStorage.apiData && JSON.parse(localStorage.apiData).currentPageNum) ? JSON.parse(localStorage.apiData).currentPageNum : 1,
                perPage : 12,
                orientation : (document.querySelector('.search-filter__list')) ? document.querySelectorAll('.search-filter__list li.is-active')[0].querySelector('button').value : 'squarish'
            }
        });
    }

    resultContentCheck() {
        console.log('===== resultContentCheck ====');
        if (this.state.requestData.keywords !== '') {
            console.log(`====>this.state.requestData.keywords : ${JSON.stringify(this.state.requestData.keywords)}`);
            // console.log(this);
            return <ResultTable data={this.state} onLoadApi={this.loadImage} onMouseOver={this.imageHoverEvent} onChange={this.handleDataChange}></ResultTable>
        }
    }

    imageHoverEvent() {
        console.log('===== imageHoverEvent ====');
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
    };

    loadImage(firstLoad) {
        // console.log(this);
        console.log('===== loadImage ====');
        if (this.state.requestData.keywords) {
            console.log(' === loadImage load ==');

            let reqData = this.state.requestData;

            // TODO:  처음 로드된 상태를 {reqData.pageNum === 1}로 구분하자.
            
            // console.log(document.getElementById('resultTopInfo'));
            console.log(`firstLoad : ${firstLoad}`);
            console.log(reqData.pageNum)
            // console.log(`=============> pageNum : ${reqData.pageNum}`);
            // console.log(`=============> pageNum : ${(localStorage.apiData)? JSON.parse(localStorage.apiData).currentPageNum : '' }`);
            unsplash.search.photos(reqData.keywords, reqData.pageNum, reqData.perPage, { orientation: reqData.orientation }).then(toJson).then(json => {
        
                if (reqData.pageNum === 1) {
                    // console.log(reqData.keywords);
                    // console.log(json.total);
                    // 검색 결과가 없는 경우
                    if (json.total === 0) {
                        document.getElementById('resultTopInfo').innerHTML = `<em>[ ${this.reqKeyword} ]</em> 검색어에 대한 결과를 찾기 못했습니다. 다른 키워드로 검색해주세요. :)`;
                        document.getElementById('resultEl').innerHTML = '';
                        return false;
                    }
                }
            
                if ((json.total !== 0) && (json.results !== [])) {

                    
                    // listLoaderEvent.hide();
            
                    if (reqData.pageNum === 1) {
                        document.getElementById('resultEl').innerHTML = '';
                        // console.log(document.getElementById('resultTopInfo'));
                        document.getElementById('resultTopInfo').innerHTML = `${json.total}개 이미지를 찾았습니다. 텍스트를 원하는 문장으로 바꿔보세요.`;
                        // document.getElementById('resultTopInfo').value = json.total_pages;

                        // 처음에 로컬스토리지에 세팅
                        let localStorageObj = {
                            'currentPageNum' : 1,
                            'totalPageNum' : (json.total_pages) ? json.total_pages : 1
                        }

                        localStorage.setItem('apiData', JSON.stringify(localStorageObj));
                        
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
            
                    console.log(reqData.keywords, reqData.pageNum, reqData.perPage);
                    console.log(reSortData);

                    let resultItemEl = '';
            
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

                    document.getElementById('resultEl').innerHTML += resultItemEl;
                    document.getElementById('textChangeEvent').style.display = 'flex';
                    document.getElementById('filterEl').style.display='block';

                    this.imageHoverEvent();
                }
            });
        }
    
    }

    render() {
        console.log(`==> App render`);

        return (
            <div>
                <SearchTable data={this.state} onChange={this.handleDataChange}></SearchTable>
                {this.resultContentCheck()}
                {/* <ResultTable data={this.state} onLoadApi={this.loadImage} onMouseOver={this.imageHoverEvent}></ResultTable> */}
                <div id="loader" className="loader-default"></div>
            </div>
        )
    }
  }
  
export default App;