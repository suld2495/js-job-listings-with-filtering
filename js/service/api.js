export const fetchUsers = () => {
    return fetch('/data.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('문제가 발생하였습니다.');    
            }

            return response.json();
        });
};