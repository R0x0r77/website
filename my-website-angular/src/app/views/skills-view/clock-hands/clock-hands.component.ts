import { Component, Input, OnInit } from '@angular/core';

export interface ClockHand {
  label: string;
  color: string;
  textColor: string;
  width: number;
  length: number;
  periodSec: number;
  startAngle?: number;
  angle?: number;
  hovered?: boolean;
}

@Component({
  selector: 'app-clock-hands',
  standalone: true,
  templateUrl: './clock-hands.component.html',
  styleUrls: ['./clock-hands.component.scss'],
})
export class ClockHandsComponent implements OnInit {
  @Input() tilt = 1;
  @Input() hands: ClockHand[] = [
    {
      label: 'Spring',
      color: '#ebb643ff',
      textColor: '#2db621',
      width: 3,
      length: 45,
      periodSec: 240,
      startAngle: 0,
    },
    {
      label: 'Angular',
      color: '#90caf9',
      textColor: '#c042d1ff',
      width: 2,
      length: 60,
      periodSec: 120,
      startAngle: 90,
    },
    {
      label: 'Java',
      color: '#d32f2f',
      textColor: '#d32f2f',
      width: 1.2,
      length: 60,
      periodSec: 40,
      startAngle: 45,
    },
  ];

  readonly PI = Math.PI;

  ngOnInit() {
    const start = performance.now();
    const loop = (tNow: number) => {
      const t = (tNow - start) / 1000;
      for (const hand of this.hands) {
        if (hand.hovered) continue; // pause this hand while hovering its tip
        const base = hand.startAngle ?? 0;
        const speed = 360 / hand.periodSec;
        hand.angle = (base + speed * t) % 360;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /** End-of-hand coordinates (angle 0 = 12 o'clock; positive = clockwise) */
  endX(hand: ClockHand): number {
    const angle = (hand.angle ?? hand.startAngle ?? 0) * (this.PI / 180);
    return Math.sin(angle) * hand.length;
  }
  endY(hand: ClockHand): number {
    const angle = (hand.angle ?? hand.startAngle ?? 0) * (this.PI / 180);
    return -Math.cos(angle) * hand.length;
  }

  onTipEnter(h: ClockHand) {
    h.hovered = true;
  }
  onTipLeave(h: ClockHand) {
    h.hovered = false;
  }
}
