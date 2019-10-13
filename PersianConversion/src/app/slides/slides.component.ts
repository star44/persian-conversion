import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';
import { Howl, Howler } from "howler";


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
  private audioURL: string;
  private showTranslation: boolean;
  private difficulty: number;
  private batchSize: number;

  constructor() {
    this.difficulty = 5;
    this.batchSize = 5;
    this.showTranslation = false;
  }

  async getPhrases(difficulty: number, limit: number): Promise<Phrase[]> {
    const response: Response = await fetch(`http://localhost:3000/get-slides/${difficulty}/${limit}`);
    const phrases: Phrase[] = await response.json();
    return phrases;
  }

  /**
   * Shift down phrases until empty then query DB
   * Idea is to have two arrays for this so at least one is always full
   */
  async shiftPhrases(): Promise<void> {
    if (this.phrases.length < 1) {
      this.phrases = await this.getPhrases(5, 5);
    }
    this.phrase = this.phrases.shift();
    this.audioURL = `https://farsi-dataset.s3.amazonaws.com/clips/${this.phrase.path}`;
    this.audio = new Howl({ src: this.audioURL });
    this.play();
  }

  play(): void {
    this.audio.play();
  }

  toggleTranslation() {
    this.showTranslation = !this.showTranslation;
  }

  async ngOnInit(): Promise<void> {
    this.phrases = await this.getPhrases(5, 5);
    await this.shiftPhrases();
  }
}
