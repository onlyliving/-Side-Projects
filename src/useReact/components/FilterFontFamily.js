import React, { Component } from 'react';

class FilterFontFamily extends Component {  

    fontEvent(thisNumber) {
        
        for ( let j = 0; j < document.querySelectorAll('#filterFontList > li').length; j += 1) {
            if (document.querySelectorAll('#filterFontList > li')[j].classList.contains('is-active')) {
                document.querySelectorAll('#filterFontList > li')[j].classList.remove('is-active');
            }
        }
        
        document.querySelectorAll('#filterFontList > li')[thisNumber].classList.add('is-active');

        if (document.querySelectorAll('#filterFontList > li')[thisNumber].querySelector('button').name === 'font-type') {
            document.body.className = `font-family-${document.querySelectorAll('#filterFontList > li')[thisNumber].querySelector('button').value}`;
        }

        if (document.querySelectorAll('#filterFontList > li')[thisNumber].querySelector('button').name === 'font-weight') {
            document.body.className = `font-weight-${document.querySelectorAll('#filterFontList > li')[thisNumber].querySelector('button').value}`;
        }


    }

    fontEventReset() {
        document.body.className = '';
        for(let i = 0; i < document.querySelectorAll('#filterFontList > li').length; i += 1) {
            if (document.querySelectorAll('#filterFontList > li')[i].classList.contains('is-active')) {
                document.querySelectorAll('#filterFontList > li')[i].classList.remove('is-active');
            }
        }
    }

    // document.getElementById('fontStyleReset').addEventListener('click', () => {
    //     document.body.className = '';
    //   });
    
    
    render() {
        console.log(`==> FilterFontFamily render`);
        
        let filterTypeDataArr = this.props.data.filterType;
        let filterWeightDataArr = this.props.data.filterWeight;

        let filterTypeLists = [];
        if (filterTypeDataArr) {
            for (let i = 0; i < filterTypeDataArr.length; i += 1) {
                filterTypeLists.push(
                    <li key={i}><button type="button" name="font-type" value={filterTypeDataArr[i].value} onClick={function(){this.fontEvent(i)}.bind(this)}>{filterTypeDataArr[i].desc}</button></li>
                )
            }
        }

        let filterWeightLists = [];
        if (filterWeightDataArr) {
            for (let i = 0; i < filterWeightDataArr.length; i += 1) {
                filterWeightLists.push(
                    <li key={i}><button type="button" name="font-weight" value={filterWeightDataArr[i].value} onClick={function(){this.fontEvent(i+3)}.bind(this)}>{filterWeightDataArr[i].desc}</button></li>
                )
            }
        }


        let filterTypeAndWeightEl = '';

        if (filterTypeLists.length !== 0 || filterWeightLists.length !== 0) {
            filterTypeAndWeightEl = 
                <ul id="filterFontList" className="search-filter-font__list">
                    {filterTypeLists}
                    {filterWeightLists}
                    <li><button type="button" id="fontStyleReset" onClick={function(){this.fontEventReset()}.bind(this)}>폰트 초기화</button></li>
                </ul>
        }

        return (
            filterTypeAndWeightEl
        )
    }
}

export default FilterFontFamily;