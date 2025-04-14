import { isDevMode } from '@angular/core';

const host = 'http://localhost:8000';
const basePath = host;
export class UriConstants {
    public static readonly GET_TASKS = basePath + '/tasks';
}