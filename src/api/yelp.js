import axios from 'axios';

export default axios.create({
    //base root url we will be making a request to
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 
            'Bearer <KEY GOES HERE>'
    }
});

