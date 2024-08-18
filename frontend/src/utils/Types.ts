export interface Song {
    title : string
    album : string
    genre : string
    artist : string
    _id: string 
    __v?: number
}
export interface ApiResponse {
        success: boolean;
        songs: Song[];
        message: string
    
}
export interface ErrorResponse {
        error: string;
        success: boolean
    
}