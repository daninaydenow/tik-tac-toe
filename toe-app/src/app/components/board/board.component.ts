import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  squares!: any[];
  xIsNext!: boolean;
  winner!: string;
  xWinsCount: number = 0;
  oWinsCount: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (this.winner === 'X' || this.winner === 'O') {
      return;
    }
    this.squares.splice(idx, 1, this.player);
    this.xIsNext = !this.xIsNext;
    this.winner = this.calculateWinner();
    if (this.winner === 'X') {
      this.xWinsCount += 1;
    }
    if (this.winner === 'O') {
      this.oWinsCount += 1;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
