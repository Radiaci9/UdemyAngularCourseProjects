import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/can-deactivate-guard.service';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id'])
        if (!this.server) this.router.navigate(["../"], { relativeTo: this.route });
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === 'true';
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route, queryParamsHandling: "preserve" });
  }

  canDeactivate (): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) return true;

    if ((this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
        !this.changesSaved) {
          return confirm('Do you want to discard the changes?')
        }
    return true;
  }

}
