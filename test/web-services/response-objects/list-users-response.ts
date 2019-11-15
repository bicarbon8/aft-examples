import { User } from "./user";

export class ListUsersResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}