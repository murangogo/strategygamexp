import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import PollingContext, { PollingProvider } from './PollingController';

let mychara = 0;  //我的角色，1创建者，2加入者
let gid = 0;

//棋盘大小
const size = 14;

//棋子颜色映射
const colorMap = {
  0: 'transparent',
  1: '#EA5E59',
  2: '#8FA4F0',
  3: '#D4ABA9',
  4: '#AFDFE6'
};

//下方选择棋子所使用的图片路径
const items = [
    { label: 'Item 1', icon: 'icons/1_1' },
    { label: 'Item 2', icon: 'icons/2_1' },
    { label: 'Item 3', icon: 'icons/3_1' },
    { label: 'Item 4', icon: 'icons/4_1' },
    { label: 'Item 5', icon: 'icons/5_1' },
    { label: 'Item 6', icon: 'icons/6_1' },
    { label: 'Item 7', icon: 'icons/7_1' },
    { label: 'Item 8', icon: 'icons/8_1' },
    { label: 'Item 9', icon: 'icons/9_1' },
    { label: 'Item 10', icon: 'icons/10_1' },
    { label: 'Item 11', icon: 'icons/11_1' },
    { label: 'Item 12', icon: 'icons/12_1' },
    { label: 'Item 13', icon: 'icons/13_1' },
    { label: 'Item 14', icon: 'icons/14_1' },
    { label: 'Item 15', icon: 'icons/15_1' },
    { label: 'Item 16', icon: 'icons/16_1' },
    { label: 'Item 17', icon: 'icons/17_1' },
    { label: 'Item 18', icon: 'icons/18_1' },
    { label: 'Item 19', icon: 'icons/19_1' },
    { label: 'Item 20', icon: 'icons/20_1' },
    { label: 'Item 21', icon: 'icons/21_1' }
  ];

//棋盘网格组件，接收onClick（可点击）和颜色
function Cell({ onClick, cellValue }) {
  const cellStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid black',
    backgroundColor: colorMap[cellValue],
    cursor: 'pointer' //表示鼠标放上去变成手型
  };

  return <td style={cellStyle} onClick={onClick}></td>;
}

//下方棋子选择列表，Item组件，可点击
function Item({ label, isSelected, onClick, icon }) {
    const itemStyle = {
      padding: '5px',
      cursor: 'pointer',
      backgroundColor: isSelected ? 'lightblue' : 'white',
      display: 'flex',  //弹性盒子布局
      alignItems: 'center'
    };
  
    return (
      <span style={itemStyle} onClick={onClick}>
        <img src={icon} alt={label} style={{ margin: '5px'}} />
      </span>
    );
  }

