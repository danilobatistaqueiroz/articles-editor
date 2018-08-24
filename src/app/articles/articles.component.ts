import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { Article } from '../article';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  selectedArticle: Article;
  addingArticle = false;
  error: any;
  showNgFor = false;

  ngOnInit(): void {
    this.getArticles();
  }

  constructor(private articlesService: ArticlesService) {}

  getArticles(): void {
    this.articlesService
      .getArticles()
      .subscribe(
        articles => (this.articles = articles),
        error => (this.error = error)
      )
  }

  deleteArticle(article: Article, event: any): void {
    event.stopPropagation();
    this.articlesService.delete(article).subscribe(res => {
      this.articles = this.articles.filter(h => h !== article);
      if (this.selectedArticle === article) {
        this.selectedArticle = null;
      }
    }, error => (this.error = error));
  }

}
