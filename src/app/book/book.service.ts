import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operators/catch';

import { Book } from './book.model';

@Injectable()
export class BookService {

    constructor(private _httpService: Http) {}

    getAllBooks(): Observable<Book[]> {
        return this._httpService.get("http://localhost:8080/bookapi/api/book")
        .pipe(map((response: Response) => response.json()), catchError (this.handleError));
    }

    getBookById(bookId: string): Observable<Book> {
        return this._httpService.get("http://localhost:8080/bookapi/api/book/" + bookId)
        .pipe(map((response: Response) => response.json()), catchError (this.handleError));
    }

    addBook(book: Book) {
        let body = JSON.stringify(book);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        if (book.id) {
            return this._httpService.put("http://localhost:8080/bookapi/api/book/" + book.id, body, options);
        } else {
            return this._httpService.post("http://localhost:8080/bookapi/api/book", body, options);
        }
    }

    deleteBook(bookId: string) {
        return this._httpService.delete("http://localhost:8080/bookapi/api/book/" + bookId);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}