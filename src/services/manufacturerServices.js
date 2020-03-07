
export function getServicesForSelectedSubscription(data) {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    };

    let url = URL + 'manufacturer/getServicesBySubscription';

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {

                throw Error(response.status);
            }
            return response;
        })
        .then(
            response => {
                console.log('Came to Fetch Result ');
                response.json().then(data => {
                    console.log('fetched data', data);
                    return data;

                });
            })
        .catch(
            error => {
                console.log('Error ', error);
            });

}

