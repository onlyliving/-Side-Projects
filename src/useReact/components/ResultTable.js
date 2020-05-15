import React, { Component } from 'react';
import FilterText from './FilterText';
import SearchList from './SearchList';

class ResultTable extends Component {
    render() {
        console.log(`==> ResultTable render`);
        return (
            // 여기에서 api 요청 받는다.
            <section className="result-box">
                <h2 className="hide-text">이미지 검색 결과</h2>
                <p id="resultTopInfo" className="result-box__top-info">424개 이미지를 찾았습니다. 텍스트를 원하는 문장으로 바꿔보세요.</p>

                <FilterText></FilterText>
                <SearchList></SearchList>

                
                <p id="resultBottomInfo" className="result-box__bottom-info">모든 이미지가 로드되었습니다.</p>
            </section>

        )
    }
}

export default ResultTable;