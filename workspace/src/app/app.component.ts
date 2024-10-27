import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'sample-auth-static-apps';
  name = '';
  readonly $vm = vm();
  ngOnInit(): void {
    this.$vm.fetchMe();
  }
}

function vm() {
  const name = signal<string>('');
  return {
    get name(): string {
      return name();
    },
    async fetchMe() {
      const ret = await fetch('/.auth/me');
      const me = await ret.json();
      name.set(me.clientPrincipal?.userDetails);
    },
  };
}
