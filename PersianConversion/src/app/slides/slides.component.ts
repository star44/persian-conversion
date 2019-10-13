import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';


/**
 * Interface to store the results from the database
 */
interface Phrase {
  path: string;
  sentence: string;
  translation: string;
  difficulty: number;
};

@Component({
  selector: 'persian-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {
  private phrase: Phrase = {
    path: "",
    sentence: "",
    translation: "",
    difficulty: 0,
  };
  private phrases: Phrase[] = [this.phrase];
  private audio;


  constructor() {
    this.audio = new Audio();
  }

  async getPhrases(difficulty: number, limit: number): Promise<Phrase[]> {
    const response: Response = await fetch(`http://localhost:3000/get-slides/${difficulty}/${limit}`);
    const phrases: Phrase[] = await response.json();
    return phrases;
  }

  async shiftPhrases(): Promise<void> {
    if (this.phrases.length < 1) {
      this.phrases = await this.getPhrases(5, 5);
    }
    this.phrase = this.phrases.shift();
  }

  play(): void {
    this.audio.src = `https://farsi-dataset.s3.amazonaws.com/clips/${this.phrase.path}`;
    this.audio.load();
    this.audio.play();
  }


  async ngOnInit(): Promise<void> {
    this.phrases = await this.getPhrases(5, 5);
    await this.shiftPhrases();
    this.play();
  }
}
