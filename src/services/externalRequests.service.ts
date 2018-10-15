import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class ExternalRequestsService {
  api = environment.appAPI;
  constructor(private http: HttpClient) { }
  getAllWorkouts() {
    return this.http.get(`${this.api}/workout/getAll`);
  }
}
