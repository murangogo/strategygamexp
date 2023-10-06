import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";

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
  

// Cell组件
function Cell({ onClick, color }) {
  const cellStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid black',
    backgroundColor: color,
    cursor: 'pointer'
  };

  return <td style={cellStyle} onClick={onClick}></td>;
}

function Item({ label, isSelected, onClick, icon }) {
    const itemStyle = {
      padding: '5px',
      cursor: 'pointer',
      backgroundColor: isSelected ? 'lightblue' : 'white',
      display: 'flex',
      alignItems: 'center'
    };
  
    return (
      <span style={itemStyle} onClick={onClick}>
        <img src={icon} alt={label} style={{ margin: '5px'}} />
      </span>
    );
  }

// Board组件
function Board({setclickinfo}) {
  const size = 14;
  const [board, setBoard] = useState(
    Array(size).fill().map(() => Array(size).fill(null))
  );

  const handleCellClick = (row, col) => {
    setclickinfo(`${row}, ${col}`);
    // TODO: 更多的逻辑...
  };

  return (
    <table>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                color={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 主ChessPage组件
function ChessPage() {
const [searchParams] = useSearchParams();
const [clickinfo,setclickinfo] = useState('');
const gameid = searchParams.get("id");
const chara = searchParams.get("typech");
const username = searchParams.get("username");
const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="chess-page">
      <p>看看你有多聪明？</p>
      <p>房间号：{gameid} 角色：{chara} 你是：{username}</p>
      <p>你点了{clickinfo}</p>
      <Board setclickinfo={setclickinfo}/>
      <div style={{width: 'auto', height: '20px'} } >
        <div style={{ display: 'flex', overflowX: 'auto', marginTop: '10px'}}>
            {items.map((item, index) => (
            <Item
                key={index}
                icon={require('./'+item.icon+'.png')}
                isSelected={selectedItem === index}
                onClick={() => setSelectedItem(index)}
            />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChessPage;