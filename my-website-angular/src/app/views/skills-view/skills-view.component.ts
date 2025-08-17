import { Component } from '@angular/core';
import { OrbitTurntableComponent } from './orbit-turntable/orbit-turntable.component';
import { ClockHandsComponent } from './clock-hands/clock-hands.component';

@Component({
  selector: 'app-skills-view',
  imports: [OrbitTurntableComponent, ClockHandsComponent],
  templateUrl: './skills-view.component.html',
  styleUrl: './skills-view.component.scss',
})
export class SkillsViewComponent {
  demoRings = [
    {
      radius: 30,
      periodSec: 40,
      direction: 'ccw' as const,
      stroke: '#64b5f6',
      tilt: 0.5,
      dotRadius: 3,
      cx: 0,
      cy: -4,
      points: [
        { angle: 0, label: 'REST' },
        { angle: 90, label: 'Spring Boot' },
        { angle: 180, label: 'JPA' },
        { angle: 270, label: 'SQL' },
      ],
    },
    {
      radius: 55,
      periodSec: 40,
      direction: 'cw' as const,
      stroke: '#f48fb1',
      tilt: 0.5,
      dotRadius: 3,
      cx: 0,
      cy: -1,
      points: [
        { angle: 0, label: 'HTML' },
        { angle: 60, label: 'CSS' },
        { angle: 120, label: 'Sass' },
        { angle: 180, label: 'Tailwind CSS' },
        { angle: 240, label: 'JavaScript' },
        { angle: 300, label: 'TypeScript' },
      ],
    },
  ];
}
