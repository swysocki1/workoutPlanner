import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {User} from "../../../models/user.model";
import {ExternalRequestsService} from "../../../services/externalRequests.service";
import {Router} from "@angular/router";

@Component({
  selector: 'friend-finder',
  templateUrl: './friendFinder.html',
  styles:[`
    .search-bar {
      background-color:#fff;
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      z-index: 1;
    }
    .search-bar > .form-group,
    .search-bar button.btn-filter.btn.btn-sm.btn-secondary {
      margin-bottom: .5rem;
    }
  `]
})
export class FriendFinderComponent implements OnInit {
  constructor(private ls: LoginService, private ers: ExternalRequestsService, private router: Router) { }
  user = new User();
  allUsers: [User] = [] as [User];
  search: string;
  searchFilters:[FilterTag] = [] as [FilterTag];
  ngOnInit() {
    if (this.isLoggedIn()) {
      this.user = this.ls.getUser();
      this.loadAllUsers();
    } else {
      this.router.navigate(['/login']);
    }
  }
  loadAllUsers(params?) {
    this.ers.getAllUsers().subscribe((users:[User]) => {
      // this.users = users.filter(user => !this.user.friends.some(friend => friend.id === user._id)) as [User];
      this.allUsers = users;
    });
  }
  isLoggedIn(): boolean {
    return this.ls.getUserSession().authenticated;
  }
  addFriend(friend: User) {
    this.ers.befriendUser(this.ls.getUser()._id, friend._id).subscribe(res => {
      this.ls.updateUser().subscribe((user: User) => {
        this.user = user;
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
  }
  removeFriend(friend: User) {
    this.ers.unfriendUser(this.ls.getUser()._id, friend._id).subscribe(res => {
      console.log(res);
      this.ls.updateUser().subscribe((user: User) => {
        this.user = user;
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
  }
  viewUserProfile(user: User) {
    this.router.navigate([`/profile/${user._id}`]);
  }
  toggleFilter(tag: string) {
    if (tag === 'FILTER_CURRENT_FRIENDS') {
      this.toggleFilterCurrentFriends();
    } else if (tag === 'FILTER_STRANGERS') {
      this.toggleFilterStrangers();
    }
  }
  toggleFilterCurrentFriends() {
    const filterTAG = {label: 'Current Friends', tag: 'FILTER_CURRENT_FRIENDS'} as FilterTag;
    const index = this.searchFilters.findIndex(filter => filter.tag === filterTAG.tag);
    if (index >= 0) {
      this.searchFilters.splice(index, 1);
    } else {
      this.searchFilters.push(filterTAG);
    }
  }
  toggleFilterStrangers() {
    const filterTAG = {label: 'Strangers', tag: 'FILTER_STRANGERS'} as FilterTag;
    console.log(this.searchFilters);
    const index = this.searchFilters.findIndex(filter => filter.tag === filterTAG.tag);
    if (index >= 0) {
      this.searchFilters.splice(index, 1);
    } else {
      this.searchFilters.push(filterTAG);
    }
  }
  filterTagActive(tag: string): boolean {
    return this.searchFilters.some(filter => filter && filter.tag === tag);
  }
}
export class FilterTag {
  label: string;
  tag: string;
}

@Pipe({
  name: 'friendFilter',
  pure: false
})
export class FriendFilterPipe implements PipeTransform {
  transform(items: [User], currentUser:User, search: string, searchFilters:[FilterTag]): [User] {
    if (!items) {
      return items;
    }
    items = items.filter(item => item._id !== currentUser._id) as [User];
    if (search && search.trim()) {
      search = search.trim().toLowerCase();
      items = items.filter(item =>
        (item.firstName && item.firstName.toLowerCase().indexOf(search) >= 0) ||
        (item.lastName && item.lastName.toLowerCase().indexOf(search) >= 0) ||
        (item.username && item.username.toLowerCase().indexOf(search) >= 0) ||
        (item.email && item.email.toLowerCase().indexOf(search) >= 0)
      ) as [User];
    }
  
    if (searchFilters && searchFilters.length > 0) {
      searchFilters.forEach((filter: FilterTag) => {
        if (currentUser && currentUser.friends && filter.tag === 'FILTER_CURRENT_FRIENDS') {
          items = items.filter(item => !currentUser.friends.some(friend => friend.id === item._id)) as [User];
        }
        if (currentUser && currentUser.friends && filter.tag === 'FILTER_STRANGERS') {
          items = items.filter(item => currentUser.friends.some(friend => friend.id === item._id)) as [User];
        }
      });
    }
    return items;
  }
}
