/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, DrawerLayoutAndroid, TextPropTypes } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


const Lobby = props => {
  const [error, setError] = useState('');
  const [toeGameData, settoeGameData] = useState({});
  const [startstyle, setstartstyle] = useState(props.styles.bottomButton);
  const [startgametext, setstartgametext] = useState('Start Games!');
  const [player0displayname, setplayer0displayname] = useState('Player 0');
  const [player1displayname, setplayer1displayname] = useState('Player 1');
  const [buttonView, setButtonView] = useState(props.styles.toeButton);
  const [winnertext, setwinnertext] = useState(props.styles.hidden);
  const [youWinText, setyouWinText] = useState('');
  const [bottomButton, setbottomButton] = useState(props.styles.bottomButton);

  var subscriber = null;
  //write the startGame function here
  const startGame = () => {
    if ((props.GameData !== undefined) && (props.GameData.owner === props.auth.uid) && (props.GameData.players.length > 2)) {


        let questionAsker = { displayName: '', uid: '', avatar: '' };
        let answeringSpirit = { displayName: '', uid: '', avatar: '' };
        while (questionAsker.uid === answeringSpirit.uid) {
          questionAsker = getRandomPlayer(props.GameData.players);
          answeringSpirit = getRandomPlayer(props.GameData.players);
        }
        return setRoles(questionAsker, answeringSpirit)
          .then(response => {
            if (response.hasError) {
              let friendlyError = { friendly: "Something has gone terribly wrong.", technical: response.value.toString() };
              setError(() => { throw friendlyError });
            }
          });
    }
  };
  //write the getRandomPlayer function here
  const getRandomPlayer = players => {
    return players[Math.floor(Math.random() * players.length)];
  };
  



//function to determine whos turn it is

const updatetoeGameData = newGameData => {
  settoeGameData(newGameData);
};



const listener = () => {
  //start listening for updates to game data
  subscriber = firestore().collection("ttt-games").doc(props.GameID).onSnapshot(doc => {
    updatetoeGameData(doc.data());
  });
  //setplayer0displayname(toeGameData.players[0].displayName);
  //setplayer1displayname(toeGameData.players[1].displayName);
  console.log(toeGameData.gamecode);
};



//to change the current turn
const turnchange = () =>{
  if (toeGameData.currentTurn === "x"){
    return firestore().collection("ttt-games").doc(props.GameID).update({
      currentTurn: 'o',
    })
    .then(console.log("turn changed"))
    .catch(err => {
      return { hasError: true, error: err };
    });
  } else if (toeGameData.currentTurn === 'o'){
    return firestore().collection("ttt-games").doc(props.GameID).update({
      currentTurn: 'x',
    })
    .then(console.log("turn changed"))
    .catch(err => {
      return { hasError: true, error: err };
    });
  }
};


//function to change the turn ID rather than the turn letter
const turnIDchange = () => {
  if (toeGameData.currentTurnID === toeGameData.players[0].uid){
    return firestore().collection("ttt-games").doc(props.GameID).update({
      currentTurnID: toeGameData.players[1].uid,
    })
    .then(console.log("player turn changed"))
    .catch(err => {
      return { hasError: true, error: err };
    });
  } else if (toeGameData.currentTurnID === toeGameData.players[1].uid){
    return firestore().collection("ttt-games").doc(props.GameID).update({
      currentTurnID: toeGameData.players[0].uid,
    })
    .then(console.log("turn changed"))
    .catch(err => {
      return { hasError: true, error: err };
    });
  }
};


// function to start the listener
const startlistener = () => {
  listener();
  setstartstyle("props.styles.hidden");
  setstartgametext('');
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button0press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button0();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button0 = () =>{
return firestore().collection("ttt-games").doc(props.GameID).update({
  tile0: toeGameData.currentTurn,
})
.then()
.catch(err => {
  return { hasError: true, error: err };
});
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button1press = () => {
 if (toeGameData.currentTurnID === props.auth.uid){
  button1();
  turnIDchange();
  turnchange();} else {console.log("not your turn");}
};

const button1 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile1: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button2press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button2();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button2 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile2: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button3press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button3();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button3 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile3: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button4press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button4();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button4 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile4: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button5press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button5();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button5 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile5: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button6press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button6();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button6 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile6: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button7press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button7();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button7 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile7: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};

//tic tac toe button 0, add x or o to database depending on turn, change turn when done at end of function
const button8press = () => {
  if (toeGameData.currentTurnID === props.auth.uid){
    button8();
    turnIDchange();
    turnchange();} else {console.log("not your turn");}
};

const button8 = () =>{
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile8: toeGameData.currentTurn,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};






//winning button function
const buttonwinpress = () => {
  setwinnertext(props.styles.hidden);
  setButtonView(props.styles.toeButton);
  setbottomButton(props.styles.bottomButton);
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile0:'',
    tile1:'',
    tile2:'',
    tile3:'',
    tile4:'',
    tile5:'',
    tile6:'',
    tile7:'',
    tile8:'',
    player0score: 0,
    player1score: 0,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
};


const alternateturn = () =>{
  if ((toeGameData.player0score + toeGameData.player1score) % 2 === 0){
    return firestore().collection("ttt-games").doc(props.GameID).update({
      currentTurnID: toeGameData.players[1].uid,
    })
    .then()
    .catch(err => {
      return { hasError: true, error: err };
    });
  } else if ((toeGameData.player0score + toeGameData.player1score) % 2 !== 0){
    return firestore().collection("ttt-games").doc(props.GameID).update({
      currentTurnID: toeGameData.players[0].uid,
    })
    .then()
    .catch(err => {
      return { hasError: true, error: err };
    });
  }
};




//function to see if a game has been won 
const winner = ()=>{
  alternateturn();
    setplayer0displayname(toeGameData.players[0].displayName);
    setplayer1displayname(toeGameData.players[1].displayName);
if ((props.auth.uid === toeGameData.players[0].uid) && (props.auth.uid !== toeGameData.currentTurnID) &&
  (((toeGameData.tile0 === 'x') && (toeGameData.tile1 === 'x') && (toeGameData.tile2 === 'x')) ||
((toeGameData.tile3 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile5 === 'x')) ||
((toeGameData.tile6 === 'x') && (toeGameData.tile7 === 'x') && (toeGameData.tile8 === 'x')) ||
((toeGameData.tile0 === 'x') && (toeGameData.tile3 === 'x') && (toeGameData.tile6 === 'x')) ||
((toeGameData.tile1 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile7 === 'x')) ||
((toeGameData.tile2 === 'x') && (toeGameData.tile5 === 'x') && (toeGameData.tile8 === 'x')) ||
((toeGameData.tile0 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile8 === 'x')) ||
((toeGameData.tile2 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile6 === 'x')) ||
((toeGameData.tile0 === 'o') && (toeGameData.tile1 === 'o') && (toeGameData.tile2 === 'o')) ||
((toeGameData.tile3 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile5 === 'o')) ||
((toeGameData.tile6 === 'o') && (toeGameData.tile7 === 'o') && (toeGameData.tile8 === 'o')) ||
((toeGameData.tile0 === 'o') && (toeGameData.tile3 === 'o') && (toeGameData.tile6 === 'o')) ||
((toeGameData.tile1 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile7 === 'o')) ||
((toeGameData.tile2 === 'o') && (toeGameData.tile5 === 'o') && (toeGameData.tile8 === 'o')) ||
((toeGameData.tile0 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile8 === 'o')) ||
((toeGameData.tile2 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile6 === 'o')))){
  console.log("you won");
  var currentplayer0score = toeGameData.player0score + 1;
  if (currentplayer0score === 5){
    console.log("player 0 won!");
    setButtonView(props.styles.hidden);
    setwinnertext(props.styles.aoPlayerRow);
    setbottomButton(props.styles.hidden);
    setyouWinText(toeGameData.players[0].displayName + " Wins!");
  }
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile0:'',
    tile1:'',
    tile2:'',
    tile3:'',
    tile4:'',
    tile5:'',
    tile6:'',
    tile7:'',
    tile8:'',
    player0score: currentplayer0score,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
} else if ((props.auth.uid === toeGameData.players[1].uid) && (props.auth.uid !== toeGameData.currentTurnID) &&
(((toeGameData.tile0 === 'x') && (toeGameData.tile1 === 'x') && (toeGameData.tile2 === 'x')) ||
((toeGameData.tile3 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile5 === 'x')) ||
((toeGameData.tile6 === 'x') && (toeGameData.tile7 === 'x') && (toeGameData.tile8 === 'x')) ||
((toeGameData.tile0 === 'x') && (toeGameData.tile3 === 'x') && (toeGameData.tile6 === 'x')) ||
((toeGameData.tile1 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile7 === 'x')) ||
((toeGameData.tile2 === 'x') && (toeGameData.tile5 === 'x') && (toeGameData.tile8 === 'x')) ||
((toeGameData.tile0 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile8 === 'x')) ||
((toeGameData.tile2 === 'x') && (toeGameData.tile4 === 'x') && (toeGameData.tile6 === 'x')) ||
((toeGameData.tile0 === 'o') && (toeGameData.tile1 === 'o') && (toeGameData.tile2 === 'o')) ||
((toeGameData.tile3 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile5 === 'o')) ||
((toeGameData.tile6 === 'o') && (toeGameData.tile7 === 'o') && (toeGameData.tile8 === 'o')) ||
((toeGameData.tile0 === 'o') && (toeGameData.tile3 === 'o') && (toeGameData.tile6 === 'o')) ||
((toeGameData.tile1 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile7 === 'o')) ||
((toeGameData.tile2 === 'o') && (toeGameData.tile5 === 'o') && (toeGameData.tile8 === 'o')) ||
((toeGameData.tile0 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile8 === 'o')) ||
((toeGameData.tile2 === 'o') && (toeGameData.tile4 === 'o') && (toeGameData.tile6 === 'o')))){
  console.log("you won");
  var currentplayer1score = toeGameData.player1score + 1;
  if (currentplayer1score === 5){
    console.log("player 1 won!");
    setButtonView(props.styles.hidden);
    setwinnertext(props.styles.aoPlayerRow);
    setbottomButton(props.styles.hidden);
    setyouWinText(toeGameData.players[1].displayName + " Wins!");
  }
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile0:'',
    tile1:'',
    tile2:'',
    tile3:'',
    tile4:'',
    tile5:'',
    tile6:'',
    tile7:'',
    tile8:'',
    player1score: currentplayer1score,
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
} else {console.log("No you did not");
}};

//function if the game is a draw
const drawgame = () => {
    setplayer0displayname(toeGameData.players[0].displayName);
    setplayer1displayname(toeGameData.players[1].displayName);
  if ((toeGameData.tile0 !== '') && (toeGameData.tile1 !== '') && (toeGameData.tile2 !== '') && (toeGameData.tile3 !== '') && (toeGameData.tile4 !== '') && (toeGameData.tile5 !== '') && (toeGameData.tile6 !== '') && (toeGameData.tile7 !== '') && (toeGameData.tile8 !== '')){
  return firestore().collection("ttt-games").doc(props.GameID).update({
    tile0:'',
    tile1:'',
    tile2:'',
    tile3:'',
    tile4:'',
    tile5:'',
    tile6:'',
    tile7:'',
    tile8:'',
  })
  .then()
  .catch(err => {
    return { hasError: true, error: err };
  });
}};


  //write the setRoles function here
  const setRoles = (questionAsker, answeringSpirit) => {
    return firestore().collection("ao-games").doc(props.GameID).update({
      status: "playing",
      questionAsker: questionAsker,
      answeringSpirit: answeringSpirit,
      question: '',
      answer: '',
    })
    .then(() => {
      return { hasError: false, value: null };
    })
    .catch(err => {
      return { hasError: true, value: err };
    });
  };
  //if props.GameData is undefined, the game may have been deleted from the database. Take the player back to the greeting screen
  if (props.GameData === undefined) {
    props.changeScreen('greeting');
    return null;
  }

  return (
    <View style={props.styles.aoGameContainer}>
      <View style={props.styles.aoGameInnerContainer}>
        <View style={props.styles.aoLobbyContainer}>
          <View style={props.styles.aoLobbyInnerContainer}>
            <Text style={props.styles.aoText}>
              {"Your friends can join your group using this code:"}
            </Text>
            <Text style={props.styles.aoGameCode}>
              {props.GameData.gamecode}
            </Text>
            <>
              {props.GameData.players.map((player, index) => (
                <View key={index} style={props.styles.aoPlayerRow}>
                  <Image source={{uri: 'data:image/png;base64, ' + player.avatar}} style={props.styles.aoPlayerRowAvatar} />
                  <Text style={props.styles.aoPlayerRowName}>
                    {player.displayName}
                  </Text>
                </View>
              ))}
            </>
            <View style={winnertext}>
            <TouchableOpacity style={props.styles.toeButtonwide} onPress={() => buttonwinpress() }>
              <Text style={props.styles.toeButtonTextmini}>
                {youWinText}
              </Text>
            </TouchableOpacity>
            </View>
            <View style={props.styles.buttonRow}>
            <TouchableOpacity style={buttonView} onPress={() => button0press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonView} onPress={() => button1press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonView} onPress={() => button2press(2) }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile2}
              </Text>
            </TouchableOpacity>
            </View>
            <View style={props.styles.buttonRow}>
            <TouchableOpacity style={buttonView} onPress={() => button3press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonView} onPress={() => button4press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile4}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonView} onPress={() => button5press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile5}
              </Text>
            </TouchableOpacity>
            </View>
            <View style={props.styles.buttonRow}>
            <TouchableOpacity style={buttonView} onPress={() => button6press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile6}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonView} onPress={() => button7press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile7}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonView} onPress={() => button8press() }>
              <Text style={props.styles.toeButtonText}>
                {toeGameData.tile8}
              </Text>
            </TouchableOpacity>
            </View>
            <View style={props.styles.buttonRow}>
            <TouchableOpacity style={startstyle} onPress={() => startlistener() }>
              <Text style={props.styles.aoPrimaryButtonText}>
                {startgametext}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={bottomButton} onPress={() => winner() }>
              <Text style={props.styles.aoPrimaryButtonText}>
                {"I won!"}
              </Text>
            </TouchableOpacity><TouchableOpacity style={bottomButton} onPress={() => drawgame() }>
              <Text style={props.styles.aoPrimaryButtonText}>
                {"Draw!"}
              </Text>
            </TouchableOpacity>
            </View>
          </View>
          <Text style={props.styles.aoPrimaryButtonText}>
            {player0displayname + " Score= " + toeGameData.player0score + '     ' + player1displayname + ' Score= ' + toeGameData.player1score}
          </Text>
          {/*<Text style={{...props.styles.aoText, marginTop: 12, marginBottom: 24}}>
            {props.GameData.players.length < 8 ? "Waiting for people to join..." : null}
          </Text>
          {(props.GameData.owner === props.auth.uid && props.GameData.players.length > 2) ? (
            <TouchableOpacity style={props.styles.aoPrimaryButton} onPress={() => startGame()}>
              <Text style={props.styles.aoPrimaryButtonText}>
                {"Let's Play"}
              </Text>
            </TouchableOpacity>
          ) : (
            null
          )}*/}
        </View>
      </View>
    </View>
  );
};


export default Lobby;