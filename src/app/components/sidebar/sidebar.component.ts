import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type : string;
    sub?: IChildItem[];
}
declare interface IChildItem {
  path: string;
  title: string;
  icon: string;
  class: string;
  type : string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '',type: 'link', },
    { path: '/list-content', title: 'Danh sách theo keyword',  icon:'bubble_chart', class: '' ,type: 'link',},
    { path: '/typography', title: 'Thống kê bài viết theo chủ đề',  icon:'library_books', class: '' ,type: 'link',},
    // { path: '/maps', title: 'Thống kê bài viết theo Facebook',  icon:'library_books', class: '' ,type: 'link',},
    // { path: '/user-profile', title: 'Danh sách theo chủ đề',  icon:'person', class: '',type: 'link', },
    // { path: '/table-list', title: 'Danh sách theo cá nhân',  icon:'content_paste', class: '',type: 'link', },
    { path: '/show-list-news', title: 'Tin bài theo FaceBook',  icon:'bubble_chart', class: '' ,type: 'link',},
    { path: '/show-list-gg', title: 'Tin bài theo bao trí',  icon:'bubble_chart', class: '' ,type: 'link',},
    { path: '/news-save', title: 'Tin bài đã lưu',  icon:'bubble_chart', class: '' ,type: 'link',},
    // { path: '/maps', title: 'chủ đề',  icon:'location_on', class: '' ,type: 'dropDown',sub:[
    //   { path: '/dashboard', title: 'Danh sách theo chủ đề',  icon: 'dashboard', class: '',type: 'link', },
    //   { path: '/dashboard', title: 'Danh sách theo nguồn',  icon: 'dashboard', class: '',type: 'link', },
    //   { path: '/dashboard', title: 'Danh sách theo cá nhân',  icon: 'dashboard', class: '',type: 'link', },
    // ]},
    { path: '/notifications', title: 'Đánh giá',  icon:'notifications', class: '',type: 'link',},
    { path: '/upgrade', title: 'upgrade',  icon:'unarchive', class: 'active-pro',type: 'link' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
