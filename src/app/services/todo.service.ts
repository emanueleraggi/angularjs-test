import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/Todo'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

// In order to use the http we need to inject it into the constructor
// in the same exact way we did it for the service and component

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit:string = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Todos
  getTodos():Observable<Todo[]> {
    // -----------------------------------------------------------------
    // ----- we will use json placeholder for a fake request as example
    // -----------------------------------------------------------------
    return this.http.get<Todo[]>(`${this.todoUrl}${this.todosLimit}`);

    // -----------------------------------------------------
    // ---- Below we hardcoded some values for test only
    // -----------------------------------------------------
    // return [
    //   {
    //     id: 1,
    //     title: 'Todo One',
    //     completed: false
    //   },
    //   {
    //     id: 2,
    //     title: 'Todo Two',
    //     completed: true
    //   },
    //   {
    //     id: 3,
    //     title: 'Todo Three',
    //     completed: false
    //   }
    // ]
  }


  // Toggle Completed
  // PUT request: updating something on the server

  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo(todo: Todo):Observable<Todo> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add To Do
  addTodo(todo: Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions);
  }
}
