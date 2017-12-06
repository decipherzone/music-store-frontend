import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {Constants} from './url-config';


@Injectable()
export class CommonhttpServices {
  constructor(private http: Http) {
  }

  /**
   * Method to extract data from API response
   * @param res
   * @returns {Response}
   */
  private static extractData(res: Response) {
    return res.json();
  }

  /**
   * Method to handle http errors and sends Observable error to be handled at calling level
   * @param error
   * @returns {any}
   */
  private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  /**
   * Method to execute a POST request with JSON Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public postJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.post(url, JSON.stringify(data),
      {headers: this.getHeaders()}).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  /**
   * Method to execute a PATCH request with JSON Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public patchJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.patch(url, JSON.stringify(data),
      {headers: this.getHeaders()}).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  /**
   * Method to execute a POST request with Form Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public postForm(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.post(url, JSON.stringify(data))
      .map(CommonhttpServices.extractData)
      .catch(CommonhttpServices.handleError);
  }

  /**
   * Method to execute a GET request
   * @param url
   * @returns {Observable<any>}
   */
  public get(url: string): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.get(url).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  public authGet(url: string): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.get(url,
      {headers: this.getHeaders()}).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  public authDelete(url: string, data: string): Observable<any> {
    url = Constants.BASE_URL + url + '/' + data;
    return this.http.delete(url,
      {headers: this.getHeaders()}).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  public authGetData(url: string, data: string): Observable<any> {
    url = Constants.BASE_URL + url + '/' + data;
    return this.http.get(url,
      {headers: this.getHeaders()}).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  public authPutData(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.put(url, JSON.stringify(data),
      {headers: this.getHeaders()}).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  public getJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.get(url, JSON.stringify(data)).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  /**
   * Method to execute a PUT request
   * @param url
   * @returns {Observable<any>}
   */
  public putJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.put(url, JSON.stringify(data)).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  /**
   * Method to execute a DELET request
   * @param url
   * @returns {Observable<any>}
   */
  public delete(url: string): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.delete(url).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  public deleteJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.delete(url, JSON.stringify(data)).map(CommonhttpServices.extractData).catch(CommonhttpServices.handleError);
  }

  /**
   * Returns header for HTTP Requests
   * @returns {Headers}
   */
  private getHeaders(): Headers {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('access_token'));

    return headers;
  }
}

