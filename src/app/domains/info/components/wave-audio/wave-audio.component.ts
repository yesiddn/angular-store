import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl: string = ''; // cuando genera error por no inicializar la variable se puede evitar con el operador de asignación asi: audioUrl!: string;

  // es la forma segura de acceder a un elemento del DOM en Angular -> es como el document.getElementById('waveform') de JavaScript
  @ViewChild('waveform') waveContainer!: ElementRef;

  ngAfterViewInit() {
    WaveSurfer.create({
      url: this.audioUrl,
      container: this.waveContainer.nativeElement,
    });
  }
}