// Board组件，棋盘
function Board({setclickinfo}) {
  const { board,setBoard,selectedItem,displayimgid } = useContext(PollingContext);

  //判断board
  console.log("这是board组件。");
  console.log(board);

  //点击某个位置
  const handleCellClick = (row, col) => {
    setclickinfo(`${row}, ${col}`);
    setBoard(Array.from(copyarray));
    switch(selectedItem+1){
      case 1:
        board[row][col] = mychara+2;
        break;
      case 2:
        switch(displayimgid+1){
          case 1: 
          if((col+1)<size){
            board[row][col] = mychara + 2;
            board[rwo][col+1] = mychara + 2;
          }
          break;
          case 2:
          if((row+1)<size){
            board[row][col] = mychara + 2;
            board[rwo+1][col] = mychara + 2;
          }
          break;
        }
        break;
      case 3:
        switch(displayimgid){
          case 1:
            if((row+1<size)&&(col+1<size)){
              board[row][col] = mychara + 2;
              board[rwo+1][col] = mychara + 2;
              board[rwo+1][col+1] = mychara + 2;
            }
            break;
          case 2:
            if((row+1<size)&&(col-1>=0)){
              board[row][col] = mychara + 2;
              board[rwo+1][col-1] = mychara + 2;
              board[rwo][col-1] = mychara + 2;
            }
            break;
          case 3:
            if((row-1>=0)&&(col+1<size)){
              board[row][col] = mychara + 2;
              board[rwo-1][col+1] = mychara + 2;
              board[rwo][col+1] = mychara + 2;
            }
            break;
          case 4:
            if((row-1>=0)&&(col-1>=0)){
              board[row][col] = mychara + 2;
              board[rwo-1][col] = mychara + 2;
              board[rwo-1][col-1] = mychara + 2;
            }
            break;
        }
        break;
      case 4:
        switch(displayimgid){
          case 1:
            if(row+2<size){
              board[row][col] = mychara + 2;
              board[row+1][col] = mychara + 2;
              board[row+2][col] = mychara + 2;
            }
            break;
          case 2:
            if(col+2<size){
              board[row][col] = mychara + 2;
              board[row][col+1] = mychara + 2;
              board[row][col+2] = mychara + 2;
            }
            break;
        }
        break;
      case 5:
        if((row+1<size)&&(col+1<size)){
              board[row][col] = mychara + 2;
              board[row][col+1] = mychara + 2;
              board[row+1][col] = mychara + 2;
              board[row+1][col+1] = mychara + 2;
        }
        break;
      case 6:
        switch(displayimgid){
          case 1:
            if((row+1<size)&&(row-1>=0)&&(col+1<size)){
              board[row][col] = mychara + 2;
              board[row][col+1] = mychara + 2;
              board[row+1][col+1] = mychara + 2;
              board[row-1][col+1] = mychara + 2;
            }
            break;
          case 2:
            if((row+1<size)&&(row-1>=0)&&(col-1>=0)){
              board[row][col] = mychara + 2;
              board[row][col-1] = mychara + 2;
              board[row+1][col-1] = mychara + 2;
              board[row-1][col-1] = mychara + 2;
            }
            break;
          case 3:
              if((row+1<size)&&(col-1>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
              }
              break;
          case 4:
                if((row-1>=0)&&(row-1>=0)&&(col+1<size)){
                  board[row][col] = mychara + 2;
                  board[row-1][col] = mychara + 2;
                  board[row-1][col+1] = mychara + 2;
                  board[row-1][col+1] = mychara + 2;
                }
                break;
        }
        break;
      case 7:
        switch(displayimgid){
          case 1:
            if(row+3<size){
              board[row][col] = mychara + 2;
              board[row+1][col] = mychara + 2;
              board[row+2][col] = mychara + 2;
              board[row+3][col] = mychara + 2;
            }
            break;
          case 2:
          if(col+3<size){
              board[row][col] = mychara + 2;
              board[row][col+1] = mychara + 2;
              board[row][col+2] = mychara + 2;
              board[row][col+3] = mychara + 2;
            }
            break;
        }
        break;
      case 8:
        switch(displayimgid){
          case 1:
            if((row-2>=0)&&(col+1<size)){
              board[row][col] = mychara + 2;
              board[row][col+1] = mychara + 2;
              board[row-1][col+1] = mychara + 2;
              board[row-2][col+1] = mychara + 2;
            }
            break;
          case 2:
              if((row+1<size)&&(col-2>=0)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
                board[row+1][col-2] = mychara + 2;
              }
              break;
          case 3:
              if((row-1>=0)&&(col+2<size)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-1][col+1] = mychara + 2;
                board[row-1][col+2] = mychara + 2;
              }
              break;
          case 4:
              if((row-2>=0)&&(col-1>=0)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row-2][col-1] = mychara + 2;
              }
              break;
          case 5:
              if((row+1<size)&&(col+2<size)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
                board[row+1][col+2] = mychara + 2;
              }
              break;
          case 6:
              if((row-1>=0)&&(col-2>=0)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row-1][col-2] = mychara + 2;
              }
              break;
          case 7:
              if((row+2<size)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
                board[row+2][col+1] = mychara + 2;
              }
              break;
          case 8:
              if((row+2<size)&&(col-1>=0)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
                board[row+2][col-1] = mychara + 2;
              }
              break;
        }
        break;
      case 9:
        switch(displayimgid){
          case 1:
            if((row+1<size)&&(row-1>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row-1][col+1] = mychara + 2;
            }
            break;
          case 2:
            if((col+1<size)&&(col-1>=0)&&(row+1<size)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
            }
            break;
          case 3:
            if((row+1<size)&&(col-1>=0)&&(row-1>=0)){
                board[row][col] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row+1][col] = mychara + 2;
            }
            break;
          case 4:
            if((row+1<size)&&(col-1>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
            }
            break;
        }
        break;
      case 10:
        switch(displayimgid){
          case 1:
            if((row+3<size)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
                board[row+2][col+1] = mychara + 2;
                board[row+3][col+1] = mychara + 2;
            }
            break;
          case 2:
            if((row+1<size)&&(col-3>=0)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
                board[row+1][col-2] = mychara + 2;
                board[row+1][col-3] = mychara + 2;
            }
            break;
          case 3:
            if((row-3>=0)&&(col-1>=0)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row-2][col-1] = mychara + 2;
                board[row-3][col-1] = mychara + 2;
            }
            break;
          case 4:
            if((col+3<size)&&(row-1>=0)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-1][col+1] = mychara + 2;
                board[row-1][col+2] = mychara + 2;
                board[row-1][col+3] = mychara + 2;
            }
            break;
          case 5:
            if((row+3<size)&&(col-1>=0)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
                board[row+2][col-1] = mychara + 2;
                board[row+3][col-1] = mychara + 2;
            }
            break;
          case 6:
            if((row-1>=0)&&(col-3>=0)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row-1][col-2] = mychara + 2;
                board[row-1][col-3] = mychara + 2;
            }
            break;
          case 7:
            if((row-3>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row-1][col+1] = mychara + 2;
                board[row-2][col+1] = mychara + 2;
                board[row-3][col+1] = mychara + 2;
            }
            break;
          case 8:
            if((row+1<size)&&(col+3<size)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
                board[row+1][col+2] = mychara + 2;
                board[row+1][col+3] = mychara + 2;
            }
            break;
        }
        break;
      case 11:
        switch(displayimgid){
          case 1:
            if((row+1<size)&&(row-1>=0)&&(col+2<size)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row][col+2] = mychara + 2;
                board[row+1][col+2] = mychara + 2;
                board[row-1][col+2] = mychara + 2;
            }
            break;
          case 2:
            if((row+2<size)&&(col-1>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+2][col] = mychara + 2;
                board[row+2][col-1] = mychara + 2;
                board[row+2][col+1] = mychara + 2;
            }
            break;
          case 3:
            if((col-2>=0)&&(row-1>=0)&&(row+1<size)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row][col-2] = mychara + 2;
                board[row+1][col-2] = mychara + 2;
                board[row-1][col-2] = mychara + 2;
            }
            break;
          case 4:
            if((row-2>=0)&&(col-1>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-2][col] = mychara + 2;
                board[row-2][col+1] = mychara + 2;
                board[row-2][col-1] = mychara + 2;
            }
            break;
        }
        break;
      case 12:
        switch(displayimgid){
          case 1:
            if((row+2<size)&&(col+2<size)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row][col+2] = mychara + 2;
                board[row+1][col+2] = mychara + 2;
                board[row+2][col+2] = mychara + 2;
            }
            break;
          case 2:
            if((row+2<size)&&(col-2>=0)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+2][col] = mychara + 2;
                board[row+2][col-1] = mychara + 2;
                board[row+2][col-2] = mychara + 2;
            }
            break;
          case 3:
            if((row-2>=0)&&(col-2>=0)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row][col-2] = mychara + 2;
                board[row-1][col-2] = mychara + 2;
                board[row-2][col-2] = mychara + 2;
            }
            break;
          case 4:
            if((col+2<size)&&(row-2>=0)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-2][col] = mychara + 2;
                board[row-2][col+1] = mychara + 2;
                board[row-2][col+2] = mychara + 2;
            }
            break;
        }
        break;
      case 13:
        switch(displayimgid){
          case 1:
            if((row+2<size)&&(row-1>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+2][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row-1][col+1] = mychara + 2;
            }
            break;
          case 2:
            if((row+1<size)&&(col-2>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row][col-2] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
            }
            break;
          case 3:
            if((row-2>=0)&&(col-1>=0)&&(row+1<szie)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-2][col] = mychara + 2;
            }
            break;
          case 4:
            if((col-1)&&(col+2<size)&&(row-1>=0)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row][col+2] = mychara + 2;
            }
            break;
          case 5:
            if((row+2<size)&&(col-1>=0)&&(row-1>=0)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row-1][col-1] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+2][col] = mychara + 2;
            }
            break;
          case 6:
            if((row-1>=0)&&(col-2>=0)&&(col+1<size)){
                board[row][col] = mychara + 2;
                board[row][col-1] = mychara + 2;
                board[row][col-2] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-1][col+1] = mychara + 2;
            }
            break;
          case 7:
            if((row-2>=0)&&(col+1<size)&&(row+1<size)){
                board[row][col] = mychara + 2;
                board[row-1][col] = mychara + 2;
                board[row-2][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row+1][col+1] = mychara + 2;
            }
            break;
          case 8:
            if((row+1<size)&&(col+2<size)&&(col-1>=0)){
                board[row][col] = mychara + 2;
                board[row][col+1] = mychara + 2;
                board[row][col+2] = mychara + 2;
                board[row+1][col] = mychara + 2;
                board[row+1][col-1] = mychara + 2;
            }
            break;
        }
        break;
      case 14:
        switch(displayimgid){
          
        }
        break;
      case 15:
        switch(displayimgid){
          
        }
        break;
      case 16:
        switch(displayimgid){
          
        }
        break;
      case 17:
        switch(displayimgid){
          
        }
        break;
      case 18:
        switch(displayimgid){
          
        }
        break;
      case 19:
        switch(displayimgid){
          
        }
        break;
      case 20:
        switch(displayimgid){
          
        }
        break;
      case 21:
        switch(displayimgid){
          
        }
        break;
    }
  };

  return (
    <table>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
              key={colIndex}
              cellValue={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />            
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//按钮样式
function ButtonColumn({ label1, label2, onClick1, onClick2 }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
        <button onClick={onClick1}>{label1}</button>
        <button onClick={onClick2} style={{ marginTop: '10px' }}>{label2}</button>
      </div>
    );
  }

  function PollingComponent() {
    const [loopCounter, setLoopCounter] = useState(0);
    const {setcopyarray,partnername, setpartnername,creatorname, setcreatorname,isPolling, setIsPolling, turnNum, setturnNum,cst, setcst,pst, setpst ,winner,setwinner,board, setBoard } = useContext(PollingContext);
    
    const arraysAreEqual = (arr1, arr2) => {
      if (!arr1 || !arr2) return false; // 检查是否存在空数组
      if (arr1.length !== arr2.length) return false; // 检查数组的外部长度
    
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].length !== arr2[i].length) return false; // 检查内部数组的长度
    
        for (let j = 0; j < arr1[i].length; j++) {
          if (arr1[i][j] !== arr2[i][j]) return false; // 检查具体的元素
        }
      }
      
      return true; // 所有元素都相同
    }
    
    useEffect(() => {
        const fetchData = async () => {
          if (isPolling) {
            console.log("轮询操作......");
            const response = await fetch(`/api/dopolling?chessid=${gid}`);
            const data = await response.json();
            if(response.ok){
              console.log("轮询成功......，data");
              console.log(data);
              if(creatorname!=data.result.creator){
                console.log("creatorname!=data.creator");
                console.log(creatorname);
                console.log(data.result.creator);
                setcreatorname(data.result.creator);
              }
              const newwinner = "";
              if(winner!=data.result.winner){
                console.log("winner!=data.winner");
                console.log(winner);
                console.log(data.result.winner);
                setwinner(data.result.winner);
                newwinner = data.result.winner;
              }
              const crstop = 0;
              const pastop = 0;
              if(cst!=data.result.cst){
                console.log("cst!=data.cst");
                console.log(cst);
                console.log(data.result.cst);
                crstop = data.result.cst;
                setcst(data.result.cst);
              }
              if(pst!=data.result.pst){
                console.log("pst!=data.pst");
                console.log(pst);
                console.log(data.result.pst);
                pastop = data.result.pst;
                setpst(data.result.pst);
              }
              if(!(arraysAreEqual(board,data.result.chessboard))){
                console.log("!(arraysAreEqual(board,data.board))");
                console.log(board);
                console.log(data.result.chessboard);
                setBoard(data.result.chessboard);
                setcopyarray(Array.from(data.result.chessboard));
              }
              if(turnNum!=data.result.turn){
                console.log("turnNum!=data.turn");
                console.log(turnNum);
                console.log(data.result.turn);
                setturnNum(data.result.turn);
                //判断停手状况
                if(((mychara==1)&&(crstop==1))||((mychara==2)&&(pastop==1))){
                    //自己停手，看对方有没有停手
                    if(((mychara==1)&&(pastop==1))||((mychara==2)&&(crstop==1))){
                      //对方也停手，则结算比赛
                      if(newwinner!=""){
                        //winner已经出现，则已经结算，不需要再轮询
                        setIsPolling(false);
                      }else{
                        await gameover();
                      }
                    }
                    //自己停手，对方没停，则继续轮询
                }else{
                    //自己没停手，看对方是否停手
                    if(((mychara==1)&&(pastop==1))||((mychara==2)&&(crstop==1))){
                      //对方停手，自己没停手，则直接停止轮询
                      setIsPolling(false);
                    }else{
                      //双方都没停手，则判断是否到本人下棋，是则停止轮询
                      if(((mychara==1)&&(data.result.turn%2==1))||((mychara==2)&&(data.result.turn%2==0))){
                        console.log("到我下棋，停止轮询。");
                        setIsPolling(false);
                      }
                  }
                }
              }
              if(data.result.partner==""){
                console.log("对方还没来，我还得轮询。");
                setturnNum(0);
                setIsPolling(true);
              }else{
                if(partnername!=data.result.partner){
                  console.log("partnername!=data.partner");
                  console.log(partnername);
                  console.log(data.result.partner);
                  setpartnername(data.result.partner);
                }
              }
            }else{
              console.log("轮询失败......");
              console.log(data.error);
            }
        }else{
          console.log("目前不需要轮询。");
        }
        setTimeout(() => {
          if(loopCounter==0){
            setLoopCounter(1);
          }else{
            setLoopCounter(0);
          }
        }, 5000);
        }
        fetchData();
    }, [loopCounter]); // 监听isPolling状态的变化
    return null; // 不渲染任何可视元素。
  }
  
