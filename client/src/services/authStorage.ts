export const authStorage = {
    get accessToken() { return localStorage.getItem("accessToken"); },
    set accessToken(v: string | null) { 
        v 
        ? localStorage.setItem("accessToken", v) 
        : localStorage.removeItem("accessToken"); 
    },
    get refreshToken() { return localStorage.getItem("refreshToken"); },
    set refreshToken(v: string | null) { 
        v 
        ? localStorage.setItem("refreshToken", v) 
        : localStorage.removeItem("refreshToken"); 
    },
    clear() { 
        localStorage.removeItem("accessToken"); 
        localStorage.removeItem("refreshToken"); 
    }
}