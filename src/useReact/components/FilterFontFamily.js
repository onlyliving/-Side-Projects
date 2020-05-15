import React, { Component } from 'react';

class FilterFontFamily extends Component {    
    render() {
        console.log(`==> FilterFontFamily render`);
        
        let filterTypeDataArr = this.props.data.filterType;
        let filterWeightDataArr = this.props.data.filterWeight;

        let filterTypeLists = [];
        if (filterTypeDataArr) {
            for (let i = 0; i < filterTypeDataArr.length; i += 1) {
                filterTypeLists.push(
                    <li key={i}><button type="button" name="font-type" value={filterTypeDataArr[i].value}>{filterTypeDataArr[i].desc}</button></li>
                )
            }
        }

        let filterWeightLists = [];
        if (filterWeightDataArr) {
            for (let i = 0; i < filterWeightDataArr.length; i += 1) {
                filterWeightLists.push(
                    <li key={i}><button type="button" name="font-type" value={filterWeightDataArr[i].value}>{filterWeightDataArr[i].desc}</button></li>
                )
            }
        }


        let filterTypeAndWeightEl = '';

        if (filterTypeLists.length !== 0 || filterWeightLists.length !== 0) {
            filterTypeAndWeightEl = 
                <ul id="filterFontList" className="search-filter-font__list">
                    {filterTypeLists}
                    {filterWeightLists}
                    <li><button type="button" id="fontStyleReset">폰트 초기화</button></li>
                </ul>
        }

        return (
            filterTypeAndWeightEl
        )
    }
}

export default FilterFontFamily;