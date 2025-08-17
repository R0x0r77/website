import { Component, Input, OnInit } from '@angular/core';

type Direction = 'cw' | 'ccw';

export interface OrbitPoint {
  angle: number;
  label: string;
  id?: string | number;
  hovered?: boolean;
}

export interface OrbitRing {
  radius: number;
  periodSec: number;
  direction?: Direction;
  stroke?: string;
  tilt: number;
  dotRadius?: number;
  cx: number;
  cy: number;
  points: OrbitPoint[];
}

@Component({
  selector: 'app-orbit-turntable',
  standalone: true,
  templateUrl: './orbit-turntable.component.html',
  styleUrl: './orbit-turntable.component.scss',
})
export class OrbitTurntableComponent implements OnInit {
  @Input() rings: OrbitRing[] = [];
  @Input() tilt = 0.5;

  defaultRingColor = '#90caf9';
  PI = Math.PI;

  ngOnInit() {
    const start = performance.now();
    const update = (time: number) => {
      const t = (time - start) / 1000;
      for (const ring of this.rings) {
        const factor = ring.direction === 'cw' ? -1 : 1;
        const anglePerSec = 360 / ring.periodSec;

        for (const p of ring.points) {
          // Only move if not hovered
          if (!p.hovered) {
            p.angle = (p.angle + factor * anglePerSec * 0.016) % 360;
          }
        }
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  cos(deg: number) {
    return Math.cos((deg * Math.PI) / 180);
  }
  sin(deg: number) {
    return Math.sin((deg * Math.PI) / 180);
  }

  onPointEnter(p: OrbitPoint) {
    p.hovered = true;
  }
  onPointLeave(p: OrbitPoint) {
    p.hovered = false;
  }
}
