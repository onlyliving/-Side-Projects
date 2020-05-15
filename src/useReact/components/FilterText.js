import React, { Component } from 'react';

class FilterText extends Component {
    render() {
        console.log(`==> FilterText render`);
        return (
            <article id="textChangeEvent" className="text-all-change-box">
                <h3 className="hide-text">텍스트 한번에 변경하기</h3>
                <input id="textAllChangeInput" className="text-all-change-box__input" type="text" placeholder="텍스트를 한번에 바꾸려면 내용을 입력해주세요."></input>
                <button id="textAllChangeSend" className="text-all-change-box__btn" type="button">Change Text</button>
            </article>
        )
    }
}

export default FilterText;