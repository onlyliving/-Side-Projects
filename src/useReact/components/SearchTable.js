import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchKeywords from './SearchKeywords';
import FilterFontFamily from './FilterFontFamily';
import FilterImageShape from './FilterImageShape';

class SearchTable extends Component {

    shouldComponentUpdate(newProps, newState) {
        console.log('>>>>>>> ===== SearchTable - shouldComponentUpdate =======');

        // console.log(newProps);
        // console.log(newState);
        // console.log(this);
        if (newProps.data.requestData.keywords === this.props.data.requestData.keywords) {
            return false;
        }

        return true;
    }

    showResultFilterCheck() {
        console.log('==== showResultFilterCheck ====');
        // console.log(this);
        if (this.props.data.requestData.keywords !== '') {
            return <article id="filterEl" className="search-filter">
                        <h2 className="hide-text">검색 필터</h2>
                        <div className="search-filter-wrap">
                            <FilterImageShape data={this.props.data}></FilterImageShape>
                            <FilterFontFamily data={this.props.data.filter}></FilterFontFamily>
                        </div>
                    </article>;
        }

        return '';
    }

    render() {
        console.log(`==> SearchTable render`);
        let filterDataObj = this.props.data.filter;

        return (
            <section className="search-box-wrap">
                <h1 className="hide-text">카드콘텐츠 배경 이미지 검색</h1>
                <p className="search-box-wrap__sub-title">카드콘텐츠의 배경 이미지를 쉽게 찾아드립니다!<br />unsplash 사이트의 무료이미지를 제공받았습니다. (문의 : 
                    greensohee88@naver.com)</p>
                <article className="search-info">
                    <h2 className="search-info__head">검색 팁</h2>
                    <ul className="search-info__list">
                        <li>영어로 검색해주세요.</li>
                        <li>다중 키워드 검색 시 콤마( , )를 넣어주세요. Ex) yellow, circle</li>
                    </ul>
                </article>

                <SearchInput 
                    data={this.props.data} 
                    onChangePage={function() {

                        if (!document.getElementById('searchInput').value) {
                            alert('검색어를 입력해주세요.');
                            return false;
                        }

                        this.props.onChange();

                    }.bind(this)} 
                >
                </SearchInput>
                <SearchKeywords filterData={this.props.data} reqData={this.state}></SearchKeywords>

                {this.showResultFilterCheck()}

            </section>

        )
    }
}

export default SearchTable;