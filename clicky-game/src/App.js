import React, { Component } from 'react';
import './App.css';
import {Score} from './gameFunctions/score';
import {GameButton} from './gameFunctions/gameButton';

function dragonball(id) {
  this.id= id
  this.url="www.dragonballfanpics.com/images/goku/"+ id+".gif"
  this.wasClicked=false
  this.clicked= ()=>{
    this.wasClicked=true;
  }
}

  class App extends Component {
    shuffle =(array) => {
      const order=[];
      const result=[];
      array.forEach(() =>{
        let position= Math.floor(Math.random() * array.length);
        while (order.indexOf(position)!==-1){
          position= Math.floor(Math.random() * array.length); 
        }
        order.push(position);
      })
      order.forEach((pos)=>{
        result.push(array[pos])
      })
      return result;
    }
    generate= () => {
      const board = []
      const result = []
      for (let x = 0; x<12; x++){
        let position= Math.ceil(Math.random() * 12);
        while (board.indexOf(position)!==-1){
          position= Math.ceil(Math.random() * 12); 
        }
        board.push(position)
      }
      board.forEach((id)=>{
        result.push(new dragonball(id));
      })
      return result;
    }

    state = {
      score: 0,
      gamesBoard : this.generate()
    }

    handleOnClick = (event) =>{
      const { id, alt } = event.target;
      const dbid = id | alt;
      const objClicked = this.state.gamesBoard.find(obj => obj.id === dbid);
      if(objClicked.wasClicked){
        this.setState({
          score: 0,
          gamesBoard : this.generate()
        })
      }
      else{
        this.state.gamesBoard[this.state.gamesBoard.indexOf(objClicked)].clicked();
        if((this.state.score+1)%12 !== 0){
          this.setState({
            score: this.state.score+1,
            gamesBoard: this.shuffle(this.state.gamesBoard)
          })
        }
        else{
          this.setState({
            score: this.state.score+1,
            gamesBoard: this.generate()
          })
        }
      }
    }
    render() {
      return (
        <div>
        <Score score={this.state.score}/>
        <div>
        {this.state.gamesBoard.slice(0,4).map((dragonball) =>{
          return(
            <GameButton
            key={dragonball.id}
            id={dragonball.id}
            url={dragonball.url}
            handleOnClick={this.handleOnClick}
            />
            )
        })}
        </div>
        <div>
        {this.state.gamesBoard.slice(4,8).map((dragonball) =>{
          return(
            <GameButton
            key={dragonball.id}
            id={dragonball.id}
            url={dragonball.url}
            handleOnClick={this.handleOnClick}
            />
            )
        })}
        </div>
        <div>
        {this.state.gamesBoard.slice(8,12).map((dragonball) =>{
          return(
            <GameButton
            key={dragonball.id}
            id={dragonball.id}
            url={dragonball.url}
            handleOnClick={this.handleOnClick}
            />
            )
        })}
        </div>
        </div>
        );
    }
  }

  export default App;
