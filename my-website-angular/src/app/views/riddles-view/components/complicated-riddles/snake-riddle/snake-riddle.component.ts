import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

interface LetterObject {
  id: number;
  letter: string;
}

@Component({
  selector: 'app-snake-riddle',
  imports: [MatGridListModule],
  templateUrl: './snake-riddle.component.html',
  styleUrl: './snake-riddle.component.scss',
})
export class SnakeRiddleComponent {
  // prettier-ignore
  gridLetters: LetterObject[] = [
    {id: 11, letter: 's'}, {id: 12, letter: 't'}, {id: 13, letter: 't'}, {id: 14, letter: 'i'}, {id: 15, letter: 's'}, {id: 16, letter: 's'}, {id: 17, letter: 'a'},
    {id: 21, letter: 'u'}, {id: 22, letter: 'g'}, {id: 23, letter: 'y'}, {id: 24, letter: 'm'}, {id: 25, letter: 'e'}, {id: 26, letter: 'o'}, {id: 27, letter: 'g'},
    {id: 31, letter: 'j'}, {id: 32, letter: 'o'}, {id: 33, letter: 'p'}, {id: 34, letter: 'e'}, {id: 35, letter: 'm'}, {id: 36, letter: 's'}, {id: 37, letter: 'e'},
  ];
}
