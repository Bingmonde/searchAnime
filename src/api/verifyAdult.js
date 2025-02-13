
export const verifyAdult =  () => {
    const isAdult = localStorage.getItem('isAdult');
    return isAdult
}

export const setAdult = (adult) => {
    localStorage.setItem('isAdult', adult);
}