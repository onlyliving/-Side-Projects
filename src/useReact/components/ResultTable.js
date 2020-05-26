import React, { Component } from 'react';
import FilterText from './FilterText';
import SearchList from './SearchList';

class ResultTable extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log('>>>>>>> ===== ResultTable => shouldComponentUpdate =======');
        if (newProps.data.requestData === this.props.data.requestData) {
            return false;
        }
        return true;
    }

    loadScrollEvent() {
        window.addEventListener('scroll', () => {
            // console.log('scroll');
            // console.log(document.documentElement.scrollTop);
            // console.log(document.documentElement.scrollHeight - document.documentElement.clientHeight);
            if (document.documentElement.scrollTop === document.documentElement.scrollHeight - document.documentElement.clientHeight) {
                console.log('스크롤이 맨 아래에 있습니다.')

                let totalPageNum = localStorage.apiData ? JSON.parse(localStorage.apiData).totalPageNum : 1;
                let currentPageNum = localStorage.apiData ? JSON.parse(localStorage.apiData).currentPageNum : 1; 
                //   listLoaderEvent.show();


                //   // 스크롤해도 데이터가 더이상 없는 경우
                if ((currentPageNum === totalPageNum) || (currentPageNum > totalPageNum)) {
                    console.log('스크롤해도 데이터가 더이상 없는 경우');
                    // listLoaderEvent.hide();
                    document.getElementById('resultBottomInfo').style.display = 'block';
                    return true;
                }

                currentPageNum ++;

                let localStorageObj = {
                    'currentPageNum' : currentPageNum,
                    'totalPageNum' : totalPageNum
                }

                localStorage.setItem('apiData', JSON.stringify(localStorageObj));
                console.log('=== 로컬스토리지 apiData 업데이트 ===');
                console.log(localStorage.apiData);

                this.props.onChange();
                
                // this.props.onLoadApi();
            }
        });
    }

    render() {
        console.log(`==> ResultTable render`);
        return (
            // 여기에서 api 요청 받는다.
            <section className="result-box">
                <h2 className="hide-text">이미지 검색 결과</h2>
                <p id="resultTopInfo" className="result-box__top-info">{}개 이미지를 찾았습니다. 텍스트를 원하는 문장으로 바꿔보세요.</p>

                <FilterText></FilterText>
                <SearchList data={this.props.data} onChange={this.props.onLoadApi()}></SearchList>

                <p id="resultBottomInfo" className="result-box__bottom-info">모든 이미지가 로드되었습니다.</p>
                {this.loadScrollEvent()}
            </section>
        )
    }
}

export default ResultTable;