import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesUrl = 'http://localhost:8765/articles'; // URL to web api

  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http
      .get<Article[]>(`${this.articlesUrl}/json`)
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(article: Article) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.articlesUrl}/delete/${article.id}`;

    return this.http.delete<Article>(url).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