//将棋盘改为下完此步棋的状态，并发送至服务器，同时将轮数加一
async function downchessandturnplus(){
  
}

//结算比赛
async function gameover(){
  const response = await fetch(`/api/gameover?chessid=${gid}`);
  const data = await response.json();
  if(response.ok){
    console.log(data.message);
  }else{
    console.log("结算失败。");
    console.log(data.error);
  }
}

//停止落子
async function stopplaytodb(){
  const response = await fetch(`/api/stopplay?chessid=${gid}&chara=${mychara}`);
  const data = await response.json();
  if(response.ok){
    console.log("认输成功......");
    console.log(data);
  }else{
    console.log("认输失败。");
    console.log(data.error);
  }
}

//认输
async function tobelose(){
  const response = await fetch(`/api/stopplay?chessid=${gid}&chara=${mychara}`);
  const data = await response.json();
  if(response.ok){
    console.log("停手成功......");
    console.log(data);
  }else{
    console.log("停手失败。");
    console.log(data.error);
  }
}

// 主ChessPage组件
function ChessPage() {

//获取房间号、角色、用户名
const [searchParams] = useSearchParams();
const gameid = searchParams.get("id");
let chara = searchParams.get("typech");
const username = searchParams.get("username");
gid = gameid;
if(chara=="creator"){
  chara = "创建者";
  mychara = 1;
}else{
  chara = "加入者";
  mychara = 2;
}

//共享变量
const [isPolling, setIsPolling] = useState(true); //是否开启轮询
const [turnNum, setturnNum] = useState(0); //轮数
const [creatorname, setcreatorname] = useState(mychara == 1 ? username : '');//创建者
const [partnername, setpartnername] = useState(mychara != 1 ? username : '');//加入者
const [cst, setcst] = useState(0); //创建者是否停手
const [pst, setpst] = useState(0); //加入者是否停手
const [winner,setwinner] = useState('');  //获胜者，为空则没有结束
const [board, setBoard] = useState(
  Array(size).fill().map(() => Array(size).fill(1))
);  //生成一个14*14的全为0的二维数组
const [remindinfo,setremindinfo] = useState('');
const [selectedItem, setSelectedItem] = useState(0);  //选择的棋子的编号
const [displayimgid,setdisplayimgid] = useState(0); //选择的棋子的变换状态编号
const [copyarray,setcopyarray] = useState(
  Array(size).fill().map(() => Array(size).fill(0))
);  //生成一个14*14的全为0的备用二维数组

//获取点击坐标
const [clickinfo,setclickinfo] = useState('');
//展示选择的棋子的大图的图片路径
const [displayimg,setdisplayimg] = useState('icons/1_1');
//选择的棋子的变换状态总数，用于取余，便于图片循环
const [displayimgidbf,setdisplayimgidbf] = useState(1);

//选择棋子后执行的操作
const chooseitem = (index) =>{
    setSelectedItem(index);
    setdisplayimgid(0);
    setdisplayimg(`icons/${(index+1)}_1`);
    //设置变换状态总数
    switch(index+1){
        case 1:setdisplayimgidbf(1);break;
        case 2:setdisplayimgidbf(2);break;
        case 3:setdisplayimgidbf(4);break;
        case 4:setdisplayimgidbf(2);break;
        case 5:setdisplayimgidbf(1);break;
        case 6:setdisplayimgidbf(4);break;
        case 7:setdisplayimgidbf(2);break;
        case 8:setdisplayimgidbf(8);break;
        case 9:setdisplayimgidbf(4);break;
        case 10:setdisplayimgidbf(8);break;
        case 11:setdisplayimgidbf(4);break;
        case 12:setdisplayimgidbf(4);break;
        case 13:setdisplayimgidbf(8);break;
        case 14:setdisplayimgidbf(4);break;
        case 15:setdisplayimgidbf(2);break;
        case 16:setdisplayimgidbf(8);break;
        case 17:setdisplayimgidbf(4);break;
        case 18:setdisplayimgidbf(4);break;
        case 19:setdisplayimgidbf(8);break;
        case 20:setdisplayimgidbf(1);break;
        case 21:setdisplayimgidbf(8);
    }
}
  
  const okupload = async () => {
    if((creatorname=='')||(partnername=='')){
      setremindinfo("棋局未开始，不能落子。");
    }else if(winner!=''){
      setremindinfo("棋局已结束，不能再落子。");
    }else if(((mychara==1)&&(cst==1))||((mychara==2)&&(pst==1))){
      setremindinfo("您已停手，不能再落子，请等待对方落子结束后结算。");
    }else if(((mychara==1)&&(turnNum%2==0))||((mychara==2)&&(turnNum%2==1))){
      setremindinfo("轮到对方落子，您不能落子。");
    }else{
      console.log(`点击了下棋，棋子为${(selectedItem+1)}_${(displayimgid+1)}`);
      await downchessandturnplus();
      setIsPolling(true);
    }
  };
  
  const stopplay = async () => {
    if((creatorname=='')||(partnername=='')){
      setremindinfo("棋局未开始，不能停止落子。")
    }else if(winner!=''){
      setremindinfo("棋局已结束，不能停止落子。")
    }else if(((mychara==1)&&(cst==1))||((mychara==2)&&(pst==1))){
      setremindinfo("已经停手。");
    }else if(((mychara==1)&&(turnNum%2==0))||((mychara==2)&&(turnNum%2==1))){
      setremindinfo("轮到对方落子，您不能停手。");
    }else{
      console.log("停止落子。");
      await stopplaytodb();
      setIsPolling(true);
    }
  };
  
  const belose = async () => {
    if((creatorname=='')||(partnername=='')){
      setremindinfo("棋局未开始，不能认输。")
    }else if(winner!=''){
      setremindinfo("棋局已结束，不能认输。")
    }else if(((mychara==1)&&(turnNum%2==0))||((mychara==2)&&(turnNum%2==1))){
      setremindinfo("轮到对方落子，您不能认输。");
    }else{
      console.log("认输。");
      await tobelose();
      setIsPolling(true);
    }
  };

//点击棋子变换后，执行的操作
  const changeimg = () => {
    //因为state是异步刷新，因此创建临时变量来及时更新
    const newDisplayImgId = (displayimgid + 1) % displayimgidbf;
    setdisplayimgid(newDisplayImgId);
    setdisplayimg('icons/'+(selectedItem+1)+'_'+(newDisplayImgId+1));
  };
  

  return (
    <PollingProvider value={{copyarray,setcopyarray,selectedItem,displayimgid,partnername, setpartnername,creatorname, setcreatorname,remindinfo,setremindinfo,isPolling, setIsPolling, turnNum, setturnNum,cst, setcst,pst, setpst ,winner,setwinner,board, setBoard}}>
    <PollingComponent />
    <div className="chess-page">
      <p>看看你有多聪明？</p>
      <p>房间号：{gameid} 角色：{chara} 你是：{username}</p>
      <p>你点了{clickinfo}</p>
      <Board setclickinfo={setclickinfo}/>

        <div style={{ display: 'flex', marginTop: '10px' }}>

        <img src={require('./'+displayimg+'.png')} style={ {marginRight: '5px'}}/>
        
        <ButtonColumn 
        label1="停止下棋" 
        label2="认输" 
        onClick1={stopplay} 
        onClick2={belose} 
        />
        <ButtonColumn 
        label1="棋子变换" 
        label2="确定下棋" 
        onClick1={changeimg} 
        onClick2={okupload} 
        />
        <p>{remindinfo}</p>
        </div>
      
      <div style={{width: 'auto', height: '20px'} } >
        <div style={{ display: 'flex', overflowX: 'auto', marginTop: '10px'}}>
            {items.map((item, index) => (
            <Item
                key={index}
                icon={require('./'+item.icon+'.png')}
                isSelected={selectedItem === index}
                onClick={() => {chooseitem(index)}}
            />
            ))}
        </div>
      </div>
    </div>
  </PollingProvider>
  );
}

export default ChessPage;