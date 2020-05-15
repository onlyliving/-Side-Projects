import React, { Component } from 'react';
import ResultTable from './components/ResultTable';
import SearchTable from './components/SearchTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        console.log(`==> App render`);
        return (
            <div>
                <SearchTable data={this.state}></SearchTable>
                <ResultTable></ResultTable>
                <div id="loader" className="loader-default"></div>
            </div>
        )
    }
  }
  
export default App;