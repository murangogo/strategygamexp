import React from 'react';
import { useSearchParams } from "react-router-dom";

function ChessPage() {
  const [searchParams] = useSearchParams();
  const gameid = searchParams.get("id");
  const chara = searchParams.get("typech");
  const username = searchParams.get("username");

  console.log(gameid);

  return (
    <div className="app">
      <h1>五子棋 {gameid} {chara} {username}</h1>
    </div>
  );
}

export default ChessPage;
