export class UriConstants {
    private static readonly BASE_URL = 'http://localhost:8000/task/api/v1';
    public static readonly GET_TASKS = UriConstants.BASE_URL;
    public static readonly GET_TASK = (id: number) => `${UriConstants.BASE_URL}/${id}`;
    public static readonly CREATE_TASK = UriConstants.BASE_URL;
    public static readonly UPDATE_TASK = (id: number) => `${UriConstants.BASE_URL}/${id}`;
    public static readonly DELETE_TASK = (id: number) => `${UriConstants.BASE_URL}/${id}`;
    public static readonly GET_TASKS_OVER = UriConstants.BASE_URL + '/overdue';
}