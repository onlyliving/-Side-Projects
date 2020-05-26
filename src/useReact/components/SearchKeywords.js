import React, { Component } from 'react';

class SearchKeywords extends Component {
    render() {
        console.log(`==> SearchKeywords render`);

        let tagDataArr = this.props.filterData.tags;
        let tagList = [];
        for (let i = 0; i < tagDataArr.length; i += 1) {
            tagList.push(
                <li key={i} 
                    onClick={function(e) {
                        e.preventDefault();
                        document.getElementById('searchInput').value = tagDataArr[i].value;
                        document.getElementById('searchBtn').click();
                    }.bind(this)}
                ><button type="button" value={tagDataArr[i].value}>{tagDataArr[i].title}</button></li>
            )
        }

        return (
            <article className="search-tag">
                <h2 className="hide-text">태그 검색</h2>
                <ul className="search-tag__list">
                    {tagList}
                </ul>
            </article>
        )
    }
}

export default SearchKeywords;