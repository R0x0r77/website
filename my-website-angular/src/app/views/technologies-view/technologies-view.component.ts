import { Component } from '@angular/core';

@Component({
  selector: 'app-technologies-view',
  imports: [],
  templateUrl: './technologies-view.component.html',
  styleUrl: './technologies-view.component.scss',
})
export class TechnologiesViewComponent {
  technologiesFrontend = [
    {
      name: 'Angular',
      description:
        'A framework for building dynamic, structured, and scalable web applications.',
    },
    {
      name: 'TypeScript',
      description:
        'A superset of JavaScript that compiles to plain JavaScript.',
    },
    {
      name: 'RxJS',
      description: 'A library for reactive programming using Observables.',
    },
    {
      name: 'NgRx',
      description: 'A state management library for Angular applications.',
    },
    {
      name: 'Tailwind CSS',
      description: 'A utility-first CSS framework for rapid UI development.',
    },
    {
      name: 'Angular Material',
      description: 'A UI component library for Angular applications.',
    },
  ];

  technologiesBackend = [
    {
      name: 'Java',
      description:
        'A versatile programming language for building server-side applications.',
    },
    {
      name: 'Spring Boot',
      description:
        'A framework for building production-ready applications with Java.',
    },
    {
      name: 'PostgreSQL',
      description: 'A powerful, open-source relational database system.',
    },
    {
      name: 'Hibernate',
      description:
        'An ORM framework for mapping Java objects to database tables.',
    },
    {
      name: 'Spring Security',
      description: 'A framework for securing Java applications.',
    },
    {
      name: 'Spring MVC',
      description:
        'Model-View-Controller framework for building web applications in Java.',
    },
  ];

  technologiesOther = [
    {
      name: 'Docker',
      description:
        'A platform for developing, shipping, and running applications in containers.',
    },
    {
      name: 'Render',
      description:
        'A cloud platform for deploying web applications and services.',
    },
    {
      name: 'Git',
      description:
        'A version control system for tracking changes in source code.',
    },
    {
      name: 'Maven',
      description: 'A build automation tool mainly for Java projects.',
    },
  ];
}
