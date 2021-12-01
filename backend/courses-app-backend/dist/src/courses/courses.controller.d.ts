import { Observable } from 'rxjs';
import { FailedRequest, ItemModel, QueryParams, SuccessfulRequest } from '@models/common.models';
import { CourseModel } from './courses.models';
import { CoursesService } from './courses.service';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    getAllCourses(): Observable<SuccessfulRequest<ItemModel[] | string> | FailedRequest>;
    getFilteredCourses(queries?: QueryParams): Observable<SuccessfulRequest<CourseModel[] | string> | FailedRequest>;
    addCourse(body: CourseModel): Observable<SuccessfulRequest<string | ItemModel> | FailedRequest>;
    getSingelCourse(id: string): Observable<SuccessfulRequest<ItemModel | string> | FailedRequest>;
    editCourse(id: string, body: CourseModel): Observable<SuccessfulRequest<string> | FailedRequest>;
    deleteCourse(id: string): Observable<SuccessfulRequest<string> | FailedRequest>;
}
