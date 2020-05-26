import React, { Component } from 'react';

class SearchInput extends Component {
    render() {
        console.log(`==> SearchInput render`);
        return (

            <article className="search-box">
                <h2 className="hide-text">검색 입력창</h2>
                <input id="searchInput" className="search-box__input" type="text" placeholder="영어로 입력해주세요." autoFocus></input>
                <button onClick={function(e) {
                        e.preventDefault();

                        // reset
                        localStorage.clear();

                        

                        this.props.onChangePage();


                    }.bind(this)} id="searchBtn" className="search-box__btn" type="button">search</button>
            </article>
        )
    }
}

export default SearchInput;