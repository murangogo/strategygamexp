import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";

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
  return (
    <div className="chess-page">
      <h1>看看你有多聪明？</h1>
      <h2>房间号：{gameid} 角色：{chara} 你是：{username}</h2>
      <p>你点了{clickinfo}</p>
      <Board setclickinfo={setclickinfo}/>
    </div>
  );
}

export default ChessPage;