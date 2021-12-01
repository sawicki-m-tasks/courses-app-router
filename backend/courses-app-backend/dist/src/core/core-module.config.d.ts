export interface CoreModuleConfig {
    algorithm: string;
    timeLiving: number;
    filesFolder: string;
}
export declare const TOKEN_CONFIG = "token_config";
export declare const FILES_FOLDER = "files_folder";
export declare const METADATA_AUTHORIZED_KEY = "Authorization";
export declare const METADATA_ROLE_KEY = "roles";
export declare enum UserRoles {
    admin = "admin",
    user = "user"
}
