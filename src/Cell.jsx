function Cell(props) {
  const handleClick = () => {
    props.onClick(props.cell.index);
  };
  // Skapar inCell som avgör vad som ska renderas inuti cellen.
  let inCell;
  // Kollar om cellen är synlig.
  if (props.cell.visible) {
    // Om cellen har en mina så visar inCell = BOMB.
    if (props.cell.hasMine) {
      inCell = "💣";
      // Om inCell är större än 0 så visas grannminor.
    } else if (props.cell.numberOfNeighbouringMines > 0) {
      inCell = props.cell.numberOfNeighbouringMines;
      // Om det inte är bredvid en mina visas 0.
    } else {
      inCell = "0";
    }
    // Om ingen cell är aktiverad så är den tom.
  } else {
    inCell = "";
  }

  return (
    <div className="cell" onClick={handleClick}>
      {inCell}
    </div>
  );
}

export default Cell;
